# Portfolio Design Context

> Current as of 2026-09-07. Shared vocabulary for the implemented Fuwari portfolio after the Astro migration.

This context keeps design and implementation decisions consistent across the shared Fuwari shell, homepage, navigation, and notes archive.

## Language

**Notes and Project Archive**:
The canonical public product: a bilingual (EN/TH) site focused on curated notes, runbooks, experiments, and project records. Content includes a populated Work section (EN/TH project records) alongside the notes-first hero and capabilities.
_Avoid_: Personal-data-heavy profile, fictional product company, unsupported AI claims.

**Fuwari Visual Baseline**:
The real Fuwari template supplies the shared banner, navbar, profile sidebar, categories/tags widgets, post cards, TOC, theme color control, dark mode, and back-to-top behavior. `src/config.ts`, `src/layouts/`, the Fuwari components under `src/components/`, and `src/styles/global.css` are authoritative. Localized OG cards preserve the portfolio's cyan/blue readout artwork.
_Avoid_: Creating a second page shell or reintroducing the retired soft-pixel/Product Studio systems unless explicitly approved.

**Homepage Case Summary**:
Selected work appears twice: as an in-page problem / built / result proof on the home route, and as a Fuwari-style archive with localized index + detail routes (`/work/`, `/th/work/`, `/work/[slug]/`, `/th/work/[slug]/`).
_Avoid_: Vague claims, private production data, implying demos are live backends.

**Global Portfolio Shell**:
`src/layouts/MainGridLayout.astro` and `src/layouts/Layout.astro` wrap every home, archive, and note detail route. `src/components/Navbar.astro`, `Footer.astro`, `widget/`, and the control components provide the shared Fuwari chrome.
_Avoid_: Per-route navigation identity, duplicated global shell, or bypassing `MainGridLayout` for public pages.

**Language Routing**:
Astro i18n: `en` renders at `/` (default, no prefix), `th` at `/th/`. Content collection entries are stored per locale (`projects/{en,th}`, `articles/{en,th}`) and the slug is derived from the entry id via `entrySlug()`.
_Avoid_: Declaring a `slug` field in content frontmatter (Astro reserves it); locale-dependent slugs without canonical mapping.

**Contact Surface**:
The homepage exposes one minimal contact form (`src/components/home/Contact.astro` → `submit-contact` Edge Function → `contact_submissions` → `/admin` inbox).
_Avoid_: Expanding it into lead capture, analytics, visitor profiles, tracking, or `mailto:` assumptions without explicit product approval.

**Content Ownership**:
| Concern | Owner |
|---------|--------|
| Projects, articles (entities) | `src/content/projects/`, `src/content/articles/` (content collections; published rows also readable from Supabase at build time via `src/lib/cms.ts`) |
| Chrome + marketing copy (EN/TH) | `src/i18n/ui.ts` |
| Design tokens | `src/styles/global.css` |
| Published content backend | Supabase Postgres (RLS-guarded, publishable key only) + deploy-hook auto-rebuild; `/admin` SPA for editing, `submit-contact` Edge Function for the inbox |

**Portfolio Journey Navigation**:
Home, Work, Notes, Capabilities, and Contact. Work targets `/work/` (plus homepage section), Notes links to the localized `/posts/` index, Capabilities and Contact target homepage sections. Fuwari archive/detail controls remain available on post and work routes.
_Avoid_: Timeline nav without a timeline section, restored `/work-with-me` without product approval.

**Retired Routes**:
`/saas` and `/work-with-me` were removed from the product surface. The old Next.js article route is also retired for now. (`/work/` + `/work/[slug]/` and their `/th/` counterparts are active again — do not remove them.)
_Avoid_: Rebuilding them from memory or historical docs without explicit user request.
