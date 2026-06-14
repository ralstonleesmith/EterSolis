import { test, expect } from '@playwright/test';

test.describe('visual baselines', () => {
  test('homepage visual baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.container-shell', { timeout: 5000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(1400); // allow fonts and images to settle
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      timeout: 15000,
      maxDiffPixelRatio: 0.02
    });
  });

  test('about visual baseline', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.container-shell', { timeout: 5000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(1400);
    await expect(page).toHaveScreenshot('about.png', {
      fullPage: true,
      timeout: 15000,
      maxDiffPixelRatio: 0.02
    });
  });

  // Additional pages
  const extraRoutes = ['/contact', '/helios', '/industries', '/insights', '/sell-waste', '/solutions'];
  for (const route of extraRoutes) {
    test(`${route} visual baseline`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.container-shell', { timeout: 5000 }).catch(()=>{});
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(()=>{});
      await page.waitForTimeout(1400);
      const name = route === '/' ? 'home' : route.replace(/\//g, '') || 'home';
      await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true, timeout: 15000, maxDiffPixelRatio: 0.02 });
    });
  }
});
