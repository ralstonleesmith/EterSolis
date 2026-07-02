export const serviceRequestTypes = [
  'pickup',
  'delivery',
  'assessment',
  'certificate',
  'recurring_service',
  'repurpose_review',
  'destruction_service',
  'purchase_eligibility_review',
  'guided'
] as const;

export const departments = [
  'wastewater',
  'biologicals',
  'hydrocarbons',
  'industrial',
  'recyclables'
] as const;

export const commercialPathways = [
  'customer_paid_service',
  'customer_paid_pickup',
  'customer_paid_delivery_processing',
  'customer_paid_assessment',
  'customer_paid_certificate',
  'customer_paid_destruction',
  'customer_paid_recurring_service',
  'purchase_eligibility_review',
  'rebate_eligibility_review',
  'manual_quote_required',
  'restricted_review_required',
  'unsupported'
] as const;

export const serviceRequestStatuses = [
  'draft',
  'submitted',
  'triage_pending',
  'triage_in_progress',
  'awaiting_customer_information',
  'awaiting_documents',
  'awaiting_quote',
  'quote_sent',
  'payment_pending',
  'payment_received',
  'pickup_requested',
  'delivery_requested',
  'pickup_scheduled',
  'delivery_scheduled',
  'in_transit',
  'received',
  'receiving_review',
  'sorting_pending',
  'sorting_in_progress',
  'processing_pending',
  'processing_in_progress',
  'repurpose_pathway',
  'destruction_pathway',
  'certificate_pending',
  'certificate_issued',
  'completed',
  'rejected',
  'cancelled',
  'closed'
] as const;

export const paymentStatuses = [
  'not_required',
  'manual_quote_required',
  'pending',
  'processing',
  'paid',
  'failed',
  'cancelled',
  'refunded',
  'partially_refunded',
  'manual_invoice_sent'
] as const;

export const pickupStatuses = [
  'pickup_requested',
  'pickup_under_review',
  'pickup_quote_required',
  'pickup_payment_pending',
  'pickup_payment_received',
  'pickup_scheduled',
  'pickup_rescheduled',
  'pickup_in_progress',
  'pickup_completed',
  'pickup_cancelled'
] as const;

export const deliveryStatuses = [
  'delivery_requested',
  'delivery_under_review',
  'delivery_instructions_pending',
  'delivery_payment_pending',
  'delivery_payment_received',
  'delivery_appointment_confirmed',
  'delivery_in_transit',
  'delivery_received',
  'delivery_rejected',
  'delivery_completed',
  'delivery_cancelled'
] as const;

export const quantityUnits = ['kg', 'tonnes', 'litres', 'm3', 'pallets', 'containers', 'loads', 'other'] as const;
export const frequencies = ['one_time', 'weekly', 'monthly', 'quarterly', 'continuous', 'unknown'] as const;
export const physicalStates = ['solid', 'liquid', 'sludge', 'powder', 'mixed', 'gas', 'unknown'] as const;
export const confidentialityLevels = ['public', 'potential_confidential', 'nda_required'] as const;

export type ServiceRequestType = typeof serviceRequestTypes[number];
export type Department = typeof departments[number];
export type CommercialPathway = typeof commercialPathways[number];
export type ServiceRequestStatus = typeof serviceRequestStatuses[number];
export type PaymentStatus = typeof paymentStatuses[number];
