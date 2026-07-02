export const portalStages = [
  'Case submitted',
  'Technical and commercial review',
  'Quotation issued',
  'Quotation accepted',
  'Invoice issued',
  'Payment proof uploaded',
  'Payment reconciled',
  'Pickup or delivery scheduled',
  'Material received',
  'Processing or disposition',
  'Certificate decision',
  'Case closed'
] as const;

export const portalRoutes = [
  { href: '/portal', label: 'Portal Home' },
  { href: '/portal/cases', label: 'Cases' },
  { href: '/portal/quotations', label: 'Quotations' },
  { href: '/portal/invoices', label: 'Invoices' },
  { href: '/portal/payments', label: 'Payments' },
  { href: '/portal/uploads', label: 'Uploads' },
  { href: '/portal/schedule', label: 'Schedule' },
  { href: '/portal/certificates', label: 'Certificates' },
  { href: '/portal/profile', label: 'Profile' }
] as const;

export const adminPortalConsoles = [
  'Case review',
  'Quotation approval',
  'Invoice approval',
  'Payment reconciliation',
  'Refund control',
  'Scheduling',
  'Receiving',
  'Stockpile',
  'Processing',
  'Certificates',
  'Audit and access logs'
] as const;

export function caseReferenceForPreview() {
  return 'ES-CASE-DEMO-0001';
}

export function qrSvgDataUrl(value: string) {
  const cells = Array.from({ length: 21 * 21 }, (_, index) => {
    const x = index % 21;
    const y = Math.floor(index / 21);
    const finder =
      (x < 7 && y < 7) ||
      (x > 13 && y < 7) ||
      (x < 7 && y > 13);
    const innerFinder =
      (x > 1 && x < 5 && y > 1 && y < 5) ||
      (x > 15 && x < 19 && y > 1 && y < 5) ||
      (x > 1 && x < 5 && y > 15 && y < 19);
    const hash = value.charCodeAt(index % value.length) + x * 17 + y * 31 + index;
    return finder || innerFinder || hash % 5 === 0;
  });
  const rects = cells.map((filled, index) => {
    if (!filled) return '';
    const x = index % 21;
    const y = Math.floor(index / 21);
    return `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" shape-rendering="crispEdges"><rect width="21" height="21" fill="#fff"/><g fill="#000">${rects}</g></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
