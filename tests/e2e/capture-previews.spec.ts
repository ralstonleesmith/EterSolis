import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const PREVIEWS_DIR = path.resolve(process.env.PREVIEW_OUTPUT_DIR ?? 'previews/generated');
const routes = [
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
  '/media-credits',
  '/privacy',
  '/sell-waste',
  '/solutions',
  '/terms'
];

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function filenameFor(route: string, extension: 'html' | 'png') {
  const name = route === '/' ? 'home' : route.replace(/\//g, '').replace(/[^a-z0-9_-]/gi, '');
  return `${name}.${extension}`;
}

function htmlIndex(entries: Array<{ route: string; htmlFile: string; pngFile: string }>) {
  const items = entries.map((entry) => `<li><a href="${entry.htmlFile}">${entry.route}</a> · <a href="${entry.pngFile}">screenshot</a></li>`).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EterSolis Generated Previews</title><style>body{font-family:Aptos,Arial,sans-serif;margin:40px;line-height:1.6;color:#565656}h1{color:#000}a{color:#000;font-weight:700}li{margin:10px 0}</style></head><body><h1>EterSolis Generated Previews</h1><p>Generated from the current Next.js application for executive review and QA.</p><ul>${items}</ul></body></html>`;
}

test('capture current page previews', async ({ page, baseURL }) => {
  await ensureDir(PREVIEWS_DIR);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const entries: Array<{ route: string; htmlFile: string; pngFile: string }> = [];

  for (const route of routes) {
    await page.goto(`${baseURL ?? ''}${route}`, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => undefined);
    await page.locator('body').evaluate((body) => {
      body.querySelectorAll('[style*="opacity"], [style*="transform"]').forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    });
    await page.waitForTimeout(500);

    const htmlFile = filenameFor(route, 'html');
    const pngFile = filenameFor(route, 'png');
    await page.screenshot({ path: path.join(PREVIEWS_DIR, pngFile), fullPage: true });
    await fs.promises.writeFile(path.join(PREVIEWS_DIR, htmlFile), await page.content(), 'utf8');
    entries.push({ route, htmlFile, pngFile });
  }

  await fs.promises.writeFile(path.join(PREVIEWS_DIR, 'index.html'), htmlIndex(entries), 'utf8');
  await fs.promises.writeFile(path.join(PREVIEWS_DIR, 'manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), routes: entries }, null, 2));
});
