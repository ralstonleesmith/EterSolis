'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Minus, X } from 'lucide-react';
import { getHeliosIntents, type HeliosMode } from '@/lib/helios';
import { mediaAssets } from '@/lib/media';

function contextForPath(pathname: string) {
  if (pathname.includes('verification')) return 'verification';
  if (pathname.includes('resource-recovery') || pathname.includes('sell-waste') || pathname.includes('solutions')) return 'recovery';
  if (pathname.includes('contact')) return 'contact';
  if (pathname.includes('kymnis')) return 'kymnis';
  return 'general';
}

export function HeliosLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<HeliosMode>(pathname.startsWith('/kymnis') ? 'kymnis' : 'etersolis');
  const [ready, setReady] = useState(false);
  const intents = getHeliosIntents(mode, contextForPath(pathname)).slice(0, 4);
  const formSensitive = pathname.includes('contact') || pathname.includes('sell-waste');

  useEffect(() => {
    setOpen(false);
    setMode(pathname.startsWith('/kymnis') ? 'kymnis' : 'etersolis');
  }, [pathname]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    setReady(true);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  if (pathname === '/helios') return null;

  return (
    <div className={`fixed inset-x-4 z-40 sm:inset-x-auto sm:right-5 sm:max-w-[calc(100vw-2rem)] ${formSensitive ? 'bottom-[calc(4.75rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(1rem+env(safe-area-inset-bottom))]'}`}>
      {open ? (
        <div className="ui-surface mb-3 max-h-[min(72vh,38rem)] w-full overflow-y-auto rounded-lg p-4 shadow-soft backdrop-blur-xl sm:w-[25rem]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">
                <Image src={mediaAssets.helios.icon.darkSrc} alt="" width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-5 w-5 object-contain dark:hidden" />
                <Image src={mediaAssets.helios.icon.lightSrc} alt="" width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="hidden h-5 w-5 object-contain dark:block" /> Helios
              </p>
              <h2 className="mt-1 text-lg font-black text-body">Guided next-step routing</h2>
              <p className="mt-1 text-xs font-bold text-subtle">{mode === 'kymnis' ? 'KYMNIS mode' : 'EterSolis mode'}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="ui-control rounded-full p-2" onClick={() => setOpen(false)} aria-label="Minimize Helios launcher">
                <Minus className="h-4 w-4" />
              </button>
              <button type="button" className="ui-control rounded-full p-2" onClick={() => setOpen(false)} aria-label="Close Helios launcher">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-1 dark:border-white/10">
            {(['etersolis', 'kymnis'] as const).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                onClick={() => setMode(nextMode)}
                className={`rounded-lg px-3 py-2 text-sm font-black transition ${
                  mode === nextMode ? 'bg-carbon text-white dark:bg-white dark:text-black' : 'text-muted hover:bg-white/70 dark:hover:bg-white/10'
                }`}
                aria-pressed={mode === nextMode}
              >
                {nextMode === 'etersolis' ? 'EterSolis' : 'KYMNIS'}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            {intents.map((intent) => (
              <Link key={intent.id} href={intent.href} className="ui-surface-muted group rounded-lg p-3 text-sm font-black transition hover:-translate-y-0.5 hover:border-sunshine" onClick={() => setOpen(false)}>
                <span className="flex items-center justify-between gap-3">
                  {intent.label}
                  <ArrowRight className="h-4 w-4 text-sunshine transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 block text-xs font-bold leading-5 text-muted">{intent.description}</span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs font-bold leading-5 text-subtle">
            Public routing only. KYMNIS review required before commitments.
          </p>
          <Link href="/helios" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-carbon px-5 py-3 font-black text-white dark:bg-white dark:text-black" onClick={() => setOpen(false)}>
            Open full Helios <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
      <button
        type="button"
        className="ml-auto flex items-center gap-2 rounded-full bg-sunshine px-5 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        data-ready={ready ? 'true' : 'false'}
      >
        <Image src={mediaAssets.helios.icon.darkSrc} alt="" width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-6 w-6 object-contain" /> Ask Helios
      </button>
    </div>
  );
}
