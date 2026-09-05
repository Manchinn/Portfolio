# Product Baseline

> Current as of 2026-09-05. Describes the implemented public product (Astro + Machine Readout).

## Product

A static-first, bilingual (EN/TH) personal site for curated notes, runbooks, and project records. It presents a notes-first hero, capabilities, and a **Work section populated from the projects content collection** (EN/TH records). No contact or project-intake flow is currently exposed.

## Users

- Hiring managers and technical reviewers evaluating implementation credibility.
- Readers looking for practical notes and runbooks.
- English- and Thai-speaking visitors scanning capabilities and work.

## Primary Journey

```text
Landing page
  -> read notes and runbooks
  -> review selected work and capabilities as they are published
```

There is no separate work-detail route, article route, local brief builder, or `/saas` product page in the current build.

## Product Purpose

The site records learning, experiments, and reviewed project details in a public-safe format. Success means a visitor can understand what has been documented and move between the bilingual notes and project archive.

## Routes in Product

| Route | Role |
|-------|------|
| `/` | English one-page home (notes-first hero, work, capabilities) |
| `/th/` | Thai one-page portfolio |
| `/sitemap-index.xml` | Static sitemap |

**Retired (do not restore without explicit product approval):** `/saas`, `/work/[slug]`, `/work-with-me`, and the old Next.js `/article/[slug]`.

## Current Content Contract

- English and Thai are the only supported languages, via Astro i18n routing (`/` and `/th/`).
- Project and note entities live in content collections (`src/content/projects/{en,th}/`, `src/content/articles/{en,th}/`); both collections hold mirrored EN/TH records, and notes are curated from private working material before publication.
- Chrome + marketing copy lives in `src/i18n/ui.ts`.
- No contact or project-intake flow is exposed in the current build.
- Public copy stays anonymized and must not expose credentials, private URLs, personal contact data, or nonpublic infrastructure details.

## Brand Personality

Clear, practical, and trustworthy. The voice is implementation-led and composed, with enough technical detail to establish credibility without presenting the portfolio as a fictional software company.

## Visual Direction

Machine Readout: pure white field, single cyan-blue accent (`#0071a9`), Courier Prime typewriter mono + Noto Sans Thai, dashed blueprint separators, flat radius-0 shapes. Exact tokens live in `DESIGN.md` and `src/styles/global.css`.

## Design Principles

1. Show evidence before decoration: lead from reviewed notes and concrete project details.
2. Keep notes discoverable: home and shell CTAs reach the localized notes index.
3. Keep the public surface safe: publish only reviewed, sanitized content.
4. Keep both languages equivalent: changes to copy and records must be checked in EN and TH.
5. Make technical work scannable: clear hierarchy, restrained motion, short labels, stable responsive layouts.

## Non-goals

- No admin panel, CMS, runtime portfolio API, database, analytics write, or server-side lead storage.
- No `/saas`, `/work/[slug]`, or `/work-with-me` product surfaces unless explicitly restored.
- No contact, lead-capture, or project-intake path unless product scope reopens it.
- No generic AI product claims that are not demonstrated by the current public work.
- No private contact details or operational internals in source-controlled public copy.

## Accessibility Baseline

Visible keyboard focus styles, semantic controls, responsive layouts, language-aware document state, and reduced-motion handling. Target WCAG AA contrast and bilingual text fit at mobile widths.
