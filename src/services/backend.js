// Servicios completos para consumir todos los endpoints del backend en http://localhost:5112
// Mapeo de endpoints del ColaboradorController, VacanteController, AplicacionController, etc.

import { api } from 'src/boot/axios'
import { mockData } from './mockData'

// Variable para usar mock data o API real
const USE_MOCK_DATA = true

/**
 * COLABORADOR SERVICE - Gestión de perfil, skills, puntos y beneficios
 */
export const colaboradorService = {
  // GET /api/colaborador/{id} - Obtener datos del colaborador
  getById(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const colab = mockData.colaboradores.find((c) => c.id === id)
          resolve({ data: colab || mockData.colaboradores[0] })
        }, 300)
      })
    }
    return api.get(`/api/colaborador/${id}`)
  },

  // PUT /api/colaborador/{id} - Actualizar perfil del colaborador
  update(id, data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockData.colaboradores.findIndex((c) => c.id === id)
          if (index >= 0) {
            mockData.colaboradores[index] = {
              ...mockData.colaboradores[index],
              ...data,
            }
            resolve({ data: mockData.colaboradores[index] })
          }
        }, 300)
      })
    }
    return api.put(`/api/colaborador/${id}`, data)
  },

  // GET /api/colaborador/{id}/puntos - Consultar puntos acumulados
  getPuntos(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const colab = mockData.colaboradores.find((c) => c.id === id)
          resolve({ data: { puntos: colab?.puntos || 0, nivel: colab?.nivel || 1 } })
        }, 300)
      })
    }
    return api.get(`/api/colaborador/${id}/puntos`)
  },

  // GET /api/colaborador/{id}/beneficios - Obtener beneficios del colaborador
  getBeneficios(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockData.beneficios })
        }, 300)
      })
    }
    return api.get(`/api/colaborador/${id}/beneficios`)
  },
}

/**
 * VACANTE SERVICE - Gestión de vacantes internas
 */
export const vacanteService = {
  // GET /api/vacante - Listar todas las vacantes abiertas
  getAll(params = {}) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockData.vacantes })
        }, 300)
      })
    }
    return api.get('/api/vacante', { params })
  },

  // GET /api/vacante/{id} - Obtener detalles de una vacante
  getById(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const vacante = mockData.vacantes.find((v) => v.id === id)
          resolve({ data: vacante })
        }, 300)
      })
    }
    return api.get(`/api/vacante/${id}`)
  },

  // POST /api/vacante - Crear nueva vacante (Rol: Líder/RR.HH.)
  create(data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newVacante = {
            id: Math.max(...mockData.vacantes.map((v) => v.id)) + 1,
            ...data,
            fechaPublicacion: new Date().toISOString().split('T')[0],
            candidatos: 0,
          }
          mockData.vacantes.push(newVacante)
          resolve({ data: newVacante })
        }, 300)
      })
    }
    return api.post('/api/vacante', data)
  },

  // PUT /api/vacante/{id} - Editar vacante existente
  update(id, data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockData.vacantes.findIndex((v) => v.id === id)
          if (index >= 0) {
            mockData.vacantes[index] = { ...mockData.vacantes[index], ...data }
            resolve({ data: mockData.vacantes[index] })
          }
        }, 300)
      })
    }
    return api.put(`/api/vacante/${id}`, data)
  },

  // GET /api/vacante/{id}/candidatos - Obtener candidatos de una vacante
  getCandidatos(id, params = {}) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const candidatos = mockData.aplicaciones
            .filter((a) => a.vacanteId === id)
            .map((a) => {
              const colab = mockData.colaboradores.find((c) => c.id === a.colaboradorId)
              return {
                ...a,
                colaborador: colab,
              }
            })
          resolve({ data: candidatos })
        }, 300)
      })
    }
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
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockData.cursos })
        }, 300)
      })
    }
    return api.get('/api/curso', { params })
  },

  // GET /api/curso/{id} - Obtener detalles de un curso
  getById(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const curso = mockData.cursos.find((c) => c.id === id)
          resolve({ data: curso })
        }, 300)
      })
    }
    return api.get(`/api/curso/${id}`)
  },

  // POST /api/curso - Crear nuevo curso (Administrativo)
  create(data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newCurso = {
            id: Math.max(...mockData.cursos.map((c) => c.id)) + 1,
            ...data,
            inscritos: 0,
          }
          mockData.cursos.push(newCurso)
          resolve({ data: newCurso })
        }, 300)
      })
    }
    return api.post('/api/curso', data)
  },

  // PUT /api/curso/{id} - Actualizar curso
  update(id, data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockData.cursos.findIndex((c) => c.id === id)
          if (index >= 0) {
            mockData.cursos[index] = { ...mockData.cursos[index], ...data }
            resolve({ data: mockData.cursos[index] })
          }
        }, 300)
      })
    }
    return api.put(`/api/curso/${id}`, data)
  },

  // PUT /api/curso/{id}/completar - Registrar finalización de curso
  completar(colaboradorId, cursoId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const progress = mockData.cursoProgress.find(
            (p) => p.colaboradorId === colaboradorId && p.cursoId === cursoId,
          )
          if (progress) {
            progress.estado = 'Completado'
            progress.porcentaje = 100
            progress.fechaCompletacion = new Date().toISOString().split('T')[0]
            progress.calificacion = 90
            progress.certificado = true
          }
          resolve({ data: progress })
        }, 300)
      })
    }
    return api.put(`/api/curso/${cursoId}/completar`, {
      colaboradorId,
    })
  },

  // GET /api/colaborador/{id}/cursos - Obtener cursos inscritos del colaborador
  getByColaborador(colaboradorId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const cursosUsuario = mockData.cursoProgress
            .filter((p) => p.colaboradorId === colaboradorId)
            .map((p) => {
              const curso = mockData.cursos.find((c) => c.id === p.cursoId)
              return { ...curso, ...p }
            })
          resolve({ data: cursosUsuario })
        }, 300)
      })
    }
    return api.get(`/api/colaborador/${colaboradorId}/cursos`)
  },

  // GET /api/colaborador/{id}/cursos/{cursoId}/progreso - Obtener progreso en un curso
  getProgreso(colaboradorId, cursoId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const progress = mockData.cursoProgress.find(
            (p) => p.colaboradorId === colaboradorId && p.cursoId === cursoId,
          )
          resolve({ data: progress || {} })
        }, 300)
      })
    }
    return api.get(`/api/colaborador/${colaboradorId}/cursos/${cursoId}/progreso`)
  },
}

