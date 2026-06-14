import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = ['/', '/about', '/contact', '/helios', '/industries', '/insights', '/sell-waste', '/solutions'];

for (const route of ROUTES) {
  test(`a11y audit ${route}`, async ({ page, baseURL }) => {
    await page.goto((baseURL || '') + route);
    await page.waitForLoadState('networkidle');
    // force light theme for deterministic contrast checks
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(250);
    const accessibilityScan = await new AxeBuilder({ page }).analyze();
    const violations = accessibilityScan.violations || [];
    if (violations.length > 0) {
      console.log(`A11Y violations on ${route}:`, violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }))); 
    }
    test.expect(violations.length).toBe(0);
  });
}
