# EterSolis Website Upgrade

**Repository:** `ralstonleesmith/EterSolis`  
**Website:** https://etersolis.com  
**Program:** EterSolis Immediate Website Upgrade  
**Execution specification:** ES-WEB-EXEC-001 v1.0  
**Status:** Active upgrade — official branding, light/dark mode, polished page UX, self-hosting foundation, and lead-capture implementation in progress  
**Current PR:** #2 — Apply official EterSolis branding and transparent logo system  
**Classification:** Proprietary and confidential EterSolis source code and implementation documentation

EterSolis is a privately owned waste and carbon management company focused on practical resource recovery, circular economy, carbon management, waste valorization, and industrial sustainability solutions.

This repository is the controlled implementation base for upgrading `etersolis.com` into a polished, professional, conversion-focused public website and lead-generation system while preserving a scalable technical foundation for future EterSolis digital systems.

## Current Upgrade Snapshot

The current controlled upgrade branch includes:

- Official EterSolis transparent SVG logo system.
- Full-logo and mark-only variants.
- Light-logo usage for dark backgrounds and dark-logo usage for light backgrounds.
- Branded light/dark mode with accessible theme toggle.
- Modern homepage resource-flow visual.
- Polished Sell Waste, Industries, About, Contact and Insights pages.
- Polished light/dark form styling for waste and contact intake.
- PostgreSQL, SMTP, CRM webhook, Turnstile, rate limiting and self-hosted deployment foundation.

For running history, see [`docs/CHANGELOG.md`](./docs/CHANGELOG.md).

---

## 1. Strategic Objective

The immediate objective is to convert `etersolis.com` from a passive landing presence into a professional commercial website that:

1. Makes the `Sell Waste To EterSolis` action visible immediately.
2. Captures structured waste opportunities and assessment requests.
3. Routes inquiries to the correct EterSolis mailbox or reviewer.
4. Presents EterSolis as a credible, privately owned operating company.
5. Protects proprietary methods, confidential systems, and controlled internal details.
6. Establishes a scalable Next.js foundation for future app, CRM, analytics, and assistant capabilities.

The first release must be a polished conversion engine, not a premature full marketplace, portal, pricing engine, autonomous agent, or public performance-claims platform.

---

## 2. Public Positioning Rules

All public website copy must follow these rules:

- Use **EterSolis** as one word everywhere.
- Describe EterSolis as a privately owned waste and carbon management company.
- Emphasize practical problem-solving, responsible recovery, circular economy, carbon management, and industrial sustainability.
- Avoid presenting EterSolis as a public authority, standards body, nonprofit, regulator, advocacy organization, or generic consultancy.
- Do not publish unverified impact counters, exaggerated claims, or unsupported performance guarantees.
- Do not disclose protected system architecture, proprietary process details, formulas, pricing commitments, internal software logic, hidden operational logic, confidential counterparties, or customer information.
- Use disciplined public language: precise, commercially useful, and minimally revealing.

Approved homepage hero copy:

> **Waste Is Value Waiting To Be Recovered.**
>
> EterSolis is a privately owned waste and carbon management company helping organizations recover value from waste streams, manage carbon exposure and build practical circular economy solutions.

Primary calls to action:

- Sell Waste To EterSolis
- Request Assessment
- Talk to Helios

---

## 3. Required Launch Scope

### Must launch immediately

- Homepage
- Sell Waste page
- Solutions page
- Industries page
- About page
- Contact page
- Insights index shell
- Privacy page
- Terms page
- Helios v0 guided assistant or CTA routing panel
- Waste opportunity form
- Consultation or assessment form
- General contact form
- CRM/database/email notification foundation
- Analytics event foundation
- SEO metadata, sitemap, robots, and canonical URLs
- Basic security controls for forms and uploads

### May launch in 30-60 days

- Full CMS
- Expanded article library
- Advanced Helios public AI assistant
- Lead dashboard
- Waste or carbon calculators
- Gated resource downloads
- Structured assistant workflows

### Do not build yet

- Public material exchange marketplace
- Pricing engine
- Public quote generation
- Public carbon-credit commitments
- Autonomous technical advice
- Customer portal
- Complex dashboards
- Confidential document analysis through public assistant

---

## 4. Recommended Technical Stack

The execution specification directs the website toward the following stack:

