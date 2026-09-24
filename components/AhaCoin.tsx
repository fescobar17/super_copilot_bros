'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { UI } from '@/content/ui';
import { renderBold, splitAha } from '@/lib/richText';
import { Coin } from './Scenery';
import Title from './Title';

/** Pantalla de KOIN: la moneda sube y gira, luego aparece el dato con la parte "en realidad Copilot…" resaltada. */
export default function AhaCoin({ text, index }: { text: string; index: number }) {
  const reduce = useReducedMotion();
  const { setup, reveal } = splitAha(text);
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={reduce ? false : { y: 60, opacity: 0, rotateY: 0 }}
        animate={reduce ? {} : { y: [60, -16, 0], opacity: 1, rotateY: [0, 720] }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ perspective: 400 }}
      >
        <Coin size={72} />
      </motion.div>
      <Title text={UI.nivel.coinTitle} as="h2" size="text-4xl" className="mt-3" offset={index} />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.45 }}
        className="panel mt-5 w-full overflow-hidden text-left"
        aria-live="polite"
      >
        {setup ? (
          <p className="border-b-2 border-dashed border-neutral-300 px-4 py-3 text-[15px] font-semibold text-neutral-500">
            {renderBold(setup)}
          </p>
        ) : null}
        <p className="bg-[#FFF6D1] px-4 py-4 text-[17px] font-bold leading-snug text-mario-ink">
          <span aria-hidden className="mr-1">
            →
          </span>
          {renderBold(reveal, 'rounded bg-mario-yellow px-1 font-extrabold')}
        </p>
      </motion.div>
    </div>
  );
}
