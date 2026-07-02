import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const migrationDir = path.resolve('database/migrations');
const requiredTables = [
  'schema_migrations',
  'customers',
  'customer_contacts',
  'customer_sites',
  'service_requests',
  'material_profiles',
  'risk_assessments',
  'outbound_events',
  'rate_limit_counters',
  'admin_users',
  'roles',
  'documents',
  'scoring_events',
  'kymnis_accounts',
  'consent_records',
  'access_logs'
];

const files = fs.readdirSync(migrationDir).filter((file) => /^000\d+_.+\.sql$/.test(file)).sort();
assert.deepEqual(files, [
  '0001_current_baseline.sql',
  '0002_operational_entities.sql',
  '0003_delivery_queue.sql',
  '0004_admin_auth_rbac.sql',
  '0005_documents_and_storage.sql',
  '0006_scoring_and_sla.sql',
  '0007_kymnis_internal.sql',
  '0008_governance_retention.sql'
], 'numbered migration files must be present in order');

for (const file of files) {
  const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8');
  assert.match(sql, /schema_migrations|insert into schema_migrations/i, `${file} must register in schema_migrations`);
}

if (!process.env.DATABASE_URL) {
  console.log('migration file check passed; DATABASE_URL not set, skipped live table verification');
  process.exit(0);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
try {
  const result = await pool.query(
    `select table_name
       from information_schema.tables
      where table_schema = 'public'
        and table_name = any($1::text[])`,
    [requiredTables]
  );
  const present = new Set(result.rows.map((row) => row.table_name));
  const missing = requiredTables.filter((table) => !present.has(table));
  assert.deepEqual(missing, [], `missing required operational tables: ${missing.join(', ')}`);
  console.log('migration live table check passed');
} finally {
  await pool.end();
}