- **Framework:** Next.js, current stable App Router, TypeScript
- **Styling:** Tailwind CSS with EterSolis design tokens
- **Validation:** Zod server-side validation
- **Forms:** React Hook Form or controlled forms with server validation
- **Database:** Supabase Postgres or managed Postgres
- **Email:** Resend or approved transactional email provider
- **CRM:** HubSpot or Zoho; database and email fallback if CRM setup is delayed
- **Hosting:** Vercel for speed or Google Cloud Run if standardizing on Google Cloud
- **Bot protection:** Cloudflare Turnstile or reCAPTCHA
- **Analytics:** GA4 with consent-aware configuration; Microsoft Clarity after privacy review
- **Repository:** Private GitHub repository with protected main branch and preview deployments

Baseline install path for a fresh implementation:

```bash
pnpm create next-app etersolis-web --ts --app --eslint --src-dir
cd etersolis-web
pnpm add zod react-hook-form @hookform/resolvers
pnpm add @supabase/supabase-js
pnpm add resend
pnpm add lucide-react
pnpm add framer-motion
pnpm add -D prettier eslint-config-prettier @types/node
```

---

## 5. Target Route Tree

```txt
src/app/
  page.tsx
  sell-waste/page.tsx
  solutions/page.tsx
  industries/page.tsx
  about/page.tsx
  contact/page.tsx
  insights/page.tsx
  helios/page.tsx
  privacy/page.tsx
  terms/page.tsx
  api/leads/route.ts
  api/waste/route.ts
  api/health/route.ts

src/components/
  brand/EterSolisLogo.tsx
  layout/Header.tsx
  layout/Footer.tsx
  layout/ThemeToggle.tsx
  ui/PageHero.tsx
  ui/SectionHeader.tsx
  sections/Hero.tsx
  sections/ResourceFlowVisual.tsx
  sections/WastePurchaseBanner.tsx
  sections/SolutionGrid.tsx
  sections/ProblemOrbit.tsx
  sections/IndustryMosaic.tsx
  forms/WasteOpportunityForm.tsx
  forms/ContactForm.tsx
  helios/HeliosPanel.tsx

src/lib/
  env.ts
  validators.ts
  crm.ts
  email.ts
  emailTemplates.ts
  db.ts
  analytics.ts
  security.ts
  brandAssets.ts
```

---

## 6. Design System Requirements

### Visual direction

- Use official EterSolis logo and mark only.
- All logo usage must be transparent with no background box.
- Use the dark logo version on light backgrounds.
- Use the light logo version on dark backgrounds.
- Support polished light and dark mode.
- White backgrounds remain the default for high-trust content areas.
- Charcoal text and restrained Sunshine Yellow/gold accents remain primary.
- Cool grey section separation may be used where it improves hierarchy.
- Professional tables, cards, forms, glass panels, motion accents and brand-led section structure are acceptable.
- No generic startup graphics.
- No landfill shock imagery.
- No greenwashing visual language.

### Brand colors

Use the current EterSolis brand standard unless superseded by a newer approved document:

- Coal Grey: `#565656`
- Sunshine Yellow: `#FCCF25`
- Aero White: `#FFFFFF`
- Cool Gray: `#F2F2F2`
- Carbon Black: `#000000`

### Typography

- Body: Aptos or a high-quality system equivalent.
- Logo/display: official EterSolis wordmark or approved vector equivalent.
- Fallback stack must remain professional and legible.

### Component standards

- Header: sticky, transparent official logo, navigation center, theme toggle and primary yellow Sell Waste button right.
- Hero: desktop 60/40 copy-to-visual split; mobile single-column.
- Primary CTA: filled yellow button reserved for the highest-priority action.
- Secondary CTA: white or outlined charcoal button.
- Forms: large labels, helper text, grouped sections, inline validation, progress state, and confirmation page.
- Mobile: mobile-first layout; sticky bottom CTA on Sell Waste page.

---

## 7. Homepage Structure

Homepage section order:

1. Hero with problem-first headline and three CTAs.
2. We Buy Waste banner.
3. What EterSolis Solves problem cards.
4. Core Solutions.
5. How It Works.
6. Industries.
7. Helios panel.
8. Leadership and contact routes.
9. Insights preview.
10. Final CTA block.

Required trust strip:

```txt
We Buy Waste | Resource Recovery | Carbon Management | Circular Economy | Industrial Sustainability
```

Required waste banner language:

> EterSolis Buys Waste.
>
> We purchase and develop solutions for suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential. Submit your material information for review by EterSolis.
>
> Review required. Do not send physical samples unless EterSolis provides written intake instructions.

---

## 8. Sell Waste Page Requirements

The Sell Waste page must prominently state:

