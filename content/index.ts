import { z } from 'zod';
import { CHARACTERS } from './characters';
import { CharacterSchema, SectorSchema, type Sector, type SectorKey } from './schema';
import { aseguradoras } from './sectors/aseguradoras';
import { brokers } from './sectors/brokers';
import { centrosMedicos } from './sectors/centros-medicos';
import { hospitales } from './sectors/hospitales';
import { laboratorios } from './sectors/laboratorios';

// Validación al cargar el módulo: si el contenido no cumple el esquema, `next build` falla.
export const SECTORS: Sector[] = z
  .array(SectorSchema)
  .length(5)
  .parse([hospitales, aseguradoras, laboratorios, centrosMedicos, brokers]);

z.array(CharacterSchema).length(5).parse(Object.values(CHARACTERS));

export const SECTOR_BY_KEY: Record<SectorKey, Sector> = Object.fromEntries(
  SECTORS.map((s) => [s.key, s]),
) as Record<SectorKey, Sector>;

export function getSector(key: string | null | undefined): Sector | undefined {
  return SECTORS.find((s) => s.key === key);
}

export { CHARACTERS, CHARACTER_BY_LETTER, POWERUP_BY_LETTER } from './characters';
export * from './schema';
