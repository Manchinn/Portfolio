# AGENTS.md

Guidance for AI agents working in this Next.js portfolio repository.

## Repository Scope

This folder is the real git repository:

```text
C:\Users\chinn\web-projects\portfolio\frontend
```

The parent folder contains project-level docs. Run git and package commands from this `frontend` folder.

## Current Product

- Static-first, anonymous software engineering portfolio.
- Bilingual English and Thai presentation with the selected language remembered in browser storage.
- `/` renders the one-page portfolio experience from typed local data (selected work, capabilities, articles, contact).
- `/article/[slug]` is a statically generated article route.
- Contact CTAs open a public GitHub Issues URL (`publicContactUrl`). The app does not collect or store inquiry form data.
- The `(portfolio)` route-group layout owns the shared navbar and footer.

There is no backend, application API, runtime database, CMS, server-side content store, work-detail route, work-with-me intake page, or required runtime environment variable in the current architecture.

## Hard Rules

1. Keep the site static-first. Do not add a backend, API route, runtime storage, or runtime secret unless the user explicitly approves an architecture change.
2. Preserve English and Thai parity. Update both locales when changing user-facing content or typed portfolio records.
3. Treat `src/data/portfolio.ts` as the source of truth for navigation, projects, articles, and the public contact URL.
4. Keep project and article slugs aligned across locales because static params are generated from English records and localized content is selected in the client.
5. Keep inquiry handoff external: contact CTAs may open `publicContactUrl` (public GitHub Issues) but must not add an app form submission/storage path without explicit approval.
6. Keep public copy sanitized. Do not expose credentials, private URLs, personal data, or internal operational details.
7. Use `npm run build` as the required implementation gate. It invokes the repository build wrapper, not `next build` directly.
8. Preserve user changes and keep edits scoped to the requested work.
9. Do not restore `/saas`, `/work/[slug]`, or `/work-with-me` unless the user explicitly reopens those product surfaces.

## Architecture Map

```text
src/app/layout.tsx                         Root fonts, metadata, and LanguageProvider
src/app/(portfolio)/layout.tsx             Shared Navbar and Footer shell
src/app/(portfolio)/page.tsx               Portfolio home (one-page)
src/app/(portfolio)/article/[slug]/        Static article route
src/app/sitemap.ts                         Static sitemap entries
src/components/portfolio/                 Main portfolio experience
src/components/layout/                     Shared navigation and footer
src/components/motion/                     Motion primitives
src/data/portfolio.ts                      Bilingual portfolio source of truth
src/data/types.ts                          Content contracts
src/content/shared.ts                      Shared EN/TH chrome labels and CTAs
src/i18n/                                  Language state, helpers, and UI locale files
docs/agents/MEMORY.md                      Durable agent memory (anti-drift)
CHANGELOG.md                               Notable repository changes
next.config.ts                             Security headers and build-only distDir override
scripts/build.mjs                          Dev-server-safe Next.js build wrapper
```

`next.config.ts` does not define application redirects. It applies security headers globally and honors the build-only `NEXT_DIST_DIR` override used by `scripts/build.mjs`.

## Commands and Verification

```powershell
npm run dev
npm run build
powershell -ExecutionPolicy Bypass -File scripts/verify.ps1
powershell -ExecutionPolicy Bypass -File scripts/review.ps1
powershell -ExecutionPolicy Bypass -File scripts/deploy-check.ps1 -Env preview
```

The build wrapper checks local ports `3000` through `3003`. When a dev server is active, it builds into `.next-build-local` and restores Next-generated config files so verification does not disturb the running `.next` instance. CI and Vercel use the normal build directory.

The verification scripts detect available typecheck, lint, and test support, then use the production build as the final gate. The deploy check also inspects git state, tracked environment files, public-copy safety, and obvious secrets.

## Security Checklist

Before committing public-facing changes:

- No hardcoded secrets, credentials, private domains, or private network details.
- No unreviewed personal or operational details in portfolio content.
- The public-issue warning remains visible in the project inquiry workflow.
- Security headers remain in `next.config.ts` unless a documented requirement changes them.
- `git diff` and build output have been reviewed.

## External Actions

Require explicit user approval before:

- `git push`
- Creating pull requests or releases
- Changing infrastructure, credentials, domains, or Vercel settings
- Calling external services beyond normal package and build tooling
