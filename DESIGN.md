---
name: Fuwari Portfolio
description: Fuwari-based bilingual Astro portfolio with localized notes and project records.
currentAsOf: "2026-09-07"
---

# Design Baseline: Fuwari Portfolio

This document records the current visual and interaction baseline for the
portfolio. The public site uses the real [Fuwari](https://github.com/saicaca/fuwari)
Astro template as its shared shell, with portfolio-specific content adapted
inside it.

## 1. Direction

Fuwari provides the blog-oriented composition: a localized banner, sticky
navbar, profile sidebar, categories and tags, post cards, article table of
contents, theme controls, dark mode, and back-to-top behavior. The portfolio
keeps its own notes-first copy, Work and Capabilities sections, and cyan/blue
readout artwork in the OG banner cards.

The shell is shared by `/`, `/th/`, `/notes/`, `/th/notes/`, and both localized
note detail route families. Public pages should feel like one site as visitors
move between the portfolio and the notes archive.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Site, banner, profile, navigation, TOC config | `src/config.ts` |
| HTML shell, metadata, canonical, hreflang, fonts | `src/layouts/BaseLayout.astro` |
| Fuwari body state and banner geometry | `src/layouts/Layout.astro` |
| Shared navbar/banner/sidebar/content grid/TOC | `src/layouts/MainGridLayout.astro` |
| Navbar, footer, widgets, controls, post cards | `src/components/` (`Navbar.astro`, `Footer.astro`, `widget/`, `control/`, `PostCard.astro`) |
| Portfolio home composition | `src/components/PortfolioHome.astro` |
| Work and Capabilities sections | `src/components/home/` |
| Colors, surfaces, responsive utilities, motion recipes | `src/styles/global.css` |
| Chrome and marketing copy | `src/i18n/ui.ts` |
| Entity content | `src/content/projects/` and `src/content/articles/` |

When this document and source disagree, source is authoritative until both are
updated together.

## 3. Layout

- The main grid uses a Fuwari-style desktop sidebar plus content column and
  collapses to one column on smaller screens.
- The banner is a localized static OG card (`public/og/og-en.png` or
  `public/og/og-th.png`) rendered through `ImageWrapper.astro`.
- The home route uses the extended banner height; archive and detail routes
  use the regular banner height.
- The TOC is rendered on wide note detail pages, hidden until the reader has
  moved past the banner threshold.
- The navbar and back-to-top control respond to scroll state, while all page
  content remains statically generated.

## 4. Theme and Typography

The Fuwari theme tokens live in `src/styles/global.css`:

- `--hue` controls the primary color and can be changed with the display
  settings slider.
- `--page-bg`, `--card-bg`, and `--float-panel-bg` define light/dark surfaces.
- `--primary`, `--btn-*`, `--toc-*`, and related tokens define links, buttons,
  cards, and TOC states.
- `--radius-large` supplies the Fuwari rounded surface geometry.

The body uses the repository's self-hosted Courier Prime and Noto Sans Thai
font stack. The same stack keeps English and Thai labels stable without a
third-party font request. Localized OG cards retain the typewriter readout
voice used by the portfolio identity.

## 5. Content Composition

- `PortfolioHome.astro` maps project and article collection entries into the
  Fuwari shell.
- `PostCard.astro` is the shared archive/home note card and includes title,
  metadata, tags, excerpt, word count, and reading time.
- `Work.astro` keeps the portfolio-specific Problem -> Built -> Result case
  study and `REF / TECH / CASE` readout for each project record.
- `Markdown.astro` and `markdown.css` provide the note detail reading surface.
- English and Thai entries use matching ids/slugs and are filtered at build
  time so drafts never become public pages.

## 6. Controls and Interaction

- `Navbar.astro` owns navigation, search, the display settings panel, the
  light/dark switch, and the responsive menu.
- `LightDarkSwitch.astro` is the single theme toggle controller; it persists
  the selected light/dark mode in local storage.
- `DisplaySettings.astro` persists the selected hue in local storage.
- `TOC.astro` links headings on detail pages and updates with scroll state.
- All controls expose labels, visible focus styles, and touch-sized targets.

## 7. Motion and Accessibility

Fuwari on-load transitions, banner transitions, navbar/TOC scroll state, and
the existing `ScrollMotion.astro` runtime are reduced or disabled for users
with `prefers-reduced-motion: reduce`. Layouts are checked at desktop and
mobile widths for text fit and horizontal overflow.

## 8. Guardrails

- Preserve EN/TH parity for user-facing copy and content records.
- Keep the site static-first; no backend, runtime storage, or runtime secret.
- Do not publish credentials, private URLs, personal contact data, or internal
  operational details.
- Keep every public route inside `MainGridLayout.astro` so the Fuwari shell is
  consistent.
- Do not restore `/saas`, `/work/[slug]`, `/work-with-me`, or the old
  `/article/[slug]` route without explicit product approval.
- Keep the Fuwari MIT attribution in `LICENSE-FUWARI`.
