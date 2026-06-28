#!/usr/bin/env node
import { getEnvFileFromArgs, loadEnvFile, validateProductionEnv } from './lib/production-env.mjs';

const envFile = getEnvFileFromArgs();

try {
  const loaded = loadEnvFile(envFile);
  if (loaded.loaded) console.log(`Loaded runtime file with ${loaded.count} values: ${loaded.path}`);

  const report = validateProductionEnv();

  for (const failure of report.failures) {
    console.error(`- ${failure.key} [${failure.area}]: ${failure.reason}. ${failure.help ?? ''}`.trim());
  }

  for (const warning of report.warnings) {
    console.warn(`- ${warning.key} [${warning.area}]: ${warning.reason}`);
  }

  if (!report.ok) process.exit(1);

  console.log('Runtime configuration check passed.');
  console.log(`Required variables valid: ${report.summary.requiredValid}/${report.summary.requiredTotal}`);
  console.log(`Optional variables configured: ${report.summary.optionalConfigured}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Unknown runtime configuration check failure.');
  process.exit(1);
}
