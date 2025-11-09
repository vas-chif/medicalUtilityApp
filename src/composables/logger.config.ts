/**
 * @file logger.config.ts
 * @description Configurazione del sistema di logging sicuro
 * @author ProfessioneSiCura Development Team
 */

import type { ILoggerConfig } from './useSecureLogger';
// REMOVED: import { useSecureLogger } from './useSecureLogger'; // Circular dependency

/**
 * @description Configurazione base del logger
 */
// REMOVED: const { logger } = useSecureLogger(); // Circular dependency removed

export const loggerConfig: ILoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? 'ERROR' : 'DEBUG',
  enableConsole: process.env.NODE_ENV !== 'production',
  enableRemote: false, // 🔥 DISABILITATO per evitare costi Firebase - usa solo localStorage
  sanitizeData: true,
  gdprCompliant: true, // 🔒 GDPR compliance sempre attivo
  cybersecurityEnabled: true, // 🔒 Cybersecurity sempre attivo
};

/** Configurazioni specifiche per ambiente (🔒 SECURITY ENHANCED) */
export const environmentConfigs = {
  development: {
    ...loggerConfig,
    minLevel: 'DEBUG' as const,
    enableConsole: true,
    enableRemote: false,
    gdprCompliant: true,
    cybersecurityEnabled: true,
  },

  production: {
    ...loggerConfig,
    minLevel: 'ERROR' as const,
    enableConsole: false,
    enableRemote: false, // 🔥 DISABILITATO per evitare costi Firebase
    gdprCompliant: true,
    cybersecurityEnabled: true,
  },

  test: {
    ...loggerConfig,
    minLevel: 'ERROR' as const,
    enableConsole: false,
    enableRemote: false,
    gdprCompliant: true,
    cybersecurityEnabled: false, // 🔒 In test, cybersecurity può essere disabilitato
  },
};

/**
 * Funzione per ottenere la configurazione dell'ambiente corrente
 */
export function getCurrentEnvironmentConfig(): ILoggerConfig {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return environmentConfigs.production;
    case 'test':
      return environmentConfigs.test;
    default:
      return environmentConfigs.development;
  }
}

/**
 * Lista di campi sensibili da sanitizzare automaticamente (AGGIORNATA)
 */
export const SENSITIVE_FIELDS = [
  /** Autenticazione e autorizzazione */
  'password',
  'token',
  'secret',
  'key',
  'privateKey',
  'apiKey',
  'accessToken',
  'refreshToken',
  'sessionToken',
  'authToken',
  'firebaseIdToken',
  'customToken',

  /** Dati personali */
  'email',
  'userEmail',
  'emailAddress',
  'phone',
  'phoneNumber',
  'mobile',
  'cellphone',
  'telephone',

  /** Identificatori */
  'uid',
  'userId',
  'firebaseUid',
  'sessionId',
  'deviceId',
  'installationId',
  'anonymousId',

  /** Dati finanziari */
  'creditCard',
  'cardNumber',
  'cvv',
  'cvv2',
  'cvc',
  'expiry',
  'expiryDate',
  'bankAccount',
  'iban',
  'swift',
  'bic',
  'routingNumber',

  /** Documenti italiani */
  'codiceFiscale',
  'partitaIva',
  'documentNumber',
  'patente',
  'passaporto',
  'cartaIdentita',

  /** Informazioni sensibili */
  'ssn',
  'socialSecurity',
  'taxId',
  'address',
  'homeAddress',
  'fullAddress',
  'birthDate',
  'dateOfBirth',
  'birthPlace',
  'nationality',

  /** Dati categoriali */
  'personalInfo',
  'userData',
  'profileData',
  'medicalInfo',
  'healthData',
  'financialInfo',
  'biometricData',
  'location',
  'gpsCoordinates',
  'latitude',
  'longitude',
] as const;

/**
 * Pattern per identificare dati sensibili (AGGIORNATO PER SICUREZZA)
 */
export const SENSITIVE_PATTERNS = [
  /** Carte di credito (Visa, MasterCard, AmEx, etc.) */
  /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/,

  /** Email (pattern più sicuro) */
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,

  /** Telefoni italiani (+39 e varianti) */
  /(\+39|0039)?[\s]?([0-9]{2,3}[\s]?[0-9]{6,7}|[0-9]{3}[\s]?[0-9]{7})/,

  /** Telefoni internazionali generici */
  /\+[1-9]\d{1,14}/,

  /** Codice Fiscale Italiano */
  /[A-Z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]/,

  /** IBAN Europeo (pattern più preciso) */
  /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b/,

  /** Partita IVA Italiana */
  /[0-9]{11}/,

  /** Token/JWT pattern */
  /eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*/,

  /** UUID pattern */
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
];

/**
 * Verifica se una stringa contiene dati sensibili
 */
export function containsSensitiveData(value: string): boolean {
  if (typeof value !== 'string') return false;

  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(value));
}

