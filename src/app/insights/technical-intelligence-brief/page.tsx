import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { technicalBrief } from '@/lib/technicalBrief';

export const metadata: Metadata = {
  title: `${technicalBrief.title} | EterSolis Insights`,
  description: technicalBrief.summary,
  alternates: { canonical: technicalBrief.canonicalPath }
};

export default function TechnicalIntelligenceBriefPage() {
  return (
    <article>
      <section className="section-padding bg-black text-white signal-grid">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_0.42fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-sunshine">{technicalBrief.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-tight tracking-normal text-on-dark md:text-7xl">
              {technicalBrief.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl font-bold leading-9 text-on-dark-muted">{technicalBrief.subtitle}</p>
            <p className="mt-5 max-w-3xl leading-8 text-on-dark-muted">{technicalBrief.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/insights" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
                Back to Insights <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 font-black text-on-dark-muted">
                PDF upload pending
              </span>
            </div>
          </div>
          <aside className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-soft backdrop-blur">
            <FileText className="h-8 w-8 text-sunshine" />
            <p className="mt-5 text-xs font-black uppercase tracking-normal text-on-dark-subtle">Publication status</p>
            <h2 className="mt-2 text-2xl font-black text-on-dark">{technicalBrief.status}</h2>
            <p className="mt-4 text-sm leading-7 text-on-dark-muted">
              The final PDF will be linked only after the approved document is uploaded to the controlled public media path.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-padding bg-[var(--surface-muted)]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <section className="ui-surface rounded-lg p-7 shadow-soft md:p-9">
            <ShieldCheck className="h-7 w-7 text-sunshine" />
            <p className="mt-5 text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Publication standard</p>
            <h2 className="mt-3 text-3xl font-black text-body">Release only when the brief is complete, reviewed and source-aware.</h2>
            <div className="mt-6 grid gap-3">
              {technicalBrief.standards.map((standard) => (
                <div key={standard} className="ui-surface-muted flex gap-3 rounded-lg p-4 text-sm font-bold leading-6 text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sunshine" />
                  {standard}
                </div>
              ))}
            </div>
          </section>

          <section className="ui-surface rounded-lg p-7 shadow-soft md:p-9">
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Upload checklist</p>
            <h2 className="mt-3 text-3xl font-black text-body">When the final document is ready.</h2>
            <ol className="mt-6 space-y-3 text-sm font-bold leading-6 text-muted">
              {technicalBrief.uploadSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sunshine text-xs font-black text-black">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-lg border border-sunshine/60 bg-sunshine/10 p-4 text-sm font-bold leading-7 text-body">
              Expected PDF path: <code>{technicalBrief.expectedPdfPath}</code>
            </div>
          </section>
        </div>
      </section>
    </article>
  );
}
