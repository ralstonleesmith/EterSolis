import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { KymnisHero } from '@/components/kymnis/KymnisHero';
import { KymnisNav } from '@/components/kymnis/KymnisNav';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';
import { kymnisAppButtons, kymnisBrand, kymnisFlow, kymnisPillars, kymnisUserJourney } from '@/lib/kymnis';

export const metadata: Metadata = {
  title: 'KYMNIS | Environmental Intelligence and Verified Impact Pathways',
  description: kymnisBrand.description,
  alternates: { canonical: '/kymnis' }
};

export default function KymnisPage() {
  return (
    <>
      <KymnisHero />
      <KymnisNav active="/kymnis" />
      <section className="section-padding bg-mist dark:bg-black">
        <div className="container-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kymnisPillars.map((pillar) => (
            <article key={pillar.title} className="surface-lift rounded-3xl border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <CheckCircle2 className="h-6 w-6 text-sunshine" />
              <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">{pillar.title}</h2>
              <p className="mt-3 leading-7 text-coal dark:text-white/72">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-coal/70 dark:text-sunshine">Operating pathway</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-carbon dark:text-white">From impact context to responsible action.</h2>
            <p className="mt-4 leading-8 text-coal dark:text-white/72">
              KYMNIS is not a complaints platform, activist movement or whistleblowing system. It is a neutral environmental platform focused on verified environmental truth and responsible action.
            </p>
            <p className="mt-4 leading-8 text-coal dark:text-white/72">
              {kymnisBrand.mission}
            </p>
            <Link href="/kymnis/how-it-works" className="mt-7 inline-flex items-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black">
              Review the sequence <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {kymnisFlow.map((step, index) => (
              <div key={step} className="rounded-3xl border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-coal/60 dark:text-sunshine">Step {index + 1}</span>
                <p className="mt-2 text-xl font-black text-carbon dark:text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-mist dark:bg-black kymnis-glow">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Radically simple app direction</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-carbon dark:text-white">A user should feel like they are showing a problem and asking for help.</h2>
            <p className="mt-4 leading-8 text-coal dark:text-white/72">
              The real complexity belongs inside KYMNIS. The public experience stays simple enough for a child, a tourist, a worker, a farmer, a business user or an elderly first-time smartphone user.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {kymnisAppButtons.map((button) => (
              <article key={button.label} className="surface-card rounded-3xl p-5">
                <h3 className="text-xl font-black">{button.label}</h3>
                <p className="mt-3 leading-7 text-coal dark:text-white/72">{button.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell rounded-3xl border border-coal/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="eyebrow">User journey</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-carbon dark:text-white">{kymnisBrand.essence}</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {kymnisUserJourney.map((step) => (
              <div key={step} className="rounded-2xl border border-coal/10 bg-cool p-4 font-black text-carbon dark:border-white/10 dark:bg-black/40 dark:text-white">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>
      <HeliosPrompt mode="kymnis" context="kymnis" />
    </>
  );
}
