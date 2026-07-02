'use client';

import Link from 'next/link';
import { ChevronDown, CircleUserRound, LogIn, LogOut, Settings, ShieldCheck, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const storageKey = 'etersolis-account-preview';
const accountButtonStyle = { backgroundColor: '#0b1220', color: '#ffffff' };

export function AccountAccess() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSignedIn(window.localStorage.getItem(storageKey) === 'signed-in');
  }, []);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', close);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function previewSignIn() {
    window.localStorage.setItem(storageKey, 'signed-in');
    setSignedIn(true);
    setOpen(false);
  }

  function signOut() {
    window.localStorage.removeItem(storageKey);
    setSignedIn(false);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-label={signedIn ? 'Open account menu' : 'Login / Sign up'}
        aria-haspopup="menu"
        aria-expanded={open}
        title={signedIn ? 'Account' : 'Login / Sign up'}
        onClick={() => setOpen((current) => !current)}
        style={accountButtonStyle}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:border-sunshine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine sm:px-4"
      >
        {signedIn ? <CircleUserRound className="h-5 w-5" /> : <LogIn className="h-4 w-4" />}
        <span className="hidden sm:inline">{signedIn ? 'Account' : 'Login / Sign up'}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-lg border border-coal/10 bg-white p-2 text-sm shadow-soft dark:border-white/10 dark:bg-black"
        >
          {signedIn ? (
            <>
              <div className="px-3 py-3">
                <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-on-dark-subtle">Signed in preview</p>
                <p className="mt-1 font-black text-carbon dark:text-white">EterSolis Account</p>
              </div>
              <MenuLink href="/portal/profile" icon={UserRound} label="User/Admin Profile" />
              <MenuLink href="/portal/profile#account-settings" icon={Settings} label="Account settings" />
              <MenuLink href="/portal" icon={CircleUserRound} label="User Portal" />
              <MenuLink href="/admin" icon={ShieldCheck} label="Admin Portal" />
              <button
                type="button"
                role="menuitem"
                onClick={signOut}
                className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-black text-carbon transition hover:bg-[var(--surface-muted)] dark:text-white dark:hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 text-sunshine" /> Sign out
              </button>
            </>
          ) : (
            <>
              <div className="px-3 py-3">
                <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-on-dark-subtle">Portal access</p>
                <p className="mt-1 font-black text-carbon dark:text-white">Continue as a customer or administrator.</p>
              </div>
              <MenuLink href="/portal/login" icon={UserRound} label="User login / sign up" />
              <MenuLink href="/admin/login" icon={ShieldCheck} label="Admin login" />
              <button
                type="button"
                role="menuitem"
                onClick={previewSignIn}
                className="mt-2 flex w-full items-center gap-3 rounded-lg bg-sunshine px-3 py-3 text-left font-black text-black transition hover:brightness-95"
              >
                <CircleUserRound className="h-4 w-4" /> Preview signed-in account
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-3 rounded-lg px-3 py-3 font-black text-carbon transition hover:bg-[var(--surface-muted)] dark:text-white dark:hover:bg-white/10"
    >
      <Icon className="h-4 w-4 text-sunshine" /> {label}
    </Link>
  );
}
