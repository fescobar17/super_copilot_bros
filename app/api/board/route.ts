import { NextResponse } from 'next/server';
import { emptyBoard, normalizeBoard } from '@/lib/board';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get('key');
  if (!process.env.BOARD_KEY || key !== process.env.BOARD_KEY) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return NextResponse.json({ ok: true, board: emptyBoard(), updatedAt: new Date().toISOString() });

  try {
    // Caché de 10 s en el data cache de Next para no saturar Apps Script con varios proyectores.
    const res = await fetch(`${url}?action=board`, { next: { revalidate: 10 }, redirect: 'follow' });
    const raw: unknown = await res.json();
    return NextResponse.json({ ok: true, board: normalizeBoard(raw), updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[board]', err);
    return NextResponse.json({ ok: false, board: emptyBoard() }, { status: 502 });
  }
}
