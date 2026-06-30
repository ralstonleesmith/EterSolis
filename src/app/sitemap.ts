import type { MetadataRoute } from 'next';
import { kymnisRoutes, siteRoutes } from '@/lib/siteContent';

const siteRouteSet = new Set<string>(siteRoutes);
const routes = [
  '',
  ...siteRoutes.filter((route) => route !== '/'),
  ...kymnisRoutes.filter((route) => !siteRouteSet.has(route)),
  '/helios',
  '/insights/introducing-etersolis',
  '/insights/technical-intelligence-brief',
  '/media-credits',
  '/privacy',
  '/terms'
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://etersolis.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' || route === '/sell-waste' ? 1 : 0.7
  }));
}
