import { Hero } from '@/components/sections/Hero';
import { ServiceIntakeBanner } from '@/components/sections/ServiceIntakeBanner';
import { SolutionGrid } from '@/components/sections/SolutionGrid';
import { HeliosPanel } from '@/components/helios/HeliosPanel';
import { IndustryMosaic } from '@/components/sections/IndustryMosaic';
import { ReviewPrinciples } from '@/components/sections/ReviewPrinciples';
import { HeliosPrompt } from '@/components/helios/HeliosPrompt';
import { OperationalPortalFeature } from '@/components/sections/OperationalPortalFeature';
import { LandingProofStrip } from '@/components/sections/LandingProofStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LandingProofStrip />
      <ServiceIntakeBanner />
      <OperationalPortalFeature />
      <SolutionGrid />
      <IndustryMosaic />
      <ReviewPrinciples />
      <HeliosPrompt context="recovery" title="Need the fastest safe route into EterSolis?" />
      <HeliosPanel />
    </>
  );
}
