import { EterSolisLogo } from '@/components/brand/EterSolisLogo';

const nodes = [
  { label: 'Waste stream', x: '8%', y: '24%' },
  { label: 'Data review', x: '38%', y: '14%' },
  { label: 'Recovery pathway', x: '64%', y: '36%' },
  { label: 'Commercial review', x: '32%', y: '66%' },
  { label: 'Execution plan', x: '74%', y: '72%' }
];

export function ResourceFlowVisual() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl">
      <div className="motion-orb gold-gradient h-36 w-36 left-8 top-8" />
      <div className="motion-orb h-44 w-44 right-8 bottom-8 bg-cool" style={{ animationDelay: '1.2s' }} />
      <div className="absolute inset-8 rounded-[2rem] border border-coal/10 surface-grid" />
      <EterSolisLogo variant="dark" mode="mark" className="absolute right-8 top-8 h-32 w-auto opacity-[0.16]" title="EterSolis transparent mark" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M14 30 C34 10, 48 18, 62 36 S80 56, 78 72" stroke="rgba(86,86,86,0.26)" strokeWidth="0.8" fill="none" />
        <path d="M16 30 C34 12, 48 20, 62 37 S79 57, 77 72" stroke="rgba(252,207,37,0.92)" strokeWidth="0.55" fill="none" strokeDasharray="2 2" />
        <path d="M38 20 C22 42, 20 58, 34 68 S58 74, 75 74" stroke="rgba(252,207,37,0.52)" strokeWidth="0.55" fill="none" strokeDasharray="2 2" />
      </svg>
      {nodes.map((node, index) => (
        <div key={node.label} className="absolute z-10 w-36 rounded-2xl border border-coal/10 bg-white/90 p-4 shadow-soft card-hover" style={{ left: node.x, top: node.y }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sunshine text-sm font-black text-carbon">{index + 1}</span>
          <p className="mt-3 text-sm font-black text-carbon">{node.label}</p>
        </div>
      ))}
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-carbon/90 p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-sunshine">Controlled intake</p>
        <p className="mt-2 text-sm leading-6 text-white/78">Structured review before acceptance, purchase, movement, technical assessment or commercial commitment.</p>
      </div>
    </div>
  );
}
