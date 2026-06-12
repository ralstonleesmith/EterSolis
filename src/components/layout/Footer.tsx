import Link from 'next/link';

const routes = [
  ['Waste opportunities', 'waste@etersolis.com'],
  ['General inquiries', 'info@etersolis.com'],
  ['Partnerships', 'partnerships@etersolis.com'],
  ['Founder & CEO', 'smith@etersolis.com'],
  ['Chief Scientific Officer', 'cso@etersolis.com']
];

export function Footer() {
  return (
    <footer className="border-t border-cool bg-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-xl font-bold text-carbon">EterSolis</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-coal">
            Waste & Carbon Management. Resource Recovery | Circular Economy | Carbon Management | Waste Valorization | Industrial Decarbonization.
          </p>
        </div>
        <div>
          <p className="font-semibold text-carbon">Routes</p>
          <ul className="mt-3 space-y-2 text-sm text-coal">
            {routes.map(([label, email]) => (
              <li key={email}>
                <span className="block text-xs uppercase tracking-wide text-coal/70">{label}</span>
                <a href={`mailto:${email}`} className="hover:text-carbon">{email}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-carbon">Website</p>
          <ul className="mt-3 space-y-2 text-sm text-coal">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/sell-waste">Sell Waste</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cool py-5">
        <div className="container-shell text-xs text-coal/75">
          © 2026 EterSolis. All rights reserved. Proprietary and confidential source code.
        </div>
      </div>
    </footer>
  );
}
