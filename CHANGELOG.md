# Changelog

All notable changes to this portfolio repository are recorded here.
Format follows a lightweight Keep a Changelog style.

## [Unreleased]

### Added
- `src/content/shared.ts` shared EN/TH chrome copy for case-study labels, proof CTA, project-brief CTA, and portfolio label.
- `docs/agents/MEMORY.md` durable agent memory against retired product surfaces.
- This changelog.

### Changed
- Home, project proof, and footer now consume shared chrome copy instead of duplicating the same strings.

## [2026-07-19]

### Changed
- Refreshed root and architecture docs to the static-first Next.js 15 portfolio baseline.

### Removed
- Completed Next.js migration and SaaS landing scaffolding under `docs/superpowers/plans` and matching design specs.
- Stale optical-retail demo handoff document.

### Notes for agents
- Treat FlowSync, prompts library, admin CMS, Vercel Blob, and AI provider integrations as **retired** unless the user explicitly reopens product scope.
- `/saas` remains a compatibility redirect to `/#work`, not a standalone product page.
