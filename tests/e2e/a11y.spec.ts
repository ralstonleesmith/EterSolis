import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/helios',
  '/industries',
  '/insights',
  '/insights/introducing-etersolis',
  '/insights/technical-intelligence-brief',
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
    await page.waitForTimeout(250);
    const accessibilityScan = await new AxeBuilder({ page }).analyze();
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
