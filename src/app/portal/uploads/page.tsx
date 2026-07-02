import type { Metadata } from 'next';
import { CommercialTable } from '../invoices/table';

export const metadata: Metadata = { title: 'Portal Uploads | EterSolis' };

export default function PortalUploadsPage() {
  return <CommercialTable title="Uploads" eyebrow="Controlled files" rows={[['Material photo', 'Case file', 'Scan pending', 'Visible to review team'], ['Proof of payment', 'Payment proof', 'Under review', 'Finance queue']]} columns={['File', 'Category', 'Status', 'Access']} note="Uploads are case-linked, private by default and governed by scan, review, approval and audit states." />;
}
