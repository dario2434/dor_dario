<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import ProjectCard from '../components/ProjectCard.vue';
import SkillCard from '../components/SkillCard.vue';
import ContactForm from '../components/ContactForm.vue';
import { proyectos, habilidades, experiencia, perfil } from '../data/index';

// Agrupar habilidades por categoría
const habilidadesFrontend = habilidades.filter((h) => h.categoria === 'Frontend');
const habilidadesTools = habilidades.filter((h) => h.categoria === 'Tools');
const habilidadesBackend = habilidades.filter((h) => h.categoria === 'Backend');
</script>

<template>
  <div id="top" class="min-h-screen bg-black text-white">
    <div class="max-w-5xl mx-auto px-6 py-10">
      <Navbar />

      <!-- Header con nombre y título -->
      <header class="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="text-center md:text-left">
          <h1 class="text-4xl md:text-5xl font-bold">{{ perfil.nombre }}</h1>
          <p class="mt-2 text-xl text-white/70">{{ perfil.titulo }}</p>
          <div class="mt-4 flex gap-4 justify-center md:justify-start">
            <a
              :href="`mailto:${perfil.email}`"
              class="text-white/70 hover:text-white transition-colors"
            >
              {{ perfil.email }}
            </a>
          </div>
        </div>
        <div class="relative">
          <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20">
            <img
              :src="perfil.foto"
              :alt="perfil.nombre"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <!-- Sección Sobre mí -->
      <section id="sobre-mi" class="mb-20">
        <h2 class="text-2xl font-semibold mb-6">Sobre mí</h2>
        <div class="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
          <p class="text-white/90 leading-relaxed text-lg">
            {{ perfil.sobreMi }}
          </p>
          <div class="mt-6 flex gap-4">
            <a
              v-if="perfil.github"
              :href="perfil.github"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              GitHub
            </a>
            <a
              v-if="perfil.linkedin"
              :href="perfil.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <!-- Sección Proyectos -->
      <section id="proyectos" class="mb-20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold">Proyectos</h2>
          <router-link
            to="/proyectos"
            class="text-white/70 hover:text-white text-sm transition-colors"
          >
            Ver todos →
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            v-for="project in proyectos.slice(0, 4)"
            :key="project.id"
            :project="project"
          />
        </div>
      </section>

      <!-- Sección Habilidades -->
      <section id="habilidades" class="mb-20">
        <h2 class="text-2xl font-semibold mb-6">Habilidades</h2>

        <!-- Frontend -->
        <div class="mb-8">
          <h3 class="text-lg text-white/60 mb-4">Frontend</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <SkillCard
              v-for="skill in habilidadesFrontend"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>

        <!-- Tools -->
        <div class="mb-8">
          <h3 class="text-lg text-white/60 mb-4">Herramientas</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <SkillCard
              v-for="skill in habilidadesTools"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>

        <!-- Backend -->
        <div>
          <h3 class="text-lg text-white/60 mb-4">Backend</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <SkillCard
              v-for="skill in habilidadesBackend"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>
      </section>

      <!-- Sección Experiencia -->
      <section id="experiencia" class="mb-20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold">Experiencia</h2>
          <router-link
            to="/experiencia"
            class="text-white/70 hover:text-white text-sm transition-colors"
          >
            Ver detalle →
          </router-link>
        </div>
        <div class="space-y-4">
          <div
            v-for="exp in experiencia.slice(0, 2)"
            :key="exp.id"
            class="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 class="text-lg font-medium">{{ exp.cargo }}</h3>
              <span class="text-white/50 text-sm">{{ exp.periodo }}</span>
            </div>
            <p class="text-white/60">{{ exp.empresa }}</p>
            <p class="mt-2 text-white/70">{{ exp.descripcion }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tech in exp.tecnologias"
                :key="tech"
                class="text-xs px-2 py-1 rounded bg-white/10 text-white/70"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección Contacto -->
      <section id="contacto" class="mb-20">
        <h2 class="text-2xl font-semibold mb-6">Contacto</h2>
        <ContactForm :email="perfil.email" />
      </section>

      <!-- Footer -->
      <footer class="text-center text-sm text-white/50 py-8 border-t border-white/10">
        <p>© {{ new Date().getFullYear() }} — {{ perfil.nombre }}</p>
        <p class="mt-1">
          Construido con Vue 3, TypeScript y Tailwind CSS
        </p>
      </footer>
    </div>
  </div>
</template>

