<!-- App.vue -->
<script setup lang="ts">
/**
 * @file App.vue
 * @description Root application component - Entry point for Medical Utility Pro
 * @author Vasile Chifeac
 * @created 2025-11-05
 * @modified 2025-11-23
 *
 * @notes
 * - Minimal root component that renders the router view
 * - All layout logic is delegated to MainLayout.vue
 * - Database initialization in onMounted (load once, use everywhere)
 * - Loading state management for drug database
 * - Error handling with user notification
 *
 * @features
 * - Drug database loading on app startup (useDrugDatabase composable)
 * - Loading overlay during database initialization
 * - Error notification with retry option
 * - i18n-ready bilingual database (IT/EN)
 */

// ============================================================
// IMPORTS
// ============================================================
import { onMounted } from 'vue';
import { useDrugDatabase } from 'src/composables/useDrugDatabase';
import { Notify } from 'quasar';

// ============================================================
// COMPOSABLES
// ============================================================
const { isLoading, loadError, loadDatabase, totalDrugs, totalCompatibilityPairs } =
  useDrugDatabase();

// ============================================================
// LIFECYCLE HOOKS
// ============================================================

/**
 * Initialize drug database on app startup
 * Runs once when App.vue mounts (before any page renders)
 *
 * Pattern: Startup Loading
 * - Load database ONCE in root component
 * - Global cache ensures all child components access same data
 * - Loading state prevents premature access to empty cache
 *
 * Performance:
 * - Parallel loading (Promise.all) ~500ms
 * - Cached in memory, subsequent access 0ms
 */
onMounted(async () => {
  console.log('[App.vue] Initializing drug database...');

  try {
    // Load drug database (index.json + compatibility.json in parallel)
    await loadDatabase();

    console.log(
      `[App.vue] ✅ Database initialized successfully: ${totalDrugs.value} drugs, ${totalCompatibilityPairs.value} compatibility pairs`,
    );

    // Success notification
    // if (totalDrugs.value > 0) {
    //   Notify.create({
    //     type: 'positive',
    //     message: `✅ Database farmaci caricato: ${totalDrugs.value} farmaci, ${totalCompatibilityPairs.value} compatibilità`,
    //     caption: "Database pronto per l'uso",
    //     position: 'top',
    //     timeout: 3000,
    //     icon: 'check_circle',
    //   });
    // }
  } catch (error) {
    // Error notification with retry option
    console.error('[App.vue] ❌ Failed to initialize database:', error);

    Notify.create({
      type: 'negative',
      message: '❌ Errore caricamento database farmaci',
      caption: loadError.value || 'Errore sconosciuto. Riprova più tardi.',
      position: 'top',
      timeout: 0, // Persistent (user must dismiss)
      icon: 'error',
      actions: [
        {
          label: 'Riprova',
          color: 'white',
          handler: () => {
            // Retry loading (void wrapper for TypeScript)
            void loadDatabase();
          },
        },
        {
          label: 'Chiudi',
          color: 'white',
        },
      ],
    });
  }
});
</script>

<template>
  <!-- ======================================================== -->
  <!-- LOADING OVERLAY (During Database Initialization)        -->
  <!-- ======================================================== -->
  <q-inner-loading
    :showing="isLoading"
    label="Caricamento database farmaci..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
    color="primary"
  >
    <q-spinner-gears size="50px" color="primary" />
    <div class="q-mt-md text-grey-7">Inizializzazione in corso...</div>
  </q-inner-loading>

  <!-- ======================================================== -->
  <!-- ROOT ROUTER VIEW (Rendered after database loaded)       -->
  <!-- ======================================================== -->
  <router-view />
</template>
