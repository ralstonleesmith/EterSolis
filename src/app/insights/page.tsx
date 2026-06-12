import type { Metadata } from 'next';

const articles = [
  'Why waste streams should be evaluated as recoverable resources',
  'Building practical circular economy programs without unsupported claims',
  'How structured material data improves recovery decisions'
];

export const metadata: Metadata = {
  title: 'EterSolis Insights | Waste, Carbon and Resource Recovery',
  description: 'Controlled EterSolis insights on waste, carbon management, circular economy and resource recovery.',
  alternates: { canonical: '/insights' }
};

export default function InsightsPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-shell">
        <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Insights</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold text-carbon">Controlled insights for waste, carbon and recovery decisions.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-coal">
          The full EterSolis insights library will be published after content review. Initial articles will focus on responsible recovery, practical circular economy execution and disciplined sustainability communication.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((title) => (
            <article key={title} className="rounded-3xl border border-cool bg-cool p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-coal/70">Planned insight</p>
              <h2 className="mt-3 text-xl font-bold text-carbon">{title}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
