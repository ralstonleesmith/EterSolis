#!/usr/bin/env node
import { getEnvFileFromArgs, loadEnvFile, validateProductionEnv } from './lib/production-env.mjs';

const args = process.argv.slice(2);
const envFile = getEnvFileFromArgs(args);
const skipSmtp = args.includes('--skip-smtp');

async function checkDatabase() {
  const pgModule = await import('pg');
  const { Pool } = pgModule.default ?? pgModule;
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 5000
  });

  try {
    await pool.query('select 1');
    const tables = await pool.query(
      `select
        to_regclass('public.lead_submissions') as lead_submissions,
        to_regclass('public.waste_opportunities') as waste_opportunities,
        to_regclass('public.audit_events') as audit_events`
    );
    const row = tables.rows[0] ?? {};
    const missing = ['lead_submissions', 'waste_opportunities', 'audit_events'].filter((key) => !row[key]);
    if (missing.length) {
      throw new Error(`Missing database tables: ${missing.join(', ')}`);
    }
    console.log('Database connectivity and table check passed.');
  } finally {
    await pool.end();
  }
}

async function checkSmtp() {
  const nodemailerModule = await import('nodemailer');
  const nodemailer = nodemailerModule.default ?? nodemailerModule;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transport.verify();
  console.log('SMTP connectivity check passed.');
}

try {
  const loaded = loadEnvFile(envFile);
  if (loaded.loaded) console.log(`Loaded runtime file with ${loaded.count} values: ${loaded.path}`);

  const envReport = validateProductionEnv();
  if (!envReport.ok) {
    console.error('Lead capture check stopped because runtime configuration is incomplete.');
    for (const failure of envReport.failures) {
      console.error(`- ${failure.key} [${failure.area}]: ${failure.reason}. ${failure.help ?? ''}`.trim());
    }
    process.exit(1);
  }

  await checkDatabase();
  if (!skipSmtp) await checkSmtp();

  console.log('Lead capture operational check passed.');
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Unknown operational intake compatibility check failure.');
  process.exit(1);
}
