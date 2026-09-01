# Agent Memory — Portfolio

> Durable facts for AI agents. Prefer this file + root SoT docs over chat history or deleted plans.

**Last updated:** 2026-09-02

## Current product (authoritative)

- Static-first bilingual **software engineering portfolio** (Astro 5, static SSG).
- Bilingual **EN/TH** via Astro i18n routing: `en` at `/`, `th` at `/th/`.
- Content entities: content collections `src/content/projects/{en,th}/` and `src/content/articles/{en,th}/` — **currently empty**.
- Chrome + marketing copy: `src/i18n/ui.ts`.
- Visual system: **Product Studio** (light, indigo `#4f46e5`, Inter + Noto Sans Thai + JetBrains Mono).
- Routes in product: `/`, `/th/`, `/sitemap-index.xml`.
- Contact: external `PUBLIC_CONTACT_URL` (public GitHub Issues) from `src/data/types.ts`. No in-app intake form.
- **Removed from product (2026-09-02):** Next.js App Router, `/article/[slug]`, the soft-pixel system, `student-logbook` + the 3 old articles.

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
| FlowSync / standalone SaaS landing at `/saas` | Removed from product surface |
| Prompts library / prompt marketplace | Retired |
| Admin panel / CMS / runtime content API | Not in product |
| Vercel Blob / remote media store | Not in product |
| AI provider / server-side generation | Not in product |
| Next.js App Router / React client language provider | Superseded by Astro 5 + i18n routing |
| Express backend / Vite SPA architecture | Not in product |
| Lead capture API / database / auth | Explicit non-goals |
| `mailto:` personal contact pipeline | Do not introduce |
| `/work/[slug]` project proof routes | Removed; selected work stays on the homepage |
| `/work-with-me` local brief intake | Removed; contact uses public GitHub Issues URL |
| `/article/[slug]` (old Next article route) | Retired until content is re-added |

## Naming (current)

- UI modules live under `src/components/` (`home/`, `ui/`, `motion/`).
- Design tokens: `--color-bg`, `--color-ink`, `--color-accent`, etc. in `src/styles/global.css`.
- Do not reintroduce soft-pixel `portfolio-*` tokens or the deleted routes above.

## Copy ownership (current)

| Content | Owner |
|---------|--------|
| Entities (projects, articles) | `src/content/projects/`, `src/content/articles/` (content collections) |
| Chrome + marketing copy (EN/TH) | `src/i18n/ui.ts` |
| Public contact URL | `src/data/types.ts` (`PUBLIC_CONTACT_URL`) |
| Design tokens | `src/styles/global.css` |

## Hard rules (never skip)

1. Static-first: no backend/API/runtime storage without explicit user approval.
2. Update **EN and TH** together for user-facing copy.
3. Keep article/project **slugs aligned** across locales (derived from entry id via `entrySlug()`); do not declare a `slug` field in content frontmatter.
4. Contact is external-only via `PUBLIC_CONTACT_URL`; do not add form storage without approval.
5. Gate implementation with `npm run build` (astro build) and `npx astro check` (0 errors).
6. No push / no infra changes without explicit user approval.

## Recent decisions

- **2026-09-02:** Rebuilt the portfolio on Astro 5 (static SSG + content collections + i18n routing) and shipped the **Product Studio** design; deployed to `www.chinnakrit.dev`. Old Next.js source and soft-pixel system removed.
- **2026-09-02:** Added `vercel.json` to pin the Vercel build to Astro (the project was previously configured for Next.js).
- **2026-09-02:** `projects` and `articles` collections are empty; the Work section shows a graceful empty state until entries are added.
