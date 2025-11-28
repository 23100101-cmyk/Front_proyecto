// Store de Colaborador - Gestión del perfil, skills, puntos y beneficios
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { colaboradorService, skillService } from 'src/services/backend'

export const useColaboradorStore = defineStore('colaborador', () => {
  // Estado
  const colaborador = ref(null)
  const skills = ref([])
  const puntos = ref(0)
  const puntosHistorial = ref([])
  const beneficios = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const hasCompleteProfile = computed(() => {
    return (
      colaborador.value &&
      colaborador.value.nombre &&
      colaborador.value.email &&
      skills.value.length > 0
    )
  })

  const profileCompleteness = computed(() => {
    if (!colaborador.value) return 0
    let filled = 0
    let total = 0

    const fields = [
      'nombre',
      'email',
      'experiencia',
      'disponibilidad',
      'foto',
    ]
    fields.forEach((field) => {
      total++
      if (colaborador.value[field]) filled++
    })

    // Agregar skills
    total += 5 // Mínimo 5 skills recomendados
    filled += Math.min(skills.value.length, 5)

    return Math.round((filled / total) * 100)
  })

  // Actions
  const fetchColaborador = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await colaboradorService.getById(id)
      colaborador.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener colaborador'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateColaborador = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await colaboradorService.update(id, data)
      colaborador.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar perfil'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchSkills = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await skillService.getByColaborador(id)
      skills.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener skills'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateSkill = async (colaboradorId, skillId, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await skillService.updateColaboradorSkill(
        colaboradorId,
        skillId,
        data
      )
      // Actualizar el skill en la lista
      const index = skills.value.findIndex((s) => s.id === skillId)
      if (index > -1) {
        skills.value[index] = response.data
      }
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar skill'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchPuntos = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await colaboradorService.getPuntos(id)
      puntos.value = response.data.total || 0
      puntosHistorial.value = response.data.historial || []
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener puntos'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchBeneficios = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await colaboradorService.getBeneficios(id)
      beneficios.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener beneficios'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    colaborador,
    skills,
    puntos,
    puntosHistorial,
    beneficios,
    loading,
    error,
    hasCompleteProfile,
    profileCompleteness,
    fetchColaborador,
    updateColaborador,
    fetchSkills,
    updateSkill,
    fetchPuntos,
    fetchBeneficios,
    clearError,
  }
})
