import { z } from 'zod';
import { CHARACTERS } from '@/content/characters';
import type { Letter, Sector } from '@/content/schema';
import type { Result } from './scoring';

export const LeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  email: z.union([z.literal(''), z.string().trim().email().max(160)]),
  phone: z.string().trim().max(30),
  consent: z.literal(true),
});
export type Lead = z.infer<typeof LeadSchema>;

const answerCell = z.string().max(400);

/** Fila de Google Sheets (el orden de las claves es el orden de las columnas). */
export const RowSchema = z.object({
  Ronda: z.number().int().min(1).max(10),
  Nombre: z.string().min(1).max(120),
  Empresa: z.string().min(1).max(120),
  Cargo: z.string().min(1).max(120),
  Email: z.string().max(160),
  Celular: z.string().max(30),
  Sector: z.string().min(1).max(60),
  Personaje: z.string().min(1).max(20),
  PowerUp: z.string().min(1).max(20),
  Conteo_A: z.number().int().min(0).max(4),
  Conteo_B: z.number().int().min(0).max(4),
  Conteo_C: z.number().int().min(0).max(4),
  Conteo_D: z.number().int().min(0).max(4),
  P1_Pregunta: answerCell,
  P1_Respuesta: answerCell,
  P2_Pregunta: answerCell,
  P2_Respuesta: answerCell,
  P3_Pregunta: answerCell,
  P3_Respuesta: answerCell,
  P4_Pregunta: answerCell,
  P4_Respuesta: answerCell,
  Codigo_Stand: z.string().min(1).max(40),
  Consentimiento: z.literal('Sí'),
});
export type Row = z.infer<typeof RowSchema>;

/** Columnas en orden, con Timestamp primero (lo agrega el servidor). */
export const SHEET_COLUMNS = ['Timestamp', ...Object.keys(RowSchema.shape)] as const;

export function buildRow(args: {
  lead: Lead;
  sector: Sector;
  answers: readonly Letter[];
  result: Result;
  round: number;
  standCode: string;
}): Row {
  const { lead, sector, answers, result, round, standCode } = args;
  const qa = (i: number) => {
    const question = sector.questions[i];
    const letter = answers[i];
    const option = question?.options.find((o) => o.letter === letter);
    return {
      q: question?.text ?? '',
      a: option ? `${option.letter}. ${option.label}` : '',
    };
  };
  const [p1, p2, p3, p4] = [qa(0), qa(1), qa(2), qa(3)];
  return {
    Ronda: round,
    Nombre: lead.name.trim(),
    Empresa: lead.company.trim(),
    Cargo: lead.role.trim(),
    Email: lead.email.trim(),
    Celular: lead.phone.trim(),
    Sector: sector.name,
    Personaje: CHARACTERS[result.character].name,
    PowerUp: result.powerUp,
    Conteo_A: result.counts.A,
    Conteo_B: result.counts.B,
    Conteo_C: result.counts.C,
    Conteo_D: result.counts.D,
    P1_Pregunta: p1.q,
    P1_Respuesta: p1.a,
    P2_Pregunta: p2.q,
    P2_Respuesta: p2.a,
    P3_Pregunta: p3.q,
    P3_Respuesta: p3.a,
    P4_Pregunta: p4.q,
    P4_Respuesta: p4.a,
    Codigo_Stand: standCode,
    Consentimiento: 'Sí',
  };
}
