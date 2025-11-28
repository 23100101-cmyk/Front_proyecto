// Store de gamificación y puntos
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from 'src/services/api'

export const useGamificationStore = defineStore('gamification', () => {
  // Estado
  const points = ref(0)
  const pointsHistory = ref([])
  const achievements = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const totalPoints = computed(() => points.value)

  const pointsBreakdown = computed(() => {
    const breakdown = {}
    pointsHistory.value.forEach((entry) => {
      if (!breakdown[entry.action]) {
        breakdown[entry.action] = 0
      }
      breakdown[entry.action] += entry.points
    })
    return breakdown
  })

  // Actions
  const fetchPoints = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.get('/points')
      points.value = response.data.totalPoints
      pointsHistory.value = response.data.history
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar puntos'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const fetchAchievements = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.get('/achievements')
      achievements.value = response.data
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar logros'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const addPoints = async (action, pointsToAdd) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.post('/points', { action, points: pointsToAdd })
      const pointsEarned = response.data.points
      const newPoint = {
        id: response.data.id,
        action,
        points: pointsEarned,
        date: new Date().toISOString(),
        description: response.data.description,
      }
      pointsHistory.value.unshift(newPoint)
      points.value += pointsEarned
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al agregar puntos'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    points,
    pointsHistory,
    achievements,
    loading,
    error,
    totalPoints,
    pointsBreakdown,
    fetchPoints,
    fetchAchievements,
    addPoints,
    clearError,
  }
})
