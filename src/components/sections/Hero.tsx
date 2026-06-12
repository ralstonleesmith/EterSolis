import Link from 'next/link';

export function Hero() {
  const steps = ['Submit material information', 'Review by EterSolis', 'Recovery pathway discussion', 'Commercial review', 'Execution planning'];

  return (
    <section className="bg-white section-padding">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-sunshine bg-sunshine/20 px-4 py-2 text-sm font-semibold text-carbon">
            We Buy Waste | Resource Recovery | Carbon Management | Circular Economy | Industrial Sustainability
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-carbon md:text-7xl">
            Waste Is Value Waiting To Be Recovered.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-coal">
            EterSolis is a privately owned waste and carbon management company helping organizations recover value from waste streams, manage carbon exposure and build practical circular economy solutions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/sell-waste" className="rounded-full bg-sunshine px-7 py-4 text-center font-bold text-carbon shadow-soft">
              Sell Waste To EterSolis
            </Link>
            <Link href="/contact" className="rounded-full border border-coal px-7 py-4 text-center font-bold text-carbon">
              Request Assessment
            </Link>
            <Link href="/helios" className="rounded-full px-7 py-4 text-center font-bold text-coal underline-offset-4 hover:underline">
              Talk to Helios
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-cool bg-cool p-8 shadow-soft">
          <div className="grid gap-4">
            {steps.map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl bg-white p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sunshine font-bold text-carbon">{index + 1}</span>
                <span className="font-semibold text-carbon">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
