<template>
  <q-page class="row items-center justify-center bg-grey-1" style="min-height: 100vh;">

    <div class="col-xs-12 col-sm-8 col-md-5 col-lg-4">
      <q-card class="q-pa-lg shadow-2">

        <q-card-section class="text-center">
          <q-icon name="apartment" size="xl" color="green-7" />
          <div class="text-h5 text-weight-bold q-mt-sm">Acceso al HUB de Capacitación</div>
          <p class="text-caption text-grey-7">Inicia sesión con tus credenciales de colaborador.</p>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">

            <q-input
              v-model="formData.email"
              outlined
              label="Correo de Colaborador o DNI"
              type="text"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Por favor, ingresa tu usuario o DNI']"
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>

            <q-input
              v-model="formData.password"
              outlined
              label="Contraseña"
              :type="isPwdVisible ? 'text' : 'password'"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Por favor, ingresa tu contraseña']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwdVisible = !isPwdVisible"
                />
              </template>
            </q-input>

            <div class="text-right">
                <a href="#" class="text-primary text-caption">¿Necesitas ayuda con tu acceso?</a>
            </div>

            <q-btn
              label="Iniciar Sesión"
              type="submit"
              color="green-7"
              size="lg"
              class="full-width q-mt-md"
              :loading="loading"
            />
          </q-form>
        </q-card-section>

        <q-card-section class="text-center q-pt-none">
            <p class="text-caption text-grey-6">
                © {{ new Date().getFullYear() }} HUB de Capacitación.
            </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  name: 'LoginPage',
  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const formData = ref({
      email: '', // Usaremos este campo para el ID del colaborador (Correo o DNI)
      password: ''
    })
    const isPwdVisible = ref(false)
    const loading = ref(false)

    const onSubmit = async () => {
      // 1. Validar campos (Quasar ya lo hace por medio de :rules, pero esta es la lógica de negocio)
      if (!formData.value.email || !formData.value.password) {
        return;
      }

      loading.value = true

      // 2. Aquí es donde se conectará con tu Backend (usando Axios)
      // ESTE CÓDIGO DEBE SER REEMPLAZADO POR LA LLAMADA AXIOS REAL A TU API DE AUTENTICACIÓN
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (formData.value.email === 'colaborador@hub.com' && formData.value.password === '12345') {

        // Simulación: Guardar el token de sesión o el estado de autenticación
        sessionStorage.setItem('isAuthenticated', 'true')

        $q.notify({
          type: 'positive',
          message: '¡Acceso Correcto! Redirigiendo al Dashboard...',
        })

        // 3. Redirigir al dashboard principal del perfil
        router.push('/mi-perfil-dashboard')

      } else {
        $q.notify({
          type: 'negative',
          message: 'Credenciales inválidas. Verifica tu usuario y contraseña.',
        })
      }

      loading.value = false
    }

    return {
      formData,
      isPwdVisible,
      loading,
      onSubmit
    }
  }
}
</script>
