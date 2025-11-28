// Ejemplos de uso de servicios - ver BACKEND_INTEGRATION.md para documentación completa
// Estos ejemplos muestran cómo integrar los servicios en tus componentes Vue

/**
 * OPCIÓN 1: Composition API (Recomendado)
 * Usar en componentes con <script setup>
 *
 * import { ref } from 'vue'
 * import { userService } from 'src/services/api'
 *
 * const users = ref([])
 * const loading = ref(false)
 *
 * const fetchUsers = async () => {
 *   loading.value = true
 *   try {
 *     const response = await userService.getAll()
 *     users.value = response.data
 *   } catch (err) {
 *     console.error(err)
 *   } finally {
 *     loading.value = false
 *   }
 * }
 */

/**
 * OPCIÓN 2: Options API
 * Usar en componentes con <script> tradicional
 *
 * methods: {
 *   fetchUsers() {
 *     this.$api.get('/users')
 *       .then(res => this.users = res.data)
 *       .catch(err => console.error(err))
 *   }
 * }
 */

/**
 * OPCIÓN 3: Servicio genérico
 * import { apiService } from 'src/services/api'
 *
 * const response = await apiService.get('/users')
 * const newUser = await apiService.post('/users', { name: 'Juan' })
 * await apiService.put('/users/1', { name: 'Juan Actualizado' })
 * await apiService.delete('/users/1')
 */

/**
 * OPCIÓN 4: Autenticación
 * import { authService } from 'src/services/api'
 *
 * await authService.login('usuario@ejemplo.com', 'password')
 * await authService.logout()
 * const user = await authService.getCurrentUser()
 */

/**
 * OPCIÓN 5: Verificar backend en línea
 * import { healthService } from 'src/services/api'
 *
 * const health = await healthService.check()
 */

// Para más detalles, ver: BACKEND_INTEGRATION.md
