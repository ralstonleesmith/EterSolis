import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | EterSolis'
};

export default async function AdminLoginPage({ searchParams }: { searchParams?: Promise<{ next?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-xl">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Protected admin</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white">EterSolis admin login</h1>
        <form className="ui-surface mt-8 grid gap-5 rounded-lg p-6 shadow-soft" action="/api/admin/login" method="post">
          <input type="hidden" name="next" value={resolvedSearchParams?.next ?? '/admin'} />
          <label className="grid gap-2 text-sm font-black text-body">
            Admin shared secret
            <input name="secret" type="password" required className="ui-field rounded-lg px-4 py-3 shadow-sm transition focus:border-sunshine" />
          </label>
          <button className="rounded-full bg-sunshine px-6 py-3 font-black text-black" type="submit">
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
