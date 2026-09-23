# Super Copilot Bros — Dinámica digital "¿Qué piloto eres?"
Insumo de contenido para construir la experiencia con Claude Code.
Evento: Kruger Tech + Microsoft · 29 de octubre · Edificio K+ (UIO) · 18h00–19h30 · 15 asistentes (C-level, líderes de negocio y TI del sector salud).

---

## 1. Concepto y lógica del juego

**Promesa:** "Tu organización ya tiene jugadores expertos. Copilot les da nuevas habilidades." La dinámica conecta con la narrativa del deck: **Problema → Power-Up → Solución → Nivel superado**.

**Flujo (≈90 segundos por persona):**

1. **Pantalla de inicio** — "Elige tu pista" → 5 sectores.
2. **4 preguntas** del sector. Cada pregunta es un escenario cotidiano con 4 respuestas. Cada respuesta suma 1 punto a un Power-Up.
3. **Después de cada respuesta** → aparece una "Moneda Aha" (dato corto de 1–2 líneas) que revela algo que Copilot puede hacer y que no esperaban.
4. **Resultado** → se asigna el personaje según el Power-Up con más puntos. Tarjeta final con: personaje, su Power-Up, frase de su sector y un "primer reto" concreto para probar Copilot.
5. **CTA** → "Muestra tu tarjeta en el stand y activa tu Power-Up" (enlaza con la Dinámica 02 y la ruleta de merch).

**Principio de redacción:** preguntas en segunda persona, lenguaje del día a día del sector, nada de jerga técnica. El Aha siempre sigue el patrón *"Creías que… → en realidad Copilot…"*.

---

## 2. Personajes (iguales para todos los sectores, para poder comparar)

| Letra de respuesta | Power-Up | Personaje | Perfil | Frase de resultado |
|---|---|---|---|---|
| A | **ENCUENTRA** | **Luigi** | Investigador: odia perder tiempo buscando lo que ya existe. | "Tu superpoder: que la información te encuentre a ti." |
| B | **CREA** | **Peach** | Comunicadora: vive entre informes, correos y documentos. | "Tu superpoder: pasar de la hoja en blanco al borrador listo en segundos." |
| C | **ANALIZA** | **Yoshi** | Estratega: quiere entender qué dicen los datos antes que nadie. | "Tu superpoder: ver el patrón antes de que llegue el Excel." |
| D | **AUTOMATIZA** | **Toad** | Operativo veloz: si algo se repite, quiere que se haga solo. | "Tu superpoder: que lo repetitivo corra en piloto automático." |
| Empate | **ACELERA** | **Mario** | Todoterreno: combina todo, ve el impacto completo. | "Tu superpoder: acelerar a todo el equipo, no solo a ti." |

**Regla de asignación:** gana el Power-Up con más puntos. Si hay empate entre dos o más → **Mario**. (Opcional para Claude Code: guardar sector + personaje para mostrar al final un tablero "¿Qué piloto domina cada sector?").

> Nota de marca: usar las ilustraciones oficiales del kit del evento (las del deck), no generar versiones propias de los personajes.

---

## 3. Journeys por sector

### 🏥 PISTA 1 — HOSPITALES
*Intro en pantalla:* "Turnos, altas, historias clínicas y auditorías. Veamos qué tipo de piloto eres."

**P1. Termina el turno y el médico aún tiene notas pendientes. ¿Qué te gustaría que pasara?**
- A. Que encuentre al instante lo que dijo el paciente en consultas anteriores.
- B. Que la nota clínica se escriba sola a partir de la conversación.
- C. Que vea un resumen de lo más crítico del paciente antes de entrar.
- D. Que los pedidos y órdenes salgan sin volver a digitarlos.

> 🪙 **Aha:** Creías que la IA en salud era para diagnosticar. Hoy su mayor impacto está en la **documentación**: con Dragon Copilot (Microsoft) la nota clínica se genera escuchando la consulta, y Microsoft reporta ahorros de ~5 minutos por paciente. En 20 pacientes, casi 2 horas de vuelta al día.

