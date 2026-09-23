import { Fragment, type ReactNode } from 'react';

/** Renderiza el Markdown mínimo `**negrita**`. */
export function renderBold(text: string, boldClassName?: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className={boldClassName}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * Separa el Aha en "creías que…" (setup) y "en realidad Copilot…" (reveal)
 * para resaltar la segunda parte. Si no hay setup reconocible, todo es reveal.
 */
export function splitAha(text: string): { setup: string | null; reveal: string } {
  if (text.startsWith('Creías que')) {
    const cut = text.indexOf('. ');
    if (cut > 0) return { setup: text.slice(0, cut + 1), reveal: text.slice(cut + 2) };
  }
  if (text.startsWith('Contraintuitivo:')) {
    return { setup: 'Contraintuitivo:', reveal: text.slice('Contraintuitivo:'.length).trim() };
  }
  return { setup: null, reveal: text };
}

export function stripBold(text: string): string {
  return text.replace(/\*\*/g, '');
}
