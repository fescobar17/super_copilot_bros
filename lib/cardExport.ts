'use client';

/** Captura la tarjeta con html2canvas (import dinámico) y la comparte o descarga como PNG. */
export async function exportCard(node: HTMLElement, fileName: string): Promise<'shared' | 'downloaded' | 'cancelled'> {
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

  const file = new File([blob], fileName, { type: 'image/png' });
  if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Super Copilot Bros' });
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled';
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return 'downloaded';
}
