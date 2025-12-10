/**
 * Boot file per il caricamento del database farmaci
 * 
 * Questo file viene eseguito all'avvio dell'app per precaricare
 * il database dei farmaci dal file JSON.
 */

import { boot } from 'quasar/wrappers';
import { drugDatabaseService } from 'src/services/drug-database.service';

export default boot(async ({ app }) => {
  try {
    console.log('🔄 Caricamento database farmaci...');
    
    // Carica il database dal file JSON nella cartella public
    await drugDatabaseService.loadDatabase('/data/drugs-database.min.json');
    
    console.log('✅ Database farmaci caricato con successo!');
    console.log(`📊 Totale farmaci: ${drugDatabaseService.getAllDrugs().length}`);
    
    // Rendi il servizio disponibile globalmente (opzionale)
    app.config.globalProperties.$drugDatabase = drugDatabaseService;
  } catch (error) {
    console.error('❌ Errore nel caricamento del database farmaci:', error);
    throw error;
  }
});
