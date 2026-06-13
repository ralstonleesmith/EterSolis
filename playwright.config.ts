import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Increase default test timeout to account for slower CI/dev machines
  timeout: 120000,
  // Prefer not to run fully parallel to reduce resource contention
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'on-first-retry'
  },
  webServer: {
    // In CI prefer building+starting the production server for stability.
    // Local runs will continue to use `npm run dev` via `reuseExistingServer`.
    command: process.env.CI
      ? 'npm run build && npm run start -- -H 127.0.0.1 -p 3100'
      : 'npm run dev -- -H 127.0.0.1 -p 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:3100',
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'preview-only'
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    }
  ]
});
