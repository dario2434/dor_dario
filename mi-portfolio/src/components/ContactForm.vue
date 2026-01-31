<script setup lang="ts">
import { ref, reactive } from 'vue';

const props = defineProps<{
  email: string;
}>();

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}

const formData = reactive<FormData>({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
});

const errors = reactive<FormErrors>({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const validateForm = (): boolean => {
  errors.nombre = formData.nombre.trim() ? undefined : 'El nombre es obligatorio';
  errors.email = !formData.email.trim() ? 'El email es obligatorio' :
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Email inválido' : undefined;
  errors.asunto = formData.asunto.trim() ? undefined : 'El asunto es obligatorio';
  errors.mensaje = formData.mensaje.trim() ? undefined : 'El mensaje es obligatorio';

  return !Object.values(errors).some((error) => error !== undefined);
};

const handleSubmit = async () => {
  submitSuccess.value = false;

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  // Simular envío del formulario
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Aquí puedes integrar con un servicio real como Formspree, EmailJS, etc.
  console.log('Formulario enviado:', {
    to: props.email,
    ...formData,
  });

  isSubmitting.value = false;
  submitSuccess.value = true;

  // Resetear formulario
  formData.nombre = '';
  formData.email = '';
  formData.asunto = '';
  formData.mensaje = '';
};
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
    <!-- Mensaje de éxito -->
    <div
      v-if="submitSuccess"
      class="mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
    >
      ¡Mensaje enviado correctamente! Te responderé lo antes posible.
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Nombre -->
      <div>
        <label for="nombre" class="block text-sm text-white/70 mb-2">
          Nombre *
        </label>
        <input
          id="nombre"
          v-model="formData.nombre"
          type="text"
          placeholder="Tu nombre"
          class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white placeholder-white/30"
          :class="{ 'border-red-500/50': errors.nombre }"
        />
        <p v-if="errors.nombre" class="mt-1 text-sm text-red-400">
          {{ errors.nombre }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm text-white/70 mb-2">
          Email *
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="tu@email.com"
          class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white placeholder-white/30"
          :class="{ 'border-red-500/50': errors.email }"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-400">
          {{ errors.email }}
        </p>
      </div>

      <!-- Asunto -->
      <div>
        <label for="asunto" class="block text-sm text-white/70 mb-2">
          Asunto *
        </label>
        <input
          id="asunto"
          v-model="formData.asunto"
          type="text"
          placeholder="Asunto del mensaje"
          class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white placeholder-white/30"
          :class="{ 'border-red-500/50': errors.asunto }"
        />
        <p v-if="errors.asunto" class="mt-1 text-sm text-red-400">
          {{ errors.asunto }}
        </p>
      </div>

      <!-- Mensaje -->
      <div>
        <label for="mensaje" class="block text-sm text-white/70 mb-2">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          v-model="formData.mensaje"
          rows="5"
          placeholder="Escribe tu mensaje aquí..."
          class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white placeholder-white/30 resize-none"
          :class="{ 'border-red-500/50': errors.mensaje }"
        ></textarea>
        <p v-if="errors.mensaje" class="mt-1 text-sm text-red-400">
          {{ errors.mensaje }}
        </p>
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span
          v-if="isSubmitting"
          class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"
        ></span>
        <span v-else>Enviar Mensaje</span>
      </button>
    </form>

    <!-- Alternativa: Email directo -->
    <div class="mt-6 pt-6 border-t border-white/10 text-center">
      <p class="text-white/50 text-sm mb-3">O simplemente envíame un email directamente:</p>
      <a
        :href="`mailto:${email}`"
        class="inline-flex items-center gap-2 text-white hover:text-white/70 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {{ email }}
      </a>
    </div>
  </div>
</template>

