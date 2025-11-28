// Servicios completos para consumir todos los endpoints del backend en http://localhost:5112
// Mapeo de endpoints del ColaboradorController, VacanteController, AplicacionController, etc.

import { api } from 'src/boot/axios'

/**
 * COLABORADOR SERVICE - Gestión de perfil, skills, puntos y beneficios
 */
export const colaboradorService = {
  // GET /api/colaborador/{id} - Obtener datos del colaborador
  getById(id) {
    return api.get(`/api/colaborador/${id}`)
  },

  // PUT /api/colaborador/{id} - Actualizar perfil del colaborador
  update(id, data) {
    return api.put(`/api/colaborador/${id}`, data)
  },

  // GET /api/colaborador/{id}/puntos - Consultar puntos acumulados
  getPuntos(id) {
    return api.get(`/api/colaborador/${id}/puntos`)
  },

  // GET /api/colaborador/{id}/beneficios - Obtener beneficios del colaborador
  getBeneficios(id) {
    return api.get(`/api/colaborador/${id}/beneficios`)
  },
}

/**
 * VACANTE SERVICE - Gestión de vacantes internas
 */
export const vacanteService = {
  // GET /api/vacante - Listar todas las vacantes abiertas
  getAll(params = {}) {
    return api.get('/api/vacante', { params })
  },

  // GET /api/vacante/{id} - Obtener detalles de una vacante
  getById(id) {
    return api.get(`/api/vacante/${id}`)
  },

  // POST /api/vacante - Crear nueva vacante (Rol: Líder/RR.HH.)
  create(data) {
    return api.post('/api/vacante', data)
  },

  // PUT /api/vacante/{id} - Editar vacante existente
  update(id, data) {
    return api.put(`/api/vacante/${id}`, data)
  },

  // GET /api/vacante/{id}/candidatos - Obtener candidatos de una vacante
  getCandidatos(id, params = {}) {
    return api.get(`/api/vacante/${id}/candidatos`, { params })
  },
}

/**
 * APLICACION SERVICE - Postulaciones a vacantes
 */
export const aplicacionService = {
  // POST /api/aplicacion - Registrar postulación
  create(data) {
    return api.post('/api/aplicacion', data)
  },

  // GET /api/aplicacion - Listar aplicaciones del usuario
  getAll(params = {}) {
    return api.get('/api/aplicacion', { params })
  },

  // GET /api/aplicacion/{id} - Obtener detalles de una aplicación
  getById(id) {
    return api.get(`/api/aplicacion/${id}`)
  },

  // PUT /api/aplicacion/{id} - Cambiar estado de la aplicación (Rol: Líder/RR.HH.)
  updateStatus(id, data) {
    return api.put(`/api/aplicacion/${id}`, data)
  },
}

/**
 * CERTIFICACION SERVICE - Gestión de certificaciones
 */
export const certificacionService = {
  // POST /api/certificacion - Registrar nueva certificación
  create(data) {
    return api.post('/api/certificacion', data)
  },

  // GET /api/certificacion/{id} - Obtener detalles de certificación
  getById(id) {
    return api.get(`/api/certificacion/${id}`)
  },

  // PUT /api/certificacion/{id}/validar - Validar certificación y asignar puntos
  validate(id, data = {}) {
    return api.put(`/api/certificacion/${id}/validar`, data)
  },

  // GET /api/colaborador/{id}/certificaciones - Obtener certificaciones de un colaborador
  getByColaborador(colaboradorId) {
    return api.get(`/api/colaborador/${colaboradorId}/certificaciones`)
  },
}

/**
 * CURSO SERVICE - Gestión del catálogo y progreso de cursos
 */
export const cursoService = {
  // GET /api/curso - Listar todos los cursos disponibles
  getAll(params = {}) {
    return api.get('/api/curso', { params })
  },

  // GET /api/curso/{id} - Obtener detalles de un curso
  getById(id) {
    return api.get(`/api/curso/${id}`)
  },

  // POST /api/curso - Crear nuevo curso (Administrativo)
  create(data) {
    return api.post('/api/curso', data)
  },

  // PUT /api/curso/{id} - Actualizar curso
  update(id, data) {
    return api.put(`/api/curso/${id}`, data)
  },

  // PUT /api/curso/{id}/completar - Registrar finalización de curso
  complete(id, data = {}) {
    return api.put(`/api/curso/${id}/completar`, data)
  },

  // GET /api/colaborador/{id}/cursos - Obtener cursos inscritos del colaborador
  getByColaborador(colaboradorId) {
    return api.get(`/api/colaborador/${colaboradorId}/cursos`)
  },

  // GET /api/colaborador/{id}/cursos/{cursoId}/progreso - Obtener progreso en un curso
  getProgreso(colaboradorId, cursoId) {
    return api.get(
      `/api/colaborador/${colaboradorId}/cursos/${cursoId}/progreso`
    )
  },
}

