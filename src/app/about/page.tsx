import type { Metadata } from 'next';
import { Atom, Crown, FileLock2, Globe2, ShieldCheck } from 'lucide-react';
import { EterSolisLogo } from '@/components/brand/EterSolisLogo';
import { PageHero } from '@/components/ui/PageHero';

const principles = [
  ['Practical recovery', 'Waste is assessed through realistic reuse, recycling, recovery, valorization and responsible treatment pathways.'],
  ['Controlled disclosure', 'Public communication stays commercially useful without exposing KYMNIS internal architecture, counterparties or confidential methods.'],
  ['Applied science', 'Technical review, documentation discipline and operational feasibility guide the work.'],
  ['Commercial execution', 'EterSolis focuses on practical implementation, not unsupported sustainability claims.']
];

export const metadata: Metadata = {
  title: 'About EterSolis | Privately Owned Waste and Carbon Management Company',
  description: 'EterSolis is a privately owned waste and carbon management company focused on practical resource, waste, carbon and circular economy challenges.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EterSolis"
        title="A practical operating company for waste, carbon and resource challenges."
        description="EterSolis is a privately owned waste and carbon management company focused on solving practical resource, waste, carbon and circular economy challenges."
      />
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="glass-panel rounded-lg p-8 md:p-10">
            <EterSolisLogo variant="dark" mode="mark" className="h-28 w-auto dark:hidden" title="EterSolis transparent mark" />
            <EterSolisLogo variant="light" mode="mark" className="hidden h-28 w-auto dark:block" title="EterSolis transparent mark" />
            <h2 className="mt-8 text-4xl font-black tracking-normal text-carbon dark:text-white">Waste is not a final state. It is a material question.</h2>
            <p className="mt-5 text-lg leading-8 text-coal dark:text-white/76">
              The company develops responsible resource recovery, circular economy, carbon management, waste valorization and industrial sustainability solutions for organizations seeking to reduce waste burdens, recover value and improve operational performance.
            </p>
            <p className="mt-4 leading-8 text-coal dark:text-white/70">
              EterSolis operates with disciplined documentation, controlled public communication, applied science and careful protection of confidential information.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {principles.map(([title, text]) => (
                <article key={title} className="rounded-lg border border-coal/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                  <h3 className="font-black text-carbon dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-coal dark:text-white/68">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <article className="card-hover rounded-lg border border-coal/10 bg-[#FAFAF7] p-7 shadow-soft dark:border-white/10 dark:bg-white/5">
              <Crown className="h-7 w-7 text-sunshine" />
              <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">Ralston E. Smith</h2>
              <p className="mt-2 font-bold text-coal dark:text-white/72">Founder and Chief Executive Officer</p>
              <a href="mailto:smith@etersolis.com" className="mt-5 inline-block font-black text-carbon dark:text-sunshine">smith@etersolis.com</a>
            </article>
            <article className="card-hover rounded-lg border border-coal/10 bg-[#FAFAF7] p-7 shadow-soft dark:border-white/10 dark:bg-white/5">
              <Atom className="h-7 w-7 text-sunshine" />
              <h2 className="mt-5 text-2xl font-black text-carbon dark:text-white">Ralston E. Lee Smith</h2>
              <p className="mt-2 font-bold text-coal dark:text-white/72">Chief Scientific Officer</p>
              <a href="mailto:cso@etersolis.com" className="mt-5 inline-block font-black text-carbon dark:text-sunshine">cso@etersolis.com</a>
            </article>
            <article className="rounded-lg border border-sunshine/60 bg-sunshine/12 p-7 dark:bg-sunshine/10">
              <div className="flex items-center gap-3 text-carbon dark:text-white"><ShieldCheck className="h-5 w-5 text-sunshine" /><span className="font-black">Operating standard</span></div>
              <p className="mt-4 text-sm leading-7 text-coal dark:text-white/72">Professional, controlled, commercially useful and minimally revealing communication.</p>
            </article>
            <article className="rounded-lg border border-coal/10 p-7 dark:border-white/10">
              <div className="flex items-center gap-3 text-carbon dark:text-white"><Globe2 className="h-5 w-5 text-sunshine" /><span className="font-black">Public website</span></div>
              <p className="mt-4 text-sm leading-7 text-coal dark:text-white/72">etersolis.com is the official EterSolis public web route.</p>
            </article>
            <article className="rounded-lg border border-coal/10 p-7 dark:border-white/10">
              <div className="flex items-center gap-3 text-carbon dark:text-white"><FileLock2 className="h-5 w-5 text-sunshine" /><span className="font-black">Confidentiality</span></div>
              <p className="mt-4 text-sm leading-7 text-coal dark:text-white/72">Do not submit restricted or confidential details through public forms unless an approved intake route is provided.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
