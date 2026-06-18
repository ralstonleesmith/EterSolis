import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EterSolis',
    short_name: 'EterSolis',
    description: 'Waste and carbon management, resource recovery and circular economy solutions.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#fccf25',
    icons: [
      {
        src: `${env.siteUrl}/media/etersolis-mark.png`,
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
