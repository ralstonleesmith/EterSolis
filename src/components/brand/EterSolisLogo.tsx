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
  const eterColor = variant === 'light' ? WHITE : COAL;

  if (mode === 'mark') {
    // Use the raster mark image from `public/media/etersolis-mark.png`.
    // Ensure the PNG is added to the repo at that path before merging.
    return (
      <img
        className={className}
        src="/media/etersolis-mark.png"
        alt={title}
        role="img"
        aria-label={title}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    );
  }

  return (
    <svg className={className} viewBox="0 0 620 160" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g transform="translate(0 -62) scale(0.58)">
        <LogoMark variant={variant} />
      </g>
      <text x="170" y="105" fontFamily="Aptos, Inter, Arial, sans-serif" fontSize="80" fontWeight="900" letterSpacing="6" fill={eterColor}>ETER</text>
      <text x="392" y="105" fontFamily="Aptos, Inter, Arial, sans-serif" fontSize="80" fontWeight="900" letterSpacing="6" fill={GOLD}>SOLIS</text>
    </svg>
  );
}