**P2. Llega una auditoría de calidad. ¿Qué te quita más el sueño?**
- A. Encontrar la evidencia dispersa en correos, actas y carpetas.
- B. Redactar el informe de respuesta a tiempo.
- C. Saber en qué indicadores estamos fallando antes de que lo digan.
- D. Llenar los mismos formatos una y otra vez.

> 🪙 **Aha:** Copilot en Microsoft 365 puede buscar en **tus** correos, Teams y SharePoint a la vez: "muéstrame todo lo que se decidió sobre el protocolo de caídas este año" y lo trae con las fuentes citadas.

**P3. Reunión de comité de 1 hora. ¿Qué harías con Copilot?**
- A. Preguntar después "¿qué se decidió sobre X?" sin revisar la grabación.
- B. Que envíe el acta y los compromisos apenas se cierre la llamada.
- C. Que detecte los temas que se repiten reunión tras reunión sin resolverse.
- D. Que asigne tareas a cada responsable automáticamente.

> 🪙 **Aha:** Copilot en Teams no solo resume: puedes preguntarle en plena reunión "¿en qué no estamos de acuerdo?" y te lo dice. Si llegaste tarde, te pone al día sin interrumpir a nadie.

**P4. Si pudieras recuperar 5 horas a la semana, ¿dónde las invertirías?**
- A. En entender mejor a mis pacientes complicados.
- B. En comunicar mejor a mi equipo y a los pacientes.
- C. En tomar decisiones con datos del mes, no del trimestre pasado.
- D. En eliminar un proceso manual que todos odian.

> 🪙 **Aha:** Estudios de adopción de Copilot muestran que lo primero que recupera el personal no es tiempo "de pantalla", sino tiempo **con las personas**. La IA no reemplaza al jugador: le devuelve tiempo de juego.

*Primer reto por personaje (tarjeta final):* Luigi → "Pídele a Copilot: resume todo lo que tenemos sobre [protocolo X]". Peach → "Redacta el comunicado de cambio de turno en 30 segundos". Yoshi → "Sube el Excel de ocupación y pregunta: ¿qué patrón ves?". Toad → "Crea un agente que responda las preguntas frecuentes del personal". Mario → "Lleva un piloto de Copilot a un área completa".

---

### 🛡️ PISTA 2 — ASEGURADORAS
*Intro:* "Siniestros, pólizas, autorizaciones y clientes que quieren respuesta ya."

**P1. Entra un siniestro con 40 páginas de documentos médicos. ¿Qué te ayudaría más?**
- A. Encontrar en segundos la cláusula de la póliza que aplica.
- B. Tener lista la carta de respuesta al asegurado.
- C. Un resumen que señale inconsistencias o posibles alertas.
- D. Que los datos pasen solos del PDF al sistema.

> 🪙 **Aha:** Copilot puede leer el expediente completo y responder "¿qué dice este caso que contradiga la póliza?". Lo que antes era lectura de una hora se vuelve una pregunta.

**P2. Un asegurado llama molesto por una autorización negada. ¿Qué quieres tener en pantalla?**
- A. Su historial completo con nosotros en un solo lugar.
- B. Una respuesta empática y clara ya redactada.
- C. El motivo real del rechazo y si es un caso que se repite.
- D. Que la autorización se reprocese sin pasar por 3 áreas.

> 🪙 **Aha:** Microsoft publica escenarios de Copilot para aseguradoras donde un **agente** revisa el reclamo, verifica cobertura y prepara la liquidación para que el analista solo apruebe. El humano decide; la IA prepara.

**P3. Tienes que renovar una cartera corporativa grande. ¿Por dónde empiezas?**
- A. Juntando la siniestralidad y los correos de todo el año.
- B. Armando la propuesta de renovación.
- C. Entendiendo qué coberturas están costando más de lo esperado.
- D. Automatizando los recordatorios y seguimientos al cliente.

> 🪙 **Aha:** Con Copilot en Excel puedes preguntar en español "¿qué tipo de siniestro creció más este año y en qué ciudad?" sin fórmulas ni tablas dinámicas.

