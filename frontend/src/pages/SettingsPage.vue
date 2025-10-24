<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../stores/theme';

const router = useRouter();
const themeStore = useThemeStore();

const fontSize = ref<'small' | 'medium' | 'large'>('medium');
const defaultTranslation = ref('nvi');

const goBack = () => {
  router.push({ name: 'home' });
};

const saveFontSize = (size: 'small' | 'medium' | 'large') => {
  fontSize.value = size;
  localStorage.setItem('fontSize', size);
  const root = document.documentElement;
  if (size === 'small') {
    root.style.fontSize = '14px';
  } else if (size === 'large') {
    root.style.fontSize = '18px';
  } else {
    root.style.fontSize = '16px';
  }
};

const saveDefaultTranslation = () => {
  localStorage.setItem('defaultTranslation', defaultTranslation.value);
};

const exportData = () => {
  alert('Funcionalidade de exportação em desenvolvimento');
};

const importData = () => {
  alert('Funcionalidade de importação em desenvolvimento');
};

const loadSettings = () => {
  const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large' | null;
  if (savedFontSize) {
    fontSize.value = savedFontSize;
    saveFontSize(savedFontSize);
  }

  const savedTranslation = localStorage.getItem('defaultTranslation');
  if (savedTranslation) {
    defaultTranslation.value = savedTranslation;
  }
};

loadSettings();
</script>

<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <div class="space-y-6">
      <!-- Aparência -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🎨 Aparência</h2>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tema</span>
            </label>
            <div class="flex gap-2">
              <button
                @click="themeStore.setTheme('light')"
                class="btn btn-sm"
                :class="{ 'btn-primary': !themeStore.isDark }"
              >
                ☀️ Claro
              </button>
              <button
                @click="themeStore.setTheme('dark')"
                class="btn btn-sm"
                :class="{ 'btn-primary': themeStore.isDark }"
              >
                🌙 Escuro
              </button>
            </div>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Tamanho da Fonte</span>
            </label>
            <div class="flex gap-2">
              <button
                @click="saveFontSize('small')"
                class="btn btn-sm"
                :class="{ 'btn-primary': fontSize === 'small' }"
              >
                A
              </button>
              <button
                @click="saveFontSize('medium')"
                class="btn btn-sm"
                :class="{ 'btn-primary': fontSize === 'medium' }"
              >
                <span class="text-lg">A</span>
              </button>
              <button
                @click="saveFontSize('large')"
                class="btn btn-sm"
                :class="{ 'btn-primary': fontSize === 'large' }"
              >
                <span class="text-xl">A</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Leitura -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">📖 Leitura</h2>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tradução Padrão</span>
            </label>
            <select
              v-model="defaultTranslation"
              @change="saveDefaultTranslation"
              class="select select-bordered w-full max-w-xs"
            >
              <option value="nvi">NVI - Nova Versão Internacional</option>
              <option value="arc">ARC - Almeida Revista e Corrigida</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Dados -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">💾 Backup e Restauração</h2>

          <div class="flex flex-col gap-2">
            <button @click="exportData" class="btn btn-outline">
              📤 Exportar Dados
            </button>
            <button @click="importData" class="btn btn-outline">
              📥 Importar Dados
            </button>
          </div>
        </div>
      </div>

      <!-- Sobre -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">ℹ️ Sobre</h2>

          <div class="space-y-2 text-sm">
            <p><strong>Versão:</strong> 1.0.0</p>
            <p><strong>Backend API:</strong> <a href="https://ler-biblia-backend.onrender.com/api" target="_blank" class="link">Documentação</a></p>
            <p><strong>Código Fonte:</strong> <a href="https://github.com/AngeloLDias/ler-biblia" target="_blank" class="link">GitHub</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

