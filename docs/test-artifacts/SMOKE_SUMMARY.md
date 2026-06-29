# Local Launch Validation Summary

**Validated commit:** `307d48eb73851c672b7d5b4aed954894cdc8da0a`
**Validated branch:** `upgrade/kymnis-platform-foundation`
**Run timestamp:** 2026-06-28T21:57:39Z
**Status:** Local repository launch gate passed.

This record is the local validation evidence for the launch-readiness branch while GitHub-hosted Actions are unavailable because the GitHub account billing or spending-limit state prevents jobs from starting.

## Passed

- `npm run docs:check`
- `npm run release:audit`
- `npm run deploy:dry-run`
- `npm audit --omit=dev`
- `npm run launch:check`

`npm run launch:check` includes:

- TypeScript typecheck.
- ESLint.
- Insight validation.
- Generated documentation check.
- Release audit.
- KYMNIS disclosure audit.
- Route registry check.
- Theme audit.
- Media audit.
- Link audit.
- Production `next build`.
- Playwright smoke and accessibility suite: 22 tests passed.
- Playwright layout/theme suite: 10 tests passed.
- Deployment dry run.

## Expected Local Non-Passes

These are not code failures:

- `npm run runtime:check -- --env-file=.env.example` fails because `.env.example` intentionally contains placeholders and blank production values.
- `npm run lead-capture:check -- --env-file=.env.example` fails for the same reason before attempting database or SMTP connectivity.
- `npm run docker:build` cannot run on this workstation because the `docker` CLI is not installed.

## External Production Evidence Still Required

Before public lead capture is enabled, complete the production checks in `docs/LAUNCH_CHECKLIST.md` with the real server-managed runtime file:

- `npm run runtime:check -- --env-file=/etc/etersolis-web.env`
- `npm run lead-capture:check -- --env-file=/etc/etersolis-web.env`
- `npm run docker:build` on a Docker-enabled host, if container deployment is used.
- Apply `database/schema.sql` to the production PostgreSQL database if it has not already been applied.
- Verify live `/api/health` and `/api/readiness`.
- Submit non-sensitive `/contact` and `/sell-waste` test records.
- Confirm internal routing email and submitter confirmation email.

## Live Endpoint Check

On 2026-06-29, local network access to `etersolis.com` initially failed under sandbox DNS restrictions. With approved network access, both production endpoint checks returned HTTP 404:

- `curl --fail https://etersolis.com/api/health`
- `curl --fail https://etersolis.com/api/readiness`

That result means the current launch-ready application and readiness endpoints are not yet verified on the public production domain. Treat public deployment verification as incomplete until those endpoints return success after deployment.
