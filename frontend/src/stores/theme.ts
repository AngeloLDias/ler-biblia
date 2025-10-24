import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Estado
  const theme = ref<'light' | 'dark'>('light');
  
  // Computed
  const isDark = ref(false);
  
  // Inicializar tema do localStorage ou preferência do sistema
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || savedTheme === 'light') {
      theme.value = savedTheme;
    } else {
      // Detectar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
    
    applyTheme();
  };
  
  // Aplicar tema ao HTML
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    isDark.value = theme.value === 'dark';
  };
  
  // Alternar tema
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    applyTheme();
  };
  
  // Definir tema específico
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme;
    applyTheme();
  };
  
  // Salvar tema no localStorage quando mudar
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
  });
  
  return {
    theme,
    isDark,
    initTheme,
    toggleTheme,
    setTheme,
  };
});

