export function scoreDataQuality(input: {
  materialDescription?: string;
  quantity?: number;
  photosPresent?: boolean;
  documentsPresent?: boolean;
  siteAddress?: string;
  safetyAnswered?: boolean;
  department?: string;
  requestType?: string;
  schedulingComplete?: boolean;
}) {
  let score = 0;
  if ((input.materialDescription ?? '').trim().length >= 40) score += 20;
  if (input.quantity && input.quantity > 0) score += 10;
  if (input.photosPresent) score += 10;
  if (input.documentsPresent) score += 10;
  if ((input.siteAddress ?? '').trim().length >= 8) score += 15;
  if (input.safetyAnswered) score += 15;
  if (input.department) score += 10;
  if (input.requestType) score += 5;
  if (input.schedulingComplete) score += 5;
  return Math.min(100, score);
}
