import { AHA } from '../aha';
import type { Question } from '../schema';

/** Arma una pregunta tomando el Aha de content/aha.ts. */
export function q(id: string, text: string, labels: [string, string, string, string]): Question {
  return {
    id,
    text,
    options: [
      { letter: 'A', label: labels[0] },
      { letter: 'B', label: labels[1] },
      { letter: 'C', label: labels[2] },
      { letter: 'D', label: labels[3] },
    ],
    aha: AHA[id] ?? '',
  };
}
