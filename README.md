<p align="center">
  <img src="./public/media/etersolis-mark.png" alt="EterSolis" width="96" />
</p>

# EterSolis Website

**Website:** https://etersolis.com  
**Repository:** `ralstonleesmith/EterSolis`  
**Status:** Active post-launch production website with operational launch-readiness controls<br />
**Version:** 0.5.0

EterSolis is a privately owned waste and carbon management company focused on practical resource recovery, circular economy, carbon management, wastewater treatment, waste valorization and industrial sustainability solutions.

This repository contains the controlled Next.js website implementation, operational service-request intake foundation, lead-capture compatibility layer, KYMNIS platform foundation, Helios guided routing layer, newsletter/insights publishing system, executive preview system, visual QA workflow and deployment documentation for `etersolis.com`.

The master operating standard is [`docs/WEBSITE_CODEBASE_SOP.md`](./docs/WEBSITE_CODEBASE_SOP.md). All design, contrast, header, theme, release and production operations must remain aligned with that SOP.

---

## Current State

The codebase includes:

- Next.js App Router with TypeScript.
- PNG-based EterSolis brand rendering.
- Light and dark mode with accessible, persistent theme switching and semantic contrast tokens.
- Polished public pages for Get Started, service status, certificate verification, Services, Industries, About, KYMNIS, Contact, Insights, Newsletter Issue 001, Helios, Media Credits, Privacy and Terms.
- Host-aware same-application routing foundation for `kymnis.com`, with `/kymnis` fallback routes on `etersolis.com`.
- Helios v2 guided routing available across the website with EterSolis and KYMNIS modes.
- Transparent production Helios brand assets integrated into launcher, prompt and guided-routing panels.
- Full-site light/dark mode contrast and visual-layout checks for readable text, visible logos, header behavior and usable navigation.
- Internal KYMNIS functionality scaffolding under `src/lib/internal/`, guarded by disclosure audit tooling.
- Structured Markdown insight publishing with accessible HTML issues and PDF downloads.
- Published CEPA Technical Intelligence Brief route with source-of-record PDF download.
- Service-request, pickup, delivery, assessment, certificate and contact intake forms.
- Zod validation, bot-protection foundation, rate limiting, PostgreSQL, email and CRM integration helpers.
- Runtime configuration checks and operational lead-capture verification commands.
- Liveness and readiness endpoints for deployment verification.
- Self-hosting and deployment documentation.
- Media credit registry and image audit tooling.
- Link audit, asset audit, Playwright smoke tests, accessibility scans, visual preview capture and static executive previews.

For running history, see [`docs/CHANGELOG.md`](./docs/CHANGELOG.md).

---

## Brand Asset Rule

Use PNG logo and mark assets for rendered brand presentation. Do not use inline SVG for the EterSolis logo or mark because it creates visual inconsistencies across browsers, previews and documentation surfaces.

Current committed PNG brand asset:

```txt
public/media/etersolis-mark.png
public/media/helios/helios-icon.png
public/media/helios/helios-primary-lockup.png
public/media/helios/helios-wordmark-tagline.png
public/media/helios/helios-earth-splash.png
public/media/kymnis-logo-mark-only.png
```

Rules:

- Use PNG assets for rendered logo and mark presentation.
- Do not render the EterSolis logo or mark with inline SVG.
- Do not synthesize official logo artwork with typed text when an approved PNG logo file is available.
- Do not place logos on embedded background boxes.
- Do not commit or render source logo-variant boards with visible labels such as “icon only,” “primary lockup,” “wordmark with tagline,” palette annotations or layout guide text.
- Do not commit raw Helios logo-pack exports, preview JPGs, white-background logo files or oversized source logo files as production web assets.
- Use cropped production derivatives for Helios and KYMNIS web surfaces.
- Ensure light surfaces use dark logo/icon variants and dark surfaces use light, white/gold or full-color variants.
- Keep EterSolis as one word everywhere.
- Treat legacy internal platform separation language as obsolete; public and internal repo language should refer to KYMNIS as the unified platform.

