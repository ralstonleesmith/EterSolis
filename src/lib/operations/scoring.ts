export type WasteOpportunityScoringInput = {
  quantity?: number;
  frequency?: string;
  materialCategory?: string;
  region?: string;
  hazardFlag?: boolean;
  sdsAvailable?: boolean;
  documentsPresent?: boolean;
  strategicFit?: boolean;
  currentDisposalCostKnown?: boolean;
  decisionMakerQuality?: 'unknown' | 'influencer' | 'decision_maker';
  urgency?: 'low' | 'standard' | 'high';
};

export function scoreWasteOpportunity(input: WasteOpportunityScoringInput) {
  let score = 0;

  if (input.quantity && input.quantity > 0) score += Math.min(20, input.quantity >= 1000 ? 20 : 10);
  if (input.frequency && input.frequency !== 'unknown') score += 10;
  if (input.materialCategory) score += 20;
  if (input.region) score += 15;
  if (!input.hazardFlag) score += 10;
  if (input.sdsAvailable || input.documentsPresent) score += 10;
  if (input.strategicFit) score += 10;
  if (input.currentDisposalCostKnown) score += 5;
  if (input.decisionMakerQuality === 'decision_maker') score += 5;
  if (input.urgency === 'high') score += 5;

  const capped = Math.min(100, score);
  const band = capped >= 90 ? 'executive_priority'
    : capped >= 75 ? 'technical_commercial_priority'
      : capped >= 60 ? 'standard_qualification'
        : capped >= 40 ? 'nurture_or_more_information'
          : 'low_priority';

  return { score: capped, band };
}
