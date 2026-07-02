export type ReceivingPaymentInstruction = {
  allocationPercent: number;
  currency: 'ZAR' | 'USD';
  bankName: string;
  accountNumberMasked: string;
  accountNumberConfigured: boolean;
  branchCode?: string;
  swiftCode?: string;
  routingNumberConfigured?: boolean;
};

function maskAccount(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  const tail = value.replace(/\D/g, '').slice(-4);
  return tail ? `••••${tail}` : fallback;
}

export function getReceivingPaymentInstructions(currency?: 'ZAR' | 'USD') {
  const instructions: ReceivingPaymentInstruction[] = [
    {
      allocationPercent: 95,
      currency: 'ZAR',
      bankName: process.env.PAYMENT_ZAR_BANK_NAME ?? 'FirstRand Bank',
      accountNumberMasked: maskAccount(process.env.PAYMENT_ZAR_ACCOUNT_NUMBER, '••••4419'),
      accountNumberConfigured: Boolean(process.env.PAYMENT_ZAR_ACCOUNT_NUMBER),
      branchCode: process.env.PAYMENT_ZAR_BRANCH_CODE ?? '204809',
      swiftCode: process.env.PAYMENT_ZAR_SWIFT_CODE ?? 'FIRNZAJJ'
    },
    {
      allocationPercent: 5,
      currency: 'USD',
      bankName: process.env.PAYMENT_USD_BANK_NAME ?? 'US receiving account',
      accountNumberMasked: maskAccount(process.env.PAYMENT_USD_ACCOUNT_NUMBER, '••••2753'),
      accountNumberConfigured: Boolean(process.env.PAYMENT_USD_ACCOUNT_NUMBER),
      routingNumberConfigured: Boolean(process.env.PAYMENT_USD_ROUTING_NUMBER)
    }
  ];

  return currency ? instructions.filter((instruction) => instruction.currency === currency) : instructions;
}
