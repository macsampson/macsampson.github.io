// WebGPU engine for the Lenia background: device setup, buffer allocation,
// ping-pong compute dispatch, and the render pass. Framework agnostic; the
// React wrapper in components/UI/LeniaBackground.jsx just owns its lifecycle.

import updateShader from "./shaders/update.wgsl?raw";
import renderShader from "./shaders/render.wgsl?raw";
import { PRESETS } from "./presets";
import { buildKernel, seedState, KN_CORE, GN_GROWTH } from "./kernel";

export const WORKGROUP = 16; // must match @workgroup_size in update.wgsl
const RMAX = 20; // must match RMAX in update.wgsl

// If a step+draw consistently costs more than this, the GPU cannot sustain the
// simulation. Back off, then give up entirely, rather than queueing work a
// struggling driver will never drain.
const BUDGET_SLOW_MS = 50;
const BUDGET_STOP_MS = 250;

// Frames allowed in flight at once. 2 pipelines CPU against GPU; more just
// queues work a struggling device will never drain.
const MAX_PENDING = 2;

const hex = (h) => [
    parseInt(h.slice(1, 3), 16) / 255,
    parseInt(h.slice(3, 5), 16) / 255,
    parseInt(h.slice(5, 7), 16) / 255,
    1,
];

// The page background stays the site cream so text contrast never moves; only
// the creature's three colour stops change. `intensity` is the single dial for
// how present the simulation is.
const BG = hex("#fdfaf6");

const PALETTES = [
    { name: "sepia", accent: "#cdbca6", mid: "#9a8467", ink: "#63513c" },
    { name: "sage", accent: "#b6c2ac", mid: "#7f9a76", ink: "#4a6149" },
    { name: "clay", accent: "#dcb9a4", mid: "#c08a68", ink: "#8a5137" },
    { name: "slate", accent: "#aebccb", mid: "#7590a8", ink: "#45607a" },
    { name: "plum", accent: "#c9b0c2", mid: "#9c7592", ink: "#634a60" },
    { name: "moss", accent: "#c3c2a0", mid: "#8f9060", ink: "#575a34" },
].map((p) => ({ ...p, accent: hex(p.accent), mid: hex(p.mid), ink: hex(p.ink) }));

// Per-preset ceilings on the mu/sigma jitter, each validated on CPU by running
// the creature out and checking its mass neither collapses nor runs away.
// The Orbiums and Gyrorbium survive +/-5% and break at +/-8%; Hydrogeminium is
// far touchier and already explodes to 7x mass at -5%.
const DEFAULT_JITTER = 0.03;
const JITTER_LIMIT = {
    "Hydrogeminium natans": 0.01,
};

// Must match the growthFn branch in update.wgsl.
const GROWTH_ID = { polynomial: 0, gaussian: 1, step: 2 };

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const between = (lo, hi) => lo + Math.random() * (hi - lo);

const hasWebGPU = () => typeof navigator !== "undefined" && !!navigator.gpu;

