# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio for Chinnakrit Sripan — Next.js 15 App Router with TypeScript. Public site is static-first with bilingual portfolio content, public demos, a lead-capture surface, and a prompt-library redirect surface. Deployed on Vercel (`chinnakrit.dev`, `www.chinnakrit.dev`).

There is no longer a separate backend — the legacy Express app was retired and all server logic now lives in `src/app/api/*`. The admin/CMS surface (admin UI, login, content pipeline) was also removed in May 2026.

## Architecture

```
src/
  app/
    (portfolio)/                  Public site route group
      page.tsx                    Home (Hero + sections)
      article/[slug]/             SSG blog from data/portfolio.ts
      demos/                      Public demo detail pages
      work-with-me/               Lead capture page
    api/
      prompts/                    Feed for external prompts site (GET public, POST/DELETE token-gated)
    saas/                         SaaS landing experiment (separate surface)
    favicon.ico/route.ts          Site icon route handler
    layout.tsx, globals.css, not-found.tsx
  components/
    layout/Navbar/, layout/Footer.tsx
    sections/                     Hero, About, Skills, Experience, Projects, Articles, Contact
    demos/DemoDetailShell.tsx     Shared shell for public demo pages
    ui/                           Shared primitives
  data/
    portfolio.ts                  Static portfolio data (en/th), single source of truth
    types.ts
  i18n/
    LanguageContext.ts, LanguageProvider.tsx, useTranslation.ts
    locales/en.json, th.json
  lib/
    github.ts                     GitHub API (repo cards)
    prompt-store.ts               Vercel Blob backing store for the prompts feed
  middleware.ts                   ADMIN_TOKEN gate for /api/prompts/* writes
```

### Data Flow

- **Public site**: Components import from `@/data/portfolio.ts`. `useTranslation()` picks en/th. No fetch hooks.
- **Prompts feed**: `/api/prompts/*` reads from Vercel Blob via `prompt-store.ts`. GET is public; POST/DELETE require `ADMIN_TOKEN` via cookie or `x-admin-token` header. External `prompts.chinnakrit.dev` is the assumed consumer.

### Rendering

- `/` — Static (SSG)
- `/article/[slug]` — SSG via `generateStaticParams`
- `/demos`, `/demos/*` — Static demo pages
- `/work-with-me` — Static lead-capture page
- `/prompts`, `/prompts/:path*` — Redirect (308) to `https://prompts.chinnakrit.dev` via `next.config.ts`

## Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Next.js ESLint
```

For local dev that touches the prompts feed, pull env from Vercel:
```bash
vercel env pull .env.local
```

## AI Workflow Files

- `AGENTS.md` — shared agent rules for this repo, including RTK usage and portfolio guardrails
- `.codex/AGENTS.md` — Codex-specific workflow guidance
- `.codex/config.toml` — project-local Codex settings and read-only agent role definitions
- `.codex/agents/*.toml` — read-only explorer, reviewer, and docs verifier roles
- `scripts/verify.sh` / `*.ps1` — typecheck/lint/test detection plus required build gate
- `scripts/review.sh` / `*.ps1` — focused diff generation and lightweight security scan
- `scripts/deploy-check.sh` / `*.ps1` — pre-deploy checks for git state, tracked env files, public-copy safety, and build

Project verification should still treat `npm run build` as the required gate.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues for `Manchinn/portfolio`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default mattpocock/skills triage label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo. See `docs/agents/domain.md`.

## Current Handoff (May 2026)

Recently completed cleanup commits on `master`:

1. `chore: remove legacy admin/login surface` — deleted admin UI (`src/app/(portfolio)/admin/*`), `src/app/api/admin/login/`, hidden footer link to `/admin/prompts`, simplified middleware matcher.
2. `chore: remove orphan content pipeline and prompts UI` — deleted `src/app/(portfolio)/prompts/*`, `src/app/api/content/*`, `src/app/api/prompts/generate/`, and unused libs `claude.ts`, `prompt-generator.ts`, `content-store.ts`, `social.ts`.

Remaining legacy surface (kept intentionally — verify before removing):

- `src/app/api/prompts/` (GET/POST/DELETE) + `src/lib/prompt-store.ts` — assumed external consumer is `prompts.chinnakrit.dev`.
- `src/middleware.ts` and `ADMIN_TOKEN` env var — required for the prompts POST/DELETE protection above.

Next recommended tasks:

1. Confirm the external prompts site's actual coupling to `/api/prompts/*`. If unused, remove the prompts API + `prompt-store.ts` + middleware + `ADMIN_TOKEN`.
2. Prune unused Vercel env vars: `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, `DASHSCOPE_API_KEY`, `GOOGLE_AI_API_KEY`, `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN`, `THREADS_USERNAME`.
3. Update `.env.example` after env pruning.

After any code change, run:

```bash
npm run build
```

## Environment Variables

Active:

| Var | Purpose |
|-----|---------|
| `ADMIN_TOKEN` | Cookie/header gate for `/api/prompts/*` writes |
| `GITHUB_TOKEN` | Optional, raises GitHub API rate limit for repo cards |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (auto-injected when linked) |

Likely-unused on Vercel (safe to remove after auditing): `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, `DASHSCOPE_API_KEY`, `GOOGLE_AI_API_KEY`, `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN`, `THREADS_USERNAME`.

## Key Libraries

- next 15, react 19, typescript
- tailwindcss 4 + @tailwindcss/postcss
- lucide-react (icons)
- @vercel/blob

## Deployment

Vercel auto-deploys. Production domains: `chinnakrit.dev`, `www.chinnakrit.dev`. The standalone `portfolio-backend` Vercel project has been retired.
