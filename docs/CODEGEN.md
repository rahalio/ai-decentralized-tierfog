# Codegen guide

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:identity   # full identity scaffold (starter)
```

Config: `.codegen/.zero-codegen-merged.json`  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

**Never commit `.codegen/`** — restore locally from the scaffold; see `.cursor/skills/no-codegen-commit/`.

## OpenAPI sample shape

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- `packages/openapi-core/src/identity.yaml` — identity blueprint
- Product domains: `sites`, `tiers`, `protocol`, `jobs`, `fl`, `addressing`, `trust`, `provenance`
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Shared vs product

| Shared (keep) | Product (add in consumer) |
|---------------|---------------------------|
| `_shared` dirs, middleware, messaging | Domain YAML + generated trees |
| Identity domain | Sites / tiers / protocol / … domains |
| Envelope + Problem contracts | Domain-specific schemas |

## Related skills

- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint
- `no-codegen-commit` — never push `.codegen`
