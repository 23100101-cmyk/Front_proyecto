<template>
  <q-page class="q-pa-lg">
    <h1 class="text-h4 text-weight-bold q-mb-lg">
      <q-icon name="auto_awesome" color="primary" class="q-mr-md" />
      Skill Matcher - Búsqueda de Talento
    </h1>

    <div class="row q-col-gutter-lg">
      <!-- Panel de Requisitos del Puesto -->
      <div class="col-xs-12 col-md-5">
        <q-card class="shadow-2">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 text-weight-bold">Requisitos del Puesto</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <!-- Selector de Puesto -->
            <div class="q-mb-lg">
              <label class="text-weight-bold q-mb-sm">Selecciona una Vacante:</label>
              <q-select
                v-model="selectedJob"
                :options="jobOptions"
                option-value="id"
                option-label="title"
                outlined
                dense
                @update:model-value="updateJobRequirements"
              />
            </div>

            <!-- Título del Puesto -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold">{{ selectedJob?.title || '"'"'Sin seleccionar'"'"' }}</div>
              <div class="text-caption text-grey-7">{{ selectedJob?.department }}</div>
            </div>

            <!-- Lista de Skills Requeridos -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-sm">Skills Requeridos</div>
              <div v-if="jobRequirements.length === 0" class="text-caption text-grey-6">
                Selecciona una vacante para ver los requisitos
              </div>
              <q-chip
                v-for="(req, index) in jobRequirements"
                :key="index"
                removable
                color="primary"
                text-color="white"
                icon="check_circle"
                @remove="removeRequirement(index)"
              >
                {{ req }}
              </q-chip>
            </div>

            <!-- Agregar nuevo skill -->
            <div class="q-mb-md">
              <q-input
                v-model="newSkill"
                outlined
                dense
                label="Agregar nuevo skill"
                @keyup.enter="addSkill"
              >
                <template #append>
                  <q-icon
                    name="add_circle"
                    clickable
                    color="primary"
                    @click="addSkill"
                  />
                </template>
              </q-input>
            </div>

            <!-- Nivel de Match Mínimo -->
            <div class="q-mb-md">
              <label class="text-weight-bold q-mb-sm">Match Mínimo Requerido: {{ minMatch }}%</label>
              <q-slider
                v-model="minMatch"
                :min="0"
                :max="100"
                :step="5"
                label
                color="primary"
              />
            </div>

            <q-btn
              label="Buscar Candidatos"
              color="primary"
              icon="search"
              class="full-width"
              size="lg"
              @click="searchCandidates"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Panel de Resultados -->
      <div class="col-xs-12 col-md-7">
        <q-card class="shadow-2">
          <q-card-section class="bg-green-7 text-white">
            <div class="text-h6 text-weight-bold">
              Candidatos Disponibles ({{ matchedCandidates.length }})
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div v-if="matchedCandidates.length === 0" class="text-center q-pa-lg">
              <q-icon name="search_off" size="xl" color="grey-4" />
              <div class="text-subtitle2 text-grey-6 q-mt-md">
                No hay candidatos que cumplan con los requisitos
              </div>
            </div>

            <q-list v-else separator class="q-mt-md">
              <q-item
                v-for="candidate in matchedCandidates"
                :key="candidate.id"
                clickable
                v-ripple
                class="q-py-md"
              >
                <q-item-section avatar>
                  <q-avatar
                    size="lg"
                    :color="getMatchColor(candidate.matchPercentage)"
                    text-color="white"
                  >
                    {{ candidate.initials }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ candidate.name }}</q-item-label>
                  <q-item-label caption>{{ candidate.role }}</q-item-label>
                  
                  <div class="q-mt-sm">
                    <q-linear-progress
                      :value="candidate.matchPercentage / 100"
                      :color="getMatchColor(candidate.matchPercentage)"
                      class="q-mb-sm"
                    />
                    <div class="text-caption text-weight-bold">
                      <q-icon name="star" color="amber" size="xs" />
                      Match: {{ candidate.matchPercentage }}%
                    </div>
                  </div>

                  <div class="q-mt-sm">
                    <q-chip
                      v-for="skill in candidate.matchedSkills.slice(0, 3)"
                      :key="skill"
                      size="sm"
                      color="positive"
                      text-color="white"
                      icon="done"
                    >
                      {{ skill }}
                    </q-chip>
                    <q-chip
                      v-if="candidate.matchedSkills.length > 3"
                      size="sm"
                      color="grey-5"
                      text-color="dark"
                    >
                      +{{ candidate.matchedSkills.length - 3 }}
                    </q-chip>
                  </div>
                </q-item-section>

                <q-item-section side top>
                  <q-btn
                    flat
                    round
                    dense
                    icon="more_vert"
                    @click.stop="showCandidateDetails(candidate)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de Detalles del Candidato -->
    <q-dialog v-model="showDetailsDialog" position="right" @update:model-value="handleDialogClose">
      <q-card style="width: 400px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6 text-weight-bold">Detalles del Candidato</div>
          <q-icon name="close" class="float-right cursor-pointer" @click="showDetailsDialog = false" />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="selectedCandidate">
          <!-- Información Básica -->
          <div class="q-mb-lg">
            <q-avatar size="80px" color="primary" text-color="white" class="q-mb-md">
              {{ selectedCandidate.initials }}
            </q-avatar>
            <div class="text-h6 text-weight-bold">{{ selectedCandidate.name }}</div>
            <div class="text-subtitle2">{{ selectedCandidate.role }}</div>
            <div class="text-caption">{{ selectedCandidate.email }}</div>
          </div>

          <q-separator class="q-my-md" />

          <!-- Match Score -->
          <div class="q-mb-lg">
            <div class="text-weight-bold q-mb-sm">Compatibilidad</div>
            <div class="text-h5 text-primary">{{ selectedCandidate.matchPercentage }}%</div>
            <q-linear-progress
              :value="selectedCandidate.matchPercentage / 100"
              color="primary"
            />
          </div>

          <q-separator class="q-my-md" />

          <!-- Skills Coincidentes -->
          <div class="q-mb-lg">
            <div class="text-weight-bold q-mb-md">Skills Coincidentes</div>
            <q-chip
              v-for="skill in selectedCandidate.matchedSkills"
              :key="skill"
              color="positive"
              text-color="white"
              icon="done"
              class="q-mr-sm q-mb-sm"
            >
              {{ skill }}
            </q-chip>
          </div>

          <q-separator class="q-my-md" />

          <!-- Skills Faltantes -->
          <div class="q-mb-lg">
            <div class="text-weight-bold q-mb-md">Skills Faltantes</div>
            <q-chip
              v-for="skill in selectedCandidate.missingSkills"
              :key="skill"
              color="negative"
              text-color="white"
              icon="close"
              class="q-mr-sm q-mb-sm"
            >
              {{ skill }}
            </q-chip>
          </div>

          <q-separator class="q-my-md" />

          <!-- Acciones -->
          <div class="row q-gutter-md">
            <q-btn
              label="Contactar"
              color="primary"
              icon="email"
              class="col"
              @click="contactCandidate"
            />
            <q-btn
              label="Descartar"
              color="negative"
              flat
              icon="delete"
              class="col"
              @click="discardCandidate"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from '"'"'vue'"'"'
