# Chinnakrit Portfolio

Static-first personal site with bilingual English and Thai notes, runbooks, and project records. Every public route uses the real [Fuwari](https://github.com/saicaca/fuwari) Astro template shell, adapted for the portfolio's content collections and EN/TH routing. A minimal contact form exists (Supabase Edge Function + owner-only inbox); there is no analytics or visitor tracking.

## Stack

- Astro 5 (static output)
- Fuwari layout pattern: banner, navbar, profile sidebar, categories/tags, post cards, TOC, dark mode, hue control, and back-to-top
- Astro content collections (projects + articles, per locale) with a Supabase-backed CMS: published content is read at build time, edited via the owner-only `/admin` SPA, and published changes rebuild the site automatically
- Built-in i18n routing (`en` at `/`, `th` at `/th/`)
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Astro Svelte + React islands (search control, theme/menu controls)
- TypeScript and `astro-icon`
- `@astrojs/sitemap` — deployed on Vercel from `master`

The public site is fully static. Supabase supplies build-time content reads (publishable key only; RLS-guarded), the `/admin` editor (Supabase Auth + RLS), and the contact intake Edge Function — no service-role secret ships with the site, and no runtime environment variables are required.

## Routes

- `/` — English Fuwari portfolio home
- `/th/` — Thai Fuwari portfolio home
- `/posts/` — English notes and runbook index
- `/th/posts/` — Thai notes and runbook index
- `/posts/[slug]/` and `/th/posts/[slug]/` — localized static note pages
- `/work/` and `/th/work/` — localized project index (Fuwari style)
- `/work/[slug]/` and `/th/work/[slug]/` — localized static project detail pages
- `/about/` and `/th/about/` — localized about pages
- `/archive/` and `/th/archive/` — localized archive pages
- `/admin/` — owner-only SPA (content editing + submissions inbox, `noindex`)

## Architecture

- `src/layouts/MainGridLayout.astro` — shared Fuwari page shell and banner/TOC behavior
- `src/components/Navbar.astro`, `Footer.astro`, `widget/` — Fuwari chrome and sidebar widgets
- `src/components/PortfolioHome.astro` — portfolio-specific home composition
- `src/components/home/` — Work and Capabilities sections inserted into the Fuwari shell
- `src/styles/global.css` — Tailwind tokens plus Fuwari theme recipes

## Content

- `src/content/projects/{en,th}/` — localized project records (JSON)
- `src/content/articles/{en,th}/` — localized notes/runbooks (Markdown, curated before publication)
- `src/i18n/ui.ts` — all chrome/marketing copy (EN/TH) and locale descriptions
- `src/content.config.ts` — content schemas and `entrySlug()`; slugs come from entry filenames, not frontmatter

Keep English and Thai records synchronized, including article slugs and filenames.

## SEO and Fonts

- Static OG cards per locale: `public/og/og-{en,th}.png` (1200x630), referenced from `BaseLayout.astro` with Open Graph, Twitter, canonical, and hreflang metadata.
- Fonts are self-hosted in `public/fonts/`; no Google Fonts request is required.
- Fuwari attribution and license text are kept in `LICENSE-FUWARI`.

## Local Development

```sh
npm install
npm run dev
```

Open `http://localhost:4321` (Astro selects the next available port if it is occupied).

## Verification

```sh
npx astro check      # TypeScript diagnostics: 0 errors, 0 warnings, 0 hints
npm run build        # static production build: required completion gate
npm run preview      # serve dist locally
```

## Content and Privacy

- Keep English and Thai user-facing content in sync.
- Keep public copy free of credentials, private URLs, personal data, and internal operational details.
- The minimal contact form + `/admin` inbox already exist by design; do not expand them into analytics, visitor profiles, or tracking — and do not add another contact, lead-capture, or project-intake path without explicit product approval.
