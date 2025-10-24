<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const router = useRouter();

interface Translation {
  id: number;
  code: string;
  name: string;
  language: string;
}

const translations = ref<Translation[]>([]);
const loading = ref(false);

const loadTranslations = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/bible/translations`);
    translations.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  } finally {
    loading.value = false;
  }
};

const selectTranslation = (translationId: number) => {
  router.push({ name: 'select-book', params: { translationId } });
};

const goBack = () => {
  router.push({ name: 'home' });
};

onMounted(() => {
  loadTranslations();
});
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto p-4 max-w-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm">
          ← Voltar
        </button>
        <h1 class="text-2xl font-bold">Selecione a Tradução</h1>
        <div class="w-20"></div>
      </div>

      <!-- Progress -->
      <div class="mb-8">
        <ul class="steps steps-horizontal w-full">
          <li class="step step-primary">Tradução</li>
          <li class="step">Livro</li>
          <li class="step">Capítulo</li>
        </ul>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Translations List -->
      <div v-else class="space-y-4">
        <button
          v-for="translation in translations"
          :key="translation.id"
          @click="selectTranslation(translation.id)"
          class="card bg-base-200 hover:bg-base-300 shadow-xl w-full transition-all cursor-pointer"
        >
          <div class="card-body">
            <h2 class="card-title text-2xl">{{ translation.code }}</h2>
            <p class="text-lg">{{ translation.name }}</p>
            <div class="card-actions justify-end">
              <span class="text-sm opacity-70">Clique para selecionar →</span>
            </div>
          </div>
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && translations.length === 0" class="text-center py-12">
        <p class="text-lg opacity-70">Nenhuma tradução disponível</p>
      </div>
    </div>
  </div>
</template>