/**
 * SKILL SERVICE - Evaluación y gestión de skills
 */
export const skillService = {
  // GET /api/skill - Listar todos los skills
  getAll(params = {}) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockData.skills })
        }, 300)
      })
    }
    return api.get('/api/skill', { params })
  },

  // GET /api/skill/{id} - Obtener detalles de un skill
  getById(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const skill = mockData.skills.find((s) => s.id === id)
          resolve({ data: skill })
        }, 300)
      })
    }
    return api.get(`/api/skill/${id}`)
  },

  // GET /api/colaborador/{id}/skills - Obtener skills de un colaborador
  getByColaborador(colaboradorId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const skillsColab = mockData.colaboradorSkills
            .filter((cs) => cs.colaboradorId === colaboradorId)
            .map((cs) => {
              const skill = mockData.skills.find((s) => s.id === cs.skillId)
              return { ...skill, ...cs }
            })
          resolve({ data: skillsColab })
        }, 300)
      })
    }
    return api.get(`/api/colaborador/${colaboradorId}/skills`)
  },

  // PUT /api/admin/colaborador/{id}/skill - Actualizar skill de un colaborador (Rol: Líder/RR.HH./Admin)
  updateColaboradorSkill(colaboradorId, skillId, data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockData.colaboradorSkills.findIndex(
            (cs) => cs.colaboradorId === colaboradorId && cs.skillId === skillId,
          )
          if (index >= 0) {
            mockData.colaboradorSkills[index] = {
              ...mockData.colaboradorSkills[index],
              ...data,
            }
            resolve({ data: mockData.colaboradorSkills[index] })
          } else {
            const newSkillColab = {
              colaboradorId,
              skillId,
              ...data,
            }
            mockData.colaboradorSkills.push(newSkillColab)
            resolve({ data: newSkillColab })
          }
        }, 300)
      })
    }
    return api.put(`/api/admin/colaborador/${colaboradorId}/skill/${skillId}`, data)
  },

  // POST /api/skill/match - Matchear skills para identificar candidatos
  matchSkills(data) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Lógica simple de matching
          const candidates = mockData.colaboradores.map((colab) => {
            const skillsColab = mockData.colaboradorSkills
              .filter((cs) => cs.colaboradorId === colab.id)
              .map((cs) => cs.skillId)
            const skillsRequeridos = data.skillIds || []
            const matches = skillsRequeridos.filter((s) => skillsColab.includes(s))
            return {
              ...colab,
              matchScore: (matches.length / Math.max(skillsRequeridos.length, 1)) * 100,
              skillsMatched: matches.length,
            }
          })
          resolve({
            data: candidates.filter((c) => c.matchScore >= 50),
          })
        }, 300)
      })
    }
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
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const colaboradorId = params.colaboradorId || 1
          const notificaciones = mockData.notificaciones.filter(
            (n) => n.colaboradorId === colaboradorId,
          )
          resolve({ data: notificaciones })
        }, 300)
      })
    }
    return api.get('/api/notificacion', { params })
  },

  // GET /api/notificacion/{id} - Obtener detalles de una notificación
  getById(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const notificacion = mockData.notificaciones.find((n) => n.id === id)
          resolve({ data: notificacion })
        }, 300)
      })
    }
    return api.get(`/api/notificacion/${id}`)
  },

  // PUT /api/notificacion/{id}/leer - Marcar notificación como leída
  markAsRead(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const notif = mockData.notificaciones.find((n) => n.id === id)
          if (notif) {
            notif.leida = true
          }
          resolve({ data: notif })
        }, 300)
      })
    }
    return api.put(`/api/notificacion/${id}/leer`)
  },

  // DELETE /api/notificacion/{id} - Eliminar notificación
  delete(id) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockData.notificaciones.findIndex((n) => n.id === id)
          if (index >= 0) {
            mockData.notificaciones.splice(index, 1)
          }
          resolve({ data: { success: true } })
        }, 300)
      })
    }
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
