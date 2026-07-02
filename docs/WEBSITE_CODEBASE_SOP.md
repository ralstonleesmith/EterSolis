# EterSolis Website and Codebase Standard Operating Procedure

**Document ID:** ES-WEB-SOP-001  
**Document title:** EterSolis Website and Codebase Standard Operating Procedure  
**Website:** https://etersolis.com  
**Repository:** `ralstonleesmith/EterSolis`  
**Recommended repository path:** `docs/WEBSITE_CODEBASE_SOP.md`  
**Document owner:** EterSolis  
**Operational owner:** Website / Technical Operations  
**Applies to:** EterSolis public website, KYMNIS public website surfaces, Helios public routing surfaces, public forms, public APIs, preview systems, deployment process, production hosting, and release governance  
**Effective date:** 2026-06-30  
**Status:** Controlled operating procedure  
**Classification:** Internal operational standard  
**Primary objective:** Reproducible ultra-high-quality website and codebase  

---

## 0. Mandatory Rule

The EterSolis website must be operated as a controlled production application, not as a manually edited marketing page.

The clean operating workflow is:

```txt
GitHub merge
-> SSH into Afrihost
-> git pull --ff-only origin main
-> npm ci
-> npm run check
-> npm run build
-> Passenger restart
-> cPanel Node app restart
-> /api/health verification
-> /api/readiness verification
-> cache purge
-> cache-busted homepage verification
```

Manual editing of production files through cPanel is prohibited except for an emergency hotfix. If an emergency hotfix is performed, the exact change must be back-ported into GitHub immediately, reviewed, merged, and redeployed through the standard workflow.

Never edit built files inside `.next`.

Never restore `public_html/index.html`.

Never restore `public_html/etersolis.com/index.html`.

Never commit secrets, production environment values, SMTP credentials, database credentials, Turnstile secrets, CRM secrets, analytics webhook secrets, or `IP_HASH_SECRET`.

---

# 1. Purpose

This SOP defines the mandatory operating standard for the EterSolis website and codebase.

It exists to ensure that every update to the website is:

1. technically correct;
2. visually consistent;
3. brand-correct;
4. legally careful;
5. commercially precise;
6. operationally safe;
7. accessible;
8. performance-conscious;
9. reproducible;
10. version-controlled;
11. testable;
12. auditable;
13. deployable without production drift.

The website must always present EterSolis as a serious waste and carbon management company with scientific, commercial, industrial, and executive credibility.

---

# 2. Scope

This SOP applies to all of the following:

```txt
src/app/
src/components/
src/lib/
src/lib/internal/
content/insights/
public/media/
previews/
tests/e2e/
scripts/
docs/
database/
package.json
package-lock.json
tailwind.config.ts
playwright.config.ts
server.js
.env.example
README.md
```

It applies to:

1. homepage changes;
2. page layout changes;
3. brand changes;
4. copy changes;
5. form changes;
6. route changes;
7. API route changes;
8. Helios changes;
9. KYMNIS public changes;
10. newsletter / insights changes;
11. media changes;
12. accessibility changes;
13. SEO metadata changes;
14. analytics changes;
15. privacy / legal changes;
16. dependency changes;
17. preview changes;
18. deployment changes;
19. database changes;
20. production runtime configuration changes.

---

# 3. Definitions

## 3.1 EterSolis

`EterSolis` means the company and public brand. It must always be written as one word with capital `E` and capital `S`.

Correct:

```txt
EterSolis
```

Incorrect:

```txt
Eter Solis
Etersolis
ETER SOLIS
Eter-Solis
EterSolis(TM) unless legally approved for that usage
```

## 3.2 Website

`Website` means the public production application served at:

```txt
https://etersolis.com
```

## 3.3 Repository

`Repository` means:

```txt
ralstonleesmith/EterSolis
```

## 3.4 Production

`Production` means the live Afrihost-hosted website serving public traffic.

## 3.5 Preview

`Preview` means a controlled visual review output under:

```txt
previews/
previews/generated/
```

## 3.6 Lead capture

`Lead capture` means any public intake form, form API, email routing, database persistence, CRM forwarding, analytics forwarding, or audit event related to website inquiries.

## 3.7 Operational readiness

`Operational readiness` means the full runtime dependency state required for production lead capture to operate safely, including environment variables, database, SMTP, bot protection, and route email configuration.

## 3.8 Liveness

`Liveness` means the app process is alive and responding.

The liveness endpoint is:

```txt
/api/health
```

## 3.9 Readiness

`Readiness` means the app has the required operational configuration to accept production submissions.

The readiness endpoint is:

```txt
/api/readiness
```

---

# 4. Governing Principles

## 4.1 Production is controlled by Git

All normal changes must originate in GitHub or the local repository.

The live server must only receive reviewed code through:

```bash
git pull --ff-only origin main
```

No one may use cPanel File Manager to make normal production edits.

## 4.2 Production drift is unacceptable

Production drift occurs when the live server contains files, edits, generated outputs, or configuration that are not traceable to the reviewed repository state.

If drift is detected:

```bash
git status
git diff
```

must be inspected before deployment continues.

Do not overwrite drift blindly.

## 4.3 The website must be executive-grade

Every public screen must look deliberate, premium, clean, stable, and technically competent.

No page may appear unfinished, generic, experimental, cluttered, childish, visually noisy, or template-like.

## 4.4 The website must not overpromise

The website must not imply:

1. automatic waste purchase acceptance;
2. guaranteed resource recovery;
3. guaranteed carbon outcomes;
4. guaranteed compliance outcomes;
5. disposal approval;
6. transport approval;
7. technical certification;
8. binding quotation;
9. contract formation;
10. acceptance of unsolicited samples;
11. KYMNIS certification unless legally approved;
12. regulatory advice;
13. legal advice;
14. environmental permit approval.

## 4.5 The codebase must be stable and traceable

Prefer:

1. typed code;
2. existing patterns;
3. small components;
4. explicit validation;
5. explicit route ownership;
6. simple dependencies;
7. deterministic commands;
8. reproducible production builds.

Avoid:

1. one-off visual hacks;
2. unreviewed dependencies;
3. manually edited built output;
4. hidden side effects;
5. unvalidated inputs;
6. silent runtime assumptions;
7. undocumented environment requirements.

---

# 5. Technical Baseline

## 5.1 Required stack

The website must remain aligned with the established stack unless a formal architecture change is approved.

Current baseline:

```txt
Application framework: Next.js
Router: Next.js App Router
Language: TypeScript
UI library: React
Styling: Tailwind CSS
Validation: Zod
Animation: Framer Motion
Icons: lucide-react
Email: nodemailer
Database client: pg
Database: PostgreSQL
Testing: Playwright
Accessibility testing: Axe / Playwright accessibility checks where implemented
Linting: ESLint
Formatting: Prettier
Runtime: Node.js 20 or later
```

