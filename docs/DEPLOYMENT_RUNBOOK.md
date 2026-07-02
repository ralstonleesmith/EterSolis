# Deployment Runbook

## Order

1. Confirm working tree and release version.
2. Run documentation generation and checks.
3. Run migration checks without destructive schema changes.
4. Run backend, type, lint, route, theme, asset, link and build gates.
5. Run smoke, layout and preview capture.
6. Apply migrations in order in the target environment.
7. Confirm readiness endpoint reports database, SMTP, Turnstile, route emails, delivery queue and migration table status.
8. Deploy the exact committed source state.

## Roll Forward

Operational portal changes are additive. If a migration has applied, fix forward with a later migration rather than editing applied SQL.