> EterSolis buys suitable waste streams, recyclables, industrial by-products and other recoverable materials, subject to review, safety, legality, logistics, quality, quantity and commercial feasibility.

Required H1:

```txt
Sell Waste To EterSolis
```

Required subheading:

```txt
EterSolis purchases and develops solutions for suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential.
```

Required non-binding notice:

```txt
Submitting a waste opportunity is non-binding. EterSolis review is required before any purchase, acceptance, transport, sample transfer, technical assessment or commercial commitment. Do not send physical samples unless EterSolis provides written intake instructions.
```

Accepted inquiry categories:

- Plastics
- Paper and cardboard
- Metals
- E-waste
- Organics
- Industrial by-products
- Construction materials
- Other recoverable resources

---

## 9. Waste Opportunity Form Fields

Required or recommended fields:

| Field | Type | Required | Notes |
|---|---:|---:|---|
| Company name | Text | Yes | 2-120 characters |
| Contact name | Text | Yes | 2-100 characters |
| Role/title | Text | No | Routing context |
| Email | Email | Yes | Valid email |
| Phone / WhatsApp | Text | No | International format recommended |
| Country | Select/Text | Yes | Do not assume location |
| Region/city/site | Text | Yes | High-level location; exact address optional initially |
| Material category | Select | Yes | Use approved inquiry categories |
| Material description | Textarea | Yes | Non-confidential description only |
| Quantity | Number | No | Decimal allowed |
| Unit | Select | No | kg, tonnes, m3, pallets, containers, other |
| Frequency | Select | Yes | One-time, weekly, monthly, continuous, unknown |
| Current handling route | Textarea | No | Landfill, recycler, stored, incinerated, other |
| Contamination notes | Textarea | No | Do not request proprietary process details |
| Hazard/regulated flag | Boolean | Yes | Route to manual safety review if true |
| Safety documents available | Boolean | No | SDS, classification, audit, lab report |
| Files | Upload | No | PDF, JPG, PNG, XLSX, CSV; 20 MB per file; private/quarantined |
| Confidentiality level | Select | Yes | Public, potential confidential, NDA required |
| Consent to contact | Checkbox | Yes | Must be checked |

---

## 10. Server Validation Example

```ts
import { z } from "zod";

export const wasteOpportunitySchema = z.object({
  companyName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  country: z.string().min(2).max(80),
  region: z.string().max(120).optional(),
  materialCategory: z.enum([
    "plastics",
    "paper_cardboard",
    "metals",
    "e_waste",
    "organics",
    "industrial_byproduct",
    "construction",
    "other"
  ]),
  materialDescription: z.string().min(10).max(2000),
  quantity: z.coerce.number().positive().optional(),
  quantityUnit: z.string().max(40).optional(),
  frequency: z.enum(["one_time", "weekly", "monthly", "quarterly", "continuous", "unknown"]),
  hazardFlag: z.boolean(),
  safetyDocumentsAvailable: z.boolean().optional(),
  confidentialityLevel: z.enum(["public", "potential_confidential", "nda_required"]),
  consentToContact: z.literal(true)
});
```

Server validation is mandatory. Client validation is not sufficient.

---

## 11. API Endpoint Behavior

Every lead or waste endpoint must:

1. Validate request method.
2. Validate content type.
3. Validate bot protection token.
4. Validate request body with Zod on the server.
5. Rate-limit by IP and session.
6. Write a `lead_submissions` record.
7. Write a `waste_opportunities` record when the lead type is waste.
8. Create or queue a CRM record.
9. Send an internal notification to the route owner.
10. Send a non-promissory confirmation to the submitter.
11. Return a generic success response with a submission ID.
12. Log an audit event without logging sensitive field values.

---

## 12. Contact Routing

| Route | Address | Purpose |
|---|---|---|
| Waste opportunities | waste@etersolis.com | Waste purchase, material stream, by-product, and recovery inquiries |
| General inquiries | info@etersolis.com | General contact and low-specificity website inquiries |
| Partnerships | partnerships@etersolis.com | Recovery partners, universities, logistics, labs, technology, and commercial partners |
| Careers | careers@etersolis.com | General careers route if activated |
| Privacy/legal | privacy@etersolis.com | Privacy requests and website policy contacts |
| Founder and CEO | smith@etersolis.com | Executive, strategic, investor, and high-value commercial inquiries |
| Chief Scientific Officer | cso@etersolis.com | Technical, scientific, disclosure, talent, and controlled documentation matters |

