<script setup lang="ts">
import { computed } from "vue";
import Navbar from "../components/Navbar.vue";

import { experiencia, perfil, habilidades } from "../data/index";
import type { Skill } from "../types";

/**
 * Extrae años (YYYY) de un string de periodo.
 * Ej: "Septiembre 2023 - Octubre 2023" -> [2023, 2023]
 * Ej: "Septiembre 2024 - Actualidad" -> [2024, currentYear]
 */
const extractYears = (periodo: string): number[] => {
  const currentYear = new Date().getFullYear();

  // Si dice "Actualidad", lo tratamos como el año actual para ordenar arriba
  const hasActualidad = /actualidad/i.test(periodo);

  const matches = periodo.match(/\b(19|20)\d{2}\b/g) || [];
  const years = matches.map((y) => Number(y));

  if (hasActualidad) years.push(currentYear);

  // Si no hay años detectables, devolvemos [0] para que quede al final
  return years.length ? years : [0];
};

const getSortKey = (periodo: string) => {
  const years = extractYears(periodo);
  // Ordenamos por el año más alto encontrado (fin o "actualidad") y luego por el más bajo
  const maxYear = Math.max(...years);
  const minYear = Math.min(...years);
  return { maxYear, minYear };
};

const experienciaOrdenada = computed(() => {
  return [...experiencia].sort((a, b) => {
    const A = getSortKey(a.periodo);
    const B = getSortKey(b.periodo);

    if (B.maxYear !== A.maxYear) return B.maxYear - A.maxYear;
    return B.minYear - A.minYear;
  });
});

/**
 * Resuelve un path de logo para Vite.
 * - Si viene como URL absoluta (http/https) o empieza por "/" -> se usa tal cual.
 * - Si viene como path relativo tipo "logos/vue.svg" o "vue.svg" -> se resuelve desde src/assets.
 */
const resolveLogo = (logoPath: string): string => {
  if (/^(https?:)?\/\//i.test(logoPath) || logoPath.startsWith("/")) return logoPath;

  // Normaliza casos: "vue.svg" -> "logos/vue.svg"
  const normalized = logoPath.includes("/") ? logoPath : `logos/${logoPath}`;

  // OJO: esto apunta a /src/assets/...
  return new URL(`../assets/${normalized}`, import.meta.url).href;
};

// Función para obtener el logo de una tecnología por su nombre
const getSkillLogo = (techName: string): string | null => {
  const skill = habilidades.find(
    (s: Skill) => s.nombre.toLowerCase() === techName.toLowerCase()
  );

  if (!skill?.logo) return null;
  return resolveLogo(skill.logo);
};
</script>

<template>
  <div id="top" class="min-h-screen bg-black text-white">
    <div class="max-w-4xl mx-auto px-6 py-10">
      <Navbar />

      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl font-bold mb-4">Experiencia Profesional</h1>
        <p class="text-white/70 max-w-2xl">
          Mi trayectoria profesional en el desarrollo web y tecnológico.
        </p>
      </header>

      <!-- Timeline de experiencia -->
      <div
        class="space-y-8 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-white/10"
      >
        <div v-for="exp in experienciaOrdenada" :key="exp.id" class="relative pl-20">
          <!-- Punto del timeline -->
          <div class="absolute left-6 top-6 w-4 h-4 rounded-full bg-white/20 border-2 border-white"></div>

          <!-- Tarjeta de experiencia -->
          <div class="border border-white/10 rounded-lg p-6 hover:border-white/30 transition-colors">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 class="text-xl font-semibold">{{ exp.cargo }}</h3>
                <p class="text-white/60">{{ exp.empresa }}</p>
              </div>

              <span class="text-sm text-white/50 whitespace-nowrap px-3 py-1 bg-white/5 rounded-full">
                {{ exp.periodo }}
              </span>
            </div>

            <p class="text-white/80 leading-relaxed mb-4">
              {{ exp.descripcion }}
            </p>

            <!-- Tecnologías usadas -->
            <div v-if="exp.tecnologias?.length" class="flex flex-wrap gap-2">
              <span
                v-for="tech in exp.tecnologias"
                :key="tech"
                class="flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/5"
              >
                <img
                  v-if="getSkillLogo(tech)"
                  :src="getSkillLogo(tech)!"
                  :alt="tech"
                  class="w-4 h-4 object-contain"
                  loading="lazy"
                />
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de descarga de CV -->
      <div class="mt-16 text-center">
        <a
          href="/DARIO-cv.pdf"
          download="Dario_Acosta_CV.pdf"
          class="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
          title="Descarga mi CV en formato PDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Descargar CV en PDF
        </a>

        <p class="mt-4 text-sm text-white/50">
          ¿Te interesa contactarme?
          <a
            :href="`mailto:${perfil.email}`"
            class="text-white hover:underline"
          >
            {{ perfil.email }}
          </a>
        </p>
      </div>

      <!-- Footer -->
      <footer class="mt-16 text-center text-sm text-white/50 py-8 border-t border-white/10">
        <p>© {{ new Date().getFullYear() }} — {{ perfil.nombre }}</p>
      </footer>
    </div>
  </div>
</template>
