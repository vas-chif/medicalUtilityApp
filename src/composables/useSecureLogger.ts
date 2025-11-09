/**
 * @file useSecureLogger.ts
 * @description Sistema di logging sicuro con auto-detection environment
 * @author ProfessioneSiCura Development Team
 * @version 2.0.0 - Auto-Detection Intelligente
 */

import { getFunctions, httpsCallable } from 'firebase/functions';
import { maskSensitiveData, containsSensitiveData } from './logger.config';

/**
 * @interface ILogData
 * @description Tipo per dati di log strutturati
 */
export type ILogData = Record<string, unknown> | unknown[] | string | number | boolean | null;

/**
 * @interface IEnvironmentInfo
 * @description Informazioni sull'ambiente di esecuzione
 */
export interface IEnvironmentInfo {
  hostname: string;
  protocol: string;
  port: string;
  isLocalhost: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
  environment: 'development' | 'production';
}

export interface ILoggerConfig {
  minLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'SECURITY';
  enableConsole: boolean;
  enableRemote: boolean;
  sanitizeData: boolean;
  gdprCompliant: boolean;
  cybersecurityEnabled: boolean;
}

interface ILogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: ILogData;
  userId?: string;
  userAgent?: string;
}

interface ILoggerStats {
  environment: IEnvironmentInfo;
  config: ILoggerConfig;
  costOptimized: boolean;
}

interface IUseSecureLoggerReturn {
  logger: SecureLogger;
  debug: (message: string, data?: ILogData) => void;
  info: (message: string, data?: ILogData) => void;
  warn: (message: string, data?: ILogData) => void;
  error: (message: string, data?: ILogData) => void;
  security: (message: string, data?: ILogData) => void;
  getStats: () => ILoggerStats;
  updateConfig: (config: Partial<ILoggerConfig>) => void;
}

/**
 * 🧠 AUTO-DETECTION INTELLIGENTE
 * Rileva automaticamente l'ambiente per ottimizzare i costi
 */
function detectEnvironment(): IEnvironmentInfo {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;

  // 🏠 Detection localhost/development
  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.endsWith('.local');

  // 🛠️ Development environment detection (Vite-safe)
  const isDevelopment =
    isLocalhost ||
    process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' && window.location.hostname.includes('localhost'));

  // 🚀 Production detection
  const isProduction = process.env.NODE_ENV === 'production' && !isDevelopment;

  return {
    hostname,
    protocol,
    port,
    isLocalhost,
    isDevelopment,
    isProduction,
    environment: isDevelopment ? 'development' : 'production',
  };
}

/**
 * 💰 CONFIGURAZIONE AUTO-OTTIMIZZATA PER COSTI
 */
function getOptimizedConfig(customConfig?: Partial<ILoggerConfig>): ILoggerConfig {
  const env = detectEnvironment();

  // 🧠 Configurazione intelligente basata su ambiente
  const autoConfig: ILoggerConfig = {
    // 💰 COST OPTIMIZATION: Remote logging solo in produzione
    enableRemote: !env.isDevelopment,

    // 📱 DEBUG in development, ERROR in production
    minLevel: env.isDevelopment ? 'DEBUG' : 'ERROR',

    // ✅ Console sempre abilitata (gratuita)
    enableConsole: true,

    // 🔒 Sicurezza sempre attiva
    sanitizeData: true,
    gdprCompliant: true,
    cybersecurityEnabled: true,
  };

  // 📊 Log di configurazione (solo in development)
  if (env.isDevelopment && console) {
    console.log('🧠 AUTO-DETECTION RESULT:');
    console.log(`   🏠 Hostname: ${env.hostname}`);
    console.log(`   🌍 Environment: ${env.environment}`);
    console.log(
      `   💰 Remote Logging: ${autoConfig.enableRemote ? 'ENABLED (costs money!)' : 'DISABLED (free!)'}`,
    );
    console.log(`   📱 Log Level: ${autoConfig.minLevel}`);
    console.log(
      `   ✅ Cost Status: ${env.isDevelopment ? 'ZERO COST (development)' : 'OPTIMIZED (production)'}`,
    );
  }

  // 🔧 Merge con configurazione custom se fornita
  return { ...autoConfig, ...customConfig };
}

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SECURITY: 4,
};

const LOG_ICONS = {
  DEBUG: '🔍',
  INFO: 'ℹ️',
  WARN: '⚠️',
  ERROR: '❌',
  SECURITY: '🛡️',
};

