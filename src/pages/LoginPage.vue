<template>
  <div class="q-pa-md" style="max-width:420px;margin:40px auto">
    <q-card>
      <q-card-section>
        <div class="text-h6">Iniciar sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login">
          <q-input v-model="username" label="Usuario" outlined dense autofocus />
          <q-input v-model="password" label="Contraseña" type="password" outlined dense class="q-mt-sm" />

          <div class="q-mt-md row items-center">
            <q-btn :loading="loading" label="Iniciar sesión" color="primary" type="submit" />
            <q-btn flat label="Cancelar" class="q-ml-sm" @click="$router.push('/')" />
          </div>

          <div v-if="error" class="q-mt-md text-negative">{{ error }}</div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null
      this.loading = true
      try {
        const resp = await this.$api.post('/auth/login', {
          username: this.username,
          password: this.password,
        })

        const token = resp.data && resp.data.token
        if (token) {
          localStorage.setItem('token', token)
          // redirect to originally requested page if present
          const redirect = this.$route.query.redirect || '/'
          this.$router.push(redirect)
        } else {
          this.error = 'No se recibió token en la respuesta.'
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Error al iniciar sesión.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
/* small centering tweaks already inlined */
</style>
