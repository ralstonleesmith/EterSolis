import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = '/sell-waste',
  primaryLabel = 'Sell Waste To EterSolis',
  secondaryHref = '/contact',
  secondaryLabel = 'Request Assessment'
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 surface-grid opacity-25" aria-hidden="true" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sunshine/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-28 bottom-8 h-80 w-80 rounded-full bg-cool blur-3xl" aria-hidden="true" />
      <div className="container-shell relative">
        <div className="max-w-5xl">
          <p className="inline-flex rounded-full border border-sunshine/70 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-carbon shadow-sm backdrop-blur">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.055em] text-carbon md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-coal">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="group inline-flex items-center justify-center gap-3 rounded-full bg-sunshine px-7 py-4 font-black text-carbon shadow-soft transition hover:-translate-y-0.5">
              {primaryLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-full border border-coal/30 bg-white/75 px-7 py-4 font-black text-carbon backdrop-blur transition hover:border-sunshine hover:bg-white">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
