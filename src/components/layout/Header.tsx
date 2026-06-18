'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { navItems } from '@/lib/siteContent';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-coal/10 bg-white/88 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-black/82">
      <div className="container-shell flex min-h-[78px] items-center justify-between gap-6">
        <Link href="/" className="brand-no-background flex items-center" aria-label="EterSolis home" onClick={() => setOpen(false)}>
          <EterSolisLogo variant="dark" mode="mark" className="max-h-12 w-auto sm:hidden dark:hidden flex-none object-contain" />
          <EterSolisLogo variant="light" mode="mark" className="hidden max-h-12 w-auto dark:block sm:dark:hidden flex-none object-contain" />
          <EterSolisLogo variant="dark" mode="full" className="hidden h-14 text-3xl sm:flex dark:hidden flex-none" />
          <EterSolisLogo variant="light" mode="full" className="hidden h-14 text-3xl sm:dark:flex flex-none" />
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-bold text-coal lg:flex xl:gap-6" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-full px-3 py-2 transition hover:bg-cool hover:text-carbon dark:hover:bg-white/10 dark:hover:text-sunshine ${
                isActive(item.href) ? 'bg-sunshine/22 text-carbon dark:bg-sunshine/16 dark:text-sunshine' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href="/helios" className="hidden rounded-full border border-coal/10 px-4 py-3 text-sm font-black text-coal transition hover:border-sunshine hover:text-carbon dark:border-white/10 dark:hover:text-sunshine md:inline-flex">
            Talk to Helios
          </Link>
          <Link href="/sell-waste#waste-form" className="rounded-full bg-sunshine px-4 py-3 text-sm font-black text-black shadow-sm transition hover:translate-y-[-1px] sm:px-5">
            Sell Waste
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-coal/20 bg-white/80 text-carbon shadow-sm backdrop-blur transition hover:border-sunshine dark:border-white/15 dark:bg-white/10 dark:text-white lg:hidden"
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
                className={`rounded-lg px-3 py-3 transition hover:bg-cool dark:hover:bg-white/10 ${
                  isActive(item.href) ? 'bg-sunshine text-black dark:bg-sunshine dark:text-black' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/helios"
              className="rounded-lg px-3 py-3 text-coal transition hover:bg-cool dark:text-sunshine dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Talk to Helios
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
