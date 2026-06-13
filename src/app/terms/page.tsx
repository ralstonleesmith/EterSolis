import type { Metadata } from 'next';
import { AlertTriangle, Ban, FileText, LockKeyhole, PackageX } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

const terms = [
  {
    icon: FileText,
    title: 'Informational website use',
    text: 'Website content is provided for general business inquiry and informational purposes only. It is not technical advice, legal advice, transport approval, disposal instruction, quotation, acceptance or commercial commitment.'
  },
  {
    icon: Ban,
    title: 'No automatic acceptance',
    text: 'Submitting a waste opportunity is non-binding. EterSolis review is required before any purchase, acceptance, transport, sample transfer, technical assessment or commercial commitment.'
  },
  {
    icon: PackageX,
    title: 'No unsolicited samples',
    text: 'Do not send physical samples or materials unless EterSolis provides written intake instructions. Unapproved samples or material movements are not authorized.'
  },
  {
    icon: AlertTriangle,
    title: 'Regulated material caution',
    text: 'Hazardous, regulated, biological, chemical, medical, radioactive or unknown materials require manual review and written instructions before any physical movement.'
  },
  {
    icon: LockKeyhole,
    title: 'Rights reserved',
    text: 'EterSolis reserves all rights in its website, software, documentation, brand assets, content, proprietary systems, operating methods and controlled materials.'
  }
];

export const metadata: Metadata = {
  title: 'Terms | EterSolis',
  description: 'EterSolis website terms, non-binding waste submission notice and no-sample instruction.',
  alternates: { canonical: '/terms' }
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Website Terms"
        description="These terms protect controlled communication, non-binding waste submissions, brand assets and EterSolis proprietary materials."
        primaryHref="/sell-waste"
        primaryLabel="Sell Waste To EterSolis"
        secondaryHref="/contact"
        secondaryLabel="Contact EterSolis"
      />
      <section className="section-padding bg-[#FAFAF7] dark:bg-black">
        <div className="container-shell grid gap-5 lg:grid-cols-5">
          {terms.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className={`card-hover rounded-lg border border-coal/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-white/5 ${index < 2 ? 'lg:col-span-2' : ''}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-6 text-2xl font-black text-carbon dark:text-white">{title}</h2>
              <p className="mt-4 leading-8 text-coal dark:text-white/72">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
