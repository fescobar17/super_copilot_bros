'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BrandLockup from '@/components/BrandLockup';
import Hud from '@/components/Hud';
import Scenery, { Coin } from '@/components/Scenery';
import Title from '@/components/Title';
import { asset, cld } from '@/content/assets';
import { EVENT } from '@/content/event';
import { UI } from '@/content/ui';

export default function Home() {
  const logo = cld(asset('logoEvento'), 'f_auto,q_auto,w_720');
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <Scenery variant="full" />
      <Hud />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-64px)] max-w-md flex-col items-center px-4 pb-[190px] pt-6 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="w-full"
        >
          {logo ? (
            <img src={logo} alt={EVENT.name} className="mx-auto w-[88%] max-w-[360px]" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Title text="Super" as="p" size="text-4xl" white />
              <Title text="Copilot" as="p" size="text-6xl" />
              <Title text="Bros" as="p" size="text-6xl" offset={2} />
            </div>
          )}
        </motion.div>

        <p className="mt-5 text-lg font-semibold leading-snug sky-text">{EVENT.tagline}</p>

        <div className="panel mt-6 w-full p-5 text-left">
          <h1 className="font-display text-3xl text-mario-ink">{UI.home.title}</h1>
          <p className="mt-1 text-[15px] font-semibold text-neutral-700">{UI.home.promise}</p>
          <ol className="mt-4 grid grid-cols-2 gap-2">
            {UI.home.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2 rounded-xl bg-neutral-100 px-2.5 py-2 text-sm font-bold">
                <span className="pixel grid h-6 w-6 flex-none place-items-center rounded-md bg-mario-yellow text-[10px] text-mario-ink ring-2 ring-mario-ink">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <Link href="/pista" className="btn-primary mt-6 w-full text-2xl">
          <Coin size={22} /> {UI.home.cta}
        </Link>
        <p className="mt-2 text-sm font-semibold sky-text">
          {UI.home.subtitle} · {UI.home.duration}
        </p>

        <div className="mt-6">
          <BrandLockup />
        </div>
      </div>
    </main>
  );
}
