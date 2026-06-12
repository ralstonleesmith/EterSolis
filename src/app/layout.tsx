import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
    type: 'website'
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="etersolis-theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('etersolis-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}`}
        </Script>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
