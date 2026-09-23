'use client';

// Sonidos cortos generados con Web Audio (sin archivos). Apagados por defecto.
let ctx: AudioContext | null = null;

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'square') {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.06, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration);
}

function ensure(): boolean {
  if (typeof window === 'undefined') return false;
  if (!ctx) {
    const Ctor = window.AudioContext;
    if (!Ctor) return false;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return true;
}

export const sfx = {
  coin() {
    if (!ensure()) return;
    tone(988, 0, 0.08);
    tone(1319, 0.08, 0.3);
  },
  bump() {
    if (!ensure()) return;
    tone(196, 0, 0.08, 'triangle');
  },
  clear() {
    if (!ensure()) return;
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.14));
  },
};
