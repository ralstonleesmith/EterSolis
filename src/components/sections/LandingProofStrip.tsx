import { BadgeCheck, FileCheck2, Globe2, QrCode } from 'lucide-react';
import { MotionReveal } from '@/components/ui/Motion';

const items = [
  { icon: QrCode, label: 'Case traceability', text: 'Every request can become a QR-coded operating record.' },
  { icon: FileCheck2, label: 'Commercial control', text: 'Quotation before invoice. Invoice before payment collection.' },
  { icon: BadgeCheck, label: 'Evidence-led certificates', text: 'Certificates require receiving, disposition and approval evidence.' },
  { icon: Globe2, label: 'Global-ready model', text: 'South Africa first, with market, currency and routing structures prepared.' }
];

export function LandingProofStrip() {
  return (
    <section className="border-y border-[--line] bg-white py-6 dark:bg-black">
      <div className="container-shell">
        <MotionReveal className="grid gap-3 md:grid-cols-4">
          {items.map(({ icon: Icon, label, text }) => (
            <article key={label} className="rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-carbon dark:text-white">{label}</h2>
                  <p className="mt-1 text-xs font-bold leading-5 text-muted">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
