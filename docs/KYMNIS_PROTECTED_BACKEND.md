# KYMNIS Protected Backend

KYMNIS backend workflows are protected by default. Public KYMNIS pages must remain high-level and must not expose internal scoring, review logic, evidence rules or protected schemas.

## Protected Entities

- `kymnis_accounts`
- `kymnis_sites`
- `kymnis_incidents`
- `kymnis_evidence`
- `kymnis_reviews`
- `kymnis_actions`
- `kymnis_resolution_records`
- `kymnis_public_visibility_rules`

## Public Boundary

Do not expose protected KYMNIS schemas or operational methods in:

- public routes;
- public components;
- API responses;
- sitemap generation;
- previews;
- media assets;
- marketing copy.
