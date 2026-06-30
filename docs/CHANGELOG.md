# EterSolis Website Upgrade Changelog

This changelog records controlled website upgrade work for `etersolis.com`.

## 0.3.7 — 2026-06-30T19:30:50Z

### CEPA Technical Intelligence Brief

- Published the CEPA Technical Intelligence Brief Color & Chemicals Industry Edition Issue 001 at `/insights/technical-intelligence-brief`.
- Added the approved 40-page flagship PDF as the public source-of-record download.
- Promoted CEPA and EterSolis publication assets into public media and registered them in media credits.
- Added the CEPA publication standard as controlled supporting documentation for future issue production.

### Documentation and Tracking

- Updated Insights, footer discoverability, generated route docs, README references and publication tests for the released brief.
- Refined the public presentation with direct on-page reading, executive publication copy and public-facing responsible-use language.
- Bumped the website package version to `0.3.7`.

### Validation

- Required gates: `npm run check`, `npm run test:layout`, `npm run test:smoke`, `npm run preview:capture` and `npm audit`.

## 0.3.6 — 2026-06-30T12:01:47Z

### Scope

- Added the public Technical Intelligence Brief publication path at `/insights/technical-intelligence-brief`.
- Added controlled publication readiness metadata for the first Technical Intelligence Brief without exposing a draft PDF or unsupported claims.
- Updated Helios contact intents to route directly into the correct contact-form topic.
- Expanded route, preview and smoke coverage for the Technical Intelligence Brief path and lead-capture flows.
- Reinforced lead-capture acceptance around route-specific contact topics, mocked successful submissions, and error states.

### Documentation and Tracking

- Updated README and generated documentation route indexes for the Technical Intelligence Brief path.
- Extended sitemap, route checks and generated preview capture coverage for the new publication route.

### Validation

- Required gates: `npm run check`, `npm run test:layout`, `npm run test:smoke`, `npm run preview:capture` and `npm audit`.

## 0.3.5 — 2026-06-30T09:13:25Z

### Scope

- Adopted `docs/WEBSITE_CODEBASE_SOP.md` as the master website and codebase operating standard.
- Added semantic theme utilities for readable text, surfaces, fields, controls and header states across light and dark mode.
- Reworked the header and theme toggle for persistent binary theme switching, active route clarity, mobile menu control linkage and Escape-key closure.
- Migrated high-risk Helios, KYMNIS, form and marketing surfaces away from brittle low-opacity contrast patterns.
- Expanded layout/theme testing to inspect visible text contrast, first-load theme preference, header states and theme persistence.

### Documentation and Tracking

- Updated README to link the SOP and reflect the hardened light/dark contrast and header quality standard.
- Updated theme audit requirements so semantic tokens, SOP documentation and contrast-test coverage are enforced.

### Validation

- Required gates: `npm run check`, `npm run test:layout`, `npm run test:smoke` and `npm run preview:capture`.
- Contrast checks now inspect visible text elements in both themes rather than only comparing body colors.

## 0.3.4 — 2026-06-29T06:50:08Z

### Scope

- Added a managed-host-compatible `server.js` startup file while preserving the default `next start` production path.
- Added an operational readiness model and `/api/readiness` endpoint for lead-capture configuration status.
- Added runtime configuration validation utilities and npm-accessible checks for production configuration and lead-capture operations.
- Added database and SMTP connectivity verification for controlled pre-launch checks.
- Hardened deployment dry-run validation to confirm startup, Docker, package, schema, documentation and operational-check assets.
- Added `npm run launch:check` as the local launch gate for environments where GitHub Actions cannot run because of account budget or billing limits.
- Refined the header so the EterSolis logo is the home control, the separate Home button is removed and Sell Waste remains the primary conversion action.
- Separated header navigation from the full route registry so sitemap and route coverage remain complete while the header stays concise.
- Expanded GitHub Actions branch and path coverage so launch branches, scripts, database schema, documentation, Docker, server startup and README changes trigger validation when GitHub Actions are available.
- Added Cloud Run deployment guidance for Artifact Registry image publishing, Secret Manager runtime configuration, Cloud SQL PostgreSQL, health/readiness checks and production form acceptance.

