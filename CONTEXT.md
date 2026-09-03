# Portfolio Design Context

> Current as of 2026-09-02. Shared vocabulary for the implemented Product Studio portfolio after the Astro rebuild.

This context keeps design and implementation decisions consistent across the homepage, navigation, and external inquiry handoff.

## Language

**Software Engineering Portfolio**:
The canonical public product: a bilingual (EN/TH) portfolio focused on full-stack systems delivery. Content includes a populated Work section (EN/TH project records) alongside hero, capabilities, and contact.
_Avoid_: Personal-data-heavy profile, fictional product company, unsupported AI claims.

**Product Studio Visual Baseline**:
Light theme, near-black ink (`#18181b`), single indigo accent (`#4f46e5`), white surfaces, subtle borders/shadows, generous whitespace, Inter body + Noto Sans Thai + JetBrains Mono for code/chips. `DESIGN.md` and `src/styles/global.css` are authoritative for tokens.
_Avoid_: Reintroducing the retired soft-pixel system unless explicitly approved.

**Homepage Case Summary**:
Selected work is intended as in-page problem / built / result proof. The Work section renders each project as a non-navigational card (a category eyebrow, title, description, a Problem → Built → Result case-study block, and a tech-chip row); a dashed "coming soon" card is shown only when no records exist.
_Avoid_: Vague claims, private production data, implying demos are live backends.

**Global Portfolio Shell**:
The Navbar + Footer provided by `src/components/home/` around the home route.
_Avoid_: Per-route navigation identity, duplicated global shell.

**Language Routing**:
Astro i18n: `en` renders at `/` (default, no prefix), `th` at `/th/`. Content collection entries are stored per locale (`projects/{en,th}`, `articles/{en,th}`) and the slug is derived from the entry id via `entrySlug()`.
_Avoid_: Declaring a `slug` field in content frontmatter (Astro reserves it); locale-dependent slugs without canonical mapping.

**External Inquiry Handoff**:
Contact CTAs open `PUBLIC_CONTACT_URL` (public GitHub Issues). The portfolio does not host a local brief builder or store form data.
_Avoid_: Backend lead capture, in-app form storage, `mailto:` assumptions.

**Content Ownership**:
| Concern | Owner |
|---------|--------|
| Projects, articles (entities) | `src/content/projects/`, `src/content/articles/` (content collections) |
| Chrome + marketing copy (EN/TH) | `src/i18n/ui.ts` |
| Public contact URL | `src/data/types.ts` (`PUBLIC_CONTACT_URL`) |
| Design tokens | `src/styles/global.css` |

**Portfolio Journey Navigation**:
Home, Work, Capabilities, and Contact. Work, Capabilities, and Contact target homepage sections (`/#work`, `/#capabilities`, `/#contact`).
_Avoid_: Timeline nav without a timeline section, restored `/work-with-me` without product approval.

**Retired Routes**:
`/saas`, `/work/[slug]`, and `/work-with-me` were removed from the product surface. The old Next.js article route is also retired for now.
_Avoid_: Rebuilding them from memory or historical docs without explicit user request.
