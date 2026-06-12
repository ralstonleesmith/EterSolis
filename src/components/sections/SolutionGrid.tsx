import Link from 'next/link';
import { ArrowUpRight, Factory, Leaf, LineChart, Recycle, ShieldCheck, Workflow } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const solutions = [
  { icon: Recycle, title: 'Resource Recovery', description: 'Recover value from waste streams through responsible reuse, recycling, recovery and valorization pathways.', cta: 'Assess Recovery Potential' },
  { icon: ShieldCheck, title: 'Waste Management', description: 'Develop structured waste and material management programs that reduce cost, risk and operational friction.', cta: 'Discuss Waste Program' },
  { icon: LineChart, title: 'Carbon Management', description: 'Support carbon measurement, reduction planning and practical decarbonization actions linked to resource and waste systems.', cta: 'Request Carbon Review' },
  { icon: Workflow, title: 'Circular Economy', description: 'Design pathways that keep materials in productive use and reduce unnecessary disposal.', cta: 'Build Circular Program' },
  { icon: Leaf, title: 'Waste Valorization', description: 'Identify suitable routes to convert selected waste and by-products into economic, operational or environmental value.', cta: 'Submit Valorization Opportunity' },
  { icon: Factory, title: 'Industrial Decarbonization', description: 'Help industrial operators reduce material losses, waste-linked emissions and resource inefficiency.', cta: 'Request Industrial Assessment' }
];

export function SolutionGrid() {
  return (
    <section className="section-padding dark-gradient">
      <div className="container-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Core solutions"
            title="A commercial architecture for recovery, carbon and circular execution."
            description="Each solution is framed around a practical problem, a disciplined EterSolis response, the data needed for review and a controlled next step."
            invert
          />
          <Link href="/solutions" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-carbon transition hover:bg-sunshine">
            Explore solutions <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, description, cta }) => (
            <article key={title} className="card-hover group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-1 bg-sunshine opacity-80" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sunshine text-carbon">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-white">{title}</h3>
              <p className="mt-4 min-h-28 leading-7 text-white/76">{description}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-black text-sunshine">
                {cta} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