### Documentation and Tracking

- Added `docs/LAUNCH_CHECKLIST.md` with a launch record template, rollback criteria and form acceptance-test procedure.
- Updated README and self-hosting documentation with the readiness endpoint, runtime check and lead-capture check.
- Updated generated documentation rules so launch-readiness commands remain part of the checked README index.
- Linked Google Cloud Run hosting instructions from README, self-hosting operations and the operational launch checklist.
- Added smoke-test coverage for logo-home behavior and removal of the duplicate Home navigation item.
- Updated PR #12 metadata and branch alignment so it points at the same launch-readiness commit as `upgrade/kymnis-platform-foundation`.

### Validation

- Required local gate before merge: `npm run launch:check`.
- Supporting local checks: `npm run docs:check`, `npm run release:audit`, `npm run deploy:dry-run` and `npm audit --omit=dev`.
- Preview review artifact refresh: `npm run preview:capture` should regenerate ignored local files under `previews/generated/`.
- GitHub Actions are configured for the launch branches, but current GitHub runs fail before job startup because account billing or spending-limit state prevents hosted runners from starting.
- Required production gates before public lead capture: `npm run runtime:check -- --env-file=/etc/etersolis-web.env`, `npm run lead-capture:check -- --env-file=/etc/etersolis-web.env`, `/api/health`, `/api/readiness`, `/contact` test submission and `/sell-waste` test submission.
- Version bump remains governed by `docs/VERSIONING.md`; package and lockfile versions must remain aligned before merge.

## 0.3.3 — 2026-06-19T07:40:52Z

### Scope

- Replaced Helios logo derivatives with optimized transparent assets from the approved Helios logo pack.
- Updated the Helios page so the Earth splash appears once and the secondary KYMNIS panel uses a plain dark surface.
- Hid the floating Helios launcher on the Helios route to avoid duplicate controls and overlap.
- Polished light/dark mode transitions, header contrast, mobile navigation contrast and route-safe launcher spacing.
- Added layout/theme checks for horizontal overflow, readable theme switching, mobile menu usability and Helios splash duplication.

### Documentation and Tracking

- Updated README brand rules, preview guidance, media credits and version metadata for `0.3.3`.
- Expanded media and theme audits to prevent raw logo-pack assets, oversized Helios logo derivatives and missing theme-transition safeguards.

### Validation

- Required gates: `npm run check`, `npm run test:layout`, `npm run test:smoke`, `npm run preview:capture` and `npm audit --audit-level=moderate`.

## 0.3.2 — 2026-06-18T22:23:15Z

### Scope

- Added cropped production Helios brand assets for the launcher, inline prompt and guided-routing panel.
- Replaced generic Helios visuals with the approved orbital mark, wordmark and Earth guidance splash.
- Aligned KYMNIS UI tokens and hero treatment to the official teal, gold, ink and white palette.
- Reinforced that legacy internal platform-separation terminology is obsolete outside protected disclosure-audit denylist logic.
- Expanded media, theme and logo-route audits to guard against stale route coverage and source logo-variant board usage.

### Documentation and Tracking

- Updated README brand rules, preview-system review coverage and media-credit registry.
- Bumped package and lockfile version metadata to `0.3.2`.

### Validation

- Required gates: `npm run check`, `npm audit --audit-level=moderate`, `npm run test:smoke` and `npm run preview:capture`.
- Server-backed smoke and preview checks must run serially after clearing ignored Next.js/test artifacts.

## 0.3.1 — 2026-06-18T12:05:00Z

### Scope

- Upgraded Helios visual hierarchy, mode-specific copy, routing cards, guardrail presentation and launcher responsiveness.
- Added a stronger inline Helios prompt on the homepage and improved KYMNIS/EterSolis routing presentation.
- Refined shared UI surfaces with lift transitions, signal-grid texture, polished header active states and stronger dark/light presentation.
- Fixed KYMNIS light-mode contrast issues found by Playwright accessibility scans.
- Updated Helios route coverage so the full assistant page exposes all EterSolis and KYMNIS route options.
- Updated smoke tests after KYMNIS copy changes.

