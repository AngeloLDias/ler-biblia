<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm">
          ← Voltar
        </button>
        <h1 class="text-2xl font-bold">Configurações</h1>
        <div class="w-20"></div>
      </div>

      <!-- Coming Soon -->
      <div class="text-center py-12">
        <div class="text-6xl mb-4">⚙️</div>
        <p class="text-lg opacity-70">Em breve</p>
        <p class="text-sm opacity-50 mt-2">
          Aqui você poderá configurar preferências, tema, e fazer backup
        </p>
      </div>
    </div>
  </div>
</template>

