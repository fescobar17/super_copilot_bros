'use client';

import type { Row } from './payload';

/** Envía la fila a /api/submit. Nunca lanza: devuelve true/false. */
export async function submitRow(row: Row): Promise<boolean> {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}
