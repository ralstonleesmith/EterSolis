import type { Metadata } from 'next';
import { AlertTriangle, CheckCircle2, FileSearch, PackageCheck, Route } from 'lucide-react';
import { WasteOpportunityForm } from '@/components/forms/WasteOpportunityForm';
import { PageHero } from '@/components/ui/PageHero';

const reviewSteps = [
  { icon: FileSearch, title: 'Submit material data', text: 'Provide non-confidential material, quantity, location, frequency and handling context.' },
  { icon: AlertTriangle, title: 'Safety screen', text: 'Hazard, regulatory, contamination and sample-transfer concerns are routed for controlled review.' },
  { icon: Route, title: 'Recovery pathway', text: 'EterSolis evaluates responsible recovery, recycling, reuse, valorization or partner pathways.' },
  { icon: PackageCheck, title: 'Commercial review', text: 'Logistics, quality, quantity and feasibility determine whether a commercial discussion should proceed.' }
];

const acceptedCategories = ['Plastics', 'Paper and cardboard', 'Metals', 'E-waste', 'Organics', 'Industrial by-products', 'Construction materials', 'Other recoverable resources'];

export const metadata: Metadata = {
  title: 'Sell Waste To EterSolis | Waste Stream and Material Recovery Opportunities',
  description: 'Submit suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential for EterSolis review.',
  alternates: { canonical: '/sell-waste' }
};

export default function SellWastePage() {
  return (
    <>
      <PageHero
        eyebrow="Waste opportunities"
        title="Sell Waste To EterSolis"
        description="EterSolis purchases and develops solutions for suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential."
        primaryLabel="Start Waste Review"
        primaryHref="#waste-form"
        secondaryLabel="Contact Waste Route"
        secondaryHref="mailto:waste@etersolis.com"
      />
      <section className="section-padding bg-[#FAFAF7] dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <div className="glass-panel rounded-[2rem] p-7">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-coal/70 dark:text-sunshine">Review principle</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-carbon dark:text-white">Suitable materials only. Controlled review always.</h2>
              <p className="mt-4 leading-8 text-coal dark:text-white/76">
                EterSolis buys suitable waste streams, recyclables, industrial by-products and other recoverable materials, subject to review, safety, legality, logistics, quality, quantity and commercial feasibility.
              </p>
            </div>
            <div className="rounded-[2rem] border border-sunshine/70 bg-white p-6 shadow-soft dark:bg-white/5">
              <div className="flex gap-4">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-carbon dark:text-sunshine" />
                <p className="text-sm font-bold leading-7 text-carbon dark:text-white/82">
                  Submitting a waste opportunity is non-binding. EterSolis review is required before any purchase, acceptance, transport, sample transfer, technical assessment or commercial commitment. Do not send physical samples unless EterSolis provides written intake instructions.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {acceptedCategories.map((category) => (
                <div key={category} className="flex items-center gap-3 rounded-2xl border border-coal/10 bg-white p-4 text-sm font-black text-carbon shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 text-sunshine" /> {category}
                </div>
              ))}
            </div>
          </div>
          <div id="waste-form" className="scroll-mt-28">
            <WasteOpportunityForm />
          </div>
        </div>
      </section>
      <section className="section-padding bg-white dark:bg-[#050505]">
        <div className="container-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-coal/70 dark:text-sunshine">Review path</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-carbon dark:text-white md:text-6xl">A clear path from inquiry to controlled commercial review.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {reviewSteps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="card-hover rounded-[2rem] border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-coal/60 dark:text-white/45">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-carbon dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-coal dark:text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
