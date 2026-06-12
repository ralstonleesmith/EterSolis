import Link from 'next/link';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/sell-waste', label: 'Sell Waste' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/industries', label: 'Industries' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-coal/10 bg-white/86 backdrop-blur-xl">
      <div className="container-shell flex min-h-[78px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="EterSolis home">
          <EterSolisLogo variant="dark" mode="full" className="h-14 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold text-coal lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-carbon">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/helios" className="hidden text-sm font-black text-coal hover:text-carbon md:inline-flex">
            Talk to Helios
          </Link>
          <Link href="/sell-waste" className="rounded-full bg-sunshine px-5 py-3 text-sm font-black text-carbon shadow-sm transition hover:translate-y-[-1px]">
            Sell Waste
          </Link>
        </div>
      </div>
    </header>
  );
}
