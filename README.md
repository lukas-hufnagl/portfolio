# Personal Portfolio

Personal site of Lukas Hufnagl, built with Vue 3 (`<script setup lang="ts">` throughout), Vue Router, Vite and Tailwind CSS 4 (via `@tailwindcss/vite`). Components are styled with Tailwind utility classes; colours, fonts and easings are Tailwind theme tokens, and the few repeated patterns are custom utilities — all in `main.css`.

## Structure

```
src
├── content/        # site.ts: all copy and data · pages.ts: routes, titles, descriptions
├── lib/            # small pure helpers, unit tested (career.ts, projects.ts, text.ts)
├── router/         # routes built from pages.ts, per-page <title>/meta (meta.ts)
├── views/          # HomeView (one screen), AboutView, CareerView, WorkView, ProjectView
├── components/     # header + wordmark, footer, theme toggle, portrait, link/contact rows
├── composables/    # useDarkMode
└── assets/styles/  # main.css: Tailwind theme tokens and custom utilities (frame, rows, row, mono, …)
public/             # CNAME, favicon, touch icon, robots.txt, optimised portrait images
docs/               # build output (npm run build) — the folder GitHub Pages publishes
```

## Pages

- `/` — one screen: name, current role and location, one sentence, and contact.
- `/about`, `/career`, `/work` — subpages (bundled with the home page, so switching is instant).
- `/work/<slug>` — one page per project in `projects` (`src/content/site.ts`).

GitHub Pages serves files, not routes, so the build (see `vite.config.ts`) writes a static
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
```

## Deploy

GitHub Pages publishes the `docs/` folder of `main`. To deploy: `npm run build`, commit the
changes (including `docs/`) and push `main`. The live site updates about a minute later.

## License

All rights reserved. See [LICENSE](LICENSE).
