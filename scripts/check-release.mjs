import fs from 'node:fs';
import { execSync } from 'node:child_process';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const changelog = fs.readFileSync('docs/CHANGELOG.md', 'utf8');
const failures = [];

function fail(message) { failures.push(message); }

if (lock.version !== pkg.version || lock.packages?.['']?.version !== pkg.version) fail('package-lock.json version does not match package.json');
if (!changelog.includes(`## ${pkg.version} — `)) fail(`docs/CHANGELOG.md is missing version ${pkg.version}`);
if (!new RegExp(`## ${pkg.version} — \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z`).test(changelog)) fail(`changelog entry for ${pkg.version} must include ISO UTC timestamp`);

try {
  const changed = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  if (changed.length > 0 && pkg.version === '0.2.0') fail('version must be bumped from main for this PR');
  if (changed.some((file) => file.startsWith('src/') || file.startsWith('content/') || file.startsWith('public/')) && !changed.includes('README.md')) fail('README.md must be updated for source/content/public changes');
} catch {
  // Local-only contexts may not have origin/main. Other checks still apply.
}

if (failures.length) {
  console.error('release audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`release audit passed for version ${pkg.version}`);
