import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceRequestByToken } from '@/lib/serviceRequests';
import { departmentLabel } from '@/lib/operations/taxonomy';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Service Request Status | EterSolis',
  description: 'Check a public EterSolis service-request status reference.'
};

function titleCase(value: string | null | undefined) {
  return (value ?? 'not available').replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const demoRecord = {
  public_reference: 'ES-SR-DEMO-0001',
  request_type: 'assessment',
  department: 'industrial',
  commercial_pathway: 'customer_paid_assessment',
  status: 'submitted',
  risk_level: 'standard',
  payment_status: 'manual_invoice_pending',
  pickup_status: null,
  delivery_status: null,
  certificate_status: 'not_requested',
  data_quality_score: 86
};

export default async function ServiceRequestStatusPage({ params }: { params: Promise<{ publicToken: string }> }) {
  const resolvedParams = await params;
  const record = resolvedParams.publicToken === 'demo-token'
    ? demoRecord
    : await getServiceRequestByToken(resolvedParams.publicToken);
  if (!record) notFound();

  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-4xl">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Public service-request status</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">{record.public_reference}</h1>
        <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">
          This page shows limited public status information. It does not confirm material acceptance, pickup, delivery, certificate issuance, purchase eligibility or regulatory outcome.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ['Request type', titleCase(record.request_type)],
            ['Department', departmentLabel(record.department)],
            ['Status', titleCase(record.status)],
            ['Risk level', titleCase(record.risk_level)],
            ['Commercial pathway', titleCase(record.commercial_pathway)],
            ['Payment', titleCase(record.payment_status)],
            ['Pickup', titleCase(record.pickup_status)],
            ['Delivery', titleCase(record.delivery_status)],
            ['Certificate', titleCase(record.certificate_status)],
            ['Data quality', `${record.data_quality_score}/100`]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">{label}</p>
              <p className="mt-2 font-black text-carbon dark:text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-sunshine/70 bg-sunshine/10 p-5 text-sm font-bold leading-7 text-body">
          Do not deliver or dispatch material unless EterSolis confirms a delivery appointment, receiving location and written instructions.
        </div>
        <Link href="/get-started" className="mt-8 inline-flex rounded-full bg-sunshine px-6 py-3 font-black text-black">
          Start Another Request
        </Link>
      </div>
    </main>
  );
}
