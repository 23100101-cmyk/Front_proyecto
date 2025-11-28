<template>
  <q-page class="q-pa-lg">
    <!-- Header con Progreso -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold q-mb-xs">Mi Perfil</h1>
        <p class="text-caption text-grey-7">Completa tu perfil y agrega tus skills</p>
      </div>
      <q-circular-progress
        :value="profileCompleteness"
        size="100px"
        :thickness="0.2"
        color="primary"
        track-color="grey-3"
        class="text-center"
      >
        <div class="text-h6">{{ profileCompleteness }}%</div>
        <div class="text-caption">Completado</div>
      </q-circular-progress>
    </div>

    <!-- Estado de Carga y Errores -->
    <div v-if="loading" class="text-center q-my-lg">
      <q-spinner size="50px" color="primary" />
    </div>

    <q-banner v-if="error" class="bg-negative text-white q-mb-lg">
      {{ error }}
      <template v-slot:action>
        <q-btn flat dense icon="close" @click="error = null" />
      </template>
    </q-banner>

    <!-- Información Personal -->
    <q-card class="q-mb-lg">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Información Personal</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-md-6">
            <q-input
              v-model="perfil.nombre"
              label="Nombre Completo"
              outlined
              dense
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input
              v-model="perfil.email"
              label="Email"
              outlined
              dense
              type="email"
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input
              v-model="perfil.telefono"
              label="Teléfono"
              outlined
              dense
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-select
              v-model="perfil.area"
              label="Área"
              outlined
              dense
              :options="['Tecnología', 'RR.HH.', 'Finanzas', 'Marketing', 'Operaciones']"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              v-model="perfil.experiencia"
              label="Experiencia Profesional"
              outlined
              dense
              type="textarea"
              rows="4"
            />
          </div>
        </div>

        <div class="row justify-end q-mt-lg q-gutter-md">
          <q-btn
            label="Guardar Perfil"
            color="primary"
            @click="guardarPerfil"
            :loading="loading"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- Skills -->
    <q-card class="q-mb-lg">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Skills y Competencias</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-xs-12 col-md-8">
            <q-input
              v-model="nuevoSkill.nombre"
              label="Nombre del Skill"
              outlined
              dense
            />
          </div>
          <div class="col-xs-12 col-md-4">
            <q-select
              v-model="nuevoSkill.nivel"
              label="Nivel"
              outlined
              dense
              :options="['Básico', 'Intermedio', 'Avanzado']"
            />
          </div>
          <div class="col-xs-12">
            <q-btn
              label="Agregar Skill"
              color="positive"
              icon="add"
              @click="agregarSkill"
              :disable="!nuevoSkill.nombre || !nuevoSkill.nivel"
            />
          </div>
        </div>

        <!-- Lista de Skills -->
        <div class="row q-col-gutter-md">
          <div
            v-for="skill in perfil.skills"
            :key="skill.id"
            class="col-xs-12 col-md-6"
          >
            <q-card flat bordered>
              <q-card-section>
                <div class="row items-center justify-between">
                  <div>
                    <div class="text-weight-bold">{{ skill.nombre }}</div>
                    <q-badge :label="skill.nivel" color="primary" />
                  </div>
                  <q-btn
                    flat
                    round
                    dense
                    icon="delete"
                    color="negative"
                    size="sm"
                    @click="eliminarSkill(skill.id)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Certificaciones -->
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Certificaciones</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-lg q-mb-lg">
          <div class="col-xs-12 col-md-6">
            <q-input
              v-model="nuevaCert.nombre"
              label="Nombre"
              outlined
              dense
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input
              v-model="nuevaCert.institucion"
              label="Institución"
              outlined
              dense
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input
              v-model="nuevaCert.fecha"
              label="Fecha de Obtención"
              outlined
              dense
              type="date"
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-file
              v-model="nuevaCert.archivo"
              label="Cargar Archivo"
              outlined
              dense
              max-file-size="5242880"
            />
          </div>
          <div class="col-xs-12">
            <q-btn
              label="Agregar Certificación"
              color="positive"
              icon="add"
              @click="agregarCertificacion"
            />
          </div>
        </div>

        <!-- Lista de Certificaciones -->
        <div class="row q-col-gutter-md">
          <div
            v-for="cert in certificaciones"
            :key="cert.id"
            class="col-xs-12 col-md-6"
          >
            <q-card flat bordered>
              <q-card-section>
                <div class="text-weight-bold">{{ cert.nombre }}</div>
                <div class="text-caption text-grey-7">{{ cert.institucion }}</div>
                <q-badge
                  v-if="cert.validada"
                  label="Validada ✓"
                  color="positive"
                  class="q-mt-sm"
                />
                <q-badge
                  v-else
                  label="Pendiente"
                  color="warning"
                  class="q-mt-sm"
                />
              </q-card-section>
              <q-card-actions>
                <q-btn
                  flat
                  dense
                  icon="delete"
                  color="negative"
                  @click="eliminarCertificacion(cert.id)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useColaboradorStore } from 'src/stores/colaborador'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const colaboradorStore = useColaboradorStore()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref(null)

