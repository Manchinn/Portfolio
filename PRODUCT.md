# Product Baseline

> Current as of 2026-07-11. This describes the implemented public product before the next design refactor.

## Product

A static-first, bilingual software engineering portfolio. It presents selected full-stack work, implementation-oriented articles, a fictional proof demo, and a local-first project inquiry flow without exposing personal contact details or private operational data.

## Users

- Hiring managers and technical reviewers evaluating implementation credibility.
- Founders and collaborators deciding whether to start a software project conversation.
- English- and Thai-speaking visitors scanning work, capabilities, and technical writing.

## Primary Journey

```text
Landing page
  -> review selected work and capabilities
  -> open a technical article (optional)
  -> open the public GitHub inquiry link
```

Article routes provide a secondary path into the same external inquiry handoff. There is no separate work-detail route, local brief builder, or `/saas` product page.

## Product Purpose

The current site positions the work as software engineering and full-stack systems delivery. Success means a visitor can understand what was built, inspect credible public-safe proof, and reach the project inquiry handoff without the portfolio storing their brief.

## Current Content Contract

- English and Thai are the only supported languages.
- Project and article entities live in `src/data/portfolio.ts` with matching slugs across locales.
- Marketing and workflow copy is also owned by page-local objects and locale JSON; it is not fully centralized.
- Public copy stays anonymized and must not expose credentials, private URLs, personal contact data, or nonpublic infrastructure details.

## Brand Personality

Clear, practical, and trustworthy. The voice is implementation-led and composed, with enough technical detail to establish credibility without presenting the portfolio as a fictional software company.

## Design Principles

1. Show evidence before decoration: lead from the problem, implementation, result, and interactive proof.
2. Keep the path to contact explicit: homepage and shell CTAs should reach the public GitHub inquiry URL or the `#contact` section.
3. Keep the public surface safe: this app does not store inquiry form data.
4. Keep both languages equivalent: changes to projects, articles, navigation, and workflow copy must be checked in EN and TH.
5. Make technical work scannable: use clear hierarchy, restrained motion, short labels, and stable responsive layouts.

## Non-goals

- No admin panel, CMS, runtime portfolio API, database, analytics write, or server-side lead storage.
- No `/saas`, `/work/[slug]`, or `/work-with-me` product surfaces unless explicitly restored.
- No generic AI product claims that are not demonstrated by the current public work.
- No private contact details or operational internals in source-controlled public copy.

## Accessibility Baseline

The implementation includes visible keyboard focus styles, semantic controls, responsive layouts, language-aware document state, and reduced-motion handling. The refactor should preserve these behaviors and continue targeting WCAG AA contrast and bilingual text fit.
