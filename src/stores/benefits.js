// Store de beneficios y retiro
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from 'src/services/api'

export const useBenefitsStore = defineStore('benefits', () => {
  // Estado
  const benefits = ref({
    salary: 0,
    healthInsurance: '',
    pensionPlan: '',
    vacationDays: 0,
    bonusStructure: '',
    additionalBenefits: [],
  })
  const exitSurvey = ref({
    reason: '',
    feedback: '',
    wouldRecommend: null,
    suggestions: '',
  })
  const loading = ref(false)
  const error = ref(null)

  // Actions
  const fetchBenefits = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.get('/benefits')
      benefits.value = response.data
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar beneficios'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const submitExitSurvey = async (surveyData) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.post('/exit-survey', surveyData)
      exitSurvey.value = surveyData
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al enviar encuesta de salida'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    benefits,
    exitSurvey,
    loading,
    error,
    fetchBenefits,
    submitExitSurvey,
    clearError,
  }
})
