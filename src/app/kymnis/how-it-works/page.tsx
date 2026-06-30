import type { Metadata } from 'next';
import { KymnisHero } from '@/components/kymnis/KymnisHero';
import { KymnisNav } from '@/components/kymnis/KymnisNav';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';
import { kymnisFlow, kymnisReportCategories } from '@/lib/kymnis';

export const metadata: Metadata = {
  title: 'How KYMNIS Works | Registration, Review and Improvement Routing',
  description: 'KYMNIS provides a controlled pathway for registering impact context, structuring evidence, routing verification review and tracking measurable improvement.',
  alternates: { canonical: '/kymnis/how-it-works' }
};

export default function KymnisHowItWorksPage() {
  return (
    <>
      <KymnisHero
        eyebrow="KYMNIS pathway"
        title="A clear sequence for environmental intelligence and improvement routing."
        description="KYMNIS keeps intake radically simple: open the app, report an impact, add a photo or short video, choose what you see and submit."
      />
      <KymnisNav active="/kymnis/how-it-works" />
      <section className="section-padding">
        <div className="container-shell grid gap-5">
          {kymnisFlow.map((step, index) => (
            <article key={step} className="grid gap-5 rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:grid-cols-[9rem_1fr]">
              <div className="text-5xl font-black tracking-normal text-carbon dark:text-sunshine">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <h2 className="text-2xl font-black text-carbon dark:text-white">{step}</h2>
                <p className="mt-3 leading-8 text-coal dark:text-on-dark-muted">
                  The step remains deliberately narrow and non-confidential so the platform can classify the case, identify missing proof, route it safely and avoid unsupported claims.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-padding bg-mist dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">One-button report flow</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-carbon dark:text-white">Report Impact captures location, date and time, then asks one plain-language question.</h2>
            <p className="mt-4 leading-8 text-coal dark:text-on-dark-muted">
              What do you see? The user chooses one simple category and submits. KYMNIS then reviews evidence, verifies location, identifies stakeholders, finds possible solutions and tracks progress.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {kymnisReportCategories.map((category) => (
              <div key={category} className="rounded-lg border border-coal/10 bg-white p-4 font-black text-carbon shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>
      <HeliosPrompt mode="kymnis" context="kymnis" />
    </>
  );
}
