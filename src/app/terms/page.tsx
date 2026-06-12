import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms | EterSolis',
  description: 'EterSolis website terms, non-binding waste submission notice and no-sample instruction.',
  alternates: { canonical: '/terms' }
};

export default function TermsPage() {
  return (
    <section className="section-padding bg-cool">
      <div className="container-shell max-w-4xl rounded-[2rem] bg-white p-8 shadow-soft">
        <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Terms</p>
        <h1 className="mt-3 text-5xl font-bold text-carbon">Website Terms</h1>
        <div className="mt-8 space-y-5 leading-8 text-coal">
          <p>Website content is provided for general business inquiry and informational purposes only. It is not technical advice, legal advice, transport approval, disposal instruction, quotation, acceptance or commercial commitment.</p>
          <p>Submitting a waste opportunity is non-binding. EterSolis review is required before any purchase, acceptance, transport, sample transfer, technical assessment or commercial commitment.</p>
          <p>Do not send physical samples or materials unless EterSolis provides written intake instructions.</p>
          <p>Hazardous, regulated, biological, chemical, medical, radioactive or unknown materials require manual review and written instructions before any physical movement.</p>
          <p>EterSolis reserves all rights in its website, software, documentation, brand assets, content and proprietary systems.</p>
        </div>
      </div>
    </section>
  );
}
