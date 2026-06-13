import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = ['package-lock.json', 'Dockerfile', 'public/media/credits.json', 'docs/SELF_HOSTING.md', 'database/schema.sql'];
const missing = requiredFiles.filter((file) => !existsSync(path.join(root, file)));

if (missing.length) {
  console.error(`deploy dry run failed: missing ${missing.join(', ')}`);
  process.exit(1);
}

const dockerfile = readFileSync(path.join(root, 'Dockerfile'), 'utf8');
if (!dockerfile.includes('HEALTHCHECK')) {
  console.error('deploy dry run failed: Dockerfile is missing HEALTHCHECK');
  process.exit(1);
}

console.log('deploy dry run passed');
console.log('Recommended release commands:');
console.log('  npm ci');
console.log('  npm run check');
console.log('  npm run test:smoke');
console.log('  npm run docker:build');
console.log('  psql "$DATABASE_URL" -f database/schema.sql');
console.log('  systemctl restart etersolis-web');
console.log('  curl --fail http://127.0.0.1:3000/api/health');
