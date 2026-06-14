import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('inspect a11y /contact', async ({ page, baseURL }) => {
  const route = '/contact';
  await page.goto((baseURL || '') + route);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.documentElement.classList.remove('dark'));
  await page.waitForTimeout(250);
  const results = await new AxeBuilder({ page }).analyze();
  if ((results.violations || []).length > 0) {
    for (const v of results.violations) {
      console.log('VIOLATION:', v.id, v.impact, v.description);
      for (const node of v.nodes) {
        console.log('  Selector:', node.target.join(' | '));
        console.log('  HTML:', node.html);
      }
    }
  } else {
    console.log('No violations');
  }
});
