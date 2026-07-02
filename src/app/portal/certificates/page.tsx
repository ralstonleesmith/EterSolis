import type { Metadata } from 'next';
import { CommercialTable } from '../invoices/table';

export const metadata: Metadata = { title: 'Portal Certificates | EterSolis' };

export default function PortalCertificatesPage() {
  return <CommercialTable title="Certificates" eyebrow="Controlled issue" rows={[['Certificate of Repurpose', 'Evidence required', 'Pending', 'Receiving and disposition approval'], ['Certificate of Destruction', 'Evidence required', 'Pending', 'Processing and audit approval']]} columns={['Certificate', 'Requirement', 'Status', 'Gate']} note="Certificates are only issued after receiving, disposition evidence, approval, certificate number, verification hash and audit event exist." />;
}
