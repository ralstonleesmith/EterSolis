import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Workflow, Zap } from 'lucide-react';
import { mediaAssets } from '@/lib/media';
import { MotionReveal } from '@/components/ui/Motion';

const signals = [
  { icon: ShieldCheck, label: 'Controlled review before commitments' },
  { icon: Workflow, label: 'Structured intake and routing' },
  { icon: Zap, label: 'Fast commercial triage' }
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(88svh-78px)] overflow-hidden bg-black py-20 text-white md:min-h-[calc(86svh-78px)]">
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
          <p className="mb-5 inline-flex max-w-full rounded-full border border-sunshine/70 bg-black/35 px-4 py-2 text-sm font-black text-white shadow-sm backdrop-blur">
            We Buy Waste | Resource Recovery | Carbon Management | Circular Economy | Industrial Sustainability
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-none tracking-normal text-white md:text-7xl lg:text-8xl">
            Waste Is Value Waiting To Be Recovered.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-white/82">
            EterSolis is a privately owned waste and carbon management company helping organizations recover value from waste streams, manage carbon exposure and build practical circular economy solutions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/sell-waste#waste-form" className="group inline-flex items-center justify-center gap-3 rounded-full bg-sunshine px-7 py-4 text-center font-black text-black shadow-soft transition hover:-translate-y-0.5">
              Sell Waste To EterSolis <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/contact#contact-form" className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 py-4 text-center font-black text-white backdrop-blur transition hover:border-sunshine hover:bg-white/18">
              Request Assessment
            </Link>
            <Link href="/helios" className="inline-flex items-center justify-center rounded-full px-7 py-4 text-center font-black text-white/86 underline-offset-4 transition hover:text-white hover:underline">
              Talk to Helios
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
      <div className="container-shell absolute inset-x-0 bottom-5 z-10 hidden text-xs font-black uppercase tracking-normal text-white/58 md:block">
        Structured intake, controlled review and practical recovery pathways
      </div>
    </section>
  );
}
