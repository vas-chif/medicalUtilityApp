/**
 * @file useNotifications.ts (Unified Implementation)
 * @description Unified notification system for both mobile and dashboard
 * @version 2.0.0 - UNIFIED VERSION
 * @author ProfessioneSiCura Development Team Vasile Chifeac
 */

import { useSecureLogger } from './useSecureLogger';

// Types for platform detection
type Platform = 'mobile' | 'dashboard';

// Unified notification interface
export interface INotificationOptions {
  message: string;
  type?: 'positive' | 'negative' | 'warning' | 'info';
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  timeout?: number;
  actions?: Array<{
    label: string;
    color?: string;
    handler: () => void;
  }>;
}

// Unified confirmation dialog interface
export interface IConfirmDialogOptions {
  title: string;
  message: string;
  okLabel?: string;
  okColor?: string;
  okFlat?: boolean;
  cancelLabel?: string;
  cancelColor?: string;
  cancelFlat?: boolean;
  persistent?: boolean;
  prompt?: {
    model?: string;
    type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'time' | 'date';
    label?: string;
  };
}

// Menu item interface (platform-agnostic)
export interface IMenuItem {
  label: string;
  path?: string;
  action?: () => void | Promise<void>;
  icon?: string;
  requiresConfirmation?: boolean;
}

/**
 * @function detectPlatform
 * @description Detects the current platform based on route or environment
 */
function detectPlatform(): Platform {
  if (typeof window !== 'undefined') {
    const userAgent = window.navigator.userAgent;
    const path = window.location.pathname;

    // Check if we're running in Capacitor (mobile)
    interface WindowWithCapacitor extends Window {
      Capacitor?: unknown;
    }
    const win = window as WindowWithCapacitor;
    if (win.Capacitor || userAgent.includes('Mobile') || path.includes('mobile')) {
      return 'mobile';
    }
  }

  // Default to dashboard for SSR or uncertain cases
  return 'dashboard';
}

/**
 * @function useNotifications
 * @description Unified notification composable with platform detection
 * @param platform - Force a specific platform (optional)
 */
