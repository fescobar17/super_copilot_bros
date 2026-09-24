import type { Sector } from '../schema';
import { q } from './_helpers';

export const aseguradoras: Sector = {
  key: 'aseguradoras',
  name: 'Aseguradoras',
  shortCode: 'ASEG',
  trackNumber: 2,
  emoji: '🛡️',
  intro: 'Siniestros, pólizas, autorizaciones y clientes que quieren respuesta ya.',
  questions: [
    q('aseguradoras-p1', 'Entra un siniestro con 40 páginas de documentos médicos. ¿Qué te ayudaría más?', [
      'Encontrar en segundos la cláusula de la póliza que aplica.',
      'Tener lista la carta de respuesta al asegurado.',
      'Un resumen que señale inconsistencias o posibles alertas.',
      'Que los datos pasen solos del PDF al sistema.',
    ]),
    q('aseguradoras-p2', 'Un asegurado llama molesto por una autorización negada. ¿Qué quieres tener en pantalla?', [
      'Su historial completo con nosotros en un solo lugar.',
      'Una respuesta empática y clara ya redactada.',
      'El motivo real del rechazo y si es un caso que se repite.',
      'Que la autorización se reprocese sin pasar por 3 áreas.',
    ]),
    q('aseguradoras-p3', 'Tienes que renovar una cartera corporativa grande. ¿Por dónde empiezas?', [
      'Juntando la siniestralidad y los correos de todo el año.',
      'Armando la propuesta de renovación.',
      'Entendiendo qué coberturas están costando más de lo esperado.',
      'Automatizando los recordatorios y seguimientos al cliente.',
    ]),
    q('aseguradoras-p4', '¿Cuál es el enemigo que más te frena hoy?', [
      'Información que existe pero nadie encuentra.',
      'Demasiadas cartas, informes y respuestas por escribir.',
      'Decisiones tomadas con datos atrasados.',
      'Tareas que siguen el mismo patrón todos los días.',
    ]),
  ],
  firstChallenge: {
    luigi: '¿Qué cláusulas de exclusión se repiten en nuestras pólizas?',
    peach: 'Redacta la respuesta a este reclamo en tono empático',
    bowser: 'Analiza la siniestralidad del último trimestre en Excel',
    toad: 'Crea un agente que clasifique los correos de siniestros',
    mario: 'Piloto de Copilot en el área de siniestros',
  },
};
