import { apiError, apiOk, createRequestId } from '@/lib/api';
import { caseReferenceForPreview, portalStages } from '@/lib/portal';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function GET(request: Request) {
  const requestId = createRequestId(request);
  if (!isAdmin(request)) return apiError('UNAUTHORIZED', 'Unauthorized.', 401, requestId);
  return apiOk({
    cases: [{
      publicReference: caseReferenceForPreview(),
      market: 'ZA',
      currency: 'ZAR',
      status: 'technical_review',
      commercialStatus: 'quotation_required',
      paymentStatus: 'not_invoiced',
      currentStage: portalStages[1]
    }]
  }, requestId);
}
