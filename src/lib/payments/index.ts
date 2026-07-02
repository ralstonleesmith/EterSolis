import { manualPaymentProvider } from '@/lib/payments/manual';
import type { PaymentProvider } from '@/lib/payments/provider';

export function getPaymentProvider(): PaymentProvider {
  return manualPaymentProvider;
}