---

## Route Map

```txt
/                 Homepage
/get-started      Service request, pickup, delivery, assessment and certificate intake
/get-started/pickup
                  Pickup request intake
/get-started/delivery
                  Delivery request intake
/get-started/assessment
                  Assessment request intake
/get-started/certificates
                  Certificate request intake
/sell-waste       Legacy redirect to /get-started
/status/[publicToken]
                  Public service-request status
/certificates/verify
                  Public certificate verification
/solutions        Resource, waste, carbon and circular economy solutions
/industries       Industry-specific support
/about            Company positioning and leadership
/kymnis           KYMNIS environmental impact registration platform foundation
/kymnis/how-it-works
                  KYMNIS registration and improvement pathway
/kymnis/verification
                  KYMNIS verification-readiness pathway
/kymnis/resource-recovery
                  KYMNIS recovery pathway
/kymnis/contact   KYMNIS platform interest intake
/contact          Contact routes and inquiry form
/insights         Published insight archive
/insights/introducing-etersolis
                  EterSolis Newsletter Issue 001
/insights/technical-intelligence-brief
                  Published CEPA Technical Intelligence Brief
/helios           Guided routing assistant
/media-credits    Website media attribution
/privacy          Privacy notice
/terms            Website terms and non-binding submission notices
/api/health       Health check
/api/readiness    Operational intake readiness check
/api/leads        Contact lead endpoint
/api/waste        Waste opportunity endpoint
/api/service-requests/submit
                  Service-request intake endpoint
/api/service-requests/status/[token]
                  Public service-request status endpoint
/api/payments/create-checkout
                  Manual-invoice checkout abstraction endpoint
/api/certificates/verify/[token]
                  Certificate verification endpoint
/api/v1/public/leads
                  Versioned public lead intake alias
/api/v1/public/waste-opportunities
                  Versioned public waste-opportunity intake alias
/api/v1/public/service-requests
                  Versioned public service-request intake alias
/api/v1/public/kymnis-interest
                  Versioned KYMNIS interest intake alias
/api/v1/public/helios-events
                  Versioned Helios event capture endpoint
/api/v1/admin/delivery-events
                  Protected delivery queue and dead-letter recovery endpoint
/api/v1/webhooks/*
                  Controlled CRM, email and analytics webhook placeholders
```

---

## Codebase Organization

```txt
src/app/                 App Router pages and API routes
src/components/brand/    EterSolis logo and brand components
src/components/layout/   Header, footer and global layout components
src/components/ui/       Reusable UI primitives
src/components/sections/ Page sections
src/components/forms/    Public forms and form helpers
src/components/get-started/
                         Service-request wizard components
src/components/technical-brief/
                         Manual publication reader components
src/components/helios/   Helios guided routing interface
src/components/kymnis/   KYMNIS public foundation components
src/lib/                 Validation, env, email, CRM, DB, analytics, readiness and security utilities
src/lib/api/             Request IDs, response envelopes, logging, idempotency and rate limits
src/lib/operations/      Service-request taxonomy, statuses, schemas and rules
src/lib/payments/        Payment provider abstraction and manual invoice MVP
src/lib/deliveryQueue.ts Postgres-backed outbound delivery event helpers
src/lib/internal/        Internal KYMNIS functionality scaffolding
content/insights/        Structured Markdown insight and newsletter sources
public/media/            PNG brand/media assets with documented credits
previews/                Static executive review previews
tests/e2e/               Smoke, accessibility, visual and preview capture tests
scripts/                 Audit, preview, readiness and deployment helper scripts
docs/                    Operating documentation
```

---

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Managed-host startup file, only where the hosting platform requires a single Node entry file:

```bash
NODE_ENV=production PORT=3000 npm run start:node
```

---

