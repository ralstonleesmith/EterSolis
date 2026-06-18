import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { kymnisBrand, kymnisGuardrails } from '@/lib/kymnis';
import { mediaAssets } from '@/lib/media';

export function KymnisHero({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-black py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,125,121,0.34),transparent_32rem),radial-gradient(circle_at_86%_18%,rgba(217,165,32,0.26),transparent_28rem),linear-gradient(135deg,#020617_0%,#101f1f_48%,#2D2D2D_100%)]" aria-hidden="true" />
      <div className="container-shell relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <Image src={mediaAssets.kymnis.mark.src} alt={mediaAssets.kymnis.mark.alt} width={86} height={86} className="h-20 w-20 rounded-2xl object-contain" priority />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D9A520]">{eyebrow ?? kymnisBrand.name}</p>
              <p className="mt-2 max-w-xl text-sm font-bold text-white/64">{kymnisBrand.expansion}</p>
            </div>
          </div>
          <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            {title ?? kymnisBrand.tagline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">{description ?? kymnisBrand.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kymnis/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A520] px-7 py-4 font-black text-black shadow-soft transition hover:-translate-y-0.5">
              Register interest <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/kymnis/how-it-works" className="inline-flex items-center justify-center rounded-full border border-white/18 px-7 py-4 font-black text-white transition hover:border-[#D9A520]">
              See the pathway
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/12 bg-white/8 p-6 shadow-soft backdrop-blur">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-[#D9A520]" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Public-use guardrails</p>
              <p className="mt-1 font-black text-white">{kymnisBrand.philosophy}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {kymnisGuardrails.map((guardrail) => (
              <div key={guardrail} className="rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm font-bold text-white/78">
                {guardrail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
