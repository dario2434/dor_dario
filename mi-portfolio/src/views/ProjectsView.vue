<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import ProjectCard from '../components/ProjectCard.vue';
import { proyectos, perfil } from '../data/index';
import { ref, computed } from 'vue';

// Obtener todas las tecnologías únicas para el filtro
const todasLasTecnologias = computed(() => {
  const techs = new Set<string>();
  proyectos.forEach((p) => p.tecnologias.forEach((t) => techs.add(t)));
  return Array.from(techs).sort();
});

const tecnologiaSeleccionada = ref<string | null>(null);
const terminoBusqueda = ref<string>('');

const proyectosFiltrados = computed(() => {
  let resultado = proyectos;

  // Filtrar por tecnología
  if (tecnologiaSeleccionada.value) {
    resultado = resultado.filter((p) =>
      p.tecnologias.includes(tecnologiaSeleccionada.value!)
    );
  }

  // Filtrar por término de búsqueda
  if (terminoBusqueda.value.trim()) {
    const termino = terminoBusqueda.value.toLowerCase().trim();
    resultado = resultado.filter((p) =>
      p.titulo.toLowerCase().includes(termino) ||
      p.descripcion.toLowerCase().includes(termino)
    );
  }

  return resultado;
});
</script>

<template>
  <div id="top" class="min-h-screen bg-black text-white">
    <div class="max-w-6xl mx-auto px-6 py-10">
      <Navbar />

      <!-- Header -->
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">Mis Proyectos</h1>
        <p class="text-white/70 max-w-2xl mx-auto">
          Aquí puedes ver todos los proyectos en los que he trabajado. Cada proyecto
          representa un desafío superado y una oportunidad de aprendizaje.
        </p>
      </header>

      <!-- Buscador de proyectos -->
      <div class="mb-8">
        <div class="max-w-md mx-auto">
          <div class="relative">
            <input
              v-model="terminoBusqueda"
              type="text"
              placeholder="Buscar proyectos..."
              class="w-full px-4 py-3 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <button
              v-if="terminoBusqueda"
              @click="terminoBusqueda = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Filtros por tecnología -->
      <div class="mb-10">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            @click="tecnologiaSeleccionada = null"
            class="px-4 py-2 rounded-lg text-sm transition-colors"
            :class="
              tecnologiaSeleccionada === null
                ? 'bg-white text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            "
          >
            Todos
          </button>
          <button
            v-for="tech in todasLasTecnologias"
            :key="tech"
            @click="tecnologiaSeleccionada = tech"
            class="px-4 py-2 rounded-lg text-sm transition-colors"
            :class="
              tecnologiaSeleccionada === tech
                ? 'bg-white text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            "
          >
            {{ tech }}
          </button>
        </div>
      </div>

      <!-- Grid de proyectos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in proyectosFiltrados"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Mensaje si no hay proyectos filtrados -->
      <div
        v-if="proyectosFiltrados.length === 0"
        class="text-center py-12 text-white/50"
      >
        No se encontraron proyectos que coincidan con tu búsqueda.
      </div>

      <!-- Footer -->
      <footer class="mt-16 text-center text-sm text-white/50 py-8 border-t border-white/10">
        <p>© {{ new Date().getFullYear() }} — {{ perfil.nombre }}</p>
      </footer>
    </div>
  </div>
</template>

