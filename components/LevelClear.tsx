'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { UI } from '@/content/ui';
import { Ground } from './Scenery';
import Title from './Title';

/** Transición "nivel superado": la bandera baja por el mástil. */
export default function LevelClear({ onDone, reduce }: { onDone: () => void; reduce: boolean }) {
  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 300 : 2100);
    return () => clearTimeout(t);
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-sky"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="assertive"
    >
      <div className="absolute inset-x-0 top-[18%] px-4 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1.1, type: 'spring', stiffness: 220, damping: 12 }}
        >
          <Title text={UI.resultado.levelClear} size="text-5xl" />
        </motion.div>
      </div>
      <div className="relative mb-0 h-[58vh] w-full">
        {/* Mástil */}
        <div className="absolute bottom-0 left-1/2 w-2 -translate-x-1/2 rounded-t-full border-2 border-mario-ink bg-white" style={{ height: '100%' }} />
        <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mario-ink bg-mario-green" />
        {/* Bandera */}
        <motion.div
          className="absolute left-1/2"
          initial={{ top: '4%' }}
          animate={{ top: '78%' }}
          transition={{ duration: reduce ? 0 : 1, ease: 'easeIn', delay: reduce ? 0 : 0.2 }}
        >
          <svg width="64" height="44" viewBox="0 0 64 44" style={{ marginLeft: -60 }} aria-hidden>
            <path d="M60 2H4l14 20L4 42h56z" fill="#E3262B" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="36" cy="22" r="9" fill="#fff" stroke="#1A1A1A" strokeWidth="2" />
          </svg>
        </motion.div>
        {/* Bloque base */}
        <div className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 rounded border-[3px] border-mario-ink bg-[#B8752E]" />
      </div>
      <Ground height={70} />
    </motion.div>
  );
}
