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
- Public site: portfolio, bilingual EN/TH content, public demo pages, lead-capture page
- Admin/CMS: Next.js Route Handlers, private Vercel Blob storage, cookie-gated admin routes

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
src/app/api/*                      Route Handlers
src/middleware.ts                  Admin route protection
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
