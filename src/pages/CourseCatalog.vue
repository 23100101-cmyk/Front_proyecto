<template>
  <q-layout view="lHh LpR fff" class="bg-dark text-white">

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-grey-10 text-white"
    >
      <div class="q-pa-md text-h6 text-weight-bold">
        <q-icon name="apartment" size="sm" color="green-6" class="q-mr-sm" />
        HUB de Capacitación
      </div>

      <q-list class="q-pt-md">
        <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9" class="q-pb-lg">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9" class="q-pb-lg">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9" class="q-pb-lg">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Mis Cursos</q-item-section>
        </q-item>

        <q-separator spaced="md" />

        <q-item clickable v-ripple exact active-class="text-green-6 bg-green-9" class="bg-green-7 text-white text-weight-bold">
          <q-item-section avatar><q-icon name="menu_book" /></q-item-section>
          <q-item-section>Catálogo de Cursos</q-item-section>
        </q-item>
      </q-list>

       <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9" class="absolute-bottom q-mb-md">
          <q-item-section avatar><q-icon name="tune" /></q-item-section>
          <q-item-section>Ajustes</q-item-section>
        </q-item>
    </q-drawer>

    <q-header class="bg-grey-10 text-white">
      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="arrow_back" class="q-mr-md" />
        <q-btn flat dense icon="crop_square" class="q-mr-md" />
        <q-avatar size="sm" class="q-mr-sm bg-blue-grey-2 text-black text-weight-bold">JA</q-avatar>
        <q-btn flat dense icon="close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="text-h4 text-weight-bold q-mb-sm">Catálogo de Curso</div>
        <div class="text-subtitle1 text-grey-5 q-mb-lg">
          Cursos relevantes para tu rol (Desarrollador Java) y plan de carrera (Arquitecto de Software).
        </div>

        <div class="row items-center q-mb-lg q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input dark outlined placeholder="Buscar cursos, temas o tecnologías...">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-auto">
            <q-btn unelevated label="Filtrar por Rol" icon="filter_alt" color="green-7" />
          </div>
          <div class="col-auto">
            <q-btn flat label="Filtrar por Tema" icon="add" color="grey-5" />
          </div>
        </div>

        <div class="row q-col-gutter-lg">
          <div v-for="course in courses" :key="course.id" class="col-xs-12 col-sm-6 col-md-4">
            <q-card dark class="bg-grey-9 q-pa-md">
              <div class="text-h6 text-weight-bold">{{ course.title }}</div>
              <p class="text-caption text-grey-5 q-mt-sm">{{ course.description }}</p>
              <div class="row justify-between items-center q-mt-md">
                <div class="text-caption text-grey-5">{{ course.provider }}</div>
                <div class="text-caption text-grey-5">Aprox. {{ course.duration }}</div>
              </div>

              <div class="row justify-between items-center q-mt-md">
                <div class="text-caption text-weight-bold">
                   <q-icon :name="course.icon" size="sm" :color="course.iconColor" class="q-mr-xs" />
                   {{ course.providerName }}
                </div>
                <q-btn unelevated label="Ver Detalles" color="green-7" />
              </div>
            </q-card>
          </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CourseCatalog',
  setup () {
    // Datos simulados para las tarjetas
    const courses = ref([
      { id: 1, title: 'Desverolto con Spring Boot & Microservicios', description: 'Crea applications escalables con los patinos más demando.', provider: 'Udemy', duration: '24h', icon: 'mdi-school', iconColor: 'orange-8', providerName: 'udemy' },
      { id: 2, title: 'Arquittetura de Software Orientate a Dominios (DDD)', description: 'Aprende a diseñar sistemas y mentenibles.', provider: 'Platzi', duration: '18h', icon: 'mdi-book-open-variant', iconColor: 'blue', providerName: 'Platzi-Udemy' },
      { id: 3, title: 'COURESRA', description: 'Aprende a desrrila robustas y mentelaes.', provider: 'Coursera', duration: '20h', icon: 'mdi-alpha-c-circle-outline', iconColor: 'blue', providerName: 'Platzi' },
      { id: 4, title: 'Cloud Computing con AWS: Nivel Profesional', description: 'Crea applications escalables con los patinos más demando.', provider: 'LinkedIn Learning', duration: '18h', icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'linkedin Learning' },
      { id: 5, title: 'Cloud Computing con AWS Profesional', description: 'Depoloja y gensiifria aplacions en la nube de Amazon.', provider: 'LinkedIn Learning', duration: '30h', icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
      { id: 6, title: 'Bases Datos NoSQL: MonGBOB & Cassodra', description: 'Explora alternativos a lo dattas relacionales.', provider: 'LinkedIn Learning', duration: '10h', icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
    ]);

    return {
      courses
    }
  }
}
</script>

<style scoped>
/* Añade estilos específicos aquí si son necesarios */
</style>
