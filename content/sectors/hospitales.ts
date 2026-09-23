import type { Sector } from '../schema';
import { q } from './_helpers';

export const hospitales: Sector = {
  key: 'hospitales',
  name: 'Hospitales',
  shortCode: 'HOSP',
  trackNumber: 1,
  emoji: '🏥',
  intro: 'Turnos, altas, historias clínicas y auditorías. Veamos qué tipo de piloto eres.',
  questions: [
    q('hospitales-p1', 'Termina el turno y el médico aún tiene notas pendientes. ¿Qué te gustaría que pasara?', [
      'Que encuentre al instante lo que dijo el paciente en consultas anteriores.',
      'Que la nota clínica se escriba sola a partir de la conversación.',
      'Que vea un resumen de lo más crítico del paciente antes de entrar.',
      'Que los pedidos y órdenes salgan sin volver a digitarlos.',
    ]),
    q('hospitales-p2', 'Llega una auditoría de calidad. ¿Qué te quita más el sueño?', [
      'Encontrar la evidencia dispersa en correos, actas y carpetas.',
      'Redactar el informe de respuesta a tiempo.',
      'Saber en qué indicadores estamos fallando antes de que lo digan.',
      'Llenar los mismos formatos una y otra vez.',
    ]),
    q('hospitales-p3', 'Reunión de comité de 1 hora. ¿Qué harías con Copilot?', [
      'Preguntar después "¿qué se decidió sobre X?" sin revisar la grabación.',
      'Que envíe el acta y los compromisos apenas se cierre la llamada.',
      'Que detecte los temas que se repiten reunión tras reunión sin resolverse.',
      'Que asigne tareas a cada responsable automáticamente.',
    ]),
    q('hospitales-p4', 'Si pudieras recuperar 5 horas a la semana, ¿dónde las invertirías?', [
      'En entender mejor a mis pacientes complicados.',
      'En comunicar mejor a mi equipo y a los pacientes.',
      'En tomar decisiones con datos del mes, no del trimestre pasado.',
      'En eliminar un proceso manual que todos odian.',
    ]),
  ],
  firstChallenge: {
    luigi: 'Pídele a Copilot: resume todo lo que tenemos sobre [protocolo X]',
    peach: 'Redacta el comunicado de cambio de turno en 30 segundos',
    yoshi: 'Sube el Excel de ocupación y pregunta: ¿qué patrón ves?',
    toad: 'Crea un agente que responda las preguntas frecuentes del personal',
    mario: 'Lleva un piloto de Copilot a un área completa',
  },
};
