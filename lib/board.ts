import { CHARACTERS, SECTORS } from '@/content';
import { CHARACTER_KEYS, type CharacterKey, type SectorKey } from '@/content/schema';

export type BoardCounts = Record<SectorKey, Record<CharacterKey, number>>;

export function emptyBoard(): BoardCounts {
  return Object.fromEntries(
    SECTORS.map((s) => [s.key, Object.fromEntries(CHARACTER_KEYS.map((k) => [k, 0]))]),
  ) as BoardCounts;
}

/**
 * Convierte la respuesta de Apps Script ({ counts: { "Hospitales": { "Luigi": 2 } } }),
 * indexada por nombres visibles, a claves internas.
 */
export function normalizeBoard(raw: unknown): BoardCounts {
  const board = emptyBoard();
  if (!raw || typeof raw !== 'object' || !('counts' in raw)) return board;
  const counts = (raw as { counts: unknown }).counts;
  if (!counts || typeof counts !== 'object') return board;
  for (const [sectorName, byChar] of Object.entries(counts as Record<string, unknown>)) {
    const sector = SECTORS.find((s) => s.name === sectorName || s.key === sectorName);
    if (!sector || !byChar || typeof byChar !== 'object') continue;
    for (const [charName, n] of Object.entries(byChar as Record<string, unknown>)) {
      const key = CHARACTER_KEYS.find((k) => CHARACTERS[k].name === charName || k === charName);
      if (key && typeof n === 'number' && Number.isFinite(n)) board[sector.key][key] += n;
    }
  }
  return board;
}

/** Personajes con el máximo conteo en un sector (vacío si nadie jugó). */
export function leaders(row: Record<CharacterKey, number>): CharacterKey[] {
  const max = Math.max(...CHARACTER_KEYS.map((k) => row[k]));
  if (max <= 0) return [];
  return CHARACTER_KEYS.filter((k) => row[k] === max);
}