## 5.2 Node standard

Minimum Node version:

```txt
>=20.0.0
```

Production must use the Node path configured for the Afrihost cPanel Node application:

```bash
export PATH=/home/etersot4j6a0/nodevenv/etersolis.com/24/bin:$PATH
```

Before every production deployment, confirm:

```bash
node -v
npm -v
```

## 5.3 Package management standard

Use:

```bash
npm ci
```

Do not use:

```bash
npm install
```

in production deployment.

Reason: `npm ci` installs exactly from `package-lock.json`, which keeps production aligned with the reviewed dependency graph.

---

# 6. Canonical Repository Organization

The repository must preserve this structure:

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
database/                Database schema and database-supporting files
```

## 6.1 New folder rule

A new top-level folder may be added only if all conditions are met:

```txt
1. The purpose cannot be satisfied by an existing folder.
2. The folder name is short, lowercase, and descriptive.
3. The folder is documented in README.md.
4. The folder is included in relevant scripts or audits if applicable.
5. The folder is included in docs/CHANGELOG.md.
6. The PR explains why the folder is necessary.
```

## 6.2 File naming rules

Use:

```txt
PascalCase.tsx     for React components
camelCase.ts       for utilities
kebab-case.md      for documentation files unless repository convention already differs
kebab-case.mjs     for scripts
route.ts           for Next.js route handlers
page.tsx           for Next.js pages
layout.tsx         for Next.js layouts
```

Do not use vague names:

```txt
new.tsx
test2.tsx
final.tsx
updated.tsx
component.tsx
misc.ts
stuff.ts
helper2.ts
```

## 6.3 Component ownership

Use this placement rule:

```txt
src/components/brand/     logo, mark, brand lockup, brand-only rendering
src/components/layout/    header, footer, theme toggle, global layout pieces
src/components/ui/        reusable neutral UI primitives
src/components/sections/  page sections used by one or more marketing pages
src/components/forms/     form components, field groups, public intake UI
src/components/helios/    Helios-specific UI and routing surfaces
src/components/kymnis/    KYMNIS-specific public components
```

Do not place form logic in page files if it can reasonably be isolated.

Do not place internal KYMNIS logic in public component folders.

---

# 7. Brand System

## 7.1 Brand name

Always use:

```txt
EterSolis
```

Public descriptor:

```txt
Waste & Carbon Management
```

Approved positioning sentence:

```txt
EterSolis is a privately owned waste and carbon management company focused on practical resource recovery, circular economy, carbon management, wastewater treatment, waste valorization, and industrial sustainability solutions.
```

## 7.2 Voice and tone

Use:

```txt
precise
executive
scientific
commercially mature
calm
direct
practical
high-trust
technically literate
```

Avoid:

```txt
hype
charity language
activist language
greenwashing
fear-based language
vague sustainability claims
unsupported superlatives
childish metaphors
overly casual phrasing
```

## 7.3 Primary color palette

The official EterSolis palette is:

```css
--coal: #565656;
--coal-strong: #0b1220;
--sunshine: #FCCF25;
--sunshine-10: rgba(252,207,37,0.22);
--aero: #FFFFFF;
--cool: #F2F2F2;
--carbon: #000000;
--mist: #FAFAF7;
--line: rgba(86, 86, 86, 0.16);
--surface: #ffffff;
--surface-muted: #fafaf7;
--surface-strong: #f2f2f2;
--text-primary: #000000;
--text-muted: rgba(11, 18, 32, 0.78);
```

## 7.4 Dark-mode palette

Dark mode must use:

```css
--coal: #d8d8d8;
--aero: #000000;
--cool: #151515;
--carbon: #ffffff;
--mist: #0b0b0b;
--line: rgba(252, 207, 37, 0.11);
--surface: #050505;
--surface-muted: #0b0b0b;
--surface-strong: #151515;
--text-primary: #ffffff;
--text-muted: rgba(255, 255, 255, 0.84);
```

## 7.5 KYMNIS color palette

KYMNIS public surfaces must use:

```css
--kymnis-teal: #007D79;
--kymnis-gold: #D9A520;
--kymnis-ink: #2D2D2D;
--kymnis-white: #FFFFFF;
--kymnis-green: #007D79;
--kymnis-blue-light: #007D79;
--kymnis-blue-dark: #00A9A4;
```

## 7.6 Color usage rules

### Sunshine Yellow `#FCCF25`

Use for:

```txt
primary CTA background
active navigation state
focus outline
small icons
small accent rules
controlled badges
selected-state indicators
important but limited highlights
```

Do not use for:

```txt
large full-width backgrounds
body text
large blocks of copy
large content panels
low-contrast text combinations
decorative clutter
```

### Coal Grey `#565656`

Use for:

```txt
brand-neutral text
secondary interface tone
borders
subtle UI details
```

### Carbon Black `#000000`

Use for:

```txt
dark hero backgrounds
premium contrast sections
text on Sunshine Yellow
dark mode foundation
```

### Aero White `#FFFFFF`

Use for:

```txt
clean page surfaces
negative space
cards
forms
premium editorial layouts
```

### Cool Gray `#F2F2F2`

Use for:

```txt
subtle panels
hover states
section separation
light neutral surfaces
```

### Mist `#FAFAF7`

Use for:

```txt
warm page background
soft content surfaces
light editorial spacing
```

## 7.7 Forbidden color behavior

Do not introduce new brand colors unless all are true:

```txt
1. The color has a defined purpose.
2. The color passes accessibility checks.
3. The color is added to the design token system.
4. The color is documented in this SOP or brand documentation.
5. The color is approved in review.
```

Do not use arbitrary hex values in components when a token exists.

---

# 8. Typography System

## 8.1 Font stack

Use:

```css
font-family: Aptos, Inter, ui-sans-serif, system-ui, sans-serif;
```

## 8.2 Type hierarchy

Use this hierarchy unless a page requires a controlled exception:

```txt
Hero H1 desktop: text-7xl
Hero H1 tablet: text-6xl
Hero H1 mobile: text-5xl
Page H1: text-5xl to text-7xl depending on context
Section H2 desktop: text-4xl to text-5xl
Section H2 mobile: text-3xl to text-4xl
Lead paragraph: text-xl, line-height approximately 1.6
Body paragraph: text-base or text-lg, line-height 1.6 to 1.8
Eyebrow: 0.75rem, font-weight 900, uppercase, letter-spacing 0.18em
Navigation: text-sm, font-weight 900
CTA: font-weight 900
Small metadata: text-xs to text-sm
```

## 8.3 Font weight rules

