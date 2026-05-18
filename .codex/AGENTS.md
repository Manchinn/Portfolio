# Codex Project Guidance

This file supplements the root `AGENTS.md` for Codex-specific workflows.

## Working Style

- Read existing files before editing.
- Keep changes scoped to the requested behavior.
- Use `apply_patch` for manual edits.
- Prefer `rg` and `rg --files` for codebase discovery.
- Run `npm run build` before finalizing implementation changes.

## Project Roles

The local agent configs are read-only helpers:

| Role | Config | Purpose |
|------|--------|---------|
| `explorer` | `agents/explorer.toml` | Gather code evidence before changes |
| `reviewer` | `agents/reviewer.toml` | Review correctness, security, regressions |
| `docs_researcher` | `agents/docs-researcher.toml` | Verify APIs against primary docs |

## Portfolio-Specific Guardrails

- Preserve EN/TH content and update both locales when changing public copy.
- Keep public demos high-level and sanitized.
- Do not create a backend folder.
- Route Handlers belong in `src/app/api/*`.
- Avoid exposing private infrastructure details in UI copy or docs intended for public viewing.

## Checks

```bash
npm run build
powershell -ExecutionPolicy Bypass -File scripts/review.ps1
powershell -ExecutionPolicy Bypass -File scripts/deploy-check.ps1 -Env preview
```
