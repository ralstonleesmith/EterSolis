import Link from 'next/link';
import { ArrowRight, Bot, BriefcaseBusiness, Crown, FlaskConical, Handshake, Recycle, ShieldAlert } from 'lucide-react';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';

const chips = [
  { icon: Recycle, label: 'I want to sell waste.', href: '/sell-waste' },
  { icon: ShieldAlert, label: 'I need a waste or carbon assessment.', href: '/contact' },
  { icon: Bot, label: 'I want to discuss resource recovery.', href: '/solutions' },
  { icon: Handshake, label: 'I am a recycler or partner.', href: '/contact' },
  { icon: BriefcaseBusiness, label: 'I am looking for careers or Associate opportunities.', href: '/contact' },
  { icon: Crown, label: 'I need to contact the CEO or CSO.', href: '/contact' }
];

const guardrails = ['No prices quoted', 'No acceptance promises', 'No hazardous handling instructions', 'No protected-system disclosures'];

export function HeliosPanel() {
  return (
    <section className="section-padding bg-white dark:bg-black">
      <div className="container-shell overflow-hidden rounded-[2.5rem] border border-white/10 dark-gradient text-white shadow-soft">
        <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="brand-no-background mb-8">
              <EterSolisLogo variant="light" mode="mark" className="h-24 w-auto" title="EterSolis transparent mark" />
            </div>
            <p className="font-black uppercase tracking-[0.24em] text-sunshine">Helios v0</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">A controlled routing assistant for the right next step.</h2>
            <p className="mt-5 max-w-3xl leading-8 text-white/78">
              Helios is currently implemented as a guided assistant. It routes inquiries without quoting prices, promising acceptance, providing hazardous material instructions, or disclosing protected systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {guardrails.map((guardrail) => (
                <span key={guardrail} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-white/78">{guardrail}</span>
              ))}
            </div>
          </div>
          <div className="grid content-center gap-3 md:grid-cols-2">
            {chips.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="group rounded-2xl border border-white/15 bg-white/10 p-5 font-bold text-white transition hover:-translate-y-1 hover:border-sunshine hover:bg-white/15">
                <Icon className="h-5 w-5 text-sunshine" />
                <span className="mt-5 block leading-6">{label}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-sunshine">Continue <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
