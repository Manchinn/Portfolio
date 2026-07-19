# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root.
- **`docs/agents/MEMORY.md`** for retired systems and anti-drift facts.
- **`PRODUCT.md`**, **`DESIGN.md`**, and **`docs/architecture/OVERVIEW.md`** for the live product.
- **`docs/adr/`** for ADRs that touch the area about to be changed.

If ADRs don't exist, proceed silently. Don't flag their absence; don't suggest creating them upfront. The producer skill (`/grill-with-docs`) creates them lazily when terms or decisions actually get resolved.

Ignore historical `docs/superpowers/*` specs that contradict MEMORY/PRODUCT (especially FlowSync, prompts, CMS).

## File structure

This is a single-context repo:

```text
/
├── CONTEXT.md
├── PRODUCT.md
├── DESIGN.md
├── CHANGELOG.md
├── docs/agents/MEMORY.md
├── docs/adr/                    # optional
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use, or there's a real gap to note for `/grill-with-docs`.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> Contradicts ADR-0007 - but worth reopening because...
