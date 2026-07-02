import type { CheckoutResult, CreateCheckoutInput } from '@/lib/payments/types';

export type PaymentProvider = {
  createCheckout: (input: CreateCheckoutInput) => Promise<CheckoutResult>;
};