**P4. ¿Cuál es el enemigo que más te frena hoy?**
- A. Información que existe pero nadie encuentra.
- B. Demasiadas cartas, informes y respuestas por escribir.
- C. Decisiones tomadas con datos atrasados.
- D. Tareas que siguen el mismo patrón todos los días.

> 🪙 **Aha:** Premera Blue Cross (EE. UU.) usa agentes de Copilot Studio para armar anexos de contratos que antes tomaban horas de trabajo manual. El dato contraintuitivo: el mayor ahorro no está en el siniestro, está en el **papeleo alrededor** del siniestro.

*Primer reto:* Luigi → "¿Qué cláusulas de exclusión se repiten en nuestras pólizas?". Peach → "Redacta la respuesta a este reclamo en tono empático". Yoshi → "Analiza la siniestralidad del último trimestre en Excel". Toad → "Crea un agente que clasifique los correos de siniestros". Mario → "Piloto de Copilot en el área de siniestros".

---

### 🧪 PISTA 3 — LABORATORIOS CLÍNICOS
*Intro:* "Muestras, resultados, controles de calidad y médicos esperando. ¿Qué piloto eres?"

**P1. Un médico llama: "¿ya salió el resultado de mi paciente?". ¿Qué te gustaría?**
- A. Encontrar el estado de la muestra sin revisar tres sistemas.
- B. Que el mensaje al médico salga solo cuando el resultado esté listo.
- C. Saber qué tipo de muestras se retrasan más y por qué.
- D. Que las consultas repetidas las responda un asistente.

> 🪙 **Aha:** Creías que la IA en laboratorio era para leer las muestras. Uno de sus usos más rápidos es **atender preguntas repetitivas**: un agente en Teams o en la web puede responder "¿cómo me preparo para este examen?" las 24 horas.

**P2. Llega la auditoría de acreditación (ISO 15189). ¿Qué te quita tiempo?**
- A. Encontrar la versión vigente de cada procedimiento.
- B. Actualizar y redactar procedimientos y registros.
- C. Demostrar tendencias del control de calidad.
- D. Recolectar firmas y evidencias de cada área.

> 🪙 **Aha:** Copilot puede comparar dos versiones de un procedimiento y decirte exactamente qué cambió, o redactar el borrador de un POE nuevo a partir de tus documentos actuales.

**P3. Tienes el Excel del control de calidad del mes. ¿Qué preguntarías?**
- A. "¿Dónde está el dato del lote que falló en marzo?"
- B. "Hazme el informe para la dirección técnica."
- C. "¿Qué equipo muestra una tendencia antes de salirse de control?"
- D. "Envía la alerta al responsable cada vez que pase esto."

> 🪙 **Aha:** Copilot en Excel detecta tendencias y valores atípicos y te lo explica en lenguaje natural. No reemplaza a Westgard: te ayuda a ver la señal antes.

**P4. Si el laboratorio creciera 30% en volumen mañana, ¿qué se rompería primero?**
- A. La trazabilidad: nadie encontraría nada.
- B. La comunicación con médicos y pacientes.
- C. La capacidad de ver dónde está el cuello de botella.
- D. El personal, ahogado en tareas manuales.

> 🪙 **Aha:** Mayo Clinic Laboratories plantea que el valor de la IA en laboratorio no es solo analítico, sino **operativo**: ruteo de trabajo, priorización y reducción de tareas administrativas. Crecer sin contratar al mismo ritmo.

*Primer reto:* Luigi → "¿Cuál es la versión vigente del POE de [prueba]?". Peach → "Redacta la guía de preparación del paciente para 5 exámenes". Yoshi → "Analiza el QC del mes en Excel". Toad → "Agente que responda consultas de estado de resultados". Mario → "Piloto en recepción y atención al médico".

---

### 🩺 PISTA 4 — CENTROS MÉDICOS
*Intro:* "Agenda llena, recepción saturada y un equipo que hace de todo. Veamos tu piloto."

