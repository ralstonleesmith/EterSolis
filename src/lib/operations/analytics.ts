export const funnelEvents = [
  'cta_get_started_clicked',
  'get_started_started',
  'intent_selected',
  'department_selected',
  'department_changed',
  'guided_routing_used',
  'material_profile_completed',
  'site_completed',
  'pickup_selected',
  'delivery_selected',
  'assessment_selected',
  'certificate_selected',
  'risk_screen_completed',
  'payment_step_reached',
  'checkout_created',
  'payment_completed',
  'submission_completed',
  'dropoff_detected',
  'validation_error',
  'high_risk_flagged',
  'document_upload_completed',
  'scheduling_completed'
] as const;

export type FunnelEvent = typeof funnelEvents[number];
