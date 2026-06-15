# EterSolis Website Upgrade Changelog

This changelog records controlled website upgrade work for `etersolis.com`.

## 2026-06-15 — Repository Audit, Documentation, Brand Asset, and Preview-System Pass

### Repository Inspection

- Re-inspected the current repository state after PR #4 and PR #5 were merged.
- Confirmed the project now includes Next.js 15, Playwright smoke testing, accessibility auditing, asset auditing, link auditing, Docker/self-hosting support and media-credit tooling.
- Identified that README status still referenced an older PR and needed refresh.

### Brand Assets

- Confirmed transparent dark logo and dark mark assets under `public/brand/`.
- Added transparent light logo and light mark SVG assets for dark-surface usage.
- Updated README to display the EterSolis logo and document official brand asset usage.

### Documentation

- Replaced the older README with a current, structured repository guide.
- Added developer guidance for collaboration, quality gates, code organization, form standards and error minimization.
- Added executive review instructions for brand, messaging, visual, waste submission, functional and approval review.
- Added preview-system documentation covering curated previews, generated previews, approval states and quality gates.

### Preview System

- Added a zero-dependency local preview server for static previews.
- Updated the Playwright preview capture test to output generated app previews to `previews/generated/` with screenshots, HTML snapshots, a manifest and an index page.
- Kept curated static previews separate from generated application previews to reduce review confusion.

### QA Coverage

- Kept smoke accessibility scans focused on the core public conversion routes.
- Strengthened muted-text contrast safeguards for form and review-card accessibility.
- Added package scripts for preview capture, preview serving, visual testing and consolidated QA.

## 2026-06-12 — Media-Led UX, Guided Intake, and Local Automation Pass

- Added project-local media assets, generated hero imagery, optimized preview variants and auditable `public/media/credits.json`.
- Replaced the split homepage hero and generic page hero treatment with full-bleed media-led heroes.
- Added mobile navigation with an icon menu and retained visible Sell Waste access.
- Converted Waste Opportunity and Contact forms into guided steppers while preserving existing API routes.
- Upgraded Helios into a controlled v1 guided-routing wizard with recommendation state and guardrails.
- Added mobile sticky Sell Waste CTA on the Sell Waste page.
- Added `package-lock.json` workflow support through `npm ci`.
- Added media asset audit, Playwright smoke screenshots, Docker build and deploy dry-run scripts.
- Added Docker healthcheck and updated self-hosting release gates to avoid relying on GitHub Actions.
- Upgraded dependencies and added a PostCSS override to clear npm audit.

## 2026-06-12 — Final Polish, Policy, Routing, and Preview Sync Pass

- Upgraded Privacy and Terms pages into structured policy and commercial notice cards.
- Added privacy request CTA to `privacy@etersolis.com`.
- Reinforced non-binding submission, no unsolicited samples, regulated-material caution, and EterSolis rights-reserved language.
- Upgraded Helios v0 from simple link chips into a branded guided-routing panel.
- Added transparent EterSolis mark usage, route icons and clear guardrail chips.
- Updated preview stylesheet, preview index and previews for Home, Sell Waste, Solutions, Industries, About, Contact, Insights, Helios, Privacy and Terms.

## 2026-06-12 — Official Branding and UX Polish Pass

- Added official EterSolis transparent SVG logo component with full-logo and mark-only variants.
- Added light-logo usage for dark backgrounds and dark-logo usage for light backgrounds.
- Replaced temporary placeholder mark in the header.
- Added official logo and transparent mark usage in the footer and homepage visual system.
- Enabled class-based light and dark mode in Tailwind.
- Added dark-mode color variables, branded dark background treatment and accessible theme toggle.
- Upgraded Sell Waste, Industries, About, Contact and Insights pages with branded layouts and controlled public copy.
- Polished Waste Opportunity and Contact forms for light and dark mode.

## 2026-06-12 — Core Website Foundation

- Initialized Next.js App Router and TypeScript codebase.
- Added core routes: Home, Sell Waste, Solutions, Industries, About, Contact, Insights, Helios, Privacy, Terms.
- Added API routes for health, leads and waste opportunities.
- Added PostgreSQL schema and lead storage implementation.
- Added SMTP notification implementation.
- Added CRM webhook implementation.
- Added Turnstile and rate-limiting security foundation.
- Added self-hosting documentation, Dockerfile and Docker Compose example.
- Populated README.md with the website upgrade scope, architecture, routes, design rules, security controls and launch plan.
- Added proprietary LICENSE.md to protect EterSolis source code and software.
