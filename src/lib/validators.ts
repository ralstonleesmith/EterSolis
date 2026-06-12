import { z } from 'zod';

export const wasteOpportunitySchema = z.object({
  companyName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  country: z.string().min(2).max(80),
  region: z.string().max(120).optional(),
  materialCategory: z.enum(['Plastics', 'Paper and cardboard', 'Metals', 'E-waste', 'Organics', 'Industrial by-products', 'Construction materials', 'Other recoverable resources']),
  materialDescription: z.string().min(10).max(2000),
  quantity: z.coerce.number().positive().optional().or(z.literal('').transform(() => undefined)),
  quantityUnit: z.string().max(40).optional(),
  frequency: z.enum(['One-time', 'Weekly', 'Monthly', 'Quarterly', 'Continuous', 'Unknown']),
  hazardFlag: z.coerce.boolean().optional().default(false),
  safetyDocumentsAvailable: z.coerce.boolean().optional().default(false),
  confidentialityLevel: z.enum(['Public', 'Potential confidential', 'NDA required']),
  consentToContact: z.literal('on')
});

export const contactLeadSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional(),
  email: z.string().email(),
  topic: z.enum(['Consultation / Assessment', 'Partnership', 'Executive', 'Scientific / CSO', 'Careers / Associate', 'Privacy', 'General']),
  message: z.string().min(10).max(2000),
  consentToContact: z.literal('on')
});
