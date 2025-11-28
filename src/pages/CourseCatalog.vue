<template>
  <q-page class="q-pa-xl">
    <div class="text-h4 text-weight-bold q-mb-md">Explorar Cursos</div>
    <div class="text-subtitle1 text-grey-7 q-mb-xl">Encuentra tu próxima certificación o habilidad.</div>

    <div class="row q-col-gutter-md q-mb-xl items-center">
        <div class="col-xs-12 col-md-4">
            <q-input outlined v-model="searchText" label="Buscar por título o habilidad" dense>
                <template v-slot:append><q-icon name="search" /></template>
            </q-input>
        </div>
         <div class="col-xs-12 col-md-3">
            <q-select outlined v-model="selectedCategory" :options="categoryOptions" label="Categoría" dense clearable />
        </div>
        <div class="col-xs-12 col-md-3">
            <q-select outlined v-model="selectedType" :options="typeOptions" label="Tipo" dense clearable />
        </div>
        <div class="col-xs-12 col-md-2">
            <q-btn unelevated label="Aplicar Filtros" color="primary" class="full-width" />
        </div>
    </div>

    <div class="row q-col-gutter-lg">
      <div v-for="course in filteredCourses" :key="course.title" class="col-xs-12 col-sm-6 col-md-4">
        <q-card flat class="bg-white shadow-2">
          <q-img :src="course.img" height="150px" />

          <q-card-section>
            <div class="text-overline text-primary">{{ course.category }}</div>
            <div class="text-h6 q-mt-sm">{{ course.title }}</div>
            <div class="text-caption text-grey-7">{{ course.description }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="schedule" size="xs" color="blue-grey-4" />
              <div class="text-caption text-blue-grey-4">{{ course.time }}</div>
            </div>
            <div class="row items-center q-gutter-sm">
                <q-icon name="star" size="xs" color="amber" />
                <div class="text-caption text-grey-7">{{ course.rating }} ({{ course.reviews }} reseñas)</div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Ver Detalles" color="primary" />
            <q-btn unelevated label="Inscribirme" color="green-7" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-if="filteredCourses.length === 0" class="text-center q-pa-xl text-h6 text-grey-6">
        No se encontraron cursos con los filtros aplicados.
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchText = ref('')
const selectedCategory = ref(null)
const selectedType = ref(null)
const categoryOptions = ['Liderazgo', 'Ventas', 'Técnico', 'Habilidades Blandas']
const typeOptions = ['Certificación', 'Curso Corto', 'Clase en Vivo']

const allCourses = ref([
  { title: 'Gestión de Proyectos Ágil', description: 'Metodología Scrum y Kanban.', category: 'Técnico', type: 'Certificación', time: '40 horas', rating: 4.8, reviews: 150, img: 'https://cdn.quasar.dev/img/material.png' },
  { title: 'Negociación Estratégica', description: 'Técnicas avanzadas de cierre.', category: 'Ventas', type: 'Curso Corto', time: '10 horas', rating: 4.5, reviews: 80, img: 'https://cdn.quasar.dev/img/parallax1.jpg' },
  { title: 'Liderazgo Transformacional', description: 'Inspira y motiva a tu equipo.', category: 'Liderazgo', type: 'Certificación', time: '30 horas', rating: 4.9, reviews: 200, img: 'https://cdn.quasar.dev/img/parallax2.jpg' },
  { title: 'Comunicación Asertiva', description: 'Claves para mensajes claros.', category: 'Habilidades Blandas', type: 'Clase en Vivo', time: '5 horas', rating: 4.7, reviews: 120, img: 'https://cdn.quasar.dev/img/mountains.jpg' },
])

const filteredCourses = computed(() => {
    return allCourses.value.filter(course => {
        const matchesSearch = !searchText.value || course.title.toLowerCase().includes(searchText.value.toLowerCase()) || course.description.toLowerCase().includes(searchText.value.toLowerCase())
        const matchesCategory = !selectedCategory.value || course.category === selectedCategory.value
        const matchesType = !selectedType.value || course.type === selectedType.value
        return matchesSearch && matchesCategory && matchesType
    })
})
</script>
