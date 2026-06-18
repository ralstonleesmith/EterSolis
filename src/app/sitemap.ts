import type { MetadataRoute } from 'next';
import { siteRoutes } from '@/lib/siteContent';

const routes = ['', ...siteRoutes.filter((route) => route !== '/'), '/helios', '/media-credits', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://etersolis.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' || route === '/sell-waste' ? 1 : 0.7
  }));
}