/**
 * 🔐 CLASSE LOGGER SICURA
 */
class SecureLogger {
  private config: ILoggerConfig;
  private environment: ReturnType<typeof detectEnvironment>;

  constructor(customConfig?: Partial<ILoggerConfig>) {
    this.environment = detectEnvironment();
    this.config = getOptimizedConfig(customConfig);
  }

  /**
   * 📏 Verifica se il log level è abilitato
   */
  private shouldLog(level: keyof typeof LOG_LEVELS): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.minLevel];
  }

  /**
   * 🔒 Sanitizza dati sensibili
   */
  private sanitize(data: ILogData): ILogData {
    if (!this.config.sanitizeData || typeof data !== 'object' || data === null) {
      return data;
    }

    const sanitized = { ...data } as Record<string, unknown>;

    // 🔒 GDPR Compliance
    if (this.config.gdprCompliant) {
      const sensitiveFields = ['email', 'phone', 'name', 'surname', 'address'];
      sensitiveFields.forEach((field) => {
        if (field in sanitized) {
          sanitized[field] = '[GDPR_REDACTED]';
        }
      });
    }

    // 🛡️ Cybersecurity
    if (this.config.cybersecurityEnabled) {
      Object.keys(sanitized).forEach((key) => {
        if (typeof sanitized[key] === 'string') {
          if (containsSensitiveData(sanitized[key])) {
            sanitized[key] = maskSensitiveData(sanitized[key]);
          }
        }
      });
    }

    return sanitized;
  }

  /**
   * 📡 Invia log remoto a Firebase (SOLO se abilitato)
   */
  private async sendToRemote(level: string, message: string, data?: ILogData): Promise<void> {
    if (!this.config.enableRemote) {
      // 💰 Log di sicurezza: non inviamo se disabilitato
      if (this.environment.isDevelopment) {
        console.log(`💰 REMOTE LOGGING DISABLED - Saving costs! (${level}: ${message})`);
      }
      return;
    }

    try {
      // 🚨 Warning per costi
      if (this.environment.isDevelopment) {
        console.warn('💸 SENDING TO FIREBASE - This costs money!');
      }

      // Preparazione dati per Firebase
      const logEntry: ILogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...(data ? { data: this.sanitize(data) } : {}),
        userId: this.getCurrentUserId() || 'anonymous',
        userAgent: navigator.userAgent.substring(0, 100),
      };

      // Use static import (already imported at top)
      const functions = getFunctions(undefined, 'europe-west8');
      const receiveLog = httpsCallable(functions, 'receiveLog');

      await receiveLog(logEntry);

      if (this.environment.isDevelopment) {
        console.log(`📡 LOG SENT TO FIREBASE: ${level} - ${message}`);
      }
    } catch (error) {
      console.error('❌ FIREBASE LOGGING ERROR:', error);

      // 💾 Fallback: salva in localStorage
      this.saveLocalFallback(level, message, data);
    }
  }

  /**
   * 💾 Salvataggio locale di fallback
   */
  private saveLocalFallback(level: string, message: string, data?: ILogData): void {
    try {
      const logs = JSON.parse(localStorage.getItem('secure_logs') || '[]');
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...(data ? { data: this.sanitize(data) } : {}),
        status: 'local-fallback',
      };

      logs.push(logEntry);

      // Mantieni solo gli ultimi 50 log
      if (logs.length > 50) {
        logs.splice(0, logs.length - 50);
      }

      localStorage.setItem('secure_logs', JSON.stringify(logs));
      console.log('💾 LOG SAVED LOCALLY (fallback)');
    } catch (error) {
      console.error('❌ LOCAL STORAGE ERROR:', error);
    }
  }

  /**
   * 👤 Ottieni ID utente corrente
   */
  private getCurrentUserId(): string | null {
    try {
      // Cerca Firebase Auth - uso type assertion esplicito
      interface WindowWithFirebase extends Window {
        firebaseAuth?: { currentUser?: { uid: string } };
        firebase?: { auth?: { currentUser?: { uid: string } } };
      }
      const win = window as WindowWithFirebase;
      const firebaseAuth = win.firebaseAuth || win.firebase?.auth;
      return firebaseAuth?.currentUser?.uid || null;
    } catch {
      return null;
    }
  }

  /**
   * 📝 Log principale
   */
  private log(level: keyof typeof LOG_LEVELS, message: string, data?: ILogData): void {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const icon = LOG_ICONS[level];
    const formattedMessage = `${icon} [${level}] ${timestamp} ${message}`;

    // 📱 Console output (sempre gratuito)
    if (this.config.enableConsole) {
      switch (level) {
        case 'DEBUG':
          console.debug(formattedMessage, data);
          break;
        case 'INFO':
          console.info(formattedMessage, data);
          break;
        case 'WARN':
          console.warn(formattedMessage, data);
          break;
        case 'ERROR':
          console.error(formattedMessage, data);
          break;
        case 'SECURITY':
          console.error(`🛡️ SECURITY ALERT: ${formattedMessage}`, data);
          break;
      }
    }

    // 📡 Remote logging (solo se abilitato) - usa void per ignorare promise
    if (this.config.enableRemote) {
      void this.sendToRemote(level, message, data);
    }
  }

  // 🎯 METODI PUBBLICI
  debug(message: string, data?: ILogData): void {
    this.log('DEBUG', message, data);
  }

  info(message: string, data?: ILogData): void {
    this.log('INFO', message, data);
  }

  warn(message: string, data?: ILogData): void {
    this.log('WARN', message, data);
  }

  error(message: string, data?: ILogData): void {
    this.log('ERROR', message, data);
  }

  security(message: string, data?: ILogData): void {
    const securityData = {
      ...(typeof data === 'object' && data !== null ? data : { rawData: data }),
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId() || 'anonymous',
      userAgent: navigator.userAgent.substring(0, 100),
      securityLevel: 'HIGH',
    };

    this.log('SECURITY', message, securityData);
  }

  /**
   * 🔧 Aggiorna configurazione
   */
  updateConfig(newConfig: Partial<ILoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (this.environment.isDevelopment) {
      console.log('🔧 Logger config updated:', this.config);
    }
  }

  /**
   * 📊 Ottieni statistiche
   */
  getStats(): ILoggerStats {
    return {
      environment: this.environment,
      config: this.config,
      costOptimized: !this.config.enableRemote || this.environment.isDevelopment,
    };
  }
}

