# Portfolio Design Context

> Current as of 2026-09-03. Shared vocabulary for the implemented Machine Readout portfolio after the Astro rebuild.

This context keeps design and implementation decisions consistent across the homepage, navigation, and notes archive.

## Language

**Notes and Project Archive**:
The canonical public product: a bilingual (EN/TH) site focused on curated notes, runbooks, experiments, and project records. Content includes a populated Work section (EN/TH project records) alongside the notes-first hero and capabilities.
_Avoid_: Personal-data-heavy profile, fictional product company, unsupported AI claims.

**Machine Readout Visual Baseline**:
Pure white field (`#ffffff`), single cyan-blue (`#0071a9`) used as ink, accent, and line colour, typewriter monospace type (Courier Prime + Noto Sans Thai fallback), dashed blueprint separators, and flat radius-0 shapes — no cards, shadows, or grain. `DESIGN.md` and `src/styles/global.css` are authoritative for tokens.
_Avoid_: Reintroducing the retired soft-pixel or Product Studio systems unless explicitly approved.

**Homepage Case Summary**:
Selected work is intended as in-page problem / built / result proof. The Work section renders each project as a flat non-navigational row: a duotone figure placeholder, the story (category, title, description, Problem → Built → Result), and a system readout (`REF / TECH / CASE`); a dashed empty-state block appears only when no records exist.
_Avoid_: Vague claims, private production data, implying demos are live backends.

**Global Portfolio Shell**:
The Navbar + Footer provided by `src/components/home/` around the home route.
_Avoid_: Per-route navigation identity, duplicated global shell.

**Language Routing**:
Astro i18n: `en` renders at `/` (default, no prefix), `th` at `/th/`. Content collection entries are stored per locale (`projects/{en,th}`, `articles/{en,th}`) and the slug is derived from the entry id via `entrySlug()`.
_Avoid_: Declaring a `slug` field in content frontmatter (Astro reserves it); locale-dependent slugs without canonical mapping.

**Contact Surface**:
The current homepage does not expose a contact or project-intake flow.
_Avoid_: Adding lead capture, in-app form storage, or `mailto:` assumptions without explicit product approval.

**Content Ownership**:
| Concern | Owner |
|---------|--------|
| Projects, articles (entities) | `src/content/projects/`, `src/content/articles/` (content collections) |
| Chrome + marketing copy (EN/TH) | `src/i18n/ui.ts` |
| Design tokens | `src/styles/global.css` |

**Portfolio Journey Navigation**:
Home, Work, Notes, and Capabilities. Work and Capabilities target homepage sections, while Notes links to the localized notes index.
_Avoid_: Timeline nav without a timeline section, restored `/work-with-me` without product approval.

**Retired Routes**:
`/saas`, `/work/[slug]`, and `/work-with-me` were removed from the product surface. The old Next.js article route is also retired for now.
_Avoid_: Rebuilding them from memory or historical docs without explicit user request.
