import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { PrintButton } from '@/components/ui/PrintButton';
import { technicalBrief } from '@/lib/technicalBrief';

export const metadata: Metadata = {
  title: `Print ${technicalBrief.title} | EterSolis Insights`,
  description: `Print view for ${technicalBrief.title}: ${technicalBrief.edition}.`,
  robots: { index: false, follow: false },
  alternates: { canonical: technicalBrief.printPath }
};

export default function TechnicalBriefPrintPage() {
  return (
    <article className="technical-brief-print-page bg-white px-4 py-8 text-carbon md:px-8 print:p-0">
      <div className="print-hidden mx-auto mb-8 flex max-w-5xl flex-col gap-4 rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-subtle">Print view · {technicalBrief.documentCode}</p>
          <h1 className="mt-2 text-2xl font-black text-body md:text-3xl">{technicalBrief.title}</h1>
          <p className="mt-2 text-sm font-bold leading-6 text-muted">{technicalBrief.edition} · Issue {technicalBrief.issueNumber} · {technicalBrief.issueDateDisplay}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PrintButton label="Print brief" />
          <a href={technicalBrief.pdfPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-coal/20 bg-white px-6 py-3 font-black text-carbon transition hover:border-sunshine">
            PDF <Download className="h-4 w-4" />
          </a>
          <Link href={technicalBrief.canonicalPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-coal/20 bg-white px-6 py-3 font-black text-carbon transition hover:border-sunshine">
            Back <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        <Image
          src={technicalBrief.briefImagePath}
          alt="Printable CEPA Technical Intelligence Brief Color and Chemicals Industry Edition Issue 001"
          width={2480}
          height={3507}
          className="technical-brief-print-image h-auto w-full bg-white"
          priority
          unoptimized
        />
      </div>
    </article>
  );
}