Use:

```txt
font-black      for hero headlines, CTAs, high-priority navigation
font-bold       for card headings and emphasized text
font-medium     for readable body emphasis
normal          for standard paragraphs
```

Avoid thin weights on public-facing text.

## 8.4 Text case rules

Use title case sparingly.

Hero and section headings may use title case.

Navigation labels should remain concise.

Long paragraphs must use normal sentence case.

Avoid all-caps paragraphs.

---

# 9. Layout System

## 9.1 Canonical container

The canonical container is:

```css
.container-shell {
  width: min(1200px, calc(100% - 2rem));
  margin-inline: auto;
}
```

## 9.2 Desktop reference frame

Use `1440px x 900px` as the primary executive review reference.

At 1440px viewport width:

```txt
Viewport width: 1440px
Container width: 1200px
Left margin: 120px
Right margin: 120px
Container x-start: 120px
Container x-end: 1320px
```

For viewports below `1232px`:

```txt
Container width: viewport width - 32px
Left gutter: 16px
Right gutter: 16px
```

## 9.3 Header coordinates

Canonical header:

```txt
Position: sticky
Top: 0
Z-index: 50
Minimum height: 74px
Width: 100vw
Border: subtle bottom border
Backdrop: blur
Light background: white with opacity
Dark background: black with opacity
```

At 1440px viewport width:

```txt
Header x-start: 0px
Header y-start: 0px
Header width: 1440px
Header min-height: 74px
Header content x-start: 120px
Header content x-end: 1320px
Logo y-center: approximately 37px
Desktop logo height: approximately 56px
Mobile mark max-height: approximately 44px
```

## 9.4 Section spacing

Default desktop section padding:

```css
.section-padding {
  padding-block: 6rem;
}
```

Equivalent:

```txt
96px top
96px bottom
```

Mobile section padding:

```txt
84px top
84px bottom
```

No major section may use less than `64px` vertical spacing unless it is a compact banner or navigation-adjacent strip.

## 9.5 Hero layout

Homepage hero standard:

```txt
Position: relative
Isolation: isolate
Minimum height desktop: calc(88svh - 78px)
Minimum height medium: calc(86svh - 78px)
Background: #000000
Text: #FFFFFF
Vertical padding: 112px top and bottom
Image: fill, object-cover, object-center
Overlay: dark left-to-right gradient
Content shell: 1200px max
Desktop grid: 1fr / 0.72fr
```

Hero overlay:

```css
linear-gradient(
  90deg,
  rgba(0,0,0,0.92) 0%,
  rgba(0,0,0,0.74) 36%,
  rgba(0,0,0,0.28) 72%,
  rgba(0,0,0,0.12) 100%
)
```

At 1440px x 900px:

```txt
Header y-range: 0px to 74px
Hero y-start: approximately 74px
Hero minimum height: approximately 714px
Hero minimum y-end: approximately 788px
Hero container x-start: 120px
Hero container x-end: 1320px
Hero left column: approximately 120px to 818px
Hero right column: approximately 860px to 1320px
```

## 9.6 Card layout

Approved card patterns:

```txt
surface-card
surface-panel
glass-panel
surface-lift
card-hover
```

Card rules:

```txt
Use consistent border radius.
Use subtle shadows.
Use strong spacing.
Use readable contrast.
Use one hierarchy per card.
Do not overload cards with excessive icons.
Do not use more than one primary CTA per card.
Do not use dense paragraphs inside small cards.
```

## 9.7 Form layout

Forms must:

```txt
Use clear labels.
Use visible required states.
Use readable helper text.
Use non-confidential submission instructions.
Use legal caution language where needed.
Use accessible input contrast.
Use generous spacing.
Use server-side validation.
Use clear success/failure states.
```

---

# 10. Logo and Asset Standards

## 10.1 Logo rendering

Use PNG logo and mark assets for rendered brand presentation.

Do not use inline SVG for the EterSolis logo or mark.

Do not recreate the logo using typed text where a production PNG asset is available.

Do not place the logo on a background box.

Do not stretch, squeeze, distort, crop, recolor, rotate, or add effects to the logo.

## 10.2 Approved current production asset references

Use production-ready assets under:

```txt
public/media/
public/media/helios/
```

Current approved public asset patterns include:

```txt
public/media/etersolis-mark.png
public/media/helios/helios-icon.png
public/media/helios/helios-primary-lockup.png
public/media/helios/helios-wordmark-tagline.png
public/media/helios/helios-earth-splash.png
public/media/kymnis-logo-mark-only.png
```

## 10.3 Logo component rule

EterSolis logo rendering must go through:

```txt
src/components/brand/EterSolisLogo.tsx
```

Page files must not implement separate EterSolis logo rendering.

## 10.4 Asset quality rules

All website images must be:

```txt
clear
properly cropped
not pixelated
not visibly AI-distorted
not stretched
not watermarked unless properly licensed and intentional
not containing guide labels
not containing export-board labels
not carrying color-palette annotations
not carrying "icon only" / "wordmark" labels
```

## 10.5 Asset credit rules

Every non-original third-party media asset must have an appropriate registry entry and attribution path where required.

Run:

```bash
npm run asset:audit
```

before merge.

---

# 11. Navigation and Route Standards

## 11.1 Primary navigation order

Canonical navigation order:

```txt
Solutions
Industries
KYMNIS
Insights
About
Contact
```

## 11.2 Header action order

Canonical header actions:

```txt
Helios
Get Started
```

`Get Started` is the primary commercial CTA.

## 11.3 Current public route map

The controlled route map is:

```txt
/                               Homepage
/sell-waste                     Waste opportunity intake
/solutions                      Resource, waste, carbon and circular economy solutions
/industries                     Industry-specific support
/about                          Company positioning and leadership
/kymnis                         KYMNIS environmental impact registration platform foundation
/kymnis/how-it-works            KYMNIS registration and improvement pathway
/kymnis/verification            KYMNIS verification-readiness pathway
/kymnis/resource-recovery       KYMNIS recovery pathway
/kymnis/contact                 KYMNIS platform interest intake
/contact                        Contact routes and inquiry form
/insights                       Published insight archive
/insights/introducing-etersolis EterSolis Newsletter Issue 001
/helios                         Guided routing assistant
/media-credits                  Website media attribution
/privacy                        Privacy notice
/terms                          Website terms and non-binding submission notices
/api/health                     Health check
/api/readiness                  Operational readiness check
/api/leads                      Contact lead endpoint
/api/waste                      Waste opportunity endpoint
```

## 11.4 New route approval protocol

A new public route may be created only after defining:

