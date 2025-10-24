<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useThemeStore } from '../stores/theme';

const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
  closeMenu();
};

const isActive = (routeName: string) => {
  return route.name === routeName;
};
</script>

<template>
  <header class="navbar bg-base-200 shadow-lg sticky top-0 z-50">
    <div class="navbar-start">
      <!-- Mobile menu button -->
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul v-if="menuOpen" tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a @click="navigateTo('home')" :class="{ 'active': isActive('home') }">🏠 Início</a></li>
          <li><a @click="navigateTo('select-translation')" :class="{ 'active': isActive('select-translation') }">📖 Ler</a></li>
          <li><a @click="navigateTo('search')" :class="{ 'active': isActive('search') }">🔍 Buscar</a></li>
          <li><a @click="navigateTo('notes')" :class="{ 'active': isActive('notes') }">📝 Notas</a></li>
          <li><a @click="navigateTo('plans')" :class="{ 'active': isActive('plans') }">📅 Planos</a></li>
          <li><a @click="navigateTo('settings')" :class="{ 'active': isActive('settings') }">⚙️ Configurações</a></li>
        </ul>
      </div>
      
      <!-- Logo/Title -->
      <a @click="navigateTo('home')" class="btn btn-ghost text-xl cursor-pointer">
        📖 Ler Bíblia
      </a>
    </div>
    
    <!-- Desktop menu -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a @click="navigateTo('home')" :class="{ 'active': isActive('home') }">🏠 Início</a></li>
        <li><a @click="navigateTo('select-translation')" :class="{ 'active': isActive('select-translation') }">📖 Ler</a></li>
        <li><a @click="navigateTo('search')" :class="{ 'active': isActive('search') }">🔍 Buscar</a></li>
        <li><a @click="navigateTo('notes')" :class="{ 'active': isActive('notes') }">📝 Notas</a></li>
        <li><a @click="navigateTo('plans')" :class="{ 'active': isActive('plans') }">📅 Planos</a></li>
      </ul>
    </div>
    
    <div class="navbar-end gap-2">
      <!-- Theme toggle -->
      <button @click="themeStore.toggleTheme" class="btn btn-ghost btn-circle" :title="themeStore.isDark ? 'Modo Claro' : 'Modo Escuro'">
        <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
      
      <!-- Settings button -->
      <button @click="navigateTo('settings')" class="btn btn-ghost btn-circle" title="Configurações">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.menu li a.active {
  @apply bg-primary text-primary-content;
}
</style>

