import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { getHeliosIntents, getRecommendedHeliosIntent, type HeliosMode } from '@/lib/helios';
import { mediaAssets } from '@/lib/media';

export function HeliosPrompt({
  mode = 'etersolis',
  context = 'general',
  title
}: {
  mode?: HeliosMode;
  context?: string;
  title?: string;
}) {
  const recommended = getRecommendedHeliosIntent(mode, context);
  const related = getHeliosIntents(mode, context).slice(0, 3);
  const Icon = recommended.icon;

  return (
    <section className="section-padding bg-carbon text-white dark:bg-black signal-grid">
      <div className="container-shell rounded-lg border border-white/12 bg-[radial-gradient(circle_at_10%_0%,rgba(252,207,37,0.18),transparent_22rem),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] p-6 shadow-soft backdrop-blur md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm font-black text-sunshine">
              <Image src={mediaAssets.helios.icon.src} alt="" width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-5 w-5 object-contain" /> Helios guided routing
            </div>
            <Image src={mediaAssets.helios.wordmark.src} alt={mediaAssets.helios.wordmark.alt} width={mediaAssets.helios.wordmark.width} height={mediaAssets.helios.wordmark.height} className="mt-5 h-auto w-72 max-w-full object-contain" />
            <h2 className="mt-5 text-3xl font-black tracking-normal text-white md:text-4xl">
              {title ?? 'Use Helios to choose the safest next step.'}
            </h2>
            <p className="mt-4 leading-8 text-on-dark-muted">
              Helios routes public inquiries without issuing technical, commercial, handling or verification commitments.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-normal text-on-dark-muted">
              <ShieldCheck className="h-4 w-4 text-sunshine" /> Public layer only
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg border border-sunshine/45 bg-black/40 p-5 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sunshine text-black">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-normal text-sunshine">Recommended</p>
              <h3 className="mt-2 text-2xl font-black text-white">{recommended.label}</h3>
              <p className="mt-2 leading-7 text-on-dark-muted">{recommended.description}</p>
              <Link href={recommended.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sunshine px-5 py-3 font-black text-black transition hover:-translate-y-0.5">
                {recommended.action} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {related.map((intent) => (
                <Link key={intent.id} href={intent.href} className="surface-lift rounded-lg border border-white/10 bg-white/8 p-4 text-sm font-black text-on-dark-muted">
                  {intent.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