```txt
1. Route path.
2. Route owner.
3. Public audience.
4. Business purpose.
5. Primary CTA.
6. Secondary CTA.
7. SEO title.
8. SEO description.
9. OpenGraph behavior.
10. Legal risk.
11. Form/API impact.
12. Navigation impact.
13. Footer impact.
14. Preview requirement.
15. Test requirement.
16. Changelog entry.
17. Version bump.
```

After adding the route, run:

```bash
npm run routes:check
npm run link:audit
npm run check
```

## 11.5 Route deletion protocol

Before removing a route:

```txt
1. Confirm the route is obsolete.
2. Confirm no navigation points to it.
3. Confirm no form action depends on it.
4. Confirm no preview depends on it.
5. Confirm no insight or newsletter links to it.
6. Add a redirect if public traffic may exist.
7. Update README route map.
8. Update tests.
9. Update previews.
10. Update changelog.
```

---

# 12. Page Standards

## 12.1 Required page elements

Every public page must have:

```txt
1. Clear page purpose above the fold.
2. One primary CTA.
3. One secondary path.
4. Strong H1.
5. Metadata title and description where applicable.
6. Accessible heading hierarchy.
7. Light/dark readability.
8. No horizontal overflow.
9. Mobile-safe layout.
10. Footer continuity.
11. No unsupported claims.
12. No confidential/internal disclosures.
13. No dead links.
14. No broken images.
15. No console-breaking client errors.
```

## 12.2 Homepage standard

Homepage section order:

```txt
Hero
ServiceIntakeBanner
WastewaterTreatmentFeature
ReviewPrinciples
ProblemOrbit
SolutionGrid
HeliosPrompt
IndustryMosaic
HeliosPanel
```

Do not reorder homepage sections unless the information architecture is formally reviewed.

## 12.3 CTA rules

Primary CTA:

```txt
Background: #FCCF25
Text: #000000
Shape: rounded-full
Font weight: 900
Purpose: direct commercial conversion
```

Secondary CTA:

```txt
Background: transparent or subtle surface
Border: visible
Text: high contrast
Purpose: lower-friction engagement
```

Tertiary CTA:

```txt
Text-link style
Underline on hover
No button styling unless intentionally elevated
```

No page section may present more than one primary CTA unless it is a form submission area.

## 12.4 Copy density

Use:

```txt
Short headings.
Clear lead paragraphs.
Scannable cards.
Executive-level specificity.
No unnecessary explanations of obvious industry basics.
```

Avoid:

```txt
dense walls of text
empty slogans
excessive repetition
basic textbook explanations for expert audiences
unsupported numerical claims
```

---

# 13. Accessibility Standard

## 13.1 Mandatory accessibility requirements

Every public page must:

```txt
Use semantic HTML.
Use one logical H1.
Use ordered heading levels.
Use descriptive link text.
Use visible focus states.
Use accessible color contrast.
Use alt text for meaningful images.
Use empty alt text only for decorative images.
Support keyboard navigation.
Support reduced motion.
Avoid horizontal overflow.
Use labels for form fields.
Expose error messages clearly.
Avoid hover-only interactions.
```

## 13.2 Focus state

The global focus standard is:

```css
:focus-visible {
  outline: 3px solid var(--sunshine);
  outline-offset: 3px;
}
```

Do not suppress focus outlines unless replacing them with an equally visible accessible focus treatment.

## 13.3 Skip link

The layout must preserve:

```txt
Skip to main content
```

linked to:

```txt
#main-content
```

The main element must preserve:

```txt
id="main-content"
tabIndex={-1}
```

## 13.4 Reduced motion

The website must preserve reduced-motion support:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 13.5 Contrast rules

Mandatory:

```txt
Text on #FCCF25 must be #000000 or #0b1220.
Hero text over images must be #FFFFFF over a sufficiently dark overlay.
Muted text must remain readable.
Dark mode body text must be visually distinct from background.
Form placeholders must remain readable.
Disabled states must still communicate state clearly.
```

---

# 14. Forms and Lead Capture

## 14.1 General form rules

All public forms must:

```txt
1. Validate server-side with Zod.
2. Validate client-side where useful, but never rely only on client-side validation.
3. Use bot protection before production lead collection.
4. Use rate limiting.
5. Avoid sensitive payload logging.
6. Request non-confidential summaries only.
7. Include clear non-binding language.
8. Preserve no-unsolicited-samples warnings where waste is involved.
9. Route submissions to controlled inboxes.
10. Persist required operational records if production lead capture is enabled.
11. Return clear success and error responses.
```

## 14.2 Public form legal language

Waste-related forms must communicate:

```txt
Submission is non-binding.
Submission does not create acceptance.
Submission does not authorize transport.
Submission does not authorize delivery.
Submission does not authorize disposal.
Submission does not create a quote.
Submission does not create a contract.
No unsolicited samples should be sent.
EterSolis must review the material before any next step.
```

## 14.3 Contact routing emails

Canonical route emails:

```txt
waste@etersolis.com
info@etersolis.com
partnerships@etersolis.com
kymnis@etersolis.com
privacy@etersolis.com
smith@etersolis.com
cso@etersolis.com
careers@etersolis.com
```

## 14.4 Rate limiting

Public POST routes must preserve rate limiting.

Default expected environment values:

```txt
RATE_LIMIT_MAX=20
RATE_LIMIT_WINDOW_MS=60000
```

Changes to rate limits require:

```txt
1. Security review.
2. Abuse-risk review.
3. Documentation update.
4. Changelog entry.
5. Production verification.
```

## 14.5 IP handling

Do not store raw client IP addresses in lead payloads.

Use a secret-backed HMAC hash or approved privacy-preserving method for audit correlation.

If `IP_HASH_SECRET` is exposed, rotate it immediately.

---

# 15. Environment Variables

## 15.1 Required production variables

Production lead capture requires:

```txt
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
DATABASE_URL
DATABASE_POOL_MAX
IP_HASH_SECRET
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
MAIL_FROM
RATE_LIMIT_MAX
RATE_LIMIT_WINDOW_MS
WASTE_ROUTE_EMAIL
INFO_ROUTE_EMAIL
PARTNERSHIPS_ROUTE_EMAIL
KYMNIS_ROUTE_EMAIL
PRIVACY_ROUTE_EMAIL
CEO_ROUTE_EMAIL
CSO_ROUTE_EMAIL
```

## 15.2 Optional variables

Optional integrations:

```txt
NEXT_PUBLIC_GA4_MEASUREMENT_ID
CRM_WEBHOOK_URL
CRM_WEBHOOK_SECRET
ANALYTICS_WEBHOOK_URL
ANALYTICS_WEBHOOK_SECRET
READINESS_EXPOSE_DETAILS
```

## 15.3 Environment storage rule

Production values must be stored in:

