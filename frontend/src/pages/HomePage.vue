<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const router = useRouter();

// Estado
const verseOfDay = ref<any>(null);
const loadingVerse = ref(true);
const lastRead = ref<any>(null);
const stats = ref({
  totalHighlights: 0,
  totalNotes: 0,
  activePlans: 0,
});

// Buscar versículo do dia
const fetchVerseOfDay = async () => {
  try {
    loadingVerse.value = true;

    // Gerar um versículo "aleatório" baseado no dia do ano
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Lista de versículos populares (bookId, chapter, verse)
    // IDs corretos do PostgreSQL (1-66)
    const popularVerses = [
      { bookId: 43, chapter: 3, verse: 16, ref: 'João 3:16' }, // João 3:16
      { bookId: 45, chapter: 8, verse: 28, ref: 'Romanos 8:28' }, // Romanos 8:28
      { bookId: 50, chapter: 4, verse: 13, ref: 'Filipenses 4:13' }, // Filipenses 4:13
      { bookId: 1, chapter: 1, verse: 1, ref: 'Gênesis 1:1' }, // Gênesis 1:1
      { bookId: 45, chapter: 12, verse: 2, ref: 'Romanos 12:2' }, // Romanos 12:2
      { bookId: 46, chapter: 13, verse: 4, ref: '1 Coríntios 13:4' }, // 1 Coríntios 13:4
      { bookId: 62, chapter: 1, verse: 9, ref: '1 João 1:9' }, // 1 João 1:9
      { bookId: 40, chapter: 5, verse: 8, ref: 'Mateus 5:8' }, // Mateus 5:8
    ];

    const selectedVerse = popularVerses[dayOfYear % popularVerses.length];

    const response = await axios.get(`${API_BASE_URL}/v1/bible/verse`, {
      params: {
        translationId: 1, // NVI
        bookId: selectedVerse.bookId,
        chapter: selectedVerse.chapter,
        verse: selectedVerse.verse,
      },
    });

    verseOfDay.value = {
      ...response.data,
      reference: selectedVerse.ref,
    };
  } catch (error) {
    console.error('Erro ao buscar versículo do dia:', error);
    // Fallback para João 3:16
    verseOfDay.value = {
      text: 'Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna.',
      reference: 'João 3:16',
    };
  } finally {
    loadingVerse.value = false;
  }
};

// Carregar última leitura do localStorage
const loadLastRead = () => {
  const saved = localStorage.getItem('lastRead');
  if (saved) {
    lastRead.value = JSON.parse(saved);
  }
};

// Carregar estatísticas do localStorage
const loadStats = () => {
  const highlights = localStorage.getItem('highlights');
  const notes = localStorage.getItem('notes');

  if (highlights) {
    stats.value.totalHighlights = JSON.parse(highlights).length || 0;
  }

  if (notes) {
    stats.value.totalNotes = JSON.parse(notes).length || 0;
  }
};

// Navegação
const goToReading = () => {
  if (lastRead.value) {
    router.push({
      name: 'read',
      params: {
        translationId: lastRead.value.translationId,
        bookId: lastRead.value.bookId,
        chapter: lastRead.value.chapter,
      },
    });
  } else {
    // Padrão: João 3 (bookId correto: 43, translationId correto: 1)
    router.push({ name: 'read', params: { translationId: 1, bookId: 43, chapter: 3 } });
  }
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

const goToVerseOfDay = () => {
  if (verseOfDay.value) {
    router.push({
      name: 'read',
      params: {
        translationId: 1, // NVI (ID correto)
        bookId: verseOfDay.value.bookId,
        chapter: verseOfDay.value.chapter,
      },
    });
  }
};

onMounted(() => {
  fetchVerseOfDay();
  loadLastRead();
  loadStats();
});
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 max-w-6xl">
    <!-- Welcome Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">Bem-vindo! 📖</h1>
      <p class="text-sm opacity-70">Leia, estude e medite na Palavra de Deus</p>
    </div>

    <!-- Verse of the Day -->
    <div class="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl mb-6">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">✨ Versículo do Dia</h2>

        <div v-if="loadingVerse" class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="verseOfDay">
          <p class="text-lg font-semibold mb-2 opacity-90">{{ verseOfDay.reference }}</p>
          <p class="text-xl leading-relaxed mb-4">{{ verseOfDay.text }}</p>
          <div class="card-actions justify-end">
            <button @click="goToVerseOfDay" class="btn btn-sm btn-ghost">
              Ler Capítulo Completo →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="stat bg-base-200 rounded-lg shadow">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
          </svg>
        </div>
        <div class="stat-title">Destaques</div>
        <div class="stat-value text-primary">{{ stats.totalHighlights }}</div>
        <div class="stat-desc">Versículos marcados</div>
      </div>

      <div class="stat bg-base-200 rounded-lg shadow">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="stat-title">Anotações</div>
        <div class="stat-value text-secondary">{{ stats.totalNotes }}</div>
        <div class="stat-desc">Notas criadas</div>
      </div>

      <div class="stat bg-base-200 rounded-lg shadow">
        <div class="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="stat-title">Planos Ativos</div>
        <div class="stat-value text-accent">{{ stats.activePlans }}</div>
        <div class="stat-desc">Em andamento</div>
      </div>
    </div>

    <!-- Continue Reading -->
    <div v-if="lastRead" class="alert alert-info shadow-lg mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <h3 class="font-bold">Continue de onde parou</h3>
        <div class="text-xs">{{ lastRead.bookName }} - Capítulo {{ lastRead.chapter }}</div>
      </div>
      <button @click="goToReading" class="btn btn-sm btn-primary">
        Continuar Lendo
      </button>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button @click="goToSelector" class="btn btn-lg btn-primary gap-2 h-auto py-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <div class="text-left">
          <div class="font-bold">Selecionar Livro</div>
          <div class="text-xs opacity-70">Escolha um livro da Bíblia</div>
        </div>
      </button>

      <button @click="goToSearch" class="btn btn-lg btn-accent gap-2 h-auto py-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div class="text-left">
          <div class="font-bold">Buscar</div>
          <div class="text-xs opacity-70">Encontre versículos</div>
        </div>
      </button>

      <button @click="goToNotes" class="btn btn-lg btn-secondary gap-2 h-auto py-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <div class="text-left">
          <div class="font-bold">Minhas Anotações</div>
          <div class="text-xs opacity-70">Veja suas notas</div>
        </div>
      </button>

      <button @click="goToPlans" class="btn btn-lg btn-info gap-2 h-auto py-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div class="text-left">
          <div class="font-bold">Planos de Leitura</div>
          <div class="text-xs opacity-70">Organize sua leitura</div>
        </div>
      </button>

      <button @click="goToReading" class="btn btn-lg btn-ghost gap-2 h-auto py-6 border-2 border-base-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <div class="text-left">
          <div class="font-bold">Leitura Rápida</div>
          <div class="text-xs opacity-70">{{ lastRead ? 'Continue lendo' : 'Comece a ler' }}</div>
        </div>
      </button>
    </div>
  </div>
</template>

