'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
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
  const [activeMode, setActiveMode] = useState<HeliosMode>(mode);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(0);
  const allRoutes = useMemo(() => getHeliosIntents(activeMode, context), [activeMode, context]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(allRoutes.map((intent) => intent.category)))], [allRoutes]);
  const filteredRoutes = activeCategory === 'All' ? allRoutes : allRoutes.filter((intent) => intent.category === activeCategory);
  const routes = filteredRoutes.length > 0 ? filteredRoutes : allRoutes;
  const route = routes[selected];
  const Icon = route.icon;
  const copy = modeCopy[activeMode];

  useEffect(() => {
    setSelected(0);
  }, [activeMode, activeCategory]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) setActiveCategory('All');
  }, [activeCategory, categories]);

  return (
    <section className={`relative isolate overflow-hidden bg-black text-white signal-grid ${compact ? 'py-12' : 'py-24'}`}>
      {backgroundStyle === 'splash' ? (
        <Image src={mediaAssets.helios.earthSplash.src} alt={mediaAssets.helios.earthSplash.alt} fill sizes="100vw" className="object-cover opacity-[0.5]" />
      ) : null}
      <div
        className={
          backgroundStyle === 'splash'
            ? 'absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(217,165,32,0.22),transparent_28rem),radial-gradient(circle_at_80%_10%,rgba(0,125,121,0.18),transparent_30rem),linear-gradient(135deg,rgba(0,0,0,0.94),rgba(0,0,0,0.72))]'
            : 'absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(217,165,32,0.15),transparent_25rem),radial-gradient(circle_at_86%_10%,rgba(0,125,121,0.18),transparent_27rem),linear-gradient(135deg,#000000_0%,#071010_52%,#111111_100%)]'
        }
        aria-hidden="true"
      />
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="helios-orb flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-sunshine/25 bg-black/60">
              <Image src={mediaAssets.helios.icon.src} alt={mediaAssets.helios.icon.alt} width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-16 w-16 object-contain" priority={!compact} />
            </div>
            <div>
              <Image src={mediaAssets.helios.wordmark.src} alt={mediaAssets.helios.wordmark.alt} width={mediaAssets.helios.wordmark.width} height={mediaAssets.helios.wordmark.height} className="mb-3 h-auto w-56 max-w-full object-contain" priority={!compact} />
              <p className="font-black uppercase tracking-normal text-sunshine">{copy.eyebrow}</p>
              <p className="mt-2 text-sm font-bold text-on-dark-subtle">Guided public routing · Human review required</p>
            </div>
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-normal text-on-dark md:text-6xl">{copy.title}</h2>
          <p className="mt-5 max-w-3xl leading-8 text-on-dark-muted">{copy.description}</p>
          <div className="mt-7 inline-grid grid-cols-2 rounded-full border border-white/12 bg-white/8 p-1">
            {(['etersolis', 'kymnis'] as const).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                onClick={() => setActiveMode(nextMode)}
                className={`rounded-full px-5 py-2 text-sm font-black transition ${
                  activeMode === nextMode ? 'bg-white text-black' : 'text-on-dark-muted hover:text-white'
                }`}
                aria-pressed={activeMode === nextMode}
              >
                {nextMode === 'etersolis' ? 'EterSolis' : 'KYMNIS'}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {heliosGuardrails.map((guardrail) => (
              <span key={guardrail} className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 py-3 text-xs font-black uppercase tracking-normal text-on-dark-muted">
                <CheckCircle2 className="h-4 w-4 text-sunshine" /> {guardrail}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex gap-2 overflow-x-auto rounded-lg border border-white/12 bg-black/34 p-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                  activeCategory === category ? 'bg-sunshine text-black' : 'bg-white/8 text-on-dark-muted hover:text-white'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {routes.map(({ id, icon: RouteIcon, label, description }, index) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(index)}
                className={`surface-lift rounded-lg border p-5 text-left font-bold text-on-dark ${
                  selected === index ? 'border-sunshine bg-sunshine/18 shadow-soft' : 'border-white/12 bg-white/8 hover:bg-white/12'
                }`}
                aria-pressed={selected === index}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/32 text-sunshine">
                  <RouteIcon className="h-5 w-5" />
                </div>
                <span className="mt-4 block text-lg font-black">{label}</span>
                <span className="mt-2 block text-sm leading-6 text-on-dark-muted">{description}</span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-sunshine/55 bg-black/52 p-6 shadow-soft backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-sunshine">
                  <Sparkles className="h-4 w-4" /> Recommended route
                </p>
                <h3 className="mt-2 text-2xl font-black text-on-dark">{route.label}</h3>
                <p className="mt-3 leading-7 text-on-dark-muted">{route.description}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-sunshine">What to prepare</p>
                    <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-on-dark-muted">
                      {route.prepare.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-sunshine">Helios cannot decide</p>
                    <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-on-dark-muted">
                      {route.cannotDecide.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                </div>
                <Link href={route.href} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-black text-black transition hover:-translate-y-0.5">
                  {route.action} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-white/12 bg-white/8 p-4 text-sm leading-7 text-on-dark-muted">
            <FlaskConical className="mt-1 h-5 w-5 shrink-0 text-sunshine" />
            Helios is a public routing layer only. EterSolis or KYMNIS review is required before any technical, safety, transport, acceptance, verification or commercial action.
          </div>
        </div>
      </div>
    </section>
  );
}
