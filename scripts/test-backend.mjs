import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function file(relativePath) {
  const fullPath = path.join(root, relativePath);
  assert.equal(existsSync(fullPath), true, `${relativePath} must exist`);
  return readFileSync(fullPath, 'utf8');
}

const apiResponse = file('src/lib/api/response.ts');
assert.match(apiResponse, /ok: boolean/, 'API envelope must include ok');
assert.match(apiResponse, /requestId: string/, 'API envelope must include requestId');
assert.match(apiResponse, /data: Data \| null/, 'API envelope must include data');
assert.match(apiResponse, /error: \{ code: ApiErrorCode; message: string \} \| null/, 'API envelope must include error');

const request = file('src/lib/api/request.ts');
assert.match(request, /x-request-id/, 'request helper must accept x-request-id');
assert.match(request, /idempotencyKey/, 'request helper must provide idempotency keys');

const rateLimit = file('src/lib/api/rateLimit.ts');
assert.match(rateLimit, /rate_limit_counters/, 'rate limiter must use Postgres counters in production');
assert.match(rateLimit, /publicLead/, 'route-specific public lead policy must exist');
assert.match(rateLimit, /heliosEvents/, 'route-specific Helios policy must exist');

const requiredRoutes = [
  'src/app/api/v1/public/leads/route.ts',
  'src/app/api/v1/public/waste-opportunities/route.ts',
  'src/app/api/v1/public/service-requests/route.ts',
  'src/app/api/v1/public/kymnis-interest/route.ts',
  'src/app/api/v1/public/helios-events/route.ts',
  'src/app/api/v1/admin/delivery-events/route.ts',
  'src/app/api/v1/webhooks/crm/route.ts',
  'src/app/api/v1/webhooks/email/route.ts',
  'src/app/api/v1/webhooks/analytics/route.ts'
];
for (const route of requiredRoutes) file(route);

for (const migration of [
  'database/migrations/0001_current_baseline.sql',
  'database/migrations/0002_operational_entities.sql',
  'database/migrations/0003_delivery_queue.sql',
  'database/migrations/0004_admin_auth_rbac.sql',
  'database/migrations/0005_documents_and_storage.sql',
  'database/migrations/0006_scoring_and_sla.sql',
  'database/migrations/0007_kymnis_internal.sql',
  'database/migrations/0008_governance_retention.sql'
]) {
  const sql = file(migration);
  assert.match(sql, /schema_migrations|insert into schema_migrations/i, `${migration} must participate in migration registry`);
}

const queueMigration = file('database/migrations/0003_delivery_queue.sql');
for (const table of ['outbound_events', 'webhook_deliveries', 'crm_sync_records', 'email_delivery_records', 'rate_limit_counters']) {
  assert.match(queueMigration, new RegExp(table), `delivery migration must include ${table}`);
}

const rbacMigration = file('database/migrations/0004_admin_auth_rbac.sql');
for (const role of ['super_admin', 'executive', 'commercial_manager', 'technical_reviewer', 'operations_reviewer', 'kymnis_reviewer', 'privacy_officer', 'read_only_auditor']) {
  assert.match(rbacMigration, new RegExp(role), `RBAC migration must include ${role}`);
}

const reader = file('src/components/technical-brief/TechnicalBriefReader.tsx');
assert.match(reader, /onTouchStart/, 'reader must support swipe start');
assert.match(reader, /onTouchEnd/, 'reader must support swipe end');
assert.match(reader, /ArrowLeft/, 'reader must support keyboard/previous controls');
assert.match(reader, /ArrowRight/, 'reader must support keyboard/next controls');
assert.doesNotMatch(reader, /setInterval|setTimeout\(/, 'reader must not auto-advance pages');

console.log('backend contract tests passed');
