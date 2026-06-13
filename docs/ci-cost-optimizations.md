CI Cost Optimizations

This PR (`chore/add-playwright-ci`) includes several changes to minimize operational cost while keeping reliable test coverage:

- Path filters: Workflow triggers only on changes to `src/**`, `tests/**`, `package.json`, `playwright.config.ts`, and workflow files.
- Concurrency: Cancels redundant runs per-ref to avoid wasted concurrency.
- Faster install: Uses `npm ci --no-audit --prefer-offline` to reduce external network requests.
- Next cache: Caches `.next/.cache` to speed builds between runs.
- Artifact retention: Playwright reports are uploaded with `retention-days: 3` to limit storage.
- Server in CI: Tests run against a production build (`npm run build && npm start`) for stability.

If merged, these changes should reduce GitHub Actions minutes and storage usage while keeping test reliability high.
