import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
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

  // Guardia de rutas para proteger rutas que requieren autenticación
  Router.beforeEach((to, from, next) => {
    const { useAuthStore } = require('src/stores/auth')
    const auth = useAuthStore()

    // Verificar si hay sesión guardada al cargar la app
    if (!auth.isAuthenticated) {
      auth.checkAuth()
    }

    const requiresAuth = to.meta?.requiresAuth !== false

    if (requiresAuth && !auth.isAuthenticated) {
      // Si intenta acceder a una ruta protegida sin autenticación
      next('/login')
    } else if (to.path === '/login' && auth.isAuthenticated) {
      // Si está logueado y trata de acceder al login, redirige al dashboard
      next('/mi-perfil-dashboard')
    } else {
      next()
    }
  })

  return Router
})
