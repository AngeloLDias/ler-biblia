import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/select-translation',
      name: 'select-translation',
      component: () => import('../pages/SelectTranslationPage.vue'),
    },
    {
      path: '/select-book/:translationId',
      name: 'select-book',
      component: () => import('../pages/SelectBookPage.vue'),
    },
    {
      path: '/select-chapter/:translationId/:bookId',
      name: 'select-chapter',
      component: () => import('../pages/SelectChapterPage.vue'),
    },
    {
      path: '/read/:translationId/:bookId/:chapter',
      name: 'read',
      component: () => import('../pages/ReadingPage.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../pages/SearchPage.vue'),
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../pages/NotesPage.vue'),
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../pages/PlansPage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/SettingsPage.vue'),
    },
  ],
});

export default router;

