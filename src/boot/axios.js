import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Create a shared axios instance for the API
const api = axios.create({ baseURL: 'http://localhost:5287/api' })

export default defineBoot(({ app }) => {
  // expose for Options API as this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  // REQUEST interceptor: attach token when present
  api.interceptors.request.use(
    (config) => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch {
        // ignore
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // RESPONSE interceptor: on 401 remove token from localStorage
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error && error.response && error.response.status === 401) {
        try {
          localStorage.removeItem('token')
        } catch {}

        try {
          window.location.href = '/login'
        } catch {}
      }
      return Promise.reject(error)
    }
  )
})

export { api }
