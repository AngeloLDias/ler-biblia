<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
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

interface Book {
  id: number;
  name: string;
  abbreviation: string;
  testament: 'OT' | 'NT';
  order: number;
  chapters: number;
}

const translations = ref<Translation[]>([]);
const books = ref<Book[]>([]);
const selectedTranslation = ref<number>(3); // NVI por padrão
const selectedBook = ref<Book | null>(null);
const selectedChapter = ref<number>(1);
const loading = ref(false);
const activeTestament = ref<'OT' | 'NT' | 'ALL'>('ALL');

// Carregar traduções
const loadTranslations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/bible/translations`);
    translations.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  }
};

// Carregar livros
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

// Filtrar livros por testamento
const filteredBooks = computed(() => {
  if (activeTestament.value === 'ALL') {
    return books.value;
  }
  return books.value.filter(book => book.testament === activeTestament.value);
});

// Livros do Antigo Testamento
const oldTestamentBooks = computed(() => 
  books.value.filter(book => book.testament === 'OT')
);

// Livros do Novo Testamento
const newTestamentBooks = computed(() => 
  books.value.filter(book => book.testament === 'NT')
);

// Selecionar livro
const selectBook = (book: Book) => {
  selectedBook.value = book;
  selectedChapter.value = 1; // Reset para capítulo 1
};

// Ir para leitura
const goToReading = () => {
  if (!selectedBook.value) {
    alert('Selecione um livro primeiro');
    return;
  }

  router.push({
    name: 'read',
    params: {
      translationId: selectedTranslation.value,
      bookId: selectedBook.value.id,
      chapter: selectedChapter.value,
    },
  });
};

const goBack = () => {
  router.push({ name: 'home' });
};

onMounted(() => {
  loadTranslations();
  loadBooks();
});
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto p-4 max-w-6xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm">
          ← Voltar
        </button>
        <h1 class="text-2xl font-bold">Selecionar Leitura</h1>
        <div class="w-20"></div>
      </div>

      <!-- Seletor de Tradução -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-semibold">Tradução</span>
        </label>
        <select v-model="selectedTranslation" class="select select-bordered w-full max-w-xs">
          <option v-for="translation in translations" :key="translation.id" :value="translation.id">
            {{ translation.name }} ({{ translation.code }})
          </option>
        </select>
      </div>

      <!-- Tabs de Testamento -->
      <div class="tabs tabs-boxed mb-6">
        <a 
          class="tab" 
          :class="{ 'tab-active': activeTestament === 'ALL' }"
          @click="activeTestament = 'ALL'"
        >
          Todos
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Lista de Livros -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Selecione o Livro</h2>
            
            <div v-if="loading" class="flex justify-center py-8">
              <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              <button
                v-for="book in filteredBooks"
                :key="book.id"
                @click="selectBook(book)"
                class="btn btn-sm justify-start"
                :class="{
                  'btn-primary': selectedBook?.id === book.id,
                  'btn-ghost': selectedBook?.id !== book.id,
                }"
              >
                {{ book.name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Seletor de Capítulo -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Selecione o Capítulo</h2>

            <div v-if="!selectedBook" class="text-center py-8 opacity-70">
              <p>Selecione um livro primeiro</p>
            </div>

            <div v-else>
              <div class="mb-4">
                <p class="text-lg font-semibold">{{ selectedBook.name }}</p>
                <p class="text-sm opacity-70">{{ selectedBook.chapters }} capítulos</p>
              </div>

              <div class="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto">
                <button
                  v-for="chapter in selectedBook.chapters"
                  :key="chapter"
                  @click="selectedChapter = chapter"
                  class="btn btn-sm"
                  :class="{
                    'btn-primary': selectedChapter === chapter,
                    'btn-ghost': selectedChapter !== chapter,
                  }"
                >
                  {{ chapter }}
                </button>
              </div>

              <div class="divider"></div>

              <button
                @click="goToReading"
                class="btn btn-primary btn-block"
              >
                📖 Ler {{ selectedBook.name }} {{ selectedChapter }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scroll suave */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
}
</style>

