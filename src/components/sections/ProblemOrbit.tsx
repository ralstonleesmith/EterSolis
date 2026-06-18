import { AlertTriangle, BarChart3, Factory, Recycle, Scale } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MotionReveal } from '@/components/ui/Motion';

const problems = [
  { icon: BarChart3, title: 'Waste cost', text: 'Material loss, disposal cost and inefficient handling reduce margin and resilience.' },
  { icon: Recycle, title: 'Lost value', text: 'Recoverable streams are often treated as burdens instead of commercial inputs.' },
  { icon: Factory, title: 'Carbon exposure', text: 'Waste-linked emissions and resource inefficiency create unmanaged carbon pressure.' },
  { icon: Scale, title: 'Compliance complexity', text: 'Organizations need disciplined routing, records and review before action.' },
  { icon: AlertTriangle, title: 'Material flow risk', text: 'Poor separation, weak data and unsafe intake pathways slow recovery decisions.' }
];

export function ProblemOrbit() {
  return (
    <section className="section-padding bg-white">
      <div className="container-shell">
        <MotionReveal>
          <SectionHeader
            eyebrow="Commercial problem map"
            title="Waste problems are usually value, data and routing problems."
            description="The EterSolis approach starts with value retention, practical feasibility and disciplined routing before lower-value residual treatment is considered."
          />
        </MotionReveal>
        <MotionReveal className="mt-12 grid gap-5 md:grid-cols-5" delay={0.08}>
          {problems.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="card-hover relative overflow-hidden rounded-lg border border-coal/10 bg-white p-6 shadow-soft">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-cool">
                <Icon className="h-5 w-5 text-carbon" />
              </div>
              <span className="mt-8 block text-xs font-black uppercase tracking-normal text-coal/60">0{index + 1}</span>
              <h3 className="mt-2 text-xl font-black text-carbon">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-coal">{text}</p>
            </article>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
