/**
 * @file google-sheets-interface.gs
 * @description Google Apps Script per interfaccia inserimento compatibilità farmaci
 * @author Vasile Chifeac
 *
 * INSTALLAZIONE:
 * 1. Apri Google Sheets: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k
 * 2. Estensioni → Apps Script
 * 3. Copia e incolla questo codice
 * 4. Salva (Ctrl+S)
 * 5. Aggiorna Google Sheets
 * 6. Nuovo menu "Compatibilità Farmaci" apparirà
 */

// =============================================================================
// 🎨 MENU PERSONALIZZATO
// =============================================================================

/**
 * Crea menu personalizzato quando sheet si apre
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('💊 Compatibilità Farmaci')
    .addItem('⚡ Inserimento RAPIDO (Bulk)', 'showBulkCompatibilityDialog')
    .addItem('📝 Inserisci Compatibilità Singola', 'showCompatibilityDialog')
    .addSeparator()
    .addItem('➕ Aggiungi Nuovo Farmaco', 'showAddDrugDialog')
    .addItem('💉 Gestisci Via Somministrazione', 'showRouteDialog')
    .addSeparator()
    .addItem('✅ Valida Tabella', 'validateTable')
    .addItem('📊 Genera Matrice', 'generateMatrix')
    .addItem('📥 Esporta JSON', 'exportToJSON')
    .addItem('🔄 Importa da CSV', 'importFromCSV')
    .addSeparator()
    .addItem('📖 Legenda Codici', 'showLegend')
    .addToUi();
}

// =============================================================================
// 📝 INTERFACCIA INSERIMENTO
// =============================================================================

/**
 * Mostra dialog per inserimento BULK (tutte compatibilità di 1 farmaco)
 */
function showBulkCompatibilityDialog() {
  const html = HtmlService.createHtmlOutput(getBulkDialogHTML()).setWidth(1200).setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, '⚡ Inserimento RAPIDO Compatibilità (Bulk Mode)');
}

/**
 * Mostra dialog per inserimento compatibilità singola
 */
function showCompatibilityDialog() {
  const html = HtmlService.createHtmlOutput(getDialogHTML()).setWidth(600).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, '💊 Inserimento Compatibilità Farmaci');
}

/**
 * Mostra dialog per gestione via somministrazione
 */
function showRouteDialog() {
  const html = HtmlService.createHtmlOutput(getRouteDialogHTML()).setWidth(500).setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, '💉 Gestione Via Somministrazione');
}

/**
 * Mostra dialog per aggiungere nuovo farmaco
 */
function showAddDrugDialog() {
  const html = HtmlService.createHtmlOutput(getAddDrugDialogHTML()).setWidth(500).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, '➕ Aggiungi Nuovo Farmaco');
}

