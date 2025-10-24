# Frontend Quick Start Guide

This guide will help you quickly set up and start building the frontend for the Ler Bíblia application.

## Prerequisites

- Backend is running at `http://localhost:3000`
- Node.js 18+ installed
- Basic knowledge of Vue 3, TypeScript, and Tailwind CSS

## Step 1: Configure Tailwind CSS

The Tailwind config is already created. Now add the directives to your CSS:

**Create `frontend/src/style.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Update `frontend/src/main.ts`:**
```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

## Step 2: Install Vue Router and Pinia

```bash
cd frontend
npm install vue-router@4 pinia
```

## Step 3: Create Basic Structure

### Create directories:
```bash
mkdir -p src/features/{bible,search,notes,plans,settings}
mkdir -p src/components
mkdir -p src/composables
mkdir -p src/stores
mkdir -p src/services
mkdir -p src/types
```

## Step 4: Define Types

**Create `frontend/src/types/bible.ts`:**
```typescript
export interface Translation {
  id: number;
  code: string;
  name: string;
  language: string;
  isActive: boolean;
}

export interface Book {
  id: number;
  name: string;
  abbreviation: string;
  testament: 'OT' | 'NT';
  order: number;
  chapters: number;
}

export interface Verse {
  id: number;
  translationId: number;
  bookId: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface Highlight {
  id: number;
  verseId: number;
  color: string;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: number;
  verseId: number;
  content: string;
  tags: string[];
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingPlan {
  id: number;
  name: string;
  description: string;
  totalDays: number;
  schedule: Array<{
    day: number;
    readings: Array<{
      bookId: number;
      startChapter: number;
      endChapter: number;
    }>;
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingProgress {
  id: number;
  planId: number;
  day: number;
  completed: boolean;
  completedAt: Date | null;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Step 5: Create API Service

**Create `frontend/src/services/api.ts`:**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bibleApi = {
  getTranslations: () => api.get('/bible/translations'),
  getBooks: (testament?: string) => api.get('/bible/books', { params: { testament } }),
  getBook: (id: number) => api.get(`/bible/books/${id}`),
  getChapter: (translationId: number, bookId: number, chapter: number) =>
    api.get('/bible/chapter', { params: { translationId, bookId, chapter } }),
  getVerse: (translationId: number, bookId: number, chapter: number, verse: number) =>
    api.get('/bible/verse', { params: { translationId, bookId, chapter, verse } }),
};

export const searchApi = {
  search: (query: string, filters?: { translationId?: number; testament?: string; bookId?: number }) =>
    api.get('/search', { params: { query, ...filters } }),
};

export const notesApi = {
  createHighlight: (data: { verseId: number; color: string }) =>
    api.post('/notes/highlights', data),
  getHighlights: (filters?: { verseId?: number; color?: string }) =>
    api.get('/notes/highlights', { params: filters }),
  deleteHighlight: (id: number) => api.delete(`/notes/highlights/${id}`),
  
  createNote: (data: { verseId: number; content: string; tags?: string[] }) =>
    api.post('/notes', data),
  getNotes: (filters?: { verseId?: number; tag?: string }) =>
    api.get('/notes', { params: filters }),
  getNote: (id: number) => api.get(`/notes/${id}`),
  updateNote: (id: number, data: { content?: string; tags?: string[] }) =>
    api.put(`/notes/${id}`, data),
  deleteNote: (id: number) => api.delete(`/notes/${id}`),
};

export const plansApi = {
  getPlans: () => api.get('/plans'),
  getPlan: (id: number) => api.get(`/plans/${id}`),
  getProgress: (id: number) => api.get(`/plans/${id}/progress`),
  updateProgress: (id: number, day: number, completed: boolean) =>
    api.put(`/plans/${id}/progress/${day}`, { completed }),
  resetProgress: (id: number) => api.delete(`/plans/${id}/progress`),
};

export default api;
```

## Step 6: Create Pinia Stores

**Create `frontend/src/stores/bible.ts`:**
```typescript
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { bibleApi } from '../services/api';
import type { Translation, Book, Verse } from '../types/bible';

export const useBibleStore = defineStore('bible', () => {
  const translations = ref<Translation[]>([]);
  const books = ref<Book[]>([]);
  const currentChapter = ref<Verse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTranslations() {
    loading.value = true;
    error.value = null;
    try {
      const response = await bibleApi.getTranslations();
      translations.value = response.data;
    } catch (e) {
      error.value = 'Failed to load translations';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchBooks(testament?: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await bibleApi.getBooks(testament);
      books.value = response.data;
    } catch (e) {
      error.value = 'Failed to load books';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchChapter(translationId: number, bookId: number, chapter: number) {
    loading.value = true;
    error.value = null;
    try {
      const response = await bibleApi.getChapter(translationId, bookId, chapter);
      currentChapter.value = response.data;
    } catch (e) {
      error.value = 'Failed to load chapter';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return {
    translations,
    books,
    currentChapter,
    loading,
    error,
    fetchTranslations,
    fetchBooks,
    fetchChapter,
  };
});
```

## Step 7: Setup Router

**Create `frontend/src/router/index.ts`:**
```typescript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../features/home/HomePage.vue'),
    },
    {
      path: '/read/:translation/:book/:chapter',
      name: 'read',
      component: () => import('../features/bible/ReadingView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../features/search/SearchPage.vue'),
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../features/notes/NotesPage.vue'),
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../features/plans/PlansPage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../features/settings/SettingsPage.vue'),
    },
  ],
});

export default router;
```

## Step 8: Update Main App

**Update `frontend/src/main.ts`:**
```typescript
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
```

**Update `frontend/src/App.vue`:**
```vue
<template>
  <div class="min-h-screen bg-base-100">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// App-level logic here
</script>
```

## Step 9: Create First Component

**Create `frontend/src/features/home/HomePage.vue`:**
```vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8">Ler Bíblia</h1>
    
    <div class="card bg-base-200 shadow-xl mb-4">
      <div class="card-body">
        <h2 class="card-title">Versículo do Dia</h2>
        <p class="text-lg">João 3:16</p>
        <p>Porque Deus tanto amou o mundo que deu o seu Filho Unigênito...</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link to="/read/1/1/1" class="btn btn-primary">
        Continuar Lendo
      </router-link>
      <router-link to="/search" class="btn btn-secondary">
        Buscar
      </router-link>
      <router-link to="/notes" class="btn btn-accent">
        Minhas Anotações
      </router-link>
      <router-link to="/plans" class="btn btn-info">
        Planos de Leitura
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>
```

## Step 10: Run and Test

```bash
npm run dev
```

Visit `http://localhost:5173` and you should see the home page!

## Next Steps

1. Build the Reading View (most important)
2. Implement Search
3. Create Notes & Highlights UI
4. Add Reading Plans interface
5. Build Settings page
6. Add PWA support

## Tips

- Use daisyUI components for rapid UI development
- Test API calls in browser console first
- Use Vue DevTools for debugging
- Keep components small and focused
- Use composables for reusable logic

## Common Issues

**CORS errors:** Make sure backend is running and CORS is enabled

**API not found:** Check that baseURL in api.ts matches your backend

**Tailwind not working:** Ensure style.css is imported in main.ts

**Router not working:** Check that router is installed in main.ts

## Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [daisyUI Components](https://daisyui.com/components/)

