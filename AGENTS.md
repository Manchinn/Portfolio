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
- Legacy admin/CMS code still exists in the repo. Treat it as a removal candidate for the next cleanup pass unless the user explicitly asks to keep or extend it.

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
src/middleware.ts                  Legacy admin/API route protection
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

Recent completed work:

- Portfolio project cards were strengthened with proof-oriented metadata and CTA treatment.
- Public demo detail pages use `src/components/demos/DemoDetailShell.tsx`.
- Lightweight CSS/Tailwind animation utilities were added with `prefers-reduced-motion` support.
- Mobile hamburger behavior was checked after the animation pass.
- `src/app/favicon.ico/route.ts` was added for the site icon.

Next recommended task:

- Remove the legacy portfolio admin/login surface from the public portfolio app.
- Start with admin UI and login removal: `src/app/(portfolio)/admin/*`, `src/app/api/admin/login/route.ts`, admin matcher behavior in `src/middleware.ts`, and the hidden `/admin/prompts` footer link.
- Keep public copy sanitized. Do not expose private admin route details in portfolio content.
- Decide separately whether legacy prompt/content APIs should remain, because `/prompts` currently redirects externally via `next.config.ts`.

Verification for the admin cleanup:

```powershell
npm run build
rg -n "admin|admin_token|ADMIN_TOKEN|/admin|api/admin" src next.config.ts README.md AGENTS.md CLAUDE.md
```
