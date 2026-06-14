import { test, expect } from '@playwright/test';

test.describe('visual baselines', () => {
  test('homepage visual baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // allow transient animations to settle
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      timeout: 15000,
      maxDiffPixelRatio: 0.02
    });
  });

  test('about visual baseline', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('about.png', {
      fullPage: true,
      timeout: 15000,
      maxDiffPixelRatio: 0.02
    });
  });
});
