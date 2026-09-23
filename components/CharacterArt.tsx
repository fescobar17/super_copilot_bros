import Image from 'next/image';
import { asset, cld } from '@/content/assets';
import { CHARACTERS } from '@/content/characters';
import type { CharacterKey } from '@/content/schema';

/** Ilustración oficial del personaje o placeholder gris con su nombre si aún falta el asset. */
export default function CharacterArt({
  character,
  size,
  priority = false,
  className = '',
}: {
  character: CharacterKey;
  size: number;
  priority?: boolean;
  className?: string;
}) {
  const c = CHARACTERS[character];
  const url = cld(asset(c.image), `f_auto,q_auto,w_${size * 2}`);
  if (!url) {
    return (
      <div
        role="img"
        aria-label={`${c.name} (ilustración pendiente)`}
        className={`grid place-items-center rounded-2xl border-2 border-dashed border-neutral-500 bg-neutral-300 text-center font-bold text-neutral-700 ${className}`}
        style={{ width: size, height: size }}
      >
        {size < 90 ? (
          <span className="text-lg">{c.name.charAt(0)}</span>
        ) : (
          <span className="px-2 text-sm leading-tight">
            {c.name}
            <br />
            <span className="text-xs font-semibold opacity-70">ilustración pendiente</span>
          </span>
        )}
      </div>
    );
  }
  return (
    <Image
      src={url}
      alt={c.name}
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      unoptimized
    />
  );
}
