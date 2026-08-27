# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mackenzie Sampson's personal portfolio: a single-page React app built with Vite and Tailwind CSS,
deployed as a static build to GitHub Pages (see `CNAME`, `.github/workflows/deploy.yml`).

**Positioning: backend and systems engineering.** Copy leads with services, schemas, and cloud
infrastructure (Go, TypeScript, Postgres, AWS). Graphics work (rasterizers, path tracers, shaders)
sits at the tail as evidence of low-level depth, never as the identity. Avoid framing Mackenzie as
a "graphics engineer" or "technical artist," with one exception: the EA role's real title is
"Technical Artist, Tools & Pipeline," which the résumé uses and the site matches for consistency."

The audience is recruiters. Optimize for fast scanning: contact details and résumé above the fold,
one screen of substance, no click-throughs required to read anything.

## Development Commands

- `npm run dev` - Vite dev server with hot reload
- `npm run build` - Production build to `dist/`
- `npm run preview` - Serve the production build locally
- `npm run lint` - ESLint

## Tech Stack

- **React 19** + **Vite 7** - single page, no router
- **Tailwind CSS 3** - `tailwind.config.js`, PostCSS in `postcss.config.js`
- No animation, icon, or 3D libraries. Section entry is a CSS `fade-in` keyframe;
  icons are hand-written inline SVG in `components/UI/Icons.jsx`.
- **WebGPU** (raw, no wrapper) for the Lenia background. WGSL lives in real `.wgsl`
  files imported with Vite's `?raw`.

## Architecture

**All site content lives in `src/content.js`.** Components are presentational and import from it.
Editing site content means editing that one file, never the components.

```
/
├── index.html              (Vite entry; title, meta description, OG tags)
├── src/
│   ├── main.jsx            (React root)
│   ├── App.jsx             (persistent header + active tab + footer)
│   ├── router.js           (TABS table, useTab hook, hrefFor)
│   ├── content.js          (profile, links, education, skills, projects, experience)
│   ├── index.css           (Tailwind directives, .kicker / .link / .icon-link / .nav-link)
│   ├── lenia/              (WebGPU Lenia background, see below)
│   │   ├── lenia.js        (device setup, ping-pong dispatch, render pass)
│   │   ├── kernel.js       (kernel precompute, creature seeding)
│   │   ├── presets.js      (generated from Chan's animals.json; do not hand-edit)
│   │   └── shaders/        (update.wgsl, render.wgsl)
│   └── components/UI/
│       ├── Icons.jsx              (inline SVG icons, 16px, currentColor)
│       ├── LeniaBackground.jsx    (canvas layer, lifecycle, fallback, debug panel)
│       ├── Header.jsx             (avatar, name, role, location, tab nav)
│       ├── AboutSection.jsx       (intro, education, skills)
│       ├── ProjectsSection.jsx    (text-only project rows)
│       ├── ExperienceSection.jsx  (compressed work history)
│       ├── LinksSection.jsx       (email, resume, socials, each with an icon)
│       └── Footer.jsx
├── public/assets/          (served at /assets/...)
└── legacy_v2/              (old static site; eslint-ignored, not part of the build)
```

### Tabs

Three tabs held in React state and mirrored into the URL hash by `src/router.js`: Home (about,
education, skills, links), `#projects`, and `#work`. **This is not a router.** There are no real
paths, so GitHub Pages needs no rewrite rules and every URL returns a 200.

- Add a tab by extending `TABS` in `router.js` and the `pages` map in `App.jsx`, keyed by the
  same id.
- The hash exists only so tabs are linkable and the back button steps between them. Nothing reads
  `location.pathname`.
- **Do not give any section an `id` matching a tab id.** The browser would then natively scroll to
  that element on hash change and fight the tab switch.
- The header persists across tabs; only the keyed content div re-renders, replaying `.page-fade-in`.

### Layout conventions

The visual style deliberately follows wcagas.com. Keep these rules when adding anything:

- Single column, `max-w-measure` (720px). No cards, no modals, no tag chips, no borders
  around list items. Sections are separated by `mb-[42px]` whitespace alone.