## Operational Intake Readiness

The website can render public pages without production services, but full operational intake requires the production runtime configuration, PostgreSQL schema, operations migrations, SMTP delivery, Turnstile verification, request-ID logging and delivery-event storage to be in place.

When GitHub-hosted Actions cannot start because of account billing or spending-limit state, use `npm run launch:check` as the repository launch gate and record the external CI blocker in the launch record. Hosted CI should be rerun once the account issue is resolved.

Configuration check:

```bash
npm run runtime:check -- --env-file=/etc/etersolis-web.env
```

Operational lead-capture compatibility check:

```bash
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
```

Readiness endpoint:

```bash
curl --fail http://127.0.0.1:3000/api/readiness
```

See [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md) and [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md).

For Google Cloud deployments, use the Cloud Run path in [`docs/GCLOUD_HOSTING.md`](./docs/GCLOUD_HOSTING.md).

---

## Quality Commands

```bash
npm run typecheck
npm run lint
npm run asset:audit
npm run disclosure:audit
npm run routes:check
npm run theme:audit
npm run link:audit
npm run insights:validate
npm run docs:check
npm run release:audit
npm run runtime:check -- --env-file=/etc/etersolis-web.env
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
npm run build
npm run check
npm run launch:check
npm run test:smoke
npm run test:backend
npm run test:visual
npm run brief:pages
npm run preview:capture
npm run newsletter:export -- --slug introducing-etersolis
```

## Versioning and Change Tracking

Every pull request must update the project version, changelog and relevant documentation. The default change is a SemVer patch bump.

```bash
npm run version:bump -- --patch
npm run docs:generate
npm run check
```

See [`docs/VERSIONING.md`](./docs/VERSIONING.md).

---

## Preview and Executive Review

The repository maintains curated static previews in `previews/*.html` and generated live previews in `previews/generated/` captured from the current Next.js application.

```bash
npm run preview:capture
npm run preview:serve
```

See:

- [`docs/PREVIEW_SYSTEM.md`](./docs/PREVIEW_SYSTEM.md)
- [`docs/EXECUTIVE_REVIEW.md`](./docs/EXECUTIVE_REVIEW.md)
- [`docs/WEBSITE_CODEBASE_SOP.md`](./docs/WEBSITE_CODEBASE_SOP.md)
- [`docs/DEVELOPER_GUIDE.md`](./docs/DEVELOPER_GUIDE.md)
- [`docs/NEWSLETTER_SYSTEM.md`](./docs/NEWSLETTER_SYSTEM.md)
- [`docs/VERSIONING.md`](./docs/VERSIONING.md)
- [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md)
- [`docs/GCLOUD_HOSTING.md`](./docs/GCLOUD_HOSTING.md)
- [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md)
- [`docs/BACKEND_ARCHITECTURE.md`](./docs/BACKEND_ARCHITECTURE.md)
- [`docs/API_STANDARD.md`](./docs/API_STANDARD.md)
- [`docs/DATABASE_MIGRATIONS.md`](./docs/DATABASE_MIGRATIONS.md)
- [`docs/DELIVERY_QUEUE.md`](./docs/DELIVERY_QUEUE.md)
- [`docs/ADMIN_RBAC.md`](./docs/ADMIN_RBAC.md)
- [`docs/OBSERVABILITY.md`](./docs/OBSERVABILITY.md)
- [`docs/DATA_GOVERNANCE.md`](./docs/DATA_GOVERNANCE.md)
- [`docs/KYMNIS_PROTECTED_BACKEND.md`](./docs/KYMNIS_PROTECTED_BACKEND.md)
- [`docs/TECHNICAL_BRIEF_READER.md`](./docs/TECHNICAL_BRIEF_READER.md)
- [`docs/RESTORE_AND_RECOVERY.md`](./docs/RESTORE_AND_RECOVERY.md)
- [`docs/ci-cost-optimizations.md`](./docs/ci-cost-optimizations.md)

