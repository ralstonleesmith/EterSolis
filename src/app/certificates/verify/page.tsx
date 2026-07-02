import type { Metadata } from 'next';
import { FileCheck2, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verify Certificate | EterSolis',
  description: 'Verify an EterSolis Certificate of Repurpose or Certificate of Destruction.'
};

export default function CertificateVerifyPage() {
  return (
    <section className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Certificate verification</p>
          <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Verify an EterSolis certificate.</h1>
          <p className="mt-5 leading-8 text-coal dark:text-on-dark-muted">
            Public verification shows certificate validity, certificate type, issue date and verification hash. It does not expose private documents, pricing, photos, operator notes or sensitive logistics details.
          </p>
        </div>
        <form className="ui-surface grid gap-5 rounded-lg p-6 shadow-soft" action="/certificates/verify/lookup" method="get">
          <FileCheck2 className="h-9 w-9 text-sunshine" />
          <label className="grid gap-2 text-sm font-black text-body">
            Certificate number or verification token
            <input name="token" required minLength={3} className="ui-field rounded-lg px-4 py-3 shadow-sm transition focus:border-sunshine" />
          </label>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black" type="submit">
            <Search className="h-4 w-4" /> Verify
          </button>
        </form>
      </div>
    </section>
  );
}
