---
name: Software Engineering Portfolio
description: Implemented EN/TH portfolio design baseline before the next refactor.
currentAsOf: "2026-07-11"
colors:
  portfolio-bg: "#f6f8f7"
  portfolio-surface: "#ffffff"
  portfolio-surface-soft: "#edf3f0"
  portfolio-ink: "#17211e"
  portfolio-muted: "#5f6e68"
  portfolio-line: "#d7e0dc"
  portfolio-accent: "#0f766e"
  portfolio-accent-strong: "#0b5f59"
  portfolio-accent-soft: "#dcefeb"
radii:
  portfolio-sm: "6px"
  portfolio-md: "8px"
shadows:
  portfolio-sm: "0 1px 2px rgba(23, 33, 30, 0.08)"
  portfolio-md: "0 12px 28px rgba(23, 33, 30, 0.12)"
  portfolio-focus: "0 0 0 3px rgba(15, 118, 110, 0.2)"
typography:
  display: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
  mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
---

# Design Baseline: Software Engineering Portfolio

This document records what the current code implements. It is a refactor baseline, not a requirement to preserve every visual choice.

## 1. Current Direction

The public surface is a quiet, light software portfolio built for scanning proof and reaching a project inquiry. The layout uses broad unframed sections, thin horizontal dividers, compact controls, restrained teal accents, and very limited elevation.

The current interface is not the older FlowSync landing page, an operator console, or a card-heavy AI SaaS concept. There is no `/saas` product route.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Color, radius, shadow, font tokens | `src/app/globals.css` |
| Fonts and global metadata | `src/app/layout.tsx` |
| Shared chrome labels and CTAs | `src/content/shared.ts` |
| Section and button primitives | `src/components/portfolio/primitives.tsx` |
| Homepage composition | `src/components/portfolio/HomePage.tsx` |
| Navigation and language controls | `src/components/layout/Navbar/Navbar.tsx` |
| Contact CTA (external) | `publicContactUrl` + home contact section |
| Motion behavior | `src/components/motion/MotionPrimitives.tsx` |

When this document and source disagree, source is authoritative until the refactor intentionally changes both.

## 3. Color System

The active palette has three surface neutrals, three text/line neutrals, and one teal action family:

- `portfolio-bg` (`#f6f8f7`): page background.
- `portfolio-surface` (`#ffffff`): menus, form surfaces, and footer.
- `portfolio-surface-soft` (`#edf3f0`): subdued controls and preview surfaces.
- `portfolio-ink` (`#17211e`): primary text.
- `portfolio-muted` (`#5f6e68`): body support text and metadata.
- `portfolio-line` (`#d7e0dc`): borders and dividers.
- `portfolio-accent` (`#0f766e`): primary actions, labels, and focus outlines.
- `portfolio-accent-strong` (`#0b5f59`): hover and emphasized action text.
- `portfolio-accent-soft` (`#dcefeb`): selected and highlighted control backgrounds.

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

### Focus and Selection

Buttons and links receive a two-pixel teal outline with three-pixel offset. Text selection uses the soft accent background. The refactor must retain visible keyboard focus.

## 7. Motion

Homepage groups use `motion/react` viewport staggering and a 16px vertical fade for child items. Animations run once as content enters the viewport. `useReducedMotion()` removes the reveal variants, and the global reduced-motion media query reduces animation and transition durations.

Motion supports reading order; it must not gate access to content or shift stable layout dimensions.

## 8. Current Signature Experiences

### Selected Work

The homepage presents problem, build, and result summaries for selected projects in place. There is no separate work-detail route.

### Project Inquiry

Contact CTAs open the public GitHub Issues URL. The portfolio does not host a local brief form.

## 9. Refactor Guardrails

- Preserve the EN/TH content contract and test long Thai labels at mobile widths.
- Preserve visible focus, semantic controls, reduced-motion behavior, and stable responsive dimensions.
- Keep project proof clearly fictional where it uses synthetic records.
- Do not introduce personal contact details, private URLs, secrets, or private operational data.
- Do not restore `/saas`, `/work/[slug]`, or `/work-with-me` unless product scope reopens them.
- Update this document and `src/app/globals.css` together when design tokens change.

## 10. Known Baseline Constraints

- User-facing copy is still split across `portfolio.ts`, locale JSON, and component-local objects. Phase 1 of the design refactor centralizes only shared chrome in `src/content/shared.ts` (problem/built/result, create brief, open proof, portfolio label).
- The initial language is English and the saved language is restored after client mount.
- Static route params and metadata are sourced from English entries; locale arrays therefore depend on matching slugs.
- The design primitives are small and page-specific rather than a complete component library.
- Homepage lives under `src/components/portfolio/` (`HomePage`, design tokens `portfolio-*`). The public URL `/saas` is only a compatibility redirect, not a product surface.
