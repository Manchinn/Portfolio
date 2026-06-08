# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio for Chinnakrit Sripan — Next.js 15 App Router with TypeScript. Public site is static-first with bilingual portfolio content, public demos, a lead-capture surface. Deployed on Vercel (`chinnakrit.dev`, `www.chinnakrit.dev`).

No separate backend — the legacy Express app was retired. Admin/CMS surface removed May 2026. Prompts API and middleware removed June 2026.

## Architecture

```
src/
  app/
    (portfolio)/                  Public site route group
      page.tsx                    Home (Hero + sections)
      article/[slug]/             SSG blog from data/portfolio.ts
      demos/                      Public demo detail pages
      work-with-me/               Lead capture page
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
```

### Data Flow

- **Public site**: Components import from `@/data/portfolio.ts`. `useTranslation()` picks en/th. No fetch hooks.

### Rendering

- `/` — Static (SSG)
- `/article/[slug]` — SSG via `generateStaticParams`
- `/demos`, `/demos/*` — Static demo pages
- `/work-with-me` — Static lead-capture page

## Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Next.js ESLint
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

## Environment Variables

Active:

| Var | Purpose |
|-----|---------|
| `GITHUB_TOKEN` | Optional, raises GitHub API rate limit for repo cards |

## Key Libraries

- next 15, react 19, typescript
- tailwindcss 4 + @tailwindcss/postcss
- lucide-react (icons)

## Deployment

Vercel auto-deploys. Production domains: `chinnakrit.dev`, `www.chinnakrit.dev`.
