'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('etersolis-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', enabled);
    setDark(enabled);
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.dataset.themeChanging = 'true';
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('etersolis-theme', next ? 'dark' : 'light');
    setDark(next);
    window.setTimeout(() => {
      delete document.documentElement.dataset.themeChanging;
    }, 220);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-coal/20 bg-white/90 text-carbon shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sunshine hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/16"
      aria-label="Toggle light and dark mode"
    >
      {dark ? <Sun className="h-4 w-4 text-sunshine transition group-hover:rotate-12" /> : <Moon className="h-4 w-4 transition group-hover:-rotate-12" />}
    </button>
  );
}
