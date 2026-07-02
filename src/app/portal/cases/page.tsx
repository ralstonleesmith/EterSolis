import type { Metadata } from 'next';
import { caseReferenceForPreview, portalStages } from '@/lib/portal';

export const metadata: Metadata = {
  title: 'Portal Cases | EterSolis'
};

export default function PortalCasesPage() {
  return <PortalList title="Cases" eyebrow="Case history" active="Technical and commercial review" items={portalStages.map((stage) => `${caseReferenceForPreview()} · ${stage}`)} />;
}

function PortalList({ title, eyebrow, active, items }: { title: string; eyebrow: string; active: string; items: string[] }) {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-5xl">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">{title}</h1>
        <p className="mt-5 leading-8 text-coal dark:text-on-dark-muted">Demo portal data only. Production records remain token-protected, account-linked and audit controlled.</p>
        <div className="mt-10 grid gap-3">
          {items.map((item) => (
            <article key={item} className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="font-black text-carbon dark:text-white">{item}</p>
              <p className="mt-2 text-sm font-bold text-muted">{item.includes(active) ? 'Current stage' : 'Recorded lifecycle step'}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
