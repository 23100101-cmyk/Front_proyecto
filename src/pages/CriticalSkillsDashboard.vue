<template>
  <q-layout view="lHh LpR fff">

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-white"
    >
      <div class="q-pa-md">
        <q-icon name="apartment" size="lg" color="grey-7" />
      </div>

      <q-list class="q-pt-md">
        <q-item clickable v-ripple active-class="text-primary bg-blue-1" class="q-pb-lg">
          <q-item-section avatar><q-icon name="map" /></q-item-section>
          <q-item-section>Inventario y Mapeo</q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="text-primary bg-blue-1" class="q-pb-lg">
          <q-item-section avatar><q-icon name="expand_more" /></q-item-section>
          <q-item-section>Área, Rol, Habilidad</q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="text-primary bg-blue-1" class="q-pb-lg">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section>Colaboradores</q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="text-primary bg-blue-1" class="q-pb-lg">
          <q-item-section avatar><q-icon name="poll" /></q-item-section>
          <q-item-section>Dominio Consolidado</q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="text-primary bg-blue-1" class="q-pb-lg">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Configuración</q-item-section>
        </q-item>

        <q-separator spaced="xl" />

        <q-item clickable v-ripple active-class="text-primary bg-blue-1" class="absolute-bottom q-mb-md">
          <q-item-section avatar><q-icon name="tune" /></q-item-section>
          <q-item-section>Ajustes</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-input dense outlined placeholder="Filter" class="q-mr-md" style="min-width: 300px;">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <q-icon name="notifications" size="sm" class="q-mr-lg text-grey-7" />
        <q-icon name="person" size="sm" class="q-mr-lg text-grey-7" />
        <q-btn flat dense icon="arrow_drop_down" label="Análisis de" class="q-mr-sm" />
        <q-avatar size="md">
           <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg">

        <div class="text-h5 text-weight-bold q-mb-lg">Déficit de habilidades críticas</div>

        <div class="row q-col-gutter-lg">

          <div class="col-xs-12 col-md-7">

            <div class="row q-col-gutter-lg q-mb-lg">

              <div class="col-xs-12 col-sm-4">
                <q-card flat bordered class="q-pa-md text-center">
                  <div class="text-h4 text-weight-bold text-negative">-40%</div>
                  <div class="text-caption text-grey">de cobertura</div>
                  <div class="text-subtitle1 text-weight-bold q-mt-sm">Se requiere</div>
                  <div class="text-caption text-grey">vs. el mes pasado</div>
                </q-card>
              </div>

              <div class="col-xs-12 col-sm-4">
                <q-card flat bordered class="q-pa-md">
                  <div class="row justify-between items-center q-mb-sm">
                     <div class="text-h4 text-weight-bold text-primary">3</div>
                     <q-icon name="more_vert" color="grey" size="sm" />
                  </div>
                  <div class="text-subtitle1 text-weight-bold">vacantes</div>
                  <div class="text-caption text-grey">vs. semana anterior</div>
                  <q-linear-progress :value="0.6" color="primary" class="q-mt-sm" />
                </q-card>
              </div>

               <div class="col-xs-12 col-sm-4">
                <q-card flat bordered class="q-pa-md">
                  <div class="row justify-between items-center q-mb-sm">
                     <div class="text-h4 text-weight-bold text-negative">70</div>
                     <q-icon name="more_vert" color="grey" size="sm" />
                  </div>
                  <div class="text-subtitle1 text-weight-bold">alertas de</div>
                  <div class="text-caption text-grey">12 de diciembre de 202X</div>
                   <q-linear-progress :value="0.8" color="negative" class="q-mt-sm" />
                </q-card>
              </div>

            </div>

            <q-card flat bordered class="q-pa-md q-mb-lg">
              <div class="text-subtitle1 text-weight-bold q-mb-md">Vacantes actuales</div>
              <div class="row items-end" style="height: 150px;">
                <div v-for="n in 6" :key="n" class="col text-center q-px-sm">
                  <div class="bg-blue-grey-2" :style="{height: (n % 2 === 0 ? 100 : 70) + 'px'}" style="width: 100%;"></div>
                  <div class="bg-primary" :style="{height: (n % 2 === 0 ? 50 : 80) + 'px'}" style="width: 100%; opacity: 0.8;"></div>
                  <div class="text-caption text-grey-7 q-mt-xs">{{ ['Ingeniero', 'Gerente de', 'Analista', 'Diseñador UX', 'Especialist', 'Gerente de'][n-1] }}</div>
                </div>
              </div>
            </q-card>

            <div class="row q-col-gutter-lg q-mb-lg">
              <div class="col-xs-12 col-sm-6">
                 <q-card flat bordered class="q-pa-md">
                   <div class="text-subtitle1 text-weight-bold q-mb-sm">Salarios totales</div>
                   <div class="row justify-between items-center">
                     <div class="text-h5 text-weight-bold">$120,000</div>
                     <q-icon name="arrow_upward" color="positive" />
                   </div>
                   <div class="text-caption text-grey">vs. el mes anterior</div>
                 </q-card>
              </div>
              <div class="col-xs-12 col-sm-6">
                 <q-card flat bordered class="q-pa-md">
                   <div class="text-subtitle1 text-weight-bold q-mb-sm">Costos totales de</div>
                   <div class="row justify-between items-center">
                     <div class="text-h5 text-weight-bold text-negative">$15,000</div>
                     <q-icon name="arrow_upward" color="negative" />
                   </div>
                   <div class="text-caption text-grey">vs. el mes pasado</div>
                 </q-card>
              </div>
            </div>

            <q-card flat bordered class="q-pa-md q-mb-lg">
              <div class="text-subtitle1 text-weight-bold q-mb-md">Calidad del flujo de trabajo</div>
               <div class="row items-end" style="height: 150px;">
                <div v-for="n in 3" :key="n" class="col text-center q-px-md">
                  <div class="bg-blue-grey-2" :style="{height: (n === 2 ? 60 : 90) + 'px'}" style="width: 100%;"></div>
                  <div class="bg-primary" :style="{height: (n === 2 ? 100 : 70) + 'px'}" style="width: 100%; opacity: 0.8;"></div>
                  <div class="text-caption text-grey-7 q-mt-xs">{{ ['Eficacia del entrenamiento', 'Índice de satisfacción', 'Índice de Compromiso'][n-1] }}</div>
                </div>
              </div>
            </q-card>

          </div>

          <div class="col-xs-12 col-md-5">
            <q-card flat bordered class="q-pa-md q-mb-lg">
              <div class="text-subtitle1 text-weight-bold q-mb-md">Alertas críticas de</div>
              <q-list separator dense>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1">Nuevo puesto: Ingeniero de Software</q-item-label>
                    <q-item-label caption>Hace 5 minutos</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-icon name="more_vert" color="grey" size="sm" /></q-item-section>
                </q-item>
                 <q-item>
                  <q-item-section>
                    <q-item-label lines="1">Urgente: Gerente de Marketing</q-item-label>
                    <q-item-label caption>Hace 5 minutos</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-icon name="more_vert" color="grey" size="sm" /></q-item-section>
                </q-item>
                 <q-item>
                  <q-item-section>
                    <q-item-label lines="1">Vacante: Analista de datos</q-item-label>
                    <q-item-label caption>Hace 5 minutos</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-icon name="more_vert" color="grey" size="sm" /></q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1">Urgente: Diseñador UX</q-item-label>
                    <q-item-label caption>Hace 5 minutos</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-icon name="more_vert" color="grey" size="sm" /></q-item-section>
                </q-item>
              </q-list>
              <q-btn flat dense label="Ver todas las alertas" color="primary" class="q-mt-md full-width" />
            </q-card>

            <q-card flat class="q-pa-md text-white" style="background-color: #4a5c70;">
              <div class="text-subtitle1 text-weight-bold q-mb-md">Actividades recientes</div>
              <div class="q-mb-md">
                <div class="text-caption">10:40 a.m., Viernes 10 de septiembre de 2023</div>
                <div class="text-body2">Se ha publicado un nuevo puesto de trabajo.</div>
                <div class="text-caption">Revisa los detalles y requisitos del puesto.</div>
              </div>
              <div class="q-mb-md">
                <div class="text-caption">10:40 a.m., Viernes 10 de septiembre de 2023</div>
                <div class="text-body2">Se ha publicado un nuevo puesto de trabajo.</div>
                <div class="text-caption">Revisa los detalles y requisitos del puesto.</div>
              </div>
              <div class="q-mt-xl">
                 <div class="text-caption">Hoy completaste 5 tareas</div>
                 <q-btn unelevated label="Ver todas las tareas" color="primary" class="q-mt-sm full-width" />
              </div>
            </q-card>
          </div>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'CriticalSkillsDashboard'
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
