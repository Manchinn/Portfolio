---
name: Software Engineering Portfolio
description: Implemented EN/TH portfolio design baseline before the next refactor.
currentAsOf: "2026-07-11"
colors:
  saas-bg: "#f6f8f7"
  saas-surface: "#ffffff"
  saas-surface-soft: "#edf3f0"
  saas-ink: "#17211e"
  saas-muted: "#5f6e68"
  saas-line: "#d7e0dc"
  saas-accent: "#0f766e"
  saas-accent-strong: "#0b5f59"
  saas-accent-soft: "#dcefeb"
radii:
  saas-sm: "6px"
  saas-md: "8px"
shadows:
  saas-sm: "0 1px 2px rgba(23, 33, 30, 0.08)"
  saas-md: "0 12px 28px rgba(23, 33, 30, 0.12)"
  saas-focus: "0 0 0 3px rgba(15, 118, 110, 0.2)"
typography:
  display: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
  mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
---

# Design Baseline: Software Engineering Portfolio

This document records what the current code implements. It is a refactor baseline, not a requirement to preserve every visual choice.

## 1. Current Direction

The public surface is a quiet, light software portfolio built for scanning proof and reaching a project inquiry. The layout uses broad unframed sections, thin horizontal dividers, compact controls, restrained teal accents, and very limited elevation.

The current interface is not the older FlowSync landing page, an operator console, or a card-heavy AI SaaS concept. `/saas` redirects to the selected-work section.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Color, radius, shadow, font tokens | `src/app/globals.css` |
| Fonts and global metadata | `src/app/layout.tsx` |
| Section and button primitives | `src/components/portfolio-saas/_shared.tsx` |
| Homepage composition | `src/components/portfolio-saas/SaasHome.tsx` |
| Navigation and language controls | `src/components/layout/Navbar/Navbar.tsx` |
| Work intake fields and states | `src/app/(portfolio)/work-with-me/page.tsx` |
| Motion behavior | `src/components/motion/MotionPrimitives.tsx` |

When this document and source disagree, source is authoritative until the refactor intentionally changes both.

## 3. Color System

The active palette has three surface neutrals, three text/line neutrals, and one teal action family:

- `saas-bg` (`#f6f8f7`): page background.
- `saas-surface` (`#ffffff`): menus, form surfaces, and footer.
- `saas-surface-soft` (`#edf3f0`): subdued controls and preview surfaces.
- `saas-ink` (`#17211e`): primary text.
- `saas-muted` (`#5f6e68`): body support text and metadata.
- `saas-line` (`#d7e0dc`): borders and dividers.
- `saas-accent` (`#0f766e`): primary actions, labels, and focus outlines.
- `saas-accent-strong` (`#0b5f59`): hover and emphasized action text.
- `saas-accent-soft` (`#dcefeb`): selected and highlighted control backgrounds.

There are no active blue, lilac, cream, coral, or decorative gradient tokens in the current system.

## 4. Typography

IBM Plex Sans is the default display and body face. JetBrains Mono is reserved for the project-brief preview. Both fonts are loaded in `src/app/layout.tsx`.

Implemented hierarchy:

- Hero: `text-4xl`, `sm:text-6xl`, `lg:text-[4.25rem]`, weight 600, line-height 1.06.
- Section heading: `text-3xl`, `sm:text-4xl`, `lg:text-[2.5rem]`, weight 600, line-height 1.12.
- Card/project title: 1.5rem to 2.25rem depending on emphasis.
- Body: generally 1rem with 1.75rem line-height; hero support copy uses 1.125rem with 2rem line-height.
- Labels: 0.75rem, semibold, uppercase, and teal.

All global letter spacing is zero. Thai and English content must wrap without clipping at mobile widths.

## 5. Layout and Surfaces

- Standard content width: 1180px; selected work can expand to 1280px.
- Section padding: 4.5rem, 5.5rem, then 6rem across breakpoints.
- Homepage proof, capability, article, and contact regions use borders and whitespace instead of floating section cards.
- Repeated items are usually divided rows or unframed blocks.
- The work-intake form and preview are the primary framed surfaces, using 8px corners.

Nested decorative cards are not part of the current layout language.

## 6. Controls

### Buttons and Links

Primary and secondary command buttons use 6px corners, horizontal padding, semibold 0.875rem text, and optional Lucide icons. Primary buttons use teal fill; secondary buttons use a white surface and one-pixel border. Buttons are not pills.

### Navigation

The sticky Navbar uses a translucent page background, subtle blur, compact 6px controls, and desktop/mobile variants. The language picker supports EN and TH and displays an 8px menu surface with a medium shadow.

### Form Fields

The intake page contains selects and textareas with 6px corners, one-pixel borders, 1rem text, teal focus styles, character counts, and disabled states. Context and outcome each require at least 30 non-whitespace characters and accept at most 1200 characters.

### Focus and Selection

Buttons and links receive a two-pixel teal outline with three-pixel offset. Text selection uses the soft accent background. The refactor must retain visible keyboard focus.

## 7. Motion

Homepage groups use `motion/react` viewport staggering and a 16px vertical fade for child items. Animations run once as content enters the viewport. `useReducedMotion()` removes the reveal variants, and the global reduced-motion media query reduces animation and transition durations.

Motion supports reading order; it must not gate access to content or shift stable layout dimensions.

## 8. Current Signature Experiences

### Selected Work Proof

The homepage presents problem, build, and result summaries with a link to `/work/[slug]#demo`. The proof route adds highlights, delivery signals, implementation stack, and a fictional local status-filter interaction.

### Project Brief Intake

The intake experience pairs a structured form with a monospace live preview. Submission copies the brief locally. A separate action opens the public GitHub issue template without embedding the full brief in the URL.

## 9. Refactor Guardrails

- Preserve the EN/TH content contract and test long Thai labels at mobile widths.
- Preserve visible focus, semantic controls, reduced-motion behavior, and stable responsive dimensions.
- Keep project proof clearly fictional where it uses synthetic records.
- Do not introduce personal contact details, private URLs, secrets, or private operational data.
- Do not describe `/saas` as an active standalone demo unless the route is intentionally rebuilt.
- Update this document and `src/app/globals.css` together when design tokens change.

## 10. Known Baseline Constraints

- User-facing copy is split across `portfolio.ts`, locale JSON, component-local objects, and inline translations.
- The initial language is English and the saved language is restored after client mount.
- Static route params and metadata are sourced from English entries; locale arrays therefore depend on matching slugs.
- The design primitives are small and page-specific rather than a complete component library.
