import type { Metadata } from 'next';

const industries = [
  ['Manufacturing', 'Production residues, packaging scrap, process waste, carbon and material efficiency.'],
  ['Municipalities', 'Diversion, recycling, circular economy programs and public waste stream solutions.'],
  ['Mining and heavy industry', 'Industrial residues, water and wastewater concerns, materials recovery and carbon exposure.'],
  ['Energy', 'Waste-to-value, by-products, carbon management and resource efficiency.'],
  ['Retail and distribution', 'Packaging, returns, cardboard, plastics, food and organics, and circular procurement.'],
  ['Commercial property', 'Tenant waste, diversion, reporting and recycling programs.'],
  ['Government and public entities', 'Structured waste, resource recovery and sustainability program support.'],
  ['Waste operators and recyclers', 'Feedstock, partnerships, recovery pathways and commercial collaboration.']
];

export const metadata: Metadata = {
  title: 'Industries Served | EterSolis Waste, Carbon and Resource Recovery Solutions',
  description: 'EterSolis supports manufacturers, municipalities, mining, energy, retail, commercial property, government entities and waste operators.',
  alternates: { canonical: '/industries' }
};

export default function IndustriesPage() {
  return (
    <section className="section-padding bg-cool">
      <div className="container-shell">
        <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Industries</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold text-carbon">Industry-specific resource recovery and waste solutions.</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {industries.map(([title, description]) => (
            <article key={title} className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-carbon">{title}</h2>
              <p className="mt-3 leading-7 text-coal">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