/**
 * Maschera dati sensibili in una stringa (SICUREZZA MIGLIORATA)
 */
export function maskSensitiveData(value: string): string {
  if (typeof value !== 'string') return value;

  let masked = value;

  /** Maschera email (preserva dominio per debug) */
  masked = masked.replace(/\b[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b/g, '***@$1');

  /** Maschera carte di credito */
  masked = masked.replace(
    /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    (match) => '*'.repeat(match.length - 4) + match.slice(-4),
  );

  /** Maschera telefoni italiani */
  masked = masked.replace(
    /(\+39|0039)?[\s]?([0-9]{2,3}[\s]?[0-9]{6,7}|[0-9]{3}[\s]?[0-9]{7})/g,
    '[PHONE_REDACTED]',
  );

  /** Maschera codici fiscali */
  masked = masked.replace(
    /[A-Z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]/g,
    '[CF_REDACTED]',
  );

  /** Maschera IBAN */
  masked = masked.replace(
    /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b/g,
    '[IBAN_REDACTED]',
  );

  /** Maschera token/JWT */
  masked = masked.replace(
    /eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*/g,
    '[TOKEN_REDACTED]',
  );

  /** Maschera UUID */
  masked = masked.replace(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
    '[UUID_REDACTED]',
  );

  return masked;
}

/**
 * Configurazione per il sistema di logging remoto Firebase
 */
export const remoteLoggingConfig = {
  /** Sistema Firebase (GRATUITO e già deployato) */
  firebase: {
    enabled: process.env.VITE_FIREBASE_LOGGING_ENABLED === 'true',
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'professionesicura-48cf2',
    functionRegion: 'europe-west8',
    functionName: 'receiveLog',
    maxBatchSize: 10,
    batchTimeoutMs: 30000, // 30 secondi
  },

  /** Firebase Crashlytics (GRATUITO per errori app) */
  crashlytics: {
    enabled: process.env.VITE_CRASHLYTICS_ENABLED === 'true',
    collectUserData: false, // Privacy compliance
    automaticDataCollection: true,
  },

  /** Performance Monitoring Firebase (GRATUITO) */
  performance: {
    enabled: process.env.VITE_FIREBASE_PERFORMANCE_ENABLED === 'true',
    traceSamplingRate: 0.1, // 10% delle trace
    networkRequestSamplingRate: 0.1,
  },
};

/**
 * Inizializza il sistema di logging remoto Firebase (SICUREZZA MIGLIORATA)
 */
export async function initializeRemoteLogging(): Promise<boolean> {
  /** SICUREZZA: Non loggare in produzione configurazioni sensibili */
  const isProduction = process.env.NODE_ENV === 'production';

  // Logger interface per fallback a console
  interface IMinimalLogger {
    info: (message: string) => void;
    error: (message: string) => void;
  }

  // Get logger instance dynamically to avoid circular import
  let logger: IMinimalLogger = console;
  try {
    // Dynamic import per evitare circular dependency
    const loggerModule = await import('./useSecureLogger');
    const { useSecureLogger } = loggerModule;
    const loggerInstance = useSecureLogger().logger;

    // Adatta logger instance al minimal interface
    logger = {
      info: (message: string) => loggerInstance.info(message),
      error: (message: string) => loggerInstance.error(message),
    };
  } catch {
    // Fallback to console if logger not available
    logger = console;
  }

  if (remoteLoggingConfig.firebase.enabled) {
    if (!isProduction && logger) {
      logger.info('🔧 Inizializzazione Firebase Remote Logging...');
    }

    /** Validazione configurazione Firebase */
    if (!remoteLoggingConfig.firebase.projectId) {
      if (logger) {
        logger.error('❌ Firebase Project ID non configurato');
      }
      return false;
    }

    if (!isProduction && logger) {
      logger.info(
        `✅ Firebase Logging attivo - Progetto: ${remoteLoggingConfig.firebase.projectId}`,
      );
      logger.info(`📍 Regione: ${remoteLoggingConfig.firebase.functionRegion}`);
      logger.info(`⚡ Funzione: ${remoteLoggingConfig.firebase.functionName}`);
    }
  }

  if (remoteLoggingConfig.crashlytics.enabled) {
    if (!isProduction && logger) {
      logger.info('🔧 Inizializzazione Firebase Crashlytics...');
    }
    /** Crashlytics si inizializza automaticamente con Firebase SDK */
  }

  if (remoteLoggingConfig.performance.enabled) {
    if (!isProduction && logger) {
      logger.info('🔧 Inizializzazione Firebase Performance Monitoring...');
    }
    /** Performance Monitoring si inizializza automaticamente con Firebase SDK */
  }

  if (!isProduction && logger) {
    logger.info('🚀 Sistema di logging remoto Firebase inizializzato con successo!');
  }

  return true;
}
