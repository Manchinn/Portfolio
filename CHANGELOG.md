# Changelog

All notable changes to this portfolio repository are recorded here.
Format follows a lightweight Keep a Changelog style.

## [Unreleased]

### Added
- `src/content/home.ts` homepage EN/TH marketing sections (hero, capabilities, articles chrome, contact body).
- `src/content/article.ts` article route chrome (back, related, read labels).

### Removed
- Product routes `/saas`, `/work/[slug]` (including student-logbook proof page), and `/work-with-me`.
- Local project-brief intake workflow; inquiry CTAs now open the public GitHub Issues URL.
- Remaining `docs/superpowers/**` historical specs/plans from the working tree (recoverable via git history).
- Personal interview prep note that was never part of the product.
- Stale agent docs: Vite-era `.github/copilot-instructions.md` and `.github/task-instructions.md` (replaced with a thin Next.js pointer).
- Tracked Impeccable critique/design artifacts under `.impeccable/`.
- Duplicate GitHub-hosted Impeccable skill tree under `.github/skills/impeccable/`.
- Thin `.github/copilot-instructions.md` pointer (prefer root `AGENTS.md` / `docs/agents/MEMORY.md`).

### Changed
- Soft-pixel visual skin (level A): warm paper palette, 2px block borders, offset shadows, Silkscreen labels, dot-grid background; body type stays IBM Plex Sans.
- Localized Thai category labels for the project and article records.
- Hero/contact polish after intake removal: primary CTA points to selected work, inquiry CTAs open public GitHub with notice copy, larger touch targets.
- Renamed portfolio UI modules and design tokens away from SaaS naming (`portfolio-saas` → `portfolio`, `saas-*` → `portfolio-*`).
- `HomePage` consumes `getHomeCopy()` instead of component-local marketing strings.
- Synced `PRODUCT.md`, `CONTEXT.md`, and `DESIGN.md` to the current one-page + article + external inquiry product and soft-pixel baseline.
- Soft-pixel polish B: article inquiry band and related cards match home primitives; homepage stagger starts from hidden; reduced-motion uses plain elements; larger nav/footer touch targets; Escape closes menus; stronger focus ring on interactive controls.

## [2026-07-19]

### Added
- `src/content/shared.ts` shared EN/TH chrome copy for case-study labels, proof CTA, project-brief CTA, and portfolio label.
- `docs/agents/MEMORY.md` durable agent memory against retired product surfaces.
- This changelog.

### Changed
- Home, project proof, and footer now consume shared chrome copy instead of duplicating the same strings.


### Changed
- Refreshed root and architecture docs to the static-first Next.js 15 portfolio baseline.

### Removed
- Completed Next.js migration and SaaS landing scaffolding under `docs/superpowers/plans` and matching design specs.
- Stale optical-retail demo handoff document.

### Notes for agents
- Treat FlowSync, prompts library, admin CMS, Vercel Blob, and AI provider integrations as **retired** unless the user explicitly reopens product scope.
- `/saas`, `/work/[slug]`, and `/work-with-me` are removed from the product surface.
