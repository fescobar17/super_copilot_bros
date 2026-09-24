'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { UI } from '@/content/ui';
import { useGame } from '@/lib/store';
import { Coin } from './Scenery';

/** HUD superior: pista actual, contador de monedas y botón de sonido. */
export default function Hud({ coins, label }: { coins?: number; label?: string }) {
  const soundOn = useGame((s) => s.soundOn);
  const toggleSound = useGame((s) => s.toggleSound);
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 pt-4">
      <div className="min-w-0 truncate text-sm font-extrabold uppercase tracking-wide sky-text">
        {label}
      </div>
      <div className="flex items-center gap-2">
        {typeof coins === 'number' ? (
          <div
            className="flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5"
            aria-label={`KOINS: ${coins}`}
          >
            <Coin size={20} />
            <span className="pixel text-xs text-white" aria-hidden>
              x
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={coins}
                initial={{ y: -14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 14, opacity: 0 }}
                className="pixel text-xs text-white"
                aria-hidden
              >
                {coins}
              </motion.span>
            </AnimatePresence>
          </div>
        ) : null}
        <button
          type="button"
          onClick={toggleSound}
          className="grid h-11 w-11 place-items-center rounded-full bg-black/25 text-lg"
          aria-pressed={soundOn}
          aria-label={soundOn ? UI.sound.on : UI.sound.off}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff" />
            {soundOn ? (
              <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
            ) : (
              <path d="M17 9l5 6M22 9l-5 6" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
