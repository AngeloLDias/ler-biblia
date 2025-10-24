<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const plans = ref<any[]>([]);
const loading = ref(false);

const loadPlans = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:3000/v1/plans');
    plans.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar planos:', error);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'home' });
};

onMounted(() => {
  loadPlans();
});
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm">
          ← Voltar
        </button>
        <h1 class="text-2xl font-bold">Planos de Leitura</h1>
        <div class="w-20"></div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Plans List -->
      <div v-else-if="plans.length > 0" class="space-y-4">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="card bg-base-200 shadow-xl"
        >
          <div class="card-body">
            <h2 class="card-title">{{ plan.name }}</h2>
            <p class="text-sm opacity-70">{{ plan.description }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="badge badge-primary">{{ plan.totalDays }} dias</span>
              <span v-if="plan.isActive" class="badge badge-success">Ativo</span>
            </div>
            <div class="card-actions justify-end mt-4">
              <button class="btn btn-primary btn-sm">
                Iniciar Plano
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">📅</div>
        <p class="text-lg opacity-70">Nenhum plano disponível</p>
      </div>
    </div>
  </div>
</template>

