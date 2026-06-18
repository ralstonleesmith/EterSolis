import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const PREVIEWS_DIR = path.resolve('previews');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:3100';

const routes = [
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
  '/media-credits',
  '/privacy',
  '/sell-waste',
  '/solutions',
  '/terms'
];

async function ensureDir(dir){
  await fs.promises.mkdir(dir, { recursive: true });
}

function filenameFor(route){
  if(route === '/') return 'home.png';
  return route.replace(/\//g,'').replace(/[^a-z0-9_-]/gi,'') + '.png';
}

async function capture(){
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for(const r of routes){
    const url = BASE + r;
    try{
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(()=>{});
      await page.evaluate(() => document.fonts?.ready).catch(()=>{});
      await page.locator('body').evaluate((body) => {
        body.querySelectorAll('[style*="opacity"], [style*="transform"]').forEach((element) => {
          if (!(element instanceof HTMLElement)) return;
          element.style.opacity = '1';
          element.style.transform = 'none';
        });
      });
      await page.waitForTimeout(500);
      const file = path.join(PREVIEWS_DIR, filenameFor(r));
      await page.screenshot({ path: file, fullPage: true });
      const html = await page.content();
      const htmlName = filenameFor(r).replace(/\.png$/,'') + '.html';
      const htmlPath = path.join(PREVIEWS_DIR, htmlName);
      await fs.promises.writeFile(htmlPath, html, 'utf8');
      console.log('Captured', url, '->', file, ',', htmlPath);
    }catch(err){
      console.error('Failed capture', url, err.message);
    }
  }

  await browser.close();
}

capture().catch(err=>{ console.error(err); process.exit(1); });
