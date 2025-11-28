// Store de autenticación con Pinia
// Estado global de usuario, token y autenticación

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from 'src/services/api'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('authToken'))
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userDisplayName = computed(() => user.value?.name || 'Usuario')
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U'
    return user.value.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // Actions
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login(email, password)
      const { token: newToken, user: newUser } = response.data

      token.value = newToken
      user.value = newUser

      // Persistir en localStorage
      localStorage.setItem('authToken', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))

      return { success: true, user: newUser }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    error.value = null
  }

  const updateProfile = async (profileData) => {
    loading.value = true
    error.value = null
    try {
      // Llamar al backend para actualizar perfil
      // const response = await userService.updateProfile(user.value.id, profileData)
      // user.value = response.data
      // localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    userDisplayName,
    userInitials,
    login,
    logout,
    updateProfile,
    clearError,
  }
})
