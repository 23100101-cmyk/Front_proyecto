/**
 * Composable para operaciones CRUD con manejo de errores y validaciones
 * Implementa arquitectura limpia con inyección de dependencias
 */

import { ref, computed } from 'vue'

export const useCRUD = (serviceName, service) => {
  // Estado
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  const success = ref(null)
  const selectedItem = ref(null)
  const isEditing = ref(false)

  // Validaciones
  const validations = {
    required: (value, fieldName = 'Campo') => {
      return value && value.toString().trim() !== '' ? null : `${fieldName} es requerido`
    },
    minLength: (value, length, fieldName = 'Campo') => {
      return !value || value.toString().length >= length ? null : `${fieldName} debe tener al menos ${length} caracteres`
    },
    maxLength: (value, length, fieldName = 'Campo') => {
      return !value || value.toString().length <= length ? null : `${fieldName} no puede exceder ${length} caracteres`
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !value || emailRegex.test(value) ? null : 'Email inválido'
    },
    number: (value, fieldName = 'Campo') => {
      return !value || !isNaN(value) ? null : `${fieldName} debe ser un número`
    },
  }

  // Computed
  const hasError = computed(() => error.value !== null)
  const hasSuccess = computed(() => success.value !== null)
  const itemCount = computed(() => items.value.length)

  /**
   * Limpiar mensajes de error y éxito
   */
  const clearMessages = () => {
    error.value = null
    success.value = null
  }

  /**
   * CREATE - Crear un nuevo item
   */
  const create = async (data, validationRules = {}) => {
    try {
      clearMessages()
      loading.value = true

      // Validar datos
      const validationErrors = validateData(data, validationRules)
      if (Object.keys(validationErrors).length > 0) {
        error.value = `Errores de validación: ${Object.values(validationErrors).join(', ')}`
        return { success: false, errors: validationErrors }
      }

      // Llamar al servicio
      if (!service.create) {
        throw new Error(`El servicio ${serviceName} no tiene método create`)
      }

      const response = await service.create(data)
      const newItem = response.data || response

      // Agregar a la lista
      items.value.push(newItem)
      success.value = `${serviceName} creado exitosamente`

      return { success: true, data: newItem }
    } catch (err) {
      error.value = err.message || `Error al crear ${serviceName}`
      console.error(`[${serviceName}] Error en CREATE:`, err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * READ - Obtener todos los items
   */
  const read = async (params = {}) => {
    try {
      clearMessages()
      loading.value = true

      if (!service.getAll && !service.read) {
        throw new Error(`El servicio ${serviceName} no tiene método getAll/read`)
      }

      const response = await (service.getAll ? service.getAll(params) : service.read(params))
      items.value = response.data || response || []
      success.value = `${serviceName} cargados exitosamente`

      return { success: true, data: items.value }
    } catch (err) {
      error.value = err.message || `Error al leer ${serviceName}`
      console.error(`[${serviceName}] Error en READ:`, err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * UPDATE - Actualizar un item
   */
  const update = async (id, data, validationRules = {}) => {
    try {
      clearMessages()
      loading.value = true

      // Validar datos
      const validationErrors = validateData(data, validationRules)
      if (Object.keys(validationErrors).length > 0) {
        error.value = `Errores de validación: ${Object.values(validationErrors).join(', ')}`
        return { success: false, errors: validationErrors }
      }

      // Llamar al servicio
      if (!service.update) {
        throw new Error(`El servicio ${serviceName} no tiene método update`)
      }

      const response = await service.update(id, data)
      const updatedItem = response.data || response

      // Actualizar en la lista
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...updatedItem }
      }

      success.value = `${serviceName} actualizado exitosamente`
      isEditing.value = false
      selectedItem.value = null

      return { success: true, data: updatedItem }
    } catch (err) {
      error.value = err.message || `Error al actualizar ${serviceName}`
      console.error(`[${serviceName}] Error en UPDATE:`, err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * DELETE - Eliminar un item
   */
  const delete_ = async (id) => {
    try {
      clearMessages()
      loading.value = true

      if (!service.delete) {
        throw new Error(`El servicio ${serviceName} no tiene método delete`)
      }

      await service.delete(id)

      // Remover de la lista
      items.value = items.value.filter((item) => item.id !== id)
      success.value = `${serviceName} eliminado exitosamente`
      selectedItem.value = null

      return { success: true }
    } catch (err) {
      error.value = err.message || `Error al eliminar ${serviceName}`
      console.error(`[${serviceName}] Error en DELETE:`, err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Validar datos contra reglas de validación
   */
  const validateData = (data, rules) => {
    const errors = {}

    Object.keys(rules).forEach((field) => {
      const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]]
      const value = data[field]

      for (const rule of fieldRules) {
        const error = rule(value)
        if (error) {
          errors[field] = error
          break
        }
      }
    })

    return errors
  }

  /**
   * Seleccionar item para edición
   */
  const selectForEdit = (item) => {
    selectedItem.value = { ...item }
    isEditing.value = true
  }

  /**
   * Cancelar edición
   */
  const cancelEdit = () => {
    selectedItem.value = null
    isEditing.value = false
    clearMessages()
  }

  return {
    // Estado
    items,
    loading,
    error,
    success,
    selectedItem,
    isEditing,

    // Computed
    hasError,
    hasSuccess,
    itemCount,

    // Métodos
    create,
    read,
    update,
    delete_,
    validateData,
    selectForEdit,
    cancelEdit,
    clearMessages,

    // Validaciones
    validations,
  }
}

export default useCRUD