export function useNotifications(platform?: Platform) {
  const detectedPlatform = platform || detectPlatform();
  const { logger } = useSecureLogger();

  // Quasar instance type
  interface IQuasarInstance {
    notify: (options: {
      message: string;
      type: string;
      position: string;
      timeout: number;
      actions?: Array<{ icon: string; color: string; handler: () => void }>;
    }) => void;
  }

  // Get Quasar instance safely
  let $q: IQuasarInstance | null = null;

  // Define window extension interfaces
  interface WindowWithVue extends Window {
    $q?: IQuasarInstance;
    __VUE_APP__?: {
      config: {
        globalProperties: {
          $q?: IQuasarInstance;
        };
      };
    };
    getCurrentInstance?: () => {
      appContext?: {
        config: {
          globalProperties: {
            $q?: IQuasarInstance;
          };
        };
      };
    };
  }

  // Try to get Quasar instance from various sources
  const getQuasarInstance = (): IQuasarInstance | null => {
    if ($q) return $q;

    try {
      if (typeof window === 'undefined') return null;

      const win = window as WindowWithVue;

      // Try injection (works inside setup)
      if (win.getCurrentInstance) {
        const instance = win.getCurrentInstance();
        if (instance?.appContext?.config?.globalProperties?.$q) {
          $q = instance.appContext.config.globalProperties.$q;
          return $q;
        }
      }

      // Try global Quasar instance
      if (win.$q) {
        $q = win.$q;
        return $q;
      }

      // Try app instance
      if (win.__VUE_APP__?.config?.globalProperties?.$q) {
        $q = win.__VUE_APP__.config.globalProperties.$q;
        return $q;
      }
    } catch (error) {
      logger.debug('Could not get Quasar instance via injection:', {
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return null;
  };

  /**
   * @function showNotify
   * @description Unified notification display with platform adaptation
   */
  const showNotify = (
    message: string,
    type: 'positive' | 'negative' | 'warning' | 'info' = 'info',
    position: 'top' | 'bottom' | 'left' | 'right' | 'center' = 'top',
  ): void => {
    try {
      // First try to use Quasar directly (better performance)
      const quasarInstance = getQuasarInstance();

      if (quasarInstance && quasarInstance.notify) {
        // Fix per exactOptionalPropertyTypes: non possiamo passare undefined, quindi usiamo conditional
        const notifyOptions: {
          message: string;
          type: string;
          position: string;
          timeout: number;
          actions?: Array<{ icon: string; color: string; handler: () => void }>;
        } = {
          message,
          type,
          position,
          timeout: 3000,
        };

        // Aggiungiamo actions solo se è negative
        if (type === 'negative') {
          notifyOptions.actions = [
            {
              icon: 'close',
              color: 'white',
              handler: () => {},
            },
          ];
        }

        quasarInstance.notify(notifyOptions);

        logger.info('📢 [NOTIFICATIONS] Quasar notification shown', {
          platform: detectedPlatform,
          type,
          messageLength: message.length,
        });
        return;
      }

      // Fallback: console log e browser notification
      logger.warn('⚠️ [NOTIFICATIONS] No Quasar instance available, using fallback');
      logger.debug(`${type.toUpperCase()}: ${message}`);

      // Try browser notification as last resort
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`ProfessioneSiCura - ${type.toUpperCase()}`, {
          body: message,
          icon: '/favicon.ico',
        });
      }
    } catch (error) {
      logger.error('❌ [NOTIFICATIONS] showNotify failed:', {
        error: error instanceof Error ? error.message : String(error),
      });
      logger.debug(`${type.toUpperCase()}: ${message}`);
    }
  };

  /**
   * @function showConfirmDialog
   * @description Unified confirmation dialog with platform adaptation
   */
  const showConfirmDialog = (options: IConfirmDialogOptions): boolean => {
    try {
      // Fallback diretto a window.confirm (platform notifications non disponibile)
      logger.warn('⚠️ [NOTIFICATIONS] Using window.confirm fallback');
      return window.confirm(`${options.title}\n\n${options.message}`);
    } catch (error) {
      logger.error('❌ [NOTIFICATIONS] showConfirmDialog failed:', {
        error: error instanceof Error ? error.message : String(error),
      });
      return window.confirm(`${options.title}\n\n${options.message}`);
    }
  };

  /**
   * @function handleExitConfirmation
   * @description Unified exit confirmation with platform adaptation
   */
  const handleExitConfirmation = async (menuItem: IMenuItem): Promise<void> => {
    try {
      // Fallback implementation - chiede conferma e esegue action
      const confirmed = showConfirmDialog({
        title: 'Conferma Uscita',
        message: `Sei sicuro di voler ${menuItem.label}?`,
        okLabel: 'Conferma',
        cancelLabel: 'Annulla',
      });

      if (confirmed && menuItem.action) {
        await menuItem.action();
      }
    } catch (error) {
      logger.error('❌ [NOTIFICATIONS] handleExitConfirmation failed:', {
        error: error instanceof Error ? error.message : String(error),
      });
      showNotify("Errore durante l'operazione di uscita", 'negative');
    }
  };

  /**
   * @function showSuccess
   * @description Convenience method for success notifications
   */
  const showSuccess = (message: string) => showNotify(message, 'positive');

  /**
   * @function showError
   * @description Convenience method for error notifications
   */
  const showError = (message: string) => showNotify(message, 'negative');

  /**
   * @function showWarning
   * @description Convenience method for warning notifications
   */
  const showWarning = (message: string) => showNotify(message, 'warning');

  /**
   * @function showInfo
   * @description Convenience method for info notifications
   */
  const showInfo = (message: string) => showNotify(message, 'info');

  return {
    // Core methods
    showNotify,
    showConfirmDialog,
    handleExitConfirmation,

    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo,

    // Platform info
    platform: detectedPlatform,
  };
}

/**
 * @function useUnifiedNotifications
 * @description Alias for useNotifications (for clarity in imports)
 */
export const useUnifiedNotifications = useNotifications;

/**
 * @function createNotificationPresets
 * @description Factory for common notification patterns
 */
export function createNotificationPresets() {
  const { showNotify } = useNotifications();

  return {
    // Authentication notifications
    loginSuccess: () => showNotify('✅ Login effettuato con successo', 'positive'),
    loginFailed: () => showNotify('❌ Credenziali non valide', 'negative'),
    logoutSuccess: () => showNotify('👋 Logout completato', 'info'),

    // Profile notifications
    profileUpdated: () => showNotify('📝 Profilo aggiornato con successo', 'positive'),
    profileIncomplete: () => showNotify('⚠️ Completa il tuo profilo per continuare', 'warning'),

    // Data operations
    dataSaved: () => showNotify('💾 Dati salvati correttamente', 'positive'),
    dataDeleted: () => showNotify('🗑️ Elemento eliminato', 'info'),
    dataError: () => showNotify("❌ Errore durante l'operazione", 'negative'),

    // Network notifications
    networkError: () => showNotify('🌐 Problema di connessione', 'negative'),
    offlineMode: () => showNotify('📱 Modalità offline attiva', 'warning'),

    // Permission notifications
    accessDenied: () => showNotify('🔒 Accesso negato', 'negative'),
    permissionRequired: () => showNotify('⚠️ Permessi insufficienti', 'warning'),
  };
}