- `.kicker` (10px uppercase, 0.12em tracking) for section headings, with **no rule beneath**.
- Every list item is: bold 15px title on the left, muted metadata right-aligned on the same
  baseline, then `text-small` detail lines at `mt-[3px]`.
- `.link` underlines with `border-bottom`, never `text-decoration`, and hovers to 85% opacity.
- Every link carries an icon: a brand mark for socials, `ArrowIcon` for other external links.
- Avatar is a 104px squircle (`rounded-[22px]`), above the name, not a circle.
- `.nav-link` reserves its bold width with an `::after` clone so switching tabs never shifts
  the nav row. Keep both `content` declarations. Its `::before` is the tap area, kept separate
  so the active underline stays tight against the label.
- `.page-shell` owns the column's padding. Its generous vertical padding is gated on
  `min-height: 600px` as well as `sm`, so a landscape phone is wide enough for `sm` but does
  not get 64px of dead space above the fold.
- **Title/metadata rows stay side by side on mobile only while the metadata is short** (a year,
  a date range). Education stacks below `sm` because the degree is long enough to squeeze the
  school name onto three lines at 320px.
- Every link must have at least a 24px tap area. Text links that are shorter than that get
  `.tap-target` (standalone rows: the links list, the footer) or `.tap-target-sm` (a title link
  sitting directly above its own detail lines, where a taller overlay would steal taps from that
  text). Both grow the hit box with an absolutely positioned `::before`, so neither moves layout
  or shifts an underline.

## Lenia background

