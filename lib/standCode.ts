import { CHARACTERS } from '@/content/characters';
import type { CharacterKey } from '@/content/schema';

/** Hash FNV-1a determinista (sin Math.random). */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Código corto para el facilitador, p. ej. TOAD-ASEG-07. */
export function makeStandCode(
  character: CharacterKey,
  sectorShortCode: string,
  seed: string,
): string {
  const n = (hash(seed) % 99) + 1;
  return `${CHARACTERS[character].name.toUpperCase()}-${sectorShortCode}-${String(n).padStart(2, '0')}`;
}
