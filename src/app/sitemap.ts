import type { MetadataRoute } from 'next';

const routes = ['', '/sell-waste', '/solutions', '/industries', '/about', '/contact', '/insights', '/helios', '/media-credits', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://etersolis.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' || route === '/sell-waste' ? 1 : 0.7
  }));
}
