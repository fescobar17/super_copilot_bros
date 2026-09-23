import type { Sector } from '../schema';
import { q } from './_helpers';

export const laboratorios: Sector = {
  key: 'laboratorios',
  name: 'Laboratorios clínicos',
  shortCode: 'LAB',
  trackNumber: 3,
  emoji: '🧪',
  intro: 'Muestras, resultados, controles de calidad y médicos esperando. ¿Qué piloto eres?',
  questions: [
    q('laboratorios-p1', 'Un médico llama: "¿ya salió el resultado de mi paciente?". ¿Qué te gustaría?', [
      'Encontrar el estado de la muestra sin revisar tres sistemas.',
      'Que el mensaje al médico salga solo cuando el resultado esté listo.',
      'Saber qué tipo de muestras se retrasan más y por qué.',
      'Que las consultas repetidas las responda un asistente.',
    ]),
    q('laboratorios-p2', 'Llega la auditoría de acreditación (ISO 15189). ¿Qué te quita tiempo?', [
      'Encontrar la versión vigente de cada procedimiento.',
      'Actualizar y redactar procedimientos y registros.',
      'Demostrar tendencias del control de calidad.',
      'Recolectar firmas y evidencias de cada área.',
    ]),
    q('laboratorios-p3', 'Tienes el Excel del control de calidad del mes. ¿Qué preguntarías?', [
      '"¿Dónde está el dato del lote que falló en marzo?"',
      '"Hazme el informe para la dirección técnica."',
      '"¿Qué equipo muestra una tendencia antes de salirse de control?"',
      '"Envía la alerta al responsable cada vez que pase esto."',
    ]),
    q('laboratorios-p4', 'Si el laboratorio creciera 30% en volumen mañana, ¿qué se rompería primero?', [
      'La trazabilidad: nadie encontraría nada.',
      'La comunicación con médicos y pacientes.',
      'La capacidad de ver dónde está el cuello de botella.',
      'El personal, ahogado en tareas manuales.',
    ]),
  ],
  firstChallenge: {
    luigi: '¿Cuál es la versión vigente del POE de [prueba]?',
    peach: 'Redacta la guía de preparación del paciente para 5 exámenes',
    yoshi: 'Analiza el QC del mes en Excel',
    toad: 'Agente que responda consultas de estado de resultados',
    mario: 'Piloto en recepción y atención al médico',
  },
};
