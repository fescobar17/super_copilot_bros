/**
 * Super Copilot Bros — backend en Google Sheets.
 * Despliegue: Extensiones → Apps Script → pega este archivo → Implementar → Nueva implementación
 * → Tipo "Aplicación web" → Ejecutar como: Yo → Acceso: Cualquier usuario → copia la URL /exec
 * en la variable APPS_SCRIPT_URL de Vercel.
 */

var SHEET_NAME = 'Jugadas';
var COLUMNS = [
  'Timestamp', 'Ronda', 'Nombre', 'Email',
  'Sector', 'Personaje', 'PowerUp',
  'Conteo_A', 'Conteo_B', 'Conteo_C', 'Conteo_D',
  'P1_Pregunta', 'P1_Respuesta', 'P2_Pregunta', 'P2_Respuesta',
  'P3_Pregunta', 'P3_Respuesta', 'P4_Pregunta', 'P4_Respuesta',
  'Codigo_Stand', 'Consentimiento'
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    // Resalta las columnas clave para el BDR: Power-Up y el "enemigo" (P4)
    var highlight = ['PowerUp', 'P4_Pregunta', 'P4_Respuesta'];
    highlight.forEach(function (name) {
      sheet.getRange(1, COLUMNS.indexOf(name) + 1).setBackground('#FFC400');
    });
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var row = COLUMNS.map(function (c) {
      var v = data[c];
      return v === undefined || v === null ? '' : v;
    });
    getSheet_().appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action !== 'board') return json_({ ok: true });

  var sheet = getSheet_();
  var last = sheet.getLastRow();
  var counts = {};
  if (last > 1) {
    var sectorCol = COLUMNS.indexOf('Sector') + 1;
    var charCol = COLUMNS.indexOf('Personaje') + 1;
    var sectors = sheet.getRange(2, sectorCol, last - 1, 1).getValues();
    var chars = sheet.getRange(2, charCol, last - 1, 1).getValues();
    for (var i = 0; i < sectors.length; i++) {
      var s = sectors[i][0];
      var c = chars[i][0];
      if (!s || !c) continue;
      counts[s] = counts[s] || {};
      counts[s][c] = (counts[s][c] || 0) + 1;
    }
  }
  return json_({ ok: true, counts: counts, total: Math.max(0, last - 1) });
}
