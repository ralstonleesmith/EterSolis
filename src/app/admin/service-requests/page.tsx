import { listServiceRequests } from '@/lib/serviceRequests';

export const dynamic = 'force-dynamic';

function titleCase(value: string | null | undefined) {
  return (value ?? 'not available').replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function AdminServiceRequestsPage() {
  const rows = await listServiceRequests().catch(() => []);

  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Service requests</h1>
        <div className="mt-10 overflow-x-auto rounded-lg border border-coal/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-coal/10 text-xs font-black uppercase tracking-normal text-subtle dark:border-white/10 dark:text-sunshine">
              <tr>
                {['Reference', 'Customer', 'Type', 'Department', 'Risk', 'Commercial', 'Payment', 'Status'].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-coal/10 last:border-0 dark:border-white/10">
                  <td className="px-4 py-3 font-black text-carbon dark:text-white">{row.public_reference}</td>
                  <td className="px-4 py-3 text-muted">{row.company_name ?? row.email ?? 'Unknown'}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.request_type)}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.department)}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.risk_level)}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.commercial_pathway)}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.payment_status)}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.status)}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr><td className="px-4 py-8 text-muted" colSpan={8}>No service requests available or database migration has not been applied.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
