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

    // Restaurar sesión desde localStorage si es necesario
    auth.checkAuth()

    const isAuthenticated = auth.isAuthenticated
    const requiresAuth = to.meta?.requiresAuth !== false

    // Si la ruta NO requiere autenticación, permitir acceso
    if (!requiresAuth) {
      // Si el usuario ya está autenticado y va a login, redirigir al dashboard
      if (to.path === '/login' && isAuthenticated) {
        return next('/')
      }
      return next()
    }

    // Si la ruta REQUIERE autenticación y NO está autenticado, redirigir a login
    if (requiresAuth && !isAuthenticated) {
      return next('/login')
    }

    // Si está autenticado, permitir acceso
    return next()
  })

  return Router
})
