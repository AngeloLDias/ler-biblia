<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
};

const isActive = (routeName: string) => {
  return route.name === routeName;
};
</script>

<template>
  <nav class="btm-nav btm-nav-lg bg-base-200 border-t border-base-300 shadow-lg lg:hidden">
    <!-- Home -->
    <button 
      @click="navigateTo('home')"
      :class="{ 'active': isActive('home') }"
      class="flex flex-col items-center justify-center gap-1"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
        />
      </svg>
      <span class="btm-nav-label text-xs">Home</span>
    </button>

    <!-- Bíblia -->
    <button 
      @click="navigateTo('select-translation')"
      :class="{ 'active': isActive('select-translation') || isActive('select-book') || isActive('select-chapter') || isActive('read') }"
      class="flex flex-col items-center justify-center gap-1"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
        />
      </svg>
      <span class="btm-nav-label text-xs">Bíblia</span>
    </button>
  </nav>
</template>

<style scoped>
.btm-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
}

.btm-nav button {
  transition: all 0.2s ease;
}

.btm-nav button.active {
  color: var(--fallback-p, oklch(var(--p)));
}

.btm-nav button:hover {
  background-color: var(--fallback-b3, oklch(var(--b3)));
}
</style>

