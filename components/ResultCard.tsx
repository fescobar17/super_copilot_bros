'use client';

import { forwardRef } from 'react';
import { asset, cld } from '@/content/assets';
import { CHARACTERS, POWERUP_BY_LETTER } from '@/content/characters';
import { EVENT } from '@/content/event';
import { LETTERS, type CharacterKey, type Sector } from '@/content/schema';
import { UI } from '@/content/ui';
import type { LetterCounts } from '@/lib/scoring';

// Tarjeta descargable. Reglas html2canvas: 320 px, solo estilos inline, fondos con gradientes,
// sin backdrop-filter ni url() de fondo, <img crossOrigin="anonymous">.

const INK = '#1A1A1A';
const DISPLAY = 'var(--font-display), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';
const PIXEL = 'var(--font-pixel), monospace';
const BAR_COLORS = { A: '#2EA83C', B: '#E8559B', C: '#7CC242', D: '#1F5FE0' } as const;

function CardCoin() {
  return (
    <div
      style={{
        width: 18,
        height: 22,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#FFF3A0 0%,#F5C518 45%,#D99A00 100%)',
        border: '2px solid #8A5A00',
        display: 'inline-block',
      }}
    />
  );
}

interface Props {
  character: CharacterKey;
  sector: Sector;
  counts: LetterCounts;
  playerName: string;
  company: string;
  standCode: string;
}

const ResultCard = forwardRef<HTMLDivElement, Props>(function ResultCard(
  { character, sector, counts, playerName, company, standCode },
  ref,
) {
  const c = CHARACTERS[character];
  const img = cld(asset(c.image), 'f_png,w_440');
  const kruger = cld(asset('logoKrugerTech'), 'f_png,h_60');
  const microsoft = cld(asset('logoMicrosoft'), 'f_png,h_60');

  return (
    <div
      ref={ref}
      style={{
        width: 320,
        borderRadius: 20,
        overflow: 'hidden',
        border: `3px solid ${INK}`,
        background: 'linear-gradient(180deg,#0A6CE0 0%,#1F7BEA 55%,#0A6CE0 100%)',
        fontFamily: BODY,
        color: '#FFFFFF',
      }}
    >
      {/* Cabecera */}
      <div style={{ padding: '14px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 15, letterSpacing: 0.5, textShadow: `0 2px 0 ${INK}` }}>
          SUPER COPILOT BROS
        </div>
        <div
          style={{
            fontFamily: PIXEL,
            fontSize: 8,
            padding: '5px 7px',
            borderRadius: 6,
            background: '#FFC400',
            color: INK,
            border: `2px solid ${INK}`,
          }}
        >
          {UI.resultado.track.toUpperCase()} {sector.trackNumber}
        </div>
      </div>
      <div style={{ padding: '4px 16px 0', fontSize: 13, fontWeight: 800 }}>
        {sector.emoji} {sector.name}
      </div>

      {/* Personaje */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 0' }}>
        {img ? (
          <img src={img} crossOrigin="anonymous" alt={c.name} width={190} height={190} style={{ width: 190, height: 190, objectFit: 'contain' }} />
        ) : (
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: 16,
              background: 'linear-gradient(180deg,#D4D4D4,#A3A3A3)',
              border: '2px dashed #525252',
              color: '#404040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            {c.name}
          </div>
        )}
      </div>

      {/* Panel blanco */}
      <div
        style={{
          margin: '0 12px',
          padding: '14px 14px 12px',
          borderRadius: 16,
          background: '#FFFFFF',
          color: INK,
          border: `3px solid ${INK}`,
        }}
      >
        <div style={{ display: 'block', height: 34, fontFamily: DISPLAY, fontSize: 30, lineHeight: '34px', color: c.color, textShadow: `0 2px 0 ${INK}` }}>
          ¡{c.name.toUpperCase()}!
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'inline-block',
            height: 20,
            // html2canvas dibuja el texto ~3 px más abajo: line-height menor lo recentra en la captura
            lineHeight: '15px',
            padding: '0 10px',
            borderRadius: 999,
            background: INK,
            color: '#FFC400',
            fontFamily: PIXEL,
            fontSize: 9,
          }}
        >
          {UI.resultado.powerUp.toUpperCase()}: {c.powerUp}
        </div>
        <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800, lineHeight: 1.3 }}>{c.phrase}</div>
        <div
          style={{
            marginTop: 10,
            padding: '8px 10px',
            borderRadius: 10,
            background: '#FFF6D1',
            border: '2px solid #F0C000',
            fontSize: 12,
            lineHeight: 1.35,
          }}
        >
          <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>
            {UI.resultado.firstChallenge}
          </div>
          <div style={{ fontWeight: 700 }}>“{sector.firstChallenge[character]}”</div>
        </div>

        {/* Barras de Power-Up */}
        <div style={{ marginTop: 12 }}>
          {LETTERS.map((l) => (
            <div key={l} style={{ marginTop: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 900, letterSpacing: 0.3 }}>
                <span>{POWERUP_BY_LETTER[l]}</span>
                <span style={{ fontFamily: PIXEL, fontSize: 8 }}>{counts[l]}/4</span>
              </div>
              <div style={{ marginTop: 3, height: 9, borderRadius: 6, background: '#E5E5E5', border: `1.5px solid ${INK}`, overflow: 'hidden' }}>
                <div style={{ width: `${(counts[l] / 4) * 100}%`, height: '100%', background: BAR_COLORS[l] }} />
              </div>
            </div>
          ))}
        </div>

        {/* Monedas */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <CardCoin />
            <CardCoin />
            <CardCoin />
            <CardCoin />
          </div>
          <div style={{ fontFamily: PIXEL, fontSize: 10 }}>4/4</div>
        </div>
      </div>

      {/* Jugador */}
      <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.15, textShadow: `0 1px 0 ${INK}` }}>{playerName}</div>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.95 }}>{company}</div>
        </div>
        <div style={{ fontFamily: PIXEL, fontSize: 8, textAlign: 'right', lineHeight: 1.6 }}>
          {standCode}
          <br />
          {EVENT.shortDate}
        </div>
      </div>

      {/* Suelo + logos */}
      <div style={{ marginTop: 12, height: 8, background: 'linear-gradient(180deg,#8BE05A 0%,#5BC236 100%)', borderTop: `2px solid ${INK}` }} />
      <div
        style={{
          padding: '10px 16px 12px',
          background: 'linear-gradient(180deg,#E7A33C 0%,#E7A33C 30%,#D98B25 30%,#D98B25 42%,#E7A33C 42%,#E7A33C 70%,#D98B25 70%,#D98B25 82%,#E7A33C 82%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          color: '#FFFFFF',
          fontWeight: 900,
          fontSize: 13,
          textShadow: `0 1px 0 ${INK}`,
        }}
      >
        {kruger ? <img src={kruger} crossOrigin="anonymous" alt="Kruger Tech" style={{ height: 18 }} /> : <span>Kruger Tech</span>}
        <span style={{ display: 'inline-block', width: 2, height: 16, background: '#FFFFFF' }} />
        {microsoft ? <img src={microsoft} crossOrigin="anonymous" alt="Microsoft" style={{ height: 18 }} /> : <span>Microsoft</span>}
      </div>
    </div>
  );
});

export default ResultCard;
