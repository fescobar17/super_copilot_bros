// URLs de las ilustraciones oficiales del kit del evento (Cloudinary).
// Deja `null` mientras falte el asset: la app muestra un placeholder gris con el nombre.
// Para reemplazar una ilustración, cambia solo la URL aquí.
export const ASSETS: Record<string, string | null> = {
  // Personajes (PNG con fondo transparente)
  luigi: null, // TODO: URL de Cloudinary
  peach: null, // TODO: URL de Cloudinary
  yoshi: null, // TODO: URL de Cloudinary
  toad: null, // TODO: URL de Cloudinary
  mario: null, // TODO: URL de Cloudinary

  // Marca
  logoEvento: null, // TODO: logo "Super Copilot Bros" transparente
  logoKrugerTech: null, // TODO: logo Kruger Tech en blanco, transparente
  logoMicrosoft: null, // TODO: logo Microsoft en blanco, transparente
  logoCopilot: null, // TODO: logo Copilot, transparente
};

export type AssetKey = keyof typeof ASSETS;

/**
 * Inserta transformaciones de Cloudinary después de /upload/.
 * Para la tarjeta descargable se usa f_png para que html2canvas reciba un formato estable.
 */
export function cld(url: string | null | undefined, transform: string): string | null {
  if (!url) return null;
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/${transform}/`);
}

export function asset(key: string): string | null {
  return ASSETS[key] ?? null;
}
