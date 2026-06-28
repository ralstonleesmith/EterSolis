'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, FlaskConical, Sparkles } from 'lucide-react';
import { getHeliosIntents, heliosGuardrails, type HeliosMode } from '@/lib/helios';
import { mediaAssets } from '@/lib/media';

const modeCopy = {
  etersolis: {
    eyebrow: 'Helios v2 · EterSolis mode',
    title: 'Route the right EterSolis conversation without overcommitting.',
    description:
      'Helios converts broad waste, water, recovery, partnership and executive intent into safe public next steps while preserving human review.'
  },
  kymnis: {
    eyebrow: 'Helios v2 · KYMNIS mode',
    title: 'Guide simple impact reporting into the right KYMNIS pathway.',
    description:
      'Helios keeps the user experience simple while routing impact registration, verification, resource collection and platform participation safely.'
  }
} as const;

export function HeliosPanel({
  mode = 'etersolis',
  context = 'general',
  compact = false,
  backgroundStyle = 'splash'
}: {
  mode?: HeliosMode;
  context?: string;
  compact?: boolean;
  backgroundStyle?: 'splash' | 'plain';
}) {
  const [selected, setSelected] = useState(0);
  const routes = getHeliosIntents(mode, context);
  const route = routes[selected];
  const Icon = route.icon;
  const copy = modeCopy[mode];

  return (
    <section className={`relative isolate overflow-hidden bg-black text-white signal-grid ${compact ? 'py-12' : 'py-24'}`}>
      {backgroundStyle === 'splash' ? (
        <Image src={mediaAssets.helios.earthSplash.src} alt={mediaAssets.helios.earthSplash.alt} fill sizes="100vw" className="object-cover opacity-[0.5]" />
      ) : null}
      <div
        className={
          backgroundStyle === 'splash'
            ? 'absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(217,165,32,0.22),transparent_28rem),radial-gradient(circle_at_80%_10%,rgba(0,125,121,0.18),transparent_30rem),linear-gradient(135deg,rgba(0,0,0,0.94),rgba(0,0,0,0.72))]'
            : 'absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(217,165,32,0.15),transparent_25rem),radial-gradient(circle_at_86%_10%,rgba(0,125,121,0.18),transparent_27rem),linear-gradient(135deg,#020202_0%,#071010_52%,#111111_100%)]'
        }
        aria-hidden="true"
      />
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="helios-orb flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-sunshine/25 bg-black/60">
              <Image src={mediaAssets.helios.icon.src} alt={mediaAssets.helios.icon.alt} width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-16 w-16 object-contain" priority={!compact} />
            </div>
            <div>
              <Image src={mediaAssets.helios.wordmark.src} alt={mediaAssets.helios.wordmark.alt} width={mediaAssets.helios.wordmark.width} height={mediaAssets.helios.wordmark.height} className="mb-3 h-auto w-56 max-w-full object-contain" priority={!compact} />
              <p className="font-black uppercase tracking-[0.18em] text-sunshine">{copy.eyebrow}</p>
              <p className="mt-2 text-sm font-bold text-white/58">Guided public routing · Human review required</p>
            </div>
          </div>
          <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.06em] text-white md:text-6xl">{copy.title}</h2>
          <p className="mt-5 max-w-3xl leading-8 text-white/78">{copy.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {heliosGuardrails.map((guardrail) => (
              <span key={guardrail} className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-xs font-black uppercase tracking-normal text-white/78">
                <CheckCircle2 className="h-4 w-4 text-sunshine" /> {guardrail}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            {routes.map(({ id, icon: RouteIcon, label, description }, index) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(index)}
                className={`surface-lift rounded-3xl border p-5 text-left font-bold text-white ${
                  selected === index ? 'border-sunshine bg-sunshine/18 shadow-soft' : 'border-white/12 bg-white/8 hover:bg-white/12'
                }`}
                aria-pressed={selected === index}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/32 text-sunshine">
                  <RouteIcon className="h-5 w-5" />
                </div>
                <span className="mt-4 block text-lg font-black">{label}</span>
                <span className="mt-2 block text-sm leading-6 text-white/70">{description}</span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-sunshine/55 bg-black/52 p-6 shadow-soft backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sunshine text-black">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-sunshine">
                  <Sparkles className="h-4 w-4" /> Recommended route
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">{route.label}</h3>
                <p className="mt-3 leading-7 text-white/72">{route.description}</p>
                <Link href={route.href} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black transition hover:-translate-y-0.5">
                  {route.action} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-3xl border border-white/12 bg-white/8 p-4 text-sm leading-7 text-white/70">
            <FlaskConical className="mt-1 h-5 w-5 shrink-0 text-sunshine" />
            Helios is a public routing layer only. EterSolis or KYMNIS review is required before any technical, safety, transport, acceptance, verification or commercial action.
          </div>
        </div>
      </div>
    </section>
  );
}
