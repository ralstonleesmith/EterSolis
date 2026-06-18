import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/helios',
  '/industries',
  '/insights',
  '/insights/introducing-etersolis',
  '/kymnis',
  '/kymnis/how-it-works',
  '/kymnis/verification',
  '/kymnis/resource-recovery',
  '/kymnis/contact',
  '/sell-waste',
  '/solutions'
];

test.describe('logo audit', () => {
  for (const route of ROUTES) {
    test(`logo fits in header on ${route}`, async ({ page, baseURL }) => {
      await page.goto((baseURL || '') + route);
      await page.waitForSelector('header');
      const header = await page.$('header');
      const logo = await page.$('header img, header svg, header .brand-no-background');
      expect(header).not.toBeNull();
      expect(logo).not.toBeNull();

      const headerBox = await header!.boundingBox();
      const logoBox = await logo!.boundingBox();
      if (!headerBox || !logoBox) {
        test.fail(true, 'Could not read bounding boxes');
        return;
      }

      // Ensure logo width and height do not exceed header inner box
      expect(logoBox.width).toBeLessThanOrEqual(headerBox.width + 1);
      expect(logoBox.height).toBeLessThanOrEqual(headerBox.height + 1);

      // Ensure logo is vertically centered within header (allow small tolerance)
      const logoCenterY = logoBox.y + logoBox.height / 2;
      const headerCenterY = headerBox.y + headerBox.height / 2;
      expect(Math.abs(logoCenterY - headerCenterY)).toBeLessThanOrEqual(6);
    });
  }
});
