import type { Metadata } from 'next';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { WastewaterTreatmentFeature } from '@/components/sections/WastewaterTreatmentFeature';
import { ReviewPrinciples } from '@/components/sections/ReviewPrinciples';
import { PageHero } from '@/components/ui/PageHero';
import { mediaAssets } from '@/lib/media';

export const metadata: Metadata = {
  title: 'EterSolis Solutions | Resource Recovery, Wastewater Treatment and Carbon Management',
  description: 'Resource recovery, waste management, wastewater treatment review, carbon management, circular economy, waste valorization and industrial decarbonization solutions.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    images: [{ url: '/media/og/etersolis-solutions-og.png', width: 1600, height: 900, alt: mediaAssets.wastewater.hero.alt }]
  },
  twitter: { images: ['/media/og/etersolis-solutions-og.png'] }
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Practical resource, waste and carbon solutions."
        description="EterSolis applies disciplined review, controlled documentation and practical commercial reasoning to help organizations reduce waste burdens, recover value and improve operating performance."
        imageSrc={mediaAssets.wastewater.hero.src}
        imageAlt={mediaAssets.wastewater.hero.alt}
      />
      <WastewaterTreatmentFeature />
      <ReviewPrinciples compact />
      <SolutionGrid />
    </>
  );
}
