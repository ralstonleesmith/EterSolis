import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Droplets, FlaskConical, ShieldCheck } from 'lucide-react';
import { mediaAssets } from '@/lib/media';
import { MotionReveal } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const proofPoints = [
  { icon: Droplets, label: 'Treatment residuals', text: 'Structured review for wastewater-linked streams, sludges, screenings and recovery-adjacent outputs.' },
  { icon: FlaskConical, label: 'Controlled assessment', text: 'Non-confidential intake first, then safety, regulatory, logistics and feasibility screening.' },
  { icon: ShieldCheck, label: 'No unsupported claims', text: 'Public language stays disciplined until EterSolis review confirms the appropriate next step.' }
];

const photos = [
  mediaAssets.wastewater.aerial,
  mediaAssets.wastewater.aeration,
  mediaAssets.wastewater.lagoon
];

export function WastewaterTreatmentFeature() {
  return (
    <section className="section-padding bg-white dark:bg-[#050505]">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
          <MotionReveal className="relative min-h-[34rem] overflow-hidden rounded-lg bg-black shadow-soft">
            <Image
              src={mediaAssets.wastewater.hero.src}
              alt={mediaAssets.wastewater.hero.alt}
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.76)_100%)]" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-xs font-black uppercase tracking-normal text-sunshine">Water recovery infrastructure</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-normal md:text-5xl">
                Wastewater treatment is a resource, risk and routing question.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/76">
                EterSolis can route water and wastewater-linked opportunities through a controlled commercial review path without making premature technical or acceptance commitments.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal className="flex flex-col justify-between gap-8 rounded-lg border border-coal/10 bg-[#FAFAF7] p-7 shadow-soft dark:border-white/10 dark:bg-white/5" delay={0.08}>
            <SectionHeader
              eyebrow="Wastewater treatment"
              title="Add wastewater-linked material streams to the same disciplined intake path."
              description="Use this route for treatment residuals, recovery-adjacent infrastructure questions and commercial review of wastewater-linked by-products. EterSolis review is required before any operational action."
            />
            <div className="grid gap-4">
              {proofPoints.map(({ icon: Icon, label, text }) => (
                <div key={label} className="rounded-lg border border-coal/10 bg-white p-5 dark:border-white/10 dark:bg-black/30">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-carbon dark:text-white">{label}</h3>
                      <p className="mt-2 text-sm leading-6 text-coal dark:text-white/70">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#contact-form" className="group inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
                Request Wastewater Assessment <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href="/sell-waste#waste-form" className="inline-flex items-center justify-center rounded-full border border-coal/20 bg-white px-6 py-3 font-black text-carbon transition hover:border-sunshine dark:border-white/15 dark:bg-white/10 dark:text-white">
                Submit Treatment Residual
              </Link>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal className="mt-5 grid gap-5 md:grid-cols-3" delay={0.12}>
          {photos.map((photo) => (
            <figure key={photo.src} className="overflow-hidden rounded-lg border border-coal/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="relative aspect-[16/10] bg-black">
                <Image src={photo.previewSrc} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 hover:scale-[1.03]" />
              </div>
              <figcaption className="p-4 text-xs font-bold leading-5 text-coal dark:text-white/62">
                {photo.credit}
              </figcaption>
            </figure>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
