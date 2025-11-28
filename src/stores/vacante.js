// Store de Vacantes - Gestión de oportunidades y aplicaciones
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { vacanteService, aplicacionService } from 'src/services/backend'

export const useVacanteStore = defineStore('vacante', () => {
  // Estado
  const vacantes = ref([])
  const aplicaciones = ref([])
  const filtroArea = ref('')
  const filtroNivel = ref('')
  const busqueda = ref('')
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const vacantesFiltradas = computed(() => {
    return vacantes.value.filter((vacante) => {
      const matchBusqueda = vacante.titulo
        .toLowerCase()
        .includes(busqueda.value.toLowerCase())
      const matchArea = !filtroArea.value || vacante.area === filtroArea.value
      const matchNivel =
        !filtroNivel.value || vacante.nivel === filtroNivel.value

      return matchBusqueda && matchArea && matchNivel
    })
  })

  const areasDisponibles = computed(() => {
    return [...new Set(vacantes.value.map((v) => v.area))].filter(Boolean)
  })

  const nivelesDisponibles = computed(() => {
    return [...new Set(vacantes.value.map((v) => v.nivel))].filter(Boolean)
  })

  // Actions
  const fetchVacantes = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await vacanteService.getAll(params)
      vacantes.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener vacantes'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getVacanteById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await vacanteService.getById(id)
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener vacante'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getCandidatos = async (vacanteId, params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await vacanteService.getCandidatos(vacanteId, params)
      return { success: true, data: response.data }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al obtener candidatos'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const aplicar = async (vacanteId, data = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await aplicacionService.create({
        vacanteId,
        ...data,
      })
      aplicaciones.value.push(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al postularse'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchAplicaciones = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await aplicacionService.getAll(params)
      aplicaciones.value = response.data
      return { success: true }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al obtener aplicaciones'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getAplicacionById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await aplicacionService.getById(id)
      return { success: true, data: response.data }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al obtener aplicación'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateAplicacionStatus = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await aplicacionService.updateStatus(id, data)
      const index = aplicaciones.value.findIndex((a) => a.id === id)
      if (index > -1) {
        aplicaciones.value[index] = response.data
      }
      return { success: true, data: response.data }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al actualizar estado'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const setBusqueda = (query) => {
    busqueda.value = query
  }

  const setFiltroArea = (area) => {
    filtroArea.value = area
  }

  const setFiltroNivel = (nivel) => {
    filtroNivel.value = nivel
  }

  const clearError = () => {
    error.value = null
  }

  return {
    vacantes,
    aplicaciones,
    filtroArea,
    filtroNivel,
    busqueda,
    loading,
    error,
    vacantesFiltradas,
    areasDisponibles,
    nivelesDisponibles,
    fetchVacantes,
    getVacanteById,
    getCandidatos,
    aplicar,
    fetchAplicaciones,
    getAplicacionById,
    updateAplicacionStatus,
    setBusqueda,
    setFiltroArea,
    setFiltroNivel,
    clearError,
  }
})
