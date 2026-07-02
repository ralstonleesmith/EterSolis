import { apiError, apiOk, createRequestId } from '@/lib/api';
import { generateInvoiceNumber, paymentReference } from '@/lib/finance';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function GET(request: Request) {
  const requestId = createRequestId(request);
  if (!isAdmin(request)) return apiError('UNAUTHORIZED', 'Unauthorized.', 401, requestId);
  return apiOk({
    queue: [{
      invoiceNumber: generateInvoiceNumber(),
      paymentReference: paymentReference(),
      amount: 3450,
      currency: 'ZAR',
      status: 'proof_submitted',
      action: 'match_bank_ledger_before_receipt'
    }]
  }, requestId);
}
