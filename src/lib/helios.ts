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
  label: string;
  description: string;
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
    icon: Recycle,
    label: 'Sell waste',
    description: 'Recoverable materials, recyclables, industrial by-products or suitable waste streams.',
    href: '/sell-waste',
    action: 'Start waste review',
    contexts: ['general', 'recovery', 'waste']
  },
  {
    id: 'assessment',
    mode: 'etersolis',
    icon: ShieldAlert,
    label: 'Request assessment',
    description: 'Waste, carbon, circular economy or industrial resource review.',
    href: '/contact?topic=Consultation%20%2F%20Assessment#contact-form',
    action: 'Route assessment',
    contexts: ['general', 'contact']
  },
  {
    id: 'wastewater',
    mode: 'etersolis',
    icon: Droplets,
    label: 'Wastewater treatment',
    description: 'Treatment residuals, water recovery infrastructure questions or wastewater-linked by-products.',
    href: '/contact?topic=Wastewater%20Treatment#contact-form',
    action: 'Request wastewater assessment',
    contexts: ['water', 'wastewater', 'recovery']
  },
  {
    id: 'solutions',
    mode: 'etersolis',
    icon: Bot,
    label: 'Explore recovery',
    description: 'Resource recovery, valorization, circular economy or decarbonization fit.',
    href: '/solutions',
    action: 'View solutions',
    contexts: ['general', 'recovery']
  },
  {
    id: 'partner',
    mode: 'etersolis',
    icon: Handshake,
    label: 'Partner inquiry',
    description: 'Recycler, logistics, lab, university, technology or commercial collaboration.',
    href: '/contact?topic=Partnership#contact-form',
    action: 'Contact partnerships',
    contexts: ['partnership', 'general']
  },
  {
    id: 'talent',
    mode: 'etersolis',
    icon: BriefcaseBusiness,
    label: 'Talent route',
    description: 'Careers, Associate Program interest or controlled talent inquiry.',
    href: '/contact?topic=Careers%20%2F%20Associate#contact-form',
    action: 'Contact EterSolis',
    contexts: ['talent', 'general']
  },
  {
    id: 'executive',
    mode: 'etersolis',
    icon: Crown,
    label: 'Executive or CSO',
    description: 'CEO, CSO, strategic, scientific or controlled documentation matter.',
    href: '/contact?topic=Executive#contact-form',
    action: 'Route executive inquiry',
    contexts: ['executive', 'science', 'general']
  },
  {
    id: 'kymnis-overview',
    mode: 'kymnis',
    icon: Network,
    label: 'Explore KYMNIS',
    description: 'Environmental impact registration, verification, resolution, resource recovery and measurable improvement.',
    href: '/kymnis',
    action: 'Open KYMNIS',
    contexts: ['general', 'kymnis']
  },
  {
    id: 'kymnis-report-impact',
    mode: 'kymnis',
    icon: Bot,
    label: 'Report Impact model',
    description: 'See something, take a photo or video, choose a simple category and submit.',
    href: '/kymnis/how-it-works',
    action: 'Review report flow',
    contexts: ['general', 'kymnis']
  },
  {
    id: 'kymnis-verification',
    mode: 'kymnis',
    icon: FlaskConical,
    label: 'Verification pathway',
    description: 'Review evidence, location, stakeholders, solution paths and progress.',
    href: '/kymnis/verification',
    action: 'Review verification',
    contexts: ['verification', 'kymnis']
  },
  {
    id: 'kymnis-recovery',
    mode: 'kymnis',
    icon: Recycle,
    label: 'Resource Collection',
    description: 'Find collection points, scan QR codes and record recoverable or hazardous resources.',
    href: '/kymnis/resource-recovery',
    action: 'Review recovery',
    contexts: ['recovery', 'kymnis']
  },
  {
    id: 'kymnis-contact',
    mode: 'kymnis',
    icon: Handshake,
    label: 'Register KYMNIS interest',
    description: 'Submit a concise, non-confidential platform participation inquiry for KYMNIS review.',
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
