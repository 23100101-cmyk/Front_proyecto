// Store de Notificaciones - Gestión de alertas y notificaciones
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notificacionService } from 'src/services/backend'

export const useNotificacionStore = defineStore('notificacion', () => {
  // Estado
  const notificaciones = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const noLeidas = computed(() => {
    return notificaciones.value.filter((n) => !n.leida)
  })

  const cantidadNoLeidas = computed(() => {
    return noLeidas.value.length
  })

  const notificacionesPorTipo = computed(() => {
    const grouped = {}
    notificaciones.value.forEach((n) => {
      if (!grouped[n.tipo]) {
        grouped[n.tipo] = []
      }
      grouped[n.tipo].push(n)
    })
    return grouped
  })

  // Actions
  const fetchNotificaciones = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await notificacionService.getAll(params)
      notificaciones.value = response.data
      return { success: true }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al obtener notificaciones'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const markAsRead = async (id) => {
    loading.value = true
    error.value = null
    try {
      await notificacionService.markAsRead(id)
      const index = notificaciones.value.findIndex((n) => n.id === id)
      if (index > -1) {
        notificaciones.value[index].leida = true
      }
      return { success: true }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al marcar como leída'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteNotificacion = async (id) => {
    loading.value = true
    error.value = null
    try {
      await notificacionService.delete(id)
      notificaciones.value = notificaciones.value.filter((n) => n.id !== id)
      return { success: true }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al eliminar notificación'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const markAllAsRead = async () => {
    loading.value = true
    error.value = null
    try {
      for (const notif of noLeidas.value) {
        await notificacionService.markAsRead(notif.id)
      }
      notificaciones.value = notificaciones.value.map((n) => ({
        ...n,
        leida: true,
      }))
      return { success: true }
    } catch (err) {
      error.value =
        err.response?.data?.message || 'Error al marcar notificaciones'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    notificaciones,
    loading,
    error,
    noLeidas,
    cantidadNoLeidas,
    notificacionesPorTipo,
    fetchNotificaciones,
    markAsRead,
    deleteNotificacion,
    markAllAsRead,
    clearError,
  }
})
