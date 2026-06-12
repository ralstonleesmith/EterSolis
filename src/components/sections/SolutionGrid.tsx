const solutions = [
  ['Resource Recovery', 'Recover value from waste streams through responsible reuse, recycling, recovery and valorization pathways.', 'Assess Recovery Potential'],
  ['Waste Management', 'Develop structured waste and material management programs that reduce cost, risk and operational friction.', 'Discuss Waste Program'],
  ['Carbon Management', 'Support carbon measurement, reduction planning and practical decarbonization actions linked to resource and waste systems.', 'Request Carbon Review'],
  ['Circular Economy', 'Design pathways that keep materials in productive use and reduce unnecessary disposal.', 'Build Circular Program'],
  ['Waste Valorization', 'Identify suitable routes to convert selected waste and by-products into economic, operational or environmental value.', 'Submit Valorization Opportunity'],
  ['Industrial Decarbonization', 'Help industrial operators reduce material losses, waste-linked emissions and resource inefficiency.', 'Request Industrial Assessment']
];

export function SolutionGrid() {
  return (
    <section className="section-padding bg-cool">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="font-bold uppercase tracking-[0.2em] text-coal/70">Core solutions</p>
          <h2 className="mt-3 text-4xl font-bold text-carbon">Practical waste, carbon and resource solutions.</h2>
          <p className="mt-4 leading-7 text-coal">
            EterSolis solves waste, carbon and resource problems through practical resource recovery, waste management, circular economy, carbon management, waste valorization and industrial sustainability solutions.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map(([title, description, cta]) => (
            <article key={title} className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-carbon">{title}</h3>
              <p className="mt-3 min-h-24 leading-7 text-coal">{description}</p>
              <p className="mt-5 text-sm font-bold text-carbon">{cta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
