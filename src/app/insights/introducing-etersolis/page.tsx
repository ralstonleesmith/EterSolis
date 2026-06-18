import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Download, Printer } from 'lucide-react';
import { getInsightIssue } from '@/lib/content/insights';

const issue = getInsightIssue('introducing-etersolis');

export const metadata: Metadata = issue ? {
  title: `${issue.title} | EterSolis Insights`,
  description: issue.summary,
  alternates: { canonical: issue.canonicalPath },
  openGraph: { images: [{ url: issue.coverImage, width: 720, height: 900, alt: `${issue.title} cover` }] },
  twitter: { images: [issue.coverImage] }
} : {};

function renderInlineMarkdown(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function MarkdownBlock({ content }: { content: string }) {
  const lines = content.split('\n').filter(Boolean);
  const elements: React.ReactNode[] = [];
  let list: string[] = [];

  function flushList() {
    if (!list.length) return;
    elements.push(<ul key={`list-${elements.length}`} className="mt-4 list-disc space-y-2 pl-6 text-coal dark:text-white/72">{list.map((item) => <li key={item}>{item}</li>)}</ul>);
    list = [];
  }

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={line} className="mt-8 text-2xl font-black text-carbon dark:text-white">{line.replace(/^###\s+/, '')}</h3>);
    } else if (line.startsWith('- ')) {
      list.push(line.replace(/^-\s+/, ''));
    } else if (/^\d+\.\s+/.test(line)) {
      list.push(line.replace(/^\d+\.\s+/, ''));
    } else if (line.startsWith('> ')) {
      flushList();
      elements.push(<blockquote key={line} className="mt-6 border-l-4 border-sunshine bg-sunshine/10 p-5 text-xl font-black italic text-carbon dark:text-white">{line.replace(/^>\s+/, '')}</blockquote>);
    } else {
      flushList();
      elements.push(<p key={line} className="mt-4 leading-8 text-coal dark:text-white/72" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />);
    }
  }
  flushList();
  return <>{elements}</>;
}

export default function IntroducingEterSolisPage() {
  if (!issue) notFound();

  return (
    <article>
      <section className="bg-[#FAFAF7] py-16 dark:bg-black md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg border border-coal/10 bg-white shadow-soft dark:border-white/10 dark:bg-white/5">
            <Image src={issue.coverImage} alt={`${issue.title} newsletter cover`} width={720} height={900} className="h-full w-full object-cover" priority />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-coal/60 dark:text-sunshine">Office of the CSO · Issue {issue.issueNumber}</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-normal text-carbon md:text-7xl dark:text-white">{issue.title}</h1>
            <p className="mt-5 text-2xl font-bold leading-9 text-coal dark:text-white/82">{issue.subtitle}</p>
            <p className="mt-6 max-w-3xl leading-8 text-coal dark:text-white/72">{issue.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={issue.pdfPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5">
                Download original PDF <Download className="h-4 w-4" />
              </a>
              <Link href={`${issue.canonicalPath}/print`} className="inline-flex items-center justify-center gap-2 rounded-full border border-coal/20 bg-white px-6 py-3 font-black text-carbon transition hover:border-sunshine dark:border-white/15 dark:bg-white/10 dark:text-white">
                Print view <Printer className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white dark:bg-[#050505]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-coal/10 bg-[#FAFAF7] p-6 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-black uppercase tracking-normal text-coal/60 dark:text-sunshine">Issue metadata</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div><dt className="font-black text-carbon dark:text-white">Author</dt><dd className="mt-1 text-coal dark:text-white/70">{issue.author}, {issue.authorRole}</dd></div>
                <div><dt className="font-black text-carbon dark:text-white">Published</dt><dd className="mt-1 text-coal dark:text-white/70">{issue.publicationDate}</dd></div>
                <div><dt className="font-black text-carbon dark:text-white">Tags</dt><dd className="mt-2 flex flex-wrap gap-2">{issue.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-carbon dark:bg-black/40 dark:text-white">{tag}</span>)}</dd></div>
              </dl>
            </div>
          </aside>
          <div className="space-y-12">
            {issue.sections.map((section) => (
              <section key={section.title} className="rounded-lg border border-coal/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-10">
                <h2 className="text-4xl font-black tracking-normal text-carbon md:text-5xl dark:text-white">{section.title}</h2>
                <MarkdownBlock content={section.content} />
              </section>
            ))}
            <section className="rounded-lg border border-sunshine/50 bg-sunshine/10 p-7">
              <h2 className="text-2xl font-black text-carbon dark:text-white">Source notes and disclaimer</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-coal dark:text-white/75">{issue.sourceNotes.map((note) => <li key={note}>{note}</li>)}</ul>
            </section>
            <Link href="/insights" className="inline-flex items-center gap-2 font-black text-carbon dark:text-sunshine">Back to Insights <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </article>
  );
}
