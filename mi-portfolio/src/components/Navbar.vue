<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10"
  >
    <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
      <RouterLink to="/" class="flex items-center gap-2 hover:text-emerald-400 transition-colors">
        <span class="font-semibold">DAW</span>
      </RouterLink>
      <nav class="flex gap-6 text-sm text-white/70">
        <RouterLink
          to="/"
          class="hover:text-white transition-colors"
          active-class="text-white"
        >
          Inicio
        </RouterLink>
        <RouterLink
          to="/proyectos"
          class="hover:text-white transition-colors"
          active-class="text-white"
        >
          Proyectos
        </RouterLink>
        <RouterLink
          to="/experiencia"
          class="hover:text-white transition-colors"
          active-class="text-white"
        >
          Experiencia
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
