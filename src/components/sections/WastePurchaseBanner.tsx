import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export function WastePurchaseBanner() {
  return (
    <section className="border-y border-coal/10 bg-white py-10 dark:border-white/10 dark:bg-black">
      <div className="container-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-coal/60 dark:text-sunshine">Immediate commercial route</p>
          <h2 className="mt-3 text-3xl font-black text-carbon dark:text-white">EterSolis buys suitable waste streams after controlled review.</h2>
          <p className="mt-3 max-w-3xl leading-7 text-coal dark:text-white/72">
            Submit recoverable waste, recyclables, industrial by-products and materials with responsible recovery potential for review by EterSolis.
          </p>
          <p className="mt-3 text-sm font-semibold text-carbon dark:text-white/82">
            Review required. Do not send physical samples unless EterSolis provides written intake instructions.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link href="/sell-waste#waste-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 text-center font-black text-black transition hover:-translate-y-0.5">
            Submit Waste Opportunity <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="mailto:waste@etersolis.com" className="inline-flex items-center gap-2 text-sm font-black text-carbon dark:text-sunshine">
            <Mail className="h-4 w-4" /> waste@etersolis.com
          </a>
        </div>
      </div>
    </section>
  );
}
