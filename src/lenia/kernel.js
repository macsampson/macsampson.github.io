// Kernel precompute. Runs once on the CPU whenever R, beta, or the core
// function changes; the per-frame compute shader only reads the result.

import { patternCells } from "./presets.js";

/**
 * Kernel core functions, matching Chakazul/Lenia `Automaton.kernel_core`.
 * `gaussian` is the widely reproduced ring form; `polynomial` and `bump` are
 * Chan's kn=1 and kn=2 respectively, kept so presets can be run exactly as
 * published.
 */
const Q = 1 / 4; // Chan's step width, kernel_core's default q

const CORES = {
    // Chan kn=1
    polynomial: (r) => {
        const t = 4 * r * (1 - r);
        return t * t * t * t;
    },
    // kn=2
    bump: (r) => Math.exp(4 - 1 / (r * (1 - r))),
    // kn=3
    step: (r) => (r >= Q && r <= 1 - Q ? 1 : 0),
    // kn=4
    staircase: (r) => (r >= Q && r <= 1 - Q ? 1 : r < Q ? 0.5 : 0),
    // Not one of Chan's; the widely reproduced Gaussian ring, and this site's
    // default because it renders more smoothly than the polynomial.
    gaussian: (r) => {
        const d = r - 0.5;
        return Math.exp(-(d * d) / (2 * 0.15 * 0.15));
    },
};

/** Chan's 1-based kn / gn indices mapped onto the names used here. */
export const KN_CORE = { 1: "polynomial", 2: "bump", 3: "step", 4: "staircase" };
export const GN_GROWTH = { 1: "polynomial", 2: "gaussian", 3: "step" };

/**
 * Radially symmetric kernel over a (2R+1)^2 window, normalized to sum to 1.
 * Multi-ring kernels come from `beta`: the normalized radius is split into
 * beta.length rings, each scaled by its beta weight.
 */
export function buildKernel(radius, beta, coreName = "gaussian") {
    const core = CORES[coreName] ?? CORES.gaussian;
    const k = 2 * radius + 1;
    const weights = new Float32Array(k * k);
    const rings = beta.length;
    let total = 0;

    for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
            const r = Math.hypot(dx, dy) / radius;
            let v = 0;
            if (r < 1) {
                const scaled = rings * r;
                const ring = Math.min(Math.floor(scaled), rings - 1);
                v = beta[ring] * core(scaled % 1);
            }
            // The bump core divides by zero at r=0 and r=1.
            if (!Number.isFinite(v) || v < 0) v = 0;
            weights[(dy + radius) * k + (dx + radius)] = v;
            total += v;
        }
    }

    if (total > 0) {
        for (let i = 0; i < weights.length; i++) weights[i] /= total;
    }
    return weights;
}

const ROTATIONS = 4;

/**
 * Builds the initial state buffer: `count` copies of the preset's creature at
 * random positions and axis-aligned rotations. Random noise is deliberately
 * not used, since in Lenia it almost always decays to nothing or to mush.
 *
 * Returns interleaved vec2 data (state, trail) matching the compute shader.
 */
export function seedState(gridW, gridH, preset, count) {
    const data = new Float32Array(gridW * gridH * 2);
    const cells = patternCells(preset);
    const { w, h } = preset.pattern;

    for (let n = 0; n < count; n++) {
        const rot = Math.floor(Math.random() * ROTATIONS);
        const flip = Math.random() < 0.5;
        const ox = Math.floor(Math.random() * gridW);
        const oy = Math.floor(Math.random() * gridH);

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const v = cells[y * w + x];
                if (v <= 0) continue;

                const sx = flip ? w - 1 - x : x;
                let tx, ty;
                switch (rot) {
                    case 1: tx = h - 1 - y; ty = sx; break;
                    case 2: tx = w - 1 - sx; ty = h - 1 - y; break;
                    case 3: tx = y; ty = w - 1 - sx; break;
                    default: tx = sx; ty = y;
                }

                const gx = (ox + tx) % gridW;
                const gy = (oy + ty) % gridH;
                const i = (gy * gridW + gx) * 2;
                // Overlapping spawns take the max rather than summing, which
                // would push cells past 1 and blow the creature apart.
                if (v > data[i]) {
                    data[i] = v;
                    data[i + 1] = v;
                }
            }
        }
    }
    return data;
}
