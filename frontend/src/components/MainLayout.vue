<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import BottomNav from './BottomNav.vue';
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <main class="flex-1 pb-20 lg:pb-0">
      <slot />
    </main>

    <AppFooter />
    <BottomNav />
  </div>
</template>

