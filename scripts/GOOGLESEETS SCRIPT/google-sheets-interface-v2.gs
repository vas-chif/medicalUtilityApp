/**
 * @file google-sheets-interface.gs
 * @description Google Apps Script per interfaccia inserimento compatibilità farmaci
 * @author Vasile Chifeac
 * @version 2.0.0 - Aggiornato per nuove colonne: NECESSITÀ DI CVC, NOTES/CONCENTRAZIONI, NOTO RISCHIO FLEBITE
 *
 * INSTALLAZIONE:
 * 1. Apri Google Sheets: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k
 * 2. Estensioni → Apps Script
 * 3. Copia e incolla questo codice
 * 4. Salva (Ctrl+S)
 * 5. Aggiorna Google Sheets
 * 6. Nuovo menu "Compatibilità Farmaci" apparirà
 *
 * CHANGELOG v2.0.0:
 * - ✅ Supporto colonna "NECESSITÀ DI CVC" (sostituisce "VIA CENTRALE / PERIFERICA")
 * - ✅ Supporto colonna "NOTES/CONCENTRAZIONI"
 * - ✅ Supporto colonna "NOTO RISCHIO FLEBITE"
 * - ✅ Inserimento alfabetico farmaci preserva TUTTE le compatibilità
 * - ✅ Performance ottimizzate (batch operations)
 */

// =============================================================================
// 🔧 CONFIGURAZIONE COLONNE SPECIALI
// =============================================================================

/**
 * Lista colonne speciali da ESCLUDERE dalla matrice compatibilità
 * AGGIORNATO per nuove colonne
 */
const SPECIAL_COLUMNS = [
  'PRINCIPIO ATTIVO',
  'FOTOSENSIBILE',
  'NECESSITÀ DI CVC', // ← NUOVO (sostituisce VIA CENTRALE/PERIFERICA)
  'NOTES/CONCENTRAZIONI', // ← NUOVO
  'NOTO RISCHIO FLEBITE', // ← NUOVO
  'VIA CENTRALE', // ← LEGACY (se ancora presente)
  'PERIFERICA', // ← LEGACY
  'VIA CENTRALE / PERIFERICA', // ← LEGACY
];

/**
 * Pattern regex per identificare colonne speciali
 */
const SPECIAL_COLUMN_PATTERNS = [
  /FOTOSENS/i,
  /VIA CENTRAL/i,
  /PERIFERICA/i,
  /NECESSIT.*CVC/i, // ← NUOVO pattern
  /NOTO.*CONCENTR/i, // ← NUOVO pattern
  /RISCHIO.*FLEBIT/i, // ← NUOVO pattern
];

/**
 * Verifica se una colonna è speciale (non farmaco)
 */
function isSpecialColumn(columnName) {
  if (!columnName || columnName.toString().trim() === '') return false;

  const name = columnName.toString().trim().toUpperCase();

  // Check exact match
  if (SPECIAL_COLUMNS.includes(name)) return true;

  // Check pattern match
  return SPECIAL_COLUMN_PATTERNS.some((pattern) => pattern.test(name));
}

// =============================================================================
// 🎨 MENU PERSONALIZZATO
// =============================================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('💊 Compatibilità Farmaci')
    .addItem('⚡ Inserimento RAPIDO (Bulk)', 'showBulkCompatibilityDialog')
    .addItem('📝 Inserisci Compatibilità Singola', 'showCompatibilityDialog')
    .addSeparator()
    .addItem('➕ Aggiungi Nuovo Farmaco', 'showAddDrugDialog')
    .addSeparator()
    .addItem('🔄 Riordina Alfabeticamente', 'sortDrugsAlphabetically')
    .addItem('✅ Valida Tabella', 'validateTable')
    .addItem('📊 Genera Matrice', 'generateMatrix')
    .addItem('📥 Esporta JSON', 'exportToJSON')
    .addSeparator()
    .addItem('💾 Crea Backup Manuale', 'createManualBackup')
    .addItem('📖 Legenda Codici', 'showLegend')
    .addToUi();
}

// =============================================================================
// 📊 FUNZIONI DATI (AGGIORNATE)
// =============================================================================

/**
 * Ottieni lista farmaci dal foglio
 * @param {boolean} preserveOrder - Se true, mantiene l'ordine originale (default: false = ordina)
 */
function getDrugsList(preserveOrder = false) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return [];

  const drugsRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const drugs = drugsRange
    .getValues()
    .map((row) => row[0])
    .filter((drug) => drug && drug.toString().trim() !== '');

  const uniqueDrugs = [...new Set(drugs)];

  // Se preserveOrder = true, restituisce ordine originale
  // Altrimenti ordina alfabeticamente
  return preserveOrder ? uniqueDrugs : uniqueDrugs.sort();
}

/**
 * Ottieni mappa farmaci → colonna dall'header
 * AGGIORNATO: Usa isSpecialColumn() per identificare colonne speciali
 */
function getDrugColumnMap() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  const headerValues = headerRange.getValues()[0];
  const drugColumnMap = {};

  for (let i = 0; i < headerValues.length; i++) {
    const cellValue = headerValues[i];
    if (!cellValue || cellValue.toString().trim() === '') continue;

    const columnName = cellValue.toString().trim();

    // Skip se colonna speciale
    if (isSpecialColumn(columnName)) continue;

    drugColumnMap[columnName] = i + 1; // +1 per 1-based indexing
  }

  return drugColumnMap;
}

/**
 * Ottieni mappa farmaci → riga dalla colonna A
 */
function getDrugRowMap() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return {};

  const drugsRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const drugs = drugsRange.getValues();
  const drugRowMap = {};

  for (let i = 0; i < drugs.length; i++) {
    const drugName = drugs[i][0];
    if (drugName && drugName.toString().trim() !== '') {
      drugRowMap[drugName.toString().trim()] = i + 2;
    }
  }

  return drugRowMap;
}

/**
 * Trova la prima colonna dei farmaci (dopo tutte le colonne speciali)
 * AGGIORNATO: Cerca l'ULTIMA colonna speciale, farmaci iniziano DOPO
 */
function getFirstDrugColumn() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  let lastSpecialCol = 0;

  for (let i = 0; i < headerRow.length; i++) {
    const cellValue = headerRow[i];
    if (cellValue && isSpecialColumn(cellValue.toString().trim())) {
      lastSpecialCol = i + 1; // i è 0-based, colonna è 1-based
    }
  }

  // Farmaci iniziano DOPO l'ultima colonna speciale
  // Default: colonna D (4) se non trova colonne speciali
  return lastSpecialCol > 0 ? lastSpecialCol + 1 : 4;
}

// =============================================================================
// ➕ AGGIUNGI NUOVO FARMACO (VERSIONE CORRETTA E OTTIMIZZATA)
// =============================================================================

/**
 * Aggiunge un nuovo farmaco in ordine alfabetico PRESERVANDO tutti i dati
 * VERSIONE 2.0: Gestisce correttamente le nuove colonne speciali
 * @param {string} newDrugName - Nome del farmaco da aggiungere
 * @param {Object} options - Opzioni: { skipValidation: boolean }
 */
