import { useEffect, useRef, useState } from "react";
import { Lenia } from "../../lenia/lenia";
import { PRESETS } from "../../lenia/presets";

// Dev-only controls: append ?lenia to the URL.
const DEBUG =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("lenia");

const LeniaBackground = () => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const [failed, setFailed] = useState(() => !Lenia.isSupported());
    // Only populated in debug mode, so the panel can render from props rather
    // than reading the ref during render.
    const [debugEngine, setDebugEngine] = useState(null);

    useEffect(() => {
        if (!Lenia.isSupported()) return undefined;

        let cancelled = false;
        let resizeTimer = 0;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

        const boot = async () => {
            if (cancelled || !canvasRef.current) return;
            try {
                const engine = new Lenia(canvasRef.current, { debug: DEBUG });
                await engine.init();
                if (cancelled) {
                    engine.destroy();
                    return;
                }
                engineRef.current = engine;
                // Reduced motion still gets the artwork, just not the animation.
                if (reduced.matches) engine.renderStatic(150);
                else engine.start();
                if (DEBUG) setDebugEngine(engine);
            } catch (err) {
                if (DEBUG) console.warn("[lenia] falling back:", err);
                engineRef.current?.destroy();
                engineRef.current = null;
                if (!cancelled) setFailed(true);
            }
        };

        // Never block first paint on adapter request or shader compilation.
        const idle = window.requestIdleCallback
            ? window.requestIdleCallback(boot, { timeout: 1500 })
            : window.setTimeout(boot, 250);

        const onVisibility = () => {
            const engine = engineRef.current;
            if (!engine || reduced.matches) return;
            if (document.hidden) engine.stop();
            else engine.start();
        };

        const onResize = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => engineRef.current?.resize(), 180);
        };

        const onMotionChange = () => {
            const engine = engineRef.current;
            if (!engine) return;
            if (reduced.matches) {
                engine.stop();
                engine.draw();
            } else {
                engine.start();
            }
        };

        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("resize", onResize);
        reduced.addEventListener("change", onMotionChange);

        return () => {
            cancelled = true;
            if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
            else window.clearTimeout(idle);
            window.clearTimeout(resizeTimer);
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("resize", onResize);
            reduced.removeEventListener("change", onMotionChange);
            engineRef.current?.destroy();
            engineRef.current = null;
            setDebugEngine(null);
        };
    }, []);

    return (
        <>
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
                {failed ? (
                    <div className="lenia-fallback absolute inset-0" />
                ) : (
                    <canvas ref={canvasRef} className="block h-full w-full" />
                )}
            </div>
            {DEBUG && debugEngine && <DebugPanel engine={debugEngine} />}
        </>
    );
};

const SLIDERS = [
    { key: "mu", label: "μ (growth)", min: 0.02, max: 0.4, step: 0.001 },
    { key: "sigma", label: "σ (growth)", min: 0.001, max: 0.06, step: 0.0005 },
    { key: "dt", label: "dt", min: 0.02, max: 0.3, step: 0.005 },
    { key: "intensity", label: "intensity", min: 0.05, max: 1, step: 0.01 },
];

const DebugPanel = ({ engine }) => {
    const [, bump] = useState(0);

    // Falls back to the randomised live value, not the preset's published one,
    // since mu/sigma/intensity are all jittered per load.
    const value = (key) => engine.options[key] ?? engine[key] ?? engine.preset[key];

    const update = (key, v) => {
        engine.setOverride(key, v);
        bump((n) => n + 1);
    };

    return (
        <div className="fixed bottom-3 right-3 z-50 w-60 rounded-md border border-rule bg-background/95 p-3 font-mono text-[11px] shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">lenia</span>
                <button
                    className="border-b border-primary/60"
                    onClick={() => {
                        engine.clearOverrides();
                        engine.reseed();
                        bump((n) => n + 1);
                    }}
                >
                    reseed
                </button>
            </div>

            <select
                className="mb-2 w-full border border-rule bg-transparent p-1"
                value={engine.preset.name}
                onChange={(e) => {
                    engine.clearOverrides();
                    engine.reseed(PRESETS.find((p) => p.name === e.target.value));
                    bump((n) => n + 1);
                }}
            >
                {PRESETS.map((p) => (
                    <option key={p.name} value={p.name}>
                        {p.name}
                    </option>
                ))}
            </select>

            {SLIDERS.map(({ key, label, min, max, step }) => (
                <label key={key} className="mb-1.5 block">
                    <span className="flex justify-between">
                        {label}
                        <b>{Number(value(key)).toFixed(4)}</b>
                    </span>
                    <input
                        type="range"
                        className="w-full"
                        min={min}
                        max={max}
                        step={step}
                        value={value(key)}
                        onChange={(e) => update(key, Number(e.target.value))}
                    />
                </label>
            ))}

            <p className="mt-1 opacity-70">
                {engine.gridW}×{engine.gridH} · R={engine.preset.R} · {engine.palette.name}
                {engine.softwareAdapter ? " · software" : ""}
                {engine.lastGpuMs ? ` · ${engine.lastGpuMs.toFixed(1)}ms` : ""}
                {engine.degraded ? ` · ${engine.options.stepsPerSecond}/s` : ""}
            </p>
        </div>
    );
};

export default LeniaBackground;
