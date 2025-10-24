<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

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

const books = ref<Book[]>([]);
const loading = ref(false);
const activeTestament = ref<'OT' | 'NT' | 'ALL'>('ALL');
const translationId = Number(route.params.translationId);

const loadBooks = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/bible/books`);
    books.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar livros:', error);
  } finally {
    loading.value = false;
  }
};

const filteredBooks = computed(() => {
  if (activeTestament.value === 'ALL') {
    return books.value;
  }
  return books.value.filter(book => book.testament === activeTestament.value);
});

const oldTestamentBooks = computed(() => 
  books.value.filter(book => book.testament === 'OT')
);

const newTestamentBooks = computed(() => 
  books.value.filter(book => book.testament === 'NT')
);

const selectBook = (bookId: number) => {
  router.push({ 
    name: 'select-chapter', 
    params: { translationId, bookId } 
  });
};

const goBack = () => {
  router.push({ name: 'select-translation' });
};

onMounted(() => {
  loadBooks();
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
        <h1 class="text-2xl font-bold">Selecione o Livro</h1>
        <div class="w-20"></div>
      </div>

      <!-- Progress -->
      <div class="mb-8">
        <ul class="steps steps-horizontal w-full">
          <li class="step step-primary">Tradução</li>
          <li class="step step-primary">Livro</li>
          <li class="step">Capítulo</li>
        </ul>
      </div>

      <!-- Testament Tabs -->
      <div class="tabs tabs-boxed mb-6 justify-center">
        <a 
          class="tab" 
          :class="{ 'tab-active': activeTestament === 'ALL' }"
          @click="activeTestament = 'ALL'"
        >
          Todos ({{ books.length }})
        </a>
        <a 
          class="tab" 
          :class="{ 'tab-active': activeTestament === 'OT' }"
          @click="activeTestament = 'OT'"
        >
          Antigo Testamento ({{ oldTestamentBooks.length }})
        </a>
        <a 
          class="tab" 
          :class="{ 'tab-active': activeTestament === 'NT' }"
          @click="activeTestament = 'NT'"
        >
          Novo Testamento ({{ newTestamentBooks.length }})
        </a>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Books List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          v-for="book in filteredBooks"
          :key="book.id"
          @click="selectBook(book.id)"
          class="btn btn-lg justify-between hover:btn-primary"
        >
          <span class="text-left">
            <span class="font-bold">{{ book.name }}</span>
            <span class="text-xs opacity-70 ml-2">({{ book.chapters }} cap.)</span>
          </span>
          <span>→</span>
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredBooks.length === 0" class="text-center py-12">
        <p class="text-lg opacity-70">Nenhum livro encontrado</p>
      </div>
    </div>
  </div>
</template>

