<p align="center">
  <img src="./public/media/etersolis-mark.png" alt="EterSolis" width="96" />
</p>

# EterSolis Website

**Website:** https://etersolis.com  
**Repository:** `ralstonleesmith/EterSolis`  
**Status:** Active post-launch production website
**Version:** 0.2.1

EterSolis is a privately owned waste and carbon management company focused on practical resource recovery, circular economy, carbon management, wastewater treatment, waste valorization and industrial sustainability solutions.

This repository contains the controlled Next.js website implementation, lead-capture foundation, newsletter/insights publishing system, executive preview system, visual QA workflow and deployment documentation for `etersolis.com`.

---

## Current State

The codebase includes:

- Next.js App Router with TypeScript.
- PNG-based EterSolis brand rendering.
- Light and dark mode with accessible theme toggle.
- Polished public pages for Sell Waste, Solutions, Industries, About, Contact, Insights, Newsletter Issue 001, Helios, Media Credits, Privacy and Terms.
- Structured Markdown insight publishing with accessible HTML issues and PDF downloads.
- Waste opportunity and contact intake forms.
- Zod validation, bot-protection foundation, rate limiting, PostgreSQL, email and CRM integration helpers.
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
```

Rules:

- Use PNG assets for rendered logo and mark presentation.
- Do not render the EterSolis logo or mark with inline SVG.
- Do not synthesize official logo artwork with typed text when an approved PNG logo file is available.
- Do not place logos on embedded background boxes.
- Keep EterSolis as one word everywhere.

---

## Route Map

```txt
/                 Homepage
/sell-waste       Waste opportunity intake
/solutions        Resource, waste, carbon and circular economy solutions
/industries       Industry-specific support
/about            Company positioning and leadership
/contact          Contact routes and inquiry form
/insights         Published insight archive
/insights/introducing-etersolis
                  EterSolis Newsletter Issue 001
/helios           Guided routing assistant
/media-credits    Website media attribution
/privacy          Privacy notice
/terms            Website terms and non-binding submission notices
/api/health       Health check
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
src/lib/                 Validation, env, email, CRM, DB, analytics and security utilities
content/insights/        Structured Markdown insight and newsletter sources
public/media/            PNG brand/media assets with documented credits
previews/                Static executive review previews
tests/e2e/               Smoke, accessibility, visual and preview capture tests
scripts/                 Audit, preview and deployment helper scripts
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

---

## Quality Commands

```bash
npm run typecheck
npm run lint
npm run asset:audit
npm run link:audit
npm run insights:validate
npm run docs:check
npm run release:audit
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
- [`docs/ci-cost-optimizations.md`](./docs/ci-cost-optimizations.md)

---

## Environment Variables

Do not commit secrets. Use `.env.example` for placeholders.

---

© 2026 EterSolis. All rights reserved.

<!-- DOCS:GENERATED START -->
## Generated Project Index

**Version:** 0.2.1
**Content system:** Structured Markdown insights in `content/insights/*.md`
**Primary quality gate:** `npm run check`

### Current Public Routes

- `/` — Homepage
- `/sell-waste` — Waste opportunity intake
- `/solutions` — Resource, waste, carbon and circular economy solutions
- `/industries` — Industry-specific support
- `/about` — Company positioning and leadership
- `/contact` — Contact routes and inquiry form
- `/insights` — Published insight archive
- `/insights/introducing-etersolis` — EterSolis Newsletter Issue 001
- `/helios` — Guided routing assistant
- `/media-credits` — Website media attribution
- `/privacy` — Privacy notice
- `/terms` — Website terms and non-binding submission notices

### Required Change-Control Scripts

- `npm run version:bump -- --patch`
- `npm run insights:validate`
- `npm run docs:generate`
- `npm run docs:check`
- `npm run release:audit`
- `npm run check`
- `npm run test:smoke`
- `npm run preview:capture`
<!-- DOCS:GENERATED END -->
