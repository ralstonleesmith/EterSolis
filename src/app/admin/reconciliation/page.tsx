import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';

export const metadata: Metadata = { title: 'Admin Payment Reconciliation | EterSolis' };

export default function AdminReconciliationPage() {
  return <PortalAdminConsole eyebrow="Internal payment ledger" title="Proof upload is not payment until it is reconciled." description="Finance users match customer proof against the bank ledger, allocate amounts to invoices, issue receipts, flag short payments and preserve the audit trail." rows={[
    { label: 'Queue', value: '1 proof pending', state: 'Awaiting ledger match' },
    { label: 'Retry path', value: 'Manual recovery', state: 'Unmatched proof remains visible to finance' },
    { label: 'Receipt gate', value: 'Reconciled only', state: 'Receipts are not issued from proof alone' }
  ]} />;
}
