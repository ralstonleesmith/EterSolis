import Link from 'next/link';
import { ArrowRight, Bot, ShieldCheck } from 'lucide-react';
import { getHeliosIntents, getRecommendedHeliosIntent, type HeliosMode } from '@/lib/helios';

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
      <div className="container-shell rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_10%_0%,rgba(252,207,37,0.18),transparent_22rem),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] p-6 shadow-soft backdrop-blur md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm font-black text-sunshine">
              <Bot className="h-4 w-4" /> Helios guided routing
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
              {title ?? 'Use Helios to choose the safest next step.'}
            </h2>
            <p className="mt-4 leading-8 text-white/72">
              Helios routes public inquiries without issuing technical, commercial, handling or verification commitments.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/70">
              <ShieldCheck className="h-4 w-4 text-sunshine" /> Public layer only
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-sunshine/45 bg-black/40 p-5 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sunshine text-black">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-sunshine">Recommended</p>
              <h3 className="mt-2 text-2xl font-black text-white">{recommended.label}</h3>
              <p className="mt-2 leading-7 text-white/72">{recommended.description}</p>
              <Link href={recommended.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sunshine px-5 py-3 font-black text-black transition hover:-translate-y-0.5">
                {recommended.action} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {related.map((intent) => (
                <Link key={intent.id} href={intent.href} className="surface-lift rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-black text-white/82">
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
