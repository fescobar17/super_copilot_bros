'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getSector } from '@/content';
import type { Letter, SectorKey } from '@/content/schema';
import type { Lead } from './payload';
import { scoreAnswers, type Result } from './scoring';
import { makeStandCode } from './standCode';

export type Submission = 'idle' | 'sending' | 'ok' | 'error';

interface GameState {
  lead: Lead | null;
  sector: SectorKey | null;
  answers: Letter[];
  result: Result | null;
  standCode: string | null;
  round: number;
  submission: Submission;
  /** Ronda que ya llegó a Sheets, para no duplicar filas al recargar. */
  submittedRound: number;
  soundOn: boolean;

  setSector: (key: SectorKey) => void;
  setAnswer: (index: number, letter: Letter) => void;
  finishLevel: () => void;
  setLead: (lead: Lead) => void;
  setSubmission: (s: Submission) => void;
  markSubmitted: () => void;
  resetRound: () => void;
  resetAll: () => void;
  toggleSound: () => void;
}

function codeFor(
  lead: Lead | null,
  sectorKey: string,
  shortCode: string,
  round: number,
  answers: Letter[],
  result: Result,
): string {
  const seed = `${lead?.name ?? ''}|${lead?.email ?? ''}|${sectorKey}|${round}|${answers.join('')}`;
  return makeStandCode(result.character, shortCode, seed);
}

const initial = {
  lead: null,
  sector: null,
  answers: [],
  result: null,
  standCode: null,
  round: 1,
  submission: 'idle' as Submission,
  submittedRound: 0,
  soundOn: false,
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      ...initial,

      setSector: (key) =>
        set({ sector: key, answers: [], result: null, standCode: null, submission: 'idle' }),

      setAnswer: (index, letter) => {
        const answers = get().answers.slice(0, Math.max(index, get().answers.length));
        answers[index] = letter;
        set({ answers, result: null });
      },

      finishLevel: () => {
        const { answers, sector, lead, round } = get();
        const s = getSector(sector);
        if (!s || answers.length !== s.questions.length) return;
        const result = scoreAnswers(answers);
        set({ result, standCode: codeFor(lead, s.key, s.shortCode, round, answers, result) });
      },

      setLead: (lead) => {
        set({ lead });
        // En la primera ronda el lead llega después del resultado: el código se recalcula con su nombre.
        const { result, sector, round, answers } = get();
        const s = getSector(sector);
        if (result && s) {
          set({ standCode: codeFor(lead, s.key, s.shortCode, round, answers, result) });
        }
      },

      setSubmission: (submission) => set({ submission }),
      markSubmitted: () => set({ submittedRound: get().round, submission: 'ok' }),

      resetRound: () =>
        set({
          sector: null,
          answers: [],
          result: null,
          standCode: null,
          submission: 'idle',
          round: get().round + 1,
        }),

      resetAll: () => set({ ...initial, soundOn: get().soundOn }),
      toggleSound: () => set({ soundOn: !get().soundOn }),
    }),
    {
      name: 'super-copilot-bros',
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    },
  ),
);

/** true cuando el store ya leyó sessionStorage (evita redirecciones con estado vacío). */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (useGame.persist.hasHydrated()) setHydrated(true);
    return useGame.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