/**
 * SKILL SERVICE - Evaluación y gestión de skills
 */
export const skillService = {
  // GET /api/skill - Listar todos los skills
  getAll(params = {}) {
    return api.get('/api/skill', { params })
  },

  // GET /api/skill/{id} - Obtener detalles de un skill
  getById(id) {
    return api.get(`/api/skill/${id}`)
  },

  // GET /api/colaborador/{id}/skills - Obtener skills de un colaborador
  getByColaborador(colaboradorId) {
    return api.get(`/api/colaborador/${colaboradorId}/skills`)
  },

  // PUT /api/admin/colaborador/{id}/skill - Actualizar skill de un colaborador (Rol: Líder/RR.HH./Admin)
  updateColaboradorSkill(colaboradorId, skillId, data) {
    return api.put(
      `/api/admin/colaborador/${colaboradorId}/skill/${skillId}`,
      data
    )
  },

  // POST /api/skill/match - Matchear skills para identificar candidatos
  matchSkills(data) {
    return api.post('/api/skill/match', data)
  },
}

/**
 * ADMIN SERVICE - Operaciones administrativas
 */
export const adminService = {
  // PUT /api/admin/colaborador/{id}/skill - Actualizar skills de un colaborador
  updateColaboradorSkill(colaboradorId, data) {
    return api.put(`/api/admin/colaborador/${colaboradorId}/skill`, data)
  },

  // PUT /api/admin/colaborador/{id}/suspender - Suspender o banear cuenta
  suspendAccount(colaboradorId, data = {}) {
    return api.put(`/api/admin/colaborador/${colaboradorId}/suspender`, data)
  },
}

/**
 * REPORTE SERVICE - Consultas y reportes
 */
export const reporteService = {
  // GET /api/reporte/inventario/skills - Obtener inventario de skills
  getSkillInventory(params = {}) {
    return api.get('/api/reporte/inventario/skills', { params })
  },

  // GET /api/reporte/brechas - Obtener análisis de brechas de skills
  getGapAnalysis(params = {}) {
    return api.get('/api/reporte/brechas', { params })
  },

  // GET /api/reporte/aplicaciones - Obtener reportes de aplicaciones
  getApplicationsReport(params = {}) {
    return api.get('/api/reporte/aplicaciones', { params })
  },

  // GET /api/reporte/puntos - Obtener reportes de gamificación
  getPointsReport(params = {}) {
    return api.get('/api/reporte/puntos', { params })
  },
}

/**
 * NOTIFICACION SERVICE - Gestión de notificaciones
 */
export const notificacionService = {
  // GET /api/notificacion - Obtener notificaciones del usuario
  getAll(params = {}) {
    return api.get('/api/notificacion', { params })
  },

  // GET /api/notificacion/{id} - Obtener detalles de una notificación
  getById(id) {
    return api.get(`/api/notificacion/${id}`)
  },

  // PUT /api/notificacion/{id}/leer - Marcar notificación como leída
  markAsRead(id) {
    return api.put(`/api/notificacion/${id}/leer`)
  },

  // DELETE /api/notificacion/{id} - Eliminar notificación
  delete(id) {
    return api.delete(`/api/notificacion/${id}`)
  },
}

/**
 * ENCUESTA SERVICE - Encuestas de salida y feedback
 */
export const encuestaService = {
  // POST /api/encuesta/salida - Registrar encuesta de salida
  submitExitSurvey(data) {
    return api.post('/api/encuesta/salida', data)
  },

  // GET /api/encuesta/{id} - Obtener detalles de una encuesta
  getById(id) {
    return api.get(`/api/encuesta/${id}`)
  },
}

export default {
  colaboradorService,
  vacanteService,
  aplicacionService,
  certificacionService,
  cursoService,
  skillService,
  adminService,
  reporteService,
  notificacionService,
  encuestaService,
}
