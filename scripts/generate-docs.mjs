import fs from 'node:fs';

const check = process.argv.includes('--check');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const readme = fs.readFileSync('README.md', 'utf8');
const generated = `<!-- DOCS:GENERATED START -->
## Generated Project Index

**Version:** ${pkg.version}
**Content system:** Structured Markdown insights in \`content/insights/*.md\`
**Primary quality gate:** \`npm run check\`

### Current Public Routes

- \`/\` — Homepage
- \`/sell-waste\` — Waste opportunity intake
- \`/solutions\` — Resource, waste, carbon and circular economy solutions
- \`/industries\` — Industry-specific support
- \`/about\` — Company positioning and leadership
- \`/kymnis\` — KYMNIS environmental impact registration platform foundation
- \`/kymnis/how-it-works\` — KYMNIS registration and improvement pathway
- \`/kymnis/verification\` — KYMNIS verification-readiness pathway
- \`/kymnis/resource-recovery\` — KYMNIS recovery pathway
- \`/kymnis/contact\` — KYMNIS platform interest intake
- \`/contact\` — Contact routes and inquiry form
- \`/insights\` — Published insight archive
- \`/insights/introducing-etersolis\` — EterSolis Newsletter Issue 001
- \`/helios\` — Guided routing assistant
- \`/media-credits\` — Website media attribution
- \`/privacy\` — Privacy notice
- \`/terms\` — Website terms and non-binding submission notices

### Required Change-Control Scripts

- \`npm run version:bump -- --patch\`
- \`npm run insights:validate\`
- \`npm run docs:generate\`
- \`npm run docs:check\`
- \`npm run release:audit\`
- \`npm run disclosure:audit\`
- \`npm run routes:check\`
- \`npm run theme:audit\`
- \`npm run check\`
- \`npm run test:smoke\`
- \`npm run preview:capture\`
<!-- DOCS:GENERATED END -->`;

const pattern = /<!-- DOCS:GENERATED START -->[\s\S]*?<!-- DOCS:GENERATED END -->/;
const next = pattern.test(readme) ? readme.replace(pattern, generated) : `${readme.trim()}\n\n${generated}\n`;
if (check) {
  if (next !== readme) {
    console.error('README generated section is stale. Run npm run docs:generate.');
    process.exit(1);
  }
  console.log('docs check passed');
} else {
  fs.writeFileSync('README.md', next);
  console.log('README generated section updated');
}
