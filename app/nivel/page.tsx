'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AhaCoin from '@/components/AhaCoin';
import Hud from '@/components/Hud';
import ProgressTrack from '@/components/ProgressTrack';
import QuestionBlocks from '@/components/QuestionBlocks';
import Scenery from '@/components/Scenery';
import { getSector } from '@/content';
import type { Letter } from '@/content/schema';
import { UI } from '@/content/ui';
import { sfx } from '@/lib/sound';
import { useGame, useHydrated } from '@/lib/store';

type Phase = 'question' | 'aha';

export default function NivelPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const sectorKey = useGame((s) => s.sector);
  const answers = useGame((s) => s.answers);
  const lead = useGame((s) => s.lead);
  const soundOn = useGame((s) => s.soundOn);
  const setAnswer = useGame((s) => s.setAnswer);
  const finishLevel = useGame((s) => s.finishLevel);
  const sector = getSector(sectorKey);

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [bumped, setBumped] = useState<Letter | null>(null);
  const initialized = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!sector) {
      router.replace('/pista');
      return;
    }
    if (!initialized.current) {
      initialized.current = true;
      setStep(Math.min(answers.length, sector.questions.length - 1));
    }
  }, [hydrated, sector, answers.length, router]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  if (!hydrated || !sector) return <main className="min-h-dvh" />;

  const total = sector.questions.length;
  const question = sector.questions[step];
  if (!question) return <main className="min-h-dvh" />;
  const coins = answers.filter(Boolean).length;
  const isLast = step === total - 1;

  const onSelect = (letter: Letter) => {
    if (bumped) return;
    setAnswer(step, letter);
    setBumped(letter);
    if (soundOn) sfx.coin();
    timer.current = setTimeout(() => {
      setBumped(null);
      setPhase('aha');
      window.scrollTo({ top: 0 });
    }, 650);
  };

  const onNext = () => {
    if (isLast) {
      finishLevel();
      router.push(lead ? '/resultado' : '/registro');
      return;
    }
    setStep(step + 1);
    setPhase('question');
    window.scrollTo({ top: 0 });
  };

  const onBack = () => {
    if (phase === 'aha') {
      setPhase('question');
      return;
    }
    if (step === 0) {
      router.push('/pista');
      return;
    }
    setStep(step - 1);
    setPhase('question');
  };

  return (
    <main className="relative min-h-dvh">
      <Scenery variant="compact" />
      <Hud coins={coins} label={`${sector.emoji} ${UI.pista.trackLabel} ${sector.trackNumber} · ${sector.name}`} />
      <div className="relative z-10 mx-auto max-w-md pb-28">
        <ProgressTrack step={phase === 'aha' ? step + 1 : step} total={total} />
        <div className="px-4">
          <AnimatePresence mode="wait">
            {phase === 'question' ? (
              <motion.section
                key={`q-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
              >
                <p className="pixel mt-3 text-[10px] uppercase text-white/90 sky-text">
                  {UI.nivel.questionLabel} {step + 1}/{total}
                </p>
                <h1 className="mt-2 font-display text-[26px] leading-tight sky-text">{question.text}</h1>
                <div className="mt-5">
                  <QuestionBlocks
                    question={question}
                    selected={answers[step]}
                    bumped={bumped}
                    disabled={bumped !== null}
                    onSelect={onSelect}
                  />
                </div>
                {answers[step] && !bumped ? (
                  <button type="button" className="btn-primary mt-5 w-full" onClick={() => setPhase('aha')}>
                    {UI.nivel.next}
                  </button>
                ) : null}
              </motion.section>
            ) : (
              <motion.section
                key={`a-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-4"
              >
                <AhaCoin text={question.aha} index={step} />
                <button type="button" className="btn-primary mt-6 w-full" onClick={onNext}>
                  {isLast ? UI.nivel.finish : UI.nivel.next} →
                </button>
              </motion.section>
            )}
          </AnimatePresence>
          <button type="button" className="btn-ghost mt-4" onClick={onBack}>
            ← {UI.nivel.back}
          </button>
        </div>
      </div>
    </main>
  );
}
