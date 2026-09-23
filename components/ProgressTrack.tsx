'use client';

import { motion } from 'framer-motion';

function Mushroom() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
      <path d="M3 17C3 8 9 3 16 3s13 5 13 14z" fill="#E3262B" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="10" cy="11" r="3.2" fill="#fff" />
      <circle cx="22" cy="11" r="3.2" fill="#fff" />
      <circle cx="16" cy="6.5" r="2.2" fill="#fff" />
      <path d="M9 17h14v7a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z" fill="#FFF3DA" stroke="#1A1A1A" strokeWidth="2" />
      <rect x="12.5" y="20" width="2" height="4" rx="1" fill="#1A1A1A" />
      <rect x="17.5" y="20" width="2" height="4" rx="1" fill="#1A1A1A" />
    </svg>
  );
}

function Flag() {
  return (
    <svg width="26" height="34" viewBox="0 0 26 34" aria-hidden>
      <rect x="3" y="2" width="3" height="32" fill="#fff" stroke="#1A1A1A" strokeWidth="1" />
      <circle cx="4.5" cy="3" r="3" fill="#2EA83C" stroke="#1A1A1A" strokeWidth="1" />
      <path d="M6 5h17l-5 5 5 5H6z" fill="#E3262B" stroke="#1A1A1A" strokeWidth="1.5" />
    </svg>
  );
}

/** Pista horizontal: el champiñón avanza hacia la bandera de meta. */
export default function ProgressTrack({ step, total }: { step: number; total: number }) {
  const pct = Math.min(1, step / total);
  return (
    <div
      className="relative mx-auto h-12 w-full max-w-md px-4"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={step}
      aria-label={`Progreso ${step} de ${total}`}
    >
      <div className="absolute inset-x-4 bottom-2 h-3 rounded-full border-2 border-mario-ink bg-[#8A4B16]">
        {Array.from({ length: total - 1 }, (_, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-mario-yellow"
            style={{ left: `${((i + 1) / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="absolute bottom-3 right-3">
        <Flag />
      </div>
      <div className="absolute inset-x-4 bottom-4 mr-8">
        <motion.div
          className="absolute bottom-0"
          initial={false}
          animate={{ left: `calc(${pct * 100}% - 15px)`, y: [0, -10, 0] }}
          transition={{ left: { type: 'spring', stiffness: 120, damping: 16 }, y: { duration: 0.4 } }}
          style={{ left: 0 }}
        >
          <Mushroom />
        </motion.div>
      </div>
    </div>
  );
}
