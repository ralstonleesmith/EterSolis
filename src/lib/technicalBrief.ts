export const technicalBrief = {
  slug: 'technical-intelligence-brief',
  title: 'Technical Intelligence Brief',
  eyebrow: 'Technical Intelligence Brief · Publication path ready',
  subtitle: 'A controlled public route for executive technical intelligence from EterSolis.',
  canonicalPath: '/insights/technical-intelligence-brief',
  expectedPdfPath: '/media/technical-intelligence-brief/technical-intelligence-brief-001.pdf',
  status: 'Document in development',
  summary:
    'The first Technical Intelligence Brief will be published as accessible HTML with the approved PDF preserved for download once the final document is ready.',
  standards: [
    'Public HTML must be readable, source-aware and accessible before release.',
    'The downloadable PDF must match the approved final document exactly.',
    'Claims must remain technical, bounded and non-promissory.',
    'Source notes, disclaimers, media credits and route links must be complete before publication.'
  ],
  uploadSteps: [
    'Place the approved PDF at public/media/technical-intelligence-brief/technical-intelligence-brief-001.pdf.',
    'Convert the final document into structured Markdown under content/insights/.',
    'Set the publication metadata to published only after legal, technical and executive review.',
    'Run npm run check, npm run test:smoke, npm run test:layout and npm run preview:capture.',
    'Review the generated preview before deployment.'
  ]
} as const;
