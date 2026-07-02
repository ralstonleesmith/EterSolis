import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';
import { caseReferenceForPreview } from '@/lib/portal';

export const metadata: Metadata = { title: 'Admin Cases | EterSolis' };

export default function AdminCasesPage() {
  return (
    <PortalAdminConsole
      eyebrow="Admin case workbench"
      title="Case control from guest intake to operational closure."
      description="The admin case console keeps the permanent reference, QR trail, commercial gates, file evidence, scheduling, receiving, processing and audit history together."
      rows={[
        { label: 'Demo case', value: caseReferenceForPreview(), state: 'Technical and commercial review' },
        { label: 'Market', value: 'South Africa / ZAR', state: 'Global-ready market layer' },
        { label: 'Commercial gate', value: 'Quote required', state: 'No payment before accepted quote and issued invoice' },
        { label: 'Files', value: '5 evidence slots', state: 'Photos, SDS, proof of payment, receiving and certificate evidence' },
        { label: 'Audit', value: '12 lifecycle stages', state: 'Every admin action must create a case event' },
        { label: 'Access', value: 'SSO/RBAC prepared', state: 'Shared-secret admin remains a compatibility MVP control' }
      ]}
    />
  );
}
