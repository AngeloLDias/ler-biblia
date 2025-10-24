<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const router = useRouter();
const searchQuery = ref('');
const results = ref<any[]>([]);
const loading = ref(false);

const search = async () => {
  if (!searchQuery.value.trim()) return;

  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/search`, {
      params: { query: searchQuery.value },
    });
    results.value = response.data;
  } catch (error) {
    console.error('Erro na busca:', error);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'home' });
};

const goToVerse = (verse: any) => {
  router.push({
    name: 'read',
    params: {
      translationId: verse.translationId,
      bookId: verse.bookId,
      chapter: verse.chapter,
    },
  });
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
        <h1 class="text-2xl font-bold">Buscar</h1>
        <div class="w-20"></div>
      </div>

      <!-- Search Input -->
      <div class="mb-6">
        <div class="join w-full">
          <input
            v-model="searchQuery"
            @keyup.enter="search"
            type="text"
            placeholder="Digite uma palavra ou frase..."
            class="input input-bordered join-item w-full"
          />
          <button @click="search" class="btn btn-primary join-item">
            🔍 Buscar
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Results -->
      <div v-else-if="results.length > 0" class="space-y-3">
        <p class="text-sm opacity-70 mb-4">{{ results.length }} resultado(s) encontrado(s)</p>
        <div
          v-for="verse in results"
          :key="verse.id"
          @click="goToVerse(verse)"
          class="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
        >
          <div class="card-body p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-primary">Livro ID: {{ verse.bookId }}</span>
              <span class="text-sm opacity-70">Capítulo {{ verse.chapter }}:{{ verse.verse }}</span>
            </div>
            <p class="text-base">{{ verse.text }}</p>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="searchQuery && !loading" class="text-center py-12">
        <p class="text-lg opacity-70">Nenhum resultado encontrado</p>
        <p class="text-sm opacity-50 mt-2">Tente buscar por outra palavra</p>
      </div>

      <!-- Initial state -->
      <div v-else class="text-center py-12">
        <p class="text-lg opacity-70">Digite algo para buscar</p>
        <p class="text-sm opacity-50 mt-2">Exemplo: amor, fé, esperança</p>
      </div>
    </div>
  </div>
</template>

