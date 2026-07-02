export type PaymentType =
  | 'assessment_fee'
  | 'pickup_deposit'
  | 'pickup_fee'
  | 'delivery_processing_fee'
  | 'certificate_fee'
  | 'priority_review_fee'
  | 'recurring_setup_fee'
  | 'manual_invoice';

export type CreateCheckoutInput = {
  serviceRequestId: string;
  publicReference: string;
  customerEmail: string;
  paymentType: PaymentType;
  amount: number;
  currency: 'ZAR' | 'USD';
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
};

export type CheckoutResult = {
  provider: 'manual' | 'stripe' | 'payfast';
  status: 'manual_invoice_required' | 'created';
  checkoutUrl?: string;
  reference: string;
};
