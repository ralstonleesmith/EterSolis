export type RiskInput = {
  hazardFlag?: boolean;
  unknownMaterialFlag?: boolean;
  sdsAvailable?: boolean;
  labAnalysisAvailable?: boolean;
  flammableFlag?: boolean;
  corrosiveFlag?: boolean;
  toxicFlag?: boolean;
  biohazardFlag?: boolean;
  pathogenFlag?: boolean;
  hydrocarbonFlag?: boolean;
  sharpObjectFlag?: boolean;
  pressurizedFlag?: boolean;
  radioactiveFlag?: boolean;
  asbestosFlag?: boolean;
  spillFlag?: boolean;
};

const restrictedFlags = ['radioactiveFlag', 'asbestosFlag'] as const;
const majorFlags = ['hazardFlag', 'unknownMaterialFlag', 'flammableFlag', 'corrosiveFlag', 'toxicFlag', 'biohazardFlag', 'pathogenFlag', 'spillFlag'] as const;
const minorFlags = ['hydrocarbonFlag', 'sharpObjectFlag', 'pressurizedFlag'] as const;

export function scoreRisk(input: RiskInput) {
  const restricted = restrictedFlags.some((key) => input[key]);
  let score = 0;

  for (const key of majorFlags) if (input[key]) score += 20;
  for (const key of minorFlags) if (input[key]) score += 10;
  if (input.sdsAvailable) score -= 5;
  if (input.labAnalysisAvailable) score -= 5;
  score = Math.max(0, score);

  const riskLevel = restricted ? 'restricted' : score >= 50 ? 'high' : score >= 20 ? 'medium' : 'low';
  return {
    riskScore: score,
    riskLevel,
    restrictedFlag: restricted,
    manualReviewRequired: restricted || riskLevel === 'high' || Boolean(input.unknownMaterialFlag)
  } as const;
}
