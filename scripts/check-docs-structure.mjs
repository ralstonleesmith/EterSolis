import assert from 'node:assert/strict';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const rootReadme = fs.readFileSync('README.md', 'utf8');
const docsIndex = fs.readFileSync('docs/README.md', 'utf8');
const companyTruth = fs.readFileSync('docs/COMPANY_SOURCE_OF_TRUTH.md', 'utf8');
const governance = fs.readFileSync('docs/DOCUMENTATION_GOVERNANCE.md', 'utf8');

assert.match(rootReadme, new RegExp(`\\*\\*Version:\\*\\* ${pkg.version}`), 'root README must show the package version');
assert.match(rootReadme, /docs\/README\.md/, 'root README must link to the documentation index');

for (const required of [
  'COMPANY_SOURCE_OF_TRUTH.md',
  'WEBSITE_CODEBASE_SOP.md',
  'BACKEND_ARCHITECTURE.md',
  'API_STANDARD.md',
  'DATABASE_MIGRATIONS.md',
  'USER_PORTAL_SOP.md',
  'ADMIN_PORTAL_SOP.md',
  'CASE_LIFECYCLE_SOP.md',
  'QUOTATION_SOP.md',
  'INVOICE_SOP.md',
  'PAYMENT_RECONCILIATION_SOP.md',
  'PAYMENT_BANK_CONFIGURATION.md',
  'FILE_UPLOAD_SECURITY_SOP.md',
  'SCHEDULING_SOP.md',
  'RECEIVING_SOP.md',
  'STOCKPILE_SOP.md',
  'PROCESSING_SOP.md',
  'CERTIFICATE_SOP.md',
  'TESTING_SOP.md',
  'DEPLOYMENT_RUNBOOK.md',
  'ROLLBACK_RUNBOOK.md'
]) {
  assert.match(docsIndex, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `docs index must link ${required}`);
}

for (const phrase of [
  'waste and carbon management company',
  'Wastewater is one supported capability',
  'customer-paid service',
  'case reference and QR',
  'PostgreSQL is the first persistence layer',
  'must never expose internal notes'
]) {
  assert.match(companyTruth, new RegExp(phrase, 'i'), `company source of truth must cover: ${phrase}`);
}

assert.match(governance, /Documentation in this repository is part of the product/, 'documentation governance must define the documentation standard');
assert.match(docsIndex, /Historical Or Supporting Records/, 'docs index must separate historical records from current SOPs');

console.log('documentation structure check passed');
