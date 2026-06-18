export const kymnisBrand = {
  name: 'KYMNIS®',
  domain: 'KYMNIS.COM',
  expansion: 'Knowledge Yielding Measurable Natural Improvement & Sustainability',
  tagline: 'Verified Truth. Responsible Action. Measurable Impact.',
  description:
    'A global Environmental Impact Registration, Verification and Resolution Platform dedicated to transforming environmental impacts into verified knowledge, measurable improvement, sustainable resource recovery and human benefit.',
  mission:
    'Provide the world’s most trusted platform for identifying, verifying and resolving environmental impacts through lawful, transparent, evidence-based and collaborative processes.',
  vision:
    'Become the world’s most trusted environmental intelligence and resource recovery institution.',
  philosophy: 'Observe. Verify. Understand. Resolve. Recover. Improve. Regenerate.',
  essence: 'See it. Report it. Verify it. Resolve it. Improve it.'
} as const;

export const kymnisPillars = [
  {
    title: 'Impact registration',
    description: 'Give people, communities and organizations a simple way to show an environmental problem and ask for help.'
  },
  {
    title: 'Verification',
    description: 'Review location, evidence, stakeholders and context so impacts can become verified environmental knowledge.'
  },
  {
    title: 'Resolution',
    description: 'Route verified issues toward lawful, transparent and collaborative pathways for responsible action.'
  },
  {
    title: 'Resource recovery',
    description: 'Connect waste, water, carbon and material impacts to practical recovery opportunities and circular value.'
  },
  {
    title: 'Measurable outcomes',
    description: 'Track progress, improvement, human benefit and sustainability outcomes with evidence-based discipline.'
  },
  {
    title: 'Environmental intelligence',
    description: 'Build a global network of environmental data, resource opportunities, compliance support and community participation.'
  }
] as const;

export const kymnisFlow = [
  'Observe the impact',
  'Register simple evidence',
  'Verify location, time and context',
  'Understand stakeholders and possible solutions',
  'Resolve, recover and measure improvement'
] as const;

export const kymnisGuardrails = [
  'Neutral environmental platform',
  'Not a complaints platform',
  'Not an activist movement',
  'Not a whistleblowing system',
  'No emergency response handling',
  'No confidential submissions through public forms'
] as const;

export const kymnisReportCategories = [
  'Water Problem',
  'Waste Problem',
  'Air Problem',
  'Carbon / Climate Problem',
  'Nature Problem',
  'Hazardous Material',
  'Noise Problem',
  'Something Else'
] as const;

export const kymnisAppButtons = [
  { label: 'Report Impact', description: 'Take a photo or short video, choose the problem type and submit.' },
  { label: 'My Reports', description: 'Track submitted reports and receive progress updates.' },
  { label: 'Resource Collection', description: 'Find nearby collection points and record recoverable or hazardous resources.' },
  { label: 'Learn', description: 'Simple environmental education without jargon.' }
] as const;

export const kymnisUserJourney = [
  'I saw a problem.',
  'I reported it.',
  'It was verified.',
  'Someone is working on it.',
  'The problem improved.',
  'The impact was measured.'
] as const;
