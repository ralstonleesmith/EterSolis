import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export function ServiceIntakeBanner() {
  return (
    <section className="border-y border-[--line] bg-[--surface] py-10">
      <div className="container-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Controlled operational intake</p>
          <h2 className="mt-3 text-3xl font-black text-body">Structured intake for pickup, delivery, assessment, processing and certification.</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            Start a structured EterSolis service request. The system routes your material to the correct department, screens safety and documentation requirements, and determines whether the correct pathway is pickup, delivery, assessment, repurpose, destruction, certification, recurring service or selected purchase-eligibility review.
          </p>
          <p className="mt-3 text-sm font-semibold text-body">
            Do not send or deliver material until EterSolis confirms written instructions or an appointment.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link href="/get-started" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 text-center font-black text-black transition hover:-translate-y-0.5">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="mailto:service@etersolis.com" className="inline-flex items-center gap-2 text-sm font-black text-body dark:text-sunshine">
            <Mail className="h-4 w-4" /> service@etersolis.com
          </a>
        </div>
      </div>
    </section>
  );
}
