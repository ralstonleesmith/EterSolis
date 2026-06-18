import { notFound } from 'next/navigation';
import { getInsightIssue } from '@/lib/content/insights';

export const metadata = {
  title: 'Print Issue 001 | EterSolis Insights',
  robots: { index: false, follow: false }
};

export default function PrintIssuePage() {
  const issue = getInsightIssue('introducing-etersolis');
  if (!issue) notFound();

  return (
    <main className="bg-white px-8 py-10 text-carbon print:p-0">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-wide text-coal">EterSolis Office of the CSO · Issue {issue.issueNumber}</p>
        <h1 className="mt-4 text-5xl font-black leading-tight">{issue.title}</h1>
        <p className="mt-3 text-2xl font-bold text-coal">{issue.subtitle}</p>
        <p className="mt-6 leading-8 text-coal">{issue.summary}</p>
        <hr className="my-10 border-coal/20" />
        {issue.sections.map((section) => (
          <section key={section.title} className="break-inside-avoid py-6">
            <h2 className="text-3xl font-black">{section.title}</h2>
            <div className="mt-4 whitespace-pre-line leading-8 text-coal">{section.content.replace(/^###\s+/gm, '').replace(/^>\s+/gm, '')}</div>
          </section>
        ))}
        <hr className="my-10 border-coal/20" />
        <p className="text-sm font-bold text-coal">{issue.sourceNotes.join(' ')}</p>
      </article>
    </main>
  );
}