A continuous cellular automaton (Bert Chan's Lenia) running as a full-page ambient layer
behind the content, updated entirely in a WGSL compute shader.

- `A(t+dt) = clip(A + dt * G(K * A), 0, 1)` on a toroidal grid, one invocation per cell.
- Two `vec2<f32>` storage buffers ping-pong each step: `.x` is state, `.y` a decaying trail.
- Each 16x16 workgroup stages its tile plus an R-wide halo into workgroup memory, so the
  `(2R+1)^2` taps per cell hit shared memory. The halo is sized for `RMAX=20`
  (56x56 f32 = 12.25 KB, under the 16 KB guaranteed limit). **`RMAX` in `update.wgsl` and
  `lenia.js` must stay in sync**, as must `TILE` and `WORKGROUP`.
- Kernel weights are precomputed on the CPU whenever R/beta/core change, never per frame.
- The convolution walks only the kernel *disc*, bounding each row to
  `|dx| <= sqrt(R^2 - dy^2)`. Exact, not an approximation: the skipped taps have weight zero.
  Saves ~21% (1 - pi/4) of the work. Verified against a naive convolution to 0 difference.
- **`src/lenia/presets.js` is generated. Do not hand-edit it.** Change the `SPECIES` list in
  `scripts/build-presets.mjs`, then `npm run presets` and `npm run presets:check`.
  `npm run presets -- --list` shows the 310 runnable species of Chan's 548.
- **Always run `npm run presets:check` after changing the preset list.** It runs the CPU
  reference and fails on any creature that dies or explodes; both are silent in the browser.
  Some species are only stable under their published `kn`/`gn` (Helicium cavus pedes explodes
  7x under the site's Gaussian default), which is what `options.core/growth = "auto"` is for.
- Seeding never uses random noise (it dies or turns to mush). It spawns several copies of one
  preset creature at random positions and axis-aligned rotations.
- Each load randomises preset, palette (`PALETTES`), colour intensity, and creature count.
- **mu/sigma jitter has per-preset ceilings in `JITTER_LIMIT`, established by CPU runs.** The
  Orbiums and Gyrorbium tolerate +/-5% and break at +/-8%; Hydrogeminium explodes to 7x mass at
  +/-3% and is capped at 1%. Re-validate before widening any of them: an unstable preset either
  dies to a blank page or floods the whole grid.
- **Simulation and display rates are decoupled.** Steps run at a fixed 30/s; the render pass
  binds *both* ping-pong buffers and interpolates between them with `View.alpha`, so the page
  draws at display rate. `renderGroups[src]` binds `state[1-src]` as prev, `state[src]` as curr.
  Right after a step `alpha` is 0, not 1. The backing store is capped at 1x DPR (`dprCap`).
- **The render loop applies backpressure**: at most `MAX_PENDING` (2) frames in flight
  (`pending` + `onSubmittedWorkDone`), and only stepping frames are timed. Removing this lets the queue grow
  without bound on a slow device, which can take down the browser's GPU process. A watchdog
  drops to 10 steps/s past 50ms/frame and stops entirely past 250ms/frame.
- `init()` validates workgroup storage, invocations, storage-buffer size, and fragment-stage
  storage buffers up front, so an unsupported device lands on the CSS fallback rather than
  failing mid-frame.
- Grid is fixed at 384 (256 on coarse pointers or a software `isFallbackAdapter`) and never
  reallocated; resize only rescales
  device-pixels-per-cell. Steps run at 30/s, pause on `visibilitychange`, and
  `prefers-reduced-motion` renders a static frame instead of animating.
- No WebGPU means no canvas: the component falls back to `.lenia-fallback` gradients.
- `?lenia` in the query string enables a debug panel (preset picker, mu/sigma/dt/intensity).
- Validate shader edits with `naga src/lenia/shaders/*.wgsl` — the build does **not** compile WGSL.

## Styling

- Palette: cream `background` `#fdfaf6`, near-black `primary` `#1c1917` for headings, softer
  `body` `#585654` for prose, `secondary` `#605d59` for metadata, `rule` `#e7e5e4` hairlines.
- Fonts: Inter (`font-sans`) for everything, Satoshi (`font-display`) for the name only.
- Sizes come from custom properties defined on `:root` in `index.css`, so the whole scale steps
  up as one below 640px: `text-base` 15 -> 16px, `text-meta` 0.9 -> 0.95rem, `text-small`
  13.5 -> 14.5px, `text-kicker` 10 -> 11px. **Add new sizes to that scale rather than hard-coding
  a `text-[0.9rem]`**, or they will stay desktop-sized on a phone.
- `body` sets `overflow-wrap: break-word` so no long identifier can widen the page at 320px.
- Avoid em-dashes in user-facing copy (use colons/commas instead).

## Content Updates

1. Everything (projects, experience, skills, intro, links) is in `src/content.js`. It mirrors the
   résumé; when the résumé changes, update this file in the same pass or the two will drift.
2. Project rows are text-only by design (matching the reference style), so the `image` and
   `thumbnail` fields in `content.js` are currently unused by any component. They are retained for
   a possible preview treatment later.
3. `npm run build` to verify a clean production build.

## Résumé

`public/assets/resume.pdf` is **generated, not committed** (it is gitignored). The source of truth
is the private `macsampson/resumes` repo, at the path in the `RESUME_SOURCE` env var in
`.github/workflows/deploy.yml`.

- **CI**: the deploy workflow sparse-checks-out that single file using the `RESUME_REPO_TOKEN`
  secret, then copies it into `public/assets/` before the build. The fetch is `continue-on-error`
  so a missing or expired token degrades to a 404 on the résumé link rather than failing the
  deploy; it emits a workflow warning instead.
- **Locally**: `npm run resume` does the same thing through `gh` using your own auth.
- The workflow also runs on a daily `schedule`, so updating the résumé in the private repo reaches
  the site without a push here.
- Never fetch this at runtime. A token capable of reading a private repo cannot be shipped to the
  browser. Note also that the deployed PDF is public regardless of the source repo's visibility.

## Planned work

Step 3 of the current redesign adds a build-time GitHub API fetch (`scripts/fetch-repos.mjs` writing
`src/data/repos.json`, run from the deploy workflow with `GITHUB_TOKEN` and a `schedule:` cron) so
repos tagged with a `portfolio` topic auto-populate a secondary list. Hand-written entries in
`content.js` stay the curated featured set. Step 4 adds a WGSL compute path tracer in the hero, with
a static webp fallback and reduced-motion/visibility gating.
