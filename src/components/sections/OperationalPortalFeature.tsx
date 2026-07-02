import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, FileCheck2, QrCode, ShieldCheck, UploadCloud } from 'lucide-react';
import { MotionReveal } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mediaAssets } from '@/lib/media';
import { caseReferenceForPreview, portalStages, qrSvgDataUrl } from '@/lib/portal';

const capabilities = [
  { icon: QrCode, title: 'QR-coded case spine', text: 'Every request becomes a traceable case with a reference, secure public token, lifecycle status and QR route.' },
  { icon: FileCheck2, title: 'Quotation before payment', text: 'Commercial scope is documented before any invoice or payment request is issued.' },
  { icon: BadgeDollarSign, title: 'Internal payment ledger', text: 'Invoices, EFT references, proof uploads, reconciliation and receipts stay inside the operating record.' },
  { icon: UploadCloud, title: 'Controlled uploads', text: 'Material images, SDS, proof of payment, receiving photos and case files attach to the relevant case stage.' },
  { icon: ShieldCheck, title: 'Audit-first operations', text: 'Review, scheduling, receiving, stockpile, processing, certification and closure produce durable audit history.' }
];

export function OperationalPortalFeature() {
  const reference = caseReferenceForPreview();

  return (
    <section className="section-padding bg-white dark:bg-black">
      <div className="container-shell">
        <MotionReveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Operational portal"
              title="Every service request becomes a trackable operational case."
              description="EterSolis is being built as a controlled operating platform: guest-capable, account-capable, admin-controlled and traceable from submission through end-of-life record."
            />
            <div className="mt-8 grid gap-3">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-carbon dark:text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-coal dark:text-on-dark-muted">{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-coal/10 bg-black text-white shadow-soft dark:border-white/10">
            <div className="relative min-h-64">
              <Image src={mediaAssets.hero.src} alt={mediaAssets.hero.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover opacity-65" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-black uppercase tracking-normal text-sunshine">Demo case reference</p>
                <h3 className="mt-2 text-3xl font-black">{reference}</h3>
              </div>
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-[9rem_1fr]">
              <div className="rounded-lg bg-white p-3">
                <Image src={qrSvgDataUrl(reference)} alt={`QR code for ${reference}`} width={180} height={180} className="h-auto w-full" unoptimized />
              </div>
              <div>
                <p className="text-sm font-bold leading-7 text-on-dark-muted">
                  QR references are designed to appear on quotations, invoices, appointment records, receiving documents, stockpile labels and certificates where appropriate.
                </p>
                <div className="mt-5 grid gap-2">
                  {portalStages.slice(0, 6).map((stage) => (
                    <div key={stage} className="rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-xs font-black uppercase tracking-normal text-on-dark-muted">
                      {stage}
                    </div>
                  ))}
                </div>
                <Link href="/portal" className="mt-6 inline-flex items-center gap-2 rounded-full bg-sunshine px-5 py-3 font-black text-black">
                  View portal preview <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
