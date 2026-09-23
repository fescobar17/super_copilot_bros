// Todas las "Monedas Aha" en un solo lugar (docs/dinamica.md §3, literal).
// PENDIENTE: validar con Microsoft antes del evento — cifras de Dragon Copilot (hospitales-p1),
// caso Premera (aseguradoras-p4) y disponibilidad de productos en Ecuador y en español.
// `**texto**` se renderiza en negrita.
export const AHA: Record<string, string> = {
  // 🏥 Hospitales
  'hospitales-p1':
    'Creías que la IA en salud era para diagnosticar. Hoy su mayor impacto está en la **documentación**: con Dragon Copilot (Microsoft) la nota clínica se genera escuchando la consulta, y Microsoft reporta ahorros de ~5 minutos por paciente. En 20 pacientes, casi 2 horas de vuelta al día.',
  'hospitales-p2':
    'Copilot en Microsoft 365 puede buscar en **tus** correos, Teams y SharePoint a la vez: "muéstrame todo lo que se decidió sobre el protocolo de caídas este año" y lo trae con las fuentes citadas.',
  'hospitales-p3':
    'Copilot en Teams no solo resume: puedes preguntarle en plena reunión "¿en qué no estamos de acuerdo?" y te lo dice. Si llegaste tarde, te pone al día sin interrumpir a nadie.',
  'hospitales-p4':
    'Estudios de adopción de Copilot muestran que lo primero que recupera el personal no es tiempo "de pantalla", sino tiempo **con las personas**. La IA no reemplaza al jugador: le devuelve tiempo de juego.',

  // 🛡️ Aseguradoras
  'aseguradoras-p1':
    'Copilot puede leer el expediente completo y responder "¿qué dice este caso que contradiga la póliza?". Lo que antes era lectura de una hora se vuelve una pregunta.',
  'aseguradoras-p2':
    'Microsoft publica escenarios de Copilot para aseguradoras donde un **agente** revisa el reclamo, verifica cobertura y prepara la liquidación para que el analista solo apruebe. El humano decide; la IA prepara.',
  'aseguradoras-p3':
    'Con Copilot en Excel puedes preguntar en español "¿qué tipo de siniestro creció más este año y en qué ciudad?" sin fórmulas ni tablas dinámicas.',
  'aseguradoras-p4':
    'Premera Blue Cross (EE. UU.) usa agentes de Copilot Studio para armar anexos de contratos que antes tomaban horas de trabajo manual. El dato contraintuitivo: el mayor ahorro no está en el siniestro, está en el **papeleo alrededor** del siniestro.',

  // 🧪 Laboratorios clínicos
  'laboratorios-p1':
    'Creías que la IA en laboratorio era para leer las muestras. Uno de sus usos más rápidos es **atender preguntas repetitivas**: un agente en Teams o en la web puede responder "¿cómo me preparo para este examen?" las 24 horas.',
  'laboratorios-p2':
    'Copilot puede comparar dos versiones de un procedimiento y decirte exactamente qué cambió, o redactar el borrador de un POE nuevo a partir de tus documentos actuales.',
  'laboratorios-p3':
    'Copilot en Excel detecta tendencias y valores atípicos y te lo explica en lenguaje natural. No reemplaza a Westgard: te ayuda a ver la señal antes.',
  'laboratorios-p4':
    'Mayo Clinic Laboratories plantea que el valor de la IA en laboratorio no es solo analítico, sino **operativo**: ruteo de trabajo, priorización y reducción de tareas administrativas. Crecer sin contratar al mismo ritmo.',

  // 🩺 Centros médicos
  'centros-medicos-p1':
    'Con Copilot Studio puedes crear un agente que responda preguntas de pacientes (horarios, preparación, requisitos) **sin programar**, alimentado con tus propios documentos.',
  'centros-medicos-p2':
    'Contraintuitivo: el primer gran uso de Copilot en muchas organizaciones es el **onboarding**. Un nuevo colaborador puede preguntarle "¿cómo se hace X aquí?" en vez de interrumpir a 5 compañeros.',
  'centros-medicos-p3':
    'Copilot en PowerPoint convierte un documento o Excel en una presentación completa. Del dato a la reunión en minutos, no en una tarde.',
  'centros-medicos-p4':
    'Un centro médico pequeño tiene la misma ventaja que un gran hospital: Copilot funciona sobre Word, Excel, Outlook y Teams, las herramientas que **ya usan**. No hace falta un proyecto enorme para empezar.',

  // 🤝 Brokers
  'brokers-p1':
    'Subes 3 pólizas de 60 páginas a Copilot y preguntas: "¿qué cubre una que no cubra la otra?". El cuadro comparativo que tomaba medio día, en minutos.',
  'brokers-p2':
    'Copilot en Outlook resume un hilo de 40 correos con un cliente en 5 líneas y te propone la respuesta en tu tono. Llegas a la llamada sabiendo todo.',
  'brokers-p3':
    'Copilot puede prepararte un brief antes de la reunión con los correos, archivos y reuniones previas que tienes con ese cliente. El broker que llega mejor preparado gana la cuenta.',
  'brokers-p4':
    'La IA no hace a todos los brokers iguales: amplifica lo que ya haces bien. Si tu valor es asesorar, Copilot te libera del papeleo para que asesores más clientes con la misma calidad.',
};