---

## Environment Variables

Do not commit live runtime values. Use `.env.example` for placeholders and keep production configuration in the server-managed environment file.

KYMNIS inquiries use `KYMNIS_ROUTE_EMAIL`, defaulting to `kymnis@etersolis.com`.

Full operational lead capture requires the configuration groups documented in [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md), [`docs/GCLOUD_HOSTING.md`](./docs/GCLOUD_HOSTING.md) and [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md).

---

© 2026 EterSolis. All rights reserved.

<!-- DOCS:GENERATED START -->
## Generated Project Index

**Version:** 0.5.0
**Content system:** Structured Markdown insights in `content/insights/*.md`
**Primary quality gate:** `npm run check`

### Current Public Routes

- `/` — Homepage
- `/get-started` — Service request, pickup, delivery, assessment and certificate intake
- `/get-started/pickup` — Pickup request intake
- `/get-started/delivery` — Delivery request intake
- `/get-started/assessment` — Assessment request intake
- `/get-started/certificates` — Certificate request intake
- `/sell-waste` — Legacy redirect to `/get-started`
- `/status/[publicToken]` — Public service-request status
- `/certificates/verify` — Public certificate verification
- `/solutions` — Resource, waste, carbon and circular economy solutions
- `/industries` — Industry-specific support
- `/about` — Company positioning and leadership
- `/kymnis` — KYMNIS environmental impact registration platform foundation
- `/kymnis/how-it-works` — KYMNIS registration and improvement pathway
- `/kymnis/verification` — KYMNIS verification-readiness pathway
- `/kymnis/resource-recovery` — KYMNIS recovery pathway
- `/kymnis/contact` — KYMNIS platform interest intake
- `/contact` — Contact routes and inquiry form
- `/insights` — Published insight archive
- `/insights/introducing-etersolis` — EterSolis Newsletter Issue 001
- `/insights/technical-intelligence-brief` — Published CEPA Technical Intelligence Brief
- `/helios` — Guided routing assistant
- `/media-credits` — Website media attribution
- `/privacy` — Privacy notice
- `/terms` — Website terms and non-binding submission notices
- `/api/health` — Liveness endpoint
- `/api/readiness` — Operational intake readiness endpoint
- `/api/leads` — Contact lead compatibility endpoint
- `/api/waste` — Waste opportunity compatibility endpoint
- `/api/service-requests/submit` — Service-request intake endpoint
- `/api/service-requests/status/[token]` — Public service-request status endpoint
- `/api/payments/create-checkout` — Manual-invoice checkout abstraction endpoint
- `/api/certificates/verify/[token]` — Certificate verification endpoint
- `/api/v1/public/leads` — Versioned public lead intake alias
- `/api/v1/public/waste-opportunities` — Versioned public waste-opportunity intake alias
- `/api/v1/public/service-requests` — Versioned public service-request intake alias
- `/api/v1/public/kymnis-interest` — Versioned KYMNIS interest intake alias
- `/api/v1/public/helios-events` — Versioned Helios event capture endpoint
- `/api/v1/admin/delivery-events` — Protected delivery queue and dead-letter recovery endpoint
- `/api/v1/webhooks/*` — Controlled CRM, email and analytics webhook placeholders

### Required Change-Control Scripts

- `npm run version:bump -- --patch`
- `npm run insights:validate`
- `npm run docs:generate`
- `npm run docs:check`
- `npm run release:audit`
- `npm run disclosure:audit`
- `npm run routes:check`
- `npm run theme:audit`
- `npm run runtime:check -- --env-file=/etc/etersolis-web.env`
- `npm run lead-capture:check -- --env-file=/etc/etersolis-web.env`
- `npm run test:backend`
- `npm run check`
- `npm run launch:check`
- `npm run test:smoke`
- `npm run test:layout`
- `npm run preview:capture`
<!-- DOCS:GENERATED END -->