Subject prefixes:

- `[EterSolis Waste Opportunity]`
- `[EterSolis Assessment Request]`
- `[EterSolis Partnership Inquiry]`
- `[EterSolis Talent Inquiry]`
- `[EterSolis Executive Inquiry]`
- `[EterSolis CSO Inquiry]`
- `[EterSolis Privacy Request]`

---

## 13. Helios v0 Guardrails

Helios v0 should be a controlled guided assistant or CTA-routing component. It should use prompt chips and scripted flows unless AI review, logging, escalation, and abuse controls are complete.

Prompt chips:

- I want to sell waste.
- I need a waste or carbon assessment.
- I want to discuss resource recovery.
- I am a recycler or partner.
- I am looking for careers or Associate opportunities.
- I need to contact the CEO or CSO.

Helios must not:

- Quote prices.
- Promise waste purchase or acceptance.
- Provide hazardous waste handling instructions.
- Request restricted or third-party confidential information.
- Disclose internal platform architecture or protected systems.
- Create legal, transport, disposal, or carbon-credit commitments.

---

## 14. SEO and Analytics

Required baseline:

- Unique title and description for every page.
- Canonical URLs.
- Open Graph metadata.
- Sitemap.
- Robots configuration disallowing API routes and admin/preview paths.
- Consent-aware GA4 configuration.
- Search Console verification and sitemap submission.
- UTM capture for lead forms.
- Analytics events for CTAs, form starts, form submissions, and Helios interactions.

Required events:

```txt
sell_waste_click
waste_form_start
waste_form_submit
assessment_submit
helios_open
helios_lead_handoff
```

Initial page titles:

| Page | Title |
|---|---|
| Home | EterSolis \| Waste & Carbon Management, Resource Recovery and Circular Economy Solutions |
| Sell Waste | Sell Waste To EterSolis \| Waste Stream and Material Recovery Opportunities |
| Solutions | EterSolis Solutions \| Resource Recovery, Carbon Management and Circular Economy |
| Industries | Industries Served \| EterSolis Waste, Carbon and Resource Recovery Solutions |
| About | About EterSolis \| Privately Owned Waste and Carbon Management Company |
| Contact | Contact EterSolis \| Waste Opportunities, Assessments and Partnerships |

---

## 15. Security and Compliance Controls

Minimum controls before collecting public leads:

- HTTPS enforced.
- Security headers configured.
- Bot protection on all public forms.
- POST route rate limiting.
- Server-side validation.
- Secrets kept out of repository, browser bundles, and logs.
- Private upload bucket.
- Signed upload URLs.
- Upload allowlist: PDF, JPG, PNG, XLSX, CSV.
- 20 MB upload limit per file unless explicitly changed.
- Malware scanning or quarantine before human access.
- Supabase RLS enabled if Supabase schemas are exposed to the browser.
- Service keys only in server environment.
- Privacy policy published before data collection.
- Terms and non-binding waste-submission disclaimer published.
- MFA required for domain, hosting, CRM, database, email, and repository administration.
- Daily database backups or provider-managed backup enabled.

---

## 16. Non-Binding Waste Submission Rule

The website must never imply that form submission creates acceptance, purchase, transportation approval, disposal instruction, technical advice, quote, or contract.

Required confirmation email language:

```txt
Subject: EterSolis waste opportunity submission received

Thank you for submitting a waste opportunity to EterSolis.

EterSolis will review the information provided and may contact you for clarification. This submission is non-binding and does not constitute acceptance, purchase approval, transport approval, technical advice or a disposal instruction. Please do not send physical samples or materials unless EterSolis provides written intake instructions.

Reference: {{submissionId}}

EterSolis
Waste & Carbon Management
waste@etersolis.com | etersolis.com
```

---

## 17. Development Workflow

Recommended workflow:

1. Create a feature branch from `main`.
2. Implement one coherent workstream per branch.
3. Run formatting, linting, type checks, tests, and build locally.
4. Open a pull request with a clear implementation summary and QA notes.
5. Use preview deployment for executive and CSO review.
6. Do not merge to `main` without review.
7. Record the exact commit hash released to production.

Local-first validation:

```bash
npm ci
npm run check
npm run test:smoke
npm run docker:build
npm run deploy:dry-run
```

GitHub Actions, if present, are secondary repository checks. EterSolis-controlled local, Docker and server-side validation remain the release authority.

Recommended branch naming:

```txt
feature/website-foundation
feature/sell-waste-form
feature/helios-v0
feature/seo-analytics
security/form-hardening
content/controlled-copy
```

