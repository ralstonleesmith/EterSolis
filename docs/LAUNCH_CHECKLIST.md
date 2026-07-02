# EterSolis Operational Launch Checklist

This checklist is the controlled release record for bringing `etersolis.com` to full operational intake readiness. Complete it for every production launch or server migration.

## 0.7.0 Portal Release Gate

- Confirm `0009_operational_portal.sql` is present and `npm run migrations:check` passes.
- Confirm customer portal routes render with deterministic demo values and no production secrets.
- Confirm admin case, quotation, invoice, reconciliation, refund, receiving, stockpile, processing and audit consoles render.
- Confirm `/api/v1/admin/cases`, `/api/v1/admin/quotations`, `/api/v1/admin/invoices` and `/api/v1/admin/payments/reconciliation` return the v1 envelope.
- Confirm quote-before-invoice and proof-before-reconciliation language is visible.
- Confirm generated previews include portal and admin operational routes in desktop and mobile viewports.
- Confirm the Technical Brief reader supports search, table of contents, resume, arrows, keyboard, swipe and no auto-advance.

## 1. Repository and Version Control

- Confirm the release branch is reviewed through a pull request.
- Confirm `package.json`, `package-lock.json`, README and `docs/CHANGELOG.md` are aligned with the approved release scope.
- Confirm `npm run release:audit` passes before deployment.
- Record the reviewed commit hash in the deployment log before the production restart.

## 2. Runtime Platform

- Use Node.js 20 LTS or later.
- Install dependencies with `npm ci`, not `npm install`, on production servers.
- For Google Cloud hosting, use the Cloud Run procedure in [`docs/GCLOUD_HOSTING.md`](./GCLOUD_HOSTING.md), including Artifact Registry, Secret Manager, Cloud SQL, health/readiness checks and form acceptance tests.
- Use the default production command for standard Node hosting:

```bash
npm run build
PORT=3000 npm run start
```

- Use the managed-host startup file only where a hosting panel or Passenger-style environment requires a single Node entry file:

```bash
PORT=3000 NODE_ENV=production npm run start:node
```

## 3. Production Runtime Configuration

Runtime configuration must be stored outside the repository. Do not commit live operational values.

Required operational groups:

- Canonical public URL.
- PostgreSQL connection string.
- Client-IP HMAC key.
- SMTP host, port, user, password and verified sender.
- Cloudflare Turnstile public and server verification keys.
- Controlled routing inboxes for operations, service requests, department routing, certificates, payments, waste compatibility, information, partnerships, KYMNIS, privacy, CEO and CSO inquiries.
- `ADMIN_SHARED_SECRET` before exposing the MVP admin area in production.
- Auth.js Google SSO placeholders (`AUTH_SECRET`, `AUTH_GOOGLE_CLIENT_ID`, `AUTH_GOOGLE_CLIENT_SECRET`, `AUTH_ALLOWED_DOMAIN`) before replacing the MVP admin guard.

Validate the runtime file before deploying:

```bash
npm run runtime:check -- --env-file=/etc/etersolis-web.env
```

## 4. Database

