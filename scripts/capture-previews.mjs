import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/media/generated');
const PREVIEWS_DIR = path.resolve('previews');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:3100';

const routes = [
  '/',
  '/about',
  '/contact',
  '/helios',
  '/industries',
  '/insights',
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
  await ensureDir(OUT_DIR);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for(const r of routes){
    const url = BASE + r;
    try{
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      // Wait for network idle
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(()=>{});
      // Give layout a moment
      await page.waitForTimeout(500);
      const file = path.join(OUT_DIR, filenameFor(r));
      await page.screenshot({ path: file, fullPage: true });
      // Save a PNG preview into the `previews` folder as well
      const previewPng = path.join(PREVIEWS_DIR, filenameFor(r));
      await fs.promises.copyFile(file, previewPng).catch(()=>{});
      // Save HTML snapshot
      const html = await page.content();
      const htmlName = filenameFor(r).replace(/\.png$/,'') + '.html';
      const htmlPath = path.join(PREVIEWS_DIR, htmlName);
      await fs.promises.writeFile(htmlPath, html, 'utf8');
      console.log('Captured', url, '->', file, ',', previewPng, ',', htmlPath);
    }catch(err){
      console.error('Failed capture', url, err.message);
    }
  }

  await browser.close();
}

capture().catch(err=>{ console.error(err); process.exit(1); });