/**
 * HTML per dialog di inserimento BULK
 */
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
            grid-template-columns: repeat(4, 1fr);
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
          <!-- LEFT PANEL: Selezione Farmaco -->
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
            
            <div class="drug-list" id="drugList">
              <!-- Populated by JavaScript -->
            </div>
            
            <div class="legend">
              <strong>📌 Come usare:</strong><br>
              1. Cerca/seleziona farmaco base<br>
              2. Imposta compatibilità nella lista a destra<br>
              3. Salva tutto in una volta!
            </div>
          </div>
          
          <!-- RIGHT PANEL: Compatibilità -->
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
          
          // Initialize drug list
          function initDrugList() {
            const drugList = document.getElementById('drugList');
            drugList.innerHTML = allDrugs.map(drug => 
              \`<div class="drug-item" data-drug="\${drug}" onclick="selectDrug('\${drug}')">
                \${drug}
              </div>\`
            ).join('');
          }
          
          // Search functionality - LEFT panel (drug selection)
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
          
          // Search functionality - RIGHT panel (compatibility list)
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
          
          // Select drug
          function selectDrug(drugName) {
            selectedDrug = drugName;
            
            // Update UI
            document.querySelectorAll('.drug-item').forEach(item => {
              item.classList.remove('selected');
            });
            document.querySelector(\`[data-drug="\${drugName}"]\`).classList.add('selected');
            
            document.getElementById('selectedDrugName').textContent = drugName;
            document.getElementById('saveBtn').disabled = false;
            
            // Load compatibility list
            loadCompatibilityList();
          }
          
          // Load compatibility list for selected drug
          function loadCompatibilityList() {
            const otherDrugs = allDrugs.filter(d => d !== selectedDrug);
            const listHTML = otherDrugs.map(drug => \`
              <div class="compatibility-grid" data-compat-drug="\${drug}">
                <div class="drug-name">\${drug}</div>
                <div class="compat-buttons">
                  <div class="compat-mini-btn compat-C" onclick="setCompatibility('\${drug}', 'C')">
                    C
                  </div>
                  <div class="compat-mini-btn compat-Y" onclick="setCompatibility('\${drug}', 'Y')">
                    Y
                  </div>
                  <div class="compat-mini-btn compat-I" onclick="setCompatibility('\${drug}', 'I')">
                    I
                  </div>
                  <div class="compat-mini-btn compat-!" onclick="setCompatibility('\${drug}', '!')">
                    !
                  </div>
                  <div class="compat-mini-btn compat-X" onclick="setCompatibility('\${drug}', '')">
                    -
                  </div>
                </div>
              </div>
            \`).join('');
            
            document.getElementById('compatibilityList').innerHTML = listHTML;
            document.getElementById('compatSearchBox').style.display = 'block';
            document.getElementById('compatSearch').value = '';
            updateStats();
          }
          
          // Set compatibility
          function setCompatibility(drug, value) {
            if (!selectedDrug) return;
            
            // Imposta il valore (anche se vuoto "") invece di cancellare la chiave
            compatibilityData[drug] = value;
            
            // Update UI
            const grid = event.target.closest('.compatibility-grid');
            grid.querySelectorAll('.compat-mini-btn').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            if (value) {
              event.target.classList.add('selected');
            } else {
              // Seleziona visivamente il pulsante "-" quando viene cliccato
              event.target.classList.add('selected');
            }
            
            updateStats();
          }
          
          // Update statistics
          function updateStats() {
            const total = allDrugs.length - 1;
            const filled = Object.keys(compatibilityData).filter(k => compatibilityData[k]).length;
            const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;
            
            document.getElementById('compatCount').textContent = \`\${filled} / \${total}\`;
            document.getElementById('progressBar').style.width = percentage + '%';
            document.getElementById('progressBar').textContent = percentage + '%';
          }
          
          // Save bulk compatibility
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
            
            // Reset
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
          
          // Initialize on load
          initDrugList();
        </script>
      </body>
    </html>
  `;
}

/**
 * HTML per dialog di inserimento
 */
function getDialogHTML() {
  const drugs = getDrugsList();
  const drugsOptions = drugs.map((drug) => `<option value="${drug}">${drug}</option>`).join('');

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
          }
          .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h2 {
            color: #1976d2;
            margin-top: 0;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }
          select, input, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
          }
          .compatibility-buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 15px 0;
          }
          .compat-btn {
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 6px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s;
            background: white;
          }
          .compat-btn:hover {
            transform: scale(1.05);
          }
          .compat-btn.selected {
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
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
          }
          .btn-primary {
            background: #1976d2;
            color: white;
          }
          .btn-primary:hover {
            background: #1565c0;
          }
          .btn-secondary {
            background: #757575;
            color: white;
          }
          .legend {
            background: #e3f2fd;
            padding: 10px;
            border-radius: 4px;
            margin-top: 15px;
            font-size: 12px;
          }
          .legend-item {
            display: inline-block;
            margin-right: 15px;
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
          }
          .status.error {
            background: #ffcdd2;
            color: #c62828;
          }
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
              <div class="compat-btn compat-X" onclick="selectCompatibility('')">
                <div style="font-size: 24px;">❓</div>
                <div><strong>-</strong></div>
                <div style="font-size: 11px;">Nessun dato</div>
              </div>
            </div>
            <input type="hidden" id="compatibility" value="">
          </div>
          
          <div class="form-group">
            <label>Note (opzionale):</label>
            <textarea id="notes" rows="3" placeholder="Eventuali note sulla compatibilità..."></textarea>
          </div>
          
          <div class="legend">
            <strong>Legenda:</strong><br>
            <span class="legend-item">✅ <strong>C</strong> = Compatibile (sicuro mescolare)</span>
            <span class="legend-item">⚠️ <strong>Y</strong> = Y-site compatible (via Y-connector)</span>
            <span class="legend-item">❌ <strong>I</strong> = Incompatibile (NON mescolare)</span>
            <span class="legend-item">⚡ <strong>!</strong> = Dati contrastanti (fonti discordanti)</span>
            <span class="legend-item">❓ <strong>-</strong> = Nessun dato disponibile</span>
          </div>
          
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="saveCompatibility()">
              💾 Salva Compatibilità
            </button>
            <button class="btn btn-secondary" onclick="google.script.host.close()">
              ❌ Annulla
            </button>
          </div>
          
          <div id="status" class="status"></div>
        </div>
        
        <script>
          let selectedCompatibility = '';
          
          function selectCompatibility(value) {
            selectedCompatibility = value;
            document.getElementById('compatibility').value = value;
            
            // Update UI
            document.querySelectorAll('.compat-btn').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            if (value) {
              document.querySelector(\`.compat-\${value}\`).classList.add('selected');
            } else {
              document.querySelector('.compat-X').classList.add('selected');
            }
          }
          
          function saveCompatibility() {
            const drug1 = document.getElementById('drug1').value;
            const drug2 = document.getElementById('drug2').value;
            const compatibility = selectedCompatibility;
            const notes = document.getElementById('notes').value;
            
            // Validation
            if (!drug1 || !drug2) {
              showStatus('Seleziona entrambi i farmaci!', 'error');
              return;
            }
            
            if (drug1 === drug2) {
              showStatus('I due farmaci devono essere diversi!', 'error');
              return;
            }
            
            // Show loading
            showStatus('Salvataggio in corso...', 'success');
            
            // Call server-side function
            google.script.run
              .withSuccessHandler(onSaveSuccess)
              .withFailureHandler(onSaveError)
              .saveCompatibilityData({
                drug1: drug1,
                drug2: drug2,
                compatibility: compatibility,
                notes: notes
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

// =============================================================================
// 📊 FUNZIONI DATI
// =============================================================================

/**
 * Ottieni lista farmaci dal foglio
 */
function getDrugsList() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  // Leggi farmaci dalla colonna A (escluso header)
  const drugsRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const drugs = drugsRange
    .getValues()
    .map((row) => row[0])
    .filter((drug) => drug && drug.toString().trim() !== '');

  return [...new Set(drugs)].sort(); // Rimuovi duplicati e ordina
}

/**
 * Ottieni mappa farmaci → colonna dall'header
 * @returns {Object} Mappa { 'FARMACO': colonnaIndex }
 */
function getDrugColumnMap() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastCol = sheet.getLastColumn();

  // Leggi header (riga 1)
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  const headerValues = headerRange.getValues()[0];

  const drugColumnMap = {};

  // Per ogni colonna, se contiene un nome farmaco, salva l'indice
  for (let i = 0; i < headerValues.length; i++) {
    const cellValue = headerValues[i];
    if (cellValue && cellValue.toString().trim() !== '') {
      const drugName = cellValue.toString().trim();

      // Salta colonne speciali
      if (
        drugName !== 'PRINCIPIO ATTIVO' &&
        drugName !== 'FOTOSENSIBILE' &&
        drugName !== 'VIA CENTRALE / PERIFERICA' &&
        !drugName.toLowerCase().includes('fotosens') &&
        !drugName.toLowerCase().includes('via centrale')
      ) {
        drugColumnMap[drugName] = i + 1; // +1 perché getRange usa 1-based
      }
    }
  }

  return drugColumnMap;
}

/**
 * Ottieni mappa farmaci → riga dalla colonna A
 * @returns {Object} Mappa { 'FARMACO': rigaIndex }
 */
function getDrugRowMap() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {};
  }

  // Leggi farmaci dalla colonna A (escluso header)
  const drugsRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const drugs = drugsRange.getValues();

  const drugRowMap = {};

  for (let i = 0; i < drugs.length; i++) {
    const drugName = drugs[i][0];
    if (drugName && drugName.toString().trim() !== '') {
      drugRowMap[drugName.toString().trim()] = i + 2; // +2 per header e 0-based
    }
  }

  return drugRowMap;
}

/**
 * Salva dati compatibilità BULK (tutte le compatibilità di un farmaco)
 */
function saveBulkCompatibilityData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const { baseDrug, compatibilities } = data;

  // Ottieni mappe farmaci
  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();

  // Verifica che il farmaco base esista
  if (!drugRowMap[baseDrug] || !drugColumnMap[baseDrug]) {
    throw new Error(
      `Farmaco base "${baseDrug}" non trovato nella tabella. Verifica che sia presente sia nella colonna A che nell'header riga 1.`,
    );
  }

  const baseDrugRow = drugRowMap[baseDrug];
  const baseDrugCol = drugColumnMap[baseDrug];

  let savedCount = 0;
  const errors = [];

  // Salva tutte le compatibilità (incluso cancellazione con "")
  for (const [targetDrug, compatibility] of Object.entries(compatibilities)) {
    // IMPORTANTE: Non skip se compatibility è vuoto - serve per cancellare!

    // Verifica che il farmaco target esista
    if (!drugRowMap[targetDrug] || !drugColumnMap[targetDrug]) {
      errors.push(`Farmaco "${targetDrug}" non trovato`);
      continue;
    }

    const targetDrugRow = drugRowMap[targetDrug];
    const targetDrugCol = drugColumnMap[targetDrug];

    try {
      // Salva compatibilità: riga baseDrug, colonna targetDrug
      const cell1 = sheet.getRange(baseDrugRow, targetDrugCol);
      if (compatibility !== '') {
        // Valore valido (C, Y, I)
        cell1.setValue(compatibility);
        applyCellFormatting(cell1, compatibility);
      } else {
        // Pulsante "-" cliccato: cancella cella completamente
        applyCellFormatting(cell1, ''); // Usa default case per cancellare
      }

      // Salva simmetrico: riga targetDrug, colonna baseDrug
      const cell2 = sheet.getRange(targetDrugRow, baseDrugCol);
      if (compatibility !== '') {
        // Valore valido (C, Y, I)
        cell2.setValue(compatibility);
        applyCellFormatting(cell2, compatibility);
      } else {
        // Pulsante "-" cliccato: cancella cella simmetrica
        applyCellFormatting(cell2, ''); // Usa default case per cancellare
      }

      savedCount++;
    } catch (e) {
      errors.push(`Errore salvando ${baseDrug} ↔ ${targetDrug}: ${e.message}`);
    }
  }

  // Colora cella diagonale (stesso farmaco) con "null" grigio
  const diagonalCell = sheet.getRange(baseDrugRow, baseDrugCol);
  diagonalCell.setValue('null');
  diagonalCell.setBackground('#e0e0e0'); // Grigio
  diagonalCell.setFontColor('#757575'); // Grigio scuro per testo

  // Log errori se presenti
  if (errors.length > 0) {
    Logger.log('Errori durante salvataggio:');
    errors.forEach((err) => Logger.log(err));
  }

  return {
    success: true,
    message: `Compatibilità salvate per ${baseDrug}`,
    saved: savedCount,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Applica formattazione colore alla cella in base alla compatibilità
 * @param {Range} cell - La cella da formattare
 * @param {string} value - Il valore di compatibilità (C, Y, I, o vuoto)
 */
function applyCellFormatting(cell, value) {
  switch (value) {
    case 'C': // Compatibile - Verde
      cell.setBackground('#c8e6c9'); // Verde chiaro
      cell.setFontColor('#2e7d32'); // Verde scuro
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    case 'Y': // Y-site - Arancione
      cell.setBackground('#ffe0b2'); // Arancione chiaro
      cell.setFontColor('#e65100'); // Arancione scuro
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    case 'I': // Incompatibile - Rosso
      cell.setBackground('#ffcdd2'); // Rosso chiaro
      cell.setFontColor('#c62828'); // Rosso scuro
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    case '!': // Dati Contrastanti - Giallo
      cell.setBackground('#fff9c4'); // Giallo chiaro
      cell.setFontColor('#f57f17'); // Giallo/arancione scuro
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
      break;
    default: // Nessun dato - Cancella formattazione (cella vuota e incolore)
      cell.clearContent(); // Cancella contenuto
      cell.setBackground(null); // Rimuovi colore di sfondo
      cell.setFontColor(null); // Rimuovi colore testo
      cell.setFontWeight('normal'); // Font normale
      break;
  }
}

/**
 * Salva dati compatibilità (modalità singola)
 */
function saveCompatibilityData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const { drug1, drug2, compatibility, notes } = data;

  // Ottieni mappe farmaci
  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();

  // Verifica che entrambi i farmaci esistano
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

  // Salva compatibilità: riga drug1, colonna drug2
  const cell1 = sheet.getRange(drug1Row, drug2Col);
  cell1.setValue(compatibility || '');
  applyCellFormatting(cell1, compatibility);

  // Salva simmetrico: riga drug2, colonna drug1
  const cell2 = sheet.getRange(drug2Row, drug1Col);
  cell2.setValue(compatibility || '');
  applyCellFormatting(cell2, compatibility);

  // Se ci sono note, salva in colonna apposita (se esiste)
  if (notes) {
    // TODO: Implementare salvataggio note in colonna dedicata
  }

  return { success: true, message: 'Dati salvati' };
}

// =============================================================================
// ✅ VALIDAZIONE
// =============================================================================

/**
 * Valida tabella compatibilità
 */
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

  // Controlla simmetria matrice
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

      // Verifica simmetria
      if (value1 !== value2) {
        errors.push(`Asimmetria: ${drug1} ↔ ${drug2} (${value1} vs ${value2})`);
      }

      // Verifica valore valido
      if (value1 && !['C', 'Y', 'I', ''].includes(value1.toString())) {
        warnings.push(`Valore non valido: ${drug1} ↔ ${drug2} = "${value1}"`);
      }
    }
  }

  // Calcola percentuale completamento
  const percentage = ((filledCells / totalCells) * 100).toFixed(1);

  // Mostra risultati
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

