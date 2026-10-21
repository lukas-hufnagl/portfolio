# Personal Portfolio

Personal site of Lukas Hufnagl, built with Vue 3 (`<script setup lang="ts">` throughout), Vue Router, Vite and Tailwind CSS 4 (via `@tailwindcss/vite`). Components style themselves with scoped CSS on top of the design tokens in `main.css`.

## Structure

```
src
├── content/        # site.ts: all copy and data · pages.ts: routes, titles, descriptions
├── lib/            # small pure helpers, unit tested (career.ts, projects.ts, text.ts)
├── router/         # routes built from pages.ts, per-page <title>/meta (meta.ts)
├── views/          # HomeView (one screen), AboutView, CareerView, WorkView, ProjectView
├── components/     # header + wordmark, footer, theme toggle, portrait, link/contact rows
├── composables/    # useDarkMode
└── assets/styles/  # main.css: design tokens and shared layout (.column, .rows, .row)
public/             # CNAME, favicon, touch icon, robots.txt, optimised portrait images
docs/               # build output (npm run build) — the folder GitHub Pages publishes
```

## Pages

- `/` — one screen: name, one sentence, a line each for About, Career and Work, and contact.
- `/about`, `/career`, `/work` — lazy-loaded subpages.
- `/work/<slug>` — one page per project in `projects` (`src/content/site.ts`).

GitHub Pages serves files, not routes, so the build (see `vite.config.js`) writes a static
`index.html` for every page and project — each with its own title, description and canonical
URL — plus `404.html` and `sitemap.xml`.

To add a project: add an entry to `projects` in `src/content/site.ts`. Its page, the static
HTML and the sitemap entry follow automatically.

## Scripts

```
npm install
npm run dev      # http://localhost:3000
npm test         # unit tests (Vitest)
npm run lint     # ESLint
npm run typecheck # vue-tsc for the app, tsc for vite.config.ts
npm run build    # typecheck + build into docs/
npm run deploy   # publish docs/ to GitHub Pages
```

## License

All rights reserved. See [LICENSE](LICENSE).
