'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Bot, BriefcaseBusiness, Crown, Droplets, FlaskConical, Handshake, Recycle, ShieldAlert } from 'lucide-react';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';
import { mediaAssets } from '@/lib/media';

const routes = [
  {
    icon: Recycle,
    label: 'Sell waste',
    description: 'Recoverable materials, recyclables, industrial by-products or suitable waste streams.',
    href: '/sell-waste',
    action: 'Start waste review'
  },
  {
    icon: ShieldAlert,
    label: 'Request assessment',
    description: 'Waste, carbon, circular economy or industrial resource review.',
    href: '/contact',
    action: 'Route assessment'
  },
  {
    icon: Droplets,
    label: 'Wastewater treatment',
    description: 'Treatment residuals, water recovery infrastructure questions or wastewater-linked by-products.',
    href: '/contact#contact-form',
    action: 'Request wastewater assessment'
  },
  {
    icon: Bot,
    label: 'Explore recovery',
    description: 'Resource recovery, valorization, circular economy or decarbonization fit.',
    href: '/solutions',
    action: 'View solutions'
  },
  {
    icon: Handshake,
    label: 'Partner inquiry',
    description: 'Recycler, logistics, lab, university, technology or commercial collaboration.',
    href: '/contact',
    action: 'Contact partnerships'
  },
  {
    icon: BriefcaseBusiness,
    label: 'Talent route',
    description: 'Careers, Associate Program interest or controlled talent inquiry.',
    href: '/contact',
    action: 'Contact EterSolis'
  },
  {
    icon: Crown,
    label: 'Executive or CSO',
    description: 'CEO, CSO, strategic, scientific or controlled documentation matter.',
    href: '/contact',
    action: 'Route executive inquiry'
  }
];

const guardrails = ['No prices quoted', 'No acceptance promises', 'No hazardous handling instructions', 'No protected-system disclosures'];

export function HeliosPanel() {
  const [selected, setSelected] = useState(0);
  const route = routes[selected];
  const Icon = route.icon;

  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-white">
      <Image src={mediaAssets.hero.src} alt={mediaAssets.hero.alt} fill sizes="100vw" className="object-cover opacity-[0.34]" />
      <div className="absolute inset-0 bg-black/78" aria-hidden="true" />
      <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="brand-no-background mb-8">
            <EterSolisLogo variant="light" mode="mark" className="h-24 w-auto" title="EterSolis transparent mark" />
          </div>
          <p className="font-black uppercase tracking-normal text-sunshine">Helios v1</p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white md:text-6xl">A controlled routing assistant for the right next step.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-white/78">
            Select the closest intent and Helios will route the inquiry to a safe public next step without making technical, commercial or acceptance commitments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {guardrails.map((guardrail) => (
              <span key={guardrail} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-normal text-white/78">{guardrail}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            {routes.map(({ icon: RouteIcon, label, description }, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelected(index)}
                className={`rounded-lg border p-5 text-left font-bold text-white transition hover:-translate-y-1 hover:border-sunshine ${
                  selected === index ? 'border-sunshine bg-sunshine/18' : 'border-white/15 bg-white/10 hover:bg-white/15'
                }`}
                aria-pressed={selected === index}
              >
                <RouteIcon className="h-5 w-5 text-sunshine" />
                <span className="mt-4 block text-lg font-black">{label}</span>
                <span className="mt-2 block text-sm leading-6 text-white/70">{description}</span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-sunshine/55 bg-black/52 p-6 shadow-soft backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-normal text-sunshine">Recommended route</p>
                <h3 className="mt-2 text-2xl font-black text-white">{route.label}</h3>
                <p className="mt-3 leading-7 text-white/72">{route.description}</p>
                <Link href={route.href} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black transition hover:-translate-y-0.5">
                  {route.action} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-white/12 bg-white/8 p-4 text-sm leading-7 text-white/70">
            <FlaskConical className="mt-1 h-5 w-5 shrink-0 text-sunshine" />
            Helios is a public routing layer only. EterSolis review is required before any technical, safety, transport, acceptance or commercial action.
          </div>
        </div>
      </div>
    </section>
  );
}
