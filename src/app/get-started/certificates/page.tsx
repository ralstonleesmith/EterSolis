import { GetStartedWizard } from '@/components/get-started/GetStartedWizard';

export default function CertificateStartedPage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-5xl">
        <GetStartedWizard defaultRequestType="certificate" />
      </div>
    </main>
  );
}
