/**
 * @file useSmartEnvironment.ts
 * @description 🧠 Auto-detection ambiente per Medical Utility Pro
 * @version 1.0.0
 * @author Vasile Chifeac
 * 
 * 🎯 FUNZIONALITÀ:
 * - Rileva automaticamente development vs production
 * - Carica variabili .env corrette
 * - Ottimizza costi Firebase (logging remoto solo in prod)
 * - Configurazione Firebase dinamica
 */

import { reactive, computed } from 'vue';

// =============================================================================
// 📊 TYPES
// =============================================================================

export type EnvironmentType = 'development' | 'production' | 'staging' | 'test';

export type HostingType = 'localhost' | 'netlify' | 'vercel' | 'firebase' | 'aws' | 'heroku' | 'other';

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL?: string;
  measurementId?: string;
}

export interface ISmartConfig {
  // 🌍 Environment detection
  environment: EnvironmentType;
  hosting: HostingType;
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
  isTest: boolean;
  
  // 🔥 Firebase configuration
  firebase: IFirebaseConfig;
  
  // 💰 Cost optimization
  enableRemoteLogging: boolean;
  enableAnalytics: boolean;
  enablePushNotifications: boolean;
  enableRealtimeUpdates: boolean;
  
  // ⚡ Performance
  cacheTTL: number;
  maxApiCallsPerHour: number;
  enableDebugMode: boolean;
  
  // 📊 Metadata
  detectedAt: Date;
  hostname: string;
  protocol: string;
  port: string;
}

// =============================================================================
// 🔍 DETECTION FUNCTIONS
// =============================================================================

/**
 * 🏠 Rileva tipo di hosting
 */
function detectHosting(): HostingType {
  const hostname = window.location.hostname;
  const host = window.location.host;
  
  // 🏠 Localhost patterns
  const localhostPatterns = [
    'localhost',
    '127.0.0.1',
    '::1',
  ];
  
  if (localhostPatterns.includes(hostname)) {
    return 'localhost';
  }
  
  // LAN/Private network
  if (
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.endsWith('.local') ||
    host.includes(':')
  ) {
    return 'localhost';
  }
  
  // 🚀 Cloud hosting patterns
  if (hostname.includes('netlify.app') || hostname.includes('netlify.com')) {
    return 'netlify';
  }
  if (hostname.includes('vercel.app') || hostname.includes('vercel.com')) {
    return 'vercel';
  }
  if (hostname.includes('firebaseapp.com') || hostname.includes('web.app')) {
    return 'firebase';
  }
  if (hostname.includes('amazonaws.com') || hostname.includes('.aws')) {
    return 'aws';
  }
  if (hostname.includes('herokuapp.com') || hostname.includes('heroku')) {
    return 'heroku';
  }
  
  return 'other';
}

/**
 * 🌍 Rileva ambiente di esecuzione
 */
function detectEnvironment(): EnvironmentType {
  // 1️⃣ PRIORITY 1: Hosting type
  const hosting = detectHosting();
  if (hosting === 'localhost') {
    return 'development';
  }
  
  // 2️⃣ PRIORITY 2: Environment variables (Vite)
  const viteMode = import.meta.env.MODE;
  const nodeEnv = import.meta.env.VITE_NODE_ENV || import.meta.env.NODE_ENV;
  
  if (viteMode === 'development' || nodeEnv === 'development') {
    return 'development';
  }
  if (viteMode === 'staging' || nodeEnv === 'staging') {
    return 'staging';
  }
  if (viteMode === 'production' || nodeEnv === 'production') {
    return 'production';
  }
  
  // 3️⃣ PRIORITY 3: URL patterns
  const hostname = window.location.hostname;
  
  if (
    hostname.includes('staging') ||
    hostname.includes('stage.') ||
    hostname.includes('dev.') ||
    hostname.includes('-dev.')
  ) {
    return 'staging';
  }
  
  if (
    hostname.includes('test.') ||
    hostname.includes('qa.') ||
    hostname.includes('-test.')
  ) {
    return 'test';
  }
  
  // 4️⃣ DEFAULT: Production (sicuro)
  return 'production';
}

/**
 * 🔥 Carica configurazione Firebase dall'ambiente
 */
function loadFirebaseConfig(): IFirebaseConfig {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
}

/**
 * 💰 Genera configurazione intelligente
 */
