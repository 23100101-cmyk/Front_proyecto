const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

  {path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Añade esta línea para la página de perfil
      { path: 'perfil', component: () => import('pages/ProfilePage.vue') },
      { path: 'registro-vacante', component: () => import('pages/JobRegistrationPage.vue') },
      { path: 'dashboard-skills', component: () => import('pages/SkillsDashboard.vue') },
      { path: 'dashboard-critico', component: () => import('pages/CriticalSkillsDashboard.vue') },
      { path: 'encuesta-salida', component: () => import('pages/ExitInterviewForm.vue') },
      { path: 'catalogo-cursos', component: () => import('pages/CourseCatalog.vue') },
      { path: 'mi-perfil-dashboard', component: () => import('pages/UserProfileDashboard.vue') },
      { path: 'progreso-cursos', component: () => import('pages/MyCourseProgress.vue') },
      { path: 'skill-matcher', component: () => import('pages/SkillMatcherTool.vue') },
      { path: 'actualizar-perfil-skills', component: () => import('pages/SkillProfileUpdateForm.vue') },
      { path: 'gestionar-perfil-colaborador', component: () => import('pages/CollaboratorProfileManager.vue') },
      {path: '/login',component: () => import('pages/Login.vue')},
      {path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue')}

    ]
  }
]

export default routes
