import Link from 'next/link';

const adminLinks = [
  ['/admin/service-requests', 'Service Requests'],
  ['/admin/pickups', 'Pickups'],
  ['/admin/deliveries', 'Deliveries'],
  ['/admin/payments', 'Payments'],
  ['/admin/certificates', 'Certificates'],
  ['/admin/delivery-events', 'Delivery Events'],
  ['/admin/analytics', 'Analytics']
];

export default function AdminHomePage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Admin MVP</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">EterSolis operations dashboard.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {adminLinks.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-lg border border-coal/10 bg-white p-6 font-black text-carbon shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
