'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import CharacterArt from '@/components/CharacterArt';
import Hud from '@/components/Hud';
import LevelClear from '@/components/LevelClear';
import ResultCard from '@/components/ResultCard';
import Scenery, { Coin } from '@/components/Scenery';
import Title from '@/components/Title';
import { CHARACTERS, getSector } from '@/content';
import { fill, UI } from '@/content/ui';
import { exportCard } from '@/lib/cardExport';
import { buildRow } from '@/lib/payload';
import { renderBold } from '@/lib/richText';
import { sfx } from '@/lib/sound';
import { useGame, useHydrated } from '@/lib/store';
import { submitRow } from '@/lib/submit';

export default function ResultadoPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const reduce = Boolean(useReducedMotion());
  const g = useGame();
  const sector = getSector(g.sector);

  const [showClear, setShowClear] = useState(true);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const standRef = useRef<HTMLDivElement>(null);
  const sending = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!sector) return router.replace('/pista');
    if (g.answers.length < sector.questions.length) return router.replace('/nivel');
    if (!g.lead) return router.replace('/registro');
    if (!g.result) g.finishLevel();
  }, [hydrated, sector, g, router]);

  const send = useCallback(async () => {
    const { lead, result, standCode, answers, round, submittedRound } = useGame.getState();
    if (!lead || !result || !standCode || !sector || sending.current || submittedRound >= round) return;
    sending.current = true;
    g.setSubmission('sending');
    const ok = await submitRow(buildRow({ lead, sector, answers, result, round, standCode }));
    if (ok) g.markSubmitted();
    else g.setSubmission('error');
    sending.current = false;
  }, [g, sector]);

  // Envío automático una sola vez por ronda; tras un error, solo el botón "Reintentar" vuelve a enviar.
  useEffect(() => {
    if (hydrated && g.submission === 'idle' && g.lead && g.result && g.standCode) void send();
  }, [hydrated, g.submission, g.lead, g.result, g.standCode, send]);

  const onClearDone = useCallback(() => {
    setShowClear(false);
    if (useGame.getState().soundOn) sfx.clear();
  }, []);

  if (!hydrated || !sector || !g.lead || !g.result || !g.standCode) return <main className="min-h-dvh bg-sky" />;

  const c = CHARACTERS[g.result.character];
  const challenge = sector.firstChallenge[g.result.character];

  const onExport = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      await exportCard(cardRef.current, `super-copilot-bros-${c.key}.png`);
    } finally {
      setExporting(false);
    }
  };

  const onStand = () => {
    standRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    standRef.current?.focus();
  };

  const onPlayAgain = () => {
    g.resetRound();
    router.push('/pista');
  };

  return (
    <main className="relative min-h-dvh">
      <AnimatePresence>{showClear ? <LevelClear onDone={onClearDone} reduce={reduce} /> : null}</AnimatePresence>
      <Scenery variant="compact" />
      <Hud coins={4} label={`${sector.emoji} ${UI.resultado.track} ${sector.trackNumber} · ${sector.name}`} />

      <div className="relative z-10 mx-auto max-w-md px-4 pb-28 pt-2" aria-live="polite">
        {/* Revelación */}
        <section className="flex flex-col items-center text-center">
          <motion.div
            initial={reduce ? false : { y: 80, scale: 0.7, opacity: 0 }}
            animate={showClear ? {} : { y: [80, -30, 0], scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <CharacterArt character={c.key} size={220} priority />
          </motion.div>
          <Title text={`${UI.resultado.youAre} ${c.name}!`} size="text-5xl" className="mt-2" />
          <div className="pixel mt-4 rounded-full border-2 border-mario-ink bg-mario-ink px-4 py-2 text-[11px] text-mario-yellow">
            {UI.resultado.powerUp}: {c.powerUp}
          </div>
          <p className="mt-4 text-xl font-extrabold leading-snug sky-text">{c.phrase}</p>
        </section>

        <section className="panel mt-5 p-4">
          <p className="text-sm font-extrabold uppercase tracking-wide text-neutral-500">
            {fill(UI.resultado.inSector, { SECTOR: sector.name })}
          </p>
          <p className="mt-1 text-lg font-extrabold leading-snug text-mario-ink">“{challenge}”</p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-neutral-100 px-3 py-2">
            <span className="text-sm font-bold text-mario-ink">{UI.resultado.coins}</span>
            <span className="flex items-center gap-2">
              <span className="pixel text-xs text-mario-ink">4/4</span>
              <Coin size={20} />
            </span>
          </div>
        </section>

        <button type="button" onClick={onStand} className="btn-primary mt-5 w-full">
          {UI.resultado.standButton}
        </button>

        {/* Código para el stand */}
        <div
          ref={standRef}
          tabIndex={-1}
          className="mt-5 rounded-2xl border-[3px] border-mario-ink bg-mario-ink p-4 text-center outline-none focus:ring-4 focus:ring-mario-yellow"
        >
          <p className="text-sm font-bold text-white/80">{UI.resultado.standCta}</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-mario-yellow">
            {UI.resultado.standCodeLabel}
          </p>
          <p className="pixel mt-2 break-all text-[20px] leading-relaxed text-white">{g.standCode}</p>
          <p className="mt-2 text-sm font-bold text-white">
            {g.lead.name} · {g.lead.company}
          </p>
        </div>

        {/* Tarjeta descargable */}
        <div className="mt-6 flex flex-col items-center">
          <ResultCard
            ref={cardRef}
            character={c.key}
            sector={sector}
            counts={g.result.counts}
            playerName={g.lead.name}
            company={g.lead.company}
            standCode={g.standCode}
          />
          <button type="button" onClick={onExport} disabled={exporting} className="btn-primary mt-4 w-full max-w-[320px]">
            {exporting ? UI.resultado.generating : UI.resultado.download}
          </button>
          <SubmissionBadge status={g.submission} onRetry={() => void send()} />
        </div>

        {/* Respuestas */}
        <details className="panel mt-6 p-4">
          <summary className="min-h-[44px] cursor-pointer font-display text-lg text-mario-ink">
            {UI.resultado.answers}
          </summary>
          <ol className="mt-3 flex flex-col gap-4">
            {sector.questions.map((q, i) => {
              const opt = q.options.find((o) => o.letter === g.answers[i]);
              return (
                <li key={q.id} className="text-sm text-mario-ink">
                  <p className="font-extrabold">
                    {i + 1}. {q.text}
                  </p>
                  {opt ? (
                    <p className="mt-1 font-semibold text-neutral-700">
                      <span className="mr-1 rounded bg-mario-yellow px-1.5 font-extrabold text-mario-ink">{opt.letter}</span>
                      {opt.label}
                    </p>
                  ) : null}
                  <p className="mt-2 rounded-lg bg-[#FFF6D1] p-2 leading-snug">🪙 {renderBold(q.aha)}</p>
                </li>
              );
            })}
          </ol>
        </details>

        <button type="button" onClick={onPlayAgain} className="btn-ghost mt-6 w-full">
          ↻ {UI.resultado.playAgain}
        </button>
      </div>
    </main>
  );
}

function SubmissionBadge({ status, onRetry }: { status: string; onRetry: () => void }) {
  if (status === 'sending') return <p className="mt-2 text-sm font-semibold text-white/85">{UI.resultado.saving}</p>;
  if (status === 'ok') return <p className="mt-2 text-sm font-bold text-white sky-text">{UI.resultado.saved}</p>;
  if (status === 'error')
    return (
      <button type="button" onClick={onRetry} className="mt-2 min-h-[44px] text-sm font-bold text-white underline">
        {UI.resultado.saveError}
      </button>
    );
  return null;
}
