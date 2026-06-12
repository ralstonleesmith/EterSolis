import Link from 'next/link';

const chips = [
  ['I want to sell waste.', '/sell-waste'],
  ['I need a waste or carbon assessment.', '/contact'],
  ['I want to discuss resource recovery.', '/solutions'],
  ['I am a recycler or partner.', '/contact'],
  ['I am looking for careers or Associate opportunities.', '/contact'],
  ['I need to contact the CEO or CSO.', '/contact']
];

export function HeliosPanel() {
  return (
    <section className="section-padding bg-white">
      <div className="container-shell rounded-[2rem] border border-cool bg-carbon p-8 text-white md:p-10">
        <p className="font-bold uppercase tracking-[0.2em] text-sunshine">Helios v0</p>
        <h2 className="mt-3 text-4xl font-bold">A controlled routing assistant for the right next step.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-white/80">
          Helios is currently implemented as a guided assistant. It routes inquiries without quoting prices, promising acceptance, providing hazardous material instructions, or disclosing protected systems.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {chips.map(([label, href]) => (
            <Link key={label} href={href} className="rounded-2xl border border-white/15 bg-white/10 p-4 font-semibold text-white transition hover:bg-white/20">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
