import { api } from 'boot/axios'

// small inline protected example component that uses the shared axios instance
const ProtectedProfileExample = {
  name: 'ProtectedProfileExample',
  data() {
    return { loading: true, error: null, profile: null }
  },
  async created() {
    try {
      const r = await api.get('/colaborador/me')
      this.profile = r.data
    } catch (err) {
      this.error = err.response?.data?.message || err.message || 'Error fetching profile'
    } finally {
      this.loading = false
    }
  },
  template: `
    <div class="q-pa-md">
      <h3>Perfil protegido</h3>
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error" class="text-negative">{{ error }}</div>
      <div v-else>
        <pre style="white-space:pre-wrap">{{ JSON.stringify(profile, null, 2) }}</pre>
      </div>
    </div>
  `,
}

const routes = [
  // Redirect root to login so the app always starts in /login
  { path: '/', redirect: '/login' },

  // Login route (public)
  { path: '/login', component: () => import('pages/LoginPage.vue') },

  // Main layout: protect its children with meta.requiresAuth = true
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      // also expose /home as a protected route that renders IndexPage
      { path: 'home', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'perfil', component: () => import('pages/ProfilePage.vue'), meta: { requiresAuth: true } },
      { path: 'registro-vacante', component: () => import('pages/JobRegistrationPage.vue'), meta: { requiresAuth: true } },
      { path: 'dashboard-skills', component: () => import('pages/SkillsDashboard.vue'), meta: { requiresAuth: true } },
      { path: 'dashboard-critico', component: () => import('pages/CriticalSkillsDashboard.vue'), meta: { requiresAuth: true } },
      { path: 'encuesta-salida', component: () => import('pages/ExitInterviewForm.vue'), meta: { requiresAuth: true } },
      { path: 'catalogo-cursos', component: () => import('pages/CourseCatalog.vue'), meta: { requiresAuth: true } },
      { path: 'mi-perfil-dashboard', component: () => import('pages/UserProfileDashboard.vue'), meta: { requiresAuth: true } },
      { path: 'progreso-cursos', component: () => import('pages/MyCourseProgress.vue'), meta: { requiresAuth: true } },
      { path: 'skill-matcher', component: () => import('pages/SkillMatcherTool.vue'), meta: { requiresAuth: true } },
      { path: 'actualizar-perfil-skills', component: () => import('pages/SkillProfileUpdateForm.vue'), meta: { requiresAuth: true } },
      { path: 'gestionar-perfil-colaborador', component: () => import('pages/CollaboratorProfileManager.vue'), meta: { requiresAuth: true } },

      // Protected example route that calls /colaborador/me using the shared api instance
      { path: 'protected-profile', component: ProtectedProfileExample, meta: { requiresAuth: true } },
    ],
  },

  // Always leave this as last one
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') },
]

export default routes
