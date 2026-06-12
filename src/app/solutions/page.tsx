import type { Metadata } from 'next';
import { SolutionGrid } from '@/components/sections/SolutionGrid';

export const metadata: Metadata = {
  title: 'EterSolis Solutions | Resource Recovery, Carbon Management and Circular Economy',
  description: 'Resource recovery, waste management, carbon management, circular economy, waste valorization and industrial decarbonization solutions.',
  alternates: { canonical: '/solutions' }
};

export default function SolutionsPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-shell max-w-4xl">
          <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Solutions</p>
          <h1 className="mt-3 text-5xl font-bold text-carbon">Practical resource, waste and carbon solutions.</h1>
          <p className="mt-5 text-lg leading-8 text-coal">
            EterSolis applies disciplined review, controlled documentation and practical commercial reasoning to help organizations reduce waste burdens, recover value and improve operating performance.
          </p>
        </div>
      </section>
      <SolutionGrid />
    </>
  );
}
