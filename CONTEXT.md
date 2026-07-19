# Portfolio Design Context

> Current as of 2026-07-11. This vocabulary describes the implemented baseline before the next design refactor.

This context keeps design and implementation decisions consistent across the homepage, proof routes, article routes, navigation, and project intake surface.

## Language

**Software Engineering Portfolio**:
The canonical public product: an anonymized EN/TH portfolio focused on full-stack systems, implementation proof, technical articles, and a clear project inquiry path.
_Avoid_: Personal-data-heavy profile, fictional product company, unsupported AI claims

**Current Portfolio Visual Baseline**:
The implemented light interface using IBM Plex Sans, compact 6-8px radii, teal actions, pale green-neutral surfaces, thin dividers, and restrained shadows. `DESIGN.md` records the exact current tokens.
_Avoid_: Treating an older design proposal as implemented code

**Workflow Proof**:
Evidence that connects a problem, what was built, the result, delivery signals, and a public-safe interaction. The current proof route uses fictional records and local filtering; it is not connected to a live backend.
_Avoid_: Vague claims, private production data, implying that a fictional demo is live

**Global Portfolio Shell**:
The shared `src/app/(portfolio)/layout.tsx` frame that provides Navbar and Footer to the home, work, article, and work-intake routes.
_Avoid_: Per-route navigation identity, duplicated global shell, assuming `/saas` has a separate layout

**Localized Article Route**:
A statically generated `/article/[slug]` route whose canonical slug comes from the English data set and whose client content follows the active EN/TH language.
_Avoid_: Locale-specific slugs without a canonical mapping, unmatched EN/TH entries

**External Inquiry Handoff**:
Contact CTAs open `publicContactUrl` (public GitHub Issues). The portfolio does not host a local brief builder or store form data.
_Avoid_: Backend lead capture, in-app form storage, `mailto:` assumptions

**Portfolio Journey Navigation**:
The current navigation path: Home, Work, Stack, and Contact. Work, Stack, and Contact target homepage sections (`/#work`, `/#stack`, `/#contact`).
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
