import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/helios', '/kymnis', '/sell-waste', '/contact', '/about', '/insights', '/media-credits'];

async function assertNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 2);
}

async function assertReadableTheme(page: import('@playwright/test').Page, dark: boolean) {
  await page.evaluate((enabled) => document.documentElement.classList.toggle('dark', enabled), dark);
  await page.waitForTimeout(220);
  const contrast = await page.locator('body').evaluate((body) => {
    const styles = window.getComputedStyle(body);
    return { color: styles.color, background: styles.backgroundColor };
  });
  expect(contrast.color).not.toBe(contrast.background);
  const visibleImageCount = await page.locator('img:visible').count();
  expect(visibleImageCount).toBeGreaterThan(0);
}

test.describe('layout and theme polish', () => {
  for (const route of ROUTES) {
    test(`no overflow and readable light/dark theme on ${route}`, async ({ page, baseURL }) => {
      await page.goto(`${baseURL ?? ''}${route}`);
      await page.waitForLoadState('networkidle');
      await assertNoHorizontalOverflow(page);
      await assertReadableTheme(page, false);
      await assertReadableTheme(page, true);
    });
  }

  test('Helios page uses one splash image and no floating launcher', async ({ page, baseURL }) => {
    await page.goto(`${baseURL ?? ''}/helios`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: /Ask Helios/i })).toHaveCount(0);
    const splashCount = await page.locator('img[src*="helios-earth-splash"]').count();
    expect(splashCount).toBe(1);
  });

  test('mobile menu remains visible and tappable in both themes', async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL ?? ''}/`);
    await page.getByLabel(/Open navigation menu/i).click();
    await expect(page.getByRole('navigation', { name: /Mobile navigation/i })).toBeVisible();
    await page.getByLabel(/Toggle light and dark mode/i).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('navigation', { name: /Mobile navigation/i }).getByRole('link', { name: 'KYMNIS' })).toBeVisible();
    await assertNoHorizontalOverflow(page);
  });
});