- Create the PostgreSQL database with a least-privilege application user.
- Apply the committed schema before enabling public form traffic:

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/migrations/2026-07-etersolis-operations.sql
for file in database/migrations/000*.sql; do psql "$DATABASE_URL" -f "$file"; done
```

- Confirm the following tables exist:
  - `lead_submissions`
  - `waste_opportunities`
  - `audit_events`
  - `customers`
  - `customer_contacts`
  - `customer_sites`
  - `service_requests`
  - `material_profiles`
  - `risk_assessments`
  - `pickup_requests`
  - `delivery_requests`
  - `payments`
  - `certificates`
  - `analytics_events`
  - `admin_actions`
  - `schema_migrations`
  - `organizations`
  - `contacts`
  - `opportunities`
  - `waste_streams`
  - `outbound_events`
  - `webhook_deliveries`
  - `crm_sync_records`
  - `email_delivery_records`
  - `rate_limit_counters`
  - `admin_users`
  - `roles`
  - `user_roles`
  - `consent_records`
  - `access_logs`

## 5. Operational Intake Check

After dependencies are installed and the runtime file is present, run the full operational check:

```bash
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
```

This check confirms:

- required runtime configuration is present and well formed;
- PostgreSQL is reachable;
- lead-capture and operational intake tables exist;
- SMTP connectivity verifies successfully.

If the mail relay cannot be reached from the build environment but will be reachable only from production, use `--skip-smtp` for staging only and complete the SMTP check on production before public launch.

## 6. Application Quality Gates

Run the controlled gates:

```bash
npm ci
npm run test:backend
npm run migrations:check
npm run launch:check
```

`npm run launch:check` runs the production quality gate, smoke tests, layout/theme tests and deployment dry run. `npm run test:backend` verifies backend contract files, v1 route aliases, delivery queue, preview coverage and reader controls. `npm run migrations:check` verifies migration order and operational tables when a database is configured. The release is not operationally ready if any gate fails.

If GitHub Actions cannot start because of account billing, payment or spending-limit state, record that external blocker in the launch record and use the local `npm run launch:check` result as the repository quality evidence until hosted runners are available again. Do not mark GitHub Actions as passed when jobs did not start.

## 7. Production Start and Verification

Restart through the approved process manager: systemd, PM2, Docker or the hosting provider application manager.

Verify liveness:

```bash
curl --fail http://127.0.0.1:3000/api/health
```

Verify operational readiness:

```bash
curl --fail http://127.0.0.1:3000/api/readiness
```

For public verification after DNS and HTTPS are active:

```bash
curl --fail https://etersolis.com/api/health
curl --fail https://etersolis.com/api/readiness
curl --fail -H "x-admin-secret: $ADMIN_SHARED_SECRET" https://etersolis.com/api/v1/admin/delivery-events
```

## 8. Form Acceptance Test

Submit non-sensitive test records through:

- `/contact`
- `/contact?topic=Partnership#contact-form`
- `/contact?topic=Wastewater%20Treatment#contact-form`
- `/kymnis/contact`
- `/get-started`
- `/get-started/pickup`
- `/get-started/delivery`
- `/get-started/assessment`
- `/certificates/verify`
- `/insights/technical-intelligence-brief#brief-reader`

Confirm every test submission produces:

- an HTTP success response;
- a `lead_submissions` record;
- a `service_requests` record for Get Started submissions;
- related material, risk, payment and pickup or delivery records where applicable;
- queued or visible `outbound_events` for async delivery paths where configured;
- an internal routing email;
- a submitter confirmation email;
- no raw client IP stored in the lead payload.
- the selected contact topic routes to the expected inbox.
- visible success and failure states remain readable in light and dark mode.

## 9. Rollback Criteria

Rollback immediately if:

- `/api/health` fails;
- `/api/readiness` fails after expected configuration is loaded;
- form submissions fail to persist;
- internal notification email fails;
- submitter confirmation email fails;
- production logs show repeated unhandled errors.

Rollback procedure:

1. Restore the last reviewed production commit.
2. Reinstall dependencies with `npm ci` only if the dependency graph changed.
3. Restart the process manager.
4. Verify `/api/health` and `/api/readiness`.
5. Record the rollback commit and reason in the deployment log.

## 10. Launch Record Template

```txt
Date/time UTC:
Operator:
Release branch:
Pull request:
Released commit:
Node version:
Database schema applied: yes/no
Runtime check passed: yes/no
Lead-capture check passed: yes/no
Smoke tests passed: yes/no
Layout/theme tests passed: yes/no
Health endpoint passed: yes/no
Readiness endpoint passed: yes/no
Contact form test passed: yes/no
Get Started form test passed: yes/no
Service request status link passed: yes/no
Certificate verification route passed: yes/no
Internal email confirmed: yes/no
Submitter email confirmed: yes/no
Rollback required: yes/no
Notes:
```
