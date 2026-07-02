import type { PaymentProvider } from '@/lib/payments/provider';

export const stripePaymentProvider: PaymentProvider = {
  async createCheckout() {
    throw new Error('Stripe checkout is not configured. Use manual invoice mode until provider credentials are enabled.');
  }
};
