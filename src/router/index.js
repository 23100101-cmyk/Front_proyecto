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
    auth.checkAuth()

    const isAuthenticated = auth.isAuthenticated

    // Si intenta ir a login y ya está autenticado, ir a dashboard
    if (to.path === '/login' && isAuthenticated) {
      return next('/app/dashboard')
    }

    // Si intenta ir a /app sin autenticación, ir a login
    if (to.path.startsWith('/app') && !isAuthenticated) {
      return next('/login')
    }

    // En todos los demás casos, permitir la navegación
    next()
  })

  return Router
})
