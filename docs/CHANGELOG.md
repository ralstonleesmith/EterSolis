# EterSolis Website Upgrade Changelog

This changelog records controlled website upgrade work for `etersolis.com`.

## 2026-06-12 — Media-Led UX, Guided Intake, and Local Automation Pass

### Visual System

- Added project-local media assets, generated hero imagery, optimized preview variants and auditable `public/media/credits.json`.
- Replaced the split homepage hero and generic page hero treatment with full-bleed media-led heroes.
- Reduced oversized card radii and normalized heading letter spacing across the public UI.

### Interaction and Conversion

- Added mobile navigation with an icon menu and retained visible Sell Waste access.
- Converted Waste Opportunity and Contact forms into guided steppers while preserving existing API routes.
- Upgraded Helios into a controlled v1 guided-routing wizard with recommendation state and guardrails.
- Added mobile sticky Sell Waste CTA on the Sell Waste page.

### Automation

- Added `package-lock.json` workflow support through `npm ci`.
- Added media asset audit, Playwright smoke screenshots, Docker build and deploy dry-run scripts.
- Added Docker healthcheck and updated self-hosting release gates to avoid relying on GitHub Actions.
- Upgraded vulnerable dependencies and added a PostCSS override to clear npm audit.

## 2026-06-12 — Final Polish, Policy, Routing, and Preview Sync Pass

### Policy Pages

- Upgraded Privacy page from plain text into structured policy cards.
- Added privacy request CTA to `privacy@etersolis.com`.
- Upgraded Terms page into structured commercial notice cards.
- Reinforced non-binding submission, no unsolicited samples, regulated-material caution, and EterSolis rights-reserved language.

### Helios

- Upgraded Helios v0 from simple link chips into a branded guided-routing panel.
- Added transparent EterSolis mark usage.
- Added route icons and clear guardrail chips.
- Reinforced no-pricing, no-acceptance, no-hazardous-instructions, and no-protected-system-disclosure guardrails.

### Executive HTML Previews

- Updated preview stylesheet to reflect the current branded visual system, light/dark treatment, cards, forms, hero layouts, banners and footer styling.
- Updated preview index to describe the current preview set.
- Updated previews for Home, Sell Waste, Solutions, Industries, About, Contact, Insights, Helios, Privacy and Terms.
- Previews now reflect the current page structure and content more accurately for executive review.

### Validation

- PR #2 was merged after GitHub Actions passed typecheck, lint, and build.
- New polish branch `feature/final-polish-content-ops` created from merged PR #2.
- Latest branch should run full GitHub Actions validation before merge.

## 2026-06-12 — Official Branding and UX Polish Pass

### Branding

- Added official EterSolis transparent SVG logo component.
- Added full-logo and mark-only variants.
- Added light-logo usage for dark backgrounds.
- Added dark-logo usage for light backgrounds.
- Replaced temporary `E` placeholder mark in the header.
- Added official logo and transparent mark usage in the footer.
- Added transparent mark watermark in the homepage resource-flow visual.
- Added explicit no-background logo handling through `.brand-no-background`.

### Theme System

- Enabled class-based light and dark mode in Tailwind.
- Added dark-mode color variables and branded dark background treatment.
- Added accessible light/dark theme toggle.
- Added pre-hydration theme initialization to reduce theme flash.

### Page Polish

- Upgraded Sell Waste page with a modern hero, material category cards, controlled review notice, and review-path cards.
- Upgraded Industries page with icon-led sector cards and sector-focus panels.
- Upgraded About page with brand-led company story, official mark treatment, operating principles, and leadership cards.
- Upgraded Contact page with icon-led routing cards and polished contact form placement.
- Upgraded Insights page with editorial cards, controlled-publication status, and disciplined content positioning.

### Forms

- Polished Waste Opportunity form for light and dark mode.
- Polished Contact form for light and dark mode.
- Added clearer non-confidential intake language.
- Retained Turnstile bot-protection integration.

### Validation

- GitHub Actions Build and Test workflow exists and runs typecheck, lint, and production build.
- PR #2 build passed and was merged into main.

## 2026-06-12 — Core Website Foundation

- Initialized Next.js App Router and TypeScript codebase.
- Added core routes: Home, Sell Waste, Solutions, Industries, About, Contact, Insights, Helios, Privacy, Terms.
- Added API routes for health, leads, and waste opportunities.
- Added PostgreSQL schema and lead storage implementation.
- Added SMTP notification implementation.
- Added CRM webhook implementation.
- Added Turnstile and rate-limiting security foundation.
- Added self-hosting documentation, Dockerfile, and Docker Compose example.

## 2026-06-12 — Documentation and Protection

- Populated README.md with website execution scope, architecture, routes, design rules, security controls, and launch plan.
- Added proprietary LICENSE.md to protect EterSolis source code and software.
