# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio for Chinnakrit Sripan — Next.js 15 App Router with TypeScript. Public site is static-first with bilingual portfolio content, public demos, a lead-capture surface, and a prompt-library redirect surface. Deployed on Vercel (`chinnakrit.dev`, `www.chinnakrit.dev`).

There is no longer a separate backend — the legacy Express app was retired and all server logic now lives in `src/app/api/*`.

Important current state: legacy admin/CMS files still exist in the repo, but the next cleanup task is to remove the portfolio admin/login surface unless the user explicitly changes direction.

## Architecture

```
src/
  app/
    (portfolio)/                  Public site route group
      page.tsx                    Home (Hero + sections)
      article/[slug]/             SSG blog from data/portfolio.ts
      prompts/                    Legacy prompt pages; /prompts redirects externally in next.config.ts
        page.tsx
        [slug]/page.tsx
      admin/                      Legacy auth-gated CMS removal candidate
        login/                    Login form
        prompts/                  Prompt CRUD + AI generation
        content/                  Content pipeline (generate, publish)
    api/                          Route Handlers (former Express endpoints)
      admin/login/                Legacy admin cookie login removal candidate
      prompts/                    Legacy prompt API; public GET and protected write routes
      content/                    Legacy content generation + publish routes
    saas/                         SaaS landing experiment (separate surface)
    layout.tsx, globals.css, not-found.tsx
  components/
    layout/Navbar/, layout/Footer.tsx
    sections/                     Hero, About, Skills, Experience, Projects, Articles, Contact
    admin/                        Legacy admin UI primitives
    ui/                           Shared primitives
  data/
    portfolio.ts                  Static portfolio data (en/th), single source of truth
    types.ts
  i18n/
    LanguageContext.ts, LanguageProvider.tsx, useTranslation.ts
    locales/en.json, th.json
  lib/
    claude.ts                     Anthropic SDK wrapper
    prompt-generator.ts           Multi-provider AI gen (Anthropic, Groq, Qwen, Google)
    prompt-store.ts               Vercel Blob — prompts
    content-store.ts              Vercel Blob — generated content
    github.ts                     GitHub API (repo cards)
    social.ts                     Threads publish
  middleware.ts                   Legacy admin/API route protection via ADMIN_TOKEN cookie
```

### Data Flow

- **Public site**: Components import from `@/data/portfolio.ts`. `useTranslation()` picks en/th. No fetch hooks.
- **Legacy admin / prompts / content**: Client components fetch internal `/api/*` routes; route handlers read/write Vercel Blob and call AI providers server-side. Treat this surface as cleanup scope, not active portfolio product scope, unless instructed otherwise.

### Rendering

- `/` — Static (SSG)
- `/article/[slug]` — SSG via `generateStaticParams`
- `/prompts`, `/prompts/[slug]` — Legacy prompt pages. Current `next.config.ts` redirects `/prompts` and `/prompts/:path*` to `https://prompts.chinnakrit.dev`.
- `/admin/*` — Legacy admin routes, currently gated by `middleware.ts`, planned for removal.

## Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Next.js ESLint
```

For local dev that touches legacy admin/prompts/content, pull env from Vercel:
```bash
vercel env pull .env.local
```

## AI Workflow Files

- `AGENTS.md` — shared agent rules for this repo, including RTK usage and portfolio guardrails
- `.codex/AGENTS.md` — Codex-specific workflow guidance
- `.codex/config.toml` — project-local Codex settings and read-only agent role definitions
- `.codex/agents/*.toml` — read-only explorer, reviewer, and docs verifier roles
- `scripts/verify.sh` — typecheck/lint/test detection plus required build gate
- `scripts/review.sh` — focused diff generation and lightweight security scan
- `scripts/deploy-check.sh` — pre-deploy checks for git state, tracked env files, public-copy safety, and build
- `scripts/*.ps1` — Windows PowerShell equivalents for local use

Project verification should still treat `npm run build` as the required gate.

## Current Handoff

Latest completed portfolio work:

- Portfolio project cards now present proof-oriented project metadata and proof CTAs.
- Demo list cards expose proof signals from existing project highlights.
- Demo detail pages use the shared `src/components/demos/DemoDetailShell.tsx`.
- Lightweight CSS/Tailwind animation utilities are in place with reduced-motion handling.
- Mobile hamburger behavior was rechecked after animation work.
- The site favicon route was added at `src/app/favicon.ico/route.ts`.

Next user-requested direction:

Remove or neutralize admin/login paths from the portfolio repo. Use a low-risk pass first:

1. Delete legacy admin UI pages under `src/app/(portfolio)/admin/*`.
2. Delete `src/app/api/admin/login/route.ts`.
3. Update `src/middleware.ts` so it no longer matches or redirects `/admin/*` or `/api/admin/*`.
4. Remove the hidden `/admin/prompts` link from `src/components/layout/Footer.tsx`.
5. Audit remaining admin references with:

```bash
rg -n "admin|admin_token|ADMIN_TOKEN|/admin|api/admin" src next.config.ts README.md AGENTS.md CLAUDE.md
```

Decision to keep separate:

- Do not remove `/api/prompts/*`, `/api/content/*`, or `src/lib/*-store.ts` in the same pass unless the user confirms the old prompt/content CMS should be fully removed. `/prompts` currently redirects externally, so the UI route and API cleanup should be evaluated separately.

Required verification after code changes:

```bash
npm run build
```

If a local dev server is available, also check that `/admin/login` and `/admin/prompts` no longer resolve as portfolio pages.

## Environment Variables

See `.env.example` for full list. Summary:

| Var | Purpose |
|-----|---------|
| `ADMIN_TOKEN` | Admin login secret (cookie auth) |
| `ANTHROPIC_API_KEY` | Claude (default AI provider) |
| `GROQ_API_KEY` | Groq Llama (alt provider) |
| `DASHSCOPE_API_KEY` | Qwen (alt provider) |
| `GOOGLE_AI_API_KEY` | Gemini (alt provider) |
| `GITHUB_TOKEN` | Optional, raises GitHub API rate limit |
| `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN`, `THREADS_USERNAME` | Threads publishing |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (auto-injected when linked) |

## Key Libraries

- next 15, react 19, typescript
- tailwindcss 4 + @tailwindcss/postcss
- lucide-react (icons)
- @anthropic-ai/sdk, openai (Groq/Qwen/Google compatible client)
- @vercel/blob

## Deployment

Vercel auto-deploys. Production domains: `chinnakrit.dev`, `www.chinnakrit.dev`. The standalone `portfolio-backend` Vercel project has been retired.