function addNewDrugInAlphabeticalOrder(newDrugName, options = {}) {
  const { skipValidation = false } = options;
  const startTime = new Date().getTime();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 0. CREA BACKUP AUTOMATICO
  try {
    createAutoBackup('Aggiungi Farmaco');
    Logger.log('✅ Backup automatico creato prima di aggiungere farmaco');
  } catch (error) {
    Logger.log('⚠️ Impossibile creare backup: ' + error.message);
  }

  // 1. VALIDAZIONE
  if (!newDrugName || newDrugName.trim() === '') {
    throw new Error('Nome farmaco non valido');
  }
  newDrugName = newDrugName.trim().toUpperCase();

  const existingDrugs = getDrugsList();
  if (existingDrugs.includes(newDrugName)) {
    throw new Error(`Il farmaco "${newDrugName}" esiste già nella tabella`);
  }

  // 2. TROVA POSIZIONE ALFABETICA
  const allDrugs = [...existingDrugs, newDrugName].sort();
  const newDrugIndex = allDrugs.indexOf(newDrugName);

  // 3. BACKUP COMPATIBILITÀ ESISTENTI (BATCH READ)
  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();
  const firstDrugCol = getFirstDrugColumn();
  const firstDrugRow = 2; // Riga header = 1, farmaci iniziano da 2

  if (Object.keys(drugColumnMap).length === 0 || Object.keys(drugRowMap).length === 0) {
    throw new Error('Nessun farmaco trovato nella tabella. Genera prima la matrice!');
  }

  const lastDrugRow = Math.max(...Object.values(drugRowMap));
  const lastDrugCol = Math.max(...Object.values(drugColumnMap));

  // Leggi TUTTI i dati in una volta (performance)
  const dataRange = sheet.getRange(
    firstDrugRow,
    firstDrugCol,
    lastDrugRow - firstDrugRow + 1,
    lastDrugCol - firstDrugCol + 1,
  );

  const values = dataRange.getValues();
  const backgrounds = dataRange.getBackgrounds();
  const fontColors = dataRange.getFontColors();
  const fontWeights = dataRange.getFontWeights();

  // Crea backup strutturato
  const compatibilityBackup = {};

  for (let i = 0; i < existingDrugs.length; i++) {
    const drug1 = existingDrugs[i];
    if (!drugRowMap[drug1] || !drugColumnMap[drug1]) continue;

    compatibilityBackup[drug1] = {};

    for (let j = 0; j < existingDrugs.length; j++) {
      const drug2 = existingDrugs[j];
      if (!drugRowMap[drug2] || !drugColumnMap[drug2]) continue;

      const rowIndex = drugRowMap[drug1] - firstDrugRow;
      const colIndex = drugColumnMap[drug2] - firstDrugCol;

      if (
        rowIndex < 0 ||
        colIndex < 0 ||
        rowIndex >= values.length ||
        colIndex >= values[0].length
      ) {
        continue;
      }

      const value = values[rowIndex][colIndex];

      if (value && value.toString().trim() !== '') {
        compatibilityBackup[drug1][drug2] = {
          value: value,
          background: backgrounds[rowIndex][colIndex],
          fontColor: fontColors[rowIndex][colIndex],
          fontWeight: fontWeights[rowIndex][colIndex],
        };
      }
    }
  }

  Logger.log(
    `✅ Backup completato: ${Object.keys(compatibilityBackup).length} farmaci, ${Object.values(compatibilityBackup).reduce((sum, obj) => sum + Object.keys(obj).length, 0)} compatibilità`,
  );

  // 4. CALCOLA NUOVE POSIZIONI
  const newRow = newDrugIndex + 2; // +2 per header (riga 1)
  const newCol = firstDrugCol + newDrugIndex;

  Logger.log(
    `📍 Nuovo farmaco "${newDrugName}" inserito in posizione ${newDrugIndex + 1}/${allDrugs.length}`,
  );
  Logger.log(`   → Riga: ${newRow}, Colonna: ${newCol}`);

  // 5. INSERISCI RIGA E COLONNA
  sheet.insertRowBefore(newRow);
  sheet.insertColumnBefore(newCol);

  // 6. PULISCI NUOVA RIGA E COLONNA (rimuove formattazione copiata)
  const lastCol = sheet.getLastColumn();
  const lastRow = sheet.getLastRow();

  // Pulisci nuova riga (dalle colonne farmaci in poi)
  if (lastCol >= firstDrugCol) {
    const newRowRange = sheet.getRange(newRow, firstDrugCol, 1, lastCol - firstDrugCol + 1);
    newRowRange.clearContent();
    newRowRange.setBackground(null);
    newRowRange.setFontColor(null);
    newRowRange.setFontWeight('normal');
  }

  // Pulisci nuova colonna (dalle righe farmaci in poi)
  if (lastRow >= firstDrugRow) {
    const newColRange = sheet.getRange(firstDrugRow, newCol, lastRow - firstDrugRow + 1, 1);
    newColRange.clearContent();
    newColRange.setBackground(null);
    newColRange.setFontColor(null);
    newColRange.setFontWeight('normal');
  }

  // 7. SCRIVI HEADER
  sheet
    .getRange(1, newCol)
    .setValue(newDrugName)
    .setFontWeight('bold')
    .setBackground('#1976d2')
    .setFontColor('white')
    .setHorizontalAlignment('center');

  sheet
    .getRange(newRow, 1)
    .setValue(newDrugName)
    .setFontWeight('bold')
    .setBackground('#1976d2')
    .setFontColor('white');

  // 8. RICOSTRUISCI MAPPE AGGIORNATE
  const newDrugColumnMap = getDrugColumnMap();
  const newDrugRowMap = getDrugRowMap();

  Logger.log(
    `🔄 Mappe aggiornate: ${Object.keys(newDrugRowMap).length} righe, ${Object.keys(newDrugColumnMap).length} colonne`,
  );

  // 9. RIPRISTINA COMPATIBILITÀ (BATCH WRITE)
  let restoredCount = 0;
  const cellUpdates = [];

  for (const drug1 of Object.keys(compatibilityBackup)) {
    for (const drug2 of Object.keys(compatibilityBackup[drug1])) {
      if (newDrugRowMap[drug1] && newDrugColumnMap[drug2]) {
        const row = newDrugRowMap[drug1];
        const col = newDrugColumnMap[drug2];
        const data = compatibilityBackup[drug1][drug2];

        cellUpdates.push({
          row: row,
          col: col,
          value: data.value,
          background: data.background,
          fontColor: data.fontColor,
          fontWeight: data.fontWeight,
        });

        restoredCount++;
      }
    }
  }

  // Applica aggiornamenti in batch
  cellUpdates.forEach((update) => {
    const cell = sheet.getRange(update.row, update.col);
    cell.setValue(update.value);
    cell.setBackground(update.background);
    cell.setFontColor(update.fontColor);
    cell.setFontWeight(update.fontWeight);
    cell.setHorizontalAlignment('center');
  });

  Logger.log(`✅ Ripristinate ${restoredCount} compatibilità`);

  // 10. RIEMPIE CELLE DIAGONALI (stesso farmaco) con "null" grigio
  for (const drug of allDrugs) {
    if (newDrugRowMap[drug] && newDrugColumnMap[drug]) {
      const row = newDrugRowMap[drug];
      const col = newDrugColumnMap[drug];
      const cell = sheet.getRange(row, col);
      cell.setValue('null');
      cell.setBackground('#e0e0e0');
      cell.setFontColor('#757575');
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
    }
  }

  // 11. VALIDAZIONE POST-MODIFICA (se non saltata)
  if (!skipValidation) {
    Logger.log(`🔍 Inizio validazione contro backup...`);

    // Trova nome ultimo backup creato
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const backupSheets = ss
      .getSheets()
      .filter((s) => s.getName().startsWith('Backup_') && s.getName().includes('Aggiungi Farmaco'))
      .sort((a, b) => b.getName().localeCompare(a.getName()));

    if (backupSheets.length > 0) {
      const lastBackupName = backupSheets[0].getName();
      const validationResult = validateChangesAgainstBackup(lastBackupName, [newDrugName]);

      if (!validationResult.valid) {
        Logger.log(`⚠️ VALIDAZIONE FALLITA: ${validationResult.errors.length} errori`);

        // Log errori dettagliati
        validationResult.errors.forEach((err) => Logger.log(err));

        return {
          success: false,
          message:
            `⚠️ Farmaco aggiunto MA trovate ${validationResult.errors.length} discrepanze!\n\n` +
            `Primi errori:\n${validationResult.errors.slice(0, 3).join('\n')}\n\n` +
            `Controlla il backup: "${lastBackupName}"`,
          validationErrors: validationResult.errors,
        };
      } else {
        Logger.log(
          `✅ Validazione superata: ${validationResult.stats.compatibilityPreserved} compatibilità preservate`,
        );
      }
    }
  } else {
    Logger.log('⚠️ Validazione saltata per scelta utente');
  }

  const endTime = new Date().getTime();
  const executionTime = ((endTime - startTime) / 1000).toFixed(2);

  const validationMsg = skipValidation ? '⚠️ Saltata' : '✅ OK';

  return {
    success: true,
    message:
      `✅ Farmaco "${newDrugName}" aggiunto in posizione ${newDrugIndex + 1}/${allDrugs.length}.\n\n` +
      `📊 Compatibilità preservate: ${restoredCount}\n` +
      `🔍 Validazione: ${validationMsg}\n` +
      `⏱️ Tempo: ${executionTime}s`,
  };
}

// =============================================================================
// ⚡ BULK COMPATIBILITY DIALOG
// =============================================================================

function showBulkCompatibilityDialog() {
  const html = HtmlService.createHtmlOutput(getBulkDialogHTML()).setWidth(1200).setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, '⚡ Inserimento RAPIDO Compatibilità (Bulk Mode)');
}

