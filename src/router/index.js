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

    // Si la ruta es login
    if (to.path === '/login') {
      // Si está autenticado, redirigir al dashboard
      if (isAuthenticated) {
        return next('/app/dashboard')
      }
      // Si no está autenticado, permitir acceso al login
      return next()
    }

    // Si va a /app/dashboard o cualquier ruta bajo /app/
    if (to.path.startsWith('/app')) {
      // Verificar que está autenticado
      if (!isAuthenticated) {
        // Si no está autenticado, redirigir a login
        return next('/login')
      }
      // Si está autenticado, permitir acceso
      return next()
    }

    // Para todas las otras rutas, permitir acceso (catch-all)
    return next()
  })

  return Router
})
