export default function AdminPaymentsPage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Payments</h1>
        <p className="mt-5 leading-8 text-coal dark:text-on-dark-muted">MVP payment mode is manual invoice. Provider checkout integrations remain behind the payment abstraction.</p>
      </div>
    </main>
  );
}
