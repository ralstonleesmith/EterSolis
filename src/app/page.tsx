import { Hero } from '@/components/sections/Hero';
import { ServiceIntakeBanner } from '@/components/sections/ServiceIntakeBanner';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { HeliosPanel } from '@/components/helios/HeliosPanel';
import { ProblemOrbit } from '@/components/sections/ProblemOrbit';
import { IndustryMosaic } from '@/components/sections/IndustryMosaic';
import { WastewaterTreatmentFeature } from '@/components/sections/WastewaterTreatmentFeature';
import { ReviewPrinciples } from '@/components/sections/ReviewPrinciples';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceIntakeBanner />
      <SolutionGrid />
      <IndustryMosaic />
      <ReviewPrinciples />
      <ProblemOrbit />
      <WastewaterTreatmentFeature />
      <HeliosPrompt context="recovery" title="Need the fastest safe route into EterSolis?" />
      <HeliosPanel />
    </>
  );
}
