'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import BrandLockup from '@/components/BrandLockup';
import CharacterArt from '@/components/CharacterArt';
import { Coin, Ground } from '@/components/Scenery';
import Title from '@/components/Title';
import { CHARACTERS, SECTORS } from '@/content';
import { CHARACTER_KEYS } from '@/content/schema';
import { fill, UI } from '@/content/ui';
import { emptyBoard, leaders, type BoardCounts } from '@/lib/board';

const REFRESH_MS = 10_000;
const HEADLINE_MS = 5_000;

export default function Board({ boardKey }: { boardKey: string }) {
  const [board, setBoard] = useState<BoardCounts>(emptyBoard);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/board?key=${encodeURIComponent(boardKey)}`, { cache: 'no-store' });
        const data = (await res.json()) as { ok: boolean; board?: BoardCounts; updatedAt?: string };
        if (alive && data.ok && data.board) {
          setBoard(data.board);
          setUpdatedAt(data.updatedAt ?? null);
        }
      } catch {
        /* se mantiene el último dato */
      }
    };
    void load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [boardKey]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), HEADLINE_MS);
    return () => clearInterval(id);
  }, []);

  const headlines = useMemo(
    () =>
      SECTORS.flatMap((s) => {
        const top = leaders(board[s.key]);
        if (top.length === 0) return [];
        const names = top.map((k) => CHARACTERS[k].name);
        const first = names[0] ?? '';
        return [
          top.length === 1
            ? fill(UI.tablero.dominates, { SECTOR: s.name, PERSONAJE: first })
            : fill(UI.tablero.tie, { SECTOR: s.name, PERSONAJES: names.join(' y ') }),
        ];
      }),
    [board],
  );
  const headline = headlines.length ? headlines[tick % headlines.length] : UI.tablero.empty;
  const total = SECTORS.reduce((acc, s) => acc + CHARACTER_KEYS.reduce((a, k) => a + board[s.key][k], 0), 0);

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-sky">
      <header className="flex items-center justify-between px-[3vw] pt-[2.5vh]">
        <Title text={UI.tablero.title} as="h1" size="text-[3.2vw]" />
        <div className="flex items-center gap-3 rounded-full bg-black/25 px-5 py-2">
          <Coin size={30} />
          <span className="pixel text-[1.2vw] text-white">
            {total} {UI.tablero.players}
          </span>
        </div>
      </header>

      <div className="h-[8vh] px-[3vw] pt-[1.5vh]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={headline}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="font-display text-[2.4vw] text-mario-yellow sky-text"
          >
            {headline}
          </motion.p>
        </AnimatePresence>
      </div>

      <section className="grid flex-1 grid-cols-5 gap-[1.2vw] px-[3vw] pb-[2vh]">
        {SECTORS.map((s) => {
          const row = board[s.key];
          const top = leaders(row);
          const max = Math.max(1, ...CHARACTER_KEYS.map((k) => row[k]));
          return (
            <div key={s.key} className="panel flex min-h-0 flex-col p-[0.9vw]">
              <div className="text-center">
                <div className="text-[2vw] leading-none">{s.emoji}</div>
                <div className="pixel mt-1 text-[0.7vw] text-neutral-500">
                  {UI.pista.trackLabel} {s.trackNumber}
                </div>
                <div className="font-display text-[1.5vw] leading-tight text-mario-ink">{s.name}</div>
              </div>
              <ul className="mt-[1vh] flex flex-1 flex-col justify-around gap-[0.6vh]">
                {CHARACTER_KEYS.map((k) => {
                  const n = row[k];
                  const lead = top.includes(k);
                  return (
                    <li
                      key={k}
                      className={`flex items-center gap-[0.6vw] rounded-xl px-[0.4vw] py-[0.3vh] ${lead ? 'bg-[#FFF6D1] ring-2 ring-mario-yellow' : ''}`}
                    >
                      <CharacterArt character={k} size={48} className="flex-none" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[0.95vw] font-extrabold text-mario-ink">{CHARACTERS[k].name}</div>
                        <div className="mt-0.5 h-[0.9vh] overflow-hidden rounded-full border border-mario-ink bg-neutral-200">
                          <motion.div
                            className="h-full"
                            style={{ background: CHARACTERS[k].color }}
                            initial={false}
                            animate={{ width: `${(n / max) * 100}%` }}
                            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                          />
                        </div>
                      </div>
                      <div className="pixel w-[2.2vw] text-right text-[1vw] text-mario-ink">{n}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      <footer className="relative">
        <div className="absolute inset-x-0 top-[30%] z-10 flex items-center justify-between px-[3vw]">
          <BrandLockup height={26} />
          <span className="text-sm font-bold text-white/90 sky-text">
            {updatedAt ? `${UI.tablero.updated} ${new Date(updatedAt).toLocaleTimeString('es-EC')}` : ''}
          </span>
        </div>
        <Ground height={80} />
      </footer>
    </main>
  );
}
