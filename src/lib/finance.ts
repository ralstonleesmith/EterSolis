import { caseReferenceForPreview } from '@/lib/portal';

export const defaultMarket = {
  code: 'ZA',
  country: 'South Africa',
  currency: 'ZAR',
  timezone: 'Africa/Johannesburg',
  paymentMethod: 'internal_eft'
} as const;

export type CommercialLine = {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
};

export function generateQuotationNumber(reference = caseReferenceForPreview()) {
  return reference.replace('CASE', 'Q');
}

export function generateInvoiceNumber(reference = caseReferenceForPreview()) {
  return reference.replace('CASE', 'INV');
}

export function generateReceiptNumber(reference = caseReferenceForPreview()) {
  return reference.replace('CASE', 'RCPT');
}

export function paymentReference(reference = caseReferenceForPreview()) {
  return `${reference}-EFT`;
}

export function calculateLineTotals(lines: CommercialLine[]) {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  const taxTotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice * (line.taxRate ?? 0), 0);
  return {
    subtotal: roundMoney(subtotal),
    taxTotal: roundMoney(taxTotal),
    total: roundMoney(subtotal + taxTotal)
  };
}

export function quoteToInvoiceGate(status: string) {
  return status === 'accepted';
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}
