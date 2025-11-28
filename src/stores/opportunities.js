// Store de oportunidades laborales y aplicaciones
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from 'src/services/api'

export const useOpportunitiesStore = defineStore('opportunities', () => {
  // Estado
  const opportunities = ref([])
  const myApplications = ref([])
  const selectedOpportunity = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const filterDepartment = ref('')

  // Computed
  const filteredOpportunities = computed(() => {
    return opportunities.value.filter((opp) => {
      const matchSearch =
        !searchQuery.value ||
        opp.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchDept = !filterDepartment.value || opp.department === filterDepartment.value
      return matchSearch && matchDept
    })
  })

  const appliedOpportunitiesIds = computed(() => myApplications.value.map((app) => app.opportunityId))

  const hasApplied = (opportunityId) => appliedOpportunitiesIds.value.includes(opportunityId)

  // Actions
  const fetchOpportunities = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.get('/opportunities')
      opportunities.value = response.data
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar oportunidades'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const fetchMyApplications = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.get('/applications')
      myApplications.value = response.data
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar aplicaciones'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const applyToOpportunity = async (opportunityId) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.post('/applications', { opportunityId })
      myApplications.value.push(response.data)
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al aplicar a la oportunidad'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const withdrawApplication = async (applicationId) => {
    loading.value = true
    error.value = null
    try {
      await apiService.delete(`/applications/${applicationId}`)
      myApplications.value = myApplications.value.filter((app) => app.id !== applicationId)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al retirar aplicación'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const selectOpportunity = (opportunity) => {
    selectedOpportunity.value = opportunity
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setFilterDepartment = (dept) => {
    filterDepartment.value = dept
  }

  const clearError = () => {
    error.value = null
  }

  return {
    opportunities,
    myApplications,
    selectedOpportunity,
    loading,
    error,
    searchQuery,
    filterDepartment,
    filteredOpportunities,
    appliedOpportunitiesIds,
    hasApplied,
    fetchOpportunities,
    fetchMyApplications,
    applyToOpportunity,
    withdrawApplication,
    selectOpportunity,
    setSearchQuery,
    setFilterDepartment,
    clearError,
  }
})
