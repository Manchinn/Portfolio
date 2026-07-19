# Agent Memory — Portfolio Frontend

> Durable facts for AI agents. Prefer this file + root SoT docs over chat history or deleted plans.

**Last updated:** 2026-07-19

## Current product (authoritative)

- Static-first **software engineering portfolio** (Next.js 15 App Router).
- Bilingual **EN/TH** client language switch; no locale-prefixed routes.
- Content entities: `src/data/portfolio.ts` + `src/data/types.ts`.
- Shared chrome copy: `src/content/shared.ts`.
- Routes in product: `/`, `/article/[slug]`, `/sitemap.xml`.
- Contact: external `publicContactUrl` (public GitHub Issues). No in-app intake form.
- **Removed from product (2026-07-19):** `/saas`, `/work/[slug]`, `/work-with-me`.

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
| `/saas` compatibility redirect | Removed from tree |
| `/work/[slug]` project proof routes | Removed; selected work stays on homepage |
| `/work-with-me` local brief intake | Removed; contact uses public GitHub Issues URL |

## Stale docs (removed from tree)

- `docs/superpowers/**` (plans + specs, including the 2026-05-29 SaaS redesign exploration) was **removed from the working tree** on 2026-07-19. Content remains recoverable from git history only.
- Do not recreate FlowSync / prompts / multi-demo SaaS specs unless the user reopens product scope.

## Naming (current)

- UI modules live under `src/components/portfolio/` (`HomePage`, `primitives`).
- Design tokens use the `portfolio-*` prefix in `globals.css`.
- Do not reintroduce SaaS product surfaces or the deleted routes above.

## Copy ownership (current)

| Content | Owner |
|---------|--------|
| Projects, articles, nav hrefs, public GitHub issue URL | `src/data/portfolio.ts` |
| Shared labels/CTAs (problem/built/result, create brief, open proof) | `src/content/shared.ts` |
| Homepage marketing sections | still largely `HomePage` local copy (later phases) |
| Contact CTA labels | `src/content/shared.ts` + home contact section |
| Nav chrome labels | `src/i18n/locales/*.json` |

## Hard rules (never skip)

1. Static-first: no backend/API/runtime storage without explicit user approval.
2. Update **EN and TH** together for user-facing copy.
3. Keep project/article **slugs aligned** across locales (static params from English).
4. Contact is external-only via `publicContactUrl`; do not add form storage without approval.
5. Gate implementation with `npm run build`.
6. No push / no infra changes without explicit user approval.

## Recent decisions

- **2026-07-19:** Docs cleanup committed; agent SoT refreshed; completed migration/SaaS plans removed from tree.
- **2026-07-19:** Design refactor Phase 1 shipped — shared chrome copy in `src/content/shared.ts`.
- **2026-07-19:** Safe-set cleanup — removed remaining `docs/superpowers/**` and personal interview notes from the repo tree.
- **2026-07-19:** Renamed `portfolio-saas` → `portfolio`, `SaasHome` → `HomePage`, and design tokens `saas-*` → `portfolio-*`. Kept `/saas` as compatibility redirect only.
- **2026-07-19:** Removed product routes `/saas`, `/work/[slug]`, and `/work-with-me`. Portfolio is one-page home + article routes + external GitHub inquiry.
- **2026-07-19:** Cleaned local `.next-build-local` cache; removed stale Vite-era GitHub agent docs and tracked Impeccable artifacts; ignore `.impeccable/` going forward.
