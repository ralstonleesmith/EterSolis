import fs from 'node:fs';
import { execSync } from 'node:child_process';

const arg = process.argv.find((value) => value.startsWith('--')) ?? '--patch';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);
const next = arg === '--minor' ? `${major}.${minor + 1}.0` : arg === '--major' ? `${major + 1}.0.0` : `${major}.${minor}.${patch + 1}`;
pkg.version = next;
fs.writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
execSync('npm install --package-lock-only --ignore-scripts', { stdio: 'inherit' });
console.log(`version bumped to ${next}`);
