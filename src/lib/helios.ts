import {
  Bot,
  BriefcaseBusiness,
  Crown,
  Droplets,
  FlaskConical,
  Handshake,
  Network,
  Recycle,
  ShieldAlert
} from 'lucide-react';

export type HeliosMode = 'etersolis' | 'kymnis';

export type HeliosIntent = {
  id: string;
  mode: HeliosMode;
  category: 'Waste' | 'Water' | 'Recovery' | 'Verification' | 'Partnership' | 'Executive' | 'Contact' | 'Learning';
  label: string;
  description: string;
  prepare: readonly string[];
  cannotDecide: readonly string[];
  href: string;
  action: string;
  icon: typeof Recycle;
  contexts: readonly string[];
};

export const heliosGuardrails = [
  'No prices quoted',
  'No acceptance promises',
  'No hazardous handling instructions',
  'No automatic certification',
  'No internal architecture disclosures'
] as const;

export const heliosIntents: readonly HeliosIntent[] = [
  {
    id: 'sell-waste',
    mode: 'etersolis',
    category: 'Waste',
    icon: Recycle,
    label: 'Sell waste',
    description: 'Recoverable materials, recyclables, industrial by-products or suitable waste streams.',
    prepare: ['Material description', 'Approximate quantity', 'Country or region', 'Hazard and safety document status'],
    cannotDecide: ['Purchase price', 'Material acceptance', 'Transport requirements'],
    href: '/sell-waste',
    action: 'Start waste review',
    contexts: ['general', 'recovery', 'waste']
  },
  {
    id: 'assessment',
    mode: 'etersolis',
    category: 'Contact',
    icon: ShieldAlert,
    label: 'Request assessment',
    description: 'Waste, carbon, circular economy or industrial resource review.',
    prepare: ['Organization name', 'Primary challenge', 'Non-confidential context', 'Preferred contact route'],
    cannotDecide: ['Technical scope', 'Commercial terms', 'Implementation commitment'],
    href: '/contact?topic=Consultation%20%2F%20Assessment#contact-form',
    action: 'Route assessment',
    contexts: ['general', 'contact']
  },
  {
    id: 'wastewater',
    mode: 'etersolis',
    category: 'Water',
    icon: Droplets,
    label: 'Wastewater treatment',
    description: 'Treatment residuals, water recovery infrastructure questions or wastewater-linked by-products.',
    prepare: ['Facility context', 'Water or residual stream type', 'Known constraints', 'Non-confidential objectives'],
    cannotDecide: ['Treatment instructions', 'Safety handling', 'Regulatory compliance position'],
    href: '/contact?topic=Wastewater%20Treatment#contact-form',
    action: 'Request wastewater assessment',
    contexts: ['water', 'wastewater', 'recovery']
  },
  {
    id: 'solutions',
    mode: 'etersolis',
    category: 'Recovery',
    icon: Bot,
    label: 'Explore recovery',
    description: 'Resource recovery, valorization, circular economy or decarbonization fit.',
    prepare: ['Material or process type', 'Recovery goal', 'Operational setting', 'Timeline sensitivity'],
    cannotDecide: ['Guaranteed impact', 'Recovery feasibility', 'Partner acceptance'],
    href: '/solutions',
    action: 'View solutions',
    contexts: ['general', 'recovery']
  },
  {
    id: 'partner',
    mode: 'etersolis',
    category: 'Partnership',
    icon: Handshake,
    label: 'Partner inquiry',
    description: 'Recycler, logistics, lab, university, technology or commercial collaboration.',
    prepare: ['Partner type', 'Capability summary', 'Region', 'Non-confidential proposal'],
    cannotDecide: ['Partner approval', 'Commercial structure', 'Exclusive arrangements'],
    href: '/contact?topic=Partnership#contact-form',
    action: 'Contact partnerships',
    contexts: ['partnership', 'general']
  },
  {
    id: 'talent',
    mode: 'etersolis',
    category: 'Contact',
    icon: BriefcaseBusiness,
    label: 'Talent route',
    description: 'Careers, Associate Program interest or controlled talent inquiry.',
    prepare: ['Area of interest', 'Relevant background', 'Contact details'],
    cannotDecide: ['Hiring status', 'Role fit', 'Compensation'],
    href: '/contact?topic=Careers%20%2F%20Associate#contact-form',
    action: 'Contact EterSolis',
    contexts: ['talent', 'general']
  },
  {
    id: 'executive',
    mode: 'etersolis',
    category: 'Executive',
    icon: Crown,
    label: 'Executive or CSO',
    description: 'CEO, CSO, strategic, scientific or controlled documentation matter.',
    prepare: ['Executive topic', 'Scientific or strategic context', 'Urgency', 'Non-confidential summary'],
    cannotDecide: ['Binding representation', 'Scientific conclusion', 'Confidential disclosure route'],
    href: '/contact?topic=Executive#contact-form',
    action: 'Route executive inquiry',
    contexts: ['executive', 'science', 'general']
  },
  {
    id: 'kymnis-overview',
    mode: 'kymnis',
    category: 'Learning',
    icon: Network,
    label: 'Explore KYMNIS',
    description: 'Environmental impact registration, verification, resolution, resource recovery and measurable improvement.',
    prepare: ['Whether you are a user, organization or partner', 'Area of interest', 'Non-confidential context'],
    cannotDecide: ['Platform eligibility', 'Verification status', 'Implementation commitment'],
    href: '/kymnis',
    action: 'Open KYMNIS',
    contexts: ['general', 'kymnis']
  },
  {
    id: 'kymnis-report-impact',
    mode: 'kymnis',
    category: 'Contact',
    icon: Bot,
    label: 'Report Impact model',
    description: 'See something, take a photo or video, choose a simple category and submit.',
    prepare: ['Photo or video idea', 'Problem category', 'Location context', 'Short plain-language note'],
    cannotDecide: ['Emergency response', 'Legal claim', 'Verified truth'],
    href: '/kymnis/how-it-works',
    action: 'Review report flow',
    contexts: ['general', 'kymnis']
  },
  {
    id: 'kymnis-verification',
    mode: 'kymnis',
    category: 'Verification',
    icon: FlaskConical,
    label: 'Verification pathway',
    description: 'Review evidence, location, stakeholders, solution paths and progress.',
    prepare: ['Observation evidence', 'Location and time', 'Known uncertainty', 'Stakeholder context'],
    cannotDecide: ['Certification', 'Final verification', 'Regulatory conclusion'],
    href: '/kymnis/verification',
    action: 'Review verification',
    contexts: ['verification', 'kymnis']
  },
  {
    id: 'kymnis-recovery',
    mode: 'kymnis',
    category: 'Recovery',
    icon: Recycle,
    label: 'Resource Collection',
    description: 'Find collection points, scan QR codes and record recoverable or hazardous resources.',
    prepare: ['Resource type', 'Collection context', 'Photo if relevant', 'Hazard flag if known'],
    cannotDecide: ['Handling instructions', 'Acceptance', 'Transport requirements'],
    href: '/kymnis/resource-recovery',
    action: 'Review recovery',
    contexts: ['recovery', 'kymnis']
  },
  {
    id: 'kymnis-contact',
    mode: 'kymnis',
    category: 'Partnership',
    icon: Handshake,
    label: 'Register KYMNIS interest',
    description: 'Submit a concise, non-confidential platform participation inquiry for KYMNIS review.',
    prepare: ['Organization or user type', 'Participation interest', 'Region', 'Non-confidential message'],
    cannotDecide: ['Approval', 'Verification result', 'Confidential intake'],
    href: '/kymnis/contact#contact-form',
    action: 'Register interest',
    contexts: ['contact', 'kymnis', 'verification', 'recovery']
  }
];

export function getHeliosIntents(mode: HeliosMode = 'etersolis', context = 'general') {
  const scoped = heliosIntents.filter((intent) => intent.mode === mode);
  if (context === 'all') return scoped;
  const contextual = scoped.filter((intent) => intent.contexts.includes(context));
  return contextual.length > 0 ? contextual : scoped;
}

export function getRecommendedHeliosIntent(mode: HeliosMode = 'etersolis', context = 'general') {
  return getHeliosIntents(mode, context)[0] ?? heliosIntents[0];
}