```txt
cPanel / CloudLinux Node.js application configuration
or server-managed environment file outside the repository
```

Never commit:

```txt
.env
.env.local
.env.production
.env.* containing live values
database credentials
SMTP credentials
Turnstile secret key
CRM secret
analytics secret
IP_HASH_SECRET
```

## 15.4 Runtime check

Before production deployment, validate configuration:

```bash
npm run runtime:check -- --env-file=/etc/etersolis-web.env
```

On Afrihost, if runtime values are managed through cPanel/CloudLinux rather than an external env file, use the equivalent production-safe validation route or controlled runtime check available in the environment.

---

# 16. KYMNIS Public Boundary

## 16.1 KYMNIS positioning

KYMNIS public content must remain:

```txt
high-level
public-facing
non-confidential
non-certifying unless formally approved
commercially careful
technically credible
```

## 16.2 KYMNIS prohibited disclosure

Do not expose:

```txt
internal architecture
pricing logic
confidential counterparties
internal scoring methodology
restricted process conditions
unapproved verification logic
hidden operational workflows
non-public datasets
internal product roadmap
commercial negotiation logic
```

## 16.3 KYMNIS audit

Before merge:

```bash
npm run disclosure:audit
```

must pass.

If the audit fails, the PR may not merge until the disclosure risk is resolved or formally waived by authorized leadership.

---

# 17. Helios Standard

## 17.1 Helios role

Helios is a guided routing assistant and public navigation support layer.

It must help users find the correct EterSolis or KYMNIS pathway without making promises, giving regulated advice, or implying acceptance of a submitted opportunity.

## 17.2 Helios language rules

Helios may:

```txt
route users to relevant pages
suggest inquiry categories
explain public website pathways
guide users toward contact or sell-waste forms
clarify non-binding review steps
```

Helios may not:

```txt
approve waste
quote pricing
accept samples
issue certifications
give legal advice
give regulatory advice
guarantee recovery
guarantee carbon outcomes
guarantee commercial acceptance
```

## 17.3 Helios visual rules

Helios assets must be production-cropped assets.

Do not commit raw logo boards, guide labels, or variant sheets.

The Helios page must not render the floating launcher if the page itself is the Helios experience.

---

# 18. Insights and Newsletter System

## 18.1 Content source

Structured insight and newsletter content must live under:

```txt
content/insights/
```

## 18.2 Validation

Run:

```bash
npm run insights:validate
```

for any insight or newsletter change.

## 18.3 Newsletter export

Use:

```bash
npm run newsletter:export -- --slug <slug>
```

Example:

```bash
npm run newsletter:export -- --slug introducing-etersolis
```

## 18.4 Editorial standard

Insights must be:

```txt
technically credible
commercially useful
free of unsupported claims
clear about uncertainty
source-aware where public claims are made
written for professionals
free of generic filler
```

Do not publish technical claims that cannot be defended.

---

# 19. SEO, Metadata, and Structured Data

## 19.1 Metadata requirements

Every public page should define or inherit appropriate:

```txt
title
description
canonical path
OpenGraph title
OpenGraph description
OpenGraph image where relevant
Twitter card where relevant
```

## 19.2 Organization structured data

The site-level structured data must remain accurate:

```txt
Organization name: EterSolis
URL: https://etersolis.com
Logo: official production logo/mark path
Description: waste and carbon management company focused on resource recovery, circular economy solutions and industrial sustainability
```

## 19.3 SEO copy rules

SEO text must not degrade brand quality.

Avoid:

```txt
keyword stuffing
spammy repeated phrases
unsupported impact claims
generic "best company" claims
unqualified environmental claims
```

Use concise, specific, high-intent language.

---

# 20. Quality Gates

## 20.1 Core commands

The following are the controlled quality commands:

```bash
npm run typecheck
npm run lint
npm run insights:validate
npm run docs:check
npm run release:audit
npm run disclosure:audit
npm run routes:check
npm run theme:audit
npm run asset:audit
npm run link:audit
npm run build
npm run check
```

## 20.2 Full launch check

Use locally or in GitHub Actions:

```bash
npm run launch:check
```

Do not run `npm run launch:check` on Afrihost unless Playwright/Chromium dependencies are installed.

## 20.3 Change-specific gate matrix

### Documentation-only change

```bash
npm run docs:check
npm run link:audit
```

### Copy/content change

```bash
npm run insights:validate
npm run docs:check
npm run link:audit
npm run check
```

### Visual/page layout change

```bash
npm run check
npm run test:layout
npm run test:visual
npm run preview:capture
```

### Navigation or route change

```bash
npm run routes:check
npm run link:audit
npm run check
npm run test:smoke
```

### Form or API change

```bash
npm run check
npm run test:smoke
npm run runtime:check -- --env-file=/etc/etersolis-web.env
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
```

### Deployment change

```bash
npm run launch:check
npm run deploy:dry-run
npm run runtime:check -- --env-file=/etc/etersolis-web.env
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
```

### Asset change

```bash
npm run asset:audit
npm run theme:audit
npm run check
npm run preview:capture
```

### Legal/privacy change

```bash
npm run check
npm run link:audit
npm run preview:capture
```

Manual legal review is also required.

---

# 21. Playwright and Visual QA

## 21.1 Supported automated browsers

The Playwright test projects include:

```txt
Desktop Chrome
Mobile Chrome / Pixel 5
```

## 21.2 Required manual viewport checks

For executive visual review, inspect:

```txt
1440 x 900
1920 x 1080
768 x 1024
390 x 844
360 x 780
```

## 21.3 Visual regression tolerance

Visual baselines should use:

```txt
fullPage: true
maxDiffPixelRatio: 0.02
timeout: 15000
font/image settle wait: approximately 1400ms
```

## 21.4 Visual QA checklist

Confirm:

```txt
No horizontal overflow.
Header is sticky and visually stable.
Logo is not squeezed.
Logo is not boxed.
Hero text is readable.
CTA hierarchy is obvious.
Mobile menu is visible and tappable.
Light mode is readable.
Dark mode is readable.
Cards are aligned.
Images are clear.
Footer is visually complete.
Forms are usable.
No page appears as plain text.
No page appears blank.
No section has accidental excessive whitespace.
No obsolete homepage text is served.
```

---

# 22. Preview System

## 22.1 Preview types

There are two approved preview systems:

```txt
Curated executive previews:
  previews/*.html
  previews/styles.css

Generated live previews:
  previews/generated/
```

Generated previews are preferred for final rendered review because they reflect the actual Next.js application.

## 22.2 Required preview coverage

The review set must cover:

```txt
Home
Get Started
Solutions
Industries
About
Contact
Insights
Newsletter Issue 001
Helios
KYMNIS Overview
KYMNIS How It Works
KYMNIS Verification
KYMNIS Resource Recovery
KYMNIS Contact
Media Credits
Privacy
Terms
```

