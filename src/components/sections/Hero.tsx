import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Workflow, Zap } from 'lucide-react';
import { mediaAssets } from '@/lib/media';
import { MotionReveal } from '@/components/ui/Motion';

const signals = [
  { icon: ShieldCheck, label: 'Quotation-before-payment control' },
  { icon: Workflow, label: 'QR-coded case traceability' },
  { icon: Zap, label: 'Global-ready operating platform' }
];

const flow = ['Intake', 'Quote', 'Invoice', 'Schedule', 'Receive', 'Certify'];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(74svh-78px)] overflow-hidden bg-black py-20 text-white sm:min-h-[calc(80svh-78px)] md:min-h-[calc(86svh-78px)] md:py-28">
      <Image
        src={mediaAssets.hero.src}
        alt={mediaAssets.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.74)_36%,rgba(0,0,0,0.28)_72%,rgba(0,0,0,0.12)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/76 to-transparent" aria-hidden="true" />
      <div className="container-shell relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_0.72fr]">
        <MotionReveal>
          <p className="mb-5 inline-flex max-w-full rounded-full border border-sunshine/70 bg-black/35 px-4 py-2 text-xs font-black text-white shadow-sm backdrop-blur sm:text-sm">
            Controlled Waste Services | Recovery | Carbon | Circular Economy | Operating Portal
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Waste, Resource Recovery and Carbon Operations with Commercial Control.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
            EterSolis turns complex waste, by-product, recovery and certification needs into controlled cases with commercial review, clear payment gates, operational scheduling and permanent records.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/get-started" style={{ backgroundColor: '#0b1220', color: '#ffffff' }} className="group inline-flex items-center justify-center gap-3 rounded-full border border-white px-7 py-4 text-center font-black shadow-soft transition hover:-translate-y-0.5 hover:border-sunshine">
              Start Controlled Intake <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/get-started/assessment" className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 py-4 text-center font-black text-white backdrop-blur transition hover:border-sunshine hover:bg-white/18">
              Request Assessment
            </Link>
            <Link href="/portal" className="inline-flex items-center justify-center rounded-full px-7 py-4 text-center font-black text-white/86 underline-offset-4 transition hover:text-white hover:underline">
              View Portal
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {flow.map((step) => (
              <span key={step} className="rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs font-black text-white/86 backdrop-blur">
                {step}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/insights/introducing-etersolis" className="inline-flex items-center gap-2 text-sm font-black text-sunshine underline-offset-4 hover:underline">
              Read Newsletter Issue 001: Introducing EterSolis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MotionReveal>
        <MotionReveal className="grid gap-3 md:grid-cols-3 lg:grid-cols-1" delay={0.12}>
          {signals.map(({ icon: Icon, label }) => (
            <div key={label} className="card-hover rounded-lg border border-white/15 bg-black/34 p-4 backdrop-blur-md">
              <Icon className="h-5 w-5 text-sunshine" />
              <p className="mt-3 text-sm font-bold leading-6 text-white">{label}</p>
            </div>
          ))}
        </MotionReveal>
      </div>
      <div className="container-shell absolute inset-x-0 bottom-7 z-10 hidden text-xs font-black uppercase tracking-normal text-on-dark-subtle md:block">
        Structured intake, controlled review and practical recovery pathways
      </div>
    </section>
  );
}
