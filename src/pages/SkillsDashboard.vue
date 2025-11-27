<template>
  <q-layout view="lHh LpR fff">

    <q-drawer
      show-if-above
      :width="250"
      :breakpoint="500"
      side="left"
      class="bg-white"
    >
      <div class="text-h6 q-pa-md text-weight-bold">Inventario de Skills</div>
      <q-list class="q-pt-md">
        <q-item clickable v-ripple active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-expansion-item default-opened icon="filter_list" label="Filtros" class="text-weight-bold">
          <q-list dense>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Área</q-item-section></q-item>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Rol</q-item-section></q-item>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Habilidad</q-item-section></q-item>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Colaboradores</q-item-section></q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item default-opened icon="bar_chart" label="Niveles" class="text-weight-bold">
          <q-list dense>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Gráfico</q-item-section></q-item>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Distribución</q-item-section></q-item>
            <q-item clickable v-ripple><q-item-section class="q-pl-lg">Exportador</q-item-section></q-item>
          </q-list>
        </q-expansion-item>

        <q-separator spaced="lg" />

        <q-item clickable v-ripple active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="help_outline" /></q-item-section>
          <q-item-section>Ayuda</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-header class="bg-white text-dark q-py-sm">
      <q-toolbar>
        <div class="q-mr-xl">
          <q-input dense outlined placeholder="Buscar skill" style="min-width: 200px;">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <q-space />

        <q-btn unelevated label="Exportador" color="black" class="q-mr-md" />
        <q-icon name="notifications" size="sm" class="q-mr-sm" />
        <q-icon name="person" size="sm" class="q-mr-sm" />
        <q-avatar size="md">
           <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">

        <div class="text-h4 text-weight-bold q-mb-md">Colaboradores</div>

        <q-card flat bordered class="q-pa-md q-mb-lg">
          <div class="text-h6 q-mb-md">Distribución de habilidades</div>
          <div class="row q-col-gutter-lg items-end">
            <div class="col-xs-6 col-sm-3 text-center">
              <q-icon name="filter_1" size="lg" />
              <div class="text-h5 text-weight-bold q-mt-sm">Básico</div>
              <div class="text-caption text-grey">Niveles de Dominio</div>
              <q-btn flat dense label="Ver más" color="primary" class="q-mt-xs" />
            </div>

            <div class="col-xs-6 col-sm-3 text-center">
              <q-icon name="filter_2" size="lg" />
              <div class="text-h5 text-weight-bold q-mt-sm">40%</div>
              <div class="text-caption text-grey">Intermedio</div>
              <q-btn flat dense label="actualizado" color="grey" class="q-mt-xs" />
            </div>

            <div class="col-xs-6 col-sm-3 text-center">
              <q-icon name="filter_3" size="lg" />
              <div class="text-h5 text-weight-bold q-mt-sm">35%</div>
              <div class="text-caption text-grey">Avanzado</div>
              <q-btn flat dense label="Filtro" color="grey" class="q-mt-xs" />
            </div>

            <div class="col-xs-6 col-sm-3 text-center">
              <q-icon name="calculate" size="lg" />
              <div class="text-h5 text-weight-bold q-mt-sm">25%</div>
              <div class="text-caption text-grey">Total</div>
              <q-btn flat dense label="Exportador" color="grey" class="q-mt-xs" />
            </div>
          </div>
        </q-card>

        <div class="row q-col-gutter-lg q-mb-lg">
          <div class="col-xs-12 col-md-8">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle1 q-mb-sm">Tabla de</div>
              <div class="text-caption text-grey">6 Meses</div>

              <div style="height: 250px; background-color: #f5f5f5;" class="q-mt-md flex flex-center">
                              </div>
            </q-card>
          </div>

          <div class="col-xs-12 col-md-4">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle1 text-weight-bold q-mb-md">Colaboradores principales</div>
              <q-list separator dense>
                <q-item><q-item-section>Juan Pérez</q-item-section><q-item-section side>75%</q-item-section></q-item>
                <q-item><q-item-section>Ana Gómez</q-item-section><q-item-section side>60%</q-item-section></q-item>
                <q-item><q-item-section>Luis Martínez</q-item-section><q-item-section side>80%</q-item-section></q-item>
                <q-item><q-item-section>Marta López</q-item-section><q-item-section side>90%</q-item-section></q-item>
                <q-item><q-item-section>Carlos Ruíz</q-item-section><q-item-section side>70%</q-item-section></q-item>
                <q-item><q-item-section>Sofía Torres</q-item-section><q-item-section side>55%</q-item-section></q-item>
              </q-list>
            </q-card>
          </div>
        </div>

        <q-card flat bordered class="q-pa-md">
          <q-table
            :rows="skillsData"
            :columns="skillsColumns"
            row-key="habilidad"
            hide-pagination
            :rows-per-page-options="[0]"
          >
            <template v-slot:body-cell-dominio="props">
              <q-td :props="props">
                <div class="row items-center q-gutter-sm">
                    <q-btn unelevated dense label="Exportador" color="grey-3" text-color="black" size="sm" />
                    <span>{{ props.value }}</span>
                </div>
              </q-td>
            </template>
             <template v-slot:body-cell-activo="props">
              <q-td :props="props">
                <div :class="{'text-positive': props.value === 'Activo', 'text-negative': props.value === 'No Activo'}">
                    {{ props.value }}
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// Datos para la tabla inferior
const skillsColumns = [
  { name: 'habilidad', required: true, label: 'Habilidad', align: 'left', field: 'habilidad', sortable: true },
  { name: 'activo', label: 'Gráfico', align: 'left', field: 'activo', sortable: true },
  { name: 'cantidad', label: 'Cantidad de habilidades', align: 'left', field: 'cantidad', sortable: true },
  { name: 'dominio', label: 'Dominio', align: 'left', field: 'dominio' },
];

const skillsData = [
  {
    habilidad: 'Habilidad - 101',
    activo: 'No Activo',
    cantidad: 150,
    dominio: '+10%',
  },
  {
    habilidad: 'Habilidad - 303',
    activo: 'Activo',
    cantidad: 100,
    dominio: '+12%',
  },
  // Añade más datos aquí si los necesitas
];

export default {
  name: 'SkillsDashboard',
  setup () {
    return {
      skillsColumns,
      skillsData
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
