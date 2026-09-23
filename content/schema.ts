import { z } from 'zod';

export const LETTERS = ['A', 'B', 'C', 'D'] as const;
export const CHARACTER_KEYS = ['luigi', 'peach', 'yoshi', 'toad', 'mario'] as const;
export const SECTOR_KEYS = [
  'hospitales',
  'aseguradoras',
  'laboratorios',
  'centros-medicos',
  'brokers',
] as const;

export const LetterSchema = z.enum(LETTERS);
export const PowerUpSchema = z.enum(['ENCUENTRA', 'CREA', 'ANALIZA', 'AUTOMATIZA', 'ACELERA']);
export const CharacterKeySchema = z.enum(CHARACTER_KEYS);
export const SectorKeySchema = z.enum(SECTOR_KEYS);

export type Letter = z.infer<typeof LetterSchema>;
export type PowerUp = z.infer<typeof PowerUpSchema>;
export type CharacterKey = z.infer<typeof CharacterKeySchema>;
export type SectorKey = z.infer<typeof SectorKeySchema>;

export const CharacterSchema = z.object({
  key: CharacterKeySchema,
  name: z.string().min(1),
  powerUp: PowerUpSchema,
  letter: z.union([LetterSchema, z.literal('TIE')]),
  profile: z.string().min(1),
  phrase: z.string().min(1),
  /** Clave en content/assets.ts */
  image: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});
export type Character = z.infer<typeof CharacterSchema>;

export const QuestionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  options: z
    .array(z.object({ letter: LetterSchema, label: z.string().min(1) }))
    .length(4)
    .refine((opts) => opts.map((o) => o.letter).join('') === 'ABCD', {
      message: 'Las opciones deben ser A, B, C, D en orden',
    }),
  aha: z.string().min(1),
});
export type Question = z.infer<typeof QuestionSchema>;

export const SectorSchema = z.object({
  key: SectorKeySchema,
  name: z.string().min(1),
  shortCode: z.string().regex(/^[A-Z]{3,4}$/),
  trackNumber: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  emoji: z.string().min(1),
  intro: z.string().min(1),
  questions: z.array(QuestionSchema).length(4),
  firstChallenge: z.object({
    luigi: z.string().min(1),
    peach: z.string().min(1),
    yoshi: z.string().min(1),
    toad: z.string().min(1),
    mario: z.string().min(1),
  }),
});
export type Sector = z.infer<typeof SectorSchema>;
