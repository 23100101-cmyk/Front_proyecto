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

            <!-- Error general del formulario -->
            <q-banner v-if="auth.error" class="bg-negative text-white rounded-borders q-mb-md">
              <template v-slot:avatar>
                <q-icon name="error" />
              </template>
              {{ auth.error }}
              <template v-slot:action>
                <q-btn flat dense icon="close" @click="auth.clearError()" />
              </template>
            </q-banner>

            <!-- Email/DNI -->
            <q-input
              v-model="formData.email"
              outlined
              label="Correo de Colaborador o DNI"
              type="text"
              lazy-rules
              :error="!!form.getFieldError('email')"
              :error-message="form.getFieldError('email')"
              @blur="form.handleBlur('email')"
              @update:model-value="(val) => form.handleChange('email', val)"
              :disable="auth.loading"
              no-error-icon
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>

            <!-- Contraseña -->
            <q-input
              v-model="formData.password"
              outlined
              label="Contraseña"
              :type="isPwdVisible ? 'text' : 'password'"
              lazy-rules
              :error="!!form.getFieldError('password')"
              :error-message="form.getFieldError('password')"
              @blur="form.handleBlur('password')"
              @update:model-value="(val) => form.handleChange('password', val)"
              :disable="auth.loading"
              no-error-icon
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

            <!-- Recordar contraseña -->
            <div class="text-right">
                <a href="#" class="text-primary text-caption">¿Necesitas ayuda con tu acceso?</a>
            </div>

            <!-- Botón submit -->
            <q-btn
              label="Iniciar Sesión"
              type="submit"
              color="green-7"
              size="lg"
              class="full-width q-mt-md"
              :loading="auth.loading"
              :disable="auth.loading"
              icon-right="login"
            />
          </q-form>
        </q-card-section>

        <q-card-section class="text-center q-pt-none">
            <p class="text-caption text-grey-6">
                © {{ new Date().getFullYear() }} HUB de Capacitación.
            </p>
            <p class="text-caption text-grey-6">
                Versión 1.0 | Backend: {{ backendUrl }}
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
import { useAuthStore } from 'src/stores/auth'
import { useForm } from 'src/composables/useForm'

export default {
  name: 'LoginPage',
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const auth = useAuthStore()

    const isPwdVisible = ref(false)
    const backendUrl = ref(import.meta.env.VITE_API_URL || 'https://api.example.com')

    // Inicializar formulario con validación
    const formData = ref({
      email: '',
      password: ''
    })

    const form = useForm(
      { email: '', password: '' },
      async (values) => {
        const result = await auth.login(values.email, values.password)
        if (!result.success) {
          throw new Error(result.error)
        }
        return result
      }
    )

    const onSubmit = async () => {
      const validationRules = {
        email: [
          (val) => form.validators.required(val, 'Email/DNI'),
          (val) => !val || val.length >= 3 || 'Debe ser un email o DNI válido'
        ],
        password: [
          (val) => form.validators.required(val, 'Contraseña'),
          form.validators.minLength(3)
        ]
      }

      const submitHandler = form.handleSubmit(validationRules)
      const result = await submitHandler()

      if (result.success) {
        $q.notify({
          type: 'positive',
          message: `¡Bienvenido ${auth.userDisplayName}!`,
          position: 'top',
          timeout: 1500
        })

        // Redirigir al dashboard después de 1.5 segundos
        setTimeout(() => {
          router.push('/mi-perfil-dashboard')
        }, 500)
      }
    }

    return {
      formData,
      isPwdVisible,
      auth,
      form,
      onSubmit,
      backendUrl
    }
  }
}
</script>
