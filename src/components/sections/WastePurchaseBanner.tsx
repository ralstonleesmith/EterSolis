import Link from 'next/link';

export function WastePurchaseBanner() {
  return (
    <section className="bg-white pb-16">
      <div className="container-shell rounded-[2rem] border border-cool border-t-[6px] border-t-sunshine bg-cool p-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-carbon">EterSolis Buys Waste.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-coal">
              We purchase and develop solutions for suitable recoverable waste streams, recyclables, industrial by-products and materials with responsible recovery potential. Submit your material information for review by EterSolis.
            </p>
            <p className="mt-3 text-sm font-semibold text-carbon">
              Review required. Do not send physical samples unless EterSolis provides written intake instructions.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/sell-waste" className="rounded-full bg-sunshine px-6 py-3 text-center font-bold text-carbon">
              Submit Waste Opportunity
            </Link>
            <a href="mailto:waste@etersolis.com" className="text-sm font-semibold text-carbon">waste@etersolis.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
