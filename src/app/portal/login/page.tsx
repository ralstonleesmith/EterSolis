import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, UserRound } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portal Login | EterSolis',
  description: 'Access EterSolis customer and administrator portal pathways.'
};

export default function PortalLoginPage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Portal access</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black text-carbon dark:text-white md:text-6xl">Access your EterSolis case history, invoices, payments and operating records.</h1>
        <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">
          Customer account access and administrator SSO are staged for the dedicated authentication pass. Current preview routes show the intended account experience without exposing production records.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link href="/portal" className="card-hover rounded-lg border border-coal/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
            <UserRound className="h-7 w-7 text-sunshine" />
            <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">User portal</h2>
            <p className="mt-3 leading-7 text-coal dark:text-on-dark-muted">Preview customer cases, quotations, invoices, proof uploads, scheduling and certificates.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-black text-carbon dark:text-white">Open user portal <ArrowRight className="h-4 w-4" /></span>
          </Link>
          <Link href="/admin/login" className="card-hover rounded-lg border border-coal/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
            <ShieldCheck className="h-7 w-7 text-sunshine" />
            <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">Admin access</h2>
            <p className="mt-3 leading-7 text-coal dark:text-on-dark-muted">Continue to the protected admin route for operational case, quote, invoice, reconciliation and certificate control.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-black text-carbon dark:text-white">Open admin login <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </div>
    </main>
  );
}
