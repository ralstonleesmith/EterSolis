import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';

export const metadata: Metadata = { title: 'Admin Refunds | EterSolis' };

export default function AdminRefundsPage() {
  return <PortalAdminConsole eyebrow="Refund control" title="Refunds require approval, reason codes and allocation history." description="Refund requests stay tied to their case, invoice, receipt and reconciliation trail so finance can resolve overpayments or cancelled scope cleanly." rows={[
    { label: 'Open refunds', value: '0', state: 'Demo queue is clear' },
    { label: 'Approval', value: 'Finance + admin', state: 'Dual-control policy documented' },
    { label: 'Record', value: 'Permanent', state: 'Refund events remain visible in case history' }
  ]} />;
}
