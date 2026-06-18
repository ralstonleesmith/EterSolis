import type { Metadata } from 'next';
import { AlertTriangle, CheckCircle2, FileSearch, PackageCheck, Route } from 'lucide-react';
import { WasteOpportunityForm } from '@/components/forms/WasteOpportunityForm';
import { PageHero } from '@/components/ui/PageHero';
import { mediaAssets } from '@/lib/media';
import { wasteMaterialCategories } from '@/lib/siteContent';

const reviewSteps = [
  { icon: FileSearch, title: 'Submit material data', text: 'Provide non-confidential material, quantity, location, frequency and handling context.' },
  { icon: AlertTriangle, title: 'Safety screen', text: 'Hazard, regulatory, contamination and sample-transfer concerns are routed for controlled review.' },
  { icon: Route, title: 'Recovery pathway', text: 'EterSolis evaluates responsible recovery, recycling, reuse, valorization or partner pathways.' },
  { icon: PackageCheck, title: 'Commercial review', text: 'Logistics, quality, quantity and feasibility determine whether a commercial discussion should proceed.' }
];

export const metadata: Metadata = {
  title: 'Sell Waste To EterSolis | Waste Stream, Wastewater Residual and Recovery Opportunities',
  description: 'Submit suitable recoverable waste streams, wastewater treatment residuals, recyclables, industrial by-products and materials with responsible recovery potential for EterSolis review.',
  alternates: { canonical: '/sell-waste' },
  openGraph: {
    images: [{ url: '/media/og/etersolis-sell-waste-og.png', width: 1600, height: 900, alt: mediaAssets.wastewater.aeration.alt }]
  },
  twitter: { images: ['/media/og/etersolis-sell-waste-og.png'] }
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
        imageSrc={mediaAssets.wastewater.aeration.previewSrc}
        imageAlt={mediaAssets.wastewater.aeration.alt}
      />
      <section className="section-padding bg-[#FAFAF7] dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <div className="glass-panel rounded-lg p-7">
              <p className="text-xs font-black uppercase tracking-normal text-coal/70 dark:text-sunshine">Review principle</p>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-carbon dark:text-white">Suitable materials only. Controlled review always.</h2>
              <p className="mt-4 leading-8 text-coal dark:text-white/76">
                EterSolis buys suitable waste streams, recyclables, industrial by-products and other recoverable materials, subject to review, safety, legality, logistics, quality, quantity and commercial feasibility.
              </p>
            </div>
            <div className="rounded-lg border border-sunshine/70 bg-white p-6 shadow-soft dark:bg-white/5">
              <div className="flex gap-4">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-carbon dark:text-sunshine" />
                <p className="text-sm font-bold leading-7 text-carbon dark:text-white/82">
                  Submitting a waste opportunity is non-binding. EterSolis review is required before any purchase, acceptance, transport, sample transfer, technical assessment or commercial commitment. Do not send physical samples unless EterSolis provides written intake instructions.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {wasteMaterialCategories.map((category) => (
                <div key={category} className="flex items-center gap-3 rounded-lg border border-coal/10 bg-white p-4 text-sm font-black text-carbon shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
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
          <p className="text-xs font-black uppercase tracking-normal text-coal/70 dark:text-sunshine">Review path</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal text-carbon dark:text-white md:text-6xl">A clear path from inquiry to controlled commercial review.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {reviewSteps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="card-hover rounded-lg border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
                <p className="mt-6 text-xs font-black uppercase tracking-normal text-coal/60 dark:text-white/45">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-carbon dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-coal dark:text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-coal/10 bg-white/92 p-3 shadow-soft backdrop-blur md:hidden dark:border-white/10 dark:bg-black/88">
        <a href="#waste-form" className="flex items-center justify-center rounded-full bg-sunshine px-5 py-3 text-sm font-black text-black">
          Start Waste Review
        </a>
      </div>
    </>
  );
}
