# Portfolio Design Context

> Current as of 2026-07-20. Shared vocabulary for the implemented product after route cleanup and soft-pixel skin.

This context keeps design and implementation decisions consistent across the homepage, article routes, navigation, and external inquiry handoff.

## Language

**Software Engineering Portfolio**:
The canonical public product: an anonymized EN/TH portfolio focused on full-stack systems, homepage case summaries, technical articles, and a clear project inquiry path.
_Avoid_: Personal-data-heavy profile, fictional product company, unsupported AI claims

**Soft-Pixel Visual Baseline**:
Warm paper surfaces, near-black ink, teal actions, **2px** block borders, **2–4px** radii, offset block shadows, IBM Plex Sans body, Silkscreen only on eyebrows/labels/nav tagline. `DESIGN.md` and `src/app/globals.css` are authoritative for tokens.
_Avoid_: Treating pre–soft-pixel green-neutral / large-radius docs as implemented; full NES/game UI without approval

**Homepage Case Summary**:
In-page problem / built / result proof on selected-work cards. No separate work-detail or interactive proof route.
_Avoid_: Vague claims, private production data, implying demos are live backends

**Global Portfolio Shell**:
The shared `src/app/(portfolio)/layout.tsx` frame that provides Navbar and Footer to home and article routes.
_Avoid_: Per-route navigation identity, duplicated global shell, assuming retired routes still exist

**Localized Article Route**:
A statically generated `/article/[slug]` route whose canonical slug comes from the English data set and whose client content follows the active EN/TH language.
_Avoid_: Locale-specific slugs without a canonical mapping, unmatched EN/TH entries

**External Inquiry Handoff**:
Contact CTAs open `publicContactUrl` (public GitHub Issues). The portfolio does not host a local brief builder or store form data.
_Avoid_: Backend lead capture, in-app form storage, `mailto:` assumptions

**Content Ownership**:
| Concern | Owner |
|---------|--------|
| Projects, articles, public contact URL | `src/data/portfolio.ts` |
| Shared CTAs / case-study labels | `src/content/shared.ts` |
| Homepage marketing sections | `src/content/home.ts` |
| Nav chrome labels | `src/i18n/locales/*.json` |

**Portfolio Journey Navigation**:
Home, Work, Stack, and Contact. Work, Stack, and Contact target homepage sections (`/#work`, `/#stack`, `/#contact`).
_Avoid_: Timeline nav without a timeline section, restored `/work-with-me` without product approval, Prompts as a primary portfolio nav item

**Retired Routes**:
`/saas`, `/work/[slug]`, and `/work-with-me` were removed from the product surface.
_Avoid_: Rebuilding them from memory or historical docs without explicit user request

## Example Dialogue

Dev: "Should we restore `/saas` or `/work/[slug]` because older docs mention them?"

Domain expert: "No. Those routes were removed. Restoring them is a new product decision."

Dev: "Should contact use an in-app form again?"

Domain expert: "Not by default. Use the public GitHub inquiry URL unless the product requirements explicitly add a private submission service."

Dev: "Should the navbar keep Workflow, Systems, Work, Timeline, Projects, or Prompts?"

Domain expert: "No. Use the simplified Portfolio Journey Navigation: Home, Work, Stack, and Contact."

Dev: "Can work and article slugs differ between English and Thai?"

Domain expert: "Not with the current route model. Static params come from the English data, so both locale arrays must keep matching canonical slugs."

Dev: "Where does homepage hero copy live?"

Domain expert: "`src/content/home.ts`. Shared inquiry CTAs stay in `src/content/shared.ts`. Entities stay in `src/data/portfolio.ts`."

Dev: "Is the old pale-green large-radius look still the baseline?"

Domain expert: "No. Soft-pixel level A is current. Read `DESIGN.md`."
