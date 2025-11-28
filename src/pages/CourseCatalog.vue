<template>
  <q-page class="q-pa-xl">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h4 text-weight-bold">Explorar Cursos</div>
        <div class="text-subtitle1 text-grey-7">
          Encuentra tu próxima certificación o habilidad.
        </div>
      </div>
      <q-space />
      <q-btn
        flat
        dense
        icon="refresh"
        label="Actualizar"
        color="primary"
        @click="courseStore.fetchCourses()"
        :loading="courseStore.loading"
      />
    </div>

    <!-- Filtros -->
    <div class="row q-col-gutter-md q-mb-xl items-center">
      <div class="col-xs-12 col-md-4">
        <q-input
          v-model="courseStore.searchQuery"
          outlined
          label="Buscar por título o habilidad"
          dense
          clearable
          debounce="300"
        >
          <template v-slot:append><q-icon name="search" /></template>
        </q-input>
      </div>
      <div class="col-xs-12 col-md-2">
        <q-select
          v-model="courseStore.selectedCategory"
          :options="courseStore.categories"
          outlined
          label="Categoría"
          dense
          clearable
          emit-value
          map-options
        />
      </div>
      <div class="col-xs-12 col-md-2">
        <q-select
          v-model="courseStore.selectedType"
          :options="courseStore.types"
          outlined
          label="Tipo"
          dense
          clearable
          emit-value
          map-options
        />
      </div>
      <div class="col-xs-12 col-md-2">
        <q-btn
          unelevated
          label="Limpiar"
          color="grey-7"
          class="full-width"
          @click="courseStore.clearFilters()"
        />
      </div>
    </div>

    <!-- Resumen de resultados -->
    <div class="q-mb-md text-caption text-grey-7">
      {{ courseStore.filteredCourses.length }} curso(s) encontrado(s)
    </div>

    <!-- Lista de cursos -->
    <div v-if="courseStore.loading" class="text-center q-pa-xl">
      <q-spinner color="primary" size="50px" />
      <div class="q-mt-md">Cargando cursos...</div>
    </div>

    <div
      v-else-if="courseStore.filteredCourses.length === 0"
      class="text-center q-pa-xl text-h6 text-grey-6"
    >
      No se encontraron cursos con los filtros aplicados.
    </div>

    <div v-else class="row q-col-gutter-lg">
      <div
        v-for="course in courseStore.filteredCourses"
        :key="course.id"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-card flat class="bg-white shadow-2 column full-height">
          <q-img v-if="course.img" :src="course.img" height="150px" />

          <q-card-section class="col-grow">
            <div class="text-overline text-primary">{{ course.category }}</div>
            <div class="text-h6 q-mt-sm">{{ course.title }}</div>
            <div class="text-caption text-grey-7">{{ course.description }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="schedule" size="xs" color="blue-grey-4" />
              <div class="text-caption text-blue-grey-4">{{ course.time }}</div>
            </div>
            <div class="row items-center q-gutter-sm">
              <q-icon name="star" size="xs" color="amber" />
              <div class="text-caption text-grey-7">
                {{ course.rating }} ({{ course.reviews }} reseñas)
              </div>
            </div>
            <div v-if="course.price" class="text-h6 text-primary q-mt-md">${{ course.price }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Detalles" color="primary" @click="viewCourseDetails(course)" />
            <q-btn
              unelevated
              :label="isEnrolled(course.id) ? 'Inscrito' : 'Inscribirse'"
              :color="isEnrolled(course.id) ? 'grey-7' : 'green-7'"
              @click="toggleEnroll(course)"
              :loading="courseStore.loading"
              :disable="isEnrolled(course.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Dialog para detalles de curso -->
    <q-dialog v-model="showCourseDetail" position="bottom">
      <q-card style="min-width: 400px; max-width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedCourse?.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-md text-center">
          <q-img v-if="selectedCourse?.img" :src="selectedCourse.img" height="200px" />
          <div class="q-mt-md text-left">
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold">Descripción</div>
              <div class="text-grey-7">{{ selectedCourse?.description }}</div>
            </div>
            <div class="row q-gutter-lg">
              <div class="col">
                <div class="text-caption text-grey-6">Duración</div>
                <div class="text-subtitle1">{{ selectedCourse?.time }}</div>
              </div>
              <div class="col">
                <div class="text-caption text-grey-6">Calificación</div>
                <div class="text-subtitle1">{{ selectedCourse?.rating }} ⭐</div>
              </div>
              <div class="col" v-if="selectedCourse?.price">
                <div class="text-caption text-grey-6">Precio</div>
                <div class="text-subtitle1">${{ selectedCourse.price }}</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" v-close-popup />
          <q-btn
            unelevated
            :label="isEnrolled(selectedCourse?.id) ? 'Ya Inscrito' : 'Inscribirse Ahora'"
            :color="isEnrolled(selectedCourse?.id) ? 'grey-7' : 'green-7'"
            @click="toggleEnroll(selectedCourse)"
            :disable="isEnrolled(selectedCourse?.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useCourseStore } from 'src/stores/courses'

const $q = useQuasar()
const courseStore = useCourseStore()

const showCourseDetail = ref(false)
const selectedCourse = ref(null)

// Cargar cursos al montar
onMounted(async () => {
  const result = await courseStore.fetchCourses()
  if (!result.success && courseStore.error) {
    $q.notify({
      type: 'negative',
      message: courseStore.error,
      position: 'top',
    })
  }
})

// Verificar si está inscrito
const isEnrolled = (courseId) => {
  return courseStore.enrolledCourses.some((c) => c.id === courseId)
}

// Toggle inscription
const toggleEnroll = async (course) => {
  if (isEnrolled(course.id)) {
    // Desinscribir
    const confirm = await new Promise((resolve) => {
      $q.dialog({
        title: 'Desinscribirse',
        message: `¿Seguro que quieres desinscribirse de "${course.title}"?`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => resolve(true))
        .onCancel(() => resolve(false))
    })

    if (confirm) {
      const result = await courseStore.unenrollCourse(course.id)
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Te has desinscrito del curso.',
          position: 'top',
        })
      } else {
        $q.notify({
          type: 'negative',
          message: result.error || 'Error al desinscribirse.',
          position: 'top',
        })
      }
    }
  } else {
    // Inscribir
    const result = await courseStore.enrollCourse(course.id)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: `¡Te has inscrito a "${course.title}"!`,
        position: 'top',
        timeout: 2000,
      })
      showCourseDetail.value = false
    } else {
      $q.notify({
        type: 'negative',
        message: result.error || 'Error al inscribirse.',
        position: 'top',
      })
    }
  }
}

// Ver detalles de curso
const viewCourseDetails = (course) => {
  selectedCourse.value = course
  showCourseDetail.value = true
}
</script>
