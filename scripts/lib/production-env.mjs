import fs from 'node:fs';

const placeholderPattern = /\b(USER|PASSWORD|HOST|DATABASE_NAME|CHANGE_ME|CHANGEME|TODO|REPLACE|EXAMPLE|YOUR_|PLACEHOLDER)\b/i;

export const requiredProductionEnv = [
  { key: 'NEXT_PUBLIC_SITE_URL', area: 'site', validate: isHttpsUrl, help: 'Set to https://etersolis.com for production.' },
  { key: 'DATABASE_URL', area: 'database', validate: isPostgresUrl, help: 'Use a PostgreSQL connection string for the production lead database.' },
  { key: 'IP_HASH_SECRET', area: 'security', validate: (value) => value.length >= 32, help: 'Use a long random value of at least 32 characters.' },
  { key: 'SMTP_HOST', area: 'email', help: 'Use the approved EterSolis SMTP host or transactional mail relay.' },
  { key: 'SMTP_PORT', area: 'email', validate: isPort, help: 'Use 587 for STARTTLS or 465 for implicit TLS.' },
  { key: 'SMTP_USER', area: 'email', help: 'Use the approved authenticated SMTP user.' },
  { key: 'SMTP_PASS', area: 'email', help: 'Use the approved SMTP password or application password.' },
  { key: 'MAIL_FROM', area: 'email', validate: isEmailLike, help: 'Use a verified sender such as EterSolis <no-reply@etersolis.com>.' },
  { key: 'TURNSTILE_SECRET_KEY', area: 'security', help: 'Use the production Cloudflare Turnstile secret key.' },
  { key: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY', area: 'security', help: 'Use the production Cloudflare Turnstile site key.' },
  { key: 'WASTE_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route waste opportunities to the controlled waste inbox.' },
  { key: 'INFO_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route general inquiries to the controlled information inbox.' },
  { key: 'PARTNERSHIPS_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route partnership inquiries to the controlled partnerships inbox.' },
  { key: 'KYMNIS_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route KYMNIS inquiries to the controlled KYMNIS inbox.' },
  { key: 'PRIVACY_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route privacy requests to the controlled privacy inbox.' },
  { key: 'CEO_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route executive inquiries to the controlled executive inbox.' },
  { key: 'CSO_ROUTE_EMAIL', area: 'routing', validate: isEmailLike, help: 'Route scientific and technical inquiries to the controlled CSO inbox.' }
];

export const optionalProductionEnv = [
  { key: 'CRM_WEBHOOK_URL', area: 'crm' },
  { key: 'CRM_WEBHOOK_SECRET', area: 'crm' },
  { key: 'ANALYTICS_WEBHOOK_URL', area: 'analytics' },
  { key: 'ANALYTICS_WEBHOOK_SECRET', area: 'analytics' },
  { key: 'NEXT_PUBLIC_GA4_MEASUREMENT_ID', area: 'analytics' },
  { key: 'READINESS_EXPOSE_DETAILS', area: 'operations' }
];

function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isPostgresUrl(value) {
  return /^postgres(ql)?:\/\//.test(value);
}

function isEmailLike(value) {
  return /@/.test(value);
}

function isPort(value) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 && port <= 65535;
}

function hasUsableValue(value) {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !placeholderPattern.test(trimmed);
}

export function loadEnvFile(filePath, target = process.env) {
  if (!filePath) return { loaded: false, path: undefined, count: 0 };
  if (!fs.existsSync(filePath)) {
    throw new Error(`Environment file was not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = value;
      count += 1;
    }
  }

  return { loaded: true, path: filePath, count };
}

export function validateProductionEnv(env = process.env) {
  const failures = [];
  const warnings = [];

  for (const item of requiredProductionEnv) {
    const value = env[item.key];
    if (!hasUsableValue(value)) {
      failures.push({ key: item.key, area: item.area, reason: 'missing-or-placeholder', help: item.help });
      continue;
    }

    if (item.validate && !item.validate(value.trim())) {
      failures.push({ key: item.key, area: item.area, reason: 'invalid-format', help: item.help });
    }
  }

  for (const item of optionalProductionEnv) {
    const value = env[item.key];
    if (value && placeholderPattern.test(value)) {
      warnings.push({ key: item.key, area: item.area, reason: 'placeholder-value' });
    }
  }

  const requiredConfigured = requiredProductionEnv.length - failures.filter((failure) => failure.reason === 'missing-or-placeholder').length;

  return {
    ok: failures.length === 0,
    failures,
    warnings,
    summary: {
      requiredTotal: requiredProductionEnv.length,
      requiredConfigured,
      requiredValid: requiredProductionEnv.length - failures.length,
      optionalConfigured: optionalProductionEnv.filter((item) => hasUsableValue(env[item.key])).length
    }
  };
}

export function getEnvFileFromArgs(args = process.argv.slice(2)) {
  const value = args.find((arg) => arg.startsWith('--env-file='));
  return value ? value.slice('--env-file='.length) : process.env.ETER_SOLIS_ENV_FILE;
}
