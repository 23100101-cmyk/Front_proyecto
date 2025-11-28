<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <q-banner v-if="profileStore.error" class="bg-negative text-white q-mb-lg" dense closable @close="profileStore.clearError()">
      {{ profileStore.error }}
    </q-banner>

    <!-- Header -->
    <div class="row items-center q-mb-lg">
      <q-avatar size="100px" color="primary" text-color="white" :label="auth.userInitials" class="q-mr-md" />
      <div class="col">
        <h1 class="text-h4 q-ma-none">{{ profile.name || 'Mi Perfil' }}</h1>
        <p class="text-subtitle2 text-grey-7 q-ma-none">{{ profile.email }}</p>
        <q-linear-progress :value="profileCompleteness" color="positive" class="q-mt-md" style="height: 8px" />
        <p class="text-caption q-mt-xs">{{ Math.round(profileCompleteness * 100) }}% completado</p>
      </div>
      <q-btn color="primary" label="Editar Datos" @click="showEditDialog = true" />
    </div>

    <!-- Tabs -->
    <q-tabs v-model="activeTab" dense class="text-grey-7 q-mb-lg" indicator-color="primary">
      <q-tab name="personal" icon="person" label="Datos Personales" />
      <q-tab name="skills" icon="star" label="Skills & Competencias" />
      <q-tab name="certifications" icon="verified" label="Certificaciones" />
      <q-tab name="experience" icon="work" label="Experiencia" />
    </q-tabs>

    <!-- Tab Panels -->
    <q-tab-panels v-model="activeTab" animated>
      <!-- Personal Data Tab -->
      <q-tab-panel name="personal">
        <q-card flat>
          <q-card-section>
            <div class="text-h6 q-mb-md">Información Personal</div>
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-6">
                <q-input v-model="profile.personalData.phone" label="Teléfono" filled readonly />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input v-model="profile.personalData.location" label="Ubicación" filled readonly />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input v-model="profile.personalData.birthDate" label="Fecha de Nacimiento" filled readonly />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input v-model="profile.personalData.department" label="Departamento" filled readonly />
              </div>
              <div class="col-xs-12">
                <q-input v-model="profile.personalData.position" label="Puesto" filled readonly />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Skills Tab -->
      <q-tab-panel name="skills">
        <div class="row q-col-gutter-md q-mb-md">
          <q-card flat class="col-xs-12 col-sm-6">
            <q-card-section>
              <div class="text-subtitle2 q-mb-md">Agregar Nueva Competencia</div>
              <q-input v-model="newSkill.name" label="Nombre de Skill" class="q-mb-md" filled />
              <q-select
                v-model="newSkill.level"
                :options="skillLevels"
                label="Nivel de Dominio"
                filled
                class="q-mb-md"
              />
              <q-btn color="primary" label="Agregar Skill" @click="addSkill" :loading="profileStore.loading" />
            </q-card-section>
          </q-card>

          <div class="col-xs-12 col-sm-6">
            <q-card v-if="profileStore.profile.skills.length > 0" flat>
              <q-card-section>
                <div class="text-subtitle2 q-mb-md">Mis Competencias ({{ profileStore.skillsCount }})</div>
                <div class="q-gutter-md">
                  <div v-for="skill in profileStore.profile.skills" :key="skill.id" class="row items-center justify-between bg-grey-2 q-pa-md rounded-borders">
                    <div>
                      <div class="text-weight-bold">{{ skill.name }}</div>
                      <q-badge :label="skill.level" class="q-mt-xs" />
                    </div>
                    <q-btn color="negative" flat dense icon="delete" @click="removeSkill(skill.id)" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-card v-else flat class="bg-grey-2">
              <q-card-section class="text-center text-grey-6">
                <p>Aún no has agregado competencias</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Certifications Tab -->
      <q-tab-panel name="certifications">
        <div class="row q-col-gutter-md q-mb-md">
          <q-card flat class="col-xs-12 col-sm-6">
            <q-card-section>
              <div class="text-subtitle2 q-mb-md">Agregar Certificación</div>
              <q-input v-model="newCert.name" label="Nombre de Certificación" class="q-mb-md" filled />
              <q-input v-model="newCert.issuer" label="Entidad Emisora" class="q-mb-md" filled />
              <q-input v-model="newCert.issueDate" label="Fecha de Emisión" type="date" class="q-mb-md" filled />
              <q-file
                v-model="newCert.file"
                label="Archivo PDF"
                accept=".pdf"
                @rejected="onFileRejected"
                class="q-mb-md"
              />
              <q-btn color="primary" label="Guardar Certificación" @click="addCertification" :loading="profileStore.loading" />
            </q-card-section>
          </q-card>

          <div class="col-xs-12 col-sm-6">
            <q-card v-if="profileStore.profile.certifications.length > 0" flat>
              <q-card-section>
                <div class="text-subtitle2 q-mb-md">Mis Certificaciones ({{ profileStore.certificationsCount }})</div>
                <div class="q-gutter-md">
                  <q-expansion-item
                    v-for="cert in profileStore.profile.certifications"
                    :key="cert.id"
                    :label="cert.name"
                    :caption="`Emisor: ${cert.issuer}`"
                  >
                    <div class="q-pa-md bg-grey-2">
                      <p><strong>Emisor:</strong> {{ cert.issuer }}</p>
                      <p><strong>Fecha de Emisión:</strong> {{ cert.issueDate }}</p>
                      <q-btn
                        color="negative"
                        label="Eliminar"
                        flat
                        @click="removeCertification(cert.id)"
                        class="q-mt-md"
                      />
                    </div>
                  </q-expansion-item>
                </div>
              </q-card-section>
            </q-card>
            <q-card v-else flat class="bg-grey-2">
              <q-card-section class="text-center text-grey-6">
                <p>Aún no has agregado certificaciones</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Experience Tab -->
      <q-tab-panel name="experience">
        <q-card flat>
          <q-card-section>
            <div class="text-h6 q-mb-md">Experiencia Laboral</div>
            <q-input
              v-model="profile.experience"
              type="textarea"
              label="Descripción de tu experiencia"
              filled
              rows="10"
              readonly
              class="q-mb-md"
            />
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Edit Profile Dialog -->
    <q-dialog v-model="showEditDialog" persistent>
      <q-card style="width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar Perfil</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <q-input v-model="editFormData.name" label="Nombre" filled />
            <q-input v-model="editFormData.email" label="Email" filled readonly />
            <q-input v-model="editFormData.personalData.phone" label="Teléfono" filled />
            <q-input v-model="editFormData.personalData.location" label="Ubicación" filled />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            @click="updateProfile"
            :loading="profileStore.loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useProfileStore } from 'src/stores/profile'

