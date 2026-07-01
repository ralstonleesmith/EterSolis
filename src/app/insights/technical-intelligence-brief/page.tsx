import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Download, FileText, Printer, ShieldCheck } from 'lucide-react';
import { technicalBrief } from '@/lib/technicalBrief';

export const metadata: Metadata = {
  title: `${technicalBrief.title}: ${technicalBrief.edition} | EterSolis Insights`,
  description: technicalBrief.summary,
  keywords: [...technicalBrief.keywords],
  alternates: { canonical: technicalBrief.canonicalPath },
  openGraph: {
    title: `${technicalBrief.title}: ${technicalBrief.edition}`,
    description: technicalBrief.summary,
    type: 'article'
  }
};

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="ui-surface-muted rounded-lg p-4">
      <dt className="text-xs font-black uppercase tracking-normal text-subtle">{label}</dt>
      <dd className="mt-2 text-sm font-black leading-6 text-body">{value}</dd>
    </div>
  );
}

export default function TechnicalIntelligenceBriefPage() {
  return (
    <article className="bg-white dark:bg-black">
      <section className="section-padding bg-black text-white signal-grid">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_0.42fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-4 rounded-lg border border-white/12 bg-white/8 px-4 py-3 shadow-soft backdrop-blur">
              <Image src={technicalBrief.cepaStampPath} alt="CEPA stamp logo" width={72} height={72} className="h-12 w-12 rounded-lg bg-white object-contain p-1" priority />
              <Image src={technicalBrief.cepaLogoMarkPath} alt="CEPA logo mark" width={144} height={96} className="h-12 w-auto object-contain" priority />
              <div className="h-9 w-px bg-white/18" />
              <Image src={technicalBrief.etersolisMarkPath} alt="EterSolis mark" width={44} height={44} className="h-9 w-9 rounded-lg object-contain" priority />
            </div>
            <p className="mt-8 text-xs font-black uppercase tracking-normal text-sunshine">{technicalBrief.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-tight tracking-normal text-on-dark md:text-7xl">
              {technicalBrief.title}
            </h1>
            <p className="mt-5 max-w-4xl text-2xl font-black leading-9 text-on-dark">{technicalBrief.edition}</p>
            <p className="mt-5 max-w-3xl text-xl font-bold leading-9 text-on-dark-muted">{technicalBrief.subtitle}</p>
            <p className="mt-5 max-w-3xl leading-8 text-on-dark-muted">{technicalBrief.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#brief-reader" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
                Read on this page <FileText className="h-4 w-4" />
              </a>
              <Link href={technicalBrief.printPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 font-black text-on-dark transition hover:border-sunshine">
                Print view <Printer className="h-4 w-4" />
              </Link>
              <a href={technicalBrief.pdfPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 font-black text-on-dark transition hover:border-sunshine">
                {technicalBrief.downloadLabel} <Download className="h-4 w-4" />
              </a>
              <Link href="/insights" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 font-black text-on-dark transition hover:border-sunshine">
                Back to Insights <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <aside className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-soft backdrop-blur">
            <Image src={technicalBrief.cepaStampPath} alt="CEPA stamp logo" width={112} height={112} className="h-20 w-20 object-contain" priority />
            <p className="mt-6 text-xs font-black uppercase tracking-normal text-on-dark-subtle">Publication status</p>
            <h2 className="mt-2 text-3xl font-black text-on-dark">{technicalBrief.status} flagship issue</h2>
            <p className="mt-4 text-sm leading-7 text-on-dark-muted">
              Issue {technicalBrief.issueNumber} is available to read on this page, with the approved PDF available for download.
            </p>
          </aside>
        </div>
      </section>

      <section id="brief-reader" className="section-padding bg-white dark:bg-black">
        <div className="container-shell">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-subtle">Publication reader</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-body md:text-5xl">{technicalBrief.readerTitle}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-muted">
                The complete issue is embedded below for direct review. The downloadable PDF remains available for offline reading and formal citation.
              </p>
            </div>
            <Link href={technicalBrief.printPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
              Print view <Printer className="h-4 w-4" />
            </Link>
            <a href={technicalBrief.pdfPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-coal/20 bg-white px-6 py-3 font-black text-carbon transition hover:border-sunshine dark:border-white/15 dark:bg-white/10 dark:text-white">
              Open PDF <Download className="h-4 w-4" />
            </a>
          </div>
          <div className="ui-surface overflow-hidden rounded-lg bg-white p-3 shadow-soft md:p-5 dark:bg-black">
            <Image
              src={technicalBrief.briefImagePath}
              alt="Readable CEPA Technical Intelligence Brief Color and Chemicals Industry Edition Issue 001"
              width={2480}
              height={3507}
              className="mx-auto h-auto w-full max-w-5xl rounded-md border border-coal/10 bg-white shadow-sm dark:border-white/10"
              sizes="(min-width: 1280px) 960px, 100vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-black">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
          <section className="ui-surface rounded-lg p-7 shadow-soft md:p-9">
            <FileText className="h-8 w-8 text-sunshine" />
            <p className="mt-6 text-xs font-black uppercase tracking-normal text-subtle">Executive overview</p>
            <h2 className="mt-3 text-3xl font-black text-body md:text-4xl">A flagship brief for executive technical review.</h2>
            <div className="mt-7 grid gap-4">
              {technicalBrief.synopsis.map((item) => (
                <div key={item} className="ui-surface-muted flex gap-3 rounded-lg p-4 text-sm font-bold leading-6 text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sunshine" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-lg border border-sunshine/50 bg-sunshine/10 p-5 text-sm font-bold leading-7 text-body">
              The embedded reader and download link provide access to the same approved publication.
            </div>
          </section>

          <aside className="ui-surface rounded-lg p-7 shadow-soft md:p-9">
            <p className="text-xs font-black uppercase tracking-normal text-subtle">Publication details</p>
            <dl className="mt-5 grid gap-3">
              <MetadataItem label="Issue" value={`${technicalBrief.releaseTier} Issue ${technicalBrief.issueNumber}`} />
              <MetadataItem label="Date" value={technicalBrief.issueDateDisplay} />
              <MetadataItem label="Document code" value={technicalBrief.documentCode} />
              <MetadataItem label="Publisher" value={technicalBrief.publisher} />
              <MetadataItem label="Prepared by" value={technicalBrief.preparedBy} />
              <MetadataItem label="Length" value={`${technicalBrief.pageCount} pages`} />
            </dl>
          </aside>
        </div>
      </section>

      <section className="section-padding bg-[var(--surface-muted)]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.5fr_0.5fr]">
          <section className="ui-surface rounded-lg p-7 shadow-soft md:p-9">
            <ShieldCheck className="h-7 w-7 text-sunshine" />
            <p className="mt-5 text-xs font-black uppercase tracking-normal text-subtle">Responsible use</p>
            <h2 className="mt-3 text-3xl font-black text-body">Professional context for public readers.</h2>
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
            <p className="text-xs font-black uppercase tracking-normal text-subtle">Citation</p>
            <h2 className="mt-3 text-3xl font-black text-body">Reference this issue precisely.</h2>
            <p className="mt-5 rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 text-sm font-bold leading-7 text-muted dark:border-white/10">
              {technicalBrief.citation}
            </p>
            <p className="mt-5 text-sm font-bold leading-7 text-muted">
              This issue is presented under CEPA publication controls and EterSolis website standards.
            </p>
            <a href={technicalBrief.pdfPath} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
              Download PDF <Download className="h-4 w-4" />
            </a>
          </section>
        </div>
      </section>
    </article>
  );
}
