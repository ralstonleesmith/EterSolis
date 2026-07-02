import type { Metadata } from 'next';
import { CommercialTable } from './table';

export const metadata: Metadata = { title: 'Portal Invoices | EterSolis' };

export default function PortalInvoicesPage() {
  return <CommercialTable title="Invoices" eyebrow="Payment document" rows={[['ES-INV-DEMO-0001', 'ES-Q-DEMO-0001', 'ES-CASE-DEMO-0001-INV-0001', 'Payment pending']]} columns={['Invoice', 'Quotation', 'Payment reference', 'Status']} note="Invoices are issued after quotation approval or acceptance unless an audited fixed-fee exception applies." />;
}
