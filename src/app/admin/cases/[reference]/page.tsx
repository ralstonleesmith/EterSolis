import type { Metadata } from 'next';
import Image from 'next/image';
import { generateInvoiceNumber, generateQuotationNumber, paymentReference } from '@/lib/finance';
import { portalStages, qrSvgDataUrl } from '@/lib/portal';

export const metadata: Metadata = { title: 'Admin Case Detail | EterSolis' };

export default async function AdminCaseDetailPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const decoded = decodeURIComponent(reference);
  const panels = [
    ['Customer', 'Guest case with account-claim path, billing entity pending validation.'],
    ['Material', 'Industrial residuals for controlled assessment; documents requested before direct scheduling.'],
    ['Quotation', `${generateQuotationNumber(decoded)} pending commercial approval.`],
    ['Invoice', `${generateInvoiceNumber(decoded)} locked until quotation acceptance.`],
    ['Payment', `${paymentReference(decoded)} will be used for EFT proof and bank-ledger matching.`],
    ['Scheduling', 'Pickup or delivery window opens after payment reconciliation or admin override.'],
    ['Receiving', 'Inbound evidence, weights, photos and operator notes remain internal.'],
    ['Stockpile', 'Lot assignment required before processing batch creation.'],
    ['Processing', 'Repurpose, destruction, recovery or disposal route selected by reviewer.'],
    ['Certificate', 'Issue only after disposition evidence, approval and verification hash.'],
    ['Audit', 'All case, commercial, payment and certificate events remain permanent.'],
    ['Automation', 'Outbound queue and workflow events drive reminders and recovery actions.']
  ];
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_14rem] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin case detail</p>
            <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">{decoded}</h1>
            <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">
              One controlled record for customer history, quotation, invoice, payment proof, scheduling, receiving, stockpile, processing, certificate decisions and audit evidence.
            </p>
          </div>
          <div className="rounded-lg border border-coal/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white">
            <Image src={qrSvgDataUrl(decoded)} alt={`QR code for ${decoded}`} width={224} height={224} className="h-auto w-full" unoptimized />
          </div>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {portalStages.map((stage, index) => (
            <div key={stage} className={`rounded-lg px-4 py-3 text-sm font-black ${index < 2 ? 'bg-sunshine text-black' : 'bg-white text-body dark:bg-white/5 dark:text-on-dark-muted'}`}>
              {stage}
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {panels.map(([title, body]) => (
            <section key={title} className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h2 className="text-xl font-black text-carbon dark:text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
