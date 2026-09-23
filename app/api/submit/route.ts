import { NextResponse } from 'next/server';
import { RowSchema } from '@/lib/payload';

export const runtime = 'nodejs';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function forward(url: string, body: string): Promise<boolean> {
  const res = await fetch(url, {
    method: 'POST',
    // text/plain evita el preflight y Apps Script lo lee igual en e.postData.contents
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body,
    redirect: 'follow',
    cache: 'no-store',
  });
  if (!res.ok) return false;
  const text = await res.text();
  return !text.includes('"ok":false');
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }
  const parsed = RowSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Payload inválido' }, { status: 422 });
  }

  const url = process.env.APPS_SCRIPT_URL;
  if (!url) {
    console.warn('[submit] APPS_SCRIPT_URL no configurada; fila descartada', parsed.data.Codigo_Stand);
    return NextResponse.json({ ok: false, error: 'Sin destino configurado' }, { status: 503 });
  }

  const timestamp = new Date().toLocaleString('sv-SE', { timeZone: 'America/Guayaquil' });
  const body = JSON.stringify({ Timestamp: timestamp, ...parsed.data });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      if (await forward(url, body)) return NextResponse.json({ ok: true });
    } catch (err) {
      console.error('[submit] intento', attempt + 1, err);
    }
    if (attempt === 0) await sleep(1200);
  }
  return NextResponse.json({ ok: false, error: 'No se pudo guardar' }, { status: 502 });
}
