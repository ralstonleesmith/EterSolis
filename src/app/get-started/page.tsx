import type { Metadata } from 'next';
import { CalendarCheck, FileCheck2, Route, ShieldCheck } from 'lucide-react';
import { GetStartedWizard } from '@/components/get-started/GetStartedWizard';
import { PageHero } from '@/components/ui/PageHero';
import { mediaAssets } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Get Started | EterSolis Service Request Intake',
  description: 'Start an EterSolis service request for pickup, delivery, assessment, recurring service, certificates, repurpose, destruction or controlled purchase-eligibility review.',
  alternates: { canonical: '/get-started' }
};

const points = [
  { icon: Route, title: 'Department routing', text: 'Requests route into wastewater, biologicals, hydrocarbons, industrial or recyclables pathways.' },
  { icon: ShieldCheck, title: 'Risk screen', text: 'Safety, documentation and unknown-material flags control whether review or payment can proceed.' },
  { icon: CalendarCheck, title: 'Scheduling', text: 'Pickup and delivery requests collect enough site and logistics data for controlled appointment review.' },
  { icon: FileCheck2, title: 'Certificates', text: 'Certificate requests are recorded, but issuance depends on verified receiving, disposition and approval.' }
];

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Controlled operational intake"
        title="Get Started with EterSolis"
        description="Request pickup, delivery, assessment, recurring service, repurpose, destruction, certification or selected purchase-eligibility review through one structured operating funnel."
        primaryLabel="Start Request"
        primaryHref="#service-request"
        secondaryLabel="Verify Certificate"
        secondaryHref="/certificates/verify"
        imageSrc={mediaAssets.wastewater.aeration.previewSrc}
        imageAlt={mediaAssets.wastewater.aeration.alt}
      />
      <section className="section-padding bg-[var(--surface-muted)] dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5">
            <div className="glass-panel rounded-lg p-7">
              <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Service-first model</p>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-carbon dark:text-white">Customer-paid pathways by default. Selected purchase review only by exception.</h2>
              <p className="mt-4 leading-8 text-coal dark:text-on-dark-muted">
                EterSolis provides professional waste, carbon, recovery, repurpose, destruction, pickup, delivery, assessment, certification and intelligence services. Do not send or deliver material until written instructions are confirmed.
              </p>
            </div>
            <div className="grid gap-3">
              {points.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Icon className="h-5 w-5 text-sunshine" />
                  <h3 className="mt-3 font-black text-carbon dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-coal dark:text-on-dark-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div id="service-request" className="scroll-mt-28">
            <GetStartedWizard />
          </div>
        </div>
      </section>
    </>
  );
}
