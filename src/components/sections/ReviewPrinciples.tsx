import Link from 'next/link';
import { ArrowRight, ClipboardCheck, FileSearch, Route, ShieldCheck } from 'lucide-react';
import { MotionReveal } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const principles = [
  { icon: FileSearch, title: 'Review before commitments', text: 'Every waste, wastewater and recovery opportunity starts with non-confidential intake and controlled feasibility review.' },
  { icon: Route, title: 'Material routing discipline', text: 'Material streams are routed by category, risk, documentation, location, logistics and commercial fit before next steps are discussed.' },
  { icon: ClipboardCheck, title: 'Documented assessment', text: 'EterSolis keeps public language disciplined and separates inquiry, assessment, acceptance and commercial commitment.' },
  { icon: ShieldCheck, title: 'Safety and legality first', text: 'Hazard, regulated, unknown or sample-transfer concerns require written instructions before any physical movement.' }
];

export function ReviewPrinciples({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section-padding ${compact ? 'bg-white dark:bg-[#050505]' : 'bg-[#FAFAF7] dark:bg-black'}`}>
      <div className="container-shell">
        <MotionReveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Review principles"
            title="Simple public actions. Controlled professional review."
            description="The website is designed to make the next step clear while keeping commercial, safety and technical commitments inside EterSolis review."
          />
          <Link href="/contact#contact-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
            Request Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </MotionReveal>
        <MotionReveal className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4" delay={0.08}>
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card-hover rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sunshine text-black">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-black text-carbon dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-coal dark:text-white/70">{text}</p>
            </article>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
