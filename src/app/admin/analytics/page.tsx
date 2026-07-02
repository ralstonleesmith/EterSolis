export default function AdminAnalyticsPage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Analytics</h1>
        <p className="mt-5 leading-8 text-coal dark:text-on-dark-muted">Funnel and service-request events are stored in PostgreSQL for operational intelligence dashboards.</p>
      </div>
    </main>
  );
}
