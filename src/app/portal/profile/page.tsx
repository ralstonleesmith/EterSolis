import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Portal Profile | EterSolis' };

const rows = [
  ['Guest access', 'Secure public token', 'Available now'],
  ['Registered account', 'Email and Google sign-in', 'Planned implementation'],
  ['Case claim', 'Email verification and audit log', 'Planned implementation']
];

export default function PortalProfilePage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Account-ready</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">Profile</h1>
        <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">
          The portal remains guest-capable while preparing for registered users, Google sign-in and case claiming.
        </p>
        <div className="mt-10 overflow-x-auto rounded-lg border border-coal/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-coal/10 text-xs font-black uppercase text-subtle dark:border-white/10 dark:text-sunshine">
              <tr>{['Mode', 'Identity control', 'State'].map((column) => <th key={column} className="px-4 py-3">{column}</th>)}</tr>
            </thead>
            <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-coal/10 last:border-0 dark:border-white/10">{row.map((cell) => <td key={cell} className="px-4 py-4 font-bold text-body">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <section id="account-settings" className="mt-10 scroll-mt-28 rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Account settings</p>
          <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">Prepared for secure identity controls.</h2>
          <p className="mt-3 leading-7 text-coal dark:text-on-dark-muted">
            Customer preferences, notification settings, organization membership, admin roles and case-claim controls will activate with the dedicated Auth.js and Google SSO implementation pass.
          </p>
        </section>
      </div>
    </main>
  );
}
