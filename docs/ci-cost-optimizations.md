# CI Cost Optimizations

This repository uses cost-minimizing quality gates that preserve professional release standards.

## Principles

- Run the cheapest useful check first.
- Keep workflows path-filtered where possible.
- Cancel redundant in-progress runs on the same ref.
- Cache dependency and framework build work.
- Upload artifacts only when useful for failure diagnosis or executive review.
- Prefer smoke and accessibility checks before heavier visual review.
- Do not bypass required checks to save time.

## Current Checks

Core check command:

```txt
npm run check
```

This runs TypeScript, lint, media audit, link audit and production build.

Interaction and accessibility command:

```txt
npm run test:smoke
```

Preview capture command:

```txt
npm run preview:capture
```

## Recommended Use

- Documentation-only change: run link audit when links are modified.
- Page copy change: run check and preview capture.
- Visual layout change: run check, smoke tests and preview capture.
- Form or API change: run check plus smoke tests.
- Media change: run asset audit and check generated previews.

## Artifact Retention

Keep artifact retention short unless an executive review package must be preserved. The normal target is three days for failure artifacts and short-lived preview screenshots.

## Dependency Policy

Do not add new packages unless they clearly reduce operational risk, maintenance cost or implementation complexity. Prefer Node built-ins and existing dependencies for scripts and developer tooling.
