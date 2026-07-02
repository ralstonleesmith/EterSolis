import { apiError, apiOk, createRequestId } from '@/lib/api';
import { generateQuotationNumber } from '@/lib/finance';
import { caseReferenceForPreview } from '@/lib/portal';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function GET(request: Request) {
  const requestId = createRequestId(request);
  if (!isAdmin(request)) return apiError('UNAUTHORIZED', 'Unauthorized.', 401, requestId);
  return apiOk({
    quotations: [{
      quotationNumber: generateQuotationNumber(),
      caseReference: caseReferenceForPreview(),
      status: 'draft',
      currency: 'ZAR',
      total: 3450,
      invoiceEligible: false
    }]
  }, requestId);
}
