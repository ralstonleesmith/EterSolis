'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
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

  function isActive(href: string) {
    const route = href.split('#')[0] || '/';
    if (route === '/') return pathname === '/';
    return pathname === route || pathname.startsWith(`${route}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-coal/10 bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-black/86">
      <div className="container-shell flex min-h-[74px] items-center justify-between gap-4 lg:gap-6">
        <Link
          href="/"
          className="brand-no-background -ml-2 flex shrink-0 items-center rounded-2xl px-2 py-2 transition hover:bg-cool/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunshine dark:hover:bg-white/10"
          aria-label="EterSolis home"
          aria-current={pathname === '/' ? 'page' : undefined}
          onClick={() => setOpen(false)}
        >
          <EterSolisLogo variant="dark" mode="mark" className="max-h-11 w-auto sm:hidden dark:hidden flex-none object-contain" />
          <EterSolisLogo variant="light" mode="mark" className="hidden max-h-11 w-auto dark:block sm:dark:hidden flex-none object-contain" />
          <EterSolisLogo variant="dark" mode="full" className="hidden h-14 text-3xl sm:flex dark:hidden flex-none" />
          <EterSolisLogo variant="light" mode="full" className="hidden h-14 text-3xl sm:dark:flex flex-none" />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-coal/10 bg-white/72 p-1 text-sm font-black text-coal shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-white lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-full px-3 py-2 transition hover:bg-cool hover:text-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine dark:hover:bg-white/10 dark:hover:text-sunshine xl:px-4 ${
                isActive(item.href) ? 'bg-sunshine text-black shadow-sm dark:bg-sunshine dark:text-black' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href={actionItems[0].href} className="hidden rounded-full border border-coal/10 bg-white/70 px-4 py-3 text-sm font-black text-coal shadow-sm transition hover:border-sunshine hover:text-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine dark:border-white/10 dark:bg-white/6 dark:text-white dark:hover:text-sunshine md:inline-flex">
            {actionItems[0].label}
          </Link>
          <Link href={actionItems[1].href} className="rounded-full bg-sunshine px-4 py-3 text-sm font-black text-black shadow-sm transition hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon sm:px-5">
            {actionItems[1].label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-coal/20 bg-white/80 text-carbon shadow-sm backdrop-blur transition hover:border-sunshine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine dark:border-white/15 dark:bg-white/10 dark:text-white lg:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-coal/10 bg-white/96 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-black/94 lg:hidden">
          <nav className="container-shell grid gap-2 py-4 text-sm font-black text-carbon dark:text-white" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`rounded-xl px-3 py-3 transition hover:bg-cool focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine dark:hover:bg-white/10 ${
                  isActive(item.href) ? 'bg-sunshine text-black dark:bg-sunshine dark:text-black' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-coal/10 pt-3 dark:border-white/10">
              {actionItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.tone === 'primary'
                    ? 'rounded-xl bg-sunshine px-3 py-3 text-black transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon'
                    : 'rounded-xl border border-coal/10 px-3 py-3 text-coal transition hover:bg-cool focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine dark:border-white/10 dark:text-sunshine dark:hover:bg-white/10'}
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