**P1. Lunes 8 a.m.: teléfono, WhatsApp y correos al mismo tiempo. ¿Qué te salvaría?**
- A. Encontrar al momento la disponibilidad y datos de cada paciente.
- B. Respuestas listas para las preguntas de siempre.
- C. Saber qué días y horarios tienen más ausentismo.
- D. Que las confirmaciones y recordatorios salgan solos.

> 🪙 **Aha:** Con Copilot Studio puedes crear un agente que responda preguntas de pacientes (horarios, preparación, requisitos) **sin programar**, alimentado con tus propios documentos.

**P2. Un médico nuevo entra la próxima semana. ¿Qué necesitas?**
- A. Que encuentre solo los protocolos y procesos del centro.
- B. Un manual de bienvenida redactado en minutos.
- C. Entender qué especialidades necesitan más refuerzo.
- D. Que sus accesos y tareas de onboarding se activen solas.

> 🪙 **Aha:** Contraintuitivo: el primer gran uso de Copilot en muchas organizaciones es el **onboarding**. Un nuevo colaborador puede preguntarle "¿cómo se hace X aquí?" en vez de interrumpir a 5 compañeros.

**P3. Fin de mes: el dueño o gerente pide números. ¿Qué haces?**
- A. Juntas datos de agenda, facturación y caja.
- B. Armas la presentación para la reunión.
- C. Buscas por qué bajó (o subió) la atención en una especialidad.
- D. Quisieras que el reporte llegara solo cada mes.

> 🪙 **Aha:** Copilot en PowerPoint convierte un documento o Excel en una presentación completa. Del dato a la reunión en minutos, no en una tarde.

**P4. ¿Qué frase describe mejor a tu equipo?**
- A. "Siempre estamos preguntándonos dónde está algo."
- B. "Escribimos todo el día."
- C. "Decidimos por intuición porque el dato llega tarde."
- D. "Hacemos lo mismo 50 veces al día."

> 🪙 **Aha:** Un centro médico pequeño tiene la misma ventaja que un gran hospital: Copilot funciona sobre Word, Excel, Outlook y Teams, las herramientas que **ya usan**. No hace falta un proyecto enorme para empezar.

*Primer reto:* Luigi → "¿Qué dice nuestro protocolo de [procedimiento]?". Peach → "Crea el manual de bienvenida del nuevo médico". Yoshi → "Analiza el ausentismo por día en Excel". Toad → "Agente de preguntas frecuentes para pacientes". Mario → "Piloto en recepción + gerencia".

---

### 🤝 PISTA 5 — BROKERS
*Intro:* "Pólizas, cotizaciones, renovaciones y clientes que comparan todo. ¿Qué piloto eres?"

**P1. Un cliente te pide comparar 3 propuestas de aseguradoras. ¿Qué te gustaría?**
- A. Encontrar en segundos las diferencias de coberturas y exclusiones.
- B. Tener el cuadro comparativo y la recomendación ya redactados.
- C. Ver cuál conviene realmente según su historial de uso.
- D. Que los datos de cada PDF se extraigan solos a una tabla.

> 🪙 **Aha:** Subes 3 pólizas de 60 páginas a Copilot y preguntas: "¿qué cubre una que no cubra la otra?". El cuadro comparativo que tomaba medio día, en minutos.

**P2. Temporada de renovaciones. ¿Qué te preocupa más?**
- A. Perder el rastro de lo que se habló con cada cliente.
- B. Escribir decenas de correos personalizados.
- C. Saber qué clientes tienen riesgo de irse.
- D. Los recordatorios y seguimientos manuales.

> 🪙 **Aha:** Copilot en Outlook resume un hilo de 40 correos con un cliente en 5 líneas y te propone la respuesta en tu tono. Llegas a la llamada sabiendo todo.

**P3. Reunión con un cliente corporativo nuevo. ¿Cómo te preparas?**
- A. Buscando todo lo que ya sabemos de esa empresa.
- B. Armando una propuesta que se vea profesional.
- C. Entendiendo su sector y dónde está su riesgo.
- D. Que después de la reunión el seguimiento se agende solo.

> 🪙 **Aha:** Copilot puede prepararte un brief antes de la reunión con los correos, archivos y reuniones previas que tienes con ese cliente. El broker que llega mejor preparado gana la cuenta.

