import type { Sector } from '../schema';
import { q } from './_helpers';

export const centrosMedicos: Sector = {
  key: 'centros-medicos',
  name: 'Centros médicos',
  shortCode: 'CMED',
  trackNumber: 4,
  emoji: '🩺',
  intro: 'Agenda llena, recepción saturada y un equipo que hace de todo. Veamos tu piloto.',
  questions: [
    q('centros-medicos-p1', 'Lunes 8 a.m.: teléfono, WhatsApp y correos al mismo tiempo. ¿Qué te salvaría?', [
      'Encontrar al momento la disponibilidad y datos de cada paciente.',
      'Respuestas listas para las preguntas de siempre.',
      'Saber qué días y horarios tienen más ausentismo.',
      'Que las confirmaciones y recordatorios salgan solos.',
    ]),
    q('centros-medicos-p2', 'Un médico nuevo entra la próxima semana. ¿Qué necesitas?', [
      'Que encuentre solo los protocolos y procesos del centro.',
      'Un manual de bienvenida redactado en minutos.',
      'Entender qué especialidades necesitan más refuerzo.',
      'Que sus accesos y tareas de onboarding se activen solas.',
    ]),
    q('centros-medicos-p3', 'Fin de mes: el dueño o gerente pide números. ¿Qué haces?', [
      'Juntas datos de agenda, facturación y caja.',
      'Armas la presentación para la reunión.',
      'Buscas por qué bajó (o subió) la atención en una especialidad.',
      'Quisieras que el reporte llegara solo cada mes.',
    ]),
    q('centros-medicos-p4', '¿Qué frase describe mejor a tu equipo?', [
      '"Siempre estamos preguntándonos dónde está algo."',
      '"Escribimos todo el día."',
      '"Decidimos por intuición porque el dato llega tarde."',
      '"Hacemos lo mismo 50 veces al día."',
    ]),
  ],
  firstChallenge: {
    luigi: '¿Qué dice nuestro protocolo de [procedimiento]?',
    peach: 'Crea el manual de bienvenida del nuevo médico',
    bowser: 'Analiza el ausentismo por día en Excel',
    toad: 'Agente de preguntas frecuentes para pacientes',
    mario: 'Piloto en recepción + gerencia',
  },
};