## 22.3 Preview update triggers

Update previews in the same PR when changing:

```txt
page content
visible copy
hero layout
CTA order
card layout
form layout
visual hierarchy
light/dark behavior
navigation
footer
logo usage
media
legal notices
form fields
warnings
submission notices
```

## 22.4 Preview generation

Run:

```bash
npm run preview:capture
```

To serve previews:

```bash
npm run preview:serve
```

## 22.5 Approval states

Use only these review states:

```txt
Approved for production release
Approved subject to copy changes
Approved subject to visual changes
Hold: legal/privacy review required
Hold: technical QA required
```

---

# 23. Versioning and Change Control

## 23.1 Source of truth

The version source of truth is:

```txt
package.json
```

The root version in `package-lock.json` must match.

`docs/CHANGELOG.md` must contain the corresponding version entry.

## 23.2 Version types

Use:

```txt
Patch: normal site, copy, documentation, bug fix, audit, small visual change
Minor: substantial new public feature, new route family, major content system
Major: incompatible operational, deployment, database, or API change
```

## 23.3 Required per PR

Every PR must:

```bash
npm run version:bump -- --patch
npm run docs:generate
npm run check
```

unless a minor or major version bump is explicitly justified.

## 23.4 Changelog entry format

Use:

```txt
## x.y.z - YYYY-MM-DDTHH:MM:SSZ
```

Changelog must include:

```txt
Summary
Changed files or systems
Validation commands run
Preview status if visual
Deployment impact
Known limitations if any
```

---

# 24. Standard GitHub / Local Update Procedure

## 24.1 Branch creation

Work on a branch, not directly on the live server:

```bash
git checkout main
git pull origin main
git checkout -b update/<short-description>
```

Branch naming examples:

```txt
update/homepage-hero-copy
update/kymnis-contact-flow
update/lead-capture-validation
update/footer-routing
update/visual-preview-refresh
fix/mobile-header-overflow
fix/readiness-env-validation
docs/website-codebase-sop
```

## 24.2 Local validation

After changes:

```bash
npm ci
npm run check
npm run launch:check
```

`launch:check` should be run locally or in GitHub Actions, not on Afrihost cPanel, because the Afrihost server cannot launch Playwright Chromium unless the required Linux GUI libraries are installed.

A Playwright/Chromium failure on Afrihost is not automatically a website runtime failure.

## 24.3 Commit and push

After checks pass:

```bash
git add .
git commit -m "Update EterSolis website"
git push origin update/<short-description>
```

## 24.4 Pull request

Open a PR into `main`.

The PR must include:

```txt
Purpose:
Scope:
Routes affected:
Components affected:
Forms/API affected:
Visual impact:
Security impact:
Legal/privacy impact:
Commands run:
Preview status:
Deployment notes:
Rollback notes:
```

Merge only after review and required checks.

---

# 25. Afrihost Production Deployment Procedure

## 25.1 Deployment principle

Use a controlled:

```txt
Git -> server pull -> install -> build -> restart -> verify
```

workflow.

Do not manually edit production files in cPanel unless it is an emergency hotfix.

## 25.2 SSH deployment start

SSH into Afrihost, then:

```bash
cd ~/etersolis.com

# Use the same Node path cPanel uses
export PATH=/home/etersot4j6a0/nodevenv/etersolis.com/24/bin:$PATH

# Confirm versions
node -v
npm -v

# Record current live commit before changing anything
git rev-parse HEAD

# Pull reviewed production code
git fetch origin
git status
git pull --ff-only origin main
```

## 25.3 Local modification stop rule

If `git status` shows local modifications, stop before pulling.

Run:

```bash
git status
git diff
```

Then determine:

```txt
Are these emergency hotfix changes?
Are these accidental server edits?
Are these generated files?
Are these cache/static artifacts?
Are these untracked files?
Do they need to be preserved?
Do they need to be deleted?
Do they need to be committed back to GitHub?
```

Do not overwrite production blindly.

## 25.4 Install and build on Afrihost

Use:

```bash
npm ci
npm run check
npm run build
```

Do not use `npm install`.

Do not run `npm run launch:check` on Afrihost unless Playwright/Chromium dependencies are installed.

## 25.5 Restart Passenger

Restart Passenger:

```bash
mkdir -p tmp
touch tmp/restart.txt
```

Then restart from:

```txt
cPanel -> Setup Node.js App -> Restart
```

## 25.6 Afrihost Node app configuration

Production configuration must remain:

```txt
Application root: /home/etersot4j6a0/etersolis.com
Startup file: server.js
Base URI: /
```

Do not change the startup file without a formal deployment architecture change.

## 25.7 Immediate liveness verification

Run:

```bash
curl -s https://etersolis.com/api/health
```

Expected structure:

```json
{"status":"ok","service":"etersolis-web"}
```

## 25.8 Homepage verification

Run:

```bash
curl -sL "https://etersolis.com/?v=$(date +%s)" | head -80
```

Check that obsolete homepage text is gone:

```bash
curl -sL "https://etersolis.com/?v=$(date +%s)" \
  | grep -iE "Worst Waste|Humanity|Best Fuel" \
  || echo "Old homepage text not found"
```

Check for Next.js output:

```bash
curl -sL "https://etersolis.com/?v=$(date +%s)" | grep -i "__next" | head
```

## 25.9 Readiness verification

Run:

```bash
curl -s https://etersolis.com/api/readiness
```

Interpretation:

```txt
/api/health confirms the app process is alive.
/api/readiness confirms full operational dependencies such as lead-capture configuration are valid.
```

## 25.10 Cache clearing after every production release

After every release:

```txt
1. Restart Node app.
2. Purge LiteSpeed/Afrihost cache if available.
3. Purge Cloudflare cache if active.
4. Test with a cache-busted URL.
```

Cache-busted URL format:

```txt
https://etersolis.com/?v=YYYYMMDDHHMM
```

This is mandatory because stale static/cache behavior can mask a successful deployment.

## 25.11 Recommended normal deployment command block

Use this for normal production updates:

```bash
cd ~/etersolis.com

export PATH=/home/etersot4j6a0/nodevenv/etersolis.com/24/bin:$PATH

echo "Current commit:"
git rev-parse HEAD

git fetch origin
git status
git pull --ff-only origin main

npm ci
npm run check
npm run build

mkdir -p tmp
touch tmp/restart.txt

echo "Health:"
curl -s https://etersolis.com/api/health

echo "Homepage check:"
curl -sL "https://etersolis.com/?v=$(date +%s)" \
  | grep -iE "Worst Waste|Humanity|Best Fuel|__next|EterSolis" \
  | head -40
```

