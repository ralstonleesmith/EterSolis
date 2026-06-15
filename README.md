<p align="center">
  <img src="./public/brand/etersolis-logo-dark.svg" alt="EterSolis" width="420" />
</p>

# EterSolis Website

**Website:** https://etersolis.com  
**Repository:** `ralstonleesmith/EterSolis`  
**Status:** Active production-quality website upgrade  
**Classification:** Proprietary and confidential EterSolis source code and implementation documentation

EterSolis is a privately owned waste and carbon management company focused on practical resource recovery, circular economy, carbon management, wastewater treatment, waste valorization and industrial sustainability solutions.

This repository contains the controlled Next.js website implementation, lead-capture foundation, executive preview system, visual QA workflow and deployment documentation for `etersolis.com`.

---

## Current State

The codebase now includes:

- Next.js App Router with TypeScript.
- Official transparent EterSolis logo and mark assets.
- Light and dark mode with accessible theme toggle.
- Modern homepage with resource-flow visual and strong Sell Waste CTA.
- Polished pages for Sell Waste, Solutions, Industries, About, Contact, Insights, Helios, Media Credits, Privacy and Terms.
- Waste opportunity and contact intake forms.
- Zod validation, bot-protection foundation, rate limiting, PostgreSQL, email and CRM integration helpers.
- Self-hosting and deployment documentation.
- Media credit registry and image audit tooling.
- Link audit, asset audit, Playwright smoke tests, accessibility scans, visual preview capture and static executive previews.

For running history, see [`docs/CHANGELOG.md`](./docs/CHANGELOG.md).

---

## Official Brand Assets

Transparent SVG assets are available under `public/brand/`:

```txt
public/brand/etersolis-logo-dark.svg
public/brand/etersolis-logo-light.svg
public/brand/etersolis-mark-dark.svg
public/brand/etersolis-mark-light.svg
```

Usage rules:

- Use dark logo variants on light backgrounds.
- Use light logo variants on dark backgrounds.
- Do not place logos on embedded background boxes.
- Do not export or reuse brand assets outside approved EterSolis work.
- Keep EterSolis as one word everywhere.

---

## Strategic Public Positioning

Public pages must preserve these rules:

- Describe EterSolis as a privately owned waste and carbon management company.
- Emphasize practical problem-solving, responsible recovery, service reliability, environmental protection and operational discipline.
- Avoid unsupported impact claims, greenwashing, exaggerated performance guarantees or public-authority positioning.
- Do not disclose protected systems, formulas, pricing logic, hidden operational logic, confidential counterparties, customer information or proprietary methods.
- Waste submission is always non-binding until EterSolis completes review and provides written instructions.

Approved homepage hero copy:

> **Waste Is Value Waiting To Be Recovered.**
>
> EterSolis is a privately owned waste and carbon management company helping organizations recover value from waste streams, manage carbon exposure and build practical circular economy solutions.

Primary calls to action:

- Sell Waste To EterSolis
- Request Assessment
- Talk to Helios

---

## Route Map

```txt
/                 Homepage
/sell-waste       Waste opportunity intake
/solutions        Resource, waste, carbon and circular economy solutions
/industries       Industry-specific support
/about            Company positioning and leadership
/contact          Contact routes and inquiry form
/insights         Controlled insight library shell
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
public/brand/            Transparent logo and mark SVG assets
public/media/            Self-hosted media with documented credits
previews/                Static executive review previews
tests/e2e/               Smoke, accessibility, visual and preview capture tests
scripts/                 Audit, preview and deployment helper scripts
docs/                    Operating documentation
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Run production build locally:

```bash
npm run build
npm run start
```

---

## Quality Commands

Use the lowest-cost check that is appropriate for the change:

```bash
npm run typecheck
npm run lint
npm run asset:audit
npm run link:audit
npm run build
npm run check
npm run test:smoke
npm run test:visual
npm run preview:capture
```

Recommended use:

- Documentation-only change: run link audit if links changed.
- Page or component change: run `npm run check`.
- Form, navigation or accessibility change: run `npm run check && npm run test:smoke`.
- Visual approval change: run `npm run preview:capture` and review generated previews.

---

## Preview and Executive Review

The repository maintains two preview layers:

1. **Curated static previews** in `previews/*.html` for quick executive review.
2. **Generated live previews** in `previews/generated/` captured from the current Next.js application.

Preview commands:

```bash
npm run preview:capture
npm run preview:serve
```

Review guidance:

- Start with `previews/index.html`.
- For final rendered review, capture live previews and open `previews/generated/index.html`.
- Confirm pages match the current application state.
- Confirm no page appears as plain whitespace with listed text.
- Confirm all pages have professional visual hierarchy, CTA clarity and mobile usability.

See:

- [`docs/PREVIEW_SYSTEM.md`](./docs/PREVIEW_SYSTEM.md)
- [`docs/EXECUTIVE_REVIEW.md`](./docs/EXECUTIVE_REVIEW.md)

---

## CI and Cost Control

Cost-minimizing standards:

- Keep checks path-filtered where appropriate.
- Use dependency and framework caches in CI.
- Prefer audits and smoke tests before heavier visual runs.
- Upload Playwright artifacts only when useful for review or failure diagnosis.
- Avoid adding dependencies unless they materially reduce risk or maintenance cost.
- Do not compromise quality gates for speed.

Required before merge:

- TypeScript passes.
- Lint passes.
- Asset and link audits pass.
- Production build passes.
- Smoke and accessibility tests pass for interaction or visual changes.
- Previews are current when pages or visuals change.

---

## Environment Variables

Do not commit secrets. Use `.env.example` for placeholders only.

Common variables:

```env
NEXT_PUBLIC_SITE_URL=https://etersolis.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
DATABASE_URL=
RESEND_API_KEY=
CRM_API_KEY=
WASTE_ROUTE_EMAIL=waste@etersolis.com
INFO_ROUTE_EMAIL=info@etersolis.com
PARTNERSHIPS_ROUTE_EMAIL=partnerships@etersolis.com
CAREERS_ROUTE_EMAIL=careers@etersolis.com
PRIVACY_ROUTE_EMAIL=privacy@etersolis.com
CEO_ROUTE_EMAIL=smith@etersolis.com
CSO_ROUTE_EMAIL=cso@etersolis.com
```

---

## Documentation Index

- [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) — controlled change history.
- [`docs/DEVELOPER_GUIDE.md`](./docs/DEVELOPER_GUIDE.md) — collaboration and error minimization.
- [`docs/PREVIEW_SYSTEM.md`](./docs/PREVIEW_SYSTEM.md) — preview generation and review workflow.
- [`docs/EXECUTIVE_REVIEW.md`](./docs/EXECUTIVE_REVIEW.md) — executive approval checklist.
- [`docs/SELF_HOSTING.md`](./docs/SELF_HOSTING.md) — self-hosted deployment guidance.
- [`docs/ci-cost-optimizations.md`](./docs/ci-cost-optimizations.md) — CI cost controls.
- [`LICENSE.md`](./LICENSE.md) — proprietary license and rights reservation.

---

## License

This repository is proprietary. No open-source license is granted. No use, copying, modification, distribution, sublicensing, hosting, deployment, reverse engineering, scraping, extraction, AI training, model training or derivative use is permitted without written authorization from EterSolis.

© 2026 EterSolis. All rights reserved.
