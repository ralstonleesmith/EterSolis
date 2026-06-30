'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { navItems } from '@/lib/siteContent';

const actionItems = [
  { href: '/helios', label: 'Helios', tone: 'secondary' },
  { href: '/sell-waste#waste-form', label: 'Sell Waste', tone: 'primary' }
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function isActive(href: string) {
    const route = href.split('#')[0] || '/';
    if (route === '/') return pathname === '/';
    return pathname === route || pathname.startsWith(`${route}/`);
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-shell flex min-h-[74px] items-center justify-between gap-4 lg:gap-6">
        <Link
          href="/"
          className="brand-no-background -ml-2 flex shrink-0 items-center rounded-lg px-2 py-2 transition hover:bg-[var(--control-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunshine"
          aria-label="EterSolis home"
          aria-current={pathname === '/' ? 'page' : undefined}
          onClick={() => setOpen(false)}
        >
          <EterSolisLogo variant="dark" mode="mark" className="max-h-11 w-auto sm:hidden dark:hidden flex-none object-contain" />
          <EterSolisLogo variant="light" mode="mark" className="hidden max-h-11 w-auto dark:block sm:dark:hidden flex-none object-contain" />
          <EterSolisLogo variant="dark" mode="full" className="hidden h-14 text-3xl sm:flex dark:hidden flex-none" />
          <EterSolisLogo variant="light" mode="full" className="hidden h-14 text-3xl sm:dark:flex flex-none" />
        </Link>

        <nav className="site-header-panel hidden items-center gap-1 rounded-full p-1 text-sm font-black lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-full px-3 py-2 transition hover:bg-[var(--control-hover)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine xl:px-4 ${
                isActive(item.href) ? 'bg-sunshine text-black shadow-sm dark:bg-sunshine dark:text-black' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href={actionItems[0].href} className="ui-control hidden rounded-full px-4 py-3 text-sm font-black shadow-sm transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine md:inline-flex">
            {actionItems[0].label}
          </Link>
          <Link href={actionItems[1].href} className="rounded-full bg-sunshine px-4 py-3 text-sm font-black text-black shadow-sm transition hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon sm:px-5">
            {actionItems[1].label}
          </Link>
          <button
            type="button"
            className="ui-control inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm backdrop-blur transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine lg:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[--header-border] bg-[--header-bg] shadow-soft backdrop-blur-xl lg:hidden">
          <nav id="mobile-navigation" className="container-shell grid gap-2 py-4 text-sm font-black text-[var(--text-primary)]" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`rounded-lg px-3 py-3 transition hover:bg-[var(--control-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine ${
                  isActive(item.href) ? 'bg-sunshine text-black dark:bg-sunshine dark:text-black' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-[--header-border] pt-3">
              {actionItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.tone === 'primary'
                    ? 'rounded-lg bg-sunshine px-3 py-3 text-black transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon'
                    : 'ui-control rounded-lg px-3 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine'}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
