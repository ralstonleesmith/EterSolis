import { z } from 'zod';
import {
  commercialPathways,
  confidentialityLevels,
  deliveryStatuses,
  departments,
  frequencies,
  paymentStatuses,
  physicalStates,
  pickupStatuses,
  quantityUnits,
  serviceRequestStatuses,
  serviceRequestTypes
} from '@/lib/operations/enums';

const emptyToUndefined = (value: unknown) => value === '' ? undefined : value;
const checkbox = z.preprocess((value) => value === 'on' || value === 'true' || value === true, z.boolean().default(false));
const optionalText = (max = 500) => z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());
const optionalNumber = z.preprocess(emptyToUndefined, z.coerce.number().positive().optional());

export const intentSchema = z.object({
  requestType: z.enum(serviceRequestTypes)
});

export const departmentSchema = z.object({
  department: z.enum(departments)
});

export const customerSchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: optionalText(60),
  billingEntity: optionalText(160),
  country: z.string().trim().min(2).max(80),
  region: optionalText(120),
  city: optionalText(120)
});

export const siteSchema = z.object({
  siteAddress: z.string().trim().min(4).max(500),
  gpsLink: optionalText(500),
  accessNotes: optionalText(1000),
  siteRestrictions: optionalText(1000),
  operatingHours: optionalText(300),
  loadingEquipment: optionalText(300)
});

export const materialProfileSchema = z.object({
  materialName: optionalText(160),
  materialDescription: z.string().trim().min(10).max(2500),
  physicalState: z.enum(physicalStates),
  quantity: optionalNumber,
  quantityUnit: z.enum(quantityUnits),
  frequency: z.enum(frequencies),
  containerType: optionalText(120),
  containerCount: optionalNumber,
  contaminationStatus: optionalText(300),
  odorStatus: optionalText(300),
  moistureStatus: optionalText(300),
  photosPresent: checkbox,
  documentsPresent: checkbox
});

export const pickupRequestSchema = z.object({
  preferredPickupDate: optionalText(40),
  preferredPickupWindow: optionalText(80),
  alternativePickupDate: optionalText(40),
  pickupUrgency: optionalText(80),
  loadingMethod: optionalText(160),
  vehicleAccess: optionalText(300),
  materialPackaging: optionalText(300),
  onsiteContact: optionalText(160),
  specialHandling: optionalText(1000)
});

export const deliveryRequestSchema = z.object({
  preferredDeliveryDate: optionalText(40),
  preferredDeliveryWindow: optionalText(80),
  vehicleType: optionalText(120),
  vehicleRegistration: optionalText(80),
  driverName: optionalText(120),
  driverPhone: optionalText(60),
  receivingSiteRequested: optionalText(200),
  deliveryPackagingCondition: optionalText(300),
  appointmentInstructionsRequired: checkbox
});

export const riskAssessmentSchema = z.object({
  hazardFlag: checkbox,
  unknownMaterialFlag: checkbox,
  sdsAvailable: checkbox,
  labAnalysisAvailable: checkbox,
  biohazardFlag: checkbox,
  hydrocarbonFlag: checkbox,
  flammableFlag: checkbox,
  corrosiveFlag: checkbox,
  toxicFlag: checkbox,
  pathogenFlag: checkbox,
  sharpObjectFlag: checkbox,
  pressurizedFlag: checkbox,
  radioactiveFlag: checkbox,
  asbestosFlag: checkbox,
  spillFlag: checkbox,
  confidentialityLevel: z.enum(confidentialityLevels),
  consentToContact: z.literal('on')
});

export const commercialPathwaySchema = z.enum(commercialPathways);
export const serviceRequestStatusSchema = z.enum(serviceRequestStatuses);
export const paymentStatusSchema = z.enum(paymentStatuses);
export const pickupStatusSchema = z.enum(pickupStatuses);
export const deliveryStatusSchema = z.enum(deliveryStatuses);

export const serviceRequestSubmitSchema = intentSchema
  .merge(departmentSchema)
  .merge(customerSchema)
  .merge(siteSchema)
  .merge(materialProfileSchema)
  .merge(pickupRequestSchema)
  .merge(deliveryRequestSchema)
  .merge(riskAssessmentSchema)
  .extend({
    turnstileToken: optionalText(1000),
    'cf-turnstile-response': optionalText(1000)
  });

export const analyticsEventSchema = z.object({
  serviceRequestId: z.string().uuid().optional(),
  sessionId: z.string().max(160).optional(),
  eventName: z.string().min(2).max(120),
  eventArea: z.string().min(2).max(80),
  payload: z.record(z.unknown()).optional()
});

export const adminStatusUpdateSchema = z.object({
  status: serviceRequestStatusSchema.optional(),
  paymentStatus: paymentStatusSchema.optional(),
  pickupStatus: pickupStatusSchema.optional(),
  deliveryStatus: deliveryStatusSchema.optional(),
  assignedOperator: z.string().max(160).optional(),
  internalNote: z.string().max(2000).optional()
});

export type ServiceRequestSubmitInput = z.infer<typeof serviceRequestSubmitSchema>;
