# Agent Memory — Portfolio Frontend

> Durable facts for AI agents. Prefer this file + root SoT docs over chat history or deleted plans.

**Last updated:** 2026-07-19

## Current product (authoritative)

- Static-first **software engineering portfolio** (Next.js 15 App Router).
- Bilingual **EN/TH** client language switch; no locale-prefixed routes.
- Content entities: `src/data/portfolio.ts` + `src/data/types.ts`.
- Shared chrome copy (Phase 1): `src/content/shared.ts`.
- Local-only intake: `/work-with-me` (clipboard + public GitHub issue; no app storage).
- `/saas` → redirect to `/#work` only.

## Source of truth (read these first)

1. `AGENTS.md`
2. `CLAUDE.md`
3. `PRODUCT.md`
4. `CONTEXT.md`
5. `DESIGN.md`
6. `docs/architecture/*`
7. This file (`docs/agents/MEMORY.md`)
8. `CHANGELOG.md`

If a historical plan/spec conflicts with the above, **the SoT list wins**.

## Retired / forbidden unless user reopens scope

Do **not** rebuild or assume these are active:

| Topic | Status |
|-------|--------|
| FlowSync / standalone SaaS landing at `/saas` | Retired; `/saas` is redirect only |
| Prompts library / prompt marketplace | Retired |
| Admin panel / CMS / runtime content API | Not in product |
| Vercel Blob / remote media store | Not in product |
| AI provider / server-side generation | Not in product |
| Express backend / Vite SPA architecture | Superseded by Next.js App Router |
| Lead capture API / database / auth | Explicit non-goals |
| `mailto:` personal contact pipeline | Do not introduce |

## Stale docs still on disk

- `docs/superpowers/specs/2026-05-29-modern-saas-portfolio-redesign.md` may still exist. Treat as **historical design exploration only**, not current product requirements.
- Deleted plans/specs under `docs/superpowers/plans` and older migration specs remain recoverable from git history only.

## Naming debt (do not interpret as product)

- Folder `src/components/portfolio-saas/` and symbols like `SaasHome`, `saas-*` CSS tokens are **legacy implementation names**.
- They do **not** mean the public product is a SaaS company or FlowSync demo.
- Rename is planned in later design-refactor phases; do not restore FlowSync content while renaming.

## Copy ownership (current)

| Content | Owner |
|---------|--------|
| Projects, articles, nav hrefs, public GitHub issue URL | `src/data/portfolio.ts` |
| Shared labels/CTAs (problem/built/result, create brief, open proof) | `src/content/shared.ts` |
| Homepage marketing sections | still largely `SaasHome` local copy (later phases) |
| Intake form strings | `work-with-me/page.tsx` (later phases) |
| Nav chrome labels | `src/i18n/locales/*.json` |

## Hard rules (never skip)

1. Static-first: no backend/API/runtime storage without explicit user approval.
2. Update **EN and TH** together for user-facing copy.
3. Keep project/article **slugs aligned** across locales (static params from English).
4. Preserve `/work-with-me` privacy contract and public-issue warning.
5. Gate implementation with `npm run build`.
6. No push / no infra changes without explicit user approval.

## Recent decisions

- **2026-07-19:** Docs cleanup committed; agent SoT refreshed; completed migration/SaaS plans removed from tree.
- **2026-07-19:** Design refactor Phase 1 started — shared chrome copy only; no token rename, no folder rename yet.
