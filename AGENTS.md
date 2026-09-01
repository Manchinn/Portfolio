# AGENTS.md

Guidance for AI agents working in this portfolio repository.

## Repository Scope

This folder is the real git repository:

```text
C:\Users\chinn\web-projects\portfolio\frontend
```

The parent folder contains project-level docs. Run git and package commands from this `frontend` folder.

## Current Product

- Static-first **Astro 5** portfolio, bilingual English and Thai, **Product Studio** design.
- `/` renders the English one-page portfolio; `/th/` renders the Thai version.
- Content lives in Astro content collections: projects (`src/content/projects/{en,th}/`) and articles (`src/content/articles/{en,th}/`) — **both currently empty**. The Work section renders a graceful empty state until entries are added.
- All chrome/marketing copy lives in `src/i18n/ui.ts`.
- Contact CTAs open a public GitHub Issues URL (`PUBLIC_CONTACT_URL`) in `src/data/types.ts`. The app does not collect or store inquiry form data.

There is no backend, application API, runtime database, CMS, server-side content store, or required runtime environment variable.

## Hard Rules

1. Keep the site static-first. Do not add a backend, API route, runtime storage, or runtime secret unless the user explicitly approves an architecture change.
2. Preserve English and Thai parity. Update both locales when changing user-facing content or content records.
3. Treat content collections (`src/content/`) as the source of truth for entity content, and `src/i18n/ui.ts` for chrome/marketing copy.
4. Keep article/project slugs and filenames aligned across locales; the slug is derived from the entry id via `entrySlug()` — do **not** declare a `slug` field in content frontmatter (Astro reserves it).
5. Keep inquiry handoff external: contact CTAs may open `PUBLIC_CONTACT_URL` (public GitHub Issues) but must not add an app form submission/storage path without explicit approval.
6. Keep public copy sanitized. Do not expose credentials, private URLs, personal data, or internal operational details.
7. Use `npm run build` (astro build) as the required implementation gate; `npx astro check` should report 0 errors.
8. Preserve user changes and keep edits scoped to the requested work.
9. Do not restore `/saas`, `/work/[slug]`, `/work-with-me`, or the old `/article/[slug]` route unless the user explicitly reopens those product surfaces.

## Architecture Map

```text
src/content.config.ts                     Content schemas + entrySlug() helper
src/content/projects/{en,th}/             JSON project records (per locale) — empty
src/content/articles/{en,th}/             Markdown articles (per locale) — empty
src/i18n/ui.ts                            EN/TH chrome + marketing copy (getUI)
src/i18n/utils.ts                         Locale helpers
src/layouts/BaseLayout.astro              HTML shell, fonts, metadata, global CSS
src/pages/index.astro                     English home (default locale)
src/pages/th/index.astro                  Thai home
src/pages/404.astro                       404 page
src/components/home/                      Navbar, Hero, Work, Capabilities, Contact, Footer, HomePage
src/components/ui/                        Button, SectionLabel, SectionHeading, MobileMenu (React island)
src/components/motion/Reveal.astro        Hero-only stagger (reduced-motion aware)
src/styles/global.css                     Tailwind v4 @theme tokens + Product Studio recipes
astro.config.mjs                          site, static output, i18n routing, integrations
vercel.json                               Vercel Astro framework + build/output
```

`astro.config.mjs` sets `output: 'static'`, `site: 'https://www.chinnakrit.dev'`, i18n routing with `prefixDefaultLocale: false`, and integrates React, sitemap, and Tailwind v4 via the Vite plugin.

## Commands and Verification

```sh
npm run dev        # astro dev — http://localhost:4321
npm run build      # astro build — the implementation gate
npx astro check    # TypeScript diagnostics (expect 0 errors)
npm run preview    # serve the built dist/
```

## Security Checklist

Before committing public-facing changes:

- No hardcoded secrets, credentials, private domains, or private network details.
- No unreviewed personal or operational details in portfolio content.
- The public-issue warning remains visible in the project inquiry workflow.
- Rebuild the production output with `npm run build` and review it.

## External Actions

Require explicit user approval before:

- `git push`
- Creating pull requests or releases
- Changing infrastructure, credentials, domains, or Vercel settings
- Calling external services beyond normal package and build tooling
