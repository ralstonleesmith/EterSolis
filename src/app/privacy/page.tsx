import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy | EterSolis',
  description: 'EterSolis website privacy notice for inquiry and lead submissions.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-shell max-w-4xl">
        <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Privacy</p>
        <h1 className="mt-3 text-5xl font-bold text-carbon">Privacy Notice</h1>
        <div className="mt-8 space-y-5 leading-8 text-coal">
          <p>EterSolis collects information submitted through website forms to review inquiries, route communications, assess waste opportunities, manage partnerships and respond to privacy or legal requests.</p>
          <p>Users should not submit confidential, restricted, regulated, third-party, proprietary or sensitive information unless EterSolis has provided an approved intake route or written instructions.</p>
          <p>Lead and contact information may be stored in approved EterSolis systems, databases, CRM tools and email workflows for review and follow-up.</p>
          <p>Privacy requests may be sent to <a className="font-bold text-carbon" href="mailto:privacy@etersolis.com">privacy@etersolis.com</a>.</p>
        </div>
      </div>
    </section>
  );
}
