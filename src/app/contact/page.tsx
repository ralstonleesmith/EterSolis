import type { Metadata } from 'next';
import { BriefcaseBusiness, Crown, FlaskConical, Handshake, Mail, Scale, Send } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageHero } from '@/components/ui/PageHero';
import { ReviewPrinciples } from '@/components/sections/ReviewPrinciples';
import { mediaAssets } from '@/lib/media';
import { contactRoutes } from '@/lib/siteContent';

const routeIcons = {
  waste: Send,
  general: Mail,
  partnerships: Handshake,
  ceo: Crown,
  cso: FlaskConical,
  privacy: Scale,
  talent: BriefcaseBusiness
} as const;

export const metadata: Metadata = {
  title: 'Contact EterSolis | Wastewater, Waste Opportunities, Assessments and Partnerships',
  description: 'Contact EterSolis for wastewater treatment review, waste opportunities, assessments, partnerships, executive inquiries, CSO inquiries and privacy requests.',
  alternates: { canonical: '/contact' },
  openGraph: {
    images: [{ url: '/media/og/etersolis-contact-og.png', width: 1600, height: 900, alt: mediaAssets.wastewater.lagoon.alt }]
  },
  twitter: { images: ['/media/og/etersolis-contact-og.png'] }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Route your inquiry to the correct EterSolis reviewer."
        description="Use the appropriate route so waste, wastewater, partnership, technical, executive, privacy and general inquiries reach the correct review path."
        primaryHref="#contact-form"
        primaryLabel="Submit Inquiry"
        secondaryHref="/sell-waste"
        secondaryLabel="Sell Waste"
        imageSrc={mediaAssets.wastewater.lagoon.previewSrc}
        imageAlt={mediaAssets.wastewater.lagoon.alt}
      />
      <ReviewPrinciples compact />
      <section className="section-padding bg-[#FAFAF7] dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="grid gap-4">
              {contactRoutes.map(({ key, label, email, purpose }) => {
                const Icon = routeIcons[key];
                return (
                <article key={email} className="card-hover rounded-lg border border-coal/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
                    <div>
                      <h2 className="font-black text-carbon dark:text-white">{label}</h2>
                      <a href={`mailto:${email}`} className="mt-1 block font-black text-carbon dark:text-sunshine">{email}</a>
                      <p className="mt-2 text-sm leading-6 text-coal dark:text-white/70">{purpose}</p>
                    </div>
                  </div>
                </article>
                );
              })}
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
