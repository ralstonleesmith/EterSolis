import type { Department } from '@/lib/operations/enums';

export const departmentTaxonomy: Record<Department, {
  label: string;
  publicDescription: string;
  routeEmailKey: string;
  examples: string[];
}> = {
  wastewater: {
    label: 'Water, wastewater & treatment residuals',
    publicDescription: 'Sludge, screenings, process water, wash water, leachate and treatment residuals.',
    routeEmailKey: 'WASTEWATER_ROUTE_EMAIL',
    examples: ['Sludge', 'Screenings', 'Process water', 'Wash water', 'Leachate']
  },
  biologicals: {
    label: 'Biological, organic & biodegradable materials',
    publicDescription: 'Food waste, manure, biosolids, green waste and organic residues.',
    routeEmailKey: 'BIOLOGICALS_ROUTE_EMAIL',
    examples: ['Food waste', 'Manure', 'Biosolids', 'Green waste', 'Organic residues']
  },
  hydrocarbons: {
    label: 'Oils, fuels, solvents & hydrocarbon materials',
    publicDescription: 'Used oil, oily sludge, fuel residues, lubricants, grease and solvent-linked materials.',
    routeEmailKey: 'HYDROCARBONS_ROUTE_EMAIL',
    examples: ['Used oil', 'Oily sludge', 'Fuel residues', 'Lubricants', 'Grease']
  },
  industrial: {
    label: 'Industrial by-products & process residues',
    publicDescription: 'Manufacturing residues, chemical by-products, mineral residues and production scrap.',
    routeEmailKey: 'INDUSTRIAL_ROUTE_EMAIL',
    examples: ['Manufacturing residues', 'Chemical by-products', 'Mineral residues', 'Production scrap']
  },
  recyclables: {
    label: 'Recyclables & recoverable materials',
    publicDescription: 'Plastics, paper, cardboard, metals, glass, e-waste, pallets and packaging.',
    routeEmailKey: 'RECYCLABLES_ROUTE_EMAIL',
    examples: ['Plastics', 'Paper', 'Metals', 'Glass', 'E-waste']
  }
};

export function departmentLabel(department: Department) {
  return departmentTaxonomy[department].label;
}

export function routeEmailForDepartment(department: Department) {
  const fallback = process.env.SERVICE_ROUTE_EMAIL ?? process.env.OPERATIONS_ROUTE_EMAIL ?? process.env.WASTE_ROUTE_EMAIL ?? 'service@etersolis.com';
  const key = departmentTaxonomy[department].routeEmailKey;
  return process.env[key] ?? fallback;
}
