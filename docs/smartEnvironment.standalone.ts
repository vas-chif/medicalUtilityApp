/**
 * @file smartEnvironment.standalone.ts
 * @description 🧠 SISTEMA AUTO-DETECTION STANDALONE - Pronto per Nuovi Progetti
 * @version 1.0.0
 * @author ProfessioneSiCura Development Team
 *
 * 🎯 COME USARE:
 * 1. Copia questo file nel tuo progetto (src/utils/ o src/composables/)
 * 2. Adatta ISmartConfig per i tuoi servizi
 * 3. Importa e usa: import { useSmartEnvironment } from './smartEnvironment.standalone'
 *
 * ✅ COMPATIBILITÀ:
 * - Vue.js 3+ (con reactive)
 * - React (rimuovi reactive/computed)
 * - Angular (converti in Service)
 * - Vanilla JS (usa solo le funzioni pure)
 */

// =============================================================================
// 📊 TYPES - Adatta questi per il tuo progetto
// =============================================================================

export type EnvironmentType = 'development' | 'production' | 'staging' | 'test';

export type HostingType =
  | 'localhost'
  | 'netlify'
  | 'vercel'
  | 'firebase'
  | 'aws'
  | 'heroku'
  | 'other';

export interface ISmartConfig {
  // 🌍 Environment detection
  environment: EnvironmentType;
  hosting: HostingType;
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
  isTest: boolean;

  // 💰 Cost optimization (adatta per i tuoi servizi!)
  enableRemoteLogging: boolean; // Firebase, Sentry, Datadog, ecc.
  enableAnalytics: boolean; // Google Analytics, Mixpanel, ecc.
  enablePushNotifications: boolean; // Firebase Cloud Messaging, OneSignal, ecc.
  enableRealtimeUpdates: boolean; // WebSockets, Firebase Realtime, ecc.
  enableFileUpload: boolean; // AWS S3, Firebase Storage, ecc.

  // ⚡ Performance
  cacheTTL: number; // Cache Time-To-Live (milliseconds)
  maxApiCallsPerHour: number; // Rate limiting
  enableDebugMode: boolean; // Verbose logging, dev tools, ecc.

  // 📊 Metadata
  detectedAt: Date;
  hostname: string;
  protocol: string;
  port: string;
}

// =============================================================================
// 🔍 DETECTION FUNCTIONS - Cuore del sistema
// =============================================================================

/**
 * 🏠 STEP 1: Rileva tipo di hosting
 * Identifica dove l'app è deployata (localhost, Netlify, Vercel, ecc.)
 */
