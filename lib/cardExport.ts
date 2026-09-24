'use client';

/** Captura la tarjeta con html2canvas (import dinámico), la descarga como PNG y devuelve el archivo para compartirlo. */
export async function exportCard(node: HTMLElement, fileName: string): Promise<File> {
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#0A6CE0',
    imageTimeout: 15000,
  });
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('No se pudo generar la imagen');

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return new File([blob], fileName, { type: 'image/png' });
}

export function canShareFile(file: File): boolean {
  return typeof navigator.share === 'function' && Boolean(navigator.canShare?.({ files: [file] }));
}

/** Abre la hoja nativa de compartir. Devuelve false si el navegador la bloquea (p. ej. sin gesto del usuario). */
export async function shareCard(file: File): Promise<boolean> {
  try {
    await navigator.share({ files: [file], title: 'Super Copilot Bros' });
    return true;
  } catch (err) {
    return err instanceof DOMException && err.name === 'AbortError';
  }
}
