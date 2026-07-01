import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/helios', '/kymnis', '/sell-waste', '/contact', '/about', '/insights', '/insights/technical-intelligence-brief', '/insights/technical-intelligence-brief/print', '/media-credits'];

async function assertNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 2);
}

async function assertVisibleTextContrast(page: import('@playwright/test').Page) {
  const failures = await page.evaluate(() => {
    function parseRgb(value: string) {
      const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/);
      if (!match) return null;
      return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
        a: match[4] === undefined ? 1 : Number(match[4])
      };
    }

    function channel(value: number) {
      const normalized = value / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    }

    function luminance(color: { r: number; g: number; b: number }) {
      return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
    }

    function contrast(foreground: { r: number; g: number; b: number }, background: { r: number; g: number; b: number }) {
      const light = Math.max(luminance(foreground), luminance(background));
      const dark = Math.min(luminance(foreground), luminance(background));
      return (light + 0.05) / (dark + 0.05);
    }

    function backgroundFor(element: Element) {
      let current: Element | null = element;
      while (current) {
        if (current.tagName === 'HEADER') {
          return document.documentElement.classList.contains('dark') ? { r: 0, g: 0, b: 0, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
        }
        const style = window.getComputedStyle(current);
        const background = parseRgb(style.backgroundColor);
        if (background && background.a > 0.92) return background;
        if (background && background.a > 0.55) {
          const base = document.documentElement.classList.contains('dark') ? 0 : 255;
          return {
            r: Math.round(background.r * background.a + base * (1 - background.a)),
            g: Math.round(background.g * background.a + base * (1 - background.a)),
            b: Math.round(background.b * background.a + base * (1 - background.a)),
            a: 1
          };
        }
        if (
          current.classList.contains('dark-gradient') ||
          current.classList.contains('dark-section') ||
          current.classList.contains('kymnis-hero-bg')
        ) {
          return { r: 0, g: 0, b: 0, a: 1 };
        }
        if (current.classList.contains('glass-panel')) {
          return document.documentElement.classList.contains('dark') ? { r: 18, g: 18, b: 18, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
        }
        current = current.parentElement;
      }
      return document.documentElement.classList.contains('dark') ? { r: 0, g: 0, b: 0, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
    }

    return Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .filter((element) => {
        const text = element.innerText?.replace(/\s+/g, ' ').trim();
        if (!text || text.length < 3) return false;
        if (element.children.length > 0 && Array.from(element.children).some((child) => (child as HTMLElement).innerText?.trim())) return false;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 2 && rect.height > 2 && style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) > 0.1;
      })
      .map((element) => {
        const style = window.getComputedStyle(element);
        const foreground = parseRgb(style.color);
        const background = backgroundFor(element);
        const ratio = foreground ? contrast(foreground, background) : 0;
        const fontSize = Number.parseFloat(style.fontSize);
        const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
        const minimum = fontSize >= 24 || fontWeight >= 700 ? 3 : 4.5;
        return { text: element.innerText.replace(/\s+/g, ' ').trim().slice(0, 90), ratio, minimum, color: style.color, background: window.getComputedStyle(element).backgroundColor };
      })
      .filter((result) => result.ratio < result.minimum)
      .slice(0, 12);
  });

  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
}

async function assertReadableTheme(page: import('@playwright/test').Page, dark: boolean) {
  await page.evaluate((enabled) => document.documentElement.classList.toggle('dark', enabled), dark);
  await page.waitForTimeout(360);
  const contrast = await page.locator('body').evaluate((body) => {
    const styles = window.getComputedStyle(body);
    return { color: styles.color, background: styles.backgroundColor };
  });
  expect(contrast.color).not.toBe(contrast.background);
  await assertVisibleTextContrast(page);
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
    await page.getByLabel(/Switch to dark mode/i).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('navigation', { name: /Mobile navigation/i }).getByRole('link', { name: 'KYMNIS' })).toBeVisible();
    await assertNoHorizontalOverflow(page);
  });

  test('header theme state persists and remains operable after reload', async ({ page, baseURL }) => {
    await page.goto(`${baseURL ?? ''}/solutions`);
    const header = page.getByRole('banner');
    await expect(header.getByRole('navigation', { name: /Primary navigation/i }).getByRole('link', { name: 'Solutions' })).toHaveAttribute('aria-current', 'page');
    await page.getByLabel(/Switch to dark mode/i).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByLabel(/Switch to light mode/i)).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.getByLabel(/Switch to light mode/i).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('stored first-load theme preference is applied before interaction', async ({ page, baseURL }) => {
    await page.addInitScript(() => window.localStorage.setItem('etersolis-theme', 'dark'));
    await page.goto(`${baseURL ?? ''}/`);
    await expect(page.locator('html')).toHaveClass(/dark/);
    await assertVisibleTextContrast(page);
  });
});
