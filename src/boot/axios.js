import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://api.example.com'

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de respuesta para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`Error HTTP ${error.response.status}:`, error.response.data)

      if (error.response.status === 401) {
        console.warn('Token expirado o no autorizado. Por favor, inicia sesión nuevamente.')
      }

      if (error.response.status === 403) {
        console.warn('Acceso denegado.')
      }

      if (error.response.status === 500) {
        console.error('Error interno del servidor. Contacte al administrador.')
      }
    } else if (error.request) {
      console.error('Sin respuesta del servidor:', error.request)
    } else {
      console.error('Error en la solicitud:', error.message)
    }

    return Promise.reject(error)
  },
)

// Interceptor de solicitud para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error),
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
