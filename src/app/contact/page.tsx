import type { Metadata } from 'next';
import { BriefcaseBusiness, Crown, FlaskConical, Handshake, Mail, Network, Route, Scale, Send, Settings2 } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageHero } from '@/components/ui/PageHero';
import { ReviewPrinciples } from '@/components/sections/ReviewPrinciples';
import { mediaAssets } from '@/lib/media';
import { contactRoutes, contactTopics } from '@/lib/siteContent';

const routeIcons = {
  service: Route,
  operations: Settings2,
  waste: Send,
  general: Mail,
  partnerships: Handshake,
  kymnis: Network,
  ceo: Crown,
  cso: FlaskConical,
  privacy: Scale,
  talent: BriefcaseBusiness
} as const;

export const metadata: Metadata = {
  title: 'Contact EterSolis | Service Requests, Resource Recovery, Carbon and Partnerships',
  description: 'Contact EterSolis for service requests, resource recovery, waste opportunities, carbon review, partnerships, executive inquiries, CSO inquiries and privacy requests.',
  alternates: { canonical: '/contact' },
  openGraph: {
    images: [{ url: '/media/og/etersolis-contact-og.png', width: 1600, height: 900, alt: mediaAssets.facility.alt }]
  },
  twitter: { images: ['/media/og/etersolis-contact-og.png'] }
};

type ContactTopic = (typeof contactTopics)[number];

function topicFromSearch(value: string | string[] | undefined): ContactTopic | undefined {
  const topic = Array.isArray(value) ? value[0] : value;
  return contactTopics.find((item) => item === topic);
}

export default async function ContactPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const defaultTopic = topicFromSearch(resolvedSearchParams?.topic);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Route your inquiry to the correct EterSolis reviewer."
        description="Use the appropriate route so service, recovery, material, carbon, partnership, technical, executive, privacy and general inquiries reach the correct review path."
        primaryHref="#contact-form"
        primaryLabel="Submit Inquiry"
        secondaryHref="/get-started"
        secondaryLabel="Get Started"
        imageSrc={mediaAssets.facility.previewSrc}
        imageAlt={mediaAssets.facility.alt}
      />
      <ReviewPrinciples compact />
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="grid gap-4">
              {contactRoutes.map(({ key, label, email, purpose }) => {
                const Icon = routeIcons[key];
                return (
                <article key={email} className="ui-surface card-hover rounded-lg p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sunshine text-black"><Icon className="h-5 w-5" /></div>
                    <div>
                      <h2 className="font-black text-body">{label}</h2>
                      <a href={`mailto:${email}`} className="mt-1 block font-black text-body">{email}</a>
                      <p className="mt-2 text-sm leading-6 text-muted">{purpose}</p>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
          <div id="contact-form" className="scroll-mt-28">
            <ContactForm defaultTopic={defaultTopic} />
          </div>
        </div>
      </section>
    </>
  );
}
