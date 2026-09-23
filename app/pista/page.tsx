'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Hud from '@/components/Hud';
import Scenery from '@/components/Scenery';
import Title from '@/components/Title';
import { SECTORS } from '@/content';
import type { SectorKey } from '@/content/schema';
import { UI } from '@/content/ui';
import { sfx } from '@/lib/sound';
import { useGame } from '@/lib/store';

export default function PistaPage() {
  const router = useRouter();
  const setSector = useGame((s) => s.setSector);
  const soundOn = useGame((s) => s.soundOn);
  const round = useGame((s) => s.round);

  const choose = (key: SectorKey) => {
    if (soundOn) sfx.bump();
    setSector(key);
    router.push('/nivel');
  };

  return (
    <main className="relative min-h-dvh">
      <Scenery variant="compact" />
      <Hud label={round > 1 ? `${UI.pista.round} ${round}` : undefined} />
      <div className="relative z-10 mx-auto max-w-md px-4 pb-28 pt-4">
        <Title text={UI.pista.title} size="text-4xl" className="text-center" />
        <ul className="mt-6 flex flex-col gap-3">
          {SECTORS.map((s, i) => (
            <motion.li
              key={s.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                type="button"
                onClick={() => choose(s.key)}
                className="panel flex w-full items-center gap-3 p-3 text-left transition-transform active:translate-y-1"
              >
                <span className="flex h-16 w-16 flex-none flex-col items-center justify-center rounded-xl border-[3px] border-mario-ink bg-sky text-white">
                  <span className="text-2xl leading-none" aria-hidden>
                    {s.emoji}
                  </span>
                  <span className="pixel mt-1 text-[8px]">
                    {UI.pista.trackLabel} {s.trackNumber}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl leading-tight text-mario-ink">
                    {s.name}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold leading-snug text-neutral-600">
                    {s.intro}
                  </span>
                </span>
                <span aria-hidden className="ml-auto text-2xl text-mario-ink">
                  ›
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </main>
  );
}