import { useQuasar } from '"'"'quasar'"'"'

const $q = useQuasar()

// Data
const jobOptions = ref([
  {
    id: 1,
    title: '"'"'Desarrollador Frontend Senior'"'"',
    department: '"'"'Ingeniería'"'"',
    skills: ['"'"'Vue.js'"'"', '"'"'JavaScript'"'"', '"'"'CSS'"'"', '"'"'API RESTful'"'"', '"'"'Git'"'"'],
  },
  {
    id: 2,
    title: '"'"'Desarrollador Backend'"'"',
    department: '"'"'Ingeniería'"'"',
    skills: ['"'"'Python'"'"', '"'"'Node.js'"'"', '"'"'SQL'"'"', '"'"'Bases de Datos'"'"', '"'"'API RESTful'"'"'],
  },
  {
    id: 3,
    title: '"'"'Analista de Datos'"'"',
    department: '"'"'Analytics'"'"',
    skills: ['"'"'SQL'"'"', '"'"'Python'"'"', '"'"'Power BI'"'"', '"'"'Estadística'"'"', '"'"'Excel'"'"'],
  },
  {
    id: 4,
    title: '"'"'Especialista en RH'"'"',
    department: '"'"'Recursos Humanos'"'"',
    skills: ['"'"'Reclutamiento'"'"', '"'"'Capacitación'"'"', '"'"'Relaciones Laborales'"'"', '"'"'RRHH Digital'"'"'],
  },
])

