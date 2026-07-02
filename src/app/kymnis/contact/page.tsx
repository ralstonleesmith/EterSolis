import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { KymnisHero } from '@/components/kymnis/KymnisHero';
import { KymnisNav } from '@/components/kymnis/KymnisNav';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';

export const metadata: Metadata = {
  title: 'Contact KYMNIS | Register Platform Interest',
  description: 'Register non-confidential KYMNIS interest for environmental intelligence, verification, resource recovery and improvement routing.',
  alternates: { canonical: '/kymnis/contact' }
};

export default function KymnisContactPage() {
  return (
    <>
      <KymnisHero
        eyebrow="KYMNIS contact"
        title="Register non-confidential KYMNIS interest."
        description="Use this route for platform participation, environmental intelligence, impact registration, verification, resource recovery, producer responsibility or compliance-support discussions."
      />
      <KymnisNav active="/kymnis/contact" />
      <section className="section-padding bg-mist dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-coal/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-normal text-body dark:text-white">Submission boundary</p>
            <h2 className="mt-4 text-3xl font-black text-carbon dark:text-white">This is platform interest intake, not an emergency report line.</h2>
            <p className="mt-4 font-bold leading-8 text-body">
              Provide a concise, non-confidential summary. KYMNIS review is required before any verification, recovery, commercial or technical action.
            </p>
          </div>
          <div id="contact-form" className="scroll-mt-28">
            <ContactForm defaultTopic="KYMNIS" />
          </div>
        </div>
      </section>
      <HeliosPrompt mode="kymnis" context="kymnis" />
    </>
  );
}
