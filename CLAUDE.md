# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Mackenzie Sampson's personal portfolio website — a single-page React app built with
Vite and Tailwind CSS. It is positioned as a **software-engineering** portfolio: a visual
showcase of technical projects, skills, and work experience. Technical-art work lives separately
on ArtStation (linked from the hero, but no art content is hosted here).

The site deploys as a static build to GitHub Pages (see `CNAME`, `.github/`).

## Development Commands

- `npm run dev` - Start the Vite dev server with hot reload
- `npm run build` - Production build to `dist/`
- `npm run preview` - Serve the production build locally
- `npm run lint` - Run ESLint

## Tech Stack

- **React 19** + **Vite 7** — single-page app, no router
- **Tailwind CSS 3** — styling (config in `tailwind.config.js`, PostCSS in `postcss.config.js`)
- **Framer Motion** — section fade/slide animations
- **lucide-react** — icons
- **@react-three/fiber + @react-three/drei + three** — installed for 3D work
  (note: the Three.js background is not currently mounted in `App.jsx`)

## Architecture & Code Structure

The app is content-driven: each section component holds its content as a hard-coded data array
(`projects`, `experiences`, etc.) and maps over it. Editing site content means editing these
arrays, not separate data files.

```
/
├── index.html              (Vite entry HTML)
├── src/
│   ├── main.jsx            (React root)
│   ├── App.jsx             (composes the sections)
│   ├── index.css           (Tailwind directives + globals)
│   └── components/
│       ├── Three/ThreeBackground.jsx          (R3F background; not currently mounted)
│       └── UI/
│           ├── HeroSection.jsx                 (name, title, intro, social links, skills, education)
│           ├── ProjectsSection.jsx             (project grid + click-through modal)
│           ├── ExperienceSection.jsx           (work history)
│           ├── ArtisticFoundationsSection.jsx  (art pieces; commented out in App.jsx)
│           └── Footer.jsx
├── public/assets/          (images, resume, etc. — served at /assets/...)
├── tailwind.config.js
├── vite.config.js
└── legacy_v2/              (old static HTML/terminal site; not part of the build)
```

### Section components

- **HeroSection.jsx** — profile photo, name, title (`Software Engineer · Graphics & Systems`),
  three intro paragraphs, GitHub/ArtStation/LinkedIn links, and a skills sidebar built from the
  reusable `SkillGroup` component (`Languages`, `Graphics & Systems`, `Tools`) plus Education.
- **ProjectsSection.jsx** — the `projects` array drives a responsive card grid. Each card flips
  between a static `thumbnail` and an animated `image` (webp) on hover. Clicking opens
  `ProjectModal`, which renders the image, tag chips, optional GitHub/Demo buttons, and a
  bulleted `description`. Project fields: `title`, `date`, `image`, `thumbnail`, `description[]`,
  `tags[]`, optional `githubUrl`, optional `demoUrl`.
- **ExperienceSection.jsx** — the `experiences` array drives work-history cards
  (`role`, `company`, optional `url`, `period`, `description[]`, `tags[]`).
- **ArtisticFoundationsSection.jsx** — exists but is commented out in `App.jsx` (art content
  lives on ArtStation).

## Styling

- Tailwind utility classes throughout; custom theme tokens (`primary`, `secondary`, `background`,
  fonts `font-spectral` / `font-merriweather`) are defined in `tailwind.config.js`.
- Color scheme centers on a brown primary (`#463a2e`).
- Avoid em-dashes in user-facing copy (use colons/commas instead).

## Content Updates

1. **Projects** — edit the `projects` array in `src/components/UI/ProjectsSection.jsx`.
   Add image assets under `public/assets/images/projects/` (animated `image` webp + static
   `thumbnail` frame).
2. **Experience** — edit the `experiences` array in `src/components/UI/ExperienceSection.jsx`.
3. **Intro / skills / links** — edit `src/components/UI/HeroSection.jsx`.
4. Run `npm run dev` to preview, `npm run build` to verify a clean production build.
