export function SectionHeader({ eyebrow, title, description, invert = false }: { eyebrow: string; title: string; description?: string; invert?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-black uppercase tracking-normal ${invert ? 'text-sunshine' : 'text-coal'}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-4xl font-black leading-tight tracking-normal md:text-6xl ${invert ? 'text-white' : 'text-carbon'}`}>{title}</h2>
      {description ? <p className={`mt-5 text-lg leading-8 ${invert ? 'text-white/78' : 'text-coal'}`}>{description}</p> : null}
    </div>
  );
}
