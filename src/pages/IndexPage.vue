<template>
  <q-page class="q-pa-xl bg-grey-1">
    <div class="row items-center q-mb-lg">
      <div class="text-h4 text-weight-bold text-blue-grey-10">
        Dashboard Estratégico de Movilidad
      </div>
      <q-space />
      <div class="row items-center q-gutter-md">
        <q-btn
          flat
          dense
          icon="sync"
          label="Actualizar"
          color="primary"
          @click="refreshData"
          :loading="loading"
        />
        <q-btn flat dense icon="logout" label="Salir" color="negative" @click="handleLogout" />
        <div class="text-subtitle1 text-grey-7">{{ auth.userDisplayName }}</div>
        <q-avatar size="md" :color="auth.isLoggedIn ? 'primary' : 'grey-5'" text-color="white">
          {{ auth.userInitials }}
        </q-avatar>
      </div>
    </div>

    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-xs-12 col-md-4">
        <q-card flat class="q-pa-md bg-white shadow-3">
          <div class="text-overline text-grey-7">ESTADO DEL INVENTARIO</div>
          <div class="row items-end justify-between q-mt-xs q-mb-sm">
            <div class="text-h5 text-weight-bolder text-green-7">
              {{ recommendedCourses.length }} / 10
            </div>
            <q-icon name="assignment_turned_in" color="green-7" size="md" />
          </div>
          <q-linear-progress
            :value="recommendedCourses.length / 10"
            color="green-7"
            track-color="grey-3"
            class="q-mb-sm"
            style="height: 8px"
          />
          <div class="text-caption text-grey-6">
            Recomendaciones actualizadas.
            <span class="text-primary cursor-pointer" @click="refreshData">Revisar detalles.</span>
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-4">
        <q-card flat class="q-pa-md bg-white shadow-3">
          <div class="text-overline text-grey-7">FOCO EN DESARROLLO</div>
          <div class="text-h5 text-weight-bolder text-orange-8 q-mt-xs">3 Brechas Críticas</div>
          <div class="text-caption text-grey-6 q-mb-sm">
            Para alcanzar el nivel: **Líder de Arquitectura Cloud**.
          </div>

          <div class="row justify-between text-caption q-mt-md">
            <div><q-badge color="blue-grey-8" label="Liderazgo" /></div>
            <div>30% Gap</div>
          </div>
          <q-linear-progress
            :value="0.7"
            color="blue-grey-8"
            track-color="grey-3"
            class="q-mb-xs"
            style="height: 4px"
          />

          <div class="row justify-between text-caption">
            <div><q-badge color="primary" label="GoLang" /></div>
            <div>45% Gap</div>
          </div>
          <q-linear-progress
            :value="0.55"
            color="primary"
            track-color="grey-3"
            style="height: 4px"
          />
        </q-card>
      </div>

      <div class="col-xs-12 col-md-4">
        <q-card
          flat
          class="q-pa-md bg-white shadow-3 cursor-pointer"
          @click="router.push('/progreso-cursos')"
        >
          <div class="text-overline text-grey-7">PROGRESO DE CARRERA</div>
          <div class="row items-end justify-between q-mt-xs q-mb-sm">
            <div class="text-h5 text-weight-bolder text-primary">2 Cursos Activos</div>
            <q-icon name="trending_up" color="primary" size="md" />
          </div>

          <q-list dense separator>
            <q-item clickable @click="router.push('/progreso-cursos')">
              <q-item-section avatar
                ><q-icon name="forward" color="orange-8" size="xs"
              /></q-item-section>
              <q-item-section>Microservicios (Pendiente)</q-item-section>
            </q-item>
            <q-item clickable @click="router.push('/progreso-cursos')">
              <q-item-section avatar
                ><q-icon name="forward" color="green-7" size="xs"
              /></q-item-section>
              <q-item-section>Com. Asertiva (70%)</q-item-section>
            </q-item>
          </q-list>

          <div class="text-caption text-primary q-mt-sm text-right cursor-pointer">
            Ir a Mis Cursos →
          </div>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-xl">
      <div class="col-xs-12 col-md-6">
        <div class="text-h5 text-weight-bold q-mb-md">Oportunidades de Movilidad Interna</div>
        <q-card flat bordered class="bg-white shadow-2 q-pa-md">
          <q-list separator>
            <q-item v-for="(job, index) in internalJobs" :key="index" clickable class="q-py-md">
              <q-item-section avatar
                ><q-icon name="business_center" color="blue-grey-8" size="md"
              /></q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium text-blue-grey-10">{{
                  job.title
                }}</q-item-label>
                <q-item-label caption
                  >Depto: {{ job.department }} | **{{ job.missingSkills }} skills
                  faltantes**</q-item-label
                >
                <q-linear-progress
                  :value="job.matchScore / 100"
                  color="green-7"
                  track-color="grey-3"
                  class="q-mt-sm"
                  style="height: 6px"
                />
              </q-item-section>
              <q-item-section side>
                <q-btn unelevated :label="`${job.matchScore}% Match`" color="primary" size="sm" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn
            flat
            label="Explorar todas las vacantes"
            color="primary"
            class="q-mt-md full-width"
          />
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6">
        <div class="text-h5 text-weight-bold q-mb-md">Plan Personalizado de Desarrollo</div>
        <q-card flat bordered class="bg-white shadow-2 q-pa-md">
          <q-list separator>
            <q-item
              v-for="(course, index) in recommendedCourses"
              :key="index"
              clickable
              class="q-py-md"
            >
              <q-item-section avatar
                ><q-icon :name="course.icon" color="orange-8" size="md"
              /></q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{ course.title }}</q-item-label>
                <q-item-label caption class="text-grey-7">{{ course.reason }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  label="Ver Detalle"
                  color="primary"
                  size="sm"
                  @click="router.push('/catalogo-cursos')"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn
            flat
            label="Ver Plan Completo"
            color="orange-8"
            class="q-mt-md full-width"
            @click="router.push('/progreso-cursos')"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { userService, courseService } from 'src/services/api'

const router = useRouter()
const $q = useQuasar()
const auth = useAuthStore()

const recommendedCourses = ref([])
const internalJobs = ref([])
const loading = ref(true)

// Cargar datos al montar
onMounted(async () => {
  try {
    const [jobsRes, coursesRes] = await Promise.all([
      userService.getAll({ limit: 5 }),
      courseService.getAll({ limit: 5, recommended: true }),
    ])

    internalJobs.value = jobsRes.data
    recommendedCourses.value = coursesRes.data
  } catch (error) {
    console.error('Error cargando datos:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al cargar los datos del dashboard.',
    })
  } finally {
    loading.value = false
  }
})

// Actualizar datos
const refreshData = async () => {
  loading.value = true
  try {
    const [jobsRes, coursesRes] = await Promise.all([
      userService.getAll({ limit: 5 }),
      courseService.getAll({ limit: 5, recommended: true }),
    ])
    internalJobs.value = jobsRes.data
    recommendedCourses.value = coursesRes.data
    $q.notify({
      type: 'positive',
      message: 'Datos actualizados correctamente.',
      position: 'top',
      timeout: 1500,
    })
  } catch (error) {
    console.error('Error actualizando datos:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al actualizar datos.',
    })
  } finally {
    loading.value = false
  }
}

// Logout
const handleLogout = () => {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: '¿Estás seguro de que quieres cerrar sesión?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    auth.logout()
    $q.notify({
      type: 'positive',
      message: 'Sesión cerrada correctamente.',
    })
    router.push('/login')
  })
}
</script>