// =============================================================================
// 📊 GENERA MATRICE
// =============================================================================

/**
 * Genera matrice compatibilità vuota
 */
function generateMatrix() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ui = SpreadsheetApp.getUi();

  const drugs = getDrugsList();

  if (drugs.length === 0) {
    ui.alert('Errore', 'Nessun farmaco trovato nella colonna A!', ui.ButtonSet.OK);
    return;
  }

  // Trova la prima colonna libera dopo le colonne speciali
  const lastCol = sheet.getLastColumn();
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  const headerValues = headerRange.getValues()[0];

  let startCol = 1;

  // Trova dove iniziare (dopo FOTOSENSIBILE, VIA CENTRALE/PERIFERICA, etc.)
  for (let i = 0; i < headerValues.length; i++) {
    const cellValue = headerValues[i].toString().trim().toUpperCase();
    if (
      cellValue.includes('FOTOSENS') ||
      cellValue.includes('VIA CENTRALE') ||
      cellValue.includes('PERIFERICA')
    ) {
      startCol = i + 2; // +2 per saltare questa colonna
    }
  }

  // Se non trova colonne speciali, parte da colonna D (4)
  if (startCol === 1) {
    startCol = 4; // Colonna D (A=1, B=2, C=3, D=4)
  }

  const response = ui.alert(
    'Genera Matrice',
    `Vuoi generare header per ${drugs.length} farmaci?\n\nHeader inizierà dalla colonna ${getColumnLetter(startCol)} per non sovrascrivere le colonne speciali.\n\nLe celle diagonali (stesso farmaco) saranno riempite con "null" grigio.`,
    ui.ButtonSet.YES_NO,
  );

  if (response !== ui.Button.YES) {
    return;
  }

  // Scrivi header orizzontale (partendo da startCol)
  for (let i = 0; i < drugs.length; i++) {
    sheet.getRange(1, startCol + i).setValue(drugs[i]);
  }

  // Formattazione header orizzontale
  sheet
    .getRange(1, startCol, 1, drugs.length)
    .setFontWeight('bold')
    .setBackground('#1976d2')
    .setFontColor('white')
    .setHorizontalAlignment('center');

  // Formattazione colonna A (header verticale già presente)
  sheet
    .getRange(1, 1, drugs.length + 1, 1)
    .setFontWeight('bold')
    .setBackground('#1976d2')
    .setFontColor('white');

  // Riempie celle diagonali (stesso farmaco) con "null" grigio
  const drugRowMap = getDrugRowMap();
  const drugColumnMap = getDrugColumnMap();

  for (let i = 0; i < drugs.length; i++) {
    const drug = drugs[i];
    if (drugRowMap[drug] && drugColumnMap[drug]) {
      const row = drugRowMap[drug];
      const col = drugColumnMap[drug];
      const cell = sheet.getRange(row, col);
      cell.setValue('null');
      cell.setBackground('#e0e0e0'); // Grigio
      cell.setFontColor('#757575'); // Grigio scuro
      cell.setHorizontalAlignment('center');
      cell.setFontWeight('bold');
    }
  }

  ui.alert(
    'Successo',
    `Header matrice generato dalla colonna ${getColumnLetter(startCol)} alla ${getColumnLetter(startCol + drugs.length - 1)}!\n\nCelle diagonali riempite con "null" grigio.`,
    ui.ButtonSet.OK,
  );
}

