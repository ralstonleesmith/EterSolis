import type { Metadata } from 'next';
import { CommercialTable } from '../invoices/table';

export const metadata: Metadata = { title: 'Portal Payments | EterSolis' };

export default function PortalPaymentsPage() {
  return <CommercialTable title="Payments" eyebrow="Internal ledger" rows={[['POP-DEMO-0001', 'ES-INV-DEMO-0001', 'ZAR 3,450.00', 'Reconciliation pending']]} columns={['Proof', 'Invoice', 'Amount', 'Status']} note="EFT proof uploads, reconciliation decisions, receipts, overpayments and refunds remain inside the case ledger." />;
}
