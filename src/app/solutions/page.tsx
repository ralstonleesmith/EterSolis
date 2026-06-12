import type { Metadata } from 'next';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'EterSolis Solutions | Resource Recovery, Carbon Management and Circular Economy',
  description: 'Resource recovery, waste management, carbon management, circular economy, waste valorization and industrial decarbonization solutions.',
  alternates: { canonical: '/solutions' }
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Practical resource, waste and carbon solutions."
        description="EterSolis applies disciplined review, controlled documentation and practical commercial reasoning to help organizations reduce waste burdens, recover value and improve operating performance."
      />
      <SolutionGrid />
    </>
  );
}
