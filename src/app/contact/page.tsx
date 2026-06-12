import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';

const routes = [
  ['Waste opportunities', 'waste@etersolis.com', 'Waste purchase, material stream, by-product and recovery inquiries.'],
  ['General inquiries', 'info@etersolis.com', 'General contact and low-specificity website inquiries.'],
  ['Partnerships', 'partnerships@etersolis.com', 'Recovery partners, universities, logistics, labs, technology and commercial partners.'],
  ['Founder and CEO', 'smith@etersolis.com', 'Executive, strategic, investor and high-value commercial inquiries.'],
  ['Chief Scientific Officer', 'cso@etersolis.com', 'Technical, scientific, disclosure, talent and controlled documentation matters.'],
  ['Privacy/legal', 'privacy@etersolis.com', 'Privacy requests, data subject requests and website policy contacts.']
];

export const metadata: Metadata = {
  title: 'Contact EterSolis | Waste Opportunities, Assessments and Partnerships',
  description: 'Contact EterSolis for waste opportunities, assessments, partnerships, executive inquiries, CSO inquiries and privacy requests.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <section className="section-padding bg-cool">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Contact</p>
          <h1 className="mt-3 text-5xl font-bold text-carbon">Contact EterSolis</h1>
          <p className="mt-5 text-lg leading-8 text-coal">
            Use the appropriate route below so your inquiry reaches the correct reviewer. Waste opportunities should be submitted through the Sell Waste form or sent to waste@etersolis.com.
          </p>
          <div className="mt-8 grid gap-4">
            {routes.map(([label, email, purpose]) => (
              <article key={email} className="rounded-2xl bg-white p-5">
                <h2 className="font-bold text-carbon">{label}</h2>
                <a href={`mailto:${email}`} className="mt-1 block font-semibold text-carbon">{email}</a>
                <p className="mt-2 text-sm leading-6 text-coal">{purpose}</p>
              </article>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