function getBulkDialogHTML() {
  const drugs = getDrugsList();
  const drugsJSON = JSON.stringify(drugs);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_top">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            background: #f5f5f5;
            margin: 0;
          }
          .main-container {
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 20px;
            height: calc(100vh - 40px);
          }
          .left-panel {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow-y: auto;
          }
          .right-panel {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow-y: auto;
          }
          h2 {
            color: #1976d2;
            margin-top: 0;
            font-size: 18px;
          }
          .search-box {
            position: relative;
            margin-bottom: 15px;
          }
          .search-input {
            width: 100%;
            padding: 10px;
            border: 2px solid #1976d2;
            border-radius: 6px;
            font-size: 16px;
          }
          .search-input:focus {
            outline: none;
            border-color: #0d47a1;
            box-shadow: 0 0 5px rgba(25,118,210,0.3);
          }
          .drug-list {
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .drug-item {
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            transition: all 0.2s;
          }
          .drug-item:hover {
            background: #e3f2fd;
          }
          .drug-item.selected {
            background: #1976d2;
            color: white;
            font-weight: bold;
          }
          .drug-item.hidden {
            display: none;
          }
          .compatibility-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 10px;
            margin-bottom: 10px;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 4px;
            align-items: center;
          }
          .compatibility-grid.hidden {
            display: none;
          }
          .drug-name {
            font-weight: 500;
            color: #333;
          }
          .compat-buttons {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 5px;
          }
          .compat-mini-btn {
            padding: 8px;
            border: 2px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            font-weight: bold;
            transition: all 0.2s;
            font-size: 12px;
          }
          .compat-mini-btn:hover {
            transform: scale(1.05);
          }
          .compat-mini-btn.selected {
            border-width: 3px;
          }
          .compat-C { border-color: #4caf50; background: #e8f5e9; }
          .compat-C.selected { background: #4caf50; color: white; }
          .compat-Y { border-color: #ff9800; background: #fff3e0; }
          .compat-Y.selected { background: #ff9800; color: white; }
          .compat-I { border-color: #f44336; background: #ffebee; }
          .compat-I.selected { background: #f44336; color: white; }
          .compat-! { border-color: #fbc02d; background: #fffde7; }
          .compat-!.selected { background: #fbc02d; color: white; }
          .compat-X { border-color: #9e9e9e; background: #f5f5f5; }
          .compat-X.selected { background: #9e9e9e; color: white; }
          .stats {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: center;
          }
          .stats-number {
            font-size: 24px;
            font-weight: bold;
            color: #1976d2;
          }
          .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
            font-weight: bold;
          }
          .btn-primary {
            background: #1976d2;
            color: white;
          }
          .btn-primary:hover {
            background: #1565c0;
          }
          .btn-primary:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
          .btn-secondary {
            background: #757575;
            color: white;
          }
          .legend {
            background: #fff3cd;
            padding: 10px;
            border-radius: 4px;
            margin-top: 15px;
            font-size: 11px;
          }
          .status {
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
            display: none;
          }
          .status.success {
            background: #c8e6c9;
            color: #2e7d32;
            display: block;
          }
          .status.error {
            background: #ffcdd2;
            color: #c62828;
            display: block;
          }
          .progress-bar {
            width: 100%;
            height: 20px;
            background: #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 10px;
          }
          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4caf50, #8bc34a);
            width: 0%;
            transition: width 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="left-panel">
            <h2>📋 1. Seleziona Farmaco Base</h2>
            
            <div class="search-box">
              <input 
                type="text" 
                id="drugSearch" 
                class="search-input" 
                placeholder="🔍 Cerca farmaco..."
                autocomplete="off"
              />
            </div>
            
            <div class="drug-list" id="drugList"></div>
            
            <div class="legend">
              <strong>📌 Come usare:</strong><br>
              1. Cerca/seleziona farmaco base<br>
              2. Imposta compatibilità nella lista a destra<br>
              3. Salva tutto in una volta!
            </div>
          </div>
          
          <div class="right-panel">
            <h2>⚡ 2. Imposta Compatibilità</h2>
            
            <div class="stats">
              <div>Farmaco selezionato: <strong id="selectedDrugName">Nessuno</strong></div>
              <div class="stats-number" id="compatCount">0 / 0</div>
              <div class="progress-bar">
                <div class="progress-fill" id="progressBar">0%</div>
              </div>
            </div>
            
            <div class="search-box" id="compatSearchBox" style="display: none;">
              <input 
                type="text" 
                id="compatSearch" 
                class="search-input" 
                placeholder="🔍 Cerca farmaco nella lista..."
                autocomplete="off"
              />
            </div>
            
            <div id="compatibilityList">
              <p style="text-align: center; color: #999; padding: 50px 0;">
                👈 Seleziona un farmaco dalla lista a sinistra
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <button class="btn btn-primary" id="saveBtn" onclick="saveBulkCompatibility()" disabled>
                💾 Salva Tutte le Compatibilità
              </button>
              <button class="btn btn-secondary" onclick="google.script.host.close()">
                ❌ Annulla
              </button>
            </div>
            
            <div id="status" class="status"></div>
          </div>
        </div>
        
        <script>
          const allDrugs = ${drugsJSON};
          let selectedDrug = null;
          const compatibilityData = {};
          
          function initDrugList() {
            const drugList = document.getElementById('drugList');
            drugList.innerHTML = allDrugs.map(drug => 
              \`<div class="drug-item" data-drug="\${drug}" onclick="selectDrug('\${drug}')">
                \${drug}
              </div>\`
            ).join('');
          }
          
          document.getElementById('drugSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.drug-item');
            
            items.forEach(item => {
              const drugName = item.getAttribute('data-drug').toLowerCase();
              if (drugName.includes(searchTerm)) {
                item.classList.remove('hidden');
              } else {
                item.classList.add('hidden');
              }
            });
          });
          
          document.getElementById('compatSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.compatibility-grid');
            
            items.forEach(item => {
              const drugName = item.getAttribute('data-compat-drug').toLowerCase();
              if (drugName.includes(searchTerm)) {
                item.classList.remove('hidden');
              } else {
                item.classList.add('hidden');
              }
            });
          });
          
          function selectDrug(drugName) {
            selectedDrug = drugName;
            
            document.querySelectorAll('.drug-item').forEach(item => {
              item.classList.remove('selected');
            });
            document.querySelector(\`[data-drug="\${drugName}"]\`).classList.add('selected');
            
            document.getElementById('selectedDrugName').textContent = drugName;
            document.getElementById('saveBtn').disabled = false;
            
            loadCompatibilityList();
          }
          
          function loadCompatibilityList() {
            const otherDrugs = allDrugs.filter(d => d !== selectedDrug);
            const listHTML = otherDrugs.map(drug => \`
              <div class="compatibility-grid" data-compat-drug="\${drug}">
                <div class="drug-name">\${drug}</div>
                <div class="compat-buttons">
                  <div class="compat-mini-btn compat-C" onclick="setCompatibility('\${drug}', 'C')">C</div>
                  <div class="compat-mini-btn compat-Y" onclick="setCompatibility('\${drug}', 'Y')">Y</div>
                  <div class="compat-mini-btn compat-I" onclick="setCompatibility('\${drug}', 'I')">I</div>
                  <div class="compat-mini-btn compat-!" onclick="setCompatibility('\${drug}', '!')">!</div>
                  <div class="compat-mini-btn compat-X" onclick="setCompatibility('\${drug}', '')">-</div>
                </div>
              </div>
            \`).join('');
            
            document.getElementById('compatibilityList').innerHTML = listHTML;
            document.getElementById('compatSearchBox').style.display = 'block';
            document.getElementById('compatSearch').value = '';
            updateStats();
          }
          
          function setCompatibility(drug, value) {
            if (!selectedDrug) return;
            
            compatibilityData[drug] = value;
            
            const grid = event.target.closest('.compatibility-grid');
            grid.querySelectorAll('.compat-mini-btn').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            if (value) {
              event.target.classList.add('selected');
            } else {
              event.target.classList.add('selected');
            }
            
            updateStats();
          }
          
          function updateStats() {
            const total = allDrugs.length - 1;
            const filled = Object.keys(compatibilityData).filter(k => compatibilityData[k]).length;
            const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;
            
            document.getElementById('compatCount').textContent = \`\${filled} / \${total}\`;
            document.getElementById('progressBar').style.width = percentage + '%';
            document.getElementById('progressBar').textContent = percentage + '%';
          }
          
          function saveBulkCompatibility() {
            if (!selectedDrug) {
              showStatus('Seleziona un farmaco!', 'error');
              return;
            }
            
            const dataToSave = {
              baseDrug: selectedDrug,
              compatibilities: compatibilityData
            };
            
            showStatus('Salvataggio in corso...', 'success');
            document.getElementById('saveBtn').disabled = true;
            
            google.script.run
              .withSuccessHandler(onSaveSuccess)
              .withFailureHandler(onSaveError)
              .saveBulkCompatibilityData(dataToSave);
          }
          
          function onSaveSuccess(result) {
            showStatus(\`✅ \${result.message} (\${result.saved} compatibilità salvate)\`, 'success');
            
            compatibilityData = {};
            selectedDrug = null;
            document.getElementById('selectedDrugName').textContent = 'Nessuno';
            document.getElementById('saveBtn').disabled = true;
            document.getElementById('compatibilityList').innerHTML = '<p style="text-align: center; color: #999; padding: 50px 0;">👈 Seleziona un farmaco dalla lista a sinistra</p>';
            document.querySelectorAll('.drug-item').forEach(item => item.classList.remove('selected'));
            updateStats();
          }
          
          function onSaveError(error) {
            showStatus('❌ Errore: ' + error.message, 'error');
            document.getElementById('saveBtn').disabled = false;
          }
          
          function showStatus(message, type) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = 'status ' + type;
            
            if (type === 'success') {
              setTimeout(() => {
                status.style.display = 'none';
              }, 5000);
            }
          }
          
          initDrugList();
        </script>
      </body>
    </html>
  `;
}

function saveBulkCompatibilityData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const { baseDrug, compatibilities } = data;

  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();

  if (!drugRowMap[baseDrug] || !drugColumnMap[baseDrug]) {
    throw new Error(`Farmaco base "${baseDrug}" non trovato nella tabella`);
  }

  const baseDrugRow = drugRowMap[baseDrug];
  const baseDrugCol = drugColumnMap[baseDrug];

  let savedCount = 0;

  for (const [targetDrug, compatibility] of Object.entries(compatibilities)) {
    if (!drugRowMap[targetDrug] || !drugColumnMap[targetDrug]) continue;

    const targetDrugRow = drugRowMap[targetDrug];
    const targetDrugCol = drugColumnMap[targetDrug];

    const cell1 = sheet.getRange(baseDrugRow, targetDrugCol);
    if (compatibility !== '') {
      cell1.setValue(compatibility);
      applyCellFormatting(cell1, compatibility);
    } else {
      applyCellFormatting(cell1, '');
    }

    const cell2 = sheet.getRange(targetDrugRow, baseDrugCol);
    if (compatibility !== '') {
      cell2.setValue(compatibility);
      applyCellFormatting(cell2, compatibility);
    } else {
      applyCellFormatting(cell2, '');
    }

    savedCount++;
  }

  const diagonalCell = sheet.getRange(baseDrugRow, baseDrugCol);
  diagonalCell.setValue('null');
  diagonalCell.setBackground('#e0e0e0');
  diagonalCell.setFontColor('#757575');
  diagonalCell.setHorizontalAlignment('center');
  diagonalCell.setFontWeight('bold');

  return {
    success: true,
    message: `Compatibilità salvate per ${baseDrug}`,
    saved: savedCount,
  };
}

function applyCellFormatting(cell, value) {
  switch (value) {
    case 'C':
      cell.setBackground('#c8e6c9');
      cell.setFontColor('#2e7d32');
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    case 'Y':
      cell.setBackground('#ffe0b2');
      cell.setFontColor('#e65100');
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    case 'I':
      cell.setBackground('#ffcdd2');
      cell.setFontColor('#c62828');
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    case '!':
      cell.setBackground('#fff9c4');
      cell.setFontColor('#f57f17');
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    default:
      cell.clearContent();
      cell.setBackground(null);
      cell.setFontColor(null);
      cell.setFontWeight('normal');
      break;
  }
}

// =============================================================================
// 📝 SINGLE COMPATIBILITY DIALOG
// =============================================================================

function showCompatibilityDialog() {
  const html = HtmlService.createHtmlOutput(getDialogHTML()).setWidth(600).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, '💊 Inserimento Compatibilità Farmaci');
}

function getDialogHTML() {
  const drugs = getDrugsList();
  const drugsOptions = drugs.map((drug) => `<option value="${drug}">${drug}</option>`).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_top">
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f5f5f5; }
          .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          h2 { color: #1976d2; margin-top: 0; }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
          select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
          .compatibility-buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 15px 0; }
          .compat-btn { padding: 15px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; text-align: center; transition: all 0.3s; background: white; }
          .compat-btn:hover { transform: scale(1.05); }
          .compat-btn.selected { border-width: 3px; }
          .compat-C { border-color: #4caf50; background: #e8f5e9; }
          .compat-C.selected { background: #4caf50; color: white; }
          .compat-Y { border-color: #ff9800; background: #fff3e0; }
          .compat-Y.selected { background: #ff9800; color: white; }
          .compat-I { border-color: #f44336; background: #ffebee; }
          .compat-I.selected { background: #f44336; color: white; }
          .compat-! { border-color: #fbc02d; background: #fffde7; }
          .compat-!.selected { background: #fbc02d; color: white; }
          .btn { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; margin-right: 10px; }
          .btn-primary { background: #1976d2; color: white; }
          .btn-secondary { background: #757575; color: white; }
          .status { margin-top: 15px; padding: 10px; border-radius: 4px; display: none; }
          .status.success { background: #c8e6c9; color: #2e7d32; }
          .status.error { background: #ffcdd2; color: #c62828; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>💊 Inserisci Compatibilità</h2>
          
          <div class="form-group">
            <label>Farmaco 1:</label>
            <select id="drug1">
              <option value="">-- Seleziona Farmaco --</option>
              ${drugsOptions}
            </select>
          </div>
          
          <div class="form-group">
            <label>Farmaco 2:</label>
            <select id="drug2">
              <option value="">-- Seleziona Farmaco --</option>
              ${drugsOptions}
            </select>
          </div>
          
          <div class="form-group">
            <label>Compatibilità:</label>
            <div class="compatibility-buttons">
              <div class="compat-btn compat-C" onclick="selectCompatibility('C')">
                <div style="font-size: 24px;">✅</div>
                <div><strong>C</strong></div>
                <div style="font-size: 11px;">Compatibile</div>
              </div>
              <div class="compat-btn compat-Y" onclick="selectCompatibility('Y')">
                <div style="font-size: 24px;">⚠️</div>
                <div><strong>Y</strong></div>
                <div style="font-size: 11px;">Y-site</div>
              </div>
              <div class="compat-btn compat-I" onclick="selectCompatibility('I')">
                <div style="font-size: 24px;">❌</div>
                <div><strong>I</strong></div>
                <div style="font-size: 11px;">Incompatibile</div>
              </div>
              <div class="compat-btn compat-!" onclick="selectCompatibility('!')">
                <div style="font-size: 24px;">⚡</div>
                <div><strong>!</strong></div>
                <div style="font-size: 11px;">Dati contrastanti</div>
              </div>
            </div>
            <input type="hidden" id="compatibility" value="">
          </div>
          
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="saveCompatibility()">💾 Salva Compatibilità</button>
            <button class="btn btn-secondary" onclick="google.script.host.close()">❌ Annulla</button>
          </div>
          
          <div id="status" class="status"></div>
        </div>
        
        <script>
          let selectedCompatibility = '';
          
          function selectCompatibility(value) {
            selectedCompatibility = value;
            document.getElementById('compatibility').value = value;
            
            document.querySelectorAll('.compat-btn').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            if (value) {
              document.querySelector(\`.compat-\${value}\`).classList.add('selected');
            }
          }
          
          function saveCompatibility() {
            const drug1 = document.getElementById('drug1').value;
            const drug2 = document.getElementById('drug2').value;
            const compatibility = selectedCompatibility;
            
            if (!drug1 || !drug2) {
              showStatus('Seleziona entrambi i farmaci!', 'error');
              return;
            }
            
            if (drug1 === drug2) {
              showStatus('I due farmaci devono essere diversi!', 'error');
              return;
            }
            
            showStatus('Salvataggio in corso...', 'success');
            
            google.script.run
              .withSuccessHandler(onSaveSuccess)
              .withFailureHandler(onSaveError)
              .saveCompatibilityData({
                drug1: drug1,
                drug2: drug2,
                compatibility: compatibility
              });
          }
          
          function onSaveSuccess(result) {
            showStatus('✅ Compatibilità salvata con successo!', 'success');
            setTimeout(() => {
              google.script.host.close();
            }, 1500);
          }
          
          function onSaveError(error) {
            showStatus('❌ Errore: ' + error.message, 'error');
          }
          
          function showStatus(message, type) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = 'status ' + type;
            status.style.display = 'block';
          }
        </script>
      </body>
    </html>
  `;
}

function saveCompatibilityData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const { drug1, drug2, compatibility } = data;

  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();

  if (!drugRowMap[drug1] || !drugColumnMap[drug1]) {
    throw new Error(`Farmaco "${drug1}" non trovato nella tabella`);
  }

  if (!drugRowMap[drug2] || !drugColumnMap[drug2]) {
    throw new Error(`Farmaco "${drug2}" non trovato nella tabella`);
  }

  const drug1Row = drugRowMap[drug1];
  const drug1Col = drugColumnMap[drug1];
  const drug2Row = drugRowMap[drug2];
  const drug2Col = drugColumnMap[drug2];

  const cell1 = sheet.getRange(drug1Row, drug2Col);
  cell1.setValue(compatibility || '');
  applyCellFormatting(cell1, compatibility);

  const cell2 = sheet.getRange(drug2Row, drug1Col);
  cell2.setValue(compatibility || '');
  applyCellFormatting(cell2, compatibility);

  return { success: true, message: 'Dati salvati' };
}

// =============================================================================
// ➕ ADD NEW DRUG DIALOG
// =============================================================================

function showAddDrugDialog() {
  const html = HtmlService.createHtmlOutput(getAddDrugDialogHTML()).setWidth(500).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, '➕ Aggiungi Nuovo Farmaco');
}

function getAddDrugDialogHTML() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_top">
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f5f5f5; }
          .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          h2 { color: #1976d2; margin-top: 0; }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
          input { width: 100%; padding: 10px; border: 2px solid #1976d2; border-radius: 6px; font-size: 16px; }
          .btn { padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-right: 10px; font-weight: bold; }
          .btn-primary { background: #1976d2; color: white; }
          .btn-secondary { background: #757575; color: white; }
          .info { background: #e3f2fd; padding: 10px; border-radius: 4px; margin-top: 15px; font-size: 12px; color: #1976d2; }
          .status { margin-top: 15px; padding: 10px; border-radius: 4px; display: none; }
          .status.success { background: #c8e6c9; color: #2e7d32; }
          .status.error { background: #ffcdd2; color: #c62828; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>➕ Aggiungi Nuovo Farmaco</h2>
          
          <div class="form-group">
            <label>Nome Farmaco (MAIUSCOLO):</label>
            <input 
              type="text" 
              id="drugName" 
              placeholder="es. ACIDO ACETILSALICILICO"
              autocomplete="off"
            />
          </div>
          
          <div class="info">
            <strong>ℹ️ Come funziona:</strong><br>
            Il farmaco sarà inserito automaticamente in ordine alfabetico sia nella colonna A che nella riga 1.<br>
            Tutti i dati esistenti saranno preservati e riorganizzati correttamente.
          </div>
          
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="addNewDrug()">➕ Aggiungi Farmaco</button>
            <button class="btn btn-secondary" onclick="google.script.host.close()">❌ Annulla</button>
          </div>
          
          <div id="status" class="status"></div>
        </div>
        
        <script>
          function addNewDrug() {
            const drugName = document.getElementById('drugName').value.trim().toUpperCase();
            
            if (!drugName) {
              showStatus('Inserisci il nome del farmaco!', 'error');
              return;
            }
            
            showStatus('Aggiunta farmaco in corso...', 'success');
            
            google.script.run
              .withSuccessHandler(onAddSuccess)
              .withFailureHandler(onAddError)
              .addNewDrugInAlphabeticalOrder(drugName);
          }
          
          function onAddSuccess(result) {
            showStatus('✅ ' + result.message, 'success');
            setTimeout(() => {
              google.script.host.close();
            }, 2000);
          }
          
          function onAddError(error) {
            showStatus('❌ Errore: ' + error.message, 'error');
          }
          
          function showStatus(message, type) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = 'status ' + type;
            status.style.display = 'block';
          }
        </script>
      </body>
    </html>
  `;
}

// =============================================================================
// ✅ VALIDATE & GENERATE
// =============================================================================

function validateTable() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ui = SpreadsheetApp.getUi();

  const drugs = getDrugsList();
  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();
  const numDrugs = drugs.length;

  let errors = [];
  let warnings = [];
  let totalCells = 0;
  let filledCells = 0;

  for (let i = 0; i < numDrugs; i++) {
    const drug1 = drugs[i];

    if (!drugRowMap[drug1] || !drugColumnMap[drug1]) {
      warnings.push(`Farmaco "${drug1}" non trovato nella matrice`);
      continue;
    }

    for (let j = i + 1; j < numDrugs; j++) {
      const drug2 = drugs[j];

      if (!drugRowMap[drug2] || !drugColumnMap[drug2]) {
        warnings.push(`Farmaco "${drug2}" non trovato nella matrice`);
        continue;
      }

      totalCells++;

      const row1 = drugRowMap[drug1];
      const col2 = drugColumnMap[drug2];
      const row2 = drugRowMap[drug2];
      const col1 = drugColumnMap[drug1];

      const value1 = sheet.getRange(row1, col2).getValue();
      const value2 = sheet.getRange(row2, col1).getValue();

      if (value1) filledCells++;

      if (value1 !== value2) {
        errors.push(`Asimmetria: ${drug1} ↔ ${drug2} (${value1} vs ${value2})`);
      }

      if (value1 && !['C', 'Y', 'I', '!'].includes(value1.toString())) {
        warnings.push(`Valore non valido: ${drug1} ↔ ${drug2} = "${value1}"`);
      }
    }
  }

  const percentage = ((filledCells / totalCells) * 100).toFixed(1);

  let message = `📊 VALIDAZIONE TABELLA\n\n`;
  message += `Farmaci: ${numDrugs}\n`;
  message += `Compatibilità totali: ${totalCells}\n`;
  message += `Compatibilità compilate: ${filledCells} (${percentage}%)\n`;
  message += `Compatibilità mancanti: ${totalCells - filledCells}\n\n`;

  if (errors.length > 0) {
    message += `❌ ERRORI (${errors.length}):\n`;
    message += errors.slice(0, 10).join('\n');
    if (errors.length > 10) message += `\n... e altri ${errors.length - 10} errori`;
    message += '\n\n';
  }

  if (warnings.length > 0) {
    message += `⚠️ WARNING (${warnings.length}):\n`;
    message += warnings.slice(0, 10).join('\n');
    if (warnings.length > 10) message += `\n... e altri ${warnings.length - 10} warning`;
    message += '\n\n';
  }

  if (errors.length === 0 && warnings.length === 0) {
    message += `✅ Tabella valida!\n`;
  }

  ui.alert('Validazione Completata', message, ui.ButtonSet.OK);
}

function generateMatrix() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ui = SpreadsheetApp.getUi();

  const drugs = getDrugsList();

  if (drugs.length === 0) {
    ui.alert('Errore', 'Nessun farmaco trovato nella colonna A!', ui.ButtonSet.OK);
    return;
  }

  const firstDrugCol = getFirstDrugColumn();

  const response = ui.alert(
    'Genera Matrice',
    `Vuoi generare header per ${drugs.length} farmaci?\n\nHeader inizierà dalla colonna ${getColumnLetter(firstDrugCol)}`,
    ui.ButtonSet.YES_NO,
  );

  if (response !== ui.Button.YES) return;

  for (let i = 0; i < drugs.length; i++) {
    sheet.getRange(1, firstDrugCol + i).setValue(drugs[i]);
  }

  sheet
    .getRange(1, firstDrugCol, 1, drugs.length)
    .setFontWeight('bold')
    .setBackground('#1976d2')
    .setFontColor('white')
    .setHorizontalAlignment('center');

  sheet
    .getRange(1, 1, drugs.length + 1, 1)
    .setFontWeight('bold')
    .setBackground('#1976d2')
    .setFontColor('white');

  const drugRowMap = getDrugRowMap();
  const drugColumnMap = getDrugColumnMap();

  for (let i = 0; i < drugs.length; i++) {
    const drug = drugs[i];
    if (drugRowMap[drug] && drugColumnMap[drug]) {
      const row = drugRowMap[drug];
      const col = drugColumnMap[drug];
      const cell = sheet.getRange(row, col);
      cell.setValue('null');
      cell.setBackground('#e0e0e0');
      cell.setFontColor('#757575');
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
    }
  }

  ui.alert(
    'Successo',
    `Header matrice generato dalla colonna ${getColumnLetter(firstDrugCol)}!\n\nCelle diagonali riempite con "null" grigio.`,
    ui.ButtonSet.OK,
  );
}

function exportToJSON() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('Export JSON', 'Funzione di export JSON - da implementare', ui.ButtonSet.OK);
}

function showLegend() {
  const ui = SpreadsheetApp.getUi();

  const message = `
💊 LEGENDA CODICI COMPATIBILITÀ

✅ C = COMPATIBILE
   Sicuro mescolare in stessa siringa/sacca
   
⚠️ Y = Y-SITE COMPATIBLE
   Compatibile solo via Y-connector o stopcock
   NON mescolare direttamente
   
❌ I = INCOMPATIBILE
   NON mescolare MAI
   Rischio precipitazione/inattivazione
   
⚡ ! = DATI CONTRASTANTI
   Fonti bibliografiche discordanti
   Consultare farmacista
   
❓ (vuoto) = NESSUN DATO
   Informazione non disponibile
   Verificare con altre fonti
  `;

  ui.alert('Legenda Codici', message, ui.ButtonSet.OK);
}

function getColumnLetter(columnNumber) {
  let temp,
    letter = '';
  while (columnNumber > 0) {
    temp = (columnNumber - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    columnNumber = (columnNumber - temp - 1) / 26;
  }
  return letter;
}

// =============================================================================
// 💾 SISTEMA BACKUP AUTOMATICO
// =============================================================================

/**
 * Crea backup automatico prima di ogni modifica
 * @param {string} operationType - Tipo di operazione (es. "Aggiungi Farmaco", "Riordino")
 * @return {string} Nome del foglio di backup creato
 */
function createAutoBackup(operationType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getActiveSheet();

  // Formato: "Backup_2024-12-07_14-30-15_Aggiungi Farmaco"
  const now = new Date();
  const timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
  const backupName = `Backup_${timestamp}_${operationType}`;

  // Copia foglio corrente
  const backupSheet = sourceSheet.copyTo(ss);
  backupSheet.setName(backupName);

  // Sposta il backup alla fine
  ss.moveActiveSheet(ss.getNumSheets());

  // Aggiungi nota in cima al backup
  backupSheet
    .getRange(1, 1)
    .setNote(
      `BACKUP AUTOMATICO\n` +
        `Operazione: ${operationType}\n` +
        `Data: ${Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss')}\n` +
        `Foglio originale: ${sourceSheet.getName()}`,
    );

  // Proteggi il backup (sola lettura)
  const protection = backupSheet.protect();
  protection.setDescription(`Backup automatico - ${operationType}`);
  protection.setWarningOnly(true);

  Logger.log(`✅ Backup creato: ${backupName}`);

  return backupName;
}

/**
 * Crea backup manuale (chiamato dal menu)
 */
function createManualBackup() {
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    '💾 Crea Backup Manuale',
    'Vuoi creare un backup del foglio corrente?',
    ui.ButtonSet.YES_NO,
  );

  if (response !== ui.Button.YES) return;

  try {
    const backupName = createAutoBackup('Backup Manuale');
    ui.alert(
      '✅ Backup Creato',
      `Backup salvato con nome:\n"${backupName}"\n\nIl foglio è protetto per evitare modifiche accidentali.`,
      ui.ButtonSet.OK,
    );
  } catch (error) {
    ui.alert('❌ Errore', `Impossibile creare backup:\n${error.message}`, ui.ButtonSet.OK);
  }
}

/**
 * Pulisci backup vecchi (mantieni solo gli ultimi N)
 * @param {number} keepLast - Numero di backup da mantenere (default: 10)
 */
function cleanOldBackups(keepLast = 10) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();

  // Trova tutti i backup
  const backups = allSheets
    .filter((sheet) => sheet.getName().startsWith('Backup_'))
    .sort((a, b) => {
      // Ordina per nome (che contiene timestamp)
      return b.getName().localeCompare(a.getName());
    });

  // Elimina i backup oltre il limite
  if (backups.length > keepLast) {
    const toDelete = backups.slice(keepLast);
    toDelete.forEach((sheet) => {
      Logger.log(`🗑️ Eliminazione backup vecchio: ${sheet.getName()}`);
      ss.deleteSheet(sheet);
    });

    Logger.log(`✅ Eliminati ${toDelete.length} backup vecchi. Mantenuti ultimi ${keepLast}.`);
  }
}

/**
 * Valida modifiche confrontando foglio corrente con ultimo backup
 * Verifica che SOLO le modifiche intenzionali siano state applicate
 *
 * OTTIMIZZATO: Usa batch getValues() invece di chiamate singole per velocità
 *
 * @param {string} backupName - Nome del backup da confrontare
 * @param {Array<string>} expectedChanges - Array di farmaci che dovevano essere modificati
 * @param {Object} options - Opzioni validazione: { skipValidation: boolean, quickCheck: boolean }
 * @return {Object} Risultato validazione: { valid: boolean, errors: Array, warnings: Array, stats: Object }
 */
function validateChangesAgainstBackup(backupName, expectedChanges = [], options = {}) {
  const { skipValidation = false, quickCheck = false } = options;

  // Opzione per saltare completamente la validazione (per operazioni veloci)
  if (skipValidation) {
    Logger.log('⚠️ Validazione saltata per scelta utente');
    return {
      valid: true,
      skipped: true,
      errors: [],
      warnings: ['⚠️ Validazione disabilitata'],
      stats: { totalCellsChecked: 0, cellsChanged: 0, unexpectedChanges: 0 },
    };
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentSheet = ss.getActiveSheet();
  const backupSheet = ss.getSheetByName(backupName);

  const result = {
    valid: true,
    errors: [],
    warnings: [],
    stats: {
      totalCellsChecked: 0,
      cellsChanged: 0,
      unexpectedChanges: 0,
      expectedChanges: 0,
      compatibilityPreserved: 0,
      metadataPreserved: 0,
    },
  };

  if (!backupSheet) {
    result.valid = false;
    result.errors.push(`❌ Backup non trovato: ${backupName}`);
    return result;
  }

  Logger.log(`🔍 Inizio validazione contro backup: ${backupName}`);

  try {
    // 1. VERIFICA NUMERO FARMACI
    const currentDrugs = getDrugsList(true);
    const backupDrugs = getDrugsListFromSheet(backupSheet);

    Logger.log(`📊 Farmaci corrente: ${currentDrugs.length}, Backup: ${backupDrugs.length}`);

    // 2. CONFRONTA LISTA FARMACI
    const addedDrugs = currentDrugs.filter((d) => !backupDrugs.includes(d));
    const removedDrugs = backupDrugs.filter((d) => !currentDrugs.includes(d));

    if (addedDrugs.length > 0) {
      Logger.log(`➕ Farmaci aggiunti: ${addedDrugs.join(', ')}`);
      result.stats.expectedChanges += addedDrugs.length;
    }

    if (removedDrugs.length > 0) {
      Logger.log(`➖ Farmaci rimossi: ${removedDrugs.join(', ')}`);
      result.warnings.push(`⚠️ Farmaci rimossi: ${removedDrugs.join(', ')}`);
    }

    // 3. CONFRONTA COMPATIBILITÀ PER FARMACI INVARIATI (OTTIMIZZATO CON BATCH)
    const unchangedDrugs = currentDrugs.filter(
      (d) => backupDrugs.includes(d) && !expectedChanges.includes(d),
    );

    Logger.log(`🔍 Verifico compatibilità per ${unchangedDrugs.length} farmaci invariati`);

    const currentDrugMap = getDrugColumnMap();
    const currentRowMap = getDrugRowMap();
    const firstDrugCol = getFirstDrugColumn();

    let compatibilityChanged = 0;
    let compatibilityPreserved = 0;

    // OTTIMIZZAZIONE: Leggi tutte le compatibilità in un'unica chiamata batch
    const lastRow = currentSheet.getLastRow();
    const lastCol = currentSheet.getLastColumn();
    const currentAllData = currentSheet
      .getRange(2, firstDrugCol, lastRow - 1, lastCol - firstDrugCol + 1)
      .getValues();
    const backupAllData = backupSheet
      .getRange(
        2,
        firstDrugCol,
        backupSheet.getLastRow() - 1,
        backupSheet.getLastColumn() - firstDrugCol + 1,
      )
      .getValues();

    // Crea mappa righe backup
    const backupDrugsColumn = backupSheet
      .getRange(2, 1, backupSheet.getLastRow() - 1, 1)
      .getValues()
      .map((r) => r[0]);
    const backupRowMap = {};
    backupDrugsColumn.forEach((drug, idx) => {
      backupRowMap[drug] = idx; // Indice array (0-based)
    });

    // Crea mappa colonne backup
    const backupDrugsRow = backupSheet
      .getRange(1, firstDrugCol, 1, backupSheet.getLastColumn() - firstDrugCol + 1)
      .getValues()[0];
    const backupColMap = {};
    backupDrugsRow.forEach((drug, idx) => {
      backupColMap[drug] = idx; // Indice array (0-based)
    });

    // Confronta solo farmaci invariati
    for (const drug1 of unchangedDrugs) {
      for (const drug2 of unchangedDrugs) {
        if (!currentDrugMap[drug2] || !currentRowMap[drug1]) continue;
        if (!backupRowMap.hasOwnProperty(drug1) || !backupColMap.hasOwnProperty(drug2)) continue;

        const currentRowIdx = currentRowMap[drug1] - 2; // Converti a 0-based
        const currentColIdx = currentDrugMap[drug2] - firstDrugCol; // Converti a 0-based
        const currentValue = currentAllData[currentRowIdx]
          ? currentAllData[currentRowIdx][currentColIdx]
          : '';

        const backupRowIdx = backupRowMap[drug1];
        const backupColIdx = backupColMap[drug2];
        const backupValue = backupAllData[backupRowIdx]
          ? backupAllData[backupRowIdx][backupColIdx]
          : '';

        result.stats.totalCellsChecked++;

        if (currentValue !== backupValue) {
          compatibilityChanged++;
          result.stats.cellsChanged++;
          result.stats.unexpectedChanges++;

          // Limita errori mostrati per evitare overflow
          if (result.errors.length < 50) {
            result.errors.push(
              `❌ Compatibilità modificata: ${drug1} + ${drug2}: "${backupValue}" → "${currentValue}"`,
            );
          }
        } else {
          compatibilityPreserved++;
        }
      }
    }

    if (compatibilityChanged > 50) {
      result.errors.push(`... e altre ${compatibilityChanged - 50} modifiche inaspettate`);
    }

    result.stats.compatibilityPreserved = compatibilityPreserved;

    Logger.log(`✅ Compatibilità preservate: ${compatibilityPreserved}`);
    Logger.log(`⚠️ Compatibilità modificate: ${compatibilityChanged}`);

    // 4. CONFRONTA METADATI (OTTIMIZZATO CON BATCH)
    const metadataColumns = [2, 3, 4, 5]; // Colonne B, C, D, E
    let metadataChanged = 0;
    let metadataPreserved = 0;

    // Leggi tutti i metadati in batch
    const currentMetadata = currentSheet.getRange(2, 2, lastRow - 1, 4).getValues();
    const backupMetadata = backupSheet.getRange(2, 2, backupSheet.getLastRow() - 1, 4).getValues();

    for (const drug of unchangedDrugs) {
      const currentRowIdx = currentRowMap[drug] - 2; // Converti a 0-based
      const backupRowIdx = backupRowMap[drug];

      if (currentRowIdx >= 0 && backupRowIdx >= 0) {
        for (let colIdx = 0; colIdx < 4; colIdx++) {
          const currentValue = currentMetadata[currentRowIdx]
            ? currentMetadata[currentRowIdx][colIdx]
            : '';
          const backupValue = backupMetadata[backupRowIdx]
            ? backupMetadata[backupRowIdx][colIdx]
            : '';

          result.stats.totalCellsChecked++;

          if (currentValue !== backupValue) {
            metadataChanged++;
            result.stats.cellsChanged++;
            result.stats.unexpectedChanges++;

            // Limita errori mostrati
            if (result.errors.length < 100) {
              result.errors.push(
                `❌ Metadato modificato: ${drug} col ${getColumnLetter(metadataColumns[colIdx])}: "${backupValue}" → "${currentValue}"`,
              );
            }
          } else {
            metadataPreserved++;
          }
        }
      }
    }

    if (metadataChanged > 50) {
      result.errors.push(`... e altri ${metadataChanged - 50} metadati modificati`);
    }

    result.stats.metadataPreserved = metadataPreserved;

    Logger.log(`✅ Metadati preservati: ${metadataPreserved}`);
    Logger.log(`⚠️ Metadati modificati: ${metadataChanged}`);

    // 5. DETERMINA VALIDITÀ FINALE
    if (result.errors.length > 0) {
      result.valid = false;
    }

    // 6. AGGIUNGI WARNINGS SE TROPPE MODIFICHE INATTESE
    if (result.stats.unexpectedChanges > 0) {
      result.warnings.push(`⚠️ Trovate ${result.stats.unexpectedChanges} modifiche inaspettate!`);
    }

    Logger.log(`📊 Validazione completata: ${result.valid ? '✅ VALIDO' : '❌ NON VALIDO'}`);
    Logger.log(`   Celle controllate: ${result.stats.totalCellsChecked}`);
    Logger.log(`   Celle modificate: ${result.stats.cellsChanged}`);
    Logger.log(`   Modifiche inattese: ${result.stats.unexpectedChanges}`);
  } catch (error) {
    result.valid = false;
    result.errors.push(`❌ Errore validazione: ${error.message}`);
    Logger.log(`❌ Errore validazione: ${error.message}`);
  }

  return result;
}

/**
 * Ottiene lista farmaci da un foglio specifico
 * @param {Sheet} sheet - Foglio da cui leggere
 * @return {Array<string>} Lista farmaci
 */
function getDrugsListFromSheet(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const drugsRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const drugs = drugsRange
    .getValues()
    .map((row) => row[0])
    .filter((drug) => drug && drug.toString().trim() !== '');

  return [...new Set(drugs)]; // Rimuovi duplicati
}

/**
 * Trova la riga di un farmaco in un foglio specifico
 * @param {Sheet} sheet - Foglio in cui cercare
 * @param {string} drugName - Nome farmaco
 * @return {number|null} Numero riga o null
 */
function findDrugRowInSheet(sheet, drugName) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const drugsRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const drugs = drugsRange.getValues();

  for (let i = 0; i < drugs.length; i++) {
    if (drugs[i][0] && drugs[i][0].toString().trim() === drugName.trim()) {
      return i + 2; // +2 perché riga 1 = header, array inizia da 0
    }
  }

  return null;
}

/**
 * Trova la colonna di un farmaco in un foglio specifico
 * @param {Sheet} sheet - Foglio in cui cercare
 * @param {string} drugName - Nome farmaco
 * @return {number|null} Numero colonna o null
 */
function findDrugColumnInSheet(sheet, drugName) {
  const lastCol = sheet.getLastColumn();
  const firstDrugCol = getFirstDrugColumn();

  if (lastCol < firstDrugCol) return null;

  const headerRange = sheet.getRange(1, firstDrugCol, 1, lastCol - firstDrugCol + 1);
  const headers = headerRange.getValues()[0];

  for (let i = 0; i < headers.length; i++) {
    if (headers[i] && headers[i].toString().trim() === drugName.trim()) {
      return firstDrugCol + i;
    }
  }

  return null;
}

/**
 * Mostra report validazione all'utente
 * @param {Object} validationResult - Risultato da validateChangesAgainstBackup
 */
function showValidationReport(validationResult) {
  const ui = SpreadsheetApp.getUi();

  let message = '';

  if (validationResult.valid) {
    message =
      `✅ VALIDAZIONE SUPERATA\n\n` +
      `Tutte le modifiche sono corrette!\n\n` +
      `📊 Statistiche:\n` +
      `• Celle controllate: ${validationResult.stats.totalCellsChecked}\n` +
      `• Compatibilità preservate: ${validationResult.stats.compatibilityPreserved}\n` +
      `• Metadati preservati: ${validationResult.stats.metadataPreserved}\n` +
      `• Modifiche attese: ${validationResult.stats.expectedChanges}`;

    if (validationResult.warnings.length > 0) {
      message += `\n\n⚠️ Avvisi:\n${validationResult.warnings.slice(0, 5).join('\n')}`;
    }

    ui.alert('✅ Validazione Superata', message, ui.ButtonSet.OK);
  } else {
    message =
      `❌ VALIDAZIONE FALLITA\n\n` +
      `Trovate ${validationResult.errors.length} modifiche inaspettate!\n\n` +
      `⚠️ ATTENZIONE: Alcuni dati potrebbero essere stati modificati erroneamente.\n\n` +
      `Primi errori:\n${validationResult.errors.slice(0, 5).join('\n')}`;

    if (validationResult.errors.length > 5) {
      message += `\n\n... e altri ${validationResult.errors.length - 5} errori.`;
    }

    message += `\n\n💡 Suggerimento: Ripristina dal backup se necessario.`;

    ui.alert('❌ Validazione Fallita', message, ui.ButtonSet.OK);
  }
}

/**
 * Ripristina dati da un backup specifico
 * @param {string} backupName - Nome del backup da ripristinare
 */
function restoreFromBackup(backupName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentSheet = ss.getActiveSheet();
  const backupSheet = ss.getSheetByName(backupName);

  if (!backupSheet) {
    throw new Error(`Backup non trovato: ${backupName}`);
  }

  Logger.log(`♻️ Ripristino da backup: ${backupName}`);

  // Cancella contenuto corrente
  currentSheet.clearContents();
  currentSheet.clearFormats();

  // Copia tutto dal backup
  const lastRow = backupSheet.getLastRow();
  const lastCol = backupSheet.getLastColumn();

  if (lastRow > 0 && lastCol > 0) {
    const sourceRange = backupSheet.getRange(1, 1, lastRow, lastCol);
    const targetRange = currentSheet.getRange(1, 1, lastRow, lastCol);

    // Copia valori
    targetRange.setValues(sourceRange.getValues());

    // Copia formattazioni
    targetRange.setBackgrounds(sourceRange.getBackgrounds());
    targetRange.setFontColors(sourceRange.getFontColors());
    targetRange.setFontWeights(sourceRange.getFontWeights());
    targetRange.setFontSizes(sourceRange.getFontSizes());
    targetRange.setHorizontalAlignments(sourceRange.getHorizontalAlignments());
    targetRange.setVerticalAlignments(sourceRange.getVerticalAlignments());

    // Copia larghezze colonne
    for (let col = 1; col <= lastCol; col++) {
      const width = backupSheet.getColumnWidth(col);
      currentSheet.setColumnWidth(col, width);
    }

    // Copia altezze righe
    for (let row = 1; row <= lastRow; row++) {
      const height = backupSheet.getRowHeight(row);
      currentSheet.setRowHeight(row, height);
    }
  }

  Logger.log(`✅ Ripristino completato da: ${backupName}`);
}

// =============================================================================
// 🔄 RIORDINO ALFABETICO AUTOMATICO
// =============================================================================

/**
 * Riordina tutti i farmaci alfabeticamente preservando TUTTE le compatibilità
 * Versione SICURA: crea backup automatico prima di procedere
 */
function sortDrugsAlphabetically() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const startTime = new Date().getTime();

  // 1. VALIDAZIONE - USA preserveOrder=true per ottenere ordine ORIGINALE
  const drugs = getDrugsList(true); // ← MODIFICATO: ordine originale NON ordinato
  if (drugs.length === 0) {
    ui.alert('Errore', 'Nessun farmaco trovato nella colonna A!', ui.ButtonSet.OK);
    return;
  }

  // Controlla se già ordinato - confronta originale con ordinato
  const sortedDrugs = [...drugs].sort();
  const isAlreadySorted = drugs.every((drug, i) => drug === sortedDrugs[i]);

  // DEBUG: conta farmaci fuori ordine
  const outOfOrder = drugs.filter((drug, i) => drug !== sortedDrugs[i]);
  Logger.log(`📊 DEBUG: Farmaci totali: ${drugs.length}, Fuori ordine: ${outOfOrder.length}`);
  Logger.log(`📋 Farmaci fuori ordine: ${outOfOrder.join(', ')}`);

  if (isAlreadySorted) {
    ui.alert(
      '✅ Già Ordinato',
      'I farmaci sono già in ordine alfabetico!\n\nNessuna azione necessaria.',
      ui.ButtonSet.OK,
    );
    return;
  }

  // 2. CONFERMA UTENTE - mostra numero farmaci fuori ordine + OPZIONE VALIDAZIONE
  const response = ui.alert(
    '🔄 Riordino Alfabetico',
    `Trovati ${drugs.length} farmaci (${outOfOrder.length} fuori ordine).\n\nQuesta operazione:\n` +
      `• Creerà un BACKUP automatico\n` +
      `• Riordinerà alfabeticamente tutti i farmaci\n` +
      `• Preserverà TUTTE le compatibilità\n\n` +
      `Vuoi procedere?`,
    ui.ButtonSet.YES_NO,
  );

  if (response !== ui.Button.YES) return;

  // CHIEDI SE FARE VALIDAZIONE COMPLETA (può richiedere tempo)
  const validationResponse = ui.alert(
    '🔍 Validazione Dati',
    `Dopo il riordino posso verificare che TUTTI i dati siano preservati.\n\n` +
      `Con ${drugs.length} farmaci la validazione richiede ~10-20 secondi.\n\n` +
      `Vuoi eseguire la validazione completa?\n\n` +
      `(Consigliato: SÌ per sicurezza massima)`,
    ui.ButtonSet.YES_NO,
  );

  const skipValidation = validationResponse !== ui.Button.YES;

  try {
    // 3. CREA BACKUP AUTOMATICO
    ui.alert(
      '💾 Creazione Backup',
      'Creazione backup in corso...\n\nAttendi qualche secondo.',
      ui.ButtonSet.OK,
    );

    const backupName = createAutoBackup('Riordino Alfabetico');
    Logger.log(`✅ Backup creato: ${backupName}`);

    // 4. BACKUP COMPATIBILITÀ
    const drugColumnMap = getDrugColumnMap();
    const drugRowMap = getDrugRowMap();
    const firstDrugCol = getFirstDrugColumn();
    const firstDrugRow = 2;

    if (Object.keys(drugColumnMap).length === 0 || Object.keys(drugRowMap).length === 0) {
      throw new Error('Matrice farmaci non trovata. Genera prima la matrice!');
    }

    const lastDrugRow = Math.max(...Object.values(drugRowMap));
    const lastDrugCol = Math.max(...Object.values(drugColumnMap));

    // Leggi TUTTI i dati (batch read per performance)
    const dataRange = sheet.getRange(
      firstDrugRow,
      firstDrugCol,
      lastDrugRow - firstDrugRow + 1,
      lastDrugCol - firstDrugCol + 1,
    );

    const values = dataRange.getValues();
    const backgrounds = dataRange.getBackgrounds();
    const fontColors = dataRange.getFontColors();
    const fontWeights = dataRange.getFontWeights();

    // Crea backup strutturato compatibilità
    const compatibilityBackup = {};

    for (let i = 0; i < drugs.length; i++) {
      const drug1 = drugs[i];
      if (!drugRowMap[drug1] || !drugColumnMap[drug1]) continue;

      compatibilityBackup[drug1] = {};

      for (let j = 0; j < drugs.length; j++) {
        const drug2 = drugs[j];
        if (!drugRowMap[drug2] || !drugColumnMap[drug2]) continue;

        const rowIndex = drugRowMap[drug1] - firstDrugRow;
        const colIndex = drugColumnMap[drug2] - firstDrugCol;

        if (
          rowIndex < 0 ||
          colIndex < 0 ||
          rowIndex >= values.length ||
          colIndex >= values[0].length
        ) {
          continue;
        }

        const value = values[rowIndex][colIndex];

        if (value && value.toString().trim() !== '') {
          compatibilityBackup[drug1][drug2] = {
            value: value,
            background: backgrounds[rowIndex][colIndex],
            fontColor: fontColors[rowIndex][colIndex],
            fontWeight: fontWeights[rowIndex][colIndex],
          };
        }
      }
    }

    const totalCompatibilities = Object.values(compatibilityBackup).reduce(
      (sum, obj) => sum + Object.keys(obj).length,
      0,
    );
    Logger.log(`✅ Backup compatibilità: ${totalCompatibilities} celle`);

    // 5. BACKUP METADATI (colonne speciali)
    const metadataBackup = {};
    const specialColsCount = firstDrugCol - 1; // Colonne prima dei farmaci

    if (specialColsCount > 1) {
      const metadataRange = sheet.getRange(
        firstDrugRow,
        2,
        lastDrugRow - firstDrugRow + 1,
        specialColsCount - 1,
      );
      const metadataValues = metadataRange.getValues();
      const metadataBackgrounds = metadataRange.getBackgrounds();
      const metadataFontColors = metadataRange.getFontColors();

      for (let i = 0; i < drugs.length; i++) {
        const drug = drugs[i];
        const rowIndex = drugRowMap[drug] - firstDrugRow;

        if (rowIndex >= 0 && rowIndex < metadataValues.length) {
          metadataBackup[drug] = {
            values: metadataValues[rowIndex],
            backgrounds: metadataBackgrounds[rowIndex],
            fontColors: metadataFontColors[rowIndex],
          };
        }
      }
    }

    Logger.log(`✅ Backup metadati: ${Object.keys(metadataBackup).length} righe`);

    // 6. CREA RIGHE TEMPORANEE CON ORDINE CORRETTO
    // Invece di sovrascrivere, ricostruiamo l'intera tabella nell'ordine giusto

    const lastCol = sheet.getLastColumn();
    const tempData = []; // Array per nuove righe ordinate

    // Per ogni farmaco nell'ordine alfabetico corretto
    for (let i = 0; i < sortedDrugs.length; i++) {
      const drug = sortedDrugs[i];
      const oldRow = drugRowMap[drug];

      if (!oldRow) {
        Logger.log(`⚠️ Farmaco non trovato nelle mappe: ${drug}`);
        continue;
      }

      // Leggi TUTTA la riga originale (tutti i dati + metadati)
      const rowData = sheet.getRange(oldRow, 1, 1, lastCol).getValues()[0];
      const rowBackgrounds = sheet.getRange(oldRow, 1, 1, lastCol).getBackgrounds()[0];
      const rowFontColors = sheet.getRange(oldRow, 1, 1, lastCol).getFontColors()[0];
      const rowFontWeights = sheet.getRange(oldRow, 1, 1, lastCol).getFontWeights()[0];

      tempData.push({
        values: rowData,
        backgrounds: rowBackgrounds,
        fontColors: rowFontColors,
        fontWeights: rowFontWeights,
      });
    }

    Logger.log(`✅ Preparate ${tempData.length} righe per riordino`);

    // 7. CANCELLA TUTTE LE RIGHE DATI ESISTENTI (non header)
    if (lastDrugRow >= firstDrugRow) {
      const rowsToClear = lastDrugRow - firstDrugRow + 1;
      sheet.getRange(firstDrugRow, 1, rowsToClear, lastCol).clearContent();
      sheet.getRange(firstDrugRow, 1, rowsToClear, lastCol).clearFormat();
      Logger.log(`✅ Cancellate ${rowsToClear} righe esistenti`);
    }

    // 8. SCRIVI RIGHE NELL'ORDINE CORRETTO
    for (let i = 0; i < tempData.length; i++) {
      const newRow = firstDrugRow + i;
      const data = tempData[i];

      // Scrivi valori
      const rowRange = sheet.getRange(newRow, 1, 1, lastCol);
      rowRange.setValues([data.values]);
      rowRange.setBackgrounds([data.backgrounds]);
      rowRange.setFontColors([data.fontColors]);
      rowRange.setFontWeights([data.fontWeights]);
    }

    Logger.log(`✅ Scritte ${tempData.length} righe riordinate`);

    // 9. RIORDINA HEADER (riga 1 - solo colonne farmaci)
    for (let i = 0; i < sortedDrugs.length; i++) {
      sheet.getRange(1, firstDrugCol + i).setValue(sortedDrugs[i]);
    }

    Logger.log(`✅ Header riordinato`);

    // 10. RICOSTRUISCI MAPPE (ora aggiornate con nuovo ordine)
    const newDrugColumnMap = getDrugColumnMap();
    const newDrugRowMap = getDrugRowMap();

    // 11. VALIDAZIONE POST-RIORDINO
    const validationErrors = [];

    // Verifica che tutti i farmaci siano presenti
    for (const drug of sortedDrugs) {
      if (!newDrugRowMap[drug]) {
        validationErrors.push(`❌ Farmaco mancante in righe: ${drug}`);
      }
      if (!newDrugColumnMap[drug]) {
        validationErrors.push(`❌ Farmaco mancante in colonne: ${drug}`);
      }
    }

    // Verifica numero farmaci
    if (Object.keys(newDrugRowMap).length !== sortedDrugs.length) {
      validationErrors.push(
        `❌ Numero farmaci diverso: attesi ${sortedDrugs.length}, trovati ${Object.keys(newDrugRowMap).length}`,
      );
    }

    // Verifica ordine alfabetico colonna A
    const currentDrugsAfterSort = [];
    for (let i = 0; i < sortedDrugs.length; i++) {
      const cellValue = sheet.getRange(firstDrugRow + i, 1).getValue();
      if (cellValue) currentDrugsAfterSort.push(cellValue.toString().trim());
    }

    const isCorrectlyOrdered = currentDrugsAfterSort.every((drug, i) => drug === sortedDrugs[i]);
    if (!isCorrectlyOrdered) {
      validationErrors.push(`❌ Ordine alfabetico non corretto dopo riordino!`);
    }

    if (validationErrors.length > 0) {
      Logger.log('⚠️ ERRORI VALIDAZIONE:');
      validationErrors.forEach((err) => Logger.log(err));

      ui.alert(
        '⚠️ Attenzione',
        `Riordino completato ma con ${validationErrors.length} avvisi:\n\n` +
          validationErrors.slice(0, 5).join('\n') +
          '\n\nControlla il foglio di backup per sicurezza.',
        ui.ButtonSet.OK,
      );
    }

    Logger.log(`✅ Validazione completata: ${validationErrors.length} errori`);

    // 12. RIEMPIE CELLE DIAGONALI (null)
    for (const drug of sortedDrugs) {
      if (newDrugRowMap[drug] && newDrugColumnMap[drug]) {
        const row = newDrugRowMap[drug];
        const col = newDrugColumnMap[drug];
        const cell = sheet.getRange(row, col);
        cell.setValue('null');
        cell.setBackground('#e0e0e0');
        cell.setFontColor('#757575');
        cell.setHorizontalAlignment('center');
        cell.setFontWeight('bold');
      }
    }

    const endTime = new Date().getTime();
    const executionTime = ((endTime - startTime) / 1000).toFixed(2);

    // 13. VALIDAZIONE CONTRO BACKUP (sicurezza extra)
    let validationResult = null; // ← FIX: inizializza per evitare "not defined" error

    if (!skipValidation) {
      Logger.log(`🔍 Inizio validazione contro backup...`);

      ui.alert(
        '🔍 Validazione in corso...',
        'Confronto dati con backup per verificare integrità.\n\nAttendi 10-20 secondi...',
        ui.ButtonSet.OK,
      );

      validationResult = validateChangesAgainstBackup(backupName, outOfOrder);

      // 14. MOSTRA REPORT VALIDAZIONE
      if (!validationResult.valid) {
        // Validazione fallita - mostra errori
        let errorMsg =
          `⚠️ VALIDAZIONE FALLITA\n\n` +
          `Trovate ${validationResult.errors.length} discrepanze!\n\n`;

        errorMsg += `Primi errori:\n${validationResult.errors.slice(0, 3).join('\n')}`;

        if (validationResult.errors.length > 3) {
          errorMsg += `\n\n... e altri ${validationResult.errors.length - 3} errori.`;
        }

        errorMsg += `\n\n❓ Vuoi ripristinare dal backup?`;

        const restoreResponse = ui.alert('⚠️ Validazione Fallita', errorMsg, ui.ButtonSet.YES_NO);

        if (restoreResponse === ui.Button.YES) {
          // Ripristina
          restoreFromBackup(backupName);

          ui.alert(
            '↩️ Ripristino Completato',
            `Foglio ripristinato dallo stato precedente.\n\nBackup usato: "${backupName}"`,
            ui.ButtonSet.OK,
          );

          return;
        } else {
          ui.alert(
            '⚠️ Validazione ignorata',
            'Modifiche mantenute nonostante errori di validazione.\n\n' +
              `Controlla manualmente il backup: "${backupName}"`,
            ui.ButtonSet.OK,
          );
        }
      } else {
        // Validazione OK
        showValidationReport(validationResult);
      }
    } else {
      Logger.log('⚠️ Validazione saltata per scelta utente');
    }

    // 15. PULISCI BACKUP VECCHI (mantieni ultimi 10)
    cleanOldBackups(10);

    // 16. CONFERMA SUCCESSO CON/SENZA STATS VALIDAZIONE
    let successMsg =
      `Operazione completata con successo!\n\n` +
      `📊 Farmaci riordinati: ${sortedDrugs.length}\n` +
      `💾 Righe spostate: ${tempData.length}\n` +
      `⏱️ Tempo esecuzione: ${executionTime}s\n\n`;

    if (!skipValidation && validationResult) {
      successMsg +=
        `🔍 Validazione:\n` +
        `• Celle verificate: ${validationResult.stats.totalCellsChecked}\n` +
        `• Compatibilità preservate: ${validationResult.stats.compatibilityPreserved}\n` +
        `• Metadati preservati: ${validationResult.stats.metadataPreserved}\n\n`;
    } else {
      successMsg += `⚠️ Validazione saltata (scelta utente)\n\n`;
    }
    successMsg += `💾 Backup salvato: "${backupName}"\n\n` + `✅ Operazione completata!`;

    ui.alert('✅ Riordino Completato', successMsg, ui.ButtonSet.OK);
  } catch (error) {
    ui.alert(
      '❌ Errore',
      `Errore durante il riordino:\n${error.message}\n\n` +
        `Il backup è stato creato e non è stato modificato.\n` +
        `Puoi ripristinarlo se necessario.`,
      ui.ButtonSet.OK,
    );
    Logger.log(`❌ Errore: ${error.message}`);
  }
}