export class Lenia {
    static isSupported = hasWebGPU;

    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = {
            grid: null, // auto
            stepsPerSecond: 30,
            intensity: 0.21, // randomised per load
            decay: 0.965,
            // 'auto' uses each preset's published kn/gn for an exact
            // reproduction; the named forms override every species.
            core: "gaussian", // auto | gaussian | polynomial | bump | step | staircase
            growth: "gaussian", // auto | gaussian | polynomial | step
            creatures: null, // auto
            // The effect is soft and low-frequency, so it gains nothing from a
            // retina backing store. Capping at 1x cuts fragment work 4x on a
            // hidpi display, which more than pays for interpolation's extra taps.
            dprCap: 1,
            debug: false,
            ...options,
        };
        this.running = false;
        this.raf = 0;
        this.frame = 0;
        this.lastStep = 0;
        this.destroyed = false;
        this.deviceLost = false;
        this.pending = 0;
        this.degraded = false;
        this.gpuMs = 0;
        this.lastGpuMs = 0;
        this.lastBackoff = -999;
    }

    async init() {
        if (!hasWebGPU()) throw new Error("WebGPU unavailable");

        const adapter = await navigator.gpu.requestAdapter({ powerPreference: "low-power" });
        if (!adapter) throw new Error("no GPU adapter");
        // A software adapter cannot sustain a 512 grid; llvmpipe-backed WebGPU
        // measures around 45ms per step where real hardware is under 5ms.
        this.softwareAdapter = adapter.isFallbackAdapter === true;

        const device = await adapter.requestDevice();
        if (this.destroyed) {
            device.destroy();
            return;
        }
        this.device = device;
        this.deviceLost = false;
        device.lost.then((info) => {
            // Once the device is gone every later call is invalid, so latch it
            // and let step()/draw() become no-ops rather than throwing per frame.
            this.deviceLost = true;
            this.stop();
            if (!this.destroyed && this.options.debug) {
                console.warn("[lenia] device lost:", info.reason, info.message);
            }
        });
        if (this.options.debug) {
            device.onuncapturederror = (e) => console.error("[lenia]", e.error);
        }

        this.context = this.canvas.getContext("webgpu");
        if (!this.context) throw new Error("no webgpu canvas context");
        this.format = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({ device, format: this.format, alphaMode: "opaque" });

        this.maxDim = device.limits.maxTextureDimension2D || 4096;

        // Grid stays fixed for the lifetime of the sim; resizes only rescale how
        // many device pixels one cell covers.
        const coarse =
            typeof window !== "undefined" &&
            window.matchMedia("(pointer: coarse)").matches;
        const grid =
            this.options.grid ?? (this.softwareAdapter || coarse ? 256 : 384);
        this.gridW = grid;
        this.gridH = grid;
        this.cells = this.gridW * this.gridH;

        this.checkLimits(device.limits);

        this.preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];

        this.buildPipelines();
        this.allocate();
        this.measure();   // cellSize must exist before reseed() draws
        this.reseed();
        return this;
    }

    /**
     * Fails loudly (into the CSS fallback) rather than letting the driver
     * discover an unsupported configuration mid-frame.
     */
    checkLimits(limits) {
        const haloBytes = (WORKGROUP + 2 * RMAX) ** 2 * 4;
        const stateBytes = this.cells * 2 * 4;
        const needs = [
            ["maxComputeWorkgroupStorageSize", haloBytes],
            ["maxComputeInvocationsPerWorkgroup", WORKGROUP * WORKGROUP],
            ["maxStorageBufferBindingSize", stateBytes],
            ["maxBufferSize", stateBytes],
        ];
        for (const [key, need] of needs) {
            const have = limits[key];
            if (typeof have === "number" && have < need) {
                throw new Error(`${key} is ${have}, need ${need}`);
            }
        }
        // The render pass reads simulation state as a fragment-stage storage
        // buffer, which not every implementation exposes.
        const fragStorage = limits.maxStorageBuffersInFragmentStage;
        if (typeof fragStorage === "number" && fragStorage < 1) {
            throw new Error("fragment stage storage buffers unavailable");
        }
    }

    buildPipelines() {
        const device = this.device;

        this.computeLayout = device.createBindGroupLayout({
            entries: [
                { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: "uniform" } },
                { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
                { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
                { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
            ],
        });

        this.renderLayout = device.createBindGroupLayout({
            entries: [
                { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: "uniform" } },
                { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: "read-only-storage" } },
                { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: "read-only-storage" } },
            ],
        });

        this.computePipeline = device.createComputePipeline({
            layout: device.createPipelineLayout({ bindGroupLayouts: [this.computeLayout] }),
            compute: { module: device.createShaderModule({ code: updateShader }), entryPoint: "main" },
        });

        const renderModule = device.createShaderModule({ code: renderShader });
        this.renderPipeline = device.createRenderPipeline({
            layout: device.createPipelineLayout({ bindGroupLayouts: [this.renderLayout] }),
            vertex: { module: renderModule, entryPoint: "vs" },
            fragment: { module: renderModule, entryPoint: "fs", targets: [{ format: this.format }] },
            primitive: { topology: "triangle-list" },
        });
    }

    allocate() {
        const device = this.device;
        const bytes = this.cells * 2 * 4; // vec2<f32> per cell

        this.state = [
            device.createBuffer({
                size: bytes,
                usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            }),
            device.createBuffer({
                size: bytes,
                usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            }),
        ];

        const maxKernel = (2 * RMAX + 1) ** 2 * 4;
        this.kernelBuffer = device.createBuffer({
            size: maxKernel,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });

        this.paramsBuffer = device.createBuffer({
            size: 32,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.viewBuffer = device.createBuffer({
            size: 96,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        // Two of each so read/write swap every step without rebuilding.
        this.computeGroups = [0, 1].map((i) =>
            device.createBindGroup({
                layout: this.computeLayout,
                entries: [
                    { binding: 0, resource: { buffer: this.paramsBuffer } },
                    { binding: 1, resource: { buffer: this.state[i] } },
                    { binding: 2, resource: { buffer: this.state[1 - i] } },
                    { binding: 3, resource: { buffer: this.kernelBuffer } },
                ],
            }),
        );
        // Indexed by `src`, so state[i] is the step just written and
        // state[1-i] the one before it.
        this.renderGroups = [0, 1].map((i) =>
            device.createBindGroup({
                layout: this.renderLayout,
                entries: [
                    { binding: 0, resource: { buffer: this.viewBuffer } },
                    { binding: 1, resource: { buffer: this.state[1 - i] } },
                    { binding: 2, resource: { buffer: this.state[i] } },
                ],
            }),
        );

        this.paramsData = new ArrayBuffer(32);
        this.viewData = new ArrayBuffer(96);
        this.alphaData = new Float32Array(1);
        this.src = 0;
    }

    /**
     * Re-seeds everything that varies between visits: preset, palette, colour
     * strength, how many creatures, where and which way round they face, a
     * small parameter jitter, and how far the simulation has already run by the
     * time you see it.
     */
    reseed(preset = null) {
        this.preset = preset ?? pick(PRESETS);
        this.palette = pick(PALETTES);
        this.intensity = this.options.intensity ?? between(0.24, 0.34);

        // Nudging mu/sigma makes each visit behave slightly differently: the
        // same species wobbles, drifts, or holds shape a little unlike last time.
        const j = JITTER_LIMIT[this.preset.name] ?? DEFAULT_JITTER;
        this.mu = this.preset.mu * (1 + between(-j, j));
        this.sigma = this.preset.sigma * (1 + between(-j, j));

        const area = this.gridW * this.gridH;
        const footprint = this.preset.pattern.w * this.preset.pattern.h;
        const fits = Math.max(2, Math.round(area / (footprint * 26)));
        const count =
            this.options.creatures ??
            Math.round(between(3, Math.min(8, Math.max(4, fits))));

        const seed = seedState(this.gridW, this.gridH, this.preset, count);
        this.device.queue.writeBuffer(this.state[0], 0, seed);
        this.device.queue.writeBuffer(this.state[1], 0, seed);
        this.src = 0;

        this.uploadKernel();
        this.uploadParams();
        this.uploadView();

        // Skip ahead a random distance so you don't always arrive at frame zero
        // with everything still sitting in neat little blobs.
        // this.renderStatic(Math.round(between(0, 260))); 

        if (this.options.debug) {
            console.info(
                `[lenia] ${this.preset.name} x${count} · ${this.palette.name} · ` +
                `R=${this.preset.R} mu=${this.mu.toFixed(4)} sigma=${this.sigma.toFixed(4)}`,
            );
        }
    }

    /** Debug-panel entry point: override a preset value and re-upload. */
    setOverride(key, value) {
        this.options[key] = value;
        if (key === "intensity") {
            this.intensity = value;
            this.uploadView();
        }
        else this.uploadParams();
        this.draw();
    }

    /** Drops manual overrides so preset values apply again. */
    clearOverrides() {
        this.options.mu = undefined;
        this.options.sigma = undefined;
        this.options.dt = undefined;
    }

    uploadKernel() {
        const { R, beta, kn } = this.preset;
        const core =
            this.options.core === "auto" ? (KN_CORE[kn] ?? "gaussian") : this.options.core;
        this.device.queue.writeBuffer(this.kernelBuffer, 0, buildKernel(R, beta, core));
    }

    uploadParams() {
        const { R, dt } = this.preset;
        const u32 = new Uint32Array(this.paramsData);
        const i32 = new Int32Array(this.paramsData);
        const f32 = new Float32Array(this.paramsData);
        u32[0] = this.gridW;
        u32[1] = this.gridH;
        i32[2] = R;
        f32[3] = this.options.dt ?? dt;
        f32[4] = this.options.mu ?? this.mu;
        f32[5] = this.options.sigma ?? this.sigma;
        const growth =
            this.options.growth === "auto"
                ? (GN_GROWTH[this.preset.gn] ?? "gaussian")
                : this.options.growth;
        u32[6] = GROWTH_ID[growth] ?? GROWTH_ID.gaussian;
        f32[7] = this.options.decay;
        this.device.queue.writeBuffer(this.paramsBuffer, 0, this.paramsData);
    }

    uploadView() {
        const u32 = new Uint32Array(this.viewData);
        const f32 = new Float32Array(this.viewData);
        u32[0] = this.gridW;
        u32[1] = this.gridH;
        f32[2] = this.cellSize;
        f32[3] = this.intensity;
        f32[4] = 1; // alpha; the per-frame loop overwrites just this word
        f32.set(BG, 8);
        f32.set(this.palette.accent, 12);
        f32.set(this.palette.mid, 16);
        f32.set(this.palette.ink, 20);
        this.device.queue.writeBuffer(this.viewBuffer, 0, this.viewData);
    }

    /** Writes just the interpolation factor, 4 bytes at offset 16. */
    uploadAlpha(alpha) {
        this.alphaData[0] = alpha;
        this.device.queue.writeBuffer(this.viewBuffer, 16, this.alphaData);
    }

    /** Sizes the backing store and cell scale. Never reallocates the grid. */
    measure() {
        const dpr = Math.min(window.devicePixelRatio || 1, this.options.dprCap);
        const w = Math.max(1, Math.min(this.maxDim, Math.floor(this.canvas.clientWidth * dpr)));
        const h = Math.max(1, Math.min(this.maxDim, Math.floor(this.canvas.clientHeight * dpr)));
        if (w !== this.canvas.width || h !== this.canvas.height) {
            this.canvas.width = w;
            this.canvas.height = h;
        }
        // One grid tile covers the longest axis, so the torus never repeats
        // on screen and the aspect ratio is never distorted.
        this.cellSize = Math.max(w, h) / this.gridW;
    }

    /** Rescales the canvas backing store. Never reallocates the grid. */
    resize() {
        if (this.dead) return;
        this.measure();
        this.uploadView();
        this.draw();
    }

    /** True once the GPU device is unusable; all GPU calls must be skipped. */
    get dead() {
        return this.destroyed || this.deviceLost || !this.device;
    }

    recordStep(encoder) {
        const pass = encoder.beginComputePass();
        pass.setPipeline(this.computePipeline);
        pass.setBindGroup(0, this.computeGroups[this.src]);
        pass.dispatchWorkgroups(
            Math.ceil(this.gridW / WORKGROUP),
            Math.ceil(this.gridH / WORKGROUP),
        );
        pass.end();
        this.src = 1 - this.src;
    }

    recordDraw(encoder) {
        const pass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: this.context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    storeOp: "store",
                    clearValue: { r: BG[0], g: BG[1], b: BG[2], a: 1 },
                },
            ],
        });
        pass.setPipeline(this.renderPipeline);
        pass.setBindGroup(0, this.renderGroups[this.src]);
        pass.draw(3);
        pass.end();
    }

    step() {
        if (this.dead) return;
        const encoder = this.device.createCommandEncoder();
        this.recordStep(encoder);
        this.device.queue.submit([encoder.finish()]);
    }

    draw() {
        if (this.dead || !this.context) return;
        const encoder = this.device.createCommandEncoder();
        this.recordDraw(encoder);
        this.device.queue.submit([encoder.finish()]);
    }

    /** An optional simulation step plus a render, in a single submit. */
    advance(doStep) {
        if (this.dead || !this.context) return;
        const encoder = this.device.createCommandEncoder();
        if (doStep) this.recordStep(encoder);
        this.recordDraw(encoder);
        this.device.queue.submit([encoder.finish()]);
    }

    /**
     * Advances a fixed number of steps and renders once, without animating.
     * All steps go into one command buffer: submitting them individually would
     * dump a burst of submissions onto the queue in a single tick.
     */
    renderStatic(steps = 0) {
        if (this.dead || !this.context) return;
        const encoder = this.device.createCommandEncoder();
        for (let i = 0; i < steps; i++) this.recordStep(encoder);
        this.recordDraw(encoder);
        this.device.queue.submit([encoder.finish()]);
    }

    /** Moving average of real GPU cost, plus the back-off watchdog. */
    noteFrame(ms) {
        this.gpuMs = this.gpuMs ? this.gpuMs * 0.9 + ms * 0.1 : ms;
        this.lastGpuMs = this.gpuMs;
        this.frame++;

        // Ignore the first frames: they include pipeline and shader warm-up.
        if (this.frame > 30) {
            if (this.gpuMs > BUDGET_STOP_MS) {
                this.degraded = true;
                this.stop();
                if (this.options.debug) {
                    console.warn(`[lenia] ${this.gpuMs.toFixed(0)}ms/frame, stopping`);
                }
                return;
            }
            if (this.gpuMs > BUDGET_SLOW_MS && this.options.stepsPerSecond > 8) {
                // Step down gradually rather than falling off a cliff, and only
                // once per second so the average has time to respond.
                if (this.frame - this.lastBackoff > 30) {
                    this.lastBackoff = this.frame;
                    this.options.stepsPerSecond = Math.max(
                        8,
                        Math.round(this.options.stepsPerSecond * 0.7),
                    );
                    this.degraded = true;
                    if (this.options.debug) {
                        console.warn(
                            `[lenia] ${this.gpuMs.toFixed(0)}ms/frame, ` +
                            `now ${this.options.stepsPerSecond} steps/s`,
                        );
                    }
                }
            }
        }

        if (this.options.debug && this.frame % 120 === 0) {
            console.info(
                `[lenia] ${this.gridW}x${this.gridH} R=${this.preset.R} ` +
                `${this.gpuMs.toFixed(2)}ms per step+draw`,
            );
        }
    }

    start() {
        if (this.running || this.dead) return;
        this.running = true;
        this.pending = 0;
        this.lastStep = performance.now();

        const tick = (now) => {
            if (!this.running || this.dead) return;
            this.raf = requestAnimationFrame(tick);

            // Backpressure. One frame of pipelining keeps the GPU busy while the
            // CPU prepares the next; an unbounded queue is how a slow device
            // ends up taking down the browser's GPU process.
            if (this.pending >= MAX_PENDING) return;

            const interval = 1000 / this.options.stepsPerSecond;
            const stepDue = now - this.lastStep >= interval;
            if (stepDue) this.lastStep = now;

            // Fixed-timestep interpolation: simulate at a steady rate, but draw
            // every frame somewhere between the last two states. The picture
            // trails the simulation by one step and moves continuously, instead
            // of visibly jumping `stepsPerSecond` times a second.
            this.uploadAlpha(Math.min(1, (now - this.lastStep) / interval));

            const t0 = performance.now();
            try {
                this.pending++;
                this.advance(stepDue);
                this.device.queue
                    .onSubmittedWorkDone()
                    .then(() => {
                        this.pending--;
                        // Only time frames that actually stepped; draw-only
                        // frames are far cheaper and would skew the average.
                        if (!this.dead && stepDue) this.noteFrame(performance.now() - t0);
                    })
                    .catch(() => {
                        this.pending--;
                    });
            } catch (err) {
                this.pending--;
                this.stop();
                if (this.options.debug) console.warn("[lenia] frame failed:", err);
            }
        };
        this.raf = requestAnimationFrame(tick);
    }

    stop() {
        this.running = false;
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = 0;
    }

    destroy() {
        this.destroyed = true;
        this.stop();
        this.state?.forEach((b) => b.destroy());
        this.kernelBuffer?.destroy();
        this.paramsBuffer?.destroy();
        this.viewBuffer?.destroy();
        try {
            this.context?.unconfigure();
        } catch {
            /* context may already be gone */
        }
        this.device?.destroy();
    }
}