// 💾 Singleton instance
let loggerInstance: SecureLogger | null = null;

/**
 * 🎯 FACTORY FUNCTION PRINCIPALE
 *
 * @param customConfig - Configurazione custom opzionale
 * @returns Logger instance con metodi helper
 */
export function useSecureLogger(customConfig?: Partial<ILoggerConfig>): IUseSecureLoggerReturn {
  // 🔄 Riutilizza istanza se configurazione uguale
  if (loggerInstance === null) {
    loggerInstance = new SecureLogger(customConfig);
  } else if (customConfig) {
    loggerInstance.updateConfig(customConfig);
  }

  return {
    logger: loggerInstance,

    // 🎯 Helper methods per comodità
    debug: (message: string, data?: ILogData) => loggerInstance!.debug(message, data),
    info: (message: string, data?: ILogData) => loggerInstance!.info(message, data),
    warn: (message: string, data?: ILogData) => loggerInstance!.warn(message, data),
    error: (message: string, data?: ILogData) => loggerInstance!.error(message, data),
    security: (message: string, data?: ILogData) => loggerInstance!.security(message, data),

    // 📊 Utilities
    getStats: () => loggerInstance!.getStats(),
    updateConfig: (config: Partial<ILoggerConfig>) => loggerInstance!.updateConfig(config),
  };
}

/**
 * 🎯 ESEMPIO D'USO:
 *
 * ```typescript
 * import { useSecureLogger } from './useSecureLogger';
 *
 * // ✅ Auto-detection (raccomandato)
 * const { logger } = useSecureLogger();
 *
 * // 🏠 In localhost: remote = false, level = DEBUG (GRATIS)
 * // 🚀 In production: remote = true, level = ERROR (OTTIMIZZATO)
 *
 * logger.debug('Debug info', data);    // Console only in development
 * logger.info('User action', data);    // Console only in development
 * logger.error('Critical error', data); // Firebase in production
 *
 * // 🔧 Override manuale (solo se necessario)
 * const customLogger = useSecureLogger({
 *   enableRemote: false,  // Force disable
 *   minLevel: 'WARN'      // Force level
 * });
 * ```
 */

export default useSecureLogger;