const $q = useQuasar()
const auth = useAuthStore()
const profileStore = useProfileStore()

// Data
const activeTab = ref('personal')
const showEditDialog = ref(false)
const skillLevels = ref(['Básico', 'Intermedio', 'Avanzado'])

const newSkill = ref({
  name: '',
  level: 'Básico',
})

const newCert = ref({
  name: '',
  issuer: '',
  issueDate: '',
  file: null,
})

const editFormData = ref({
  name: '',
  email: '',
  personalData: {
    phone: '',
    location: '',
    birthDate: '',
    department: '',
    position: '',
  },
})

const profile = computed(() => profileStore.profile)

const profileCompleteness = computed(() => {
  let completed = 0
  let total = 5
  if (profile.value.name) completed++
  if (profile.value.email) completed++
  if (profile.value.personalData?.phone) completed++
  if (profileStore.skillsCount > 0) completed++
  if (profileStore.certificationsCount > 0) completed++
  return completed / total
})

// Methods
const addSkill = async () => {
  if (!newSkill.value.name) {
    $q.notify({ type: 'warning', message: 'Por favor ingresa el nombre de la competencia' })
    return
  }
  const result = await profileStore.addSkill(newSkill.value.name, newSkill.value.level)
  if (result.success) {
    newSkill.value = { name: '', level: 'Básico' }
    $q.notify({ type: 'positive', message: 'Competencia agregada correctamente' })
  } else {
    $q.notify({ type: 'negative', message: result.error })
  }
}

const removeSkill = async (skillId) => {
  $q.dialog({
    title: 'Eliminar Competencia',
    message: '¿Estás seguro de que deseas eliminar esta competencia?',
    cancel: true,
  }).onOk(async () => {
    const result = await profileStore.removeSkill(skillId)
    if (result.success) {
      $q.notify({ type: 'positive', message: 'Competencia eliminada' })
    }
  })
}

const addCertification = async () => {
  if (!newCert.value.name || !newCert.value.issuer) {
    $q.notify({ type: 'warning', message: 'Por favor completa todos los campos' })
    return
  }
  const result = await profileStore.addCertification(newCert.value)
  if (result.success) {
    newCert.value = { name: '', issuer: '', issueDate: '', file: null }
    $q.notify({ type: 'positive', message: 'Certificación agregada correctamente' })
  }
}

const removeCertification = async (certId) => {
  const result = await profileStore.removeCertification(certId)
  if (result.success) {
    $q.notify({ type: 'positive', message: 'Certificación eliminada' })
  }
}

const updateProfile = async () => {
  const result = await profileStore.updateProfile(editFormData.value)
  if (result.success) {
    showEditDialog.value = false
    $q.notify({ type: 'positive', message: 'Perfil actualizado correctamente' })
  }
}

const onFileRejected = (rejectedEntries) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} archivo(s) rechazado(s)`,
  })
}

// Lifecycle
onMounted(async () => {
  if (auth.user?.id) {
    await profileStore.fetchProfile(auth.user.id)
    editFormData.value = { ...profileStore.profile }
  }
})
</script>
