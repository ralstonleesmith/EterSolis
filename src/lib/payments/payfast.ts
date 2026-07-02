import type { PaymentProvider } from '@/lib/payments/provider';

export const payfastPaymentProvider: PaymentProvider = {
  async createCheckout() {
    throw new Error('PayFast checkout is not configured. Use manual invoice mode until provider credentials are enabled.');
  }
};
