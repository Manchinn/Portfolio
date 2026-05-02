# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio + lightweight CMS for Chinnakrit Sripan — Next.js 15 App Router with TypeScript. Public site is static; admin area uses Next.js Route Handlers + Vercel Blob for prompts/content. Deployed on Vercel (`chinnakrit.dev`, `www.chinnakrit.dev`).

There is no longer a separate backend — the legacy Express app was retired and all server logic now lives in `src/app/api/*`.

## Architecture

```
src/
  app/
    (portfolio)/                  Public site route group
      page.tsx                    Home (Hero + sections)
      article/[slug]/             SSG blog from data/portfolio.ts
      prompts/                    Public prompt library
        page.tsx
        [slug]/page.tsx
      admin/                      Auth-gated CMS (ADMIN_TOKEN cookie)
        login/                    Login form
        prompts/                  Prompt CRUD + AI generation
        content/                  Content pipeline (generate, publish)
    api/                          Route Handlers (former Express endpoints)
      admin/login/                Sets admin cookie from ADMIN_TOKEN
      prompts/                    GET list, POST create, generate, [slug]
      content/                    Content generation + publish per platform
    saas/                         SaaS landing experiment (separate surface)
    layout.tsx, globals.css, not-found.tsx
  components/
    layout/Navbar/, layout/Footer.tsx
    sections/                     Hero, About, Skills, Experience, Projects, Articles, Contact
    admin/                        Admin UI primitives
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
  middleware.ts                   Admin route protection via ADMIN_TOKEN cookie
```

### Data Flow

- **Public site**: Components import from `@/data/portfolio.ts`. `useTranslation()` picks en/th. No fetch hooks.
- **Admin / prompts / content**: Client components fetch internal `/api/*` routes; route handlers read/write Vercel Blob and call AI providers server-side.

### Rendering

- `/` — Static (SSG)
- `/article/[slug]` — SSG via `generateStaticParams`
- `/prompts`, `/prompts/[slug]` — Dynamic, fetch from `/api/prompts`
- `/admin/*` — Dynamic, gated by `middleware.ts` checking admin cookie

## Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Next.js ESLint
```

For local dev that touches admin/prompts/content, pull env from Vercel:
```bash
vercel env pull .env.local
```

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