function generateSmartConfig(): ISmartConfig {
  const environment = detectEnvironment();
  const hosting = detectHosting();
  const firebase = loadFirebaseConfig();
  
  // 🎯 Flags booleani
  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';
  const isStaging = environment === 'staging';
  const isTest = environment === 'test';
  const isLocalhost = hosting === 'localhost';
  
  // 💰 COST OPTIMIZATION
  const config: ISmartConfig = {
    // Environment info
    environment,
    hosting,
    isDevelopment,
    isProduction,
    isStaging,
    isTest,
    
    // Firebase config
    firebase,
    
    // 💰 Servizi ottimizzati per costi
    // 🏠 Development: TUTTO GRATUITO (solo console locale)
    // 🚀 Production: Servizi cloud abilitati
    enableRemoteLogging: !isDevelopment && !isLocalhost,
    enableAnalytics: !isDevelopment && !isLocalhost,
    enablePushNotifications: !isDevelopment,
    enableRealtimeUpdates: !isDevelopment && !isTest,
    
    // ⚡ Performance tuning
    cacheTTL: isDevelopment ? 60000 : 300000, // 1min dev, 5min prod
    maxApiCallsPerHour: isDevelopment ? 1000 : 100,
    enableDebugMode: isDevelopment || isTest,
    
    // 📊 Metadata
    detectedAt: new Date(),
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    port: window.location.port || (window.location.protocol === 'https:' ? '443' : '80'),
  };
  
  return config;
}

// =============================================================================
// 🎯 COMPOSABLE PRINCIPALE
// =============================================================================

let configInstance: ISmartConfig | null = null;

/**
 * 🧠 Hook principale per auto-detection ambiente
 * 
 * @example
 * ```typescript
 * import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';
 * 
 * const { config, isDev, isProd, firebaseConfig } = useSmartEnvironment();
 * 
 * // Usa configurazione Firebase
 * initializeApp(firebaseConfig.value);
 * 
 * // Controlla se servizio abilitato
 * if (config.value.enableRemoteLogging) {
 *   sendToFirebase(log);
 * }
 * ```
 */
export function useSmartEnvironment() {
  // Singleton: genera config solo una volta
  if (!configInstance) {
    configInstance = generateSmartConfig();
    
    // 📊 Log di detection (solo in development)
    if (configInstance.isDevelopment && console) {
      console.log('🧠 SMART ENVIRONMENT DETECTED:');
      console.log(`   🌍 Environment: ${configInstance.environment}`);
      console.log(`   🏠 Hosting: ${configInstance.hosting}`);
      console.log(`   🔥 Firebase Project: ${configInstance.firebase.projectId}`);
      console.log(`   💰 Remote Logging: ${configInstance.enableRemoteLogging ? 'ENABLED (costs!)' : 'DISABLED (free!)'}`);
      console.log(`   📊 Analytics: ${configInstance.enableAnalytics ? 'ENABLED' : 'DISABLED'}`);
      console.log(`   🐛 Debug Mode: ${configInstance.enableDebugMode ? 'ON' : 'OFF'}`);
    }
  }
  
  // Reactive config
  const config = reactive(configInstance);
  
  // Computed helpers
  const isDev = computed(() => config.isDevelopment);
  const isProd = computed(() => config.isProduction);
  const isStaging = computed(() => config.isStaging);
  const isTest = computed(() => config.isTest);
  const firebaseConfig = computed(() => config.firebase);
  
  /**
   * Verifica se un servizio dovrebbe essere abilitato
   */
  const shouldUseService = (serviceName: keyof ISmartConfig): boolean => {
    return !!config[serviceName];
  };
  
  /**
   * Ottieni limite API
   */
  const getApiLimit = (): number => config.maxApiCallsPerHour;
  
  /**
   * Ottieni cache TTL
   */
  const getCacheTTL = (): number => config.cacheTTL;
  
  /**
   * Log informazioni ambiente (solo development)
   */
  const logEnvironmentInfo = () => {
    if (!config.isDevelopment) return;
    
    console.group('🧠 Smart Environment Configuration');
    console.table({
      Environment: config.environment,
      Hosting: config.hosting,
      'Firebase Project': config.firebase.projectId,
      'Remote Logging': config.enableRemoteLogging,
      Analytics: config.enableAnalytics,
      'Debug Mode': config.enableDebugMode,
      'Cache TTL': `${config.cacheTTL / 1000}s`,
      'API Limit': `${config.maxApiCallsPerHour}/hour`,
    });
    console.groupEnd();
  };
  
  return {
    // Config object
    config,
    
    // Computed flags
    isDev,
    isProd,
    isStaging,
    isTest,
    firebaseConfig,
    
    // Helper functions
    shouldUseService,
    getApiLimit,
    getCacheTTL,
    logEnvironmentInfo,
  };
}

/**
 * 🔥 Export per uso diretto (senza reactive)
 */
export function getSmartConfig(): ISmartConfig {
  if (!configInstance) {
    configInstance = generateSmartConfig();
  }
  return configInstance;
}

export default useSmartEnvironment;
