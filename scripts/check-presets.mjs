#!/usr/bin/env node
//
// CPU reference implementation of the Lenia update rule, used to check that
// every preset in src/lenia/presets.js is actually stable before it ships.
//
//   npm run presets:check                 check all presets
//   npm run presets:check -- --jitter     also probe the mu/sigma jitter band
//   npm run presets:check -- --only orbium  check only matching presets
//
// A creature that dies leaves a blank background; one that explodes floods the
// whole grid. Both are silent failures in the browser, so they get caught here.
//
// This deliberately reuses src/lenia/kernel.js so the kernel maths under test
// is the same code the GPU path uses. Only the growth function is duplicated,
// because on the real path it lives in WGSL.

import { PRESETS, patternCells } from "../src/lenia/presets.js";
import { buildKernel, KN_CORE, GN_GROWTH } from "../src/lenia/kernel.js";

// Mirrors growth() in src/lenia/shaders/update.wgsl.
const GROWTH = {
    polynomial: (u, m, s) => {
        const q = Math.max(0, 1 - ((u - m) * (u - m)) / (9 * s * s));
        return q * q * q * q * 2 - 1;
    },
    gaussian: (u, m, s) => Math.exp(-((u - m) * (u - m)) / (2 * s * s)) * 2 - 1,
    step: (u, m, s) => (Math.abs(u - m) <= s ? 1 : -1),
};

const wrap = (v, n) => ((v % n) + n) % n;

function simulate(preset, { mu, sigma, core, growth, size, steps }) {
    const { R, dt, beta, pattern } = preset;
    const kern = buildKernel(R, beta, core);
    const g = GROWTH[growth];
    const k = 2 * R + 1;
    const W = size;
    const H = size;

    let A = new Float32Array(W * H);
    let B = new Float32Array(W * H);

    const cells = patternCells(preset);
    const ox = (W >> 1) - (pattern.w >> 1);
    const oy = (H >> 1) - (pattern.h >> 1);
    for (let y = 0; y < pattern.h; y++)
        for (let x = 0; x < pattern.w; x++)
            A[wrap(oy + y, H) * W + wrap(ox + x, W)] = cells[y * pattern.w + x];

    const mass = (a) => {
        let t = 0;
        for (let i = 0; i < a.length; i++) t += a[i];
        return t;
    };
    const m0 = mass(A);

    for (let s = 0; s < steps; s++) {
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                let acc = 0;
                for (let dy = -R; dy <= R; dy++) {
                    const yy = wrap(y + dy, H) * W;
                    const kr = (dy + R) * k;
                    // Same disc bound as the shader.
                    const half = Math.trunc(Math.sqrt(Math.max(0, R * R - dy * dy)));
                    for (let dx = -half; dx <= half; dx++) {
                        const w = kern[kr + dx + R];
                        if (w !== 0) acc += A[yy + wrap(x + dx, W)] * w;
                    }
                }
                const v = A[y * W + x] + dt * g(acc, mu, sigma);
                B[y * W + x] = v < 0 ? 0 : v > 1 ? 1 : v;
            }
        }
        const t = A;
        A = B;
        B = t;
    }

    const mN = mass(A);
    const ratio = m0 > 0 ? mN / m0 : 0;
    return {
        ratio,
        verdict: ratio < 0.35 ? "DIED" : ratio > 3 ? "EXPLODED" : "stable",
    };
}

const probeJitter = process.argv.includes("--jitter");
// --only <substring> narrows the run; the full suite is slow for large patterns.
const onlyAt = process.argv.indexOf("--only");
const only = onlyAt === -1 ? "" : (process.argv[onlyAt + 1] ?? "").toLowerCase();
// The pattern needs room to move without wrapping into itself.
const sizeFor = (p) => Math.max(96, Math.ceil((Math.max(p.pattern.w, p.pattern.h) + 4 * p.R) / 16) * 16);

let failures = 0;

for (const p of PRESETS.filter((p) => p.name.toLowerCase().includes(only))) {
    const core = KN_CORE[p.kn] ?? "gaussian";
    const growth = GN_GROWTH[p.gn] ?? "gaussian";
    const size = sizeFor(p);
    const steps = p.R > 15 ? 150 : 220;

    // The site runs the gaussian pair by default; 'auto' reproduces Chan.
    const rows = [
        ["site (gaussian)", { core: "gaussian", growth: "gaussian" }],
        [`auto (kn=${p.kn} gn=${p.gn})`, { core, growth }],
    ];

    for (const [label, opts] of rows) {
        const r = simulate(p, { mu: p.mu, sigma: p.sigma, ...opts, size, steps });
        if (r.verdict !== "stable") failures++;
        process.stdout.write(
            `${p.name.padEnd(24)} ${label.padEnd(20)} ` +
                `mass x${r.ratio.toFixed(2).padStart(5)}  ${r.verdict}\n`,
        );
    }

    if (probeJitter) {
        for (const j of [0.01, 0.02, 0.03, 0.05]) {
            const out = [];
            for (const sign of [-1, 1]) {
                const r = simulate(p, {
                    mu: p.mu * (1 + sign * j),
                    sigma: p.sigma * (1 + sign * j),
                    core: "gaussian",
                    growth: "gaussian",
                    size,
                    steps,
                });
                out.push(`${r.verdict === "stable" ? "ok" : r.verdict}(x${r.ratio.toFixed(2)})`);
            }
            process.stdout.write(
                `${"".padEnd(24)}   jitter +/-${(j * 100).toFixed(0)}%`.padEnd(46) +
                    `${out.join("  ")}\n`,
            );
        }
    }
    process.stdout.write("\n");
}

if (failures) {
    process.stderr.write(`${failures} preset run(s) unstable\n`);
    process.exit(1);
}
process.stdout.write("all presets stable\n");
