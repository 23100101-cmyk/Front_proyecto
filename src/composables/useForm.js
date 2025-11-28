// Composable para manejar formularios con validación
// Reutilizable en cualquier componente que necesite un formulario

import { ref, computed } from 'vue'

export const useForm = (initialValues = {}, onSubmit) => {
  const values = ref({ ...initialValues })
  const errors = ref({})
  const touched = ref({})
  const isSubmitting = ref(false)
  const submitStatus = ref(null) // 'success' o 'error'

  // Validadores comunes
  const validators = {
    required: (value, fieldName) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return `${fieldName} es requerido`
      }
      return null
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !emailRegex.test(value)) {
        return 'Email inválido'
      }
      return null
    },
    minLength: (min) => (value, fieldName) => {
      if (value && value.length < min) {
        return `${fieldName} debe tener al menos ${min} caracteres`
      }
      return null
    },
    maxLength: (max) => (value, fieldName) => {
      if (value && value.length > max) {
        return `${fieldName} no puede exceder ${max} caracteres`
      }
      return null
    },
  }

  // Validar un campo
  const validate = (fieldName, value, rules = []) => {
    const fieldErrors = []
    for (const rule of rules) {
      const error = rule(value, fieldName)
      if (error) fieldErrors.push(error)
    }
    errors.value[fieldName] = fieldErrors.length > 0 ? fieldErrors[0] : null
    return !fieldErrors.length
  }

  // Manejar cambio en input
  const handleChange = (fieldName, value) => {
    values.value[fieldName] = value
    if (touched.value[fieldName]) {
      validate(fieldName, value)
    }
  }

  // Manejar blur en input
  const handleBlur = (fieldName) => {
    touched.value[fieldName] = true
    validate(fieldName, values.value[fieldName])
  }

  // Validar todo el formulario
  const validateAll = (validationRules) => {
    const allErrors = {}
    for (const [fieldName, rules] of Object.entries(validationRules)) {
      validate(fieldName, values.value[fieldName], rules)
      if (errors.value[fieldName]) {
        allErrors[fieldName] = errors.value[fieldName]
      }
    }
    return Object.keys(allErrors).length === 0
  }

  // Enviar formulario
  const handleSubmit = async (validationRules = {}) => {
    return async (e) => {
      e?.preventDefault?.()

      // Marcar todos como touched
      Object.keys(values.value).forEach((key) => {
        touched.value[key] = true
      })

      // Validar
      if (!validateAll(validationRules)) {
        submitStatus.value = 'error'
        return { success: false }
      }

      isSubmitting.value = true
      submitStatus.value = null

      try {
        const result = await onSubmit(values.value)
        submitStatus.value = 'success'
        return { success: true, data: result }
      } catch (error) {
        submitStatus.value = 'error'
        errors.value._form = error.message || 'Error al enviar formulario'
        return { success: false, error: errors.value._form }
      } finally {
        isSubmitting.value = false
      }
    }
  }

  // Resetear formulario
  const resetForm = () => {
    values.value = { ...initialValues }
    errors.value = {}
    touched.value = {}
    submitStatus.value = null
    isSubmitting.value = false
  }

  // Getter para error de campo (solo si fue tocado)
  const getFieldError = (fieldName) => {
    return touched.value[fieldName] ? errors.value[fieldName] : null
  }

  // Computed para validar si el formulario es válido
  const isValid = computed(() => {
    return Object.values(errors.value).every((error) => !error)
  })

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    validators,
    validate,
    handleChange,
    handleBlur,
    validateAll,
    handleSubmit,
    resetForm,
    getFieldError,
    isValid,
  }
}
