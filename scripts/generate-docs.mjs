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
- \`/get-started\` — Service request, pickup, delivery, assessment and certificate intake
- \`/get-started/pickup\` — Pickup request intake
- \`/get-started/delivery\` — Delivery request intake
- \`/get-started/assessment\` — Assessment request intake
- \`/get-started/certificates\` — Certificate request intake
- \`/sell-waste\` — Legacy redirect to \`/get-started\`
- \`/status/[publicToken]\` — Public service-request status
- \`/certificates/verify\` — Public certificate verification
- \`/certificates/verify/[certificateId]\` — Public certificate verification result
- \`/portal\` — Customer portal preview for cases, quotations, invoices, uploads, scheduling and certificates
- \`/portal/login\` — Customer and administrator portal access preview
- \`/portal/cases\` — Customer case history and QR status preview
- \`/portal/quotations\` — Customer quotation review preview
- \`/portal/invoices\` — Customer invoice and EFT reference preview
- \`/portal/payments\` — Customer payment proof and reconciliation preview
- \`/portal/uploads\` — Customer evidence upload preview
- \`/portal/schedule\` — Customer pickup and delivery scheduling preview
- \`/portal/certificates\` — Customer certificate history preview
- \`/portal/profile\` — Customer profile and account-claim preview
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
- \`/insights/technical-intelligence-brief\` — Published CEPA Technical Intelligence Brief
- \`/helios\` — Guided routing assistant
- \`/media-credits\` — Website media attribution
- \`/privacy\` — Privacy notice
- \`/terms\` — Website terms and non-binding submission notices
- \`/api/health\` — Liveness endpoint
- \`/api/readiness\` — Operational intake readiness endpoint
- \`/api/leads\` — Contact lead compatibility endpoint
- \`/api/waste\` — Waste opportunity compatibility endpoint
- \`/api/service-requests/submit\` — Service-request intake endpoint
- \`/api/service-requests/status/[token]\` — Public service-request status endpoint
- \`/api/payments/create-checkout\` — Manual-invoice checkout abstraction endpoint
- \`/api/certificates/verify/[token]\` — Certificate verification endpoint
- \`/api/v1/public/leads\` — Versioned public lead intake alias
- \`/api/v1/public/waste-opportunities\` — Versioned public waste-opportunity intake alias
- \`/api/v1/public/service-requests\` — Versioned public service-request intake alias
- \`/api/v1/public/kymnis-interest\` — Versioned KYMNIS interest intake alias
- \`/api/v1/public/helios-events\` — Versioned Helios event capture endpoint
- \`/api/v1/admin/delivery-events\` — Protected delivery queue and dead-letter recovery endpoint
- \`/api/v1/admin/cases\` — Protected portal case workbench endpoint
- \`/api/v1/admin/quotations\` — Protected quotation workbench endpoint
- \`/api/v1/admin/invoices\` — Protected invoice workbench endpoint
- \`/api/v1/admin/payments/reconciliation\` — Protected payment proof reconciliation endpoint
- \`/api/v1/webhooks/*\` — Controlled CRM, email and analytics webhook placeholders

### Required Change-Control Scripts

- \`npm run version:bump -- --patch\`
- \`npm run insights:validate\`
- \`npm run docs:generate\`
- \`npm run docs:check\`
- \`npm run release:audit\`
- \`npm run disclosure:audit\`
- \`npm run routes:check\`
- \`npm run theme:audit\`
- \`npm run runtime:check -- --env-file=/etc/etersolis-web.env\`
- \`npm run migrations:check\`
- \`npm run lead-capture:check -- --env-file=/etc/etersolis-web.env\`
- \`npm run test:backend\`
- \`npm run check\`
- \`npm run launch:check\`
- \`npm run test:smoke\`
- \`npm run test:layout\`
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
