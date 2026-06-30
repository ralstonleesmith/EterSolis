import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MotionReveal } from '@/components/ui/Motion';

const industries = [
  ['Municipalities', 'Diversion, recycling and public waste stream solutions.'],
  ['Manufacturing', 'Production residues, packaging scrap and material efficiency.'],
  ['Mining and heavy industry', 'Industrial residues, water concerns and carbon exposure.'],
  ['Energy', 'Waste-to-value, by-products and resource efficiency.'],
  ['Retail and distribution', 'Packaging, returns, cardboard, plastics and organics.'],
  ['Commercial property', 'Tenant waste, diversion, reporting and recycling programs.'],
  ['Public entities', 'Structured waste and sustainability program support.'],
  ['Waste operators and recyclers', 'Feedstock, partnerships and commercial collaboration.']
];

export function IndustryMosaic() {
  return (
    <section className="section-padding bg-[--surface-muted]">
      <div className="container-shell">
        <MotionReveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Industries served"
            title="Built for organizations with real material flow."
            description="EterSolis supports operators with material flows that need characterization, hierarchy-based routing and practical recovery decisions."
          />
          <Link href="/industries" className="ui-control inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition">
            View industries <ArrowUpRight className="h-4 w-4" />
          </Link>
        </MotionReveal>
        <MotionReveal className="mt-12 grid gap-4 md:grid-cols-4" delay={0.08}>
          {industries.map(([title, description], index) => (
            <article key={title} className={`ui-surface card-hover rounded-lg p-6 shadow-sm ${index === 0 || index === 2 ? 'md:col-span-2' : ''}`}>
              <p className="text-xs font-black uppercase tracking-normal text-subtle">Sector</p>
              <h3 className="mt-4 text-2xl font-black text-body">{title}</h3>
              <p className="mt-4 leading-7 text-muted">{description}</p>
            </article>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
