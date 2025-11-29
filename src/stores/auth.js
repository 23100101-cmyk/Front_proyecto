import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Datos de ejemplo - en producción vendrían del backend
const MOCK_COLABORADORES = {
  marperez: {
    password: '123456',
    data: {
      colaboradorID: 1,
      nombreCompleto: 'María Pérez',
      correo: 'marperez@esan.edu.pe',
      rolActual: 'Desarrolladora Backend',
      cuentaProyecto: 'marperez',
      disponibilidadMovilidad: true,
      departamento: 'Tecnología',
      nivelSenioridad: 'Senior',
      habilidades: [
        {
          colaboradorID: 1,
          skillID: 1,
          nivelDominio: 'Avanzado',
          fechaUltimaEvaluacion: null,
          skill: {
            skillID: 1,
            nombreSkill: 'C#',
            tipoSkill: 'Técnico',
          },
        },
        {
          colaboradorID: 1,
          skillID: 2,
          nivelDominio: 'Intermedio',
          fechaUltimaEvaluacion: null,
          skill: {
            skillID: 2,
            nombreSkill: 'SQL Server',
            tipoSkill: 'Técnico',
          },
        },
        {
          colaboradorID: 1,
          skillID: 3,
          nivelDominio: 'Avanzado',
          fechaUltimaEvaluacion: null,
          skill: {
            skillID: 3,
            nombreSkill: 'Azure',
            tipoSkill: 'Técnico',
          },
        },
      ],
      certificaciones: [
        {
          certificacionID: 1,
          colaboradorID: 1,
          nombreCertificacion: 'Azure Developer Associate',
          fechaObtencion: '2024-11-14T14:11:51.2969554',
          institucion: 'Microsoft',
        },
        {
          certificacionID: 2,
          colaboradorID: 1,
          nombreCertificacion: 'Scrum Master',
          fechaObtencion: '2023-05-20T10:00:00',
          institucion: 'Scrum Alliance',
        },
      ],
      cursosEnProgreso: [
        {
          cursoID: 1,
          nombreCurso: 'Advanced C# Patterns',
          estado: 'En Progreso',
          progresoActual: 75,
          fechaInicio: '2024-11-01',
          fechaEstimadaFinalizacion: '2024-12-15',
        },
        {
          cursoID: 2,
          nombreCurso: 'Azure Infrastructure Fundamentals',
          estado: 'En Progreso',
          progresoActual: 45,
          fechaInicio: '2024-11-10',
          fechaEstimadaFinalizacion: '2024-12-20',
        },
      ],
      vacantesInteresadas: [
        {
          vacanteID: 1,
          titulo: 'Senior Backend Developer',
          empresa: 'Tech Solutions',
          salarioMin: 5000,
          salarioMax: 7000,
          ubicacion: 'Lima',
          requisitosSkills: ['C#', 'SQL Server', 'Azure'],
          estado: 'Interesado',
        },
      ],
    },
  },
  'jgarcia@esan.edu.pe': {
    password: '123456',
    data: {
      colaboradorID: 2,
      nombreCompleto: 'Juan García',
      correo: 'jgarcia@esan.edu.pe',
      rolActual: 'Frontend Developer',
      cuentaProyecto: 'jgarcia',
      disponibilidadMovilidad: false,
      departamento: 'Tecnología',
      nivelSenioridad: 'Mid',
      habilidades: [
        {
          colaboradorID: 2,
          skillID: 4,
          nivelDominio: 'Avanzado',
          skill: {
            skillID: 4,
            nombreSkill: 'Vue.js',
            tipoSkill: 'Técnico',
          },
        },
        {
          colaboradorID: 2,
          skillID: 5,
          nivelDominio: 'Avanzado',
          skill: {
            skillID: 5,
            nombreSkill: 'JavaScript',
            tipoSkill: 'Técnico',
          },
        },
      ],
      certificaciones: [
        {
          certificacionID: 3,
          colaboradorID: 2,
          nombreCertificacion: 'Vue.js Advanced',
          fechaObtencion: '2024-08-15',
          institucion: 'Vue Mastery',
        },
      ],
      cursosEnProgreso: [],
      vacantesInteresadas: [],
    },
  },
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isLoggedIn = computed(() => isAuthenticated.value)
  const userDisplayName = computed(() => user.value?.nombreCompleto || 'Usuario')
  const userEmail = computed(() => user.value?.correo || '')
  const userRole = computed(() => user.value?.rolActual || '')
  const userInitials = computed(() => {
    if (!user.value?.nombreCompleto) return 'U'
    return user.value.nombreCompleto
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  const login = async (emailOrUsername, password) => {
    loading.value = true
    error.value = null

    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Buscar usuario en mock data
      const colaborador = MOCK_COLABORADORES[emailOrUsername]

      if (!colaborador) {
        error.value = 'Usuario o contraseña incorrectos'
        return { success: false, error: error.value }
      }

      if (colaborador.password !== password) {
        error.value = 'Usuario o contraseña incorrectos'
        return { success: false, error: error.value }
      }

      // Simulación de token JWT
      token.value = `token_${colaborador.data.colaboradorID}_${Date.now()}`
      user.value = colaborador.data

      // Guardar en localStorage
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(user.value))

      return { success: true, user: user.value }
    } catch (err) {
      error.value = err.message || 'Error al iniciar sesión'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const checkAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')

    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
        return true
      } catch {
        logout()
        return false
      }
    }
    return false
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isLoggedIn,
    userDisplayName,
    userEmail,
    userRole,
    userInitials,
    login,
    logout,
    checkAuth,
    clearError,
  }
})
