import { NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.serviceRequestId || !body.publicReference || !body.customerEmail) {
    return NextResponse.json({ error: 'Missing checkout fields.' }, { status: 400 });
  }

  const checkout = await getPaymentProvider().createCheckout({
    serviceRequestId: String(body.serviceRequestId),
    publicReference: String(body.publicReference),
    customerEmail: String(body.customerEmail),
    paymentType: body.paymentType ?? 'manual_invoice',
    amount: Number(body.amount ?? 0),
    currency: body.currency === 'USD' ? 'USD' : 'ZAR',
    successUrl: String(body.successUrl ?? ''),
    cancelUrl: String(body.cancelUrl ?? ''),
    metadata: body.metadata ?? {}
  });

  return NextResponse.json({ ok: true, checkout });
}