const perfil = reactive({
  nombre: '',
  email: '',
  telefono: '',
  area: '',
  experiencia: '',
  skills: [],
})

const nuevoSkill = reactive({
  nombre: '',
  nivel: '',
})

const nuevaCert = reactive({
  nombre: '',
  institucion: '',
  fecha: '',
  archivo: null,
})

const certificaciones = ref([])

const profileCompleteness = computed(() => {
  let completeness = 0
  if (perfil.nombre) completeness += 20
  if (perfil.email) completeness += 20
  if (perfil.area) completeness += 20
  if (perfil.skills.length > 0) completeness += 20
  if (certificaciones.value.length > 0) completeness += 20
  return completeness
})

const cargarPerfil = async () => {
  loading.value = true
  try {
    const userId = authStore.user?.id
    if (userId) {
      await colaboradorStore.fetchColaborador(userId)
      await colaboradorStore.fetchSkills(userId)

      if (colaboradorStore.colaborador) {
        Object.assign(perfil, colaboradorStore.colaborador)
      }
      perfil.skills = colaboradorStore.skills
    }
  } catch (err) {
    error.value = 'Error al cargar el perfil'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const guardarPerfil = async () => {
  loading.value = true
  try {
    const userId = authStore.user?.id
    if (userId) {
      const dataToSave = { ...perfil }
      delete dataToSave.skills

      const result = await colaboradorStore.updateColaborador(userId, dataToSave)
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Perfil actualizado correctamente',
        })
      } else {
        error.value = result.error
      }
    }
  } catch {
    error.value = 'Error al guardar el perfil'
  } finally {
    loading.value = false
  }
}

const agregarSkill = () => {
  if (!nuevoSkill.nombre || !nuevoSkill.nivel) {
    error.value = 'Completa todos los campos del skill'
    return
  }

  perfil.skills.push({
    id: Date.now(),
    nombre: nuevoSkill.nombre,
    nivel: nuevoSkill.nivel,
  })

  nuevoSkill.nombre = ''
  nuevoSkill.nivel = ''

  $q.notify({
    type: 'positive',
    message: 'Skill agregado',
  })
}

const eliminarSkill = (skillId) => {
  perfil.skills = perfil.skills.filter((s) => s.id !== skillId)
}

const agregarCertificacion = () => {
  if (!nuevaCert.nombre || !nuevaCert.institucion) {
    error.value = 'Completa todos los campos'
    return
  }

  certificaciones.value.push({
    id: Date.now(),
    nombre: nuevaCert.nombre,
    institucion: nuevaCert.institucion,
    fecha: nuevaCert.fecha,
    validada: false,
  })

  nuevaCert.nombre = ''
  nuevaCert.institucion = ''
  nuevaCert.fecha = ''
  nuevaCert.archivo = null

  $q.notify({
    type: 'positive',
    message: 'Certificación agregada',
  })
}

const eliminarCertificacion = (certId) => {
  certificaciones.value = certificaciones.value.filter((c) => c.id !== certId)
}

onMounted(() => {
  cargarPerfil()
})
</script>