Then also restart from:

```txt
cPanel -> Setup Node.js App -> Restart
```

Then run:

```bash
curl -s https://etersolis.com/api/readiness
curl -sL "https://etersolis.com/?v=$(date +%s)" | grep -i "__next" | head
```

---

# 26. Production Prohibitions

Never do the following during normal operation:

```txt
Never edit built files inside .next.
Never manually patch generated bundles.
Never restore public_html/index.html.
Never restore public_html/etersolis.com/index.html.
Never commit .env files.
Never commit SMTP credentials.
Never commit IP_HASH_SECRET.
Never commit database credentials.
Never overwrite production local modifications without git status and git diff.
Never deploy unreviewed code to main.
Never treat a Playwright Chromium failure on Afrihost as a website runtime failure without checking /api/health.
Never change cPanel startup file without documentation.
Never bypass npm ci in production.
Never skip /api/health after restart.
Never skip cache-busted homepage verification.
```

---

# 27. Emergency Hotfix Protocol

## 27.1 Emergency definition

An emergency hotfix is allowed only when:

```txt
The live site is down.
Lead capture is broken.
A legal/privacy risk is live.
A secret is exposed.
A public page contains materially incorrect information.
A deployment has served an old blocked static file.
```

## 27.2 Emergency cPanel edit rule

Manual cPanel edits are allowed only if:

```txt
1. Git deployment is temporarily impossible.
2. The change is the smallest possible intervention.
3. The operator records the exact file and change.
4. The operator records the time and reason.
5. The change is back-ported to GitHub immediately.
6. The normal deployment process is restored as soon as possible.
```

## 27.3 Emergency hotfix log

Record:

```txt
Date/time UTC:
Operator:
Reason:
Production file changed:
Exact change:
GitHub issue/PR:
Health check result:
Readiness result:
Rollback required:
Notes:
```

---

# 28. Credential Rotation Protocol

## 28.1 Trigger conditions

Rotate credentials immediately if:

```txt
SMTP password was pasted in chat.
SMTP password was sent by email.
SMTP password was committed.
IP_HASH_SECRET was pasted in chat.
IP_HASH_SECRET was committed.
Database credentials were exposed.
Turnstile secret was exposed.
CRM webhook secret was exposed.
Analytics secret was exposed.
A former contractor retained access.
A server compromise is suspected.
```

## 28.2 Rotation sequence

Minimum required sequence:

```txt
1. Generate new IP_HASH_SECRET.
2. Rotate SMTP password at the mail provider.
3. Rotate any other exposed secret.
4. Update cPanel/CloudLinux environment variables.
5. Restart the Node app.
6. Run /api/health.
7. Run /api/readiness.
8. Submit one non-sensitive contact-form test.
9. Confirm internal routing email.
10. Confirm submitter confirmation email.
11. Record the rotation in the deployment log.
```

## 28.3 Secret storage rule

Keep secrets in:

```txt
cPanel / CloudLinux runtime environment
or server-managed environment file outside repository
```

Do not store secrets in:

```txt
GitHub
README
docs
screenshots
tickets
chat transcripts
source code
public files
previews
logs
```

---

# 29. Database Operations

## 29.1 Production database

Production database must use:

```txt
PostgreSQL
least-privilege application user
restricted network access
daily backup
schema controlled by repository
```

## 29.2 Required tables

Lead-capture operation expects:

```txt
lead_submissions
waste_opportunities
audit_events
```

## 29.3 Schema application

Apply schema only through controlled deployment:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

Do not manually create production tables without recording the change.

## 29.4 Database backup rule

Before database schema changes:

```txt
1. Take backup.
2. Confirm backup file exists.
3. Confirm rollback path.
4. Apply schema change.
5. Verify app readiness.
6. Submit non-sensitive test.
7. Confirm records persist correctly.
```

---

# 30. Security Standard

## 30.1 Server security

Production server must use:

```txt
SSH key authentication
no password SSH login where controllable
least-privilege application user
HTTPS
restricted database access
MFA on GitHub
MFA on DNS
MFA on cPanel/hosting
MFA on mail administration
MFA on database administration where supported
```

## 30.2 Logging

Logs must not contain:

```txt
SMTP password
database URL
IP_HASH_SECRET
raw IP address in lead payload
full sensitive form payloads
private keys
session secrets
Turnstile secrets
CRM secrets
analytics secrets
```

## 30.3 Public readiness details

Do not expose detailed readiness diagnostics publicly in production unless a controlled launch window explicitly requires it.

If detailed readiness is enabled temporarily, disable it immediately after verification.

---

# 31. Legal and Privacy Standard

## 31.1 Privacy pages

The privacy notice must remain accurate to:

```txt
form collection
lead routing
database persistence
email notifications
analytics if enabled
CRM forwarding if enabled
data subject contact route
privacy@etersolis.com
```

## 31.2 Terms pages

Terms must preserve:

```txt
non-binding submissions
no acceptance by form
no unsolicited samples
no contract by website use
no professional advice unless explicitly stated
controlled review process
```

## 31.3 Legal review triggers

Legal/privacy review is required for:

```txt
privacy notice changes
terms changes
form disclaimer changes
lead data handling changes
analytics changes
CRM integration changes
KYMNIS verification language
certification language
pricing language
claims about regulatory compliance
claims about guaranteed environmental outcomes
```

---

# 32. Performance Standard

## 32.1 Performance principles

The website must remain:

```txt
fast to load
stable under normal public traffic
image-optimized
not dependency-heavy
not animation-heavy
not blocked by unnecessary client JavaScript
```

## 32.2 Image performance

Images must:

```txt
Use Next.js Image where appropriate.
Use correct sizes.
Avoid oversized raw assets.
Avoid uncompressed large files.
Use priority only for critical above-fold assets.
Use lazy behavior for non-critical images where appropriate.
```

## 32.3 Dependency discipline

Before adding a dependency:

```txt
1. Check whether current stack can solve the problem.
2. Check package maintenance status.
3. Check bundle impact.
4. Check security risk.
5. Check license.
6. Document reason in PR.
7. Run npm run check.
8. Run npm run build.
```

Do not add a dependency for minor formatting, trivial utilities, or one-off visual effects.

---

# 33. Code Quality Standard

## 33.1 TypeScript rules

Use TypeScript strictly and clearly.

Do:

```txt
Define explicit types for data structures.
Use Zod for runtime validation.
Prefer const where possible.
Keep functions focused.
Avoid implicit any.
Avoid broad unknown-to-any casting.
```

Do not:

```txt
Suppress TypeScript errors casually.
Use any unless justified.
Ignore failed typecheck.
Place business logic in JSX markup.
Duplicate validation schemas.
```

