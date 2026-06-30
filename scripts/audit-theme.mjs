import fs from 'node:fs';

const globals = fs.readFileSync('src/app/globals.css', 'utf8');
const layoutThemeSpec = fs.readFileSync('tests/e2e/layout-theme.spec.ts', 'utf8');
const requiredTokens = [
  '--surface',
  '--surface-muted',
  '--surface-strong',
  '--text-primary',
  '--text-muted',
  '--text-subtle',
  '--header-bg',
  '--header-panel',
  '--control-bg',
  '--field-bg',
  '--kymnis-teal',
  '--kymnis-gold',
  '--kymnis-ink',
  '--kymnis-white'
];
const requiredUtilities = ['.site-header', '.site-header-panel', '.ui-control', '.ui-surface', '.ui-surface-muted', '.ui-field', '.text-on-dark-muted'];
const failures = [];

for (const token of requiredTokens) {
  if (!globals.includes(token)) failures.push(`globals.css is missing ${token}`);
}

if (!fs.existsSync('src/components/layout/ThemeToggle.tsx')) failures.push('ThemeToggle component is missing');
if (!fs.existsSync('docs/WEBSITE_CODEBASE_SOP.md')) failures.push('master SOP document is missing at docs/WEBSITE_CODEBASE_SOP.md');
if (!globals.includes('.surface-card')) failures.push('surface-card utility is missing');
if (!globals.includes('.kymnis-glow')) failures.push('kymnis-glow utility is missing');
if (!globals.includes('transition-property: background-color')) failures.push('global theme transition properties are missing');
if (!globals.includes('prefers-reduced-motion')) failures.push('reduced-motion theme transition safeguard is missing');
for (const utility of requiredUtilities) {
  if (!globals.includes(utility)) failures.push(`globals.css is missing ${utility}`);
}
if (!layoutThemeSpec.includes('assertVisibleTextContrast')) failures.push('layout-theme spec must inspect visible text contrast');
if (!layoutThemeSpec.includes('etersolis-theme')) failures.push('layout-theme spec must cover persisted theme preference');

if (failures.length > 0) {
  console.error('theme audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('theme audit passed');
