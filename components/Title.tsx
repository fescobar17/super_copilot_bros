const PALETTE = ['#1F5FE0', '#FFC400', '#E3262B', '#2EA83C'];

/** Título con cada letra de un color de la paleta, contorno y extrusión (solo CSS). */
export default function Title({
  text,
  as: Tag = 'h1',
  size = 'text-5xl',
  white = false,
  offset = 0,
  className = '',
}: {
  text: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  size?: string;
  white?: boolean;
  offset?: number;
  className?: string;
}) {
  let i = offset;
  return (
    <Tag className={`mario-title ${size} ${className}`} aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split('').map((ch, c) => {
            const color = white ? '#FFFFFF' : PALETTE[i++ % PALETTE.length];
            return (
              <span key={c} className="l" style={{ color }}>
                {ch}
              </span>
            );
          })}
          {w < text.split(' ').length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
