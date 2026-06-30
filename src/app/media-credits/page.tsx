import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BadgeCheck, FileText, Image as ImageIcon } from 'lucide-react';
import credits from '../../../public/media/credits.json';
import { PageHero } from '@/components/ui/PageHero';
import { mediaAssets } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Media Credits | EterSolis Website Asset Licensing',
  description: 'Public media credits, source links, licensing notes and attribution for EterSolis website visual assets.',
  alternates: { canonical: '/media-credits' }
};

const visibleAssets = credits.assets.filter((asset) => asset.type !== 'open-license-photo-derivative');

function previewPathFor(assetId: string, fallback: string) {
  if (assetId === 'etersolis-resource-recovery-hero') return mediaAssets.hero.ogSrc;
  if (assetId === 'etersolis-wastewater-treatment-hero') return '/media/og/etersolis-solutions-og.png';
  if (assetId === 'sims-material-recovery-facility') return mediaAssets.facility.previewSrc;
  if (assetId === 'wastewater-aeration-tank-bengaluru') return mediaAssets.wastewater.aeration.previewSrc;
  if (assetId === 'wastewater-stp-aerial-bengaluru') return mediaAssets.wastewater.aerial.previewSrc;
  if (assetId === 'biofactoria-santiago-lagoon') return mediaAssets.wastewater.lagoon.previewSrc;
  if (assetId === 'etersolis-newsletter-issue-001-pdf') return '/media/newsletters/issue-001/cover.jpg';
  return fallback;
}

export default function MediaCreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Media credits"
        title="Professional visual assets with documented sources."
        description="EterSolis uses self-hosted optimized imagery, controlled generated assets and documented open-license photos. This page records public attribution and licensing references."
        primaryHref="/contact#contact-form"
        primaryLabel="Ask About Media"
        secondaryHref="/"
        secondaryLabel="Return Home"
        imageSrc={mediaAssets.wastewater.aerial.previewSrc}
        imageAlt={mediaAssets.wastewater.aerial.alt}
      />

      <section className="section-padding bg-[var(--surface-muted)] dark:bg-black">
        <div className="container-shell">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: ImageIcon, title: 'Self-hosted assets', text: 'Website imagery is stored locally under public media paths and rendered through optimized components where used in the app.' },
              { icon: FileText, title: 'Source records', text: 'Open-license assets retain source URL, license URL, credit, dimensions and alt text in the media registry.' },
              { icon: BadgeCheck, title: 'Controlled claims', text: 'Images support visual context only and do not imply acceptance, treatment performance or environmental outcomes.' }
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-lg border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sunshine text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-black text-carbon dark:text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {visibleAssets.map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-lg border border-coal/10 bg-white shadow-soft dark:border-white/10 dark:bg-white/5">
                <div className="relative aspect-[16/9] bg-black">
                  <Image src={previewPathFor(asset.id, asset.path)} alt={asset.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">{asset.type}</p>
                  <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">{asset.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-coal dark:text-on-dark-muted">{asset.alt}</p>
                  <dl className="mt-5 grid gap-3 text-sm text-coal dark:text-on-dark-muted">
                    <div>
                      <dt className="font-black text-carbon dark:text-white">Credit</dt>
                      <dd>{asset.credit}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-carbon dark:text-white">License</dt>
                      <dd>{asset.license}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-carbon dark:text-white">Dimensions</dt>
                      <dd>{asset.dimensions.width && asset.dimensions.height ? `${asset.dimensions.width} × ${asset.dimensions.height}` : 'Document asset'}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {asset.sourceUrl.startsWith('http') ? (
                      <a href={asset.sourceUrl} className="inline-flex items-center gap-2 rounded-full border border-coal/20 px-4 py-2 text-sm font-black text-carbon transition hover:border-sunshine dark:border-white/15 dark:text-white">
                        Source <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                    {asset.licenseUrl.startsWith('http') ? (
                      <a href={asset.licenseUrl} className="inline-flex items-center gap-2 rounded-full bg-sunshine px-4 py-2 text-sm font-black text-black">
                        License <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-sunshine/70 bg-sunshine/10 p-6 text-sm leading-7 text-carbon dark:text-white">
            Attribution for CC BY-SA assets is provided in good faith from the source metadata available at the time the media was added. Generated assets are controlled EterSolis website assets and should not be reused as source photography.
          </div>
          <div className="mt-6">
            <Link href="/contact#contact-form" className="inline-flex items-center justify-center rounded-full bg-sunshine px-6 py-3 font-black text-black shadow-soft">
              Contact EterSolis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
