import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      components: {
        default: () => import('@/views/MainView.vue'),
        header: () => import('@/components/app/Header/Header.vue')
      }
    },
    {
      path: '/docs',
      components: {
        default: () => import('@/views/DocumentsView.vue'),
        header: () => import('@/components/app/Header/Header.vue')
      }
    },
    {
      path: '/contacts',
      components: {
        default: () => import('@/views/ContactsView.vue'),
        header: () => import('@/components/app/Header/Header.vue')
      }
    },
    {
      path: '/authorization',
      components: {
        default: () => import('@/views/AuthorizationView.vue'),
        header: () => import('@/components/app/Header/Header.vue')
      }
    }
  ]
})

export default router
