<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

interface Book {
  id: number;
  name: string;
  abbreviation: string;
  testament: 'OT' | 'NT';
  order: number;
  chapters: number;
}

const book = ref<Book | null>(null);
const loading = ref(false);
const translationId = Number(route.params.translationId);
const bookId = Number(route.params.bookId);

const loadBook = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/v1/bible/books/${bookId}`);
    book.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar livro:', error);
  } finally {
    loading.value = false;
  }
};

const selectChapter = (chapter: number) => {
  router.push({ 
    name: 'read', 
    params: { translationId, bookId, chapter } 
  });
};

const goBack = () => {
  router.push({ 
    name: 'select-book', 
    params: { translationId } 
  });
};

onMounted(() => {
  loadBook();
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
        <h1 class="text-2xl font-bold">Selecione o Capítulo</h1>
        <div class="w-20"></div>
      </div>

      <!-- Progress -->
      <div class="mb-8">
        <ul class="steps steps-horizontal w-full">
          <li class="step step-primary">Tradução</li>
          <li class="step step-primary">Livro</li>
          <li class="step step-primary">Capítulo</li>
        </ul>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Book Info and Chapters -->
      <div v-else-if="book">
        <!-- Book Info -->
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body text-center">
            <h2 class="card-title text-3xl justify-center">{{ book.name }}</h2>
            <p class="text-lg opacity-70">{{ book.chapters }} capítulos</p>
          </div>
        </div>

        <!-- Chapters Grid -->
        <div class="grid grid-cols-5 md:grid-cols-8 gap-2">
          <button
            v-for="chapter in book.chapters"
            :key="chapter"
            @click="selectChapter(chapter)"
            class="btn btn-lg btn-outline hover:btn-primary aspect-square"
          >
            {{ chapter }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !book" class="text-center py-12">
        <p class="text-lg opacity-70">Livro não encontrado</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>

