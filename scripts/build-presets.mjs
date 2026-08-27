#!/usr/bin/env node
//
// Regenerates src/lenia/presets.js from Bert Chan's species catalogue.
//
//   npm run presets                      rebuild from the SPECIES list below
//   npm run presets -- --list            list every species that this engine can run
//   npm run presets -- --list orbium     filter that listing
//   npm run presets -- "Scutium gravidus" "Pterifera pteronaster"
//
// The catalogue is Chakazul/Lenia Python/animals.json, cached next to this
// script after the first run.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const CACHE = resolve(HERE, ".animals.json");
const OUT = resolve(ROOT, "src/lenia/presets.js");
const SOURCE =
    "https://raw.githubusercontent.com/Chakazul/Lenia/master/Python/animals.json";

// Must match RMAX in src/lenia/shaders/update.wgsl and src/lenia/lenia.js.
// The workgroup halo is sized for this, so a larger R simply cannot run.
const RMAX = 20;

// Chan's kn/gn are 1-based indices into his kernel_core / growth_func tables.
// These are the ones this engine implements; see src/lenia/kernel.js.
const SUPPORTED_KN = [1, 2, 3, 4];
const SUPPORTED_GN = [1, 2, 3];

// Edit this list to change which creatures the site ships with.
const SPECIES = [
    "Orbium unicaudatus",
    "Orbium bicaudatus",
    "Gyrorbium gyrans",
    "Hydrogeminium natans",
];

// --- Chan's RLE format -----------------------------------------------------
// Faithful port of Board.ch2val / Board.rle2arr from LeniaND.py (DIM = 2).
// The prefix set is all eleven of `pqrstuvwxy@`; handling only part of it
// silently corrupts patterns rather than failing.

const PREFIX = "pqrstuvwxy@";

const ch2val = (c) => {
    if (c === "." || c === "b") return 0;
    if (c === "o") return 255;
    if (c.length === 1) return c.charCodeAt(0) - 65 + 1; // 'A' -> 1
    return (c.charCodeAt(0) - 112) * 24 + (c.charCodeAt(1) - 65 + 25); // 'p' -> 0
};

function rle2arr(st) {
    const src = st.replace(/!+$/, "") + "$";
    const rows = [];
    let row = [];
    let last = "";
    let count = "";

    for (const ch of src) {
        if (ch >= "0" && ch <= "9") {
            count += ch;
            continue;
        }
        if (PREFIX.includes(ch)) {
            last = ch;
            continue;
        }
        const token = last + ch;
        const n = count ? parseInt(count, 10) : 1;
        if (token !== "$") {
            const v = Math.min(255, ch2val(token)) / 255;
            for (let i = 0; i < n; i++) row.push(v);
        } else {
            rows.push(row);
            for (let i = 1; i < n; i++) rows.push([]); // repeated $ means blank rows
            row = [];
        }
        last = "";
        count = "";
    }

    const w = Math.max(...rows.map((r) => r.length));
    return rows.map((r) => [...r, ...Array(w - r.length).fill(0)]);
}

const parseBeta = (b) =>
    String(b)
        .split(",")
        .map((tok) => {
            if (!tok.includes("/")) return Number(tok);
            const [n, d] = tok.split("/");
            return Number((Number(n) / Number(d)).toFixed(6));
        });

// --- catalogue -------------------------------------------------------------

async function loadCatalogue() {
    if (!existsSync(CACHE)) {
        process.stderr.write(`fetching ${SOURCE}\n`);
        const res = await fetch(SOURCE);
        if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
        await writeFile(CACHE, await res.text());
    }
    const all = JSON.parse(await readFile(CACHE, "utf8"));
    // Taxonomy rows carry a `code` but no params; only keep real creatures.
    return all.filter((a) => a.params && a.cells);
}

const runnable = (a) =>
    a.params.R <= RMAX &&
    SUPPORTED_KN.includes(a.params.kn) &&
    SUPPORTED_GN.includes(a.params.gn);

// --- output ----------------------------------------------------------------

