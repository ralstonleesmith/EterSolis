import type { Metadata } from 'next';
import { CommercialTable } from '../invoices/table';

export const metadata: Metadata = { title: 'Portal Profile | EterSolis' };

export default function PortalProfilePage() {
  return <CommercialTable title="Profile" eyebrow="Account-ready" rows={[['Guest access', 'Secure public token', 'Available now'], ['Registered account', 'Email and Google sign-in', 'Planned implementation'], ['Case claim', 'Email verification and audit log', 'Planned implementation']]} columns={['Mode', 'Identity control', 'State']} note="The portal remains guest-capable while preparing for registered users, Google sign-in and case claiming." />;
}
