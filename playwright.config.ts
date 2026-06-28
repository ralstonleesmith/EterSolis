import { defineConfig, devices } from '@playwright/test';

const testBaseUrl = 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './tests/e2e',
  // Increase default test timeout to account for slower CI/dev machines
  timeout: 120000,
  // Prefer not to run fully parallel to reduce resource contention
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: testBaseUrl,
    trace: 'on-first-retry'
  },
  webServer: {
    // In CI prefer building+starting the production server for stability.
    // Local runs continue to use the Next development server through reuseExistingServer.
    command: process.env.CI
      ? 'npm run build && HOST=127.0.0.1 PORT=3000 npm run start'
      : 'npm run dev -- -H 127.0.0.1 -p 3000',
    url: testBaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      NEXT_PUBLIC_SITE_URL: testBaseUrl,
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
