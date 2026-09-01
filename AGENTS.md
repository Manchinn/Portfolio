# AGENTS.md

Guidance for AI agents working in this portfolio repository.

## Repository Scope

This folder is the real git repository:

```text
C:\Users\chinn\web-projects\portfolio\frontend
```

The parent folder contains project-level docs. Run git and package commands from this `frontend` folder.

## Current Product

- Static-first Astro portfolio, bilingual English and Thai, soft-pixel design.
- `/` renders the English one-page portfolio; `/th/` renders the Thai version.
- `/article/[slug]/` and `/th/article/[slug]/` are statically generated article routes.
- Contact CTAs open a public GitHub Issues URL (`PUBLIC_CONTACT_URL`) in `src/data/types.ts`. The app does not collect or store inquiry form data.
- Content lives in Astro **content collections**: projects (`src/content/projects/{en,th}/`) and articles (`src/content/articles/{en,th}/`). All chrome/marketing copy lives in `src/i18n/ui.ts`.

There is no backend, application API, runtime database, CMS, server-side content store, or required runtime environment variable in the current architecture.

## Hard Rules

1. Keep the site static-first. Do not add a backend, API route, runtime storage, or runtime secret unless the user explicitly approves an architecture change.
2. Preserve English and Thai parity. Update both locales when changing user-facing content or content records.
3. Treat `src/i18n/ui.ts` as the source of truth for chrome/marketing copy, and the content collections for entity content.
4. Keep article slugs and filenames aligned across locales; the slug is derived from the entry id.
5. Keep inquiry handoff external: contact CTAs may open `PUBLIC_CONTACT_URL` (public GitHub Issues) but must not add an app form submission/storage path without explicit approval.
6. Keep public copy sanitized. Do not expose credentials, private URLs, personal data, or internal operational details.
7. Use `npm run build` (astro build) as the required implementation gate. `npx astro check` should report 0 errors.
8. Preserve user changes and keep edits scoped to the requested work.
9. Do not restore `/saas`, `/work/[slug]`, or `/work-with-me` unless the user explicitly reopens those product surfaces.

## Architecture Map

```text
src/content.config.ts                     Content schemas + entrySlug() helper
src/content/projects/{en,th}/             JSON project records (per locale)
src/content/articles/{en,th}/             Markdown articles (per locale)
src/i18n/ui.ts                            EN/TH chrome + marketing copy (getUI)
src/i18n/utils.ts                         Locale helpers
src/layouts/BaseLayout.astro              HTML shell, fonts, metadata, global CSS
src/layouts/ArticleLayout.astro           Article page shell
src/pages/index.astro                     English home (default locale)
src/pages/th/index.astro                  Thai home
src/pages/article/[slug]/index.astro      English article route
src/pages/th/article/[slug]/index.astro   Thai article route
src/pages/404.astro                       404 page
src/components/home/                      Navbar, Footer, Hero, SelectedWork, Capabilities, ArticlesIndex, Contact
src/components/ui/                        Button, SectionLabel, SectionHeading, MobileMenu (React island)
src/components/motion/Reveal.astro        Hero-only stagger (reduced-motion aware)
src/styles/global.css                     Tailwind v4 @theme tokens + soft-pixel recipes
astro.config.mjs                          site, static output, i18n routing, integrations
```

`astro.config.mjs` sets `output: 'static'`, i18n routing with `prefixDefaultLocale: false`, and integrates React, sitemap, and Tailwind v4 via the Vite plugin.

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
