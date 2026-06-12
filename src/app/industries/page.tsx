import type { Metadata } from 'next';
import { Building2, Factory, Landmark, Package, Recycle, Store, Truck, Zap } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

const industries = [
  { icon: Factory, title: 'Manufacturing', description: 'Production residues, packaging scrap, process waste, carbon and material efficiency.', focus: 'Operational waste and recoverable production outputs' },
  { icon: Landmark, title: 'Municipalities', description: 'Diversion, recycling, circular economy programs and public waste stream solutions.', focus: 'Public diversion and responsible material routing' },
  { icon: Building2, title: 'Mining and heavy industry', description: 'Industrial residues, water and wastewater concerns, materials recovery and carbon exposure.', focus: 'High-volume residues and industrial recovery pathways' },
  { icon: Zap, title: 'Energy', description: 'Waste-to-value, by-products, carbon management and resource efficiency.', focus: 'By-products, resource efficiency and decarbonization pressure' },
  { icon: Store, title: 'Retail and distribution', description: 'Packaging, returns, cardboard, plastics, food and organics, and circular procurement.', focus: 'Distributed material streams and packaging recovery' },
  { icon: Package, title: 'Commercial property', description: 'Tenant waste, diversion, reporting and recycling programs.', focus: 'Site-level material programs and reporting discipline' },
  { icon: Recycle, title: 'Government and public entities', description: 'Structured waste, resource recovery and sustainability program support.', focus: 'Responsible procurement and structured program delivery' },
  { icon: Truck, title: 'Waste operators and recyclers', description: 'Feedstock, partnerships, recovery pathways and commercial collaboration.', focus: 'Partnerships, feedstock and recovery collaboration' }
];

export const metadata: Metadata = {
  title: 'Industries Served | EterSolis Waste, Carbon and Resource Recovery Solutions',
  description: 'EterSolis supports manufacturers, municipalities, mining, energy, retail, commercial property, government entities and waste operators.',
  alternates: { canonical: '/industries' }
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industry-specific resource recovery and waste solutions."
        description="EterSolis supports organizations with real material flows, practical recovery challenges and measurable waste, carbon and circular economy pressure."
      />
      <section className="section-padding bg-[#FAFAF7] dark:bg-black">
        <div className="container-shell">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {industries.map(({ icon: Icon, title, description, focus }, index) => (
              <article key={title} className={`card-hover relative overflow-hidden rounded-[2rem] border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5 ${index === 0 || index === 2 ? 'lg:col-span-2' : ''}`}>
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sunshine/20" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-sunshine text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-coal/60 dark:text-white/45">Sector focus</p>
                <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">{title}</h2>
                <p className="mt-4 leading-7 text-coal dark:text-white/72">{description}</p>
                <div className="mt-6 rounded-2xl bg-cool p-4 text-sm font-bold leading-6 text-carbon dark:bg-black/40 dark:text-white/80">{focus}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
