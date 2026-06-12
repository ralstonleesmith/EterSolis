import { Hero } from '@/components/sections/Hero';
import { WastePurchaseBanner } from '@/components/sections/WastePurchaseBanner';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { HeliosPanel } from '@/components/helios/HeliosPanel';
import { ProblemOrbit } from '@/components/sections/ProblemOrbit';
import { IndustryMosaic } from '@/components/sections/IndustryMosaic';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WastePurchaseBanner />
      <ProblemOrbit />
      <SolutionGrid />
      <IndustryMosaic />
      <HeliosPanel />
    </>
  );
}
