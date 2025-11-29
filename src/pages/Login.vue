<template>
  <div class="login-container">
    <!-- Banner de bienvenida -->
    <div class="welcome-banner">
      <div class="banner-content">
        <div class="logo-section">
          <q-icon name="apartment" size="64px" color="white" />
          <h1 class="app-title">HUB de Capacitación ESAN</h1>
          <p class="app-subtitle">Plataforma de Desarrollo de Talento Corporativo</p>
        </div>
      </div>
    </div>

    <!-- Contenedor del formulario -->
    <q-page class="login-page">
      <div class="row justify-center items-center full-height">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5">
          <q-card class="login-card shadow-10">
            <!-- Encabezado -->
            <q-card-section class="bg-green-7 text-white text-center q-pa-lg">
              <h2 class="q-ma-none text-h5 text-weight-bold">Acceso al Sistema</h2>
              <p class="q-mt-sm q-mb-none text-caption">
                Inicia sesión con tus credenciales de colaborador
              </p>
            </q-card-section>

            <!-- Formulario -->
            <q-card-section class="q-pa-xl">
              <!-- Error global -->
              <q-banner
                v-if="auth.error"
                class="bg-negative text-white rounded-borders q-mb-lg"
                dense
              >
                <template v-slot:avatar>
                  <q-icon name="error" />
                </template>
                {{ auth.error }}
                <template v-slot:action>
                  <q-btn flat dense icon="close" size="sm" @click="auth.clearError()" />
                </template>
              </q-banner>

              <!-- Información de credenciales de prueba -->
              <q-banner class="bg-blue-1 text-blue-9 rounded-borders q-mb-lg" dense>
                <template v-slot:avatar>
                  <q-icon name="info" color="blue-9" />
                </template>
                <strong>Credenciales de prueba:</strong><br />
                Usuario: <code>marperez</code> | Contraseña: <code>123456</code>
              </q-banner>

              <!-- Campo de usuario -->
              <div class="q-mb-lg">
                <label class="text-weight-bold text-grey-8">Usuario o Email</label>
                <q-input
                  v-model="form.email"
                  outlined
                  dense
                  placeholder="marperez o correo@esan.edu.pe"
                  class="q-mt-md"
                  :disable="auth.loading"
                  @keyup.enter="onSubmit"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <!-- Campo de contraseña -->
              <div class="q-mb-md">
                <label class="text-weight-bold text-grey-8">Contraseña</label>
                <q-input
                  v-model="form.password"
                  outlined
                  dense
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Ingresa tu contraseña"
                  class="q-mt-md"
                  :disable="auth.loading"
                  @keyup.enter="onSubmit"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>

              <!-- Recordar contraseña -->
              <div class="text-right q-mb-lg">
                <q-btn
                  flat
                  dense
                  label="¿Olvidaste tu contraseña?"
                  class="text-primary text-caption"
                  to="/login"
                />
              </div>

              <!-- Botón de login -->
              <q-btn
                label="Iniciar Sesión"
                color="green-7"
                size="lg"
                class="full-width q-pa-md text-weight-bold"
                :loading="auth.loading"
                :disable="!form.email || !form.password || auth.loading"
                @click="onSubmit"
                icon-right="login"
              />
            </q-card-section>

            <!-- Información adicional -->
            <q-card-section class="bg-grey-1 text-center q-pa-lg">
              <p class="text-caption text-grey-6 q-ma-none">
                © {{ new Date().getFullYear() }} HUB de Capacitación ESAN
              </p>
              <p class="text-caption text-grey-5 q-mt-sm q-mb-none">
                Versión 1.0 | Soporte: support@esan.edu.pe
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

defineOptions({
  name: 'LoginPage',
})

const $q = useQuasar()
const router = useRouter()
const auth = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const showPassword = ref(false)

const onSubmit = async () => {
  if (!form.value.email || !form.value.password) {
    $q.notify({
      type: 'negative',
      message: 'Por favor completa todos los campos',
      position: 'top',
    })
    return
  }

  const result = await auth.login(form.value.email, form.value.password)

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: `¡Bienvenido ${auth.userDisplayName}!`,
      position: 'top',
      timeout: 1500,
    })

    setTimeout(() => {
      router.push('/mi-perfil-dashboard')
    }, 500)
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.welcome-banner {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  flex-shrink: 0;

  .banner-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .logo-section {
    animation: slideInDown 0.6s ease-out;
  }

  .app-title {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .app-subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    margin: 0;
  }
}

.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  border-radius: 12px;
  overflow: hidden;
  animation: slideUp 0.6s ease-out;

  code {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }
}

.full-height {
  min-height: 100%;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .welcome-banner {
    padding: 2rem 1rem;
  }

  .app-title {
    font-size: 1.5rem;
  }

  .login-card {
    margin: 1rem;
  }
}
</style>
