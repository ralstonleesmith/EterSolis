import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { mediaAssets } from '@/lib/media';

export const metadata: Metadata = {
  metadataBase: new URL('https://etersolis.com'),
  title: {
    default: 'EterSolis | Waste & Carbon Management, Resource Recovery and Circular Economy Solutions',
    template: '%s | EterSolis'
  },
  description:
    'EterSolis is a privately owned waste and carbon management company helping organizations recover value from waste streams, manage carbon exposure and build practical circular economy solutions.',
  openGraph: {
    title: 'EterSolis | Waste & Carbon Management',
    description:
      'Resource recovery, carbon management, circular economy and industrial sustainability solutions.',
    url: 'https://etersolis.com',
    siteName: 'EterSolis',
    type: 'website',
    images: [
      {
        url: mediaAssets.hero.ogSrc,
        width: 1600,
        height: 900,
        alt: mediaAssets.wastewater.hero.alt
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EterSolis | Waste & Carbon Management',
    description:
      'Resource recovery, carbon management, circular economy and industrial sustainability solutions.',
    images: [mediaAssets.hero.ogSrc]
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts and hero image to stabilize layout for visual tests */}
        <link rel="preload" href="/fonts/Aptos.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/media/generated/hero-preview.jpg" as="image" />
      </head>
      <body>
        <Script id="etersolis-theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('etersolis-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}`}
        </Script>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <div className="page-end-spacer h-6" aria-hidden="true" />
        <Footer />
      </body>
    </html>
  );
}
