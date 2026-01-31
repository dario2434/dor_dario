<script setup lang="ts">
import type { Project } from '../types';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all duration-300 group">
    <!-- Imagen del proyecto (opcional) -->
    <div
      v-if="project.imagen"
      class="w-full h-40 rounded-lg overflow-hidden mb-4 bg-white/5"
    >
      <img
        :src="project.imagen"
        :alt="project.titulo"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <h3 class="font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
      {{ project.titulo }}
    </h3>
    <p class="text-sm text-white/70 leading-relaxed mb-4">
      {{ project.descripcion }}
    </p>

    <!-- Tags de tecnologías -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tech in project.tecnologias"
        :key="tech"
        class="text-xs px-2 py-1 rounded bg-white/10 text-white/60"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Enlaces -->
    <div class="flex gap-3">
      <a
        v-if="project.demoUrl"
        :href="project.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 text-center text-sm bg-white text-black py-2 rounded-lg hover:bg-white/90 transition-colors"
      >
        Ver Demo
      </a>
      <a
        v-if="project.repoUrl"
        :href="project.repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 text-center text-sm border border-white/20 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        Código
      </a>
    </div>
  </div>
</template>