const candidatesDatabase = ref([
  {
    id: 1,
    name: '"'"'Juan Pérez'"'"',
    initials: '"'"'JP'"'"',
    role: '"'"'Desarrollador Frontend'"'"',
    email: '"'"'juan.perez@email.com'"'"',
    skills: ['"'"'Vue.js'"'"', '"'"'JavaScript'"'"', '"'"'CSS'"'"', '"'"'API RESTful'"'"', '"'"'TypeScript'"'"', '"'"'React'"'"'],
  },
  {
    id: 2,
    name: '"'"'María García'"'"',
    initials: '"'"'MG'"'"',
    role: '"'"'Ingeniera de Software'"'"',
    email: '"'"'maria.garcia@email.com'"'"',
    skills: ['"'"'Python'"'"', '"'"'JavaScript'"'"', '"'"'Node.js'"'"', '"'"'SQL'"'"', '"'"'Docker'"'"', '"'"'Kubernetes'"'"'],
  },
  {
    id: 3,
    name: '"'"'Carlos López'"'"',
    initials: '"'"'CL'"'"',
    role: '"'"'Analista de Datos'"'"',
    email: '"'"'carlos.lopez@email.com'"'"',
    skills: ['"'"'SQL'"'"', '"'"'Python'"'"', '"'"'Power BI'"'"', '"'"'Excel'"'"', '"'"'Estadística'"'"', '"'"'Tableau'"'"'],
  },
  {
    id: 4,
    name: '"'"'Ana Martínez'"'"',
    initials: '"'"'AM'"'"',
    role: '"'"'Especialista en RH'"'"',
    email: '"'"'ana.martinez@email.com'"'"',
    skills: ['"'"'Reclutamiento'"'"', '"'"'Capacitación'"'"', '"'"'Relaciones Laborales'"'"', '"'"'RRHH Digital'"'"', '"'"'Nómina'"'"'],
  },
  {
    id: 5,
    name: '"'"'Roberto Sánchez'"'"',
    initials: '"'"'RS'"'"',
    role: '"'"'Desarrollador Full Stack'"'"',
    email: '"'"'roberto.sanchez@email.com'"'"',
    skills: ['"'"'Vue.js'"'"', '"'"'JavaScript'"'"', '"'"'Python'"'"', '"'"'SQL'"'"', '"'"'API RESTful'"'"', '"'"'Git'"'"'],
  },
  {
    id: 6,
    name: '"'"'Sofia Rodríguez'"'"',
    initials: '"'"'SR'"'"',
    role: '"'"'Product Manager'"'"',
    email: '"'"'sofia.rodriguez@email.com'"'"',
    skills: ['"'"'Estrategia'"'"', '"'"'Análisis'"'"', '"'"'Power BI'"'"', '"'"'Excel'"'"', '"'"'Comunicación'"'"'],
  },
])

// Reactive data
const selectedJob = ref(jobOptions.value[0])
const jobRequirements = ref(jobOptions.value[0].skills)
const newSkill = ref('"'"''"'"')
const minMatch = ref(80)
const matchedCandidates = ref([])
const showDetailsDialog = ref(false)
const selectedCandidate = ref(null)

// Methods
const updateJobRequirements = () => {
  if (selectedJob.value) {
    jobRequirements.value = [...selectedJob.value.skills]
  }
}

