import { GetStartedWizard } from '@/components/get-started/GetStartedWizard';

export default function PickupStartedPage() {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell max-w-5xl">
        <GetStartedWizard defaultRequestType="pickup" />
      </div>
    </main>
  );
}
