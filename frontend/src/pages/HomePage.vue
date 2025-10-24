<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToReading = () => {
  // Vai para João 3 (bookId 109, translationId 3 - NVI)
  router.push({ name: 'read', params: { translationId: 3, bookId: 109, chapter: 3 } });
};

const goToSearch = () => {
  router.push({ name: 'search' });
};

const goToNotes = () => {
  router.push({ name: 'notes' });
};

const goToPlans = () => {
  router.push({ name: 'plans' });
};

const goToSelector = () => {
  router.push({ name: 'select-translation' });
};
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold text-center mb-8">Ler Bíblia</h1>
      
      <div class="card bg-base-200 shadow-xl mb-6">
        <div class="card-body">
          <h2 class="card-title">Versículo do Dia</h2>
          <p class="text-lg font-semibold">João 3:16</p>
          <p class="text-base">
            Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, 
            para que todo o que nele crer não pereça, mas tenha a vida eterna.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button @click="goToSelector" class="btn btn-primary btn-lg">
          📚 Selecionar Livro
        </button>
        <button @click="goToReading" class="btn btn-secondary">
          📖 Continuar Lendo (João 3)
        </button>
        <button @click="goToSearch" class="btn btn-accent">
          🔍 Buscar
        </button>
        <button @click="goToNotes" class="btn btn-ghost">
          📝 Minhas Anotações
        </button>
        <button @click="goToPlans" class="btn btn-info">
          📅 Planos de Leitura
        </button>
      </div>

      <div class="mt-8 text-center">
        <p class="text-sm opacity-70">
          Backend API: <a href="http://localhost:3000/api" target="_blank" class="link">http://localhost:3000/api</a>
        </p>
      </div>
    </div>
  </div>
</template>

