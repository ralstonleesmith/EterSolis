import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';
import { generateInvoiceNumber, paymentReference } from '@/lib/finance';

export const metadata: Metadata = { title: 'Admin Invoices | EterSolis' };

export default function AdminInvoicesPage() {
  return <PortalAdminConsole eyebrow="Invoice control" title="Branded invoices with market-specific bank references." description="Invoices inherit accepted quotation scope and expose EFT references, due dates, balances and receipt status without introducing payment-provider lock-in." rows={[
    { label: 'Draft invoice', value: generateInvoiceNumber(), state: 'Locked until quotation acceptance' },
    { label: 'Payment reference', value: paymentReference(), state: 'Displayed to customers and reconciled internally' },
    { label: 'Currency', value: 'ZAR', state: 'Market layer supports future countries and currencies' }
  ]} />;
}
