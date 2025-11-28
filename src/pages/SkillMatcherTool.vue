<template>
  <q-layout view="lHh LpR fff" class="bg-grey-1 text-dark">

    <q-header class="bg-white text-dark q-py-xs shadow-2">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-weight-bold">
          <q-icon name="group" color="primary" class="q-mr-sm" />
          Buscador de habilidades de recursos humanos
        </q-toolbar-title>

        <q-space />

        <q-btn flat dense label="Hogar" class="q-mr-md" />
        <q-btn flat dense label="Empleos" class="q-mr-md" />
        <q-btn flat dense label="Candidatos" class="q-mr-md" color="primary" />
        <q-btn flat dense label="Ayuda" class="q-mr-md" />
        <q-icon name="person_outline" size="sm" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="row q-col-gutter-xl">
          <div class="col-xs-12 col-md-5">
            <q-card flat bordered class="q-pa-lg">
              <div class="text-h5 text-weight-bold q-mb-md">Requisitos del puesto</div>

              <q-list separator>
                <q-item v-for="(req, index) in jobRequirements" :key="index">
                  <q-item-section>
                    <q-item-label class="text-subtitle1">{{ req }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator class="q-my-md" />
              <q-btn unelevated label="Cambiar Vacante" color="primary" icon="search" class="full-width" />
            </q-card>
          </div>

          <div class="col-xs-12 col-md-7">
            <q-card flat bordered class="q-pa-lg">
              <div class="text-h5 text-weight-bold q-mb-md">Coincidencias de candidatos</div>
              <div class="text-caption text-grey-7 q-mb-lg">
                Se muestran solo candidatos con Disponibilidad "SI" y ≥ 80% de match.
              </div>

              <q-list separator>
                <q-item v-for="candidate in candidates" :key="candidate.name" class="q-py-md">
                  <q-item-section avatar>
                    <q-avatar size="lg">
                       <img :src="candidate.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-weight-bold">{{ candidate.name }}</q-item-label>
                    <q-item-label caption>{{ candidate.role }}</q-item-label>
                    <q-item-label class="text-weight-medium q-mt-sm">
                        <q-icon name="star" color="orange-8" size="xs" class="q-mr-xs" />
                        Match: <span :class="{'text-primary': candidate.fit >= 80, 'text-red': candidate.fit < 80}">{{ candidate.fit }}%</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn flat dense icon="info" color="primary" label="Ver Skills" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer class="bg-white text-grey-7 q-pa-sm text-caption">
      <div class="row justify-between">
        <div>© 2023 HR Skill Matcher</div>
        <div>Contacto</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SkillMatcherTool',
  setup () {
    // Requisitos simulados del puesto
    const jobRequirements = ref([
      'Habilidades avanzadas de JavaScript',
      'Experiencia con React.js',
      'Dominio de las API RESTful',
      'Sólidas habilidades para la resolución de problemas',
      'Excelentes habilidades de comunicación',
    ]);

    // Candidatos coincidentes (simulados)
    const candidates = ref([
      { name: 'Nicol', role: 'Desarrollador Frontend', fit: 95, avatar: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Eleazar', role: 'Desarrollador de JavaScript', fit: 88, avatar: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Braulio Coz', role: 'Desarrollador de Backend', fit: 80, avatar: 'https://cdn.quasar.dev/img/avatar.png' },
      // Se podría añadir un candidato que no cumpla con el 80% para ilustrar la condición (aunque no se mostraría en la lista final)
    ]);

    return {
      jobRequirements,
      candidates
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
