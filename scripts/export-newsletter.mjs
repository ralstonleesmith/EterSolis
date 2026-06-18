import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const slugIndex = process.argv.indexOf('--slug');
const slug = slugIndex >= 0 ? process.argv[slugIndex + 1] : undefined;
if (!slug) {
  console.error('usage: npm run newsletter:export -- --slug introducing-etersolis');
  process.exit(1);
}

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3100';
const outputDir = path.resolve('exports', 'newsletters');
await fs.promises.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
await page.goto(`${base}/insights/${slug}/print`, { waitUntil: 'networkidle', timeout: 60000 });
await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
await page.pdf({ path: path.join(outputDir, `${slug}.pdf`), format: 'A4', printBackground: true, margin: { top: '16mm', right: '14mm', bottom: '16mm', left: '14mm' } });
await browser.close();
console.log(`newsletter export written to ${path.join(outputDir, `${slug}.pdf`)}`);
