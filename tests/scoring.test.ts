import { describe, expect, it } from 'vitest';
import type { Letter } from '@/content/schema';
import { scoreAnswers } from '@/lib/scoring';

const play = (s: string) => scoreAnswers(s.split('') as Letter[]);

describe('scoreAnswers', () => {
  it.each([
    ['AAAB', 'luigi'],
    ['ABCC', 'bowser'],
    ['AABB', 'mario'],
    ['ABCD', 'mario'],
    ['DDDD', 'toad'],
    ['BBBA', 'peach'],
    ['CCDD', 'mario'],
  ])('%s → %s', (answers, expected) => {
    expect(play(answers).character).toBe(expected);
  });

  it('guarda el conteo por letra', () => {
    expect(play('ABCC').counts).toEqual({ A: 1, B: 1, C: 2, D: 0 });
  });

  it('asigna el Power-Up del personaje', () => {
    expect(play('AABB').powerUp).toBe('ACELERA');
    expect(play('DDDA').powerUp).toBe('AUTOMATIZA');
  });

  it('el orden de las respuestas no cambia el resultado', () => {
    expect(play('BAAA').character).toBe(play('AAAB').character);
  });
});
