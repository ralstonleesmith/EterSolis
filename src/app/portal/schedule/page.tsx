import type { Metadata } from 'next';
import { CommercialTable } from '../invoices/table';

export const metadata: Metadata = { title: 'Portal Schedule | EterSolis' };

export default function PortalSchedulePage() {
  return <CommercialTable title="Schedule" eyebrow="Pickup and delivery" rows={[['Pickup request', 'Eligibility pending', 'No slot proposed', 'Payment and risk gates required'], ['Delivery request', 'Awaiting instructions', 'No appointment', 'Written receiving instructions required']]} columns={['Type', 'Eligibility', 'Appointment', 'Gate']} note="No pickup or delivery proceeds until review, quotation/invoice/payment gates and written instructions are complete." />;
}
