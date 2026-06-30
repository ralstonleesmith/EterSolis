import type { Metadata } from 'next';
import { Database, FileLock2, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

const sections = [
  {
    icon: Database,
    title: 'Information collected',
    text: 'EterSolis may collect contact details, company information, material descriptions, inquiry topics, routing information, consent records, technical metadata and information voluntarily submitted through website forms.'
  },
  {
    icon: UserCheck,
    title: 'How information is used',
    text: 'Information is used to review inquiries, route communications, assess waste opportunities, manage partnerships, respond to privacy or legal requests and maintain controlled business records.'
  },
  {
    icon: ShieldCheck,
    title: 'Protection standard',
    text: 'EterSolis treats submitted information as controlled business information and applies reasonable administrative, technical and operational safeguards appropriate to the inquiry type.'
  },
  {
    icon: FileLock2,
    title: 'Confidentiality limitation',
    text: 'Users should not submit confidential, restricted, regulated, third-party, proprietary or sensitive information unless EterSolis has provided an approved intake route or written instructions.'
  }
];

export const metadata: Metadata = {
  title: 'Privacy | EterSolis',
  description: 'EterSolis website privacy notice for inquiry and lead submissions.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Notice"
        description="EterSolis collects only the information needed to review, route and respond to website inquiries, waste opportunities and controlled contact requests."
        primaryHref="mailto:privacy@etersolis.com"
        primaryLabel="Contact Privacy Route"
        secondaryHref="/contact"
        secondaryLabel="Contact EterSolis"
      />
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          {sections.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card-hover rounded-lg border border-coal/10 bg-[var(--surface-muted)] p-7 shadow-soft dark:border-white/10 dark:bg-white/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-6 text-2xl font-black text-carbon dark:text-white">{title}</h2>
              <p className="mt-4 leading-8 text-coal dark:text-on-dark-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pb-24 bg-white dark:bg-black">
        <div className="container-shell rounded-lg border border-sunshine/60 bg-sunshine/10 p-7 dark:bg-sunshine/8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Privacy requests</p>
              <p className="mt-2 text-lg font-black text-carbon dark:text-white">Send privacy requests to privacy@etersolis.com.</p>
            </div>
            <a href="mailto:privacy@etersolis.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-6 py-3 font-black text-black">
              <Mail className="h-4 w-4" /> privacy@etersolis.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
