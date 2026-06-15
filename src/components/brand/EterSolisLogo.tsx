import Image from 'next/image';

type LogoVariant = 'light' | 'dark';
type LogoMode = 'full' | 'mark';

type EterSolisLogoProps = {
  variant?: LogoVariant;
  mode?: LogoMode;
  className?: string;
  title?: string;
};

const MARK_SRC = '/media/etersolis-mark.png';

export function EterSolisLogo({ variant = 'dark', mode = 'full', className, title = 'EterSolis' }: EterSolisLogoProps) {
  const textClass = variant === 'light' ? 'text-white' : 'text-[--coal]';

  if (mode === 'mark') {
    return <Image src={MARK_SRC} alt={title} className={className} width={146} height={280} priority />;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ''}`} aria-label={title}>
      <Image src={MARK_SRC} alt="" width={64} height={122} priority />
      <span className={`font-black tracking-wide ${textClass}`}>EterSolis</span>
    </div>
  );
}
