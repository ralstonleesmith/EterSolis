import fs from 'node:fs';
import path from 'node:path';

const protectedTerms = [
  /\bMITS(?:®)?\b/i,
  /Material Intelligence\s*&\s*Traceability System/i,
  /MITS_Final_Architecture/i,
  /protected-system/i
];

const allowedPrefixes = [
  'docs/internal/',
  'src/lib/internal/kymnis/',
  'scripts/audit-disclosure.mjs'
];

const scanRoots = ['src', 'content', 'public', 'docs', 'scripts'];
const failures = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') return [];
    if (entry.isDirectory()) return walk(file);
    return [file];
  });
}

function isAllowed(file) {
  const normalized = file.replaceAll(path.sep, '/');
  return allowedPrefixes.some((prefix) => normalized.startsWith(prefix));
}

for (const file of scanRoots.flatMap(walk)) {
  const normalized = file.replaceAll(path.sep, '/');
  if (isAllowed(normalized)) continue;
  if (/\.(png|jpg|jpeg|gif|webp|ico|pdf)$/i.test(normalized)) {
    if (/MITS_Final_Architecture/i.test(normalized)) failures.push(`${normalized}: protected source document must not be committed`);
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  for (const term of protectedTerms) {
    if (term.test(content)) failures.push(`${normalized}: protected internal term matched ${term}`);
  }
  if (/from ['"]@\/lib\/internal/i.test(content) || /from ['"].*\/lib\/internal/i.test(content)) {
    failures.push(`${normalized}: public code must not import internal libraries`);
  }
}

if (failures.length > 0) {
  console.error('disclosure audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('disclosure audit passed');
