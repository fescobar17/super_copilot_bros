// Escenario del key visual: colinas turquesa, arbustos, tubería, pasto dentado y tierra ondulada.
// Todo en CSS/SVG con posiciones fijas (sin aleatoriedad → sin errores de hidratación).

const CLOUDS = [
  { left: '6%', top: '9%', scale: 0.8 },
  { left: '72%', top: '5%', scale: 1 },
  { left: '48%', top: '18%', scale: 0.6 },
];

function Cloud({ scale }: { scale: number }) {
  return (
    <svg width={96 * scale} height={40 * scale} viewBox="0 0 96 40" aria-hidden>
      <g fill="#fff" opacity="0.9">
        <circle cx="24" cy="26" r="14" />
        <circle cx="44" cy="18" r="18" />
        <circle cx="66" cy="24" r="15" />
        <rect x="16" y="24" width="62" height="16" rx="8" />
      </g>
    </svg>
  );
}

function Bush({ width }: { width: number }) {
  return (
    <svg width={width} height={width * 0.45} viewBox="0 0 120 54" aria-hidden>
      <g fill="#4DB02F" stroke="#2A7A1B" strokeWidth="2">
        <circle cx="22" cy="36" r="20" />
        <circle cx="50" cy="26" r="26" />
        <circle cx="82" cy="30" r="24" />
        <circle cx="104" cy="40" r="16" />
      </g>
      <g fill="#7BD34E" opacity="0.7">
        <circle cx="44" cy="18" r="8" />
        <circle cx="78" cy="22" r="7" />
      </g>
    </svg>
  );
}

function Pipe() {
  return (
    <div aria-hidden className="relative" style={{ width: 70 }}>
      <div
        style={{
          height: 26,
          margin: '0 -6px',
          borderRadius: 4,
          border: '3px solid #0E4A16',
          background: 'linear-gradient(90deg,#1E8A2E 0%,#5FD068 30%,#2EA83C 60%,#157022 100%)',
        }}
      />
      <div
        style={{
          height: 64,
          borderLeft: '3px solid #0E4A16',
          borderRight: '3px solid #0E4A16',
          background: 'linear-gradient(90deg,#1E8A2E 0%,#5FD068 30%,#2EA83C 60%,#157022 100%)',
        }}
      />
    </div>
  );
}

export function Ground({ height = 96 }: { height?: number }) {
  return (
    <div aria-hidden style={{ height }} className="relative w-full overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id="dirt" width="80" height="28" patternUnits="userSpaceOnUse">
            <rect width="80" height="28" fill="#E7A33C" />
            <path d="M0 14 Q20 6 40 14 T80 14 V28 H0Z" fill="#D98B25" />
            <path d="M0 22 Q20 16 40 22 T80 22" stroke="#F4C063" strokeWidth="3" fill="none" />
          </pattern>
          <pattern id="grass" width="24" height="18" patternUnits="userSpaceOnUse">
            <rect width="24" height="10" fill="#5BC236" />
            <path d="M0 10 L6 17 L12 10 L18 17 L24 10Z" fill="#5BC236" />
            <path d="M0 3 H24" stroke="#8BE05A" strokeWidth="3" />
          </pattern>
        </defs>
        <rect y="0" width="100%" height="100%" fill="url(#dirt)" />
        <rect y="0" width="100%" height="18" fill="url(#grass)" />
      </svg>
    </div>
  );
}

export function Coin({ size = 28, className = '' }: { size?: number; className?: string }) {
  return <span aria-hidden className={`coin ${className}`} style={{ width: size * 0.82, height: size }} />;
}

export default function Scenery({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const ground = variant === 'full' ? 110 : 64;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {(variant === 'full' ? CLOUDS : []).map((c, i) => (
        <div key={i} className="absolute" style={{ left: c.left, top: c.top }}>
          <Cloud scale={c.scale} />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0">
        <div className="relative" style={{ height: variant === 'full' ? 150 : 90 }}>
          <div
            className="absolute bottom-0"
            style={{
              left: '-8%',
              width: variant === 'full' ? 230 : 160,
              height: variant === 'full' ? 150 : 90,
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
              background: 'linear-gradient(180deg,#5CCBC2 0%,#3FB8B0 60%,#2E9C95 100%)',
              border: '3px solid #1F7A74',
              borderBottom: 'none',
            }}
          />
          <div className="absolute bottom-0" style={{ left: '4%' }}>
            <Bush width={variant === 'full' ? 130 : 90} />
          </div>
          <div className="absolute bottom-0" style={{ right: '8%' }}>
            {variant === 'full' ? <Pipe /> : null}
          </div>
          <div className="absolute bottom-0" style={{ right: variant === 'full' ? '-4%' : '2%' }}>
            <Bush width={variant === 'full' ? 100 : 70} />
          </div>
        </div>
        <Ground height={ground} />
      </div>
    </div>
  );
}
