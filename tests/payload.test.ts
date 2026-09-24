import { describe, expect, it } from 'vitest';
import { SECTOR_BY_KEY } from '@/content';
import type { Letter } from '@/content/schema';
import { buildRow, LeadSchema, RowSchema, SHEET_COLUMNS } from '@/lib/payload';
import { scoreAnswers } from '@/lib/scoring';
import { makeStandCode } from '@/lib/standCode';

const lead = LeadSchema.parse({
  name: 'Ana Pérez',
  email: 'ana@segurosandinos.com',
  consent: true,
});

describe('buildRow', () => {
  const sector = SECTOR_BY_KEY.aseguradoras;
  const answers: Letter[] = ['D', 'D', 'A', 'D'];
  const result = scoreAnswers(answers);
  const row = buildRow({ lead, sector, answers, result, round: 1, standCode: 'TOAD-ASEG-07' });

  it('valida contra el esquema del servidor', () => {
    expect(() => RowSchema.parse(row)).not.toThrow();
  });

  it('incluye personaje, conteos y el "enemigo" de la P4', () => {
    expect(row.Personaje).toBe('Toad');
    expect(row.PowerUp).toBe('AUTOMATIZA');
    expect([row.Conteo_A, row.Conteo_B, row.Conteo_C, row.Conteo_D]).toEqual([1, 0, 0, 3]);
    expect(row.P4_Pregunta).toBe('¿Cuál es el enemigo que más te frena hoy?');
    expect(row.P4_Respuesta).toBe('D. Tareas que siguen el mismo patrón todos los días.');
  });

  it('las columnas empiezan con Timestamp y terminan con el código', () => {
    expect(SHEET_COLUMNS[0]).toBe('Timestamp');
    expect(SHEET_COLUMNS).toContain('Codigo_Stand');
    expect(SHEET_COLUMNS).toHaveLength(Object.keys(row).length + 1);
  });

  it('rechaza un email inválido', () => {
    expect(LeadSchema.safeParse({ ...lead, email: 'no-es-email' }).success).toBe(false);
  });
});

describe('makeStandCode', () => {
  it('tiene el formato PERSONAJE-SECTOR-NN y es determinista', () => {
    const a = makeStandCode('toad', 'ASEG', 'semilla');
    expect(a).toMatch(/^TOAD-ASEG-\d{2}$/);
    expect(makeStandCode('toad', 'ASEG', 'semilla')).toBe(a);
  });
});
