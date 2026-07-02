import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Certificate Verification Result | EterSolis',
  description: 'Public EterSolis certificate verification result.'
};

function titleCase(value: string | null | undefined) {
  return (value ?? 'not available').replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function CertificateResultPage({ params }: { params: Promise<{ certificateId: string }> }) {
  const resolvedParams = await params;
  const result = await getPool().query(
    `select certificate_number, certificate_type, verification_hash, public_token, status, issued_at, created_at
       from certificates
      where public_token = $1 or certificate_number = $1
      limit 1`,
    [resolvedParams.certificateId]
  );
  const certificate = result.rows[0];
  if (!certificate) notFound();

  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-4xl">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Certificate verification result</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">{certificate.certificate_number}</h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Validity</p>
            <p className="mt-2 font-black text-carbon dark:text-white">{certificate.status === 'issued' ? 'Valid issued certificate' : titleCase(certificate.status)}</p>
          </div>
          <div className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Type</p>
            <p className="mt-2 font-black text-carbon dark:text-white">{titleCase(certificate.certificate_type)}</p>
          </div>
          <div className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Issue date</p>
            <p className="mt-2 font-black text-carbon dark:text-white">{certificate.issued_at ? new Date(certificate.issued_at).toLocaleDateString() : 'Not issued'}</p>
          </div>
          <div className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Verification hash</p>
            <p className="mt-2 break-all font-mono text-xs text-carbon dark:text-white">{certificate.verification_hash}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
