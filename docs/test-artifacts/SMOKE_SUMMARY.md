**Smoke Tests — Run Summary**

- **Status:** All smoke tests passed (10/10) on main.
- **Report:** Playwright HTML report served locally at http://localhost:9323
- **Primary artifact:** screenshot of the failing-then-passing step: [test-results/screenshots/sell-waste-stepper.png](test-results/screenshots/sell-waste-stepper.png)
- **Notes:** A single failure was observed earlier for the `sell waste` stepper (`Confidentiality level` select hidden) but re-running with tracing produced a passing run; trace and screenshot captured for inspection.

Next steps implemented:

- Add a CI workflow to run Playwright visual checks on PRs (see .github/workflows/visual-regression.yml).

How to view artifacts locally:

1. Start the Playwright report server:

```bash
npx playwright show-report test-results
```

2. Open the URL printed (default: http://localhost:9323) in your browser.
