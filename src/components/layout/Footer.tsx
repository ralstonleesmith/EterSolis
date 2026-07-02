import Link from 'next/link';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';
import { contactRoutes, kymnisRoutes } from '@/lib/siteContent';
import { technicalBrief } from '@/lib/technicalBrief';

export function Footer() {
  return (
    <footer className="dark-gradient text-white">
      <div className="container-shell grid gap-10 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <EterSolisLogo variant="light" mode="full" className="flex h-20 text-3xl" />
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/76">
            Resource-first thinking, applied science, practical stewardship and long-term value for waste, water, materials and circular economy systems.
          </p>
          <div className="mt-8 flex gap-3">
            <EterSolisLogo variant="light" mode="mark" className="h-14 w-auto object-contain" title="EterSolis mark" />
            <div className="h-16 w-px bg-white/20" />
            <p className="max-w-sm text-xs font-bold uppercase leading-6 tracking-normal text-sunshine">EterSolis marks, systems, source code and protected operating methods are reserved property.</p>
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
            <li><Link href={kymnisRoutes[0]} className="hover:text-white">KYMNIS</Link></li>
            <li><Link href="/insights/introducing-etersolis" className="hover:text-white">Newsletter Issue 001</Link></li>
            <li><Link href={technicalBrief.canonicalPath} className="hover:text-white">Technical Intelligence Brief</Link></li>
            <li><Link href="/media-credits" className="hover:text-white">Media Credits</Link></li>
            <li><Link href="/contact#contact-form" className="hover:text-white">Contact</Link></li>
            <li><Link href="/get-started" className="hover:text-white">Get Started</Link></li>
            <li><Link href="/certificates/verify" className="hover:text-white">Verify Certificate</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell text-xs text-on-dark-subtle">
          © 2026 EterSolis. All rights reserved. Proprietary and confidential source code.
        </div>
      </div>
    </footer>
  );
}
