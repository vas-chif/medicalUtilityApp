<!-- ErrorNotFound.vue -->
<script setup lang="ts">
/**
 * @file ErrorNotFound.vue
 * @description Pagina 404 - Risorsa non trovata
 * @author Vasile Chifeac
 * @created 2025-11-05
 * @modified 2025-11-05
 */
</script>

<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>
