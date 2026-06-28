import type { Metadata } from 'next';
import { HeliosPanel } from '@/components/helios/HeliosPanel';
import { mediaAssets } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Helios | EterSolis Guided Inquiry Routing',
  description: 'Helios v2 routes EterSolis and KYMNIS inquiries to the correct next step using controlled guided flows.',
  alternates: { canonical: '/helios' },
  openGraph: {
    images: [{ url: '/media/og/etersolis-helios-og.png', width: 1600, height: 900, alt: mediaAssets.wastewater.hero.alt }]
  },
  twitter: { images: ['/media/og/etersolis-helios-og.png'] }
};

export default function HeliosPage() {
  return (
    <>
      <HeliosPanel context="all" />
      <HeliosPanel mode="kymnis" context="all" compact backgroundStyle="plain" />
    </>
  );
}
