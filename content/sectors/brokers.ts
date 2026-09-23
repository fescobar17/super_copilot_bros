import type { Sector } from '../schema';
import { q } from './_helpers';

export const brokers: Sector = {
  key: 'brokers',
  name: 'Brokers',
  shortCode: 'BROK',
  trackNumber: 5,
  emoji: '🤝',
  intro: 'Pólizas, cotizaciones, renovaciones y clientes que comparan todo. ¿Qué piloto eres?',
  questions: [
    q('brokers-p1', 'Un cliente te pide comparar 3 propuestas de aseguradoras. ¿Qué te gustaría?', [
      'Encontrar en segundos las diferencias de coberturas y exclusiones.',
      'Tener el cuadro comparativo y la recomendación ya redactados.',
      'Ver cuál conviene realmente según su historial de uso.',
      'Que los datos de cada PDF se extraigan solos a una tabla.',
    ]),
    q('brokers-p2', 'Temporada de renovaciones. ¿Qué te preocupa más?', [
      'Perder el rastro de lo que se habló con cada cliente.',
      'Escribir decenas de correos personalizados.',
      'Saber qué clientes tienen riesgo de irse.',
      'Los recordatorios y seguimientos manuales.',
    ]),
    q('brokers-p3', 'Reunión con un cliente corporativo nuevo. ¿Cómo te preparas?', [
      'Buscando todo lo que ya sabemos de esa empresa.',
      'Armando una propuesta que se vea profesional.',
      'Entendiendo su sector y dónde está su riesgo.',
      'Que después de la reunión el seguimiento se agende solo.',
    ]),
    q('brokers-p4', '¿Qué te diferencia de otro broker?', [
      'Conozco a fondo cada póliza de mis clientes.',
      'Comunico mejor y más rápido.',
      'Asesoro con datos, no solo con precio.',
      'Mi servicio no falla en tiempos.',
    ]),
  ],
  firstChallenge: {
    luigi: 'Compara estas 2 pólizas y dame las diferencias',
    peach: 'Redacta la propuesta de renovación para [cliente]',
    yoshi: 'Analiza mi cartera: ¿quién tiene más riesgo de no renovar?',
    toad: 'Automatiza el recordatorio de vencimientos',
    mario: 'Piloto de Copilot para todo el equipo comercial',
  },
};
