import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { kymnisRoutes } from '@/lib/siteContent';

const labels: Record<(typeof kymnisRoutes)[number], string> = {
  '/kymnis': 'Overview',
  '/kymnis/how-it-works': 'How it works',
  '/kymnis/verification': 'Verification',
  '/kymnis/resource-recovery': 'Recovery',
  '/kymnis/contact': 'Register interest'
};

export function KymnisNav({ active }: { active: (typeof kymnisRoutes)[number] }) {
  return (
    <nav className="container-shell -mt-8 mb-12 rounded-2xl border border-coal/10 bg-white/88 p-3 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/6" aria-label="KYMNIS navigation">
      <div className="grid gap-2 md:grid-cols-5">
        {kymnisRoutes.map((href) => (
          <Link
            key={href}
            href={href}
            aria-current={href === active ? 'page' : undefined}
            className={`inline-flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
              href === active
                ? 'bg-sunshine text-black'
                : 'text-carbon hover:bg-cool dark:text-white dark:hover:bg-white/10'
            }`}
          >
            {labels[href]}
            {href === '/kymnis/contact' ? <ArrowRight className="h-4 w-4" /> : null}
          </Link>
        ))}
      </div>
    </nav>
  );
}