/**
 * Converti numero colonna in lettera (1 = A, 2 = B, ...)
 */
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
// 📥 EXPORT/IMPORT
// =============================================================================

/**
 * Esporta compatibilità in JSON
 */
function exportToJSON() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const drugs = getDrugsList();
  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();

  const compatibilityMatrix = {};

  for (let i = 0; i < drugs.length; i++) {
    const drug1 = drugs[i];

    if (!drugRowMap[drug1] || !drugColumnMap[drug1]) {
      continue; // Skip se farmaco non nella matrice
    }

    compatibilityMatrix[drug1] = {};

    for (let j = 0; j < drugs.length; j++) {
      const drug2 = drugs[j];

      if (i !== j && drugRowMap[drug2] && drugColumnMap[drug2]) {
        const row = drugRowMap[drug1];
        const col = drugColumnMap[drug2];
        const value = sheet.getRange(row, col).getValue();

        if (value) {
          compatibilityMatrix[drug1][drug2] = value.toString();
        }
      }
    }
  }

  const json = JSON.stringify(compatibilityMatrix, null, 2);

  // Mostra JSON in dialog
  const html = `
    <textarea style="width:100%;height:400px;font-family:monospace;">${json}</textarea>
    <p>Copia e incolla questo JSON nel tuo progetto TypeScript.</p>
  `;

  const htmlOutput = HtmlService.createHtmlOutput(html).setWidth(600).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, '📥 Export JSON');
}

