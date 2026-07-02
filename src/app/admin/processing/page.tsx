import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';

export const metadata: Metadata = { title: 'Admin Processing | EterSolis' };

export default function AdminProcessingPage() {
  return <PortalAdminConsole eyebrow="Processing control" title="Processing batches turn received material into disposition evidence." description="Operators record repurpose, recovery, destruction or disposal outcomes with input/output summaries before closure or certificate approval." rows={[
    { label: 'Planned batches', value: '2', state: 'Demo operational queue' },
    { label: 'Disposition', value: 'Required', state: 'Certificate decision depends on approved evidence' },
    { label: 'Closure gate', value: 'Audit complete', state: 'Case closure requires commercial and operational completion' }
  ]} />;
}
