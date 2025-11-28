// Store de notificaciones
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from 'src/services/api'

export const useNotificationsStore = defineStore('notifications', () => {
  // Estado
  const notifications = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

  const unreadNotifications = computed(() => notifications.value.filter((n) => !n.read))

  // Actions
  const fetchNotifications = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.get('/notifications')
      notifications.value = response.data
      loading.value = false
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar notificaciones'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const markAsRead = async (notificationId) => {
    loading.value = true
    error.value = null
    try {
      await apiService.put(`/notifications/${notificationId}`, { read: true })
      const notification = notifications.value.find((n) => n.id === notificationId)
      if (notification) {
        notification.read = true
      }
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al marcar notificación como leída'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const markAllAsRead = async () => {
    loading.value = true
    error.value = null
    try {
      await apiService.post('/notifications/mark-all-read')
      notifications.value.forEach((n) => {
        n.read = true
      })
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al marcar todas como leídas'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const deleteNotification = async (notificationId) => {
    loading.value = true
    error.value = null
    try {
      await apiService.delete(`/notifications/${notificationId}`)
      notifications.value = notifications.value.filter((n) => n.id !== notificationId)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar notificación'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const addNotification = (notification) => {
    notifications.value.unshift({
      id: Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
      ...notification,
    })
  }

  const clearError = () => {
    error.value = null
  }

  return {
    notifications,
    loading,
    error,
    unreadCount,
    unreadNotifications,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    clearError,
  }
})
