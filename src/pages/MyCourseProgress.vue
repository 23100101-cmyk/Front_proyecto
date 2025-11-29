<template>
  <q-page class="q-pa-xl">
    <div class="text-h4 text-weight-bold q-mb-sm">Mi Progreso en Cursos</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">
      Cursos en los que estás inscrito.
    </div>

    <div class="q-gutter-sm q-mb-xl">
      <q-chip
        v-for="status in ['En Curso', 'Completados']"
        :key="status"
        clickable
        :color="filtroEstado === status ? 'primary' : 'grey-3'"
        :text-color="filtroEstado === status ? 'white' : 'dark'"
        @click="filtroEstado = status"
      >
        {{ status }}
      </q-chip>
    </div>

    <div v-if="loading" class="text-center q-my-lg">
      <q-spinner size="50px" color="primary" />
    </div>

    <q-banner v-if="error" class="bg-negative text-white q-mb-lg">
      {{ error }}
      <template v-slot:action>
        <q-btn flat dense icon="close" @click="error = null" />
      </template>
    </q-banner>

    <div v-if="!loading && cursosFiltrados.length > 0" class="row q-col-gutter-lg">
      <div v-for="course in cursosFiltrados" :key="course.id" class="col-xs-12 col-sm-6 col-md-4">
        <q-card class="bg-white q-pa-md shadow-3">
          <div class="text-h6 text-weight-bold">{{ course.titulo }}</div>
          <p class="text-caption text-grey-7 q-mt-sm">{{ course.descripcion }}</p>
          <div class="row justify-between items-center q-mt-md">
            <div class="text-caption text-grey-7">{{ course.proveedor }}</div>
            <div class="text-caption text-grey-7">{{ course.duracionHoras }}h</div>
          </div>

          <div class="q-mt-md">
            <div v-if="course.porcentajeCompletado > 0">
              <q-linear-progress :value="course.porcentajeCompletado / 100" color="green-7" track-color="grey-3" style="height: 8px;" />
              <div class="text-caption text-weight-bold q-mt-xs">
                {{ course.porcentajeCompletado }}% Completado
              </div>
            </div>
            <div v-else>
              <q-linear-progress :value="0" color="grey-3" track-color="grey-2" style="height: 8px;" />
              <div class="text-caption text-weight-bold q-mt-xs text-grey-7">
                Sin iniciar
              </div>
            </div>
          </div>

          <div class="q-mt-md text-right">
            <q-btn
              v-if="course.porcentajeCompletado < 100"
              unelevated
              label="Continuar"
              color="green-7"
              @click="marcarProgreso(course.id)"
            />
            <q-btn
              v-else
              unelevated
              label="Completado"
              color="positive"
              disable
            />
          </div>

        </q-card>
      </div>
    </div>

    <q-card v-else-if="!loading" flat class="text-center q-pa-lg">
      <q-icon name="school" size="60px" color="grey-5" />
      <p class="text-grey-7 q-mt-md">No tienes cursos en esta categoría</p>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { cursoService } from 'src/services/backend'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()

const cursos = ref([])
const loading = ref(false)
const error = ref(null)
const filtroEstado = ref('En Curso')

const cursosFiltrados = computed(() => {
  return cursos.value.filter(course => {
    if (filtroEstado.value === 'En Curso') {
      return course.porcentajeCompletado < 100
    } else if (filtroEstado.value === 'Completados') {
      return course.porcentajeCompletado === 100
    }
    return true
  })
})

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await cargarCursos()
  }
})

const cargarCursos = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await cursoService.getAll()
    cursos.value = data
  } catch (err) {
    error.value = 'Error al cargar los cursos'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const marcarProgreso = async (cursoId) => {
  try {
    const colaboradorId = authStore.user?.id
    if (!colaboradorId) {
      $q.notify({
        type: 'negative',
        message: 'Usuario no identificado',
      })
      return
    }
    
    await cursoService.completar(colaboradorId, cursoId)
    $q.notify({
      type: 'positive',
      message: 'Progreso actualizado',
    })
    await cargarCursos()
  } catch (error) {
    console.error('Error al actualizar curso:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al actualizar el curso',
    })
  }
}
</script>
