# EterSolis Developer Guide

This guide defines the collaboration, quality and error-minimization standards for the EterSolis website codebase.

## Working Principles

- Preserve the public EterSolis position: privately owned waste and carbon management company.
- Use `EterSolis` as one word everywhere.
- Do not expose protected systems, pricing logic, confidential counterparties, internal methodology, process conditions or hidden operational logic.
- Do not imply that a website form creates acceptance, purchase approval, transport approval, disposal instruction, technical advice, quote or contract.
- Keep changes small, reviewable and traceable.
- Prefer existing dependencies and native platform features before adding new packages.
- Optimize CI and preview work for low cost, but never bypass quality gates.

## Branch and Pull Request Workflow

1. Create a feature branch from current `main`.
2. Keep one coherent workstream per PR.
3. Update documentation and previews when behavior, content, routes or page visuals change.
4. Run local checks before requesting review.
5. Merge only after required checks pass.
6. Record meaningful changes in `docs/CHANGELOG.md`.

Recommended branch names:

```txt
feature/page-polish
feature/preview-system
fix/form-validation
security/form-hardening
docs/review-guidance
ci/cost-optimization
```

## Local Quality Commands

Use the lowest-cost command that gives enough confidence for the change:

```bash
npm run typecheck
npm run lint
npm run asset:audit
npm run link:audit
npm run build
npm run check
npm run test:smoke
npm run preview:capture
```

Suggested order:

1. Documentation-only change: `npm run link:audit` if links changed.
2. Styling or page change: `npm run check`.
3. Form, navigation, accessibility or interaction change: `npm run check && npm run test:smoke`.
4. Visual approval change: `npm run preview:capture` and inspect generated previews.

## Code Organization

```txt
src/app/                 App Router pages and API routes
src/components/brand/    EterSolis logo and brand components
src/components/layout/   Header, footer and global layout components
src/components/ui/       Reusable page-level UI components
src/components/sections/ Page sections
src/components/forms/    Public forms and form helpers
src/components/helios/   Helios guided routing interface
src/lib/                 Server utilities, validation, email, CRM, DB, analytics and security
public/brand/            Transparent SVG logo assets for README, docs and external static use
public/media/            Self-hosted website media with credits
previews/                Executive static review previews
scripts/                 Low-dependency maintenance, audit and preview helpers
tests/e2e/               Playwright smoke, accessibility, visual and preview capture tests
```

## Visual Standards

- Use official transparent EterSolis logos only.
- Use dark logo variants on light backgrounds and light variants on dark backgrounds.
- Logos must never sit on embedded background rectangles or boxes.
- Keep high-trust pages bright, spacious and professional.
- Use Sunshine Yellow as an accent and CTA color, not as a heavy background field.
- Avoid generic startup gradients, landfill shock imagery, greenwashing imagery or unsupported impact claims.
- Every page must have clear hierarchy, strong CTA placement, mobile usability and accessible contrast.

## Form Standards

- All public form data must be validated server-side with Zod.
- Bot protection is required before production lead collection.
- Rate limiting must remain enabled for public POST routes.
- Public forms must request non-confidential summaries only.
- Waste submissions must keep the non-binding and no-unsolicited-samples warnings visible.
- Do not log sensitive form payloads.

## Documentation Standards

Update documentation in the same PR when any of the following change:

- Page purpose or content.
- Public routing or email routes.
- Forms, validation, disclaimers or security behavior.
- Deployment, environment variables or self-hosting instructions.
- Preview generation, review or approval process.
- CI checks or test commands.

## Review Checklist

Before merge, confirm:

- `npm run check` passes.
- Interaction or form changes pass Playwright smoke/a11y tests.
- Previews accurately reflect current pages.
- README and relevant docs are current.
- No secret, credential, key, password or restricted operational detail is committed.
- Public wording remains careful, non-promissory and commercially appropriate.
