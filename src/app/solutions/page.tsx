import type { Metadata } from 'next';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { WastewaterTreatmentFeature } from '@/components/sections/WastewaterTreatmentFeature';
import { ReviewPrinciples } from '@/components/sections/ReviewPrinciples';
import { PageHero } from '@/components/ui/PageHero';
import { mediaAssets } from '@/lib/media';

export const metadata: Metadata = {
  title: 'EterSolis Solutions | Resource Recovery, Waste, Carbon and Circular Services',
  description: 'Resource recovery, waste management, carbon management, circular economy, waste valorization, certificates, repurpose, destruction and industrial sustainability services.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    images: [{ url: '/media/og/etersolis-solutions-og.png', width: 1600, height: 900, alt: mediaAssets.hero.alt }]
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
        imageSrc={mediaAssets.hero.src}
        imageAlt={mediaAssets.hero.alt}
      />
      <ReviewPrinciples compact />
      <SolutionGrid />
      <WastewaterTreatmentFeature />
    </>
  );
}
