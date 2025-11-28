<template>
  <q-page class="q-pa-xl">
    <div class="text-h4 text-weight-bold q-mb-sm">Mi Progreso en Cursos</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">
      Cursos relevantes para el rol (Desarrollador de Software).
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
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyCourseProgress',
  setup () {
    const courses = ref([
      { id: 1, title: 'Desarrollo con Spring Boot y Microservicios', description: 'Crea aplicaciones escalables con los patrones más demandados del mercado.', provider: 'Udemy', duration: '24h', progress: 75, icon: 'mdi-school', iconColor: 'orange-8', providerName: 'Udemy' },
      { id: 2, title: 'Arquitectura de Software Orientada a Dominios (DDD)', description: 'Aprende a diseñar sistemas robustos y fáciles de mantener.', provider: 'Platzi / Udemy', duration: '18h', progress: 0, icon: 'mdi-book-open-variant', iconColor: 'blue', providerName: 'Platzi-Udemy' },
      { id: 3, title: 'Coursera: Desarrollo de Habilidades', description: 'Aprende a desarrollar soluciones robustas y con metodología.', provider: 'Coursera', duration: '20h', progress: 0, icon: 'mdi-alpha-c-circle-outline', iconColor: 'blue', providerName: 'Coursera' },
      { id: 4, title: 'Cloud Computing con AWS: Nivel Profesional', description: 'Adquiere experiencia avanzada en la gestión de servicios Cloud de AWS.', provider: 'LinkedIn Learning', duration: '30h', progress: 30, icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
      { id: 5, title: 'Cloud Computing con AWS (Profesional)', description: 'Despliega y gestiona aplicaciones en la nube de Amazon.', provider: 'LinkedIn Learning', duration: '36h', progress: 0, icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
      { id: 6, title: 'Bases de Datos NoSQL: MongoDB y Cassandra', description: 'Explora alternativas a los modelos de datos relacionales tradicionales.', provider: 'LinkedIn Learning', duration: '16h', progress: 0, icon: 'mdi-linkedin', iconColor: 'blue-5', providerName: 'LinkedIn Learning' },
    ]);

    return {
      courses
    }
  }
}
</script>