Recommended commit style:

```txt
feat: add EterSolis homepage foundation
feat: add sell waste intake form
fix: tighten waste submission disclaimer
security: add server-side validation and rate limits
docs: update proprietary implementation documentation
```

---

## 18. Environment Variables

Expected environment variables will depend on the selected providers. Do not commit real secrets.

Example names:

```env
NEXT_PUBLIC_SITE_URL=https://etersolis.com
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
DATABASE_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CRM_API_KEY=
WASTE_ROUTE_EMAIL=waste@etersolis.com
INFO_ROUTE_EMAIL=info@etersolis.com
PARTNERSHIPS_ROUTE_EMAIL=partnerships@etersolis.com
PRIVACY_ROUTE_EMAIL=privacy@etersolis.com
CEO_ROUTE_EMAIL=smith@etersolis.com
CSO_ROUTE_EMAIL=cso@etersolis.com
```

Use `.env.example` for placeholders only. Keep `.env.local`, production secrets, service role keys, and credentials outside version control.

---

## 19. QA Acceptance Criteria

Before production release, verify:

- EterSolis spelling is correct everywhere.
- White/charcoal/gold standard is applied.
- No large black panels or generic landfill imagery.
- No authority claim or unsupported public claim.
- `Sell Waste` appears in header, hero, banner, and footer.
- `smith@etersolis.com` and `cso@etersolis.com` are correctly published.
- `waste@etersolis.com` is created and verified before publishing if used publicly.
- All required form fields validate.
- Confirmation email is received.
- Internal notification is received.
- CRM or database record is created.
- Non-binding waste submission notice is visible before submit.
- Mobile layouts have no clipping and usable touch targets.
- SEO title, description, canonical, sitemap, robots, and structured data are verified.
- Analytics events fire for CTA clicks and submissions.
- HTTPS, headers, bot protection, no exposed secrets, rate limits, and private uploads are verified.
- Accessibility review covers keyboard navigation, focus states, labels, error messages, alt text, and contrast.

---

## 20. Launch Plan

| Day | Workstream | Deliverables |
|---:|---|---|
| 0 | Executive approval | Positioning, emails, page list, disclaimers, launch scope |
| 1 | Infrastructure | Repo, hosting, DNS plan, environment variables, email routes, CRM account |
| 2 | Design system | Header, footer, tokens, buttons, cards, hero, waste banner, forms |
| 3 | Core pages | Homepage, Sell Waste, Contact, Privacy, Terms |
| 4 | Commercial pages | Solutions, Industries, About, Insights shell, leadership cards |
| 5 | Forms and CRM | Waste form, contact form, validation, database, CRM/email notifications |
| 6 | Helios v0 and SEO | Guided assistant, metadata, sitemap, robots, JSON-LD |
| 7 | QA and soft launch | Mobile QA, form tests, analytics, security headers, stakeholder review |
| 8-14 | Refinement | Copy polishing, initial insights, performance tuning, CRM improvements |

Rollback requirements:

- Keep current site export or repository backup before deployment.
- Use preview deployment approval before DNS switch.
- Set DNS TTL low before hosting change.
- Maintain static fallback landing page with Sell Waste contact route.
- Document the exact production commit hash.

---

## 21. Intellectual Property and License

This repository is proprietary. See [`LICENSE.md`](./LICENSE.md).

No open-source license is granted. No use, copying, modification, distribution, sublicensing, hosting, deployment, reverse engineering, AI training, model training, scraping, extraction, or derivative use is permitted without written authorization from EterSolis.

---

## 22. Current Implementation Status

Initial documentation protection has been established:

- `README.md` populated with the website upgrade scope, architecture, guardrails, QA criteria, and implementation plan.
- `LICENSE.md` added with a proprietary source code license and strong reservation of rights.

Next implementation actions:

1. Confirm whether this repository should contain the production Next.js codebase directly or whether the website code should be initialized in a nested `etersolis-web/` directory.
2. Create the Next.js App Router foundation.
3. Add design tokens and base layout.
4. Implement homepage and Sell Waste page first.
5. Implement form validation, routing, database/email placeholders, and non-binding confirmation language.
6. Add Helios v0 guided assistant.
7. Add SEO, analytics, security headers, and deployment configuration.

---

**EterSolis**  
Waste & Carbon Management  
Resource Recovery | Circular Economy | Carbon Management | Waste Valorization | Industrial Decarbonization  
https://etersolis.com