**P4. ¿Qué te diferencia de otro broker?**
- A. Conozco a fondo cada póliza de mis clientes.
- B. Comunico mejor y más rápido.
- C. Asesoro con datos, no solo con precio.
- D. Mi servicio no falla en tiempos.

> 🪙 **Aha:** La IA no hace a todos los brokers iguales: amplifica lo que ya haces bien. Si tu valor es asesorar, Copilot te libera del papeleo para que asesores más clientes con la misma calidad.

*Primer reto:* Luigi → "Compara estas 2 pólizas y dame las diferencias". Peach → "Redacta la propuesta de renovación para [cliente]". Yoshi → "Analiza mi cartera: ¿quién tiene más riesgo de no renovar?". Toad → "Automatiza el recordatorio de vencimientos". Mario → "Piloto de Copilot para todo el equipo comercial".

---

## 4. Pantalla de resultado (plantilla)

```
[Ilustración del personaje]
¡Eres {PERSONAJE}!  Power-Up: {POWER-UP}
{Frase de resultado}
En {SECTOR}, esto significa: {primer reto del sector}
Tus monedas Aha: 4/4 🪙
[Botón] Activa tu Power-Up en el stand →
```

Datos a capturar (opcional, útil para seguimiento comercial post-evento): nombre, empresa, cargo, sector, personaje, respuestas. Sirve para que el BDR abra la conversación desde el "enemigo" y el Power-Up de cada asistente (objetivo de la Dinámica 01).

---

## 5. Recomendaciones y supuestos

- **Validar los datos Aha con Microsoft** antes del evento (en especial las cifras de Dragon Copilot y el caso Premera) y confirmar qué productos están disponibles en Ecuador y en español: Dragon Copilot tiene disponibilidad por mercado limitada; Copilot M365, Copilot Studio y Copilot en Excel/Teams/Outlook son la apuesta más segura para mostrar en vivo.
- **Supuesto:** una sola ronda de 4 preguntas por persona; si hay tiempo, pueden jugar un segundo sector y comparar personajes.
- **Tablero en vivo** (sugerido): una pantalla con la distribución de personajes por sector ("En aseguradoras domina Toad") genera conversación entre los 15 asistentes.
- Mantener cada Aha en ≤ 2 líneas en pantalla; el detalle lo cuenta el facilitador en el stand.

## Fuentes consultadas
- [Microsoft Dragon Copilot — Microsoft for Healthcare](https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-copilot)
- [Dragon Copilot en HIMSS 2026 — Microsoft Cloud Blog](https://www.microsoft.com/en-us/microsoft-cloud/blog/healthcare/2026/03/05/unify-simplify-scale-microsoft-dragon-copilot-meets-the-moment-at-himss-2026/)
- [NHS: médicos ahorran horas con Dragon Copilot](https://www.resultsense.com/news/2026-03-24-dragon-copilot-nhs-clinical-documentation/)
- [Microsoft Adoption — Insurance: Process a claim](https://adoption.microsoft.com/en-us/scenario-library/financial-services/process-a-claim/)
- [Microsoft Adoption — Insurance claim settlement agent](https://adoption.microsoft.com/en-us/scenario-library/financial-services/insurance-claim-settlement-agent/)
- [Microsoft Adoption — Payor: Speed claims processing](https://adoption.microsoft.com/en-us/scenario-library/healthcare/speed-claims-processing/)
- [Premera Blue Cross y agentes de Copilot Studio](https://windowsforum.com/windows-news.4/premera-blue-cross-cuts-contract-exhibit-time-with-copilot-studio-agents.413930/)
- [Mayo Clinic Laboratories — AI in laboratory medicine](https://news.mayocliniclabs.com/2025/10/06/transforming-laboratory-medicine-through-ai-from-promise-to-practice/)
- [AI in Clinical Labs: ChatGPT, Claude y Copilot](https://labos.co/blog/ai-in-clinical-labs-what-chatgpt-claude-and-copilot-mean-for-your-lab/)
