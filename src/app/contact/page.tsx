import type { Metadata } from 'next';
import { BriefcaseBusiness, Crown, FlaskConical, Handshake, Mail, Scale, Send } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageHero } from '@/components/ui/PageHero';

const routes = [
  { icon: Send, label: 'Waste opportunities', email: 'waste@etersolis.com', purpose: 'Waste purchase, material stream, by-product and recovery inquiries.' },
  { icon: Mail, label: 'General inquiries', email: 'info@etersolis.com', purpose: 'General contact and low-specificity website inquiries.' },
  { icon: Handshake, label: 'Partnerships', email: 'partnerships@etersolis.com', purpose: 'Recovery partners, universities, logistics, labs, technology and commercial partners.' },
  { icon: Crown, label: 'Founder and CEO', email: 'smith@etersolis.com', purpose: 'Executive, strategic, investor and high-value commercial inquiries.' },
  { icon: FlaskConical, label: 'Chief Scientific Officer', email: 'cso@etersolis.com', purpose: 'Technical, scientific, disclosure, talent and controlled documentation matters.' },
  { icon: Scale, label: 'Privacy/legal', email: 'privacy@etersolis.com', purpose: 'Privacy requests, data subject requests and website policy contacts.' },
  { icon: BriefcaseBusiness, label: 'Talent inquiries', email: 'careers@etersolis.com', purpose: 'Career and Associate Program inquiries when public intake is activated.' }
];

export const metadata: Metadata = {
  title: 'Contact EterSolis | Waste Opportunities, Assessments and Partnerships',
  description: 'Contact EterSolis for waste opportunities, assessments, partnerships, executive inquiries, CSO inquiries and privacy requests.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Route your inquiry to the correct EterSolis reviewer."
        description="Use the appropriate route so waste, partnership, technical, executive, privacy and general inquiries reach the correct review path."
        primaryHref="#contact-form"
        primaryLabel="Submit Inquiry"
        secondaryHref="/sell-waste"
        secondaryLabel="Sell Waste"
      />
      <section className="section-padding bg-[#FAFAF7] dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="grid gap-4">
              {routes.map(({ icon: Icon, label, email, purpose }) => (
                <article key={email} className="card-hover rounded-[2rem] border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
                    <div>
                      <h2 className="font-black text-carbon dark:text-white">{label}</h2>
                      <a href={`mailto:${email}`} className="mt-1 block font-black text-carbon dark:text-sunshine">{email}</a>
                      <p className="mt-2 text-sm leading-6 text-coal dark:text-white/70">{purpose}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div id="contact-form" className="scroll-mt-28">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
