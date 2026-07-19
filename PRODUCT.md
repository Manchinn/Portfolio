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
  -> open a localized project proof route
  -> inspect the fictional interactive demo
  -> create a project brief
  -> copy the brief locally
  -> open the public GitHub inquiry template and paste the reviewed brief
```

Article routes provide a secondary path into the same project inquiry flow. The legacy `/saas` URL redirects to the selected-work section and is not a separate product surface.

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
2. Keep the route to contact explicit: the visitor should always be able to reach `/work-with-me` from the portfolio journey.
3. Keep the public surface safe: the full brief stays in the browser and is never placed in the public issue URL automatically.
4. Keep both languages equivalent: changes to projects, articles, navigation, and workflow copy must be checked in EN and TH.
5. Make technical work scannable: use clear hierarchy, restrained motion, short labels, and stable responsive layouts.

## Non-goals

- No admin panel, CMS, runtime portfolio API, database, analytics write, or server-side lead storage.
- No standalone FlowSync demo at `/saas`.
- No generic AI product claims that are not demonstrated by the current public work.
- No private contact details or operational internals in source-controlled public copy.

## Accessibility Baseline

The implementation includes visible keyboard focus styles, semantic controls, responsive layouts, language-aware document state, and reduced-motion handling. The refactor should preserve these behaviors and continue targeting WCAG AA contrast and bilingual text fit.
