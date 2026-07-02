import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, CalendarCheck, FileText, FolderOpen, ReceiptText, UploadCloud } from 'lucide-react';
import { caseReferenceForPreview, portalRoutes, portalStages, qrSvgDataUrl } from '@/lib/portal';

export const metadata: Metadata = {
  title: 'Customer Portal | EterSolis Case Tracking',
  description: 'Preview the EterSolis customer portal for cases, quotations, invoices, uploads, scheduling, payments and certificates.'
};

const cards = [
  { href: '/portal/cases', icon: FolderOpen, title: 'Cases', text: 'Track guest and registered-user cases from submission through closure.' },
  { href: '/portal/quotations', icon: FileText, title: 'Quotations', text: 'Review scope, exclusions, validity, pricing and acceptance options before payment.' },
  { href: '/portal/invoices', icon: ReceiptText, title: 'Invoices', text: 'View invoices, EFT instructions, payment references and outstanding balances.' },
  { href: '/portal/payments', icon: BadgeDollarSign, title: 'Payments', text: 'Upload proof of payment and track reconciliation, receipts and credits.' },
  { href: '/portal/uploads', icon: UploadCloud, title: 'Uploads', text: 'Attach material photos, SDS, proof files, delivery records and correspondence.' },
  { href: '/portal/schedule', icon: CalendarCheck, title: 'Schedule', text: 'Request pickup or delivery windows only after eligibility gates are met.' }
];

export default function PortalPage() {
  const reference = caseReferenceForPreview();
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Customer portal preview</p>
            <h1 className="mt-4 text-4xl font-black tracking-normal text-carbon dark:text-white md:text-6xl">Every EterSolis case has a commercial and operational history.</h1>
            <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">
              Guests can continue with secure public tokens. Registered users can claim cases, review quotations, accept offers, receive invoices, upload proof of payment and follow scheduling, receiving, certification and closure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {portalRoutes.slice(1, 5).map((route) => (
                <Link key={route.href} href={route.href} className="rounded-full border border-coal/15 bg-white px-4 py-2 text-sm font-black text-carbon shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-5 md:grid-cols-[8rem_1fr]">
              <div className="rounded-lg border border-coal/10 bg-white p-3">
                <Image src={qrSvgDataUrl(reference)} alt={`QR code for ${reference}`} width={168} height={168} className="h-auto w-full" unoptimized />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Active demo case</p>
                <h2 className="mt-2 text-3xl font-black text-carbon dark:text-white">{reference}</h2>
                <p className="mt-3 text-sm font-bold leading-7 text-muted">Quotation pending approval · ZAR market · secure guest token available · account claim supported.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-2">
              {portalStages.map((stage, index) => (
                <div key={stage} className={`rounded-lg px-4 py-3 text-sm font-black ${index < 3 ? 'bg-sunshine text-black' : 'bg-[var(--surface-muted)] text-body dark:bg-black/40 dark:text-on-dark-muted'}`}>
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ href, icon: Icon, title, text }) => (
            <Link key={href} href={href} className="card-hover rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Icon className="h-6 w-6 text-sunshine" />
              <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">{text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-carbon dark:text-white">Open <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
