import type { Metadata } from 'next';
import { HeliosPanel } from '@/components/helios/HeliosPanel';

export const metadata: Metadata = {
  title: 'Helios | EterSolis Guided Assistant',
  description: 'Helios v0 routes EterSolis inquiries to the correct next step using controlled guided flows.',
  alternates: { canonical: '/helios' }
};

export default function HeliosPage() {
  return <HeliosPanel />;
}