### Validation

- Required gates: `npm run check`, `npm run test:smoke`, `npm run preview:capture` and `npm audit --audit-level=moderate`.
- `npm run check` passed after the Helios/UI and documentation updates.
- `npm run preview:capture` completed once and generated refreshed local previews under `previews/generated/`; a later rerun was blocked by local sandbox port permissions after contrast/test copy fixes.
- `npm run test:smoke` found KYMNIS contrast and stale-copy test issues, which were fixed; rerun was blocked by local sandbox port permissions.
- `npm audit --audit-level=moderate` currently reports the known Nodemailer advisory requiring a breaking `nodemailer@9.0.1` upgrade; network access is required to fetch and validate that dependency update.
- Changelog entry created with ISO UTC timestamp for release traceability.

## 0.3.0 — 2026-06-18T11:30:00Z

### Scope

- Added the KYMNIS platform foundation route family for overview, simple reporting pathway, verification, resource recovery and platform interest intake.
- Added host-aware same-application routing so `kymnis.com` can resolve to the KYMNIS public foundation while retaining `/kymnis` fallback routes.
- Upgraded Helios to v2 with shared guided-routing intents, KYMNIS mode, inline prompts and a sitewide launcher.
- Added internal KYMNIS functionality scaffolding under `src/lib/internal/` with public disclosure guardrails.
- Expanded contact routing with KYMNIS inquiry handling and environment configuration.

### Documentation and Tracking

- Updated README, developer guidance, versioning guidance and internal implementation notes.
- Added disclosure, route and theme audits to the required quality gate.
- Expanded preview and Playwright route coverage to include KYMNIS pages.

### Validation

- Required gates: `npm run check`, `npm run test:smoke`, `npm run preview:capture` and `npm audit --audit-level=moderate`.
- Changelog entry created with ISO UTC timestamp for release traceability.

## 0.2.1 — 2026-06-18T10:13:00Z

### Scope

- Published EterSolis Newsletter Issue 001 as an accessible HTML insight with the approved PDF retained for download.
- Added a deterministic structured-Markdown newsletter source system and print/export route.
- Added PR-level versioning, release audit, documentation checks and newsletter validation.
- Replaced the Insights placeholder with a real issue archive and featured newsletter entry.

### Documentation and Tracking

- Added `docs/VERSIONING.md` with SemVer patch-per-PR rules, timestamped changelog requirements and enforcement notes.
- Added `docs/NEWSLETTER_SYSTEM.md` with editorial, accessibility, metadata and export standards.
- Updated README generated sections to list current routes, scripts and version-control commands.

### Validation

- Planned required gates: `npm run check`, `npm run test:smoke`, `npm run preview:capture` and `npm audit --audit-level=moderate`.
- Changelog entry created with ISO UTC timestamp for release traceability.

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

- Expanded accessibility route coverage to include Media Credits, Privacy and Terms.
- Added package scripts for preview capture, preview serving, visual testing and consolidated QA.

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
- Reinforced no-pricing, no-acceptance, no-hazardous-instructions, and no-internal-architecture-disclosure guardrails.

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

- GitHub Actions Build and Test workflow exists and runs typecheck, lint and production build.
- PR #2 build passed and was merged into main.

## 2026-06-12 — Core Website Foundation

- Initialized Next.js App Router and TypeScript codebase.
- Added core routes: Home, Sell Waste, Solutions, Industries, About, Contact, Insights, Helios, Privacy, Terms.
- Added API routes for health, leads and waste opportunities.
- Added PostgreSQL schema and lead storage implementation.
- Added SMTP notification implementation.
- Added CRM webhook implementation.
- Added Turnstile and rate-limiting security foundation.
- Added self-hosting documentation, Dockerfile and Docker Compose example.

## 2026-06-12 — Documentation and Protection
