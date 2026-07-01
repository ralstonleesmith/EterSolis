import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { mediaAssets } from '@/lib/media';
import { MotionReveal } from '@/components/ui/Motion';

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = '/sell-waste#waste-form',
  primaryLabel = 'Sell Waste To EterSolis',
  secondaryHref = '/contact#contact-form',
  secondaryLabel = 'Request Assessment',
  imageSrc = mediaAssets.facility.previewSrc,
  imageAlt = mediaAssets.facility.alt
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[calc(72svh-78px)] overflow-hidden bg-black py-16 text-white md:min-h-[calc(66svh-78px)] md:py-20">
      <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.26)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
      <div className="container-shell relative z-10 flex items-end">
        <MotionReveal className="max-w-5xl">
          <p className="inline-flex rounded-full border border-sunshine/70 bg-black/35 px-4 py-2 text-xs font-black uppercase tracking-normal text-white shadow-sm backdrop-blur">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-normal text-white md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-on-dark-muted">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white px-7 py-4 font-black shadow-soft transition hover:-translate-y-0.5 hover:border-sunshine"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              {primaryLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 py-4 font-black text-white backdrop-blur transition hover:border-sunshine hover:bg-white/18">
              {secondaryLabel}
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
