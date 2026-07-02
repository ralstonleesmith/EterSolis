export default function AdminPickupsPage() {
  return <AdminPlaceholder title="Pickups" />;
}

function AdminPlaceholder({ title }: { title: string }) {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">{title}</h1>
        <p className="mt-5 leading-8 text-coal dark:text-on-dark-muted">Operational records are persisted through the service-request flow. Dedicated controls are staged for the next admin iteration.</p>
      </div>
    </main>
  );
}
