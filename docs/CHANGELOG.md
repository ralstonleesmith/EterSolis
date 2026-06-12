# EterSolis Website Upgrade Changelog

This changelog records controlled website upgrade work for `etersolis.com`.

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
- PR #2 build initially passed before the additional polish commits; latest commit should be revalidated before merge.

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
