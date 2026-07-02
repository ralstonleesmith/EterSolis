import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';

export const metadata: Metadata = { title: 'Admin Receiving | EterSolis' };

export default function AdminReceivingPage() {
  return <PortalAdminConsole eyebrow="Receiving control" title="Inbound material evidence starts the operational record." description="Receiving captures appointment arrival, weights, condition, photos, exceptions and chain-of-custody notes before stockpile or processing decisions." rows={[
    { label: 'Appointments today', value: '2', state: 'Demo-safe operational preview' },
    { label: 'Evidence', value: 'Required', state: 'Photos and receiving notes stay internal' },
    { label: 'Next gate', value: 'Stockpile lot', state: 'Processing cannot begin without lot assignment' }
  ]} />;
}
