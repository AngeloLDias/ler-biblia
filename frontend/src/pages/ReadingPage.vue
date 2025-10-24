<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const route = useRoute();
const router = useRouter();

const verses = ref<any[]>([]);
const loading = ref(false);
const bookName = ref('');
const totalChapters = ref(0);

const translationId = ref(Number(route.params.translationId));
const bookId = ref(Number(route.params.bookId));
const chapter = ref(Number(route.params.chapter));

const loadChapter = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/bible/chapter`, {
      params: {
        translationId: translationId.value,
        bookId: bookId.value,
        chapter: chapter.value,
      },
    });
    verses.value = response.data;

    // Buscar nome do livro e total de capítulos
    const bookResponse = await axios.get(`${API_BASE_URL}/v1/bible/books/${bookId.value}`);
    bookName.value = bookResponse.data.name;
    totalChapters.value = bookResponse.data.chapters;

    // Salvar última leitura no localStorage
    localStorage.setItem('lastRead', JSON.stringify({
      translationId: translationId.value,
      bookId: bookId.value,
      bookName: bookName.value,
      chapter: chapter.value,
    }));
  } catch (error) {
    console.error('Erro ao carregar capítulo:', error);
  } finally {
    loading.value = false;
  }
};

const goToChapter = (newChapter: number) => {
  router.push({
    name: 'read',
    params: {
      translationId: translationId.value,
      bookId: bookId.value,
      chapter: newChapter,
    },
  });
};

const previousChapter = () => {
  if (chapter.value > 1) {
    goToChapter(chapter.value - 1);
  }
};

const nextChapter = () => {
  if (chapter.value < totalChapters.value) {
    goToChapter(chapter.value + 1);
  }
};

const goToSelector = () => {
  router.push({ name: 'select-translation' });
};

const goBack = () => {
  router.push({ name: 'home' });
};

onMounted(() => {
  loadChapter();
});
</script>

<template>
  <div class="min-h-screen bg-base-100 overflow-x-hidden">
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm">
          ← Início
        </button>
        <h1 class="text-2xl font-bold">{{ bookName }} {{ chapter }}</h1>
        <button @click="goToSelector" class="btn btn-ghost btn-sm">
          📚 Trocar
        </button>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between items-center gap-2 mb-6">
        <button
          @click="previousChapter"
          class="btn btn-outline btn-sm flex-shrink-0"
          :disabled="chapter <= 1"
        >
          ← Cap. {{ chapter - 1 }}
        </button>

        <div class="text-center flex-shrink min-w-0">
          <p class="text-sm opacity-70 truncate">Capítulo {{ chapter }} de {{ totalChapters }}</p>
        </div>

        <button
          @click="nextChapter"
          class="btn btn-outline btn-sm flex-shrink-0"
          :disabled="chapter >= totalChapters"
        >
          Cap. {{ chapter + 1 }} →
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Verses -->
      <div v-else class="space-y-2">
        <div
          v-for="verse in verses"
          :key="verse.id"
          class="p-3 hover:bg-base-200 rounded-lg transition-colors cursor-pointer"
        >
          <span class="text-sm font-bold text-primary mr-2">{{ verse.verse }}</span>
          <span class="text-base">{{ verse.text }}</span>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && verses.length === 0" class="text-center py-12">
        <p class="text-lg opacity-70">Nenhum versículo encontrado</p>
        <p class="text-sm opacity-50 mt-2">
          Este capítulo ainda não foi carregado no banco de dados.
        </p>
      </div>

      <!-- Bottom Navigation -->
      <div v-if="verses.length > 0" class="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mt-8 pt-6 border-t">
        <button
          @click="previousChapter"
          class="btn btn-primary btn-sm md:btn-md flex-1 md:flex-initial"
          :disabled="chapter <= 1"
        >
          <span class="md:hidden">← Cap. Anterior</span>
          <span class="hidden md:inline">← Capítulo Anterior</span>
        </button>

        <button @click="goToSelector" class="btn btn-outline btn-sm md:btn-md flex-1 md:flex-initial">
          <span class="md:hidden">📚 Outro</span>
          <span class="hidden md:inline">📚 Selecionar Outro</span>
        </button>

        <button
          @click="nextChapter"
          class="btn btn-primary btn-sm md:btn-md flex-1 md:flex-initial"
          :disabled="chapter >= totalChapters"
        >
          <span class="md:hidden">Próximo Cap. →</span>
          <span class="hidden md:inline">Próximo Capítulo →</span>
        </button>
      </div>
    </div>
  </div>
</template>

