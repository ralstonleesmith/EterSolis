import type { CommercialPathway, ServiceRequestType } from '@/lib/operations/enums';

type CommercialInput = {
  requestType: ServiceRequestType;
  riskLevel: 'low' | 'medium' | 'high' | 'restricted' | 'unreviewed';
  unknownMaterialFlag?: boolean;
  restrictedFlag?: boolean;
  quantity?: number;
};

export function determineCommercialPathway(input: CommercialInput): CommercialPathway {
  if (input.restrictedFlag || input.riskLevel === 'restricted') return 'restricted_review_required';
  if (input.unknownMaterialFlag || input.riskLevel === 'high') return 'manual_quote_required';

  if (input.quantity && input.quantity > 1000 && input.requestType !== 'assessment') {
    return 'manual_quote_required';
  }

  switch (input.requestType) {
    case 'pickup':
      return input.riskLevel === 'low' ? 'customer_paid_pickup' : 'manual_quote_required';
    case 'delivery':
      return input.riskLevel === 'low' ? 'customer_paid_delivery_processing' : 'manual_quote_required';
    case 'assessment':
      return 'customer_paid_assessment';
    case 'certificate':
      return 'customer_paid_certificate';
    case 'recurring_service':
      return 'customer_paid_recurring_service';
    case 'repurpose_review':
      return 'customer_paid_service';
    case 'destruction_service':
      return 'customer_paid_destruction';
    case 'purchase_eligibility_review':
      return 'purchase_eligibility_review';
    case 'guided':
      return 'customer_paid_service';
    default:
      return 'manual_quote_required';
  }
}

export function paymentStatusForPathway(pathway: CommercialPathway) {
  if (pathway === 'manual_quote_required' || pathway === 'restricted_review_required') return 'manual_quote_required' as const;
  if (pathway === 'purchase_eligibility_review' || pathway === 'rebate_eligibility_review') return 'not_required' as const;
  return 'manual_invoice_sent' as const;
}
