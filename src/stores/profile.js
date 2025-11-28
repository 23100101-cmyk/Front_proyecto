// Store de perfil de usuario con skills y certificaciones
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userService, apiService } from 'src/services/api'

export const useProfileStore = defineStore('profile', () => {
  // Estado
  const profile = ref({
    id: null,
    name: '',
    email: '',
    avatar: '',
    personalData: {
      phone: '',
      location: '',
      birthDate: '',
      department: '',
      position: '',
    },
    skills: [],
    certifications: [],
    experience: '',
  })
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const skillsCount = computed(() => profile.value.skills?.length || 0)
  const certificationsCount = computed(() => profile.value.certifications?.length || 0)
  const profileComplete = computed(() => {
    return (
      profile.value.name &&
      profile.value.email &&
      profile.value.personalData?.phone &&
      profile.value.skills?.length > 0
    )
  })

  // Actions
  const fetchProfile = async (userId) => {
    loading.value = true
    error.value = null
    try {
      const response = await userService.getProfile(userId)
      profile.value = response.data
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar perfil'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const updateProfile = async (profileData) => {
    loading.value = true
    error.value = null
    try {
      const response = await userService.updateProfile(profile.value.id, profileData)
      profile.value = { ...profile.value, ...profileData }
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar perfil'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const addSkill = async (skill, level) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.post('/skills', { skillName: skill, level })
      profile.value.skills.push(response.data)
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al agregar skill'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const removeSkill = async (skillId) => {
    loading.value = true
    error.value = null
    try {
      await apiService.delete(`/skills/${skillId}`)
      profile.value.skills = profile.value.skills.filter((s) => s.id !== skillId)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar skill'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const updateSkillLevel = async (skillId, level) => {
    loading.value = true
    error.value = null
    try {
      await apiService.put(`/skills/${skillId}`, { level })
      const skillIndex = profile.value.skills.findIndex((s) => s.id === skillId)
      if (skillIndex !== -1) {
        profile.value.skills[skillIndex].level = level
      }
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar skill'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const addCertification = async (certificationData) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.post('/certifications', certificationData)
      profile.value.certifications.push(response.data)
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al agregar certificación'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const removeCertification = async (certId) => {
    loading.value = true
    error.value = null
    try {
      await apiService.delete(`/certifications/${certId}`)
      profile.value.certifications = profile.value.certifications.filter((c) => c.id !== certId)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar certificación'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    profile,
    loading,
    error,
    skillsCount,
    certificationsCount,
    profileComplete,
    fetchProfile,
    updateProfile,
    addSkill,
    removeSkill,
    updateSkillLevel,
    addCertification,
    removeCertification,
    clearError,
  }
})
