type EnvironmentValueMap = Record<string, string | undefined>;

type Requirement = {
  key: string;
  area: 'site' | 'security' | 'database' | 'email' | 'routing' | 'analytics' | 'crm' | 'operations';
  required: boolean;
  description: string;
  validate?: (value: string) => boolean;
};

const placeholderPattern = /\b(USER|PASSWORD|HOST|DATABASE_NAME|CHANGE_ME|CHANGEME|TODO|REPLACE|EXAMPLE|YOUR_|PLACEHOLDER)\b/i;

function hasUsableValue(value: string | undefined) {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !placeholderPattern.test(trimmed);
}

function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isPostgresUrl(value: string) {
  return /^postgres(ql)?:\/\//.test(value);
}

function isEmailLike(value: string) {
  return /@/.test(value);
}

function isPort(value: string) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 && port <= 65535;
}

const requirements: Requirement[] = [
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    area: 'site',
    required: true,
    description: 'Canonical public website URL used in public metadata and route generation.',
    validate: isHttpsUrl
  },
  {
    key: 'DATABASE_URL',
    area: 'database',
    required: true,
    description: 'PostgreSQL connection string for lead storage, waste opportunities and audit records.',
    validate: isPostgresUrl
  },
  {
    key: 'IP_HASH_SECRET',
    area: 'security',
    required: true,
    description: 'Long HMAC secret used to hash client IP addresses without storing raw IPs.',
    validate: (value) => value.length >= 32
  },
  {
    key: 'SMTP_HOST',
    area: 'email',
    required: true,
    description: 'SMTP host used to send internal lead notifications and submitter confirmations.'
  },
  {
    key: 'SMTP_PORT',
    area: 'email',
    required: true,
    description: 'SMTP port. Use 587 for STARTTLS or 465 for implicit TLS.',
    validate: isPort
  },
  {
    key: 'SMTP_USER',
    area: 'email',
    required: true,
    description: 'SMTP username for authenticated outbound mail.'
  },
  {
    key: 'SMTP_PASS',
    area: 'email',
    required: true,
    description: 'SMTP password or application password for outbound mail.'
  },
  {
    key: 'MAIL_FROM',
    area: 'email',
    required: true,
    description: 'Verified sender identity for EterSolis lead-capture email.',
    validate: isEmailLike
  },
  {
    key: 'TURNSTILE_SECRET_KEY',
    area: 'security',
    required: true,
    description: 'Cloudflare Turnstile secret key required by production form verification.'
  },
  {
    key: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
    area: 'security',
    required: true,
    description: 'Public Cloudflare Turnstile site key rendered in production forms.'
  },
  {
    key: 'WASTE_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for waste opportunity submissions.',
    validate: isEmailLike
  },
  {
    key: 'INFO_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for general EterSolis inquiries.',
    validate: isEmailLike
  },
  {
    key: 'PARTNERSHIPS_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for partnership inquiries.',
    validate: isEmailLike
  },
  {
    key: 'KYMNIS_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for KYMNIS platform inquiries.',
    validate: isEmailLike
  },
  {
    key: 'PRIVACY_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for privacy requests.',
    validate: isEmailLike
  },
  {
    key: 'CEO_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for executive inquiries.',
    validate: isEmailLike
  },
  {
    key: 'CSO_ROUTE_EMAIL',
    area: 'routing',
    required: true,
    description: 'Destination inbox for scientific and technical inquiries.',
    validate: isEmailLike
  },
  {
    key: 'CRM_WEBHOOK_URL',
    area: 'crm',
    required: false,
    description: 'Optional CRM webhook destination for replicated lead records.'
  },
  {
    key: 'CRM_WEBHOOK_SECRET',
    area: 'crm',
    required: false,
    description: 'Optional bearer token for CRM webhook delivery.'
  },
  {
    key: 'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
    area: 'analytics',
    required: false,
    description: 'Optional GA4 measurement ID for public analytics.'
  },
  {
    key: 'ANALYTICS_WEBHOOK_URL',
    area: 'analytics',
    required: false,
    description: 'Optional analytics webhook destination for server-side operational events.'
  },
  {
    key: 'ANALYTICS_WEBHOOK_SECRET',
    area: 'analytics',
    required: false,
    description: 'Optional bearer token or shared secret for analytics webhook delivery.'
  },
  {
    key: 'READINESS_EXPOSE_DETAILS',
    area: 'operations',
    required: false,
    description: 'Optional flag for exposing non-secret readiness details from /api/readiness.'
  }
];

export function getLeadCaptureRequirements() {
  return requirements.map((requirement) => ({ ...requirement }));
}

export function getLeadCaptureConfigurationStatus(env: EnvironmentValueMap = process.env) {
  const checks = requirements.map((requirement) => {
    const value = env[requirement.key];
    const configured = hasUsableValue(value);
    const valid = configured && (!requirement.validate || requirement.validate(value!.trim()));

    return {
      key: requirement.key,
      area: requirement.area,
      required: requirement.required,
      configured,
      valid,
      description: requirement.description
    };
  });

  const requiredChecks = checks.filter((check) => check.required);
  const missingRequired = requiredChecks.filter((check) => !check.configured);
  const invalidRequired = requiredChecks.filter((check) => check.configured && !check.valid);
  const optionalConfigured = checks.filter((check) => !check.required && check.configured).length;

  return {
    ok: missingRequired.length === 0 && invalidRequired.length === 0,
    checks,
    summary: {
      requiredTotal: requiredChecks.length,
      requiredConfigured: requiredChecks.length - missingRequired.length,
      requiredValid: requiredChecks.length - missingRequired.length - invalidRequired.length,
      missingRequired: missingRequired.map((check) => check.key),
      invalidRequired: invalidRequired.map((check) => check.key),
      optionalConfigured
    }
  };
}

export function shouldExposeReadinessDetails(env: EnvironmentValueMap = process.env) {
  return env.READINESS_EXPOSE_DETAILS === 'true' || env.NODE_ENV !== 'production';
}
