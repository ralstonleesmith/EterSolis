import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';
import { generateQuotationNumber } from '@/lib/finance';

export const metadata: Metadata = { title: 'Admin Quotations | EterSolis' };

export default function AdminQuotationsPage() {
  return <PortalAdminConsole eyebrow="Commercial control" title="Quotation before invoice, payment or scheduling." description="Commercial reviewers define scope, assumptions, exclusions, validity, tax, currency, internal approvals and customer acceptance before any invoice is issued." rows={[
    { label: 'Draft quotation', value: generateQuotationNumber(), state: 'Awaiting reviewer approval' },
    { label: 'Acceptance gate', value: 'Required', state: 'Invoice generation remains blocked until acceptance' },
    { label: 'Validity', value: '14 days', state: 'Renewal creates a new audit event' }
  ]} />;
}
