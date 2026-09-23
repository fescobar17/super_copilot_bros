'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, type KeyboardEvent } from 'react';
import type { Letter, Question } from '@/content/schema';
import { UI } from '@/content/ui';
import { Coin } from './Scenery';

/** Opciones A–D como bloques "?": rebotan al tocarlos y sueltan una moneda. */
export default function QuestionBlocks({
  question,
  selected,
  bumped,
  disabled,
  onSelect,
}: {
  question: Question;
  selected: Letter | undefined;
  bumped: Letter | null;
  disabled: boolean;
  onSelect: (l: Letter) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = Math.max(
    0,
    question.options.findIndex((o) => o.letter === selected),
  );

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = question.options.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (next >= 0) {
      e.preventDefault();
      refs.current[next]?.focus();
    }
  };

  return (
    <div role="radiogroup" aria-label={UI.nivel.optionsLabel} className="flex flex-col gap-3">
      {question.options.map((o, i) => {
        const isSel = selected === o.letter;
        const isBump = bumped === o.letter;
        return (
          <button
            key={o.letter}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSel}
            tabIndex={i === focusIndex ? 0 : -1}
            disabled={disabled}
            onClick={() => onSelect(o.letter)}
            onKeyDown={(e) => onKey(e, i)}
            className={`panel relative flex min-h-[68px] w-full items-center gap-3 p-2.5 pr-3 text-left transition-colors ${
              isSel ? 'bg-[#FFF6D1] ring-4 ring-mario-yellow' : ''
            }`}
          >
            <span className="relative">
              <AnimatePresence>
                {isBump ? (
                  <motion.span
                    key="coin"
                    className="absolute left-1/2 top-0 -translate-x-1/2"
                    initial={{ y: 0, opacity: 1, rotateY: 0 }}
                    animate={{ y: -64, opacity: [1, 1, 0], rotateY: 540 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Coin size={26} />
                  </motion.span>
                ) : null}
              </AnimatePresence>
              <motion.span
                className={`qblock ${isSel ? 'used' : ''}`}
                animate={isBump ? { y: [0, -14, 0] } : { y: 0 }}
                transition={{ duration: 0.28 }}
                aria-hidden
              >
                {isSel ? o.letter : '?'}
              </motion.span>
            </span>
            <span className="text-[15px] font-bold leading-snug text-mario-ink">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
