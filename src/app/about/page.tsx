import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About EterSolis | Privately Owned Waste and Carbon Management Company',
  description: 'EterSolis is a privately owned waste and carbon management company focused on practical resource, waste, carbon and circular economy challenges.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-coal/70">About</p>
          <h1 className="mt-3 text-5xl font-bold text-carbon">A practical operating company for waste, carbon and resource challenges.</h1>
          <p className="mt-6 text-lg leading-8 text-coal">
            EterSolis is a privately owned waste and carbon management company focused on solving practical resource, waste, carbon and circular economy challenges.
          </p>
          <p className="mt-4 leading-8 text-coal">
            The company develops responsible resource recovery, circular economy, carbon management, waste valorization and industrial sustainability solutions for organizations seeking to reduce waste burdens, recover value and improve operational performance.
          </p>
          <p className="mt-4 leading-8 text-coal">
            EterSolis operates with disciplined documentation, controlled public communication, applied science and careful protection of confidential information.
          </p>
        </div>
        <div className="grid gap-5">
          <article className="rounded-3xl border border-cool bg-cool p-6">
            <h2 className="text-2xl font-bold text-carbon">Ralston E. Smith</h2>
            <p className="mt-2 font-semibold text-coal">Founder and Chief Executive Officer</p>
            <a href="mailto:smith@etersolis.com" className="mt-4 inline-block font-bold text-carbon">smith@etersolis.com</a>
          </article>
          <article className="rounded-3xl border border-cool bg-cool p-6">
            <h2 className="text-2xl font-bold text-carbon">Ralston E. Lee Smith</h2>
            <p className="mt-2 font-semibold text-coal">Chief Scientific Officer</p>
            <a href="mailto:cso@etersolis.com" className="mt-4 inline-block font-bold text-carbon">cso@etersolis.com</a>
          </article>
        </div>
      </div>
    </section>
  );
}
