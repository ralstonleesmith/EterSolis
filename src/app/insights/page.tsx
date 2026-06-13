import type { Metadata } from 'next';
import { BookOpenCheck, DatabaseZap, Recycle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

const articles = [
  {
    icon: Recycle,
    title: 'Why waste streams should be evaluated as recoverable resources',
    summary: 'A controlled introduction to treating waste as material value without overstating feasibility or outcomes.',
    status: 'Planned insight'
  },
  {
    icon: BookOpenCheck,
    title: 'Building practical circular economy programs without unsupported claims',
    summary: 'A disciplined editorial piece on execution, documentation and careful public sustainability language.',
    status: 'Planned insight'
  },
  {
    icon: DatabaseZap,
    title: 'How structured material data improves recovery decisions',
    summary: 'A public-facing explanation of why better intake data improves review quality without exposing protected systems.',
    status: 'Planned insight'
  }
];

export const metadata: Metadata = {
  title: 'EterSolis Insights | Waste, Carbon and Resource Recovery',
  description: 'Controlled EterSolis insights on waste, carbon management, circular economy and resource recovery.',
  alternates: { canonical: '/insights' }
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Controlled insights for waste, carbon and recovery decisions."
        description="The EterSolis insights library will publish responsible, commercially useful content after review. No unsupported claims, no protected-system disclosures and no confidential counterparty details."
        primaryHref="/contact"
        primaryLabel="Request Assessment"
        secondaryHref="/sell-waste"
        secondaryLabel="Submit Waste Stream"
      />
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-shell">
          <div className="grid gap-5 md:grid-cols-3">
            {articles.map(({ icon: Icon, title, summary, status }) => (
              <article key={title} className="card-hover group rounded-lg border border-coal/10 bg-[#FAFAF7] p-7 shadow-soft dark:border-white/10 dark:bg-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sunshine text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-8 text-xs font-black uppercase tracking-normal text-coal/60 dark:text-white/45">{status}</p>
                <h2 className="mt-3 text-2xl font-black tracking-normal text-carbon dark:text-white">{title}</h2>
                <p className="mt-4 leading-7 text-coal dark:text-white/70">{summary}</p>
                <p className="mt-7 text-sm font-black text-carbon dark:text-sunshine">Awaiting editorial approval</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
