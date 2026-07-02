import { listOutboundEvents } from '@/lib/deliveryQueue';

export const dynamic = 'force-dynamic';

function titleCase(value: string | null | undefined) {
  return (value ?? 'not available').replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function AdminDeliveryEventsPage() {
  const rows = await listOutboundEvents(undefined, 100).catch(() => []);

  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Delivery events</h1>
        <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">
          CRM, email, analytics and admin-task delivery events are persisted for retry, dead-letter review and manual recovery.
        </p>
        <div className="mt-10 overflow-x-auto rounded-lg border border-coal/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-coal/10 text-xs font-black uppercase tracking-normal text-subtle dark:border-white/10 dark:text-sunshine">
              <tr>
                {['Type', 'Destination', 'Status', 'Attempts', 'Next attempt', 'Last error', 'Recovery actions'].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-coal/10 last:border-0 dark:border-white/10">
                  <td className="px-4 py-3 font-black text-carbon dark:text-white">{titleCase(row.event_type)}</td>
                  <td className="px-4 py-3 text-muted">{row.destination}</td>
                  <td className="px-4 py-3 text-muted">{titleCase(row.status)}</td>
                  <td className="px-4 py-3 text-muted">{row.attempts} / {row.max_attempts}</td>
                  <td className="px-4 py-3 text-muted">{row.next_attempt_at ? new Date(row.next_attempt_at).toLocaleString() : 'Not scheduled'}</td>
                  <td className="px-4 py-3 text-muted">{row.last_error ?? 'None'}</td>
                  <td className="px-4 py-3">
                    <div className="flex min-w-44 flex-wrap gap-2">
                      <code className="rounded bg-cool px-2 py-1 text-xs font-bold text-carbon dark:bg-black dark:text-on-dark">POST retry</code>
                      <code className="rounded bg-cool px-2 py-1 text-xs font-bold text-carbon dark:bg-black dark:text-on-dark">POST resolve</code>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr><td className="px-4 py-8 text-muted" colSpan={7}>No delivery events available or queue migration has not been applied.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
