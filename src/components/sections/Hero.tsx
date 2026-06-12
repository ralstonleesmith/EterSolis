import Link from 'next/link';
import { ArrowRight, ShieldCheck, Workflow, Zap } from 'lucide-react';
import { ResourceFlowVisual } from '@/components/sections/ResourceFlowVisual';

const signals = [
  { icon: ShieldCheck, label: 'Controlled review before commitments' },
  { icon: Workflow, label: 'Structured intake and routing' },
  { icon: Zap, label: 'Fast commercial triage' }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-transparent section-padding">
      <div className="absolute inset-0 surface-grid opacity-[0.32]" aria-hidden="true" />
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-sunshine/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cool blur-3xl" aria-hidden="true" />
      <div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-sunshine/80 bg-white/80 px-4 py-2 text-sm font-black text-carbon shadow-sm backdrop-blur">
            We Buy Waste | Resource Recovery | Carbon Management | Circular Economy | Industrial Sustainability
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-carbon md:text-7xl lg:text-8xl">
            Waste Is Value Waiting To Be Recovered.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-coal">
            EterSolis is a privately owned waste and carbon management company helping organizations recover value from waste streams, manage carbon exposure and build practical circular economy solutions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/sell-waste" className="group inline-flex items-center justify-center gap-3 rounded-full bg-sunshine px-7 py-4 text-center font-black text-carbon shadow-soft transition hover:-translate-y-0.5">
              Sell Waste To EterSolis <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-coal/40 bg-white/70 px-7 py-4 text-center font-black text-carbon backdrop-blur transition hover:border-sunshine hover:bg-white">
              Request Assessment
            </Link>
            <Link href="/helios" className="inline-flex items-center justify-center rounded-full px-7 py-4 text-center font-black text-coal underline-offset-4 transition hover:text-carbon hover:underline">
              Talk to Helios
            </Link>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {signals.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-panel rounded-2xl p-4 card-hover">
                <Icon className="h-5 w-5 text-carbon" />
                <p className="mt-3 text-sm font-bold leading-6 text-carbon">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <ResourceFlowVisual />
      </div>
    </section>
  );
}