/**
 * HTML per dialog gestione Via Somministrazione
 */
function getRouteDialogHTML() {
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
          }
          .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h2 {
            color: #1976d2;
            margin-top: 0;
          }
          .search-box {
            margin-bottom: 15px;
          }
          .search-input {
            width: 100%;
            padding: 10px;
            border: 2px solid #1976d2;
            border-radius: 6px;
            font-size: 14px;
          }
          .drug-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 2fr;
            gap: 10px;
            margin-bottom: 10px;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 4px;
            align-items: center;
          }
          .drug-grid.hidden {
            display: none;
          }
          .drug-name {
            font-weight: 500;
          }
          .route-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 5px;
          }
          .note-input {
            width: 100%;
            padding: 6px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 12px;
            font-family: inherit;
          }
          .route-btn {
            padding: 8px;
            border: 2px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            font-size: 11px;
            transition: all 0.2s;
          }
          .route-btn:hover {
            transform: scale(1.05);
          }
          .route-btn.selected {
            border-width: 3px;
            font-weight: bold;
          }
          .route-C { border-color: #2196f3; background: #e3f2fd; }
          .route-C.selected { background: #2196f3; color: white; }
          .route-P { border-color: #9c27b0; background: #f3e5f5; }
          .route-P.selected { background: #9c27b0; color: white; }
          .route-CP { border-color: #4caf50; background: #e8f5e9; }
          .route-CP.selected { background: #4caf50; color: white; }
          .route-X { border-color: #9e9e9e; background: #f5f5f5; }
          .route-X.selected { background: #9e9e9e; color: white; }
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
          }
          .btn-primary {
            background: #1976d2;
            color: white;
          }
          .btn-primary:hover {
            background: #1565c0;
          }
          .legend {
            background: #fff3cd;
            padding: 10px;
            border-radius: 4px;
            margin-top: 15px;
            font-size: 12px;
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
          }
          .status.error {
            background: #ffcdd2;
            color: #c62828;
          }
          .drug-list-container {
            max-height: 400px;
            overflow-y: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>💉 Gestione Via Somministrazione</h2>
          
          <div class="search-box">
            <input 
              type="text" 
              id="routeSearch" 
              class="search-input" 
              placeholder="🔍 Cerca farmaco..."
              autocomplete="off"
            />
          </div>
          
          <div class="drug-list-container" id="routeList">
            <!-- Populated by JavaScript -->
          </div>
          
          <div class="legend">
            <strong>📌 Legenda:</strong><br>
            <strong>C</strong> = Solo Centrale | 
            <strong>P</strong> = Solo Periferica | 
            <strong>C+P</strong> = Entrambe | 
            <strong>-</strong> = Non specificato
          </div>
          
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="saveAllRoutes()">
              💾 Salva Tutte le Vie
            </button>
            <button class="btn btn-secondary" onclick="google.script.host.close()">
              ❌ Chiudi
            </button>
          </div>
          
          <div id="status" class="status"></div>
        </div>
        
        <script>
          const allDrugs = ${drugsJSON};
          const routeData = {};
          const noteData = {};
          
          // Initialize
          function initRouteList() {
            const container = document.getElementById('routeList');
            container.innerHTML = allDrugs.map(drug => \`
              <div class="drug-grid" data-drug="\${drug}">
                <div class="drug-name">\${drug}</div>
                <div class="route-buttons">
                  <div class="route-btn route-C" onclick="setRoute('\${drug}', 'C')">
                    Centrale
                  </div>
                  <div class="route-btn route-P" onclick="setRoute('\${drug}', 'P')">
                    Periferica
                  </div>
                  <div class="route-btn route-CP" onclick="setRoute('\${drug}', 'C+P')">
                    Entrambe
                  </div>
                  <div class="route-btn route-X" onclick="setRoute('\${drug}', '')">
                    -
                  </div>
                </div>
                <input 
                  type="text" 
                  class="note-input" 
                  placeholder="Note sulla via..." 
                  oninput="setNote('\${drug}', this.value)"
                />
              </div>
            \`).join('');
          }
          
          // Search
          document.getElementById('routeSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.drug-grid');
            
            items.forEach(item => {
              const drugName = item.getAttribute('data-drug').toLowerCase();
              if (drugName.includes(searchTerm)) {
                item.classList.remove('hidden');
              } else {
                item.classList.add('hidden');
              }
            });
          });
          
          // Set route
          function setRoute(drug, value) {
            routeData[drug] = value;
            
            // Update UI
            const grid = event.target.closest('.drug-grid');
            grid.querySelectorAll('.route-btn').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            if (value) {
              const btnClass = value === 'C+P' ? 'route-CP' : \`route-\${value}\`;
              grid.querySelector(\`.\${btnClass}\`).classList.add('selected');
            } else {
              grid.querySelector('.route-X').classList.add('selected');
            }
          }
          
          // Set note
          function setNote(drug, note) {
            noteData[drug] = note;
          }
          
          // Save all routes
          function saveAllRoutes() {
            showStatus('Salvataggio in corso...', 'success');
            
            const dataToSave = {
              routes: routeData,
              notes: noteData
            };
            
            google.script.run
              .withSuccessHandler(onSaveSuccess)
              .withFailureHandler(onSaveError)
              .saveRouteData(dataToSave);
          }
          
          function onSaveSuccess(result) {
            showStatus(\`✅ \${result.message} (\${result.saved} vie salvate)\`, 'success');
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
          
          // Initialize
          initRouteList();
        </script>
      </body>
    </html>
  `;
}

/**
 * Salva dati via somministrazione
 */
function saveRouteData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Trova colonna "VIA CENTRALE / PERIFERICA"
  const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let routeColIndex = -1;

  for (let i = 0; i < headerRow.length; i++) {
    if (
      headerRow[i].toString().toUpperCase().includes('VIA CENTRALE') ||
      headerRow[i].toString().toUpperCase().includes('PERIFERICA')
    ) {
      routeColIndex = i + 1; // +1 perché getRange usa 1-based indexing
      break;
    }
  }

  if (routeColIndex === -1) {
    throw new Error('Colonna "VIA CENTRALE / PERIFERICA" non trovata');
  }

  const drugRowMap = getDrugRowMap();
  let savedCount = 0;

  // Estrai routes e notes
  const routes = data.routes || {};
  const notes = data.notes || {};

  // Salva via somministrazione + note per ogni farmaco
  for (const drug of Object.keys(routes)) {
    const route = routes[drug];
    const note = notes[drug] || '';

    if (!drugRowMap[drug]) continue;

    const row = drugRowMap[drug];

    // Componi valore: route + note (se presente)
    let cellValue = route || '';
    if (note && note.trim() !== '') {
      cellValue = cellValue ? `${cellValue}\n${note}` : note;
    }

    const cell = sheet.getRange(row, routeColIndex);
    cell.setValue(cellValue);

    // Formattazione
    cell.setFontSize(10);
    cell.setVerticalAlignment('middle');
    cell.setWrap(true);

    savedCount++;
  }

  // Salva anche le note per farmaci senza route selezionata
  for (const drug of Object.keys(notes)) {
    if (routes[drug]) continue; // Già salvato sopra

    const note = notes[drug];
    if (!note || note.trim() === '' || !drugRowMap[drug]) continue;

    const row = drugRowMap[drug];
    const cell = sheet.getRange(row, routeColIndex);
    cell.setValue(note);
    cell.setFontSize(10);
    cell.setVerticalAlignment('middle');
    cell.setWrap(true);

    savedCount++;
  }

  return {
    success: true,
    message: 'Vie somministrazione salvate',
    saved: savedCount,
  };
}

/**
 * HTML per dialog aggiunta nuovo farmaco
 */
function getAddDrugDialogHTML() {
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
          }
          .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h2 {
            color: #1976d2;
            margin-top: 0;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }
          input {
            width: 100%;
            padding: 10px;
            border: 2px solid #1976d2;
            border-radius: 6px;
            font-size: 16px;
          }
          input:focus {
            outline: none;
            border-color: #0d47a1;
            box-shadow: 0 0 5px rgba(25,118,210,0.3);
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
          .btn-secondary {
            background: #757575;
            color: white;
          }
          .info {
            background: #e3f2fd;
            padding: 10px;
            border-radius: 4px;
            margin-top: 15px;
            font-size: 12px;
            color: #1976d2;
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
          }
          .status.error {
            background: #ffcdd2;
            color: #c62828;
          }
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
            <button class="btn btn-primary" onclick="addNewDrug()">
              ➕ Aggiungi Farmaco
            </button>
            <button class="btn btn-secondary" onclick="google.script.host.close()">
              ❌ Annulla
            </button>
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

/**
 * Aggiunge un nuovo farmaco in ordine alfabetico preservando tutti i dati
 * OTTIMIZZATO: Usa batch operations per migliori performance
 */
function addNewDrugInAlphabeticalOrder(newDrugName) {
  const startTime = new Date().getTime();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Validazione nome farmaco
  if (!newDrugName || newDrugName.trim() === '') {
    throw new Error('Nome farmaco non valido');
  }

  newDrugName = newDrugName.trim().toUpperCase();

  // Ottieni lista farmaci esistenti
  const existingDrugs = getDrugsList();

  // Verifica se farmaco già esiste
  if (existingDrugs.includes(newDrugName)) {
    throw new Error(`Il farmaco "${newDrugName}" esiste già nella tabella`);
  }

  // 1. BACKUP DATI ESISTENTI (OTTIMIZZATO con batch read)
  const drugColumnMap = getDrugColumnMap();
  const drugRowMap = getDrugRowMap();

  // Trova la ULTIMA colonna speciale, poi i farmaci iniziano DOPO
  const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let lastSpecialCol = 0;

  // Trova l'ultima colonna speciale
  for (let i = 0; i < headerRow.length; i++) {
    const cellValue = headerRow[i].toString().trim().toUpperCase();
    if (
      cellValue === 'PRINCIPIO ATTIVO' ||
      cellValue.includes('FOTOSENS') ||
      cellValue.includes('VIA CENTRALE') ||
      cellValue.includes('PERIFERICA')
    ) {
      lastSpecialCol = i + 1; // i è 0-based, vogliamo 1-based (colonna effettiva)
    }
  }

  // firstDrugCol è la colonna DOPO l'ultima speciale
  let firstDrugCol = lastSpecialCol + 1;

  // Se non trova colonne speciali, parte da colonna D (4)
  if (firstDrugCol <= 1) {
    firstDrugCol = 4; // Colonna D (A=1, B=2, C=3, D=4)
  }

  const numDrugs = existingDrugs.length;
  const firstDrugRow = Math.min(...Object.values(drugRowMap));
  const lastDrugRow = Math.max(...Object.values(drugRowMap));
  const lastDrugCol = Math.max(...Object.values(drugColumnMap));

  // Leggi TUTTI i dati in una volta (MOLTO più veloce!)
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
      const value = values[rowIndex][colIndex];

      if (value) {
        compatibilityBackup[drug1][drug2] = {
          value: value,
          background: backgrounds[rowIndex][colIndex],
          fontColor: fontColors[rowIndex][colIndex],
          fontWeight: fontWeights[rowIndex][colIndex],
        };
      }
    }
  }

  // 2. TROVA POSIZIONE ALFABETICA
  const allDrugs = [...existingDrugs, newDrugName].sort();
  const newDrugIndex = allDrugs.indexOf(newDrugName);

  // 3. INSERISCI RIGA E COLONNA
  const newRow = newDrugIndex + 2; // +2 per header (riga 1 = header)
  const newCol = firstDrugCol + newDrugIndex;

  // Inserisci nuova riga e colonna
  sheet.insertRowBefore(newRow);
  sheet.insertColumnBefore(newCol);

  // PULISCI LA NUOVA RIGA E COLONNA (rimuove colori copiati automaticamente)
  // Pulisci tutta la nuova riga (dalle colonne dei farmaci in poi)
  const lastCol = sheet.getLastColumn();
  if (lastCol >= firstDrugCol) {
    const newRowRange = sheet.getRange(newRow, firstDrugCol, 1, lastCol - firstDrugCol + 1);
    newRowRange.clearContent();
    newRowRange.setBackground(null);
    newRowRange.setFontColor(null);
    newRowRange.setFontWeight('normal');
  }

  // Pulisci tutta la nuova colonna (dalle righe dei farmaci in poi)
  const lastRow = sheet.getLastRow();
  if (lastRow >= firstDrugRow) {
    const newColRange = sheet.getRange(firstDrugRow, newCol, lastRow - firstDrugRow + 1, 1);
    newColRange.clearContent();
    newColRange.setBackground(null);
    newColRange.setFontColor(null);
    newColRange.setFontWeight('normal');
  }

  // 4. SCRIVI HEADER (batch operation)
  const headerUpdates = [
    [newDrugName], // Header colonna
  ];

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

  // 5. RICOSTRUISCI MAPPE AGGIORNATE
  const newDrugColumnMap = getDrugColumnMap();
  const newDrugRowMap = getDrugRowMap();

  // 6. RIPRISTINA DATI (OTTIMIZZATO: prepara batch updates)
  const cellsToUpdate = [];

  for (const drug1 of Object.keys(compatibilityBackup)) {
    for (const drug2 of Object.keys(compatibilityBackup[drug1])) {
      if (newDrugRowMap[drug1] && newDrugColumnMap[drug2]) {
        const row = newDrugRowMap[drug1];
        const col = newDrugColumnMap[drug2];
        const data = compatibilityBackup[drug1][drug2];

        cellsToUpdate.push({
          row: row,
          col: col,
          value: data.value,
          background: data.background,
          fontColor: data.fontColor,
          fontWeight: data.fontWeight,
        });
      }
    }
  }

  // Applica aggiornamenti in batch (più efficiente)
  cellsToUpdate.forEach((update) => {
    const cell = sheet.getRange(update.row, update.col);
    cell.setValue(update.value);
    cell.setBackground(update.background);
    cell.setFontColor(update.fontColor);
    cell.setFontWeight(update.fontWeight);
    cell.setHorizontalAlignment('center');
  });

  // 7. RIEMPIE CELLE DIAGONALI CON "null" GRIGIO
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

  const endTime = new Date().getTime();
  const executionTime = ((endTime - startTime) / 1000).toFixed(2);

  return {
    success: true,
    message: `Farmaco "${newDrugName}" aggiunto in posizione ${newDrugIndex + 1} di ${allDrugs.length}. Tutti i dati preservati! (${executionTime}s)`,
  };
}

/**
 * Mostra legenda codici
 */
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
   
❓ (vuoto) = NESSUN DATO
   Informazione non disponibile
   Verificare con altre fonti
  `;

  ui.alert('Legenda Codici', message, ui.ButtonSet.OK);
}
