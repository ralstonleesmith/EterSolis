import type { Metadata } from 'next';
import { FileCheck2, Microscope, ShieldCheck } from 'lucide-react';
import { KymnisHero } from '@/components/kymnis/KymnisHero';
import { KymnisNav } from '@/components/kymnis/KymnisNav';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';

const checks = [
  { icon: FileCheck2, title: 'Evidence framing', description: 'Define what is being claimed, what is known, what is uncertain and what proof is missing.' },
  { icon: Microscope, title: 'Review readiness', description: 'Prepare cases for scientific, operational or partner review without implying certification.' },
  { icon: ShieldCheck, title: 'Claim discipline', description: 'Keep public statements bounded until qualified verification, documentation and acceptance are complete.' }
] as const;

export const metadata: Metadata = {
  title: 'KYMNIS Verification | Evidence-First Review Readiness',
  description: 'KYMNIS verification pathways frame claims, evidence and uncertainty before any public assertion or action.',
  alternates: { canonical: '/kymnis/verification' }
};

export default function KymnisVerificationPage() {
  return (
    <>
      <KymnisHero
        eyebrow="KYMNIS verification"
        title="Verification turns observations into environmental truth."
        description="KYMNIS reviews evidence, location, time, stakeholders and possible solutions through lawful, transparent and collaborative processes."
      />
      <KymnisNav active="/kymnis/verification" />
      <section className="section-padding bg-mist dark:bg-black">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {checks.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Icon className="h-7 w-7 text-sunshine" />
              <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">{title}</h2>
              <p className="mt-3 leading-7 text-coal dark:text-on-dark-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <HeliosPrompt mode="kymnis" context="verification" />
    </>
  );
}
