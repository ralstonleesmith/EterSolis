export default async function AdminServiceRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-4xl">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Service request detail</h1>
        <p className="mt-5 rounded-lg border border-coal/10 bg-white p-5 font-mono text-sm text-carbon shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">{resolvedParams.id}</p>
      </div>
    </main>
  );
}
