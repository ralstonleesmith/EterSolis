'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
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
  const mode: HeliosMode = pathname.startsWith('/kymnis') ? 'kymnis' : 'etersolis';
  const intents = getHeliosIntents(mode, contextForPath(pathname)).slice(0, 4);

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-5 sm:max-w-[calc(100vw-2rem)]">
      {open ? (
        <div className="mb-3 w-full rounded-[2rem] border border-coal/10 bg-white/96 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#070707]/96 sm:w-[24rem]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-coal/70 dark:text-sunshine">
                <Image src={mediaAssets.helios.icon.src} alt="" width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-5 w-5 rounded-full object-cover" /> Helios
              </p>
              <h2 className="mt-1 text-lg font-black text-carbon dark:text-white">Guided next-step routing</h2>
              <p className="mt-1 text-xs font-bold text-coal/70 dark:text-white/58">{mode === 'kymnis' ? 'KYMNIS mode' : 'EterSolis mode'}</p>
            </div>
            <button type="button" className="rounded-full border border-coal/10 p-2 text-carbon dark:border-white/10 dark:text-white" onClick={() => setOpen(false)} aria-label="Close Helios launcher">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 grid gap-2">
            {intents.map((intent) => (
              <Link key={intent.id} href={intent.href} className="group rounded-2xl border border-coal/10 bg-cool p-3 text-sm font-black text-carbon transition hover:-translate-y-0.5 hover:border-sunshine dark:border-white/10 dark:bg-white/6 dark:text-white" onClick={() => setOpen(false)}>
                <span className="flex items-center justify-between gap-3">
                  {intent.label}
                  <ArrowRight className="h-4 w-4 text-sunshine transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 block text-xs font-bold leading-5 text-coal/70 dark:text-white/68">{intent.description}</span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs font-bold leading-5 text-coal/65 dark:text-white/55">
            Public routing only. KYMNIS review required before commitments.
          </p>
        </div>
      ) : null}
      <button
        type="button"
        className="ml-auto flex items-center gap-2 rounded-full bg-sunshine px-5 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <Image src={mediaAssets.helios.icon.src} alt="" width={mediaAssets.helios.icon.width} height={mediaAssets.helios.icon.height} className="h-6 w-6 rounded-full object-cover" /> Ask Helios
      </button>
    </div>
  );
}
