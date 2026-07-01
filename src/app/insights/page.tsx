import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, FileText, Printer, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { getPublishedInsightIssues } from '@/lib/content/insights';
import { technicalBrief } from '@/lib/technicalBrief';

export const metadata: Metadata = {
  title: 'EterSolis Insights | Waste, Carbon and Resource Recovery',
  description: 'Published EterSolis insights on resource recovery, circular economy, water stewardship, carbon management and practical sustainability.',
  alternates: { canonical: '/insights' }
};

export default function InsightsPage() {
  const issues = getPublishedInsightIssues();
  const featured = issues[0];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Technical intelligence for waste, carbon and resource recovery decisions."
        description="CEPA and EterSolis publications for executive review: source-aware, accessible and designed to support practical sustainability decisions without overpromising outcomes."
        primaryHref={technicalBrief.canonicalPath}
        primaryLabel="Read Technical Brief"
        secondaryHref={technicalBrief.printPath}
        secondaryLabel="Print View"
        imageSrc={technicalBrief.mainHeroLogoPath}
        imageAlt="CEPA Technical Intelligence Brief publication hero artwork"
      />
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-shell">
          <article className="overflow-hidden rounded-lg border border-coal/10 bg-white shadow-soft dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden bg-black p-6 text-white md:p-8">
                <Image src={technicalBrief.editionHeroPath} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-35" priority />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.94),rgba(0,0,0,0.62))]" aria-hidden="true" />
                <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <Image src={technicalBrief.cepaLogoMarkPath} alt="CEPA logo mark" width={180} height={120} className="h-14 w-auto object-contain" priority />
                  <div className="h-10 w-px bg-white/18" />
                  <Image src={technicalBrief.etersolisMarkPath} alt="EterSolis mark" width={48} height={48} className="h-10 w-10 rounded-lg object-contain" priority />
                </div>
                <p className="mt-8 text-xs font-black uppercase tracking-normal text-sunshine">Flagship publication · {technicalBrief.edition} · Issue {technicalBrief.issueNumber}</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal text-on-dark md:text-6xl">{technicalBrief.title}</h2>
                <p className="mt-5 text-xl font-bold leading-8 text-on-dark-muted">{technicalBrief.subtitle}</p>
                <p className="mt-5 max-w-3xl leading-8 text-on-dark-muted">{technicalBrief.summary}</p>
                <p className="mt-5 text-sm font-black text-on-dark">{technicalBrief.documentCode}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={technicalBrief.canonicalPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
                    Read brief <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={technicalBrief.printPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 font-black text-on-dark transition hover:border-sunshine">
                    Print view <Printer className="h-4 w-4" />
                  </Link>
                  <a href={technicalBrief.pdfPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 font-black text-on-dark transition hover:border-sunshine">
                    Download PDF <Download className="h-4 w-4" />
                  </a>
                </div>
                </div>
              </div>
              <Link href={technicalBrief.canonicalPath} className="relative block bg-[var(--surface-muted)] p-5 dark:bg-black md:p-8" aria-label="Read the CEPA Technical Intelligence Brief">
                <div className="relative mx-auto aspect-[5/7] max-w-[430px] overflow-hidden rounded-lg border border-coal/10 bg-white shadow-soft dark:border-white/10">
                  <Image src={technicalBrief.issueCoverPath} alt="CEPA Technical Intelligence Brief Issue 001 cover" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover object-top transition duration-500 hover:scale-[1.01]" priority unoptimized />
                </div>
              </Link>
            </div>
          </article>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ['Executive-ready', 'A publication surface built for fast review, source-aware context and precise citation.'],
              ['Readable on site', 'Use the web reader, print view or approved PDF depending on the review context.'],
              ['Controlled claims', 'Brief context is presented without certification, endorsement or guaranteed impact language.']
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-black text-body">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Latest newsletter</p>
              <h2 className="mt-3 text-3xl font-black text-body md:text-4xl">Additional EterSolis insight</h2>
            </div>
          {featured ? (
            <article className="grid gap-8 rounded-lg border border-coal/10 bg-white p-6 shadow-sm md:grid-cols-[0.5fr_1fr] md:p-8 dark:border-white/10 dark:bg-white/5">
              <Link href={featured.canonicalPath} className="relative block overflow-hidden rounded-lg border border-coal/10 bg-white shadow-sm dark:border-white/10 dark:bg-black">
                <Image src={featured.coverImage} alt={`${featured.title} cover`} width={720} height={900} className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]" priority />
              </Link>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Issue {featured.issueNumber} · {new Date(`${featured.publicationDate}T00:00:00Z`).toLocaleDateString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
                <h2 className="mt-4 text-4xl font-black tracking-normal text-carbon md:text-6xl dark:text-white">{featured.title}</h2>
                <p className="mt-4 text-xl font-bold leading-8 text-coal dark:text-on-dark-muted">{featured.subtitle}</p>
                <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">{featured.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => <span key={tag} className="rounded-full border border-coal/10 bg-white px-3 py-2 text-xs font-black uppercase tracking-normal text-carbon dark:border-white/10 dark:bg-black/35 dark:text-white">{tag}</span>)}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={featured.canonicalPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
                    Read the issue <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={featured.pdfPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-coal/20 bg-white px-6 py-3 font-black text-carbon transition hover:border-sunshine dark:border-white/15 dark:bg-white/10 dark:text-white">
                    Download PDF <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ) : null}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <FileText className="h-6 w-6 text-sunshine" />
              <h3 className="mt-5 text-xl font-black text-carbon dark:text-white">Accessible by default</h3>
              <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">Each issue is published as readable HTML with the approved PDF preserved for download and review.</p>
            </article>
            <article className="rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <ShieldCheck className="h-6 w-6 text-sunshine" />
              <h3 className="mt-5 text-xl font-black text-carbon dark:text-white">Controlled claims</h3>
              <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">Insights use careful public language, source notes and disclaimers where alignment or impact context appears.</p>
            </article>
            <article className="rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <ArrowRight className="h-6 w-6 text-sunshine" />
              <h3 className="mt-5 text-xl font-black text-carbon dark:text-white">Repeatable system</h3>
              <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">Newsletter issues are sourced from structured Markdown so future publications stay consistent and reviewable.</p>
            </article>
          </div>

        </div>
      </section>
    </>
  );
}
