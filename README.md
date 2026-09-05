# Software Engineering Portfolio

Static-first, software engineering portfolio with bilingual English and Thai content. It presents project proof, technical articles, capabilities, and a privacy-conscious project inquiry workflow.

Built with **Astro** — static SSG, content collections, built-in i18n routing, and a React island for the mobile menu. The Machine Readout design tokens come from `DESIGN.md`.

## Stack

- Astro 5 (static output)
- Content Collections (projects + articles, per-locale)
- Built-in i18n routing (`en` default at `/`, `th` at `/th/`)
- React 19 island (mobile menu) via `@astrojs/react`
- Tailwind CSS 4 (`@tailwindcss/vite`)
- TypeScript
- `@astrojs/sitemap` — deployed on Vercel from `master`

The app has no backend, application API, runtime database, CMS, or required runtime environment variables.

## Routes

- `/` — English portfolio home
- `/th/` — Thai portfolio home
- `/notes/` — English notes and runbook index
- `/th/notes/` — Thai notes and runbook index
- `/notes/[slug]/` and `/th/notes/[slug]/` — localized static note pages
- Contact CTAs open a public GitHub Issues URL (`src/data/types.ts` → `PUBLIC_CONTACT_URL`)

## Content

- `src/content/projects/{en,th}/` — localized project records (JSON)
- `src/content/articles/{en,th}/` — localized notes/runbooks (Markdown, curated before publication)
- `src/i18n/ui.ts` — all chrome/marketing copy (EN/TH) + `getUI()` + per-locale `META_DESCRIPTION`
- `src/content.config.ts` — content schemas + `entrySlug()` (slug derived from entry id, not frontmatter — Astro reserves `slug`)
- The slug is derived from the entry id (filename); do **not** declare `slug` in the schema/frontmatter.

Keep English and Thai records synchronized, including article slugs and filenames.

## SEO and Fonts

- Static OG cards per locale: `public/og/og-{en,th}.png` (1200x630), referenced from `BaseLayout.astro` with full Open Graph + Twitter meta and absolute canonical/hreflang.
- Fonts are fully self-hosted (`public/fonts/` — Courier Prime + Noto Sans Thai woff2 with unicode-range subsets). No Google Fonts request; regenerate with `python scripts/fetch-fonts.py`.
- OG cards regenerate via `scripts/og/render.sh` (isolated Edge headless profile).

## Local Development

```sh
npm install
npm run dev
```

Open `http://localhost:4321`.

## Verification

```sh
npm run build        # astro build — the completion gate
npx astro check      # TypeScript diagnostics (0 errors expected)
npm run preview      # serve dist locally
```

## Content and Privacy

- Keep English and Thai user-facing content in sync.
- Keep public copy free of credentials, private URLs, personal data, and internal operational details.
- Contact CTAs open a public GitHub Issues URL. This app does not collect or store inquiry form data.
- Use `npm run build` as the required completion gate for implementation changes.