## 33.2 React component rules

Components should be:

```txt
small
named
typed
single-purpose
composable
readable
consistent with existing patterns
```

Avoid:

```txt
massive page components
deeply nested JSX with repeated classes
inline business rules in UI
duplicated card systems
duplicated form controls
```

## 33.3 Styling rules

Prefer:

```txt
existing Tailwind tokens
global utility classes already defined
component-level class composition
responsive utility classes
semantic layout structure
```

Avoid:

```txt
arbitrary hex colors
hard-coded pixel hacks
negative margins unless deliberate
duplicated custom shadows
random gradients
new visual systems without documentation
```

## 33.4 API route rules

Public API routes must:

```txt
validate input
rate-limit requests
avoid leaking internals
return consistent errors
avoid logging sensitive data
handle expected failure states
use environment variables safely
```

---

# 34. Release Review Checklist

Before merging any PR, confirm:

```txt
[ ] Change is on a branch.
[ ] PR targets main.
[ ] Version was bumped.
[ ] package.json and package-lock.json versions match.
[ ] docs/CHANGELOG.md was updated.
[ ] README was updated if needed.
[ ] Relevant docs were updated.
[ ] npm run check passed.
[ ] npm run launch:check passed locally or in GitHub Actions where applicable.
[ ] npm run disclosure:audit passed.
[ ] npm run routes:check passed.
[ ] npm run theme:audit passed.
[ ] npm run asset:audit passed.
[ ] npm run link:audit passed.
[ ] Visual previews were updated where applicable.
[ ] Light mode was reviewed.
[ ] Dark mode was reviewed.
[ ] Mobile was reviewed.
[ ] Header remained stable.
[ ] Footer remained stable.
[ ] Forms remained legally safe.
[ ] No secrets were committed.
[ ] No confidential KYMNIS details were exposed.
[ ] No unsupported claims were introduced.
```

---

# 35. Production Deployment Checklist

For every production deployment, record:

```txt
[ ] PR merged to main.
[ ] SSH session opened.
[ ] cd ~/etersolis.com completed.
[ ] Node path exported.
[ ] node -v recorded.
[ ] npm -v recorded.
[ ] Current commit recorded.
[ ] git fetch origin completed.
[ ] git status inspected.
[ ] No unexplained local modifications.
[ ] git pull --ff-only origin main completed.
[ ] npm ci completed.
[ ] npm run check completed.
[ ] npm run build completed.
[ ] Passenger restart triggered with tmp/restart.txt.
[ ] cPanel Node app restarted.
[ ] /api/health passed.
[ ] Homepage cache-busted check completed.
[ ] Old homepage text absent.
[ ] __next output present.
[ ] /api/readiness checked.
[ ] LiteSpeed/Afrihost cache purged where available.
[ ] Cloudflare cache purged where active.
[ ] Final cache-busted public URL checked.
[ ] Deployment log updated.
```

---

# 36. Rollback Protocol

## 36.1 Rollback triggers

Rollback immediately if:

```txt
/api/health fails
/api/readiness fails after expected configuration is loaded
homepage serves broken output
Next.js app is bypassed by static public_html files
form submissions fail
database persistence fails
internal email fails
submitter confirmation email fails
production logs show repeated unhandled errors
critical page is blank
legal/privacy error is live
```

## 36.2 Rollback command sequence

```bash
cd ~/etersolis.com
export PATH=/home/etersot4j6a0/nodevenv/etersolis.com/24/bin:$PATH

echo "Current broken commit:"
git rev-parse HEAD

git fetch origin
git checkout <last-known-good-commit>

npm ci
npm run build

mkdir -p tmp
touch tmp/restart.txt
```

Then restart from:

```txt
cPanel -> Setup Node.js App -> Restart
```

Verify:

```bash
curl -s https://etersolis.com/api/health
curl -s https://etersolis.com/api/readiness
curl -sL "https://etersolis.com/?v=$(date +%s)" | grep -i "__next" | head
```

## 36.3 Rollback record

Record:

```txt
Date/time UTC:
Operator:
Broken commit:
Restored commit:
Reason:
Health result:
Readiness result:
Homepage result:
Follow-up issue/PR:
Notes:
```

---

# 37. Launch Record Template

Use this exact template for production releases:

```txt
Date/time UTC:
Operator:
Release branch:
Pull request:
Released commit:
Repository version:
Node version:
npm version:
Afrihost Node path:
Database schema applied: yes/no/not applicable
Runtime check passed: yes/no/not applicable
Lead-capture check passed: yes/no/not applicable
npm ci passed: yes/no
npm run check passed: yes/no
npm run build passed: yes/no
Passenger restart completed: yes/no
cPanel Node restart completed: yes/no
LiteSpeed/Afrihost cache purged: yes/no/not available
Cloudflare cache purged: yes/no/not active
Health endpoint passed: yes/no
Readiness endpoint passed: yes/no
Homepage cache-busted check passed: yes/no
Old homepage text absent: yes/no
__next output present: yes/no
Contact form test passed: yes/no/not tested
Get Started form test passed: yes/no/not tested
Internal email confirmed: yes/no/not tested
Submitter email confirmed: yes/no/not tested
Rollback required: yes/no
Notes:
```

---

# 38. Definition of Done

A website change is done only when all relevant items are true:

```txt
The change is in Git.
The change is on a branch.
The change was reviewed.
The change was merged to main.
The version was bumped.
The changelog was updated.
The documentation was updated.
The code typechecks.
The code lints.
The route audit passes.
The theme audit passes.
The disclosure audit passes.
The asset audit passes.
The link audit passes.
The build succeeds.
The previews are updated where required.
The production server pulled main cleanly.
npm ci completed in production.
npm run check completed in production.
npm run build completed in production.
Passenger was restarted.
cPanel Node app was restarted.
Health endpoint passed.
Readiness endpoint was checked.
Caches were purged.
Cache-busted homepage verification passed.
No obsolete static page blocked the app.
No secrets were exposed.
No unsupported claims were introduced.
```

---

# 39. Absolute Operating Standard

The EterSolis website must never be treated as a static brochure.

It is a controlled production application with:

```txt
brand governance
technical governance
quality gates
deployment discipline
lead-capture controls
privacy obligations
security obligations
version control
rollback requirements
executive visual standards
```

No production update is acceptable unless it can be reproduced from Git, rebuilt cleanly, restarted safely, and verified publicly.

The standard is:

```txt
GitHub merge
-> SSH pull
-> npm ci
-> npm run check
-> npm run build
-> Passenger restart
-> cPanel restart
-> health/readiness verification
-> cache purge
-> cache-busted public verification
```

That is the EterSolis website and codebase operating procedure.
