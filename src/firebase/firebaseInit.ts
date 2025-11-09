/**
 * @file firebaseInit.ts
 * @description 🧠 SMART Firebase configuration con auto-detection ambiente
 * @version 2.0.0 - Auto-switching dev/prod
 *
 * 🎯 FUNZIONALITÀ:
 * - Auto-detection development vs production
 * - Carica automaticamente .env.development o .env.production
 * - Ottimizzazione costi: logging remoto solo in production
 * - Configurazione sicura (chiavi in .env, mai hardcoded)
 *
 * 📚 ESEMPIO UTILIZZO:
 * ```typescript
 * import { app, auth, db } from 'src/firebase/firebaseInit';
 * // Configurazione automatica basata su ambiente!
 * ```
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import type { Functions } from 'firebase/functions';

import { useSecureLogger } from '../composables/useSecureLogger';
import { useSmartEnvironment } from '../composables/useSmartEnvironment';

const { logger } = useSecureLogger();

// 🧠 AUTO-DETECTION AMBIENTE
const { config, firebaseConfig } = useSmartEnvironment();

/**
 * 🔍 VALIDAZIONE: Verifica che le variabili siano caricate
 */
if (!firebaseConfig.value.projectId) {
  logger.error('🚨 ERRORE: Firebase config non trovato! Controlla file .env');
  logger.error(`   🔍 Ambiente rilevato: ${config.environment}`);
  logger.error(`   🏠 Hosting rilevato: ${config.hosting}`);
  logger.info('📋 Variabili attese nel file .env:');
  logger.info('   - VITE_FIREBASE_PROJECT_ID');
  logger.info('   - VITE_FIREBASE_API_KEY');
  logger.info('   - VITE_FIREBASE_AUTH_DOMAIN');
  logger.info('   - VITE_FIREBASE_STORAGE_BUCKET');
  logger.info('   - VITE_FIREBASE_MESSAGING_SENDER_ID');
  logger.info('   - VITE_FIREBASE_APP_ID');
  throw new Error('Firebase configuration missing - check .env file');
}

/**
 * 📊 INFO CONFIGURAZIONE (con smart environment)
 */
logger.info('🔥 Firebase inizializzato con SMART ENVIRONMENT:');
logger.info(`   🌍 Ambiente: ${config.environment}`);
logger.info(`   🏠 Hosting: ${config.hosting}`);
logger.info(`   📍 Project: ${firebaseConfig.value.projectId}`);
logger.info(
  `   💰 Remote Logging: ${config.enableRemoteLogging ? '✅ ENABLED (prod)' : '❌ DISABLED (dev)'}`,
);
logger.info(`   📊 Analytics: ${config.enableAnalytics ? '✅ ENABLED' : '❌ DISABLED'}`);
logger.info(`   🐛 Debug Mode: ${config.enableDebugMode ? 'ON' : 'OFF'}`);

/**
 * @description Initializes Firebase with the provided configuration.
 * 🧠 firebaseConfig è reactive, usiamo .value per accedere
 */
const app: FirebaseApp = initializeApp(firebaseConfig.value);

/**
 * @description Firebase services instances.
 */
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const functions: Functions = getFunctions(app, 'europe-west8');

/**
 * 🔧 EMULATOR: Se usi emulatore locale, decommenta questa riga
 */
// if (import.meta.env.DEV) {
//   connectFunctionsEmulator(functions, 'localhost', 5001);
// }

/**
 * @description Exports Firebase services instances.
 */
export { app, auth, db, functions };
