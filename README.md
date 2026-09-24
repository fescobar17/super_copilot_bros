# Super Copilot Bros — "¿Qué piloto eres?"

App web mobile-first para el evento **Kruger Tech + Microsoft** · miércoles 30 de septiembre de 2026, 16:30 · Edificio K+, Quito.

Flujo (≈90 s): elige tu pista → 4 escenarios → Moneda Aha por respuesta → registro → personaje + Power-Up + primer reto → tarjeta para el stand.

## Stack

Next.js 14 (App Router) · TypeScript estricto · Tailwind · Framer Motion · Zustand (`persist` en `sessionStorage`) · Zod · html2canvas · Google Apps Script → Google Sheets · Vercel.

## Desarrollo local

```bash
npm install
cp .env.local.example .env.local   # completa APPS_SCRIPT_URL y BOARD_KEY
npm run dev                        # http://localhost:3000
npm test                           # Vitest: scoring, contenido, payload, tablero
npm run lint && npm run build
```

Sin `APPS_SCRIPT_URL` la app funciona igual: el guardado falla sin bloquear al jugador y aparece "No pudimos guardar. Reintentar".

## Rutas

| Ruta | Qué hace |
|---|---|
| `/` | Key visual + CTA "¡Jugar!" |
| `/pista` | 5 mundos (sectores) |
| `/nivel` | 4 preguntas con bloques "?", Moneda Aha y botón Atrás |
| `/registro` | Nombre, empresa, cargo (obligatorios), email y celular (opcionales), consentimiento |
| `/resultado` | "Nivel superado" → personaje, primer reto, código de stand, tarjeta descargable, respuestas, "Jugar otra pista" |
| `/tablero?key=BOARD_KEY` | Vista 16:9 para proyector, refresca cada 10 s |
| `POST /api/submit` | Valida con Zod y reenvía a Apps Script (1 reintento) |
| `GET /api/board?key=` | Conteo por sector y personaje (caché 10 s) |

Para mover el registro antes de las preguntas: en `app/nivel/page.tsx` (`onNext`) cambia el destino y en `app/pista/page.tsx` envía a `/registro`; las guardas de cada página ya redirigen según el estado.

## Contenido

Todo el contenido sale **literal** de `docs/dinamica.md`. Un test (`tests/content.test.ts`) verifica que cada texto exista en ese documento.

| Archivo | Contenido |
|---|---|
| `content/aha.ts` | **Todas las Monedas Aha**, en un solo lugar (`**negrita**` soportado) |
| `content/sectors/<sector>.ts` | Intro, preguntas, opciones A–D y primer reto por personaje |
| `content/characters.ts` | Personajes, Power-Up, perfil, frase, color |
| `content/event.ts` | Fecha, hora y lugar (aparecen en la tarjeta) |
| `content/assets.ts` | URLs de Cloudinary de ilustraciones y logos |
| `content/ui.ts` | Textos de botones y etiquetas |

**Editar un sector:** abre `content/sectors/<sector>.ts`, cambia el texto y corre `npm test`. Si cambias `docs/dinamica.md`, actualiza ambos para que el test siga en verde.

**Regla de asignación** (`lib/scoring.ts`): gana la letra con más respuestas (A Luigi · B Peach · C Bowser · D Toad); si dos o más empatan en el máximo → Mario (ACELERA).

## Ilustraciones

Pega la URL de Cloudinary en `content/assets.ts`. Mientras un valor sea `null`, se muestra un placeholder gris con el nombre. Las transformaciones (`f_auto`, `w_…`, `f_png` para la tarjeta) se agregan solas; sube la imagen original sin transformar.

Requisitos: PNG con fondo transparente, recortado al personaje, ≥ 800 px de alto. Cloudinary sirve `Access-Control-Allow-Origin: *`, necesario para que html2canvas capture la tarjeta.

## Google Sheets + Apps Script

1. Crea una hoja de cálculo nueva.
2. Extensiones → Apps Script → pega `apps-script/Code.gs`.
3. Implementar → Nueva implementación → **Aplicación web** · Ejecutar como: **Yo** · Acceso: **Cualquier usuario**.
4. Copia la URL `/exec` en `APPS_SCRIPT_URL` (Vercel → Settings → Environment Variables).
5. La primera jugada crea la pestaña `Jugadas` con encabezados. Las columnas clave para el BDR (PowerUp, P4) quedan resaltadas en amarillo.

Si editas `Code.gs`, vuelve a implementar como **nueva versión**; si no, la URL sigue sirviendo el código anterior.

### Columnas

| Columna | Contenido |
|---|---|
| Timestamp | Hora de Ecuador (la agrega el servidor) |
| Ronda | 1 para la primera pista, 2 para la segunda… |
| Nombre, Empresa, Cargo, Email, Celular | Lead |
| Sector | Nombre visible del sector |
| Personaje, PowerUp | Resultado |
| Conteo_A … Conteo_D | Respuestas por letra (barras de la tarjeta) |
| P1_Pregunta, P1_Respuesta … P4_Respuesta | Texto de la pregunta y opción elegida (`D. …`). **P4 = el "enemigo"** para abrir la conversación comercial |
| Codigo_Stand | Código corto, p. ej. `TOAD-ASEG-07` |
| Consentimiento | "Sí" (obligatorio para jugar) |

## Deploy en Vercel

1. Sube el repo a GitHub e impórtalo en Vercel (framework: Next.js).
2. Variables de entorno: `APPS_SCRIPT_URL`, `BOARD_KEY`.
3. Deploy. Genera el QR apuntando a la URL de producción (`/`).

## Checklist del día del evento (30/09)

- [ ] Todas las URLs de `content/assets.ts` cargadas (sin placeholders grises).
- [ ] Aha validados con Microsoft (ver pendientes).
- [ ] Escanear el QR con iPhone y Android: abre la home sin errores.
- [ ] Jugar una ronda completa y confirmar la fila en Sheets ("Tarjeta guardada ✓").
- [ ] Guardar tarjeta en iPhone (hoja de compartir) y en Android (descarga PNG).
- [ ] Abrir `/tablero?key=…` en el proyector, en pantalla completa (F11), y ver que sube el conteo.
- [ ] Borrar las filas de prueba de la hoja antes de abrir puertas.
- [ ] Wi-Fi del Edificio K+ probado desde el stand.

## Pendientes

- **Validar los Aha con Microsoft**: cifras de Dragon Copilot (`hospitales-p1`), caso Premera (`aseguradoras-p4`), disponibilidad en Ecuador y en español. Todo está en `content/aha.ts`.
- **Texto de consentimiento**: validar con Legal (`content/ui.ts → registro.consent`).
