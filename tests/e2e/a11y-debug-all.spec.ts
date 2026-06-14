import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = ['/', '/about', '/contact', '/helios', '/industries', '/insights', '/sell-waste', '/solutions'];

for (const route of ROUTES) {
  test(`a11y debug ${route}`, async ({ page, baseURL }) => {
    await page.goto((baseURL || '') + route);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(250);
    const accessibilityScan = await new AxeBuilder({ page }).analyze();
    const violations = accessibilityScan.violations || [];
    console.log(`\nRoute: ${route} — violations:`, violations.length);
    for (const v of violations) {
      console.log('---');
      console.log('id:', v.id);
      console.log('impact:', v.impact);
      console.log('help:', v.help);
      console.log('nodes:', v.nodes.length);
      for (const node of v.nodes) {
        console.log('  selector:', node.target.join(' | '));
        if (node.failureSummary) console.log('  summary:', node.failureSummary);
      }
    }
  });
}
