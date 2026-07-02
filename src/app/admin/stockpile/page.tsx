import type { Metadata } from 'next';
import { PortalAdminConsole } from '@/components/admin/PortalAdminConsole';

export const metadata: Metadata = { title: 'Admin Stockpile | EterSolis' };

export default function AdminStockpilePage() {
  return <PortalAdminConsole eyebrow="Stockpile control" title="Lots connect received material to processing and certificates." description="Stockpile records preserve material identity, location, quantity, status and linkage to processing batches or final disposition." rows={[
    { label: 'Open lots', value: '3', state: 'Awaiting process route decision' },
    { label: 'Location', value: 'Controlled', state: 'Sensitive logistics are excluded from public views' },
    { label: 'Certificate link', value: 'Evidence based', state: 'Certificate cannot issue without lot/disposition proof' }
  ]} />;
}
