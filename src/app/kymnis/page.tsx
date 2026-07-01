import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, Layers3, MapPinned, Route, ShieldCheck } from 'lucide-react';
import { KymnisHero } from '@/components/kymnis/KymnisHero';
import { KymnisNav } from '@/components/kymnis/KymnisNav';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';
import {
  kymnisAppExperience,
  kymnisBrand,
  kymnisFlow,
  kymnisGuardrails,
  kymnisOutcomeSignals,
  kymnisPathways,
  kymnisPillars,
  kymnisSectionLinks,
  kymnisUserJourney
} from '@/lib/kymnis';

export const metadata: Metadata = {
  title: 'KYMNIS | Environmental Intelligence and Verified Impact Pathways',
  description: kymnisBrand.description,
  alternates: { canonical: '/kymnis' }
};

const sectionIcons = [MapPinned, ClipboardCheck, Route, Layers3, ShieldCheck] as const;

export default function KymnisPage() {
  return (
    <>
      <KymnisHero />
      <KymnisNav active="/kymnis" />

      <nav className="sticky top-[74px] z-30 border-y border-coal/10 bg-white/92 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/86" aria-label="KYMNIS page sections">
        <div className="container-shell flex gap-2 overflow-x-auto">
          {kymnisSectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="shrink-0 rounded-full border border-coal/10 px-4 py-2 text-sm font-black text-body transition hover:border-[--kymnis-teal] hover:bg-[var(--surface-muted)] dark:border-white/10">
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="section-padding bg-mist dark:bg-black">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-subtle">Platform shape</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-body md:text-5xl">A calm public interface for complex environmental truth.</h2>
            <p className="mt-5 leading-8 text-muted">{kymnisBrand.mission}</p>
            <p className="mt-4 leading-8 text-muted">The experience must feel simple to the reporter and disciplined to the reviewer. KYMNIS keeps those needs separate so the public layer stays easy while verification remains controlled.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {kymnisPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <CheckCircle2 className="h-5 w-5 text-[--kymnis-teal]" />
                <h3 className="mt-4 text-xl font-black text-body">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pathway" className="section-padding bg-white dark:bg-black">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-subtle">Choose your pathway</p>
              <h2 className="mt-4 text-4xl font-black tracking-normal text-body md:text-5xl">The next step should be obvious.</h2>
            </div>
            <p className="leading-8 text-muted">KYMNIS routes different users without asking them to understand the full system. Each pathway starts simple and moves into review only when the right information is present.</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {kymnisPathways.map((pathway, index) => {
              const Icon = sectionIcons[index] ?? Route;
              return (
                <article key={pathway.label} className="group flex min-h-full flex-col rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[--kymnis-teal] dark:border-white/10 dark:bg-white/5">
                  <Icon className="h-6 w-6 text-[--kymnis-teal]" />
                  <p className="mt-5 text-xs font-black uppercase tracking-normal text-subtle">{pathway.audience}</p>
                  <h3 className="mt-2 text-2xl font-black text-body">{pathway.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{pathway.description}</p>
                  <Link href={pathway.href} className="mt-5 inline-flex items-center gap-2 font-black text-body">
                    {pathway.action} <ArrowRight className="h-4 w-4 text-[--kymnis-teal] transition group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="app-experience" className="section-padding bg-mist dark:bg-black kymnis-glow">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-subtle">App experience</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-body md:text-5xl">Show the problem. Track the path. Understand the outcome.</h2>
            <p className="mt-5 leading-8 text-muted">KYMNIS should feel smooth because the interface handles complexity progressively. Users see simple choices first, then status, review and improvement signals as the pathway matures.</p>
            <div className="mt-7 grid gap-3">
              {kymnisUserJourney.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg border border-coal/10 bg-white p-4 text-sm font-black text-body dark:border-white/10 dark:bg-white/5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[--kymnis-teal] text-white">0{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {kymnisAppExperience.map((panel) => (
              <article key={panel.title} className="rounded-lg border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-black uppercase tracking-normal text-subtle">{panel.detail}</p>
                <h3 className="mt-3 text-2xl font-black text-body">{panel.title}</h3>
                <p className="mt-3 leading-7 text-muted">{panel.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="verification" className="section-padding bg-white dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-subtle">Verification discipline</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-body md:text-5xl">Observation is not the same as verified truth.</h2>
            <p className="mt-5 leading-8 text-muted">KYMNIS protects the difference. A report can be useful before it is verified, but public claims stay bounded until evidence, context and responsible review are complete.</p>
            <Link href="/kymnis/verification" className="mt-7 inline-flex items-center gap-2 rounded-full bg-carbon px-6 py-3 font-black text-white dark:bg-white dark:text-black">
              Review verification <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {kymnisFlow.map((step, index) => (
              <div key={step} className="rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 dark:border-white/10 dark:bg-white/5">
                <span className="text-xs font-black uppercase tracking-normal text-subtle">Sequence {index + 1}</span>
                <p className="mt-2 text-xl font-black text-body">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recovery" className="section-padding bg-mist dark:bg-black">
        <div className="container-shell rounded-lg border border-coal/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-black uppercase tracking-normal text-subtle">Recovery and outcomes</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.5fr_0.5fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-black tracking-normal text-body md:text-5xl">Recovery routes turn impact context into useful work.</h2>
              <p className="mt-5 leading-8 text-muted">Where appropriate, KYMNIS connects impact reporting to recoverable resources, controlled collection, partner review and measurable improvement.</p>
              <Link href="/kymnis/resource-recovery" className="mt-7 inline-flex items-center gap-2 rounded-full border border-coal/20 px-6 py-3 font-black text-body transition hover:border-[--kymnis-teal] dark:border-white/15">
                Review resource recovery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {kymnisOutcomeSignals.map((signal) => (
                <div key={signal} className="rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-4 font-black text-body dark:border-white/10 dark:bg-black/40">
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="guardrails" className="section-padding bg-white dark:bg-black">
        <div className="container-shell">
          <p className="text-xs font-black uppercase tracking-normal text-subtle">Public-use guardrails</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-normal text-body md:text-5xl">Useful, calm and bounded by design.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {kymnisGuardrails.map((guardrail) => (
              <div key={guardrail} className="rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 font-black text-body dark:border-white/10 dark:bg-white/5">
                {guardrail}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="interest" className="section-padding bg-black text-white signal-grid">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.65fr_0.35fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-sunshine">Register interest</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-on-dark md:text-5xl">{kymnisBrand.essence}</h2>
            <p className="mt-5 max-w-3xl leading-8 text-on-dark-muted">Use the public route for concise, non-confidential KYMNIS participation interest. Controlled review remains human-led.</p>
          </div>
          <Link href="/kymnis/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black shadow-soft transition hover:-translate-y-0.5">
            Register interest <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <HeliosPrompt mode="kymnis" context="kymnis" />
    </>
  );
}
