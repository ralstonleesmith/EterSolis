import { test, expect } from '@playwright/test';

test.describe('visual baselines', () => {
  test('homepage visual baseline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
  });

  test('about visual baseline', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot('about.png', { fullPage: true });
  });
});
