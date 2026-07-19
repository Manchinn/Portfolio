# CLAUDE.md

This file provides architecture and workflow guidance for Claude Code when working in this repository.

## Overview

This is a static-first, anonymous software engineering portfolio built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS 4. The public experience presents project proof, technical articles, capabilities, and a local-first inquiry workflow in English and Thai.

Production is deployed on Vercel at `chinnakrit.dev` and `www.chinnakrit.dev` from the `master` branch.

The current app has no backend, application API, runtime database, CMS, server-side content store, authenticated surface, or required runtime environment variables.

## Architecture

```text
src/
  app/
    (portfolio)/
      layout.tsx                   Shared Navbar and Footer shell
      page.tsx                     Portfolio home
      article/[slug]/              Static technical article route
    layout.tsx                     Fonts, metadata, and LanguageProvider
    globals.css                    Global tokens and component styling
    sitemap.ts                     Static sitemap
  components/
    layout/                        Navbar and Footer
    motion/                        Motion primitives
    portfolio/                Main portfolio sections and shared elements
  data/
    portfolio.ts                   EN/TH navigation, projects, articles, and contact URL
    types.ts                       Static content contracts
  i18n/
    LanguageContext.ts
    LanguageProvider.tsx
    useTranslation.ts
    locales/en.json
    locales/th.json
scripts/
  build.mjs                        Dev-server-safe production build wrapper
  verify.ps1 / verify.sh           Available checks plus required build
  review.ps1 / review.sh           Diff generation and lightweight security scan
  deploy-check.ps1 / deploy-check.sh
next.config.ts                     Global security headers and build-only distDir override
```

## Route and Data Flow

- `/` imports typed content from `src/data/portfolio.ts` and renders `HomePage` inside the shared `(portfolio)` shell.
- `/article/[slug]` generates static params from English records. Client content selects the matching localized record at render time.
- Contact CTAs open `publicContactUrl` (public GitHub Issues). There is no in-app brief intake form.
- `/saas`, `/work/[slug]`, and `/work-with-me` are removed from the product surface.
- `LanguageProvider` initializes in English, restores `portfolio-language` from `localStorage`, and updates the document language after hydration.

Keep localized project and article slugs synchronized. A slug present only in Thai will not receive a generated route, while a mismatched slug will fail localized lookup.

## Configuration

`next.config.ts` applies these global response policies:

- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Content-Security-Policy`

It contains no application redirect rules. The only non-header option is an optional `distDir` supplied through `NEXT_DIST_DIR` for build isolation.

There are no application runtime environment variables. `CI`, `VERCEL`, and `NEXT_DIST_DIR` are build-process controls used by `scripts/build.mjs`, not application configuration or secrets.

## Commands

```powershell
npm run dev
npm run build
npm run start
powershell -ExecutionPolicy Bypass -File scripts/verify.ps1
powershell -ExecutionPolicy Bypass -File scripts/review.ps1
powershell -ExecutionPolicy Bypass -File scripts/deploy-check.ps1 -Env preview
```

`npm run build` runs `node scripts/build.mjs`. On a developer machine, the wrapper checks ports `3000` through `3003`; when one is active, it uses `.next-build-local` and restores `next-env.d.ts` and `tsconfig.json` after the build. CI and Vercel keep the normal Next.js build path.

Treat `npm run build` as the required completion gate. Use the verification scripts for broader checks and `deploy-check` before release work.

## Editing Rules

- Keep the architecture static-first unless the user explicitly requests and approves a runtime architecture change.
- Update both English and Thai user-facing content.
- Keep `src/data/portfolio.ts` as the portfolio content source of truth.
- Preserve the route-group shell for portfolio pages.
- Keep contact external via `publicContactUrl`; do not add form storage without approval.
- Never publish secrets, private URLs, personal data, or internal operational details.
- Review user changes before editing and do not overwrite unrelated work.

## Agent Workflow

- `AGENTS.md` contains the shared repository rules.
- `.codex/AGENTS.md`, `.codex/config.toml`, and `.codex/agents/*.toml` contain Codex-specific delegation guidance.
- GitHub Issues for `Manchinn/portfolio` are the project tracker; supporting agent docs live under `docs/agents/`.
- Vercel auto-deploys production from `master`; pushing or changing deployment settings requires explicit user approval.
