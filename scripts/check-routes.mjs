import fs from 'node:fs';
import path from 'node:path';

const requiredRoutes = [
  '/',
  '/about',
  '/admin',
  '/admin/audit',
  '/admin/cases',
  '/admin/delivery-events',
  '/admin/invoices',
  '/admin/processing',
  '/admin/quotations',
  '/admin/receiving',
  '/admin/reconciliation',
  '/admin/refunds',
  '/admin/stockpile',
  '/certificates/verify',
  '/contact',
  '/get-started',
  '/get-started/assessment',
  '/get-started/certificates',
  '/get-started/delivery',
  '/get-started/pickup',
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
  '/portal',
  '/portal/cases',
  '/portal/certificates',
  '/portal/invoices',
  '/portal/payments',
  '/portal/profile',
  '/portal/quotations',
  '/portal/schedule',
  '/portal/uploads',
  '/privacy',
  '/sell-waste',
  '/solutions',
  '/terms'
];

function pagePathFor(route) {
  if (route === '/') return 'src/app/page.tsx';
  return path.join('src/app', route, 'page.tsx');
}

const failures = [];

for (const route of requiredRoutes) {
  const file = pagePathFor(route);
  if (!fs.existsSync(file)) failures.push(`${route} is missing ${file}`);
}

const sitemap = fs.readFileSync('src/app/sitemap.ts', 'utf8');
for (const route of ['/kymnis', '/kymnis/how-it-works', '/kymnis/verification', '/kymnis/resource-recovery', '/kymnis/contact']) {
  if (!sitemap.includes('kymnisRoutes') && !sitemap.includes(route)) failures.push(`${route} is not represented in sitemap generation`);
}

const middleware = fs.readFileSync('middleware.ts', 'utf8');
if (!middleware.includes('kymnis.com') || !middleware.includes('/kymnis')) {
  failures.push('middleware.ts must retain KYMNIS host-aware routing');
}

if (failures.length > 0) {
  console.error('route check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('route check passed');
