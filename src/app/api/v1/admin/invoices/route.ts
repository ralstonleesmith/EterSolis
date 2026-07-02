import { apiError, apiOk, createRequestId } from '@/lib/api';
import { generateInvoiceNumber, paymentReference } from '@/lib/finance';
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
    invoices: [{
      invoiceNumber: generateInvoiceNumber(),
      caseReference: caseReferenceForPreview(),
      status: 'draft',
      currency: 'ZAR',
      balanceDue: 0,
      paymentReference: paymentReference()
    }]
  }, requestId);
}
