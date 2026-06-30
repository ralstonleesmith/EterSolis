'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'etersolis-theme';

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'dark' || (!stored && systemPrefersDark());
}

function applyTheme(enabled: boolean) {
  document.documentElement.classList.toggle('dark', enabled);
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const enabled = readTheme();
    applyTheme(enabled);
    setDark(enabled);

    function syncFromStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        const next = event.newValue === 'dark' || (!event.newValue && systemPrefersDark());
        applyTheme(next);
        setDark(next);
      }
    }

    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    function syncFromSystem(event: MediaQueryListEvent) {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        applyTheme(event.matches);
        setDark(event.matches);
      }
    }

    window.addEventListener('storage', syncFromStorage);
    preference.addEventListener('change', syncFromSystem);
    return () => {
      window.removeEventListener('storage', syncFromStorage);
      preference.removeEventListener('change', syncFromSystem);
    };
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.dataset.themeChanging = 'true';
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    setDark(next);
    window.setTimeout(() => {
      delete document.documentElement.dataset.themeChanging;
    }, 220);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group ui-control inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm backdrop-blur transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunshine"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
    >
      {dark ? <Sun className="h-4 w-4 text-sunshine transition group-hover:rotate-12" /> : <Moon className="h-4 w-4 transition group-hover:-rotate-12" />}
    </button>
  );
}
