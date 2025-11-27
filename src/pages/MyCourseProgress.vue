<template>
  <q-layout view="lHh LpR fff" class="bg-white text-dark">

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-grey-2 text-dark"
    >
      <div class="q-pa-md text-h6 text-weight-bold">
        <q-icon name="apartment" size="sm" color="green-7" class="q-mr-sm" />
        HUB de Capacitación
      </div>

      <q-list class="q-pt-md">
        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>

        <q-separator spaced="md" />

        <q-item clickable v-ripple exact active-class="text-green-7 bg-green-2" class="bg-green-1 text-green-7 text-weight-bold">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Mis Cursos</q-item-section>
        </q-item>

        <q-separator spaced="md" />

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Mis Cursos</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-header class="bg-white text-dark q-py-xs">
      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="arrow_back" class="q-mr-md" />
        <q-btn flat dense icon="crop_square" class="q-mr-md" />
        <q-avatar size="sm" class="q-mr-sm bg-blue-grey-2 text-black text-weight-bold">JA</q-avatar>
        <q-btn flat dense icon="close" />
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="text-h4 text-weight-bold q-mb-sm">Mi Progreso en Curso</div>
        <div class="text-subtitle1 text-grey-7 q-mb-lg">
          Cursos relevantes para rol (Desarrollador de Software).
        </div>

        <div class="q-gutter-sm q-mb-xl">
          <q-btn unelevated label="En Curso" color="green-7" />
          <q-btn unelevated label="Completados" color="grey-6" />
        </div>

        <div class="row q-col-gutter-lg">
          <div v-for="course in courses" :key="course.id" class="col-xs-12 col-sm-6 col-md-4">
            <q-card class="bg-white q-pa-md shadow-3">
              <div class="text-h6 text-weight-bold">{{ course.title }}</div>
              <p class="text-caption text-grey-7 q-mt-sm">{{ course.description }}</p>
              <div class="row justify-between items-center q-mt-md">
                <div class="text-caption text-grey-7">{{ course.provider }}</div>
                <div class="text-caption text-grey-7">Aprox. {{ course.duration }}</div>
              </div>

              <div class="q-mt-md">
                <div v-if="course.progress > 0 && course.progress < 100">
                  <q-linear-progress :value="course.progress / 100" color="green-7" track-color="grey-3" style="height: 8px;" />
                  <div class="text-caption text-weight-bold q-mt-xs">
                    <q-icon :name="course.icon" size="sm" :color="course.iconColor" class="q-mr-xs" />
                    {{ course.providerName }} {{ course.progress }}% Completado
                  </div>
                </div>
                <div v-else>
                   <q-icon :name="course.icon" size="sm" :color="course.iconColor" class="q-mr-xs" />
                   <span class="text-caption text-weight-bold">{{ course.providerName }}</span>
                </div>
              </div>

              <div class="q-mt-md text-right">
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
  name: 'MyCourseProgress',
  setup () {
    const courses = ref([
      { id: 1, title: 'Desverolto con Spring Boot & Microservicios', description: 'Crea aplicaciones escalables con los patinos más demando.', provider: 'Udemy', duration: '24h', progress: 75, icon: 'mdi-school', iconColor: 'orange-8', providerName: 'udemy' },
      { id: 2, title: 'Arquittetura de Software Orientate a Dominios (DDD)', description: 'Aprende a diseñar sistemas y mentenibles.', provider: 'Platzi-Udemy', duration: '18h', progress: 0, icon: 'mdi-book-open-variant', iconColor: 'blue', providerName: 'Platzi-Udemy' },
      { id: 3, title: 'COURESRA', description: 'Aprende a desrrila robustas y mentelaes.', provider: 'Coursera', duration: '20h', progress: 0, icon: 'mdi-alpha-c-circle-outline', iconColor: 'blue', providerName: 'Platzi' },
      { id: 4, title: 'Cloud Computing con AWS: Nivel Profesional', description: 'Crea applications escalables con los patinos más demando.', provider: 'LinkedIn Learning', duration: '30h', progress: 30, icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
      { id: 5, title: 'Cloud Computing con AWS Profesional', description: 'Depoloja y gensiifria aplacions en la nube de Amazon.', provider: 'LinkedIn Learning', duration: '36h', progress: 0, icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
      { id: 6, title: 'Bases Datos NoSQL: MonGBOB & Cassodra', description: 'Explora alternativos a lo dattas relacionales.', provider: 'LinkedIn Learning', duration: '16h', progress: 0, icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
    ]);

    return {
      courses
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