const addSkill = () => {
  if (newSkill.value.trim() && !jobRequirements.value.includes(newSkill.value)) {
    jobRequirements.value.push(newSkill.value)
    newSkill.value = '"'"''"'"'
    $q.notify({
      type: '"'"'positive'"'"',
      message: '"'"'Skill agregado correctamente'"'"',
      position: '"'"'top-right'"'"',
    })
  }
}

const removeRequirement = (index) => {
  jobRequirements.value.splice(index, 1)
}

const calculateMatch = (candidate) => {
  if (jobRequirements.value.length === 0) return 0

  const matchedSkills = candidate.skills.filter((skill) =>
    jobRequirements.value.some((req) =>
      skill.toLowerCase().includes(req.toLowerCase()) ||
      req.toLowerCase().includes(skill.toLowerCase())
    )
  )

  return Math.round((matchedSkills.length / jobRequirements.value.length) * 100)
}

const getMissingSkills = (candidate, matchPercentage) => {
  if (matchPercentage === 100) return []

  const matchedSkills = candidate.skills.filter((skill) =>
    jobRequirements.value.some((req) =>
      skill.toLowerCase().includes(req.toLowerCase()) ||
      req.toLowerCase().includes(skill.toLowerCase())
    )
  )

  return jobRequirements.value.filter(
    (req) =>
      !matchedSkills.some((skill) =>
        skill.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(skill.toLowerCase())
      )
  )
}

const searchCandidates = () => {
  if (jobRequirements.value.length === 0) {
    $q.notify({
      type: '"'"'warning'"'"',
      message: '"'"'Agrega al menos un skill requerido'"'"',
      position: '"'"'top-right'"'"',
    })
    return
  }

  const results = candidatesDatabase.value
    .map((candidate) => {
      const matchPercentage = calculateMatch(candidate)
      const matchedSkills = candidate.skills.filter((skill) =>
        jobRequirements.value.some((req) =>
          skill.toLowerCase().includes(req.toLowerCase()) ||
          req.toLowerCase().includes(skill.toLowerCase())
        )
      )
      const missingSkills = getMissingSkills(candidate, matchPercentage)

      return {
        ...candidate,
        matchPercentage,
        matchedSkills,
        missingSkills,
      }
    })
    .filter((candidate) => candidate.matchPercentage >= minMatch.value)
    .sort((a, b) => b.matchPercentage - a.matchPercentage)

  matchedCandidates.value = results

  if (results.length === 0) {
    $q.notify({
      type: '"'"'info'"'"',
      message: `No hay candidatos con ${minMatch.value}% de compatibilidad`,
      position: '"'"'top-right'"'"',
    })
  } else {
    $q.notify({
      type: '"'"'positive'"'"',
      message: `Se encontraron ${results.length} candidatos`,
      position: '"'"'top-right'"'"',
    })
  }
}

const showCandidateDetails = (candidate) => {
  selectedCandidate.value = candidate
  showDetailsDialog.value = true
}

const handleDialogClose = (val) => {
  if (!val) {
    selectedCandidate.value = null
  }
}

const contactCandidate = () => {
  $q.notify({
    type: '"'"'positive'"'"',
    message: `Correo enviado a ${selectedCandidate.value.email}`,
    position: '"'"'top-right'"'"',
  })
  showDetailsDialog.value = false
}

const discardCandidate = () => {
  const index = matchedCandidates.value.findIndex(
    (c) => c.id === selectedCandidate.value.id
  )
  if (index > -1) {
    matchedCandidates.value.splice(index, 1)
  }
  showDetailsDialog.value = false
  $q.notify({
    type: '"'"'info'"'"',
    message: '"'"'Candidato descartado'"'"',
    position: '"'"'top-right'"'"',
  })
}

const getMatchColor = (percentage) => {
  if (percentage >= 90) return '"'"'positive'"'"'
  if (percentage >= 80) return '"'"'warning'"'"'
  return '"'"'info'"'"'
}

// Initial search
searchCandidates()
</script>

<style scoped>
:deep(.q-chip) {
  margin: 4px;
}
</style>
