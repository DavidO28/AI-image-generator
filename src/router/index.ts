import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/AI-image-generator/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
  ],
})

export default router
