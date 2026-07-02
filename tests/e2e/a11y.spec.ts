import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/',
  '/about',
  '/certificates/verify',
  '/contact',
  '/get-started',
  '/helios',
  '/industries',
  '/insights',
  '/insights/introducing-etersolis',
  '/insights/technical-intelligence-brief',
  '/insights/technical-intelligence-brief/print',
  '/kymnis',
  '/kymnis/how-it-works',
  '/kymnis/verification',
  '/kymnis/resource-recovery',
  '/kymnis/contact',
  '/sell-waste',
  '/solutions'
];

for (const route of ROUTES) {
  test(`a11y audit ${route}`, async ({ page, baseURL }) => {
    await page.goto(`${baseURL ?? ''}${route}`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.locator('body').evaluate((body) => {
      body.querySelectorAll('[style*="opacity"], [style*="transform"]').forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    });
    await page.waitForTimeout(250);
    const accessibilityScan = await new AxeBuilder({ page })
      // Contrast is covered by layout-theme.spec.ts with route-wide light/dark checks.
      // Axe reports false positives on layered hero/media sections after animation normalization.
      .disableRules(['color-contrast'])
      .analyze();
    const violations = accessibilityScan.violations ?? [];

    if (violations.length > 0) {
      console.log(
        `A11Y violations on ${route}:`,
        JSON.stringify(violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            html: node.html
          }))
        })), null, 2)
      );
    }

    expect(violations.length).toBe(0);
  });
}
