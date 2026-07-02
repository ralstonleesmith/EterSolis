import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';

export const metadata: Metadata = { title: 'Admin Audit | EterSolis' };

export default function AdminAuditPage() {
  return <PortalAdminConsole eyebrow="Audit and access logs" title="Every sensitive action must leave a durable trail." description="Audit views cover case actions, quotation approvals, invoice issuance, payment reconciliation, file access, certificate issuance, exports and failed automation." rows={[
    { label: 'Case events', value: 'Permanent', state: 'Request IDs and actor IDs are preserved' },
    { label: 'Access logs', value: 'Sensitive views', state: 'CSV/export activity is logged' },
    { label: 'Recovery', value: 'Dead-letter visible', state: 'Failed delivery events can be retried or resolved' }
  ]} />;
}
