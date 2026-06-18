import Link from 'next/link';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';
import { contactRoutes } from '@/lib/siteContent';

export function Footer() {
  return (
    <footer className="dark-gradient text-white">
      <div className="container-shell grid gap-10 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <EterSolisLogo variant="light" mode="full" className="flex h-20 text-3xl" />
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/76">
            Waste & Carbon Management. Resource Recovery | Wastewater Treatment | Circular Economy | Carbon Management | Waste Valorization | Industrial Decarbonization.
          </p>
          <div className="mt-8 flex gap-3">
            <EterSolisLogo variant="light" mode="mark" className="h-14 w-auto object-contain" title="EterSolis mark" />
            <div className="h-16 w-px bg-white/20" />
            <p className="max-w-sm text-xs font-bold uppercase leading-6 tracking-normal text-sunshine">Official transparent mark usage. No background box.</p>
          </div>
        </div>
        <div>
          <p className="font-black text-white">Routes</p>
          <ul className="mt-3 space-y-3 text-sm text-white/76">
            {contactRoutes.slice(0, 5).map(({ label, email }) => (
              <li key={email}>
                <span className="block text-xs font-black uppercase tracking-wide text-sunshine">{label}</span>
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-black text-white">Website</p>
          <ul className="mt-3 space-y-3 text-sm text-white/76">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/media-credits" className="hover:text-white">Media Credits</Link></li>
            <li><Link href="/contact#contact-form" className="hover:text-white">Contact</Link></li>
            <li><Link href="/sell-waste#waste-form" className="hover:text-white">Sell Waste</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell text-xs text-white/62">
          © 2026 EterSolis. All rights reserved. Proprietary and confidential source code.
        </div>
      </div>
    </footer>
  );
}
