// Servicios centralizados para consumir la API del backend
// Uso: import { authService } from 'src/services/api'

import { api } from 'src/boot/axios'

/**
 * Servicio de Autenticación
 */
export const authService = {
  login(username, password) {
    return api.post('/auth/login', { username, password })
  },

  logout() {
    return api.post('/auth/logout')
  },

  register(userData) {
    return api.post('/auth/register', userData)
  },

  refresh() {
    return api.post('/auth/refresh')
  },

  getCurrentUser() {
    return api.get('/auth/me')
  },
}

/**
 * Servicio genérico para operaciones CRUD
 * Uso: apiService.get('/users'), apiService.post('/users', userData), etc.
 */
export const apiService = {
  get(endpoint, config = {}) {
    return api.get(endpoint, config)
  },

  post(endpoint, data, config = {}) {
    return api.post(endpoint, data, config)
  },

  put(endpoint, data, config = {}) {
    return api.put(endpoint, data, config)
  },

  patch(endpoint, data, config = {}) {
    return api.patch(endpoint, data, config)
  },

  delete(endpoint, config = {}) {
    return api.delete(endpoint, config)
  },

  // Para uploads con FormData
  // Para uploads con FormData
  postForm(endpoint, formData, config = {}) {
    return api.post(endpoint, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

/**
 * Servicio de Usuarios (ejemplo)
 */
export const userService = {
  getAll(params = {}) {
    return api.get('/users', { params })
  },

  getById(id) {
    return api.get(`/users/${id}`)
  },

  create(userData) {
    return api.post('/users', userData)
  },

  update(id, userData) {
    return api.put(`/users/${id}`, userData)
  },

  delete(id) {
    return api.delete(`/users/${id}`)
  },

  getProfile(id) {
    return api.get(`/users/${id}/profile`)
  },

  updateProfile(id, profileData) {
    return api.put(`/users/${id}/profile`, profileData)
  },
}

/**
 * Servicio de Cursos (ejemplo)
 */
export const courseService = {
  getAll(params = {}) {
    return api.get('/courses', { params })
  },

  getById(id) {
    return api.get(`/courses/${id}`)
  },

  create(courseData) {
    return api.post('/courses', courseData)
  },

  update(id, courseData) {
    return api.put(`/courses/${id}`, courseData)
  },

  delete(id) {
    return api.delete(`/courses/${id}`)
  },

  enroll(courseId) {
    return api.post(`/courses/${courseId}/enroll`)
  },

  getProgress(courseId) {
    return api.get(`/courses/${courseId}/progress`)
  },
}

/**
 * Servicio de Skills (ejemplo)
 */
export const skillService = {
  getAll(params = {}) {
    return api.get('/skills', { params })
  },

  getById(id) {
    return api.get(`/skills/${id}`)
  },

  getUserSkills(userId) {
    return api.get(`/users/${userId}/skills`)
  },

  updateUserSkill(userId, skillId, level) {
    return api.put(`/users/${userId}/skills/${skillId}`, { level })
  },

  matchSkills(skillIds) {
    return api.post('/skills/match', { skillIds })
  },
}

/**
 * Servicio de Health Check
 */
export const healthService = {
  check() {
    return api.get('/health')
  },
}

export default {
  authService,
  apiService,
  userService,
  courseService,
  skillService,
  healthService,
}
