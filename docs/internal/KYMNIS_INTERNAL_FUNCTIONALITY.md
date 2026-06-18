# KYMNIS Internal Functionality

**Classification:** EterSolis proprietary internal KYMNIS functionality. Do not publish internal architecture, schemas, workflows or protected operating methods on public website surfaces.

## Boundary

KYMNIS is one integrated system. Public pages describe the platform, mission, vision and user experience. Internal implementation details live only under `src/lib/internal/kymnis/` and must not be imported by public pages, public components, public API responses, sitemap generation, preview generation, media assets or marketing content.

## Public Disclosure Rule

Public website language may explain KYMNIS as an environmental impact registration, verification and resolution platform. It must not disclose internal architecture, hidden workflows, protected schemas, non-public review logic, proprietary scoring or operational methods.

## Engineering Controls

- `npm run disclosure:audit` blocks legacy split-system terms and internal architecture references outside approved internal files.
- `src/lib/internal/kymnis/` exports explicit internal-use guards.
- No internal source PDFs or proprietary architecture documents are committed to `public/`, `content/` or public route folders.
- Public KYMNIS pages must remain high-level, non-confidential and non-certifying.

## Change Rule

Any KYMNIS internal-functionality change requires a version bump when already pushed, changelog entry, README/documentation update when relevant and disclosure audit pass before merge.

