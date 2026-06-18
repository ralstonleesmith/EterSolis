import fs from 'node:fs';

const globals = fs.readFileSync('src/app/globals.css', 'utf8');
const requiredTokens = ['--surface', '--surface-muted', '--surface-strong', '--text-primary', '--text-muted', '--kymnis-green'];
const failures = [];

for (const token of requiredTokens) {
  if (!globals.includes(token)) failures.push(`globals.css is missing ${token}`);
}

if (!fs.existsSync('src/components/layout/ThemeToggle.tsx')) failures.push('ThemeToggle component is missing');
if (!globals.includes('.surface-card')) failures.push('surface-card utility is missing');
if (!globals.includes('.kymnis-glow')) failures.push('kymnis-glow utility is missing');

if (failures.length > 0) {
  console.error('theme audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('theme audit passed');

