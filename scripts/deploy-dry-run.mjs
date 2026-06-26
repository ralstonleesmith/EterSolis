import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'package.json',
  'package-lock.json',
  'server.js',
  'Dockerfile',
  'public/media/credits.json',
  'docs/SELF_HOSTING.md',
  'docs/LAUNCH_CHECKLIST.md',
  'database/schema.sql',
  'scripts/check-runtime-config.mjs',
  'scripts/check-lead-capture.mjs'
];
const missing = requiredFiles.filter((file) => !existsSync(path.join(root, file)));
const failures = [];

if (missing.length) failures.push(`missing ${missing.join(', ')}`);

const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const lock = JSON.parse(readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
if (pkg.version !== lock.version || pkg.version !== lock.packages?.['']?.version) {
  failures.push('package.json and package-lock.json root versions must match');
}
if (!pkg.engines?.node?.includes('20')) failures.push('package.json must declare Node 20 runtime support');
for (const script of ['build', 'start', 'start:node', 'runtime:check', 'lead-capture:check', 'check']) {
  if (!pkg.scripts?.[script]) failures.push(`package.json is missing script: ${script}`);
}

const dockerfile = readFileSync(path.join(root, 'Dockerfile'), 'utf8');
if (!dockerfile.includes('node:20-alpine')) failures.push('Dockerfile must use Node 20 Alpine runtime');
if (!dockerfile.includes('HEALTHCHECK')) failures.push('Dockerfile is missing HEALTHCHECK');

const server = readFileSync(path.join(root, 'server.js'), 'utf8');
if (!server.includes('process.env.PORT')) failures.push('server.js must respect process.env.PORT');
if (!server.includes('next(')) failures.push('server.js must initialize Next.js');

if (failures.length) {
  console.error('deploy dry run failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('deploy dry run passed');
console.log('Recommended release commands:');
console.log('  npm ci');
console.log('  npm run check');
console.log('  npm run test:smoke');
console.log('  npm run runtime:check -- --env-file=/etc/etersolis-web.env');
console.log('  npm run lead-capture:check -- --env-file=/etc/etersolis-web.env');
console.log('  npm run docker:build');
console.log('  psql "$DATABASE_URL" -f database/schema.sql');
console.log('  systemctl restart etersolis-web');
console.log('  curl --fail http://127.0.0.1:3000/api/health');
console.log('  curl --fail http://127.0.0.1:3000/api/readiness');
