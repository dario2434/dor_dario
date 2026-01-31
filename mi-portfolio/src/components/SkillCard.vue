<script setup lang="ts">
import type { Skill } from '../types';

defineProps<{
  skill: Skill;
}>();
</script>

<template>
  <div class="border border-white/10 rounded-lg p-4 hover:border-white/30 transition-colors group">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg">
        <img
          :src="skill.logo"
          :alt="skill.nombre"
          class="w-8 h-8 object-contain"
        />
      </div>
      <h3 class="font-medium text-sm">{{ skill.nombre }}</h3>
    </div>

    <!-- Barra de progreso del nivel -->
    <div class="mb-3">
      <div class="flex justify-between text-xs text-white/50 mb-1">
        <span>Nivel</span>
        <span>{{ skill.nivel }}%</span>
      </div>
      <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
          :style="{ width: `${skill.nivel}%` }"
        ></div>
      </div>
    </div>

    <p class="text-xs text-white/60 leading-relaxed">
      {{ skill.descripcion }}
    </p>
  </div>
</template>

