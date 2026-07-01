'use client';

import { Printer } from 'lucide-react';

export function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <button
      type="button"
      className="print-hidden inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon"
      onClick={() => window.print()}
    >
      {label} <Printer className="h-4 w-4" />
    </button>
  );
}
