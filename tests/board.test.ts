import { describe, expect, it } from 'vitest';
import { leaders, normalizeBoard } from '@/lib/board';

describe('normalizeBoard', () => {
  it('convierte nombres visibles a claves internas', () => {
    const board = normalizeBoard({
      ok: true,
      counts: { Aseguradoras: { Toad: 3, Luigi: 1 }, 'Laboratorios clínicos': { Bowser: 2 } },
    });
    expect(board.aseguradoras.toad).toBe(3);
    expect(board.aseguradoras.luigi).toBe(1);
    expect(board.laboratorios.bowser).toBe(2);
    expect(board.hospitales.mario).toBe(0);
  });

  it('ignora datos desconocidos o malformados', () => {
    expect(normalizeBoard(null).brokers.peach).toBe(0);
    expect(normalizeBoard({ counts: { Otro: { Bowser: 9 } } }).brokers.peach).toBe(0);
  });
});

describe('leaders', () => {
  it('devuelve el personaje dominante o el empate', () => {
    expect(leaders({ luigi: 1, peach: 0, bowser: 0, toad: 3, mario: 0 })).toEqual(['toad']);
    expect(leaders({ luigi: 2, peach: 2, bowser: 0, toad: 0, mario: 0 })).toEqual(['luigi', 'peach']);
    expect(leaders({ luigi: 0, peach: 0, bowser: 0, toad: 0, mario: 0 })).toEqual([]);
  });
});
