import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PREVIEWS_DIR = path.resolve('previews');

async function ensureDir(dir: string){
  await fs.promises.mkdir(dir, { recursive: true });
}

function filenameFor(route: string){
  if(route === '/') return 'home.png';
  return route.replace(/\//g,'').replace(/[^a-z0-9_-]/gi,'') + '.png';
}

const routes = ['/', '/about', '/contact', '/helios', '/industries', '/insights', '/media-credits', '/privacy', '/sell-waste', '/solutions', '/terms'];

test('capture previews', async ({ page, baseURL }) => {
  await ensureDir(PREVIEWS_DIR);
  for (const r of routes) {
    const url = (baseURL || '') + r;
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle').catch(()=>{});
    await page.waitForTimeout(500);
    const file = path.join(PREVIEWS_DIR, filenameFor(r));
    await page.screenshot({ path: file, fullPage: true });
    const html = await page.content();
    const htmlName = filenameFor(r).replace(/\.png$/,'') + '.html';
    const htmlPath = path.join(PREVIEWS_DIR, htmlName);
    await fs.promises.writeFile(htmlPath, html, 'utf8');
    console.log('Saved preview', file, htmlPath);
  }
});