function emit(entries) {
    const lines = [
        "// GENERATED FILE - do not edit by hand.",
        "// Rebuild with `npm run presets`; see scripts/build-presets.mjs.",
        "//",
        "// Decoded from Chakazul/Lenia `Python/animals.json` (Bert Wang-Chak Chan).",
        "// Pattern cells are base64, one byte per cell, value = byte / 255.",
        "// `mu`/`sigma` are Chan's growth m/s; dt = 1 / T. `kn`/`gn` record the",
        "// kernel core and growth function he published for each species.",
        "",
        "const decode = (s) => {",
        "    const bin = atob(s);",
        "    const out = new Float32Array(bin.length);",
        "    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) / 255;",
        "    return out;",
        "};",
        "",
        "export const PRESETS = [",
    ];

    for (const e of entries) {
        lines.push("    {");
        lines.push(`        name: ${JSON.stringify(e.name)},`);
        lines.push(`        R: ${e.R},`);
        lines.push(`        dt: ${e.dt},`);
        lines.push(`        mu: ${e.mu},`);
        lines.push(`        sigma: ${e.sigma},`);
        lines.push(`        beta: ${JSON.stringify(e.beta)},`);
        lines.push(`        kn: ${e.kn},`);
        lines.push(`        gn: ${e.gn},`);
        lines.push(
            `        pattern: { w: ${e.w}, h: ${e.h}, data: ${JSON.stringify(e.data)} },`,
        );
        lines.push("    },");
    }

    lines.push("];");
    lines.push("");
    lines.push("export const patternCells = (preset) => decode(preset.pattern.data);");
    return lines.join("\n") + "\n";
}

// --- main ------------------------------------------------------------------

const args = process.argv.slice(2);
const catalogue = await loadCatalogue();

if (args[0] === "--list") {
    const filter = (args[1] ?? "").toLowerCase();
    const rows = catalogue
        .filter(runnable)
        .filter((a) => a.name.toLowerCase().includes(filter))
        .sort((a, b) => a.params.R - b.params.R || a.name.localeCompare(b.name));

    for (const a of rows) {
        const p = a.params;
        process.stdout.write(
            `${a.name.padEnd(34)} R=${String(p.R).padStart(2)} ` +
                `mu=${String(p.m).padEnd(7)} sigma=${String(p.s).padEnd(8)} ` +
                `beta=[${parseBeta(p.b).join(", ")}] kn=${p.kn} gn=${p.gn}\n`,
        );
    }
    const skipped = catalogue.length - catalogue.filter(runnable).length;
    process.stdout.write(
        `\n${rows.length} shown, ${catalogue.filter(runnable).length} runnable ` +
            `of ${catalogue.length} total (${skipped} need R > ${RMAX} or an ` +
            `unimplemented kn/gn)\n`,
    );
    process.exit(0);
}

const wanted = args.length ? args : SPECIES;
const entries = [];
const seen = new Set();

for (const name of wanted) {
    const a = catalogue.find((x) => x.name === name);
    if (!a) {
        process.stderr.write(`! not found: ${name}\n`);
        process.exitCode = 1;
        continue;
    }
    if (seen.has(name)) continue;
    seen.add(name);

    const p = a.params;
    if (p.R > RMAX) {
        process.stderr.write(`! ${name}: R=${p.R} exceeds RMAX=${RMAX}, skipped\n`);
        process.exitCode = 1;
        continue;
    }
    if (!SUPPORTED_KN.includes(p.kn) || !SUPPORTED_GN.includes(p.gn)) {
        process.stderr.write(`! ${name}: kn=${p.kn} gn=${p.gn} unimplemented, skipped\n`);
        process.exitCode = 1;
        continue;
    }

    const grid = rle2arr(a.cells);
    const h = grid.length;
    const w = grid[0].length;
    const bytes = Buffer.alloc(w * h);
    grid.forEach((r, y) =>
        r.forEach((v, x) => {
            bytes[y * w + x] = Math.max(0, Math.min(255, Math.round(v * 255)));
        }),
    );

    entries.push({
        name,
        R: p.R,
        dt: Number((1 / p.T).toFixed(6)),
        mu: p.m,
        sigma: p.s,
        beta: parseBeta(p.b),
        kn: p.kn,
        gn: p.gn,
        w,
        h,
        data: bytes.toString("base64"),
    });

    const mass = grid.flat().reduce((t, v) => t + v, 0);
    process.stdout.write(
        `${name.padEnd(30)} R=${String(p.R).padStart(2)} ${w}x${h} ` +
            `mass=${mass.toFixed(1)} beta=[${parseBeta(p.b).join(", ")}]\n`,
    );
}

if (!entries.length) {
    process.stderr.write("nothing to write\n");
    process.exit(1);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, emit(entries));
process.stdout.write(`\nwrote ${OUT} (${entries.length} presets)\n`);
