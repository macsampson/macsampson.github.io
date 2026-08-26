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
│   └── components/UI/
│       ├── Icons.jsx              (inline SVG icons, 16px, currentColor)
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
  the nav row. Keep both `content` declarations.

## Styling

- Palette: cream `background` `#fdfaf6`, near-black `primary` `#1c1917` for headings, softer
  `body` `#585654` for prose, `secondary` `#605d59` for metadata, `rule` `#e7e5e4` hairlines.
- Fonts: Inter (`font-sans`) for everything, Satoshi (`font-display`) for the name only.
- Sizes: `text-base` is 15px/1.6, `text-small` is 13.5px, `text-kicker` is 10px.
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
