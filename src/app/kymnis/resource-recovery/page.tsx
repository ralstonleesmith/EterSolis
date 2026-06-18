import type { Metadata } from 'next';
import { Droplets, Leaf, Recycle } from 'lucide-react';
import { KymnisHero } from '@/components/kymnis/KymnisHero';
import { KymnisNav } from '@/components/kymnis/KymnisNav';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';

const recoveryAreas = [
  { icon: Recycle, title: 'Material value', description: 'Identify recoverable streams, by-products and reuse potential for qualified EterSolis or partner review.' },
  { icon: Droplets, title: 'Water value', description: 'Surface water recovery and wastewater-linked opportunities without issuing treatment or handling instructions.' },
  { icon: Leaf, title: 'Impact value', description: 'Connect recovery pathways to measurable improvement, avoided loss and responsible benefit.' }
] as const;

const collectionFlow = [
  'Open Resource Collection',
  'Choose Green Bag or Red Bag',
  'Scan the QR code',
  'Record location, weight and resource type'
] as const;

export const metadata: Metadata = {
  title: 'KYMNIS Resource Recovery | From Impact to Recoverable Value',
  description: 'KYMNIS routes resource recovery opportunities toward structured review and measurable environmental improvement.',
  alternates: { canonical: '/kymnis/resource-recovery' }
};

export default function KymnisResourceRecoveryPage() {
  return (
    <>
      <KymnisHero
        eyebrow="KYMNIS recovery"
        title="Resource collection should be as simple as reporting an impact."
        description="KYMNIS connects recoverable resources, hazardous-resource handling pathways and local collection points to measurable environmental improvement."
      />
      <KymnisNav active="/kymnis/resource-recovery" />
      <section className="section-padding">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {recoveryAreas.map(({ icon: Icon, title, description }) => (
            <article key={title} className="card-hover rounded-3xl border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Icon className="h-7 w-7 text-sunshine" />
              <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">{title}</h2>
              <p className="mt-3 leading-7 text-coal dark:text-white/72">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-padding bg-mist dark:bg-black">
        <div className="container-shell rounded-3xl border border-coal/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="eyebrow">Collection flow</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-carbon dark:text-white">Green Bag for recoverable resources. Red Bag for hazardous resources.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {collectionFlow.map((step, index) => (
              <div key={step} className="rounded-2xl border border-coal/10 bg-cool p-5 dark:border-white/10 dark:bg-black/40">
                <span className="text-sm font-black text-carbon dark:text-sunshine">0{index + 1}</span>
                <p className="mt-3 font-black text-carbon dark:text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HeliosPrompt mode="kymnis" context="recovery" />
    </>
  );
}
