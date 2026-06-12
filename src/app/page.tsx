import { Hero } from '@/components/sections/Hero';
import { WastePurchaseBanner } from '@/components/sections/WastePurchaseBanner';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { HeliosPanel } from '@/components/helios/HeliosPanel';

const problems = ['Waste cost', 'Lost material value', 'Carbon exposure', 'Compliance complexity', 'Inefficient material flow'];
const industries = ['Municipalities', 'Manufacturing', 'Mining and heavy industry', 'Energy', 'Retail and distribution', 'Commercial property', 'Government and public entities', 'Waste operators and recyclers'];

export default function HomePage() {
  return (
    <>
      <Hero />
      <WastePurchaseBanner />
      <section className="section-padding bg-white">
        <div className="container-shell">
          <h2 className="text-4xl font-bold text-carbon">What EterSolis solves.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {problems.map((problem) => <div key={problem} className="rounded-2xl border border-cool p-5 font-semibold text-carbon">{problem}</div>)}
          </div>
        </div>
      </section>
      <SolutionGrid />
      <section className="section-padding bg-white">
        <div className="container-shell">
          <h2 className="text-4xl font-bold text-carbon">Industries served.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {industries.map((industry) => <div key={industry} className="rounded-2xl bg-cool p-5 font-semibold text-carbon">{industry}</div>)}
          </div>
        </div>
      </section>
      <HeliosPanel />
    </>
  );
}
