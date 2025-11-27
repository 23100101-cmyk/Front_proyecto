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
      { path: 'encuesta-salida', component: () => import('pages/ExitInterviewForm.vue') }


    ]
  }
]

export default routes
