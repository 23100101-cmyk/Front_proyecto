import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

import routes from './routes'

// IMPORTA tu store AQUÍ (NO dentro del beforeEach)
import { useAuthStore } from 'src/stores/auth'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    // Revisar sesión al cargar
    if (!auth.isAuthenticated) {
      auth.checkAuth()
    }

    const requiresAuth = to.meta?.requiresAuth !== false

    if (requiresAuth && !auth.isAuthenticated) {
      next('/login')
    } else if (to.path === '/login' && auth.isAuthenticated) {
      next('/mi-perfil-dashboard')
    } else {
      next()
    }
  })

  return Router
})
