export const navItems = [
  { href: '/solutions', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/kymnis', label: 'KYMNIS' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
] as const;

export const siteRoutes = [
  '/',
  '/get-started',
  '/get-started/pickup',
  '/get-started/delivery',
  '/get-started/assessment',
  '/get-started/certificates',
  '/sell-waste',
  '/status/[publicToken]',
  '/certificates/verify',
  '/portal',
  '/portal/cases',
  '/portal/quotations',
  '/portal/invoices',
  '/portal/payments',
  '/portal/uploads',
  '/portal/schedule',
  '/portal/certificates',
  '/portal/profile',
  '/solutions',
  '/industries',
  '/kymnis',
  '/insights',
  '/about',
  '/contact'
] as const;

export const kymnisRoutes = [
  '/kymnis',
  '/kymnis/how-it-works',
  '/kymnis/verification',
  '/kymnis/resource-recovery',
  '/kymnis/contact'
] as const;

export const contactRoutes = [
  { key: 'service', label: 'Service requests', email: 'service@etersolis.com', purpose: 'Controlled intake, pickup, delivery, assessment, certification and operating-service inquiries.' },
  { key: 'operations', label: 'Operations', email: 'operations@etersolis.com', purpose: 'Material movement, receiving, scheduling and department routing matters.' },
  { key: 'waste', label: 'Selected material review', email: 'waste@etersolis.com', purpose: 'Controlled material stream and purchase-eligibility review inquiries.' },
  { key: 'general', label: 'General inquiries', email: 'info@etersolis.com', purpose: 'General contact and low-specificity website inquiries.' },
  { key: 'partnerships', label: 'Partnerships', email: 'partnerships@etersolis.com', purpose: 'Recovery partners, universities, logistics, labs, technology and commercial partners.' },
  { key: 'kymnis', label: 'KYMNIS inquiries', email: 'kymnis@etersolis.com', purpose: 'KYMNIS platform interest, verification, registry and impact-intelligence inquiries.' },
  { key: 'ceo', label: 'Founder and CEO', email: 'smith@etersolis.com', purpose: 'Executive, strategic, investor and high-value commercial inquiries.' },
  { key: 'cso', label: 'Chief Scientific Officer', email: 'cso@etersolis.com', purpose: 'Technical, scientific, disclosure, talent and controlled documentation matters.' },
  { key: 'privacy', label: 'Privacy/legal', email: 'privacy@etersolis.com', purpose: 'Privacy requests, data subject requests and website policy contacts.' },
  { key: 'talent', label: 'Talent inquiries', email: 'careers@etersolis.com', purpose: 'Career and Associate Program inquiries when public intake is activated.' }
] as const;

export const wasteMaterialCategories = [
  'Plastics',
  'Paper and cardboard',
  'Metals',
  'E-waste',
  'Organics',
  'Industrial by-products',
  'Water and wastewater treatment residuals',
  'Construction materials',
  'Other recoverable resources'
] as const;

export const wasteFrequencies = ['One-time', 'Weekly', 'Monthly', 'Quarterly', 'Continuous', 'Unknown'] as const;

export const contactTopics = [
  'Consultation / Assessment',
  'Wastewater Treatment',
  'Partnership',
  'KYMNIS',
  'Executive',
  'Scientific / CSO',
  'Careers / Associate',
  'Privacy',
  'General'
] as const;
