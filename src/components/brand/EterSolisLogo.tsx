import Image from 'next/image';

type LogoVariant = 'light' | 'dark';
type LogoMode = 'full' | 'mark';

type EterSolisLogoProps = {
  variant?: LogoVariant;
  mode?: LogoMode;
  className?: string;
  title?: string;
};

const GOLD = '#FCCF25';
const WHITE = '#FFFFFF';
const COAL = '#565656';

function LogoMark({ variant = 'dark' }: { variant?: LogoVariant }) {
  const dot = variant === 'light' ? WHITE : COAL;

  return (
    <g>
      <path
        d="M69 5 C41 14 28 43 35 72 C41 100 66 121 83 144 C112 184 111 223 91 246 C77 263 57 270 40 264 C57 275 84 276 103 259 C134 232 130 183 100 142 C78 112 50 91 44 64 C39 42 48 19 69 5 Z"
        fill={GOLD}
      />
      <circle cx="73" cy="208" r="25" fill="none" stroke={GOLD} strokeWidth="10" />
      <path d="M73 163 L80 194 L112 181 L91 205 L124 210 L91 216 L112 240 L80 226 L73 258 L66 226 L34 240 L56 216 L22 210 L56 205 L34 181 L66 194 Z" fill={GOLD} />
      <circle cx="123" cy="30" r="11" fill={dot} />
      <circle cx="126" cy="58" r="10" fill={dot} />
      <circle cx="116" cy="86" r="9" fill={dot} />
      <circle cx="101" cy="112" r="8" fill={dot} />
      <circle cx="85" cy="137" r="8" fill={dot} />
      <circle cx="67" cy="162" r="9" fill={dot} />
      <circle cx="53" cy="188" r="10" fill={dot} />
      <circle cx="51" cy="221" r="10" fill={dot} />
      <circle cx="61" cy="251" r="11" fill={dot} />
    </g>
  );
}

export function EterSolisLogo({ variant = 'dark', mode = 'full', className, title = 'EterSolis' }: EterSolisLogoProps) {
  const alt = title;

  if (mode === 'mark') {
    return (
      <Image src="/media/etersolis-mark.png" alt={alt} className={className} width={220} height={280} priority />
    );
  }

  // For full mode, render the approved mark PNG plus clubbed text to avoid
  // using the previously added SVG file which is not brand-compliant.
  return (
    <div className={`inline-flex items-center gap-4 ${className ?? ''}`} aria-label={title}>
      <Image src="/media/etersolis-mark.png" alt={alt} width={120} height={160} priority />
      <span className="font-black text-3xl tracking-wide text-[--coal]">EterSolis</span>
    </div>
  );
}
