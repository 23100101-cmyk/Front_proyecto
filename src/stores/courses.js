// Store de cursos con Pinia
// Manejo de lista de cursos, filtros, y acciones

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { courseService } from 'src/services/api'

export const useCourseStore = defineStore('courses', () => {
  // Estado
  const courses = ref([])
  const enrolledCourses = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const selectedType = ref(null)

  // Computed
  const filteredCourses = computed(() => {
    return courses.value.filter(course => {
      const matchesSearch = !searchQuery.value ||
        course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || course.category === selectedCategory.value
      const matchesType = !selectedType.value || course.type === selectedType.value
      return matchesSearch && matchesCategory && matchesType
    })
  })

  const categories = computed(() => {
    return [...new Set(courses.value.map(c => c.category))].filter(Boolean)
  })

  const types = computed(() => {
    return [...new Set(courses.value.map(c => c.type))].filter(Boolean)
  })

  // Actions
  const fetchCourses = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await courseService.getAll(params)
      courses.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.message || 'Error al cargar cursos'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchEnrolledCourses = async () => {
    loading.value = true
    error.value = null
    try {
      // const response = await courseService.getEnrolled()
      // enrolledCourses.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  const enrollCourse = async (courseId) => {
    loading.value = true
    error.value = null
    try {
      const response = await courseService.enroll(courseId)
      // Agregar a lista de inscritos
      if (!enrolledCourses.value.find(c => c.id === courseId)) {
        enrolledCourses.value.push(response.data)
      }
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al inscribirse'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const unenrollCourse = async (courseId) => {
    loading.value = true
    error.value = null
    try {
      await courseService.delete(`/courses/${courseId}/unenroll`)
      enrolledCourses.value = enrolledCourses.value.filter(c => c.id !== courseId)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  const setSearch = (query) => {
    searchQuery.value = query
  }

  const setCategory = (category) => {
    selectedCategory.value = category
  }

  const setType = (type) => {
    selectedType.value = type
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    selectedType.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    courses,
    enrolledCourses,
    loading,
    error,
    searchQuery,
    selectedCategory,
    selectedType,
    filteredCourses,
    categories,
    types,
    fetchCourses,
    fetchEnrolledCourses,
    enrollCourse,
    unenrollCourse,
    setSearch,
    setCategory,
    setType,
    clearFilters,
    clearError,
  }
})
