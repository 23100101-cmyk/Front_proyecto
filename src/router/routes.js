const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'analytics', component: () => import('pages/AnalyticsPage.vue') },
      { path: 'vacantes-management', component: () => import('pages/VacantesManagementPage.vue') },
      { path: 'skills-management', component: () => import('pages/SkillsManagementPage.vue') },
      { path: 'reportes', component: () => import('pages/ReportsPage.vue') },
      { path: 'perfil', component: () => import('pages/ProfilePage.vue') },
      { path: 'mi-perfil', component: () => import('pages/MyProfilePage.vue') },
      { path: 'oportunidades', component: () => import('pages/OpportunitiesPage.vue') },
      { path: 'gamificacion', component: () => import('pages/GamificationPage.vue') },
      { path: 'beneficios', component: () => import('pages/BenefitsPage.vue') },
      { path: 'notificaciones', component: () => import('pages/NotificationsPage.vue') },
      { path: 'registro-vacante', component: () => import('pages/JobRegistrationPage.vue') },
      { path: 'dashboard-skills', component: () => import('pages/SkillsDashboard.vue') },
      { path: 'dashboard-critico', component: () => import('pages/CriticalSkillsDashboard.vue') },
      { path: 'encuesta-salida', component: () => import('pages/ExitInterviewForm.vue') },
      { path: 'catalogo-cursos', component: () => import('pages/CourseCatalog.vue') },
      { path: 'mi-perfil-dashboard', component: () => import('pages/UserProfileDashboard.vue') },
      { path: 'progreso-cursos', component: () => import('pages/MyCourseProgress.vue') },
      { path: 'skill-matcher', component: () => import('pages/SkillMatcherTool.vue') },
      {
        path: 'actualizar-perfil-skills',
        component: () => import('pages/SkillProfileUpdateForm.vue'),
      },
      {
        path: 'gestionar-perfil-colaborador',
        component: () => import('pages/CollaboratorProfileManager.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
