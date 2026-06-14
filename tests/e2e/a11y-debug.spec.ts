import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a11y debug /sell-waste', async ({ page, baseURL }) => {
  await page.goto((baseURL || '') + '/sell-waste');
  await page.waitForLoadState('networkidle');
  const accessibilityScan = await new AxeBuilder({ page }).analyze();
  const violations = accessibilityScan.violations || [];
  console.log('Violations count:', violations.length);
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