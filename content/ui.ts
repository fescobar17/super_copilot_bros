// Textos de interfaz (botones, etiquetas). El contenido del juego vive en aha.ts, characters.ts y sectors/.
export const UI = {
  home: {
    promise: 'Tu organización ya tiene jugadores expertos. Copilot les da nuevas habilidades.',
    title: '¿Qué piloto eres?',
    subtitle: 'Elige tu pista',
    steps: ['Elige tu sector', 'Responde 4 escenarios', 'Gana KOINS', 'Descubre tu Power-Up'],
    cta: '¡Jugar!',
    duration: '≈ 90 segundos',
  },
  pista: {
    title: 'Elige tu pista',
    trackLabel: 'Pista',
    round: 'Ronda',
  },
  nivel: {
    questionLabel: 'Escenario',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Ver mi piloto',
    coinTitle: '¡KOIN!',
    optionsLabel: 'Elige una respuesta',
  },
  registro: {
    title: '¡Nivel casi superado!',
    subtitle: 'Déjanos tus datos para desbloquear tu piloto.',
    name: 'Nombre',
    email: 'Correo',
    // TODO: validar este texto de consentimiento con Legal de Kruger antes del evento.
    consent:
      'Acepto que Kruger Corporation y Microsoft usen estos datos para contactarme sobre esta experiencia y soluciones relacionadas, conforme a la Ley Orgánica de Protección de Datos Personales.',
    submit: 'Desbloquear mi piloto',
    required: 'Campo obligatorio',
    invalidEmail: 'Revisa el email',
    consentRequired: 'Necesitamos tu autorización para continuar',
  },
  resultado: {
    levelClear: '¡Nivel superado!',
    youAre: '¡Eres',
    powerUp: 'Power-Up',
    inSector: 'En {SECTOR}, esto significa:',
    coins: 'Tus KOINS:',
    standCta: 'Muestra tu tarjeta en el stand y activa tu Power-Up',
    standButton: 'Activa tu Power-Up en el stand →',
    standCodeLabel: 'Tu código para el stand',
    download: 'Guardar tarjeta',
    share: 'Compartir tarjeta',
    generating: 'Generando…',
    answers: 'Tus respuestas y KOINS',
    playAgain: 'Jugar otra pista',
    saving: 'Guardando…',
    saved: 'Tarjeta guardada ✓',
    saveError: 'No pudimos guardar. Reintentar',
    firstChallenge: 'Primer reto',
    track: 'Pista',
  },
  tablero: {
    title: '¿Qué piloto domina cada sector?',
    dominates: 'En {SECTOR} domina {PERSONAJE}',
    tie: 'En {SECTOR} van empatados {PERSONAJES}',
    empty: 'Esperando a los primeros pilotos…',
    players: 'pilotos',
    locked: 'Acceso restringido',
    updated: 'Actualizado',
  },
  sound: { on: 'Sonido activado', off: 'Sonido apagado' },
} as const;

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}