function detectHosting(): HostingType {
  const hostname = window.location.hostname;
  const host = window.location.host;

  // 🏠 Localhost patterns (development)
  const localhostPatterns = [
    'localhost',
    '127.0.0.1',
    '::1', // IPv6 localhost
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
    // Porta custom (es. :3000, :8080)
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
 * 🌍 STEP 2: Rileva ambiente di esecuzione
 * Determina se siamo in development, staging o production
 *
 * PRIORITÀ DI DETECTION:
 * 1️⃣ Hostname (più affidabile)
 * 2️⃣ Environment variables (dipende da bundler)
 * 3️⃣ URL patterns (fallback)
 * 4️⃣ Default = production (sicuro)
 */
function detectEnvironment(): EnvironmentType {
  // 1️⃣ PRIORITY 1: Hosting type
  const hosting = detectHosting();
  if (hosting === 'localhost') {
    return 'development';
  }

  // Priority 2: Check environment variables (Vite, Webpack, etc.)
  // Safe access to import.meta.env (may not exist in all environments)
  interface ImportMetaEnv {
    MODE?: string;
    NODE_ENV?: string;
    [key: string]: string | undefined;
  }

  interface ImportMeta {
    env?: ImportMetaEnv;
  }

  const importMeta = typeof import.meta !== 'undefined' ? (import.meta as ImportMeta) : null;
  const viteMode = importMeta?.env?.MODE;
  const nodeEnv =
    importMeta?.env?.NODE_ENV ||
    (typeof process !== 'undefined' ? process.env.NODE_ENV : undefined);

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

  if (hostname.includes('test.') || hostname.includes('qa.') || hostname.includes('-test.')) {
    return 'test';
  }

  // 4️⃣ DEFAULT: Se online e non localhost → production (sicuro)
  return 'production';
}

/**
 * 💰 STEP 3: Genera configurazione intelligente
 * Ottimizza automaticamente per costi e performance
 */
function generateSmartConfig(): ISmartConfig {
  const environment = detectEnvironment();
  const hosting = detectHosting();

  // 🎯 Flags booleani di comodo
  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';
  const isStaging = environment === 'staging';
  const isTest = environment === 'test';
  const isLocalhost = hosting === 'localhost';

  // 💰 COST OPTIMIZATION - Adatta per i tuoi servizi!
  const config: ISmartConfig = {
    // Environment info
    environment,
    hosting,
    isDevelopment,
    isProduction,
    isStaging,
    isTest,

    // 🏠 Development/Localhost: TUTTO GRATUITO!
    // 🚀 Production: Servizi abilitati selettivamente
    enableRemoteLogging: !isDevelopment && !isLocalhost,
    enableAnalytics: !isDevelopment && !isLocalhost,
    enablePushNotifications: !isDevelopment,
    enableRealtimeUpdates: !isDevelopment && !isTest,
    enableFileUpload: true, // Sempre abilitato (locale in dev, cloud in prod)

    // ⚡ Performance tuning
    cacheTTL: isDevelopment ? 60000 : 300000, // 1min dev, 5min prod
    maxApiCallsPerHour: isDevelopment ? 1000 : 100, // Rate limiting
    enableDebugMode: isDevelopment || isTest, // Debug solo in dev/test

    // 📊 Metadata
    detectedAt: new Date(),
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    port: window.location.port || (window.location.protocol === 'https:' ? '443' : '80'),
  };

  return config;
}

// =============================================================================
// 🎯 PUBLIC API - Esporta questo per usare nel progetto
// =============================================================================

/**
 * 🧠 COMPOSABLE PRINCIPALE
 *
 * Uso in Vue 3:
 * ```typescript
 * import { useSmartEnvironment } from './smartEnvironment.standalone';
 * const { config, isDev, shouldUseService } = useSmartEnvironment();
 * ```
 *
 * Uso in React:
 * ```typescript
 * const config = useSmartEnvironment();
 * if (config.enableAnalytics) { ... }
 * ```
 */
export function useSmartEnvironment() {
  const config = generateSmartConfig();

  // 📊 Helper functions
  const helpers = {
    /**
     * Verifica se un servizio dovrebbe essere abilitato
     * @example shouldUseService('enableRemoteLogging')
     */
    shouldUseService(serviceName: keyof ISmartConfig): boolean {
      return Boolean(config[serviceName]);
    },

    /**
     * Ottieni limite API ottimizzato
     */
    getApiLimit(): number {
      return config.maxApiCallsPerHour;
    },

    /**
     * Ottieni cache TTL
     */
    getCacheTTL(): number {
      return config.cacheTTL;
    },

    /**
     * Status emoji per logging
     */
    getStatusEmoji(): string {
      switch (config.environment) {
        case 'development':
          return '🏠';
        case 'staging':
          return '🧪';
        case 'test':
          return '🔬';
        case 'production':
          return '🚀';
        default:
          return '❓';
      }
    },

    /**
     * Cost status per monitoring
     */
    getCostStatus(): string {
      if (config.isDevelopment || config.hosting === 'localhost') {
        return '💰 ZERO COST (development)';
      }
      if (config.isStaging) {
        return '💛 LOW COST (staging)';
      }
      return '💸 PRODUCTION COST';
    },

    /**
     * Log configurazione (solo in development)
     */
    logConfig(): void {
      if (config.enableDebugMode && console) {
        console.group('🧠 Smart Environment Auto-Detection');
        console.log(`${helpers.getStatusEmoji()} Environment:`, config.environment);
        console.log('🏠 Hosting:', config.hosting);
        console.log('💰 Cost Status:', helpers.getCostStatus());
        console.log('🌐 Remote Logging:', config.enableRemoteLogging ? '✅ ON' : '❌ OFF');
        console.log('📊 Analytics:', config.enableAnalytics ? '✅ ON' : '❌ OFF');
        console.log('⚡ Cache TTL:', `${config.cacheTTL / 1000}s`);
        console.log('📍 Hostname:', config.hostname);
        console.groupEnd();
      }
    },
  };

  // 📊 Auto-log in development
  helpers.logConfig();

  return {
    config,
    ...helpers,

    // Alias per comodità
    isDev: config.isDevelopment,
    isProd: config.isProduction,
    isStaging: config.isStaging,
  };
}

// =============================================================================
// 📚 ESEMPI D'USO
// =============================================================================

/**
 * ESEMPIO 1: Firebase Remote Logging
 *
 * ```typescript
 * const { config } = useSmartEnvironment();
 *
 * const log = (message: string) => {
 *   console.log(message);  // Sempre locale
 *
 *   if (config.enableRemoteLogging) {
 *     sendToFirebase(message);  // Solo in production!
 *   }
 * };
 * ```
 */

/**
 * ESEMPIO 2: Google Analytics
 *
 * ```typescript
 * const { config } = useSmartEnvironment();
 *
 * if (config.enableAnalytics) {
 *   gtag('event', 'page_view', {
 *     page_path: window.location.pathname
 *   });
 * }
 * ```
 */

/**
 * ESEMPIO 3: API con Rate Limiting
 *
 * ```typescript
 * const { getApiLimit, getCacheTTL } = useSmartEnvironment();
 *
 * const fetchData = async (url: string) => {
 *   const cached = getFromCache(url, getCacheTTL());
 *   if (cached) return cached;
 *
 *   // Check rate limit
 *   if (apiCallCount > getApiLimit()) {
 *     throw new Error('Rate limit exceeded');
 *   }
 *
 *   const data = await fetch(url);
 *   saveToCache(url, data);
 *   return data;
 * };
 * ```
 */

/**
 * ESEMPIO 4: Feature Flags
 *
 * ```typescript
 * const { isDev, isStaging } = useSmartEnvironment();
 *
 * const features = {
 *   betaUI: isDev || isStaging,
 *   debugPanel: isDev,
 *   experimentalAPI: isDev,
 * };
 *
 * if (features.betaUI) {
 *   showBetaFeatures();
 * }
 * ```
 */

// =============================================================================
// 🧪 TESTING UTILITIES (opzionale)
// =============================================================================

/**
 * Override environment per testing
 * ⚠️ Solo per unit tests!
 */
export function mockEnvironment(env: EnvironmentType): ISmartConfig {
  // Mock window.location
  Object.defineProperty(window, 'location', {
    value: {
      hostname: env === 'development' ? 'localhost' : 'myapp.com',
      protocol: 'https:',
      port: env === 'development' ? '3000' : '443',
    },
    writable: true,
  });

  return generateSmartConfig();
}

// =============================================================================
// 🚀 EXPORT DEFAULT (opzionale)
// =============================================================================

export default useSmartEnvironment;

/**
 * 🎓 LEZIONI CHIAVE:
 *
 * 1. ✅ Hostname è la fonte più affidabile per detection
 * 2. ✅ Fallback multipli garantiscono robustezza
 * 3. ✅ Default sicuro = production (se in dubbio)
 * 4. ✅ Ottimizzazione automatica = zero errori umani
 * 5. ✅ Log solo in development = privacy e performance
 *
 * 💰 RISPARMIO TIPICO:
 * - Firebase Logging: €5-15/mese
 * - Google Analytics: €0 (ma dati più puliti)
 * - Sentry/Datadog: €10-50/mese
 * - TOTALE: €15-65/mese risparmiati!
 */
