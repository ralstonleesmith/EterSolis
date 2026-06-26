<p align="center">
  <img src="./public/media/etersolis-mark.png" alt="EterSolis" width="96" />
</p>

# EterSolis Website

**Website:** https://etersolis.com  
**Repository:** `ralstonleesmith/EterSolis`  
**Status:** Active post-launch production website with operational launch-readiness controls<br />
**Version:** 0.3.2

EterSolis is a privately owned waste and carbon management company focused on practical resource recovery, circular economy, carbon management, wastewater treatment, waste valorization and industrial sustainability solutions.

This repository contains the controlled Next.js website implementation, lead-capture foundation, KYMNIS platform foundation, Helios guided routing layer, newsletter/insights publishing system, executive preview system, visual QA workflow and deployment documentation for `etersolis.com`.

---

## Current State

The codebase includes:

- Next.js App Router with TypeScript.
- PNG-based EterSolis brand rendering.
- Light and dark mode with accessible theme toggle.
- Polished public pages for Sell Waste, Solutions, Industries, About, KYMNIS, Contact, Insights, Newsletter Issue 001, Helios, Media Credits, Privacy and Terms.
- Host-aware same-application routing foundation for `kymnis.com`, with `/kymnis` fallback routes on `etersolis.com`.
- Helios v2 guided routing available across the website with EterSolis and KYMNIS modes.
- Cropped production Helios brand assets integrated into launcher, prompt and guided-routing panels.
- Internal KYMNIS functionality scaffolding under `src/lib/internal/`, guarded by disclosure audit tooling.
- Structured Markdown insight publishing with accessible HTML issues and PDF downloads.
- Waste opportunity and contact intake forms.
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
- Use cropped production derivatives for Helios and KYMNIS web surfaces.
- Keep EterSolis as one word everywhere.
- Treat legacy internal platform separation language as obsolete; public and internal repo language should refer to KYMNIS as the unified platform.

---

## Route Map

```txt
/                 Homepage
/sell-waste       Waste opportunity intake
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
/helios           Guided routing assistant
/media-credits    Website media attribution
/privacy          Privacy notice
/terms            Website terms and non-binding submission notices
/api/health       Health check
/api/readiness    Operational lead-capture readiness check
/api/leads        Contact lead endpoint
/api/waste        Waste opportunity endpoint
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
src/components/helios/   Helios guided routing interface
src/components/kymnis/   KYMNIS public foundation components
src/lib/                 Validation, env, email, CRM, DB, analytics, readiness and security utilities
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

## Operational Lead-Capture Readiness

The website can render public pages without production services, but full operational lead capture requires the production runtime configuration, PostgreSQL schema, SMTP delivery and Turnstile verification to be in place.

Configuration check:

```bash
npm run runtime:check -- --env-file=/etc/etersolis-web.env
```

Operational lead-capture check:

```bash
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
```

Readiness endpoint:

```bash
curl --fail http://127.0.0.1:3000/api/readiness
```

See [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md) and [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md).

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
npm run test:smoke
npm run test:visual
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
- [`docs/DEVELOPER_GUIDE.md`](./docs/DEVELOPER_GUIDE.md)
- [`docs/NEWSLETTER_SYSTEM.md`](./docs/NEWSLETTER_SYSTEM.md)
- [`docs/VERSIONING.md`](./docs/VERSIONING.md)
- [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md)
- [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md)
- [`docs/ci-cost-optimizations.md`](./docs/ci-cost-optimizations.md)

---

## Environment Variables

Do not commit live runtime values. Use `.env.example` for placeholders and keep production configuration in the server-managed environment file.

KYMNIS inquiries use `KYMNIS_ROUTE_EMAIL`, defaulting to `kymnis@etersolis.com`.

Full operational lead capture requires the configuration groups documented in [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md) and [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md).

---

© 2026 EterSolis. All rights reserved.

<!-- DOCS:GENERATED START -->
## Generated Project Index

**Version:** 0.3.2
**Content system:** Structured Markdown insights in `content/insights/*.md`
**Primary quality gate:** `npm run check`

### Current Public Routes

- `/` — Homepage
- `/sell-waste` — Waste opportunity intake
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
- `/helios` — Guided routing assistant
- `/media-credits` — Website media attribution
- `/privacy` — Privacy notice
- `/terms` — Website terms and non-binding submission notices
- `/api/health` — Liveness endpoint
- `/api/readiness` — Operational lead-capture readiness endpoint

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
- `npm run check`
- `npm run test:smoke`
- `npm run preview:capture`
<!-- DOCS:GENERATED END -->
