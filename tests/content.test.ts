import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { AHA } from '@/content/aha';
import { CHARACTERS, CHARACTER_KEYS, SECTORS, SectorSchema } from '@/content';

const doc = readFileSync(path.resolve(__dirname, '../docs/dinamica.md'), 'utf8');

describe('contenido', () => {
  it('hay 5 sectores con pistas 1–5', () => {
    expect(SECTORS.map((s) => s.trackNumber)).toEqual([1, 2, 3, 4, 5]);
  });

  describe.each(SECTORS.map((s) => [s.key, s] as const))('%s', (_key, sector) => {
    it('cumple el esquema', () => {
      expect(() => SectorSchema.parse(sector)).not.toThrow();
    });

    it('tiene 4 preguntas con opciones A–D y un Aha cada una', () => {
      expect(sector.questions).toHaveLength(4);
      for (const q of sector.questions) {
        expect(q.options.map((o) => o.letter)).toEqual(['A', 'B', 'C', 'D']);
        expect(q.aha.length).toBeGreaterThan(20);
      }
    });

    it('tiene un primer reto para cada personaje', () => {
      for (const key of CHARACTER_KEYS) {
        expect(sector.firstChallenge[key].length).toBeGreaterThan(5);
      }
    });

    it('los textos son literales del documento', () => {
      expect(doc).toContain(sector.intro);
      for (const q of sector.questions) {
        expect(doc).toContain(q.text);
        for (const o of q.options) expect(doc).toContain(`${o.letter}. ${o.label}`);
        expect(doc).toContain(q.aha);
      }
      for (const key of CHARACTER_KEYS) {
        expect(doc).toContain(`"${sector.firstChallenge[key]}"`);
      }
    });
  });

  it('los personajes y sus frases son literales', () => {
    for (const c of Object.values(CHARACTERS)) {
      expect(doc).toContain(c.phrase);
      expect(doc).toContain(c.profile);
    }
  });

  it('no sobran Aha sin pregunta', () => {
    const ids = SECTORS.flatMap((s) => s.questions.map((q) => q.id));
    expect(Object.keys(AHA).sort()).toEqual(ids.sort());
  });
});
