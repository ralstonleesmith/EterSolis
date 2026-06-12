import type { Metadata } from 'next';
import { WasteOpportunityForm } from '@/components/forms/WasteOpportunityForm';

export const metadata: Metadata = {
  title: 'Sell Waste To EterSolis | Waste Stream and Material Recovery Opportunities',
  description: 'Submit suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential for EterSolis review.',
  alternates: { canonical: '/sell-waste' }
};

export default function SellWastePage() {
  return (
    <section className="section-padding bg-cool">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Waste opportunities</p>
          <h1 className="mt-3 text-5xl font-bold text-carbon">Sell Waste To EterSolis</h1>
          <p className="mt-5 text-lg leading-8 text-coal">
            EterSolis purchases and develops solutions for suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential.
          </p>
          <div className="mt-6 rounded-3xl border border-sunshine bg-white p-6 text-sm leading-7 text-carbon">
            EterSolis buys suitable waste streams, recyclables, industrial by-products and other recoverable materials, subject to review, safety, legality, logistics, quality, quantity and commercial feasibility.
          </div>
          <p className="mt-6 text-sm font-semibold leading-7 text-carbon">
            Submitting a waste opportunity is non-binding. EterSolis review is required before any purchase, acceptance, transport, sample transfer, technical assessment or commercial commitment. Do not send physical samples unless EterSolis provides written intake instructions.
          </p>
        </div>
        <WasteOpportunityForm />
      </div>
    </section>
  );
}
