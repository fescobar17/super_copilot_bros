import type { Character, CharacterKey, Letter, PowerUp } from './schema';

// Transcripción literal de docs/dinamica.md §2.
export const CHARACTERS: Record<CharacterKey, Character> = {
  luigi: {
    key: 'luigi',
    name: 'Luigi',
    powerUp: 'ENCUENTRA',
    letter: 'A',
    profile: 'Investigador: odia perder tiempo buscando lo que ya existe.',
    phrase: 'Tu superpoder: que la información te encuentre a ti.',
    image: 'luigi',
    color: '#2EA83C',
  },
  peach: {
    key: 'peach',
    name: 'Peach',
    powerUp: 'CREA',
    letter: 'B',
    profile: 'Comunicadora: vive entre informes, correos y documentos.',
    phrase: 'Tu superpoder: pasar de la hoja en blanco al borrador listo en segundos.',
    image: 'peach',
    color: '#E8559B',
  },
  yoshi: {
    key: 'yoshi',
    name: 'Yoshi',
    powerUp: 'ANALIZA',
    letter: 'C',
    profile: 'Estratega: quiere entender qué dicen los datos antes que nadie.',
    phrase: 'Tu superpoder: ver el patrón antes de que llegue el Excel.',
    image: 'yoshi',
    color: '#7CC242',
  },
  toad: {
    key: 'toad',
    name: 'Toad',
    powerUp: 'AUTOMATIZA',
    letter: 'D',
    profile: 'Operativo veloz: si algo se repite, quiere que se haga solo.',
    phrase: 'Tu superpoder: que lo repetitivo corra en piloto automático.',
    image: 'toad',
    color: '#1F5FE0',
  },
  mario: {
    key: 'mario',
    name: 'Mario',
    powerUp: 'ACELERA',
    letter: 'TIE',
    profile: 'Todoterreno: combina todo, ve el impacto completo.',
    phrase: 'Tu superpoder: acelerar a todo el equipo, no solo a ti.',
    image: 'mario',
    color: '#E3262B',
  },
};

export const CHARACTER_BY_LETTER: Record<Letter, CharacterKey> = {
  A: 'luigi',
  B: 'peach',
  C: 'yoshi',
  D: 'toad',
};

export const POWERUP_BY_LETTER: Record<Letter, PowerUp> = {
  A: 'ENCUENTRA',
  B: 'CREA',
  C: 'ANALIZA',
  D: 'AUTOMATIZA',
};
