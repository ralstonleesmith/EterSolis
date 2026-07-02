import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const PREVIEWS_DIR = path.resolve(process.env.PREVIEW_OUTPUT_DIR ?? 'previews/generated');
const previewRoutes = [
  { route: '/', title: 'Home', category: 'public' },
  { route: '/get-started', title: 'Get Started', category: 'public' },
  { route: '/get-started/pickup', title: 'Pickup Intake', category: 'public' },
  { route: '/get-started/delivery', title: 'Delivery Intake', category: 'public' },
  { route: '/get-started/assessment', title: 'Assessment Intake', category: 'public' },
  { route: '/get-started/certificates', title: 'Certificate Intake', category: 'public' },
  { route: '/sell-waste', title: 'Legacy Sell Waste Redirect', category: 'public' },
  { route: '/status/demo-token', title: 'Demo Status', category: 'public-dynamic' },
  { route: '/certificates/verify', title: 'Certificate Verification', category: 'public' },
  { route: '/certificates/verify/demo-certificate', title: 'Demo Certificate Result', category: 'public-dynamic' },
  { route: '/contact', title: 'Contact', category: 'public' },
  { route: '/solutions', title: 'Solutions', category: 'public' },
  { route: '/industries', title: 'Industries', category: 'public' },
  { route: '/about', title: 'About', category: 'public' },
  { route: '/insights', title: 'Insights', category: 'public' },
  { route: '/insights/introducing-etersolis', title: 'Introducing EterSolis', category: 'publication' },
  { route: '/insights/introducing-etersolis/print', title: 'Introducing EterSolis Print', category: 'publication' },
  { route: '/insights/technical-intelligence-brief', title: 'Technical Intelligence Brief', category: 'publication' },
  { route: '/insights/technical-intelligence-brief/print', title: 'Technical Brief Print', category: 'publication' },
  { route: '/helios', title: 'Helios', category: 'public' },
  { route: '/media-credits', title: 'Media Credits', category: 'public' },
  { route: '/privacy', title: 'Privacy', category: 'public' },
  { route: '/terms', title: 'Terms', category: 'public' },
  { route: '/portal', title: 'Customer Portal', category: 'portal' },
  { route: '/portal/cases', title: 'Portal Cases', category: 'portal' },
  { route: '/portal/quotations', title: 'Portal Quotations', category: 'portal' },
  { route: '/portal/invoices', title: 'Portal Invoices', category: 'portal' },
  { route: '/portal/payments', title: 'Portal Payments', category: 'portal' },
  { route: '/portal/uploads', title: 'Portal Uploads', category: 'portal' },
  { route: '/portal/schedule', title: 'Portal Schedule', category: 'portal' },
  { route: '/portal/certificates', title: 'Portal Certificates', category: 'portal' },
  { route: '/portal/profile', title: 'Portal Profile', category: 'portal' },
  { route: '/kymnis', title: 'KYMNIS', category: 'kymnis' },
  { route: '/kymnis/how-it-works', title: 'KYMNIS How It Works', category: 'kymnis' },
  { route: '/kymnis/verification', title: 'KYMNIS Verification', category: 'kymnis' },
  { route: '/kymnis/resource-recovery', title: 'KYMNIS Resource Recovery', category: 'kymnis' },
  { route: '/kymnis/contact', title: 'KYMNIS Contact', category: 'kymnis' },
  { route: '/admin', title: 'Admin Dashboard', category: 'admin' },
  { route: '/admin/login', title: 'Admin Login', category: 'admin' },
  { route: '/admin/cases', title: 'Admin Cases', category: 'admin' },
  { route: '/admin/cases/ES-CASE-DEMO-0001', title: 'Admin Case Detail', category: 'admin' },
  { route: '/admin/quotations', title: 'Admin Quotations', category: 'admin' },
  { route: '/admin/invoices', title: 'Admin Invoices', category: 'admin' },
  { route: '/admin/reconciliation', title: 'Admin Reconciliation', category: 'admin' },
  { route: '/admin/refunds', title: 'Admin Refunds', category: 'admin' },
  { route: '/admin/receiving', title: 'Admin Receiving', category: 'admin' },
  { route: '/admin/stockpile', title: 'Admin Stockpile', category: 'admin' },
  { route: '/admin/processing', title: 'Admin Processing', category: 'admin' },
  { route: '/admin/service-requests', title: 'Admin Service Requests', category: 'admin' },
  { route: '/admin/delivery-events', title: 'Admin Delivery Events', category: 'admin' },
  { route: '/admin/pickups', title: 'Admin Pickups', category: 'admin' },
  { route: '/admin/deliveries', title: 'Admin Deliveries', category: 'admin' },
  { route: '/admin/payments', title: 'Admin Payments', category: 'admin' },
  { route: '/admin/certificates', title: 'Admin Certificates', category: 'admin' },
  { route: '/admin/audit', title: 'Admin Audit', category: 'admin' },
  { route: '/admin/analytics', title: 'Admin Analytics', category: 'admin' }
] as const;

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 844 }
] as const;

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function filenameFor(route: string, viewport: string, extension: 'html' | 'png') {
  const name = route === '/' ? 'home' : route.replace(/\//g, '').replace(/[^a-z0-9_-]/gi, '');
  return `${name}-${viewport}.${extension}`;
}

function htmlIndex(entries: Array<{ route: string; title: string; category: string; viewport: string; htmlFile: string; pngFile: string }>) {
  const items = entries.map((entry) => `<li><strong>${entry.title}</strong> <code>${entry.route}</code> [${entry.category}/${entry.viewport}] · <a href="${entry.htmlFile}">html</a> · <a href="${entry.pngFile}">screenshot</a></li>`).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EterSolis Generated Previews</title><style>body{font-family:Aptos,Arial,sans-serif;margin:40px;line-height:1.6;color:#565656}h1{color:#000}a{color:#000;font-weight:700}li{margin:10px 0}</style></head><body><h1>EterSolis Generated Previews</h1><p>Generated from the current Next.js application for executive review and QA.</p><ul>${items}</ul></body></html>`;
}

test('capture current page previews', async ({ page, baseURL }) => {
  test.setTimeout(12 * 60_000);
  await ensureDir(PREVIEWS_DIR);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const entries: Array<{ route: string; title: string; category: string; viewport: string; htmlFile: string; pngFile: string }> = [];

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const item of previewRoutes) {
      await page.goto(`${baseURL ?? ''}${item.route}`, { waitUntil: 'load' });
      await page.waitForLoadState('networkidle').catch(() => undefined);
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => undefined);
      await page.locator('body').evaluate((body) => {
        body.querySelectorAll('[style*="opacity"], [style*="transform"]').forEach((element) => {
          if (!(element instanceof HTMLElement)) return;
          element.style.opacity = '1';
          element.style.transform = 'none';
        });
      });
      await page.waitForTimeout(150);

      const htmlFile = filenameFor(item.route, viewport.name, 'html');
      const pngFile = filenameFor(item.route, viewport.name, 'png');
      await page.screenshot({ path: path.join(PREVIEWS_DIR, pngFile), fullPage: true });
      await fs.promises.writeFile(path.join(PREVIEWS_DIR, htmlFile), await page.content(), 'utf8');
      entries.push({ route: item.route, title: item.title, category: item.category, viewport: viewport.name, htmlFile, pngFile });
    }
  }

  await fs.promises.writeFile(path.join(PREVIEWS_DIR, 'index.html'), htmlIndex(entries), 'utf8');
  await fs.promises.writeFile(path.join(PREVIEWS_DIR, 'manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), viewports, routes: entries }, null, 2));
});
