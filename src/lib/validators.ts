import { z } from 'zod';
import { contactTopics, wasteFrequencies, wasteMaterialCategories } from '@/lib/siteContent';

export const wasteOpportunitySchema = z.object({
  companyName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  country: z.string().min(2).max(80),
  region: z.string().max(120).optional(),
  materialCategory: z.enum(wasteMaterialCategories),
  materialDescription: z.string().min(10).max(2000),
  quantity: z.coerce.number().positive().optional().or(z.literal('').transform(() => undefined)),
  quantityUnit: z.string().max(40).optional(),
  frequency: z.enum(wasteFrequencies),
  hazardFlag: z.coerce.boolean().optional().default(false),
  safetyDocumentsAvailable: z.coerce.boolean().optional().default(false),
  confidentialityLevel: z.enum(['Public', 'Potential confidential', 'NDA required']),
  consentToContact: z.literal('on')
});

export const contactLeadSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional(),
  email: z.string().email(),
  topic: z.enum(contactTopics),
  message: z.string().min(10).max(2000),
  consentToContact: z.literal('on')
});
