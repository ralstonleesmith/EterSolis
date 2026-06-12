import Link from 'next/link';

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
    <header className="sticky top-0 z-50 border-b border-cool bg-white/95 backdrop-blur">
      <div className="container-shell flex h-18 min-h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="EterSolis home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-coal/20 bg-sunshine font-bold text-carbon">E</span>
          <span className="text-lg font-bold tracking-wide text-carbon">EterSolis</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-coal lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-carbon">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/helios" className="hidden text-sm font-semibold text-coal hover:text-carbon md:inline-flex">
            Talk to Helios
          </Link>
          <Link href="/sell-waste" className="rounded-full bg-sunshine px-5 py-3 text-sm font-bold text-carbon shadow-sm transition hover:translate-y-[-1px]">
            Sell Waste
          </Link>
        </div>
      </div>
    </header>
  );
}
