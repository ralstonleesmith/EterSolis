import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { caseReferenceForPreview } from '@/lib/portal';

type ConsoleRow = {
  label: string;
  value: string;
  state?: string;
};

export function PortalAdminConsole({
  eyebrow,
  title,
  description,
  rows,
  actionHref,
  actionLabel = 'Open demo case'
}: {
  eyebrow: string;
  title: string;
  description: string;
  rows: ConsoleRow[];
  actionHref?: string;
  actionLabel?: string;
}) {
  const href = actionHref ?? `/admin/cases/${caseReferenceForPreview()}`;
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">{eyebrow}</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-4xl font-black text-carbon dark:text-white md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">{description}</p>
          </div>
          <Link href={href} className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-5 py-3 text-sm font-black text-black shadow-sm">
            {actionLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">{row.label}</p>
              <p className="mt-3 text-2xl font-black text-carbon dark:text-white">{row.value}</p>
              {row.state ? <p className="mt-2 text-sm font-bold text-muted">{row.state}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
