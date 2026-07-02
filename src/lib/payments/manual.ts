import type { PaymentProvider } from '@/lib/payments/provider';

export const manualPaymentProvider: PaymentProvider = {
  async createCheckout(input) {
    return {
      provider: 'manual',
      status: 'manual_invoice_required',
      reference: `${input.publicReference}-MANUAL`
    };
  }
};
