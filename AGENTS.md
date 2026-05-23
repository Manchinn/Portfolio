# AGENTS.md

@C:\Users\chinn\.codex\RTK.md

Guidance for AI agents working in this Next.js portfolio repository.

## Repository Scope

This folder is the real git repository:

```text
C:\Users\chinn\web-projects\portfolio\frontend
```

The parent folder contains project-level docs. Work from this `frontend` folder for git, package scripts, and app changes.

## Project Context

- Stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- Production: Vercel auto-deploys from `master`
- Public site: portfolio, bilingual EN/TH content, public demo pages, prompt redirect surface, lead-capture page
- Legacy admin/CMS surface was removed (see history). Only the `/api/prompts/*` feed remains as legacy.

## Hard Rules

1. Do not recreate `backend/`.
2. Put all API logic in `src/app/api/*`.
3. Preserve bilingual English and Thai content in `src/data/portfolio.ts`.
4. Keep public demo copy sanitized. Do not expose credentials, private URLs, nonpublic network details, route behavior, or operational hardening details.
5. Use `npm run build` as the verification gate before marking implementation work complete.
6. Do not overwrite existing config files. Add missing workflow files or make small project-specific additions only.

## Key Files

```text
src/data/portfolio.ts              Bilingual portfolio source of truth
src/i18n/locales/en.json           English UI copy
src/i18n/locales/th.json           Thai UI copy
src/app/(portfolio)/page.tsx       Main portfolio page
src/app/(portfolio)/demos/         Public demo pages
src/app/(portfolio)/work-with-me/  Lead capture page
src/app/api/prompts/*              Prompts feed for external prompts site
src/lib/prompt-store.ts            Vercel Blob backing store for prompts feed
src/lib/github.ts                  GitHub API helper (repo cards)
src/middleware.ts                  ADMIN_TOKEN gate for /api/prompts/* writes
next.config.ts                     /prompts and /prompts/* redirect to prompts.chinnakrit.dev
```

## Verification

Preferred local checks:

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File scripts/verify.ps1
powershell -ExecutionPolicy Bypass -File scripts/review.ps1
powershell -ExecutionPolicy Bypass -File scripts/deploy-check.ps1 -Env preview
```

Run commands through `rtk` when using the shell from Codex.

## Security Checklist

Before committing public-facing changes:

- No hardcoded secrets or credentials.
- No real private domains, private IPs, nonpublic network details, or admin route details in public copy.
- API handlers validate inputs at the boundary.
- Error responses avoid leaking implementation details.
- `git diff` reviewed before push.

## External Actions

Require explicit user approval before:

- `git push`
- Creating PRs or releases
- Calling external services beyond normal package/build tooling
- Changing infrastructure, credentials, or production env vars

## Current Task Handoff

Recently completed cleanup (May 2026):

- Removed admin UI (`src/app/(portfolio)/admin/*`) and admin login API (`src/app/api/admin/login/`).
- Removed prompts UI pages under `src/app/(portfolio)/prompts/*` (shadowed by external redirect in `next.config.ts`).
- Removed orphan content pipeline: `src/app/api/content/*`, `src/lib/content-store.ts`, `src/lib/social.ts`, `src/lib/claude.ts`.
- Removed `src/app/api/prompts/generate/` and `src/lib/prompt-generator.ts` (no UI consumer).
- Removed hidden `/admin/prompts` link from `src/components/layout/Footer.tsx`.
- `src/middleware.ts` simplified — matcher only on `/api/prompts/:path*`, still requires `ADMIN_TOKEN` for non-GET.

Remaining legacy surface (kept intentionally):

- `src/app/api/prompts/` GET/POST/DELETE — external `prompts.chinnakrit.dev` likely consumes the GET feed; POST/DELETE are protected by middleware. Do not delete without confirming the external site's coupling.
- `src/lib/prompt-store.ts` — backing store for the prompts feed above.
- `ADMIN_TOKEN` env var on Vercel — still required by middleware.

Likely-unused env vars on Vercel (safe to remove after confirming nothing else uses them):

- `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, `DASHSCOPE_API_KEY`, `GOOGLE_AI_API_KEY` — no AI gen code remains in this repo.
- `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN`, `THREADS_USERNAME` — Threads publisher removed.

Next recommended tasks (pick based on user intent):

1. Confirm whether `prompts.chinnakrit.dev` actually reads `/api/prompts/*`. If not, delete `src/app/api/prompts/`, `src/lib/prompt-store.ts`, and `src/middleware.ts` (and drop `ADMIN_TOKEN`).
2. Prune unused env vars listed above from Vercel project settings.
3. Update `.env.example` to match the trimmed env surface.

Verification gate after any code change:

```powershell
npm run build
```
