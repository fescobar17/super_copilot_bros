import { CHARACTER_BY_LETTER, CHARACTERS } from '@/content/characters';
import { LETTERS, type CharacterKey, type Letter, type PowerUp } from '@/content/schema';

export type LetterCounts = Record<Letter, number>;

export interface Result {
  character: CharacterKey;
  powerUp: PowerUp;
  counts: LetterCounts;
  tie: boolean;
}

export function countLetters(answers: readonly Letter[]): LetterCounts {
  const counts: LetterCounts = { A: 0, B: 0, C: 0, D: 0 };
  for (const a of answers) counts[a] += 1;
  return counts;
}

/**
 * Regla de asignación:
 * 1. Cuenta respuestas por letra.
 * 2. Una sola letra con el máximo → su personaje (A Luigi · B Peach · C Yoshi · D Toad).
 * 3. Dos o más letras empatadas en el máximo → Mario (ACELERA).
 */
export function scoreAnswers(answers: readonly Letter[]): Result {
  const counts = countLetters(answers);
  const max = Math.max(...LETTERS.map((l) => counts[l]));
  const leaders = LETTERS.filter((l) => counts[l] === max);
  const leader = leaders[0];
  const character: CharacterKey =
    leaders.length === 1 && leader ? CHARACTER_BY_LETTER[leader] : 'mario';
  return { character, powerUp: CHARACTERS[character].powerUp, counts, tie: leaders.length > 1 };
}
