# Changelog

All notable changes to this portfolio repository are recorded here.
Format follows a lightweight Keep a Changelog style.

## [Unreleased]

### Added
- Real Fuwari template shell across home, notes archive, and localized note detail routes: banner, navbar, profile/sidebar widgets, categories/tags, post cards, TOC, theme controls, dark mode, and back-to-top.
- Fuwari configuration adapter in `src/config.ts`, `src/layouts/`, and the shared components under `src/components/`.
- `LICENSE-FUWARI` preserving the upstream Fuwari MIT attribution.
- Localized static notes/runbook routes at `/notes/` and `/th/notes/`, backed by curated Markdown content collections.
- First bilingual ZCode runbook covering bounded tasks, review-before-approval, preview verification, and release-sensitive details.

### Changed
- Adapted the portfolio hero, Work, Capabilities, and content collections to render inside the Fuwari grid while preserving EN/TH parity.
- Added scroll-aware Fuwari banner, navbar, TOC, and back-to-top behavior; theme and hue controls persist locally in the browser.
- Applied Lenis and GSAP ScrollTrigger globally through `BaseLayout`; Notes routes now support reveal groups and smooth hash navigation.

### Removed
- Removed the temporary upstream clone and unused Fuwari adapter leftovers after migration.
- Product routes `/saas`, `/work/[slug]` (including student-logbook proof page), and `/work-with-me`.
- Local project-brief intake workflow and public inquiry CTAs from the homepage.
- Remaining `docs/superpowers/**` historical specs/plans from the working tree (recoverable via git history).
- Personal interview prep note that was never part of the product.

## [2026-09-05]

### Added
- Static Open Graph cards per locale: `public/og/og-{en,th}.png` (1200x630, Machine Readout style), rendered via `scripts/og/render.sh` (isolated Edge headless — correct Thai shaping).
- Full OG + Twitter meta and absolute canonical/hreflang in `BaseLayout.astro`; per-locale default description (`META_DESCRIPTION` in `src/i18n/ui.ts`).
- Self-hosted fonts: Courier Prime + Noto Sans Thai woff2 subsets (`public/fonts/`) with unicode-range `fonts.css`; regeneration script `scripts/fetch-fonts.py`.

### Changed
- Dropped all Google Fonts requests (render-blocking third-party). Lighthouse performance 92→99 (EN), 91→99 (TH); FCP 2.4–2.6s → 1.1–1.5s; accessibility/best-practices/SEO stay 100.
- Docs synced to the Machine Readout baseline (CLAUDE.md, README, PRODUCT, DESIGN); README no longer lists article routes.

## [2026-09-02]

### Changed
- Rebuilt the portfolio from Next.js 15 to **Astro 5** (static SSG) with content collections, built-in i18n routing (`en` at `/`, `th` at `/th/`), and a React island for the mobile menu.
- Replaced the retired soft-pixel visual system with the **Product Studio** design (light theme, indigo `#4f46e5` accent, Inter + Noto Sans Thai + JetBrains Mono).
- New positioning / copy in `src/i18n/ui.ts` (full-stack software engineer).
- Removed old content (`student-logbook` project, the 3 articles) and stale Next.js source/components/scripts.
- Added `vercel.json` to pin the Vercel build to Astro (the project was previously configured for Next.js).
- Updated `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`, `CONTEXT.md`, `CLAUDE.md`, and `docs/agents/MEMORY.md` to the Astro/Product Studio baseline.

### Notes for agents
- The `projects` and `articles` content collections are currently **empty**; the Work section renders a graceful empty state until entries are added.
- `npm run build` (astro build) and `npx astro check` (0 errors) are the implementation gates.

## [Superseded — Hallmark / soft-pixel era, before the 2026-09-02 Astro rebuild]

Historical entries from the retired Hallmark/soft-pixel system; kept verbatim for reference.

### Removed
- Stale agent docs: Vite-era `.github/copilot-instructions.md` and `.github/task-instructions.md` (replaced with a thin Next.js pointer).
- Tracked Impeccable critique/design artifacts under `.impeccable/`.
- Duplicate GitHub-hosted Impeccable skill tree under `.github/skills/impeccable/`.
- Thin `.github/copilot-instructions.md` pointer (prefer root `AGENTS.md` / `docs/agents/MEMORY.md`).
- Completed Next.js migration and SaaS landing scaffolding under `docs/superpowers/plans` and matching design specs.
- Stale optical-retail demo handoff document.

### Added
- Root `tokens.css` portable mirror of soft-pixel tokens; `DESIGN.md` locked Hallmark system + export formats (Tailwind `@theme`, DTCG JSON, shadcn mapping).
- `.hallmark/log.json` project memory for Hallmark redesign runs.

### Changed
- Homepage Hallmark redesign: Split Studio macrostructure (diptych hero + workbench case study + index capabilities/articles); hero-only motion; fewer eyebrows; hard soft-pixel frames reserved for primary proof; nav solid paper (no blur); tokens `portfolio-on-accent` and `portfolio-line-strong`.
- Article route aligned to Long Document under the same system: diptych header, numbered sections, hard inquiry frame, related reading as index list (not twin cards).
- Soft-pixel visual skin (level A): warm paper palette, 2px block borders, offset shadows, Silkscreen labels, dot-grid background; body type stays IBM Plex Sans.
- Mobile Thai label polish: shorter CTAs/proof/capability titles, stack hero buttons on narrow widths, allow label wrap below `sm`, Silkscreen nav tagline stays Latin (glyph coverage).
- Localized Thai category labels for the project and article records.
- Hero/contact polish after intake removal: primary CTA points to selected work, inquiry CTAs open public GitHub with notice copy, larger touch targets.
- Renamed portfolio UI modules and design tokens away from SaaS naming (`portfolio-saas` → `portfolio`, `saas-*` → `portfolio-*`).
- `HomePage` consumes `getHomeCopy()` instead of component-local marketing strings.
- Synced `PRODUCT.md`, `CONTEXT.md`, and `DESIGN.md` to the current one-page + article + external inquiry product and soft-pixel baseline.
- Soft-pixel polish B: article inquiry band and related cards match home primitives; homepage stagger starts from hidden; reduced-motion uses plain elements; larger nav/footer touch targets; Escape closes menus; stronger focus ring on interactive controls.
- Refreshed root and architecture docs to the static-first Next.js 15 portfolio baseline.

### Notes for agents
- Treat FlowSync, prompts library, admin CMS, Vercel Blob, and AI provider integrations as **retired** unless the user explicitly reopens product scope.
- `/saas`, `/work/[slug]`, and `/work-with-me` are removed from the product surface.

## [2026-07-19]

### Added
- `src/content/shared.ts` shared EN/TH chrome copy for case-study labels, proof CTA, project-brief CTA, and portfolio label.
- `docs/agents/MEMORY.md` durable agent memory against retired product surfaces.
- This changelog.

### Changed
- Home, project proof, and footer now consume shared chrome copy instead of duplicating the same strings.
