import type { PaymentProvider } from '@/lib/payments/provider';
import { getReceivingPaymentInstructions } from '@/lib/paymentInstructions';

export const manualPaymentProvider: PaymentProvider = {
  async createCheckout(input) {
    return {
      provider: 'manual',
      status: 'manual_invoice_required',
      reference: `${input.publicReference}-MANUAL`,
      paymentInstructions: getReceivingPaymentInstructions(input.currency)
    };
  }
};
