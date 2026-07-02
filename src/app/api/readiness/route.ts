import { NextResponse } from 'next/server';
import { getLeadCaptureConfigurationStatus, shouldExposeReadinessDetails } from '@/lib/launchReadiness';

export const dynamic = 'force-dynamic';

export async function GET() {
  const report = getLeadCaptureConfigurationStatus();
  const exposeDetails = shouldExposeReadinessDetails();

  const body = {
    status: report.ok ? 'ready' : 'not_ready',
    service: 'etersolis-web',
    timestamp: new Date().toISOString(),
    operationalIntake: {
      ready: report.ok,
      requiredConfigured: report.summary.requiredConfigured,
      requiredValid: report.summary.requiredValid,
      requiredTotal: report.summary.requiredTotal,
      optionalConfigured: report.summary.optionalConfigured,
      postgresFirstRequirements: [
        'schema_migrations',
        'service_requests',
        'outbound_events',
        'rate_limit_counters',
        'admin_actions'
      ],
      deliveryQueue: {
        requiredTable: 'outbound_events',
        retryModel: 'immediate, 1 minute, 5 minutes, 30 minutes, 2 hours'
      },
      details: exposeDetails
        ? {
            missingRequired: report.summary.missingRequired,
            invalidRequired: report.summary.invalidRequired
          }
        : undefined
    }
  };

  return NextResponse.json(body, {
    status: report.ok ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
