<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Reportes y Análisis</h1>
        <p class="text-caption text-grey-7">Análisis de tu desarrollo profesional</p>
      </div>
      <q-btn
        flat
        icon="download"
        label="Descargar Reporte"
        color="primary"
        @click="descargarReporte"
      />
    </div>

    <q-tabs v-model="tabActual" dense class="q-mb-lg" indicator-color="primary">
      <q-tab name="skills" label="Inventario de Skills" icon="trending_up" />
      <q-tab name="brechas" label="Brechas Identificadas" icon="warning" />
      <q-tab name="aplicaciones" label="Aplicaciones" icon="work" />
      <q-tab name="puntos" label="Historial de Puntos" icon="star" />
    </q-tabs>

    <q-tab-panels v-model="tabActual" animated>
      <!-- Inventario de Skills -->
      <q-tab-panel name="skills">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">Tus Skills por Categoría</div>
            <q-table
              :rows="skillsPorCategoria"
              :columns="columnasSkills"
              flat
              bordered
              row-key="categoria"
            />
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Brechas -->
      <q-tab-panel name="brechas">
        <div class="row q-col-gutter-lg">
          <div v-for="brecha in brechas" :key="brecha.id" class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <div class="text-h6 q-mb-md">{{ brecha.skill }}</div>
                <p class="text-subtitle2 text-grey-7">{{ brecha.descripcion }}</p>
                <q-linear-progress :value="brecha.nivel / 100" color="warning" size="12px" />
                <p class="text-caption q-mt-sm">{{ brecha.nivel }}% - {{ brecha.estado }}</p>
                <q-btn
                  flat
                  label="Ver cursos recomendados"
                  color="primary"
                  size="sm"
                  class="q-mt-md"
                  @click="verCursosRecomendados(brecha.skill)"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Aplicaciones -->
      <q-tab-panel name="aplicaciones">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">Historial de Aplicaciones</div>
            <q-table
              :rows="aplicacionesHistorial"
              :columns="columnasAplicaciones"
              flat
              bordered
              row-key="id"
            >
              <template v-slot:body-cell-estado="props">
                <q-td :props="props">
                  <q-badge :label="props.row.estado" :color="getColorEstado(props.row.estado)" />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Puntos -->
      <q-tab-panel name="puntos">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-md-4">
            <q-card>
              <q-card-section class="text-center">
                <div class="text-h2 text-weight-bold text-primary">{{ puntosTotales }}</div>
                <div class="text-subtitle2 text-grey-7">Puntos Totales</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-xs-12 col-md-8">
            <q-card>
              <q-card-section>
                <div class="text-h6 q-mb-md">Top Actividades por Puntos</div>
                <q-list>
                  <q-item v-for="(act, idx) in topActividades" :key="idx">
                    <q-item-section avatar>
                      <q-icon :name="act.icono" :color="act.color" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ act.nombre }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-weight-bold">+{{ act.puntos }} pts</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()

const tabActual = ref('skills')
const loading = ref(false)

const columnasSkills = [
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left' },
  { name: 'cantidad', label: 'Cantidad', field: 'cantidad', align: 'center' },
  { name: 'promedio', label: 'Nivel Promedio', field: 'promedio', align: 'center' },
]

const columnasAplicaciones = [
  { name: 'puesto', label: 'Puesto', field: 'puesto', align: 'left' },
  { name: 'empresa', label: 'Empresa', field: 'empresa', align: 'left' },
  { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'center' },
  { name: 'estado', label: 'Estado', field: 'estado', align: 'center' },
]

const skillsPorCategoria = ref([
  { categoria: 'Backend', cantidad: 5, promedio: '85%' },
  { categoria: 'Frontend', cantidad: 3, promedio: '75%' },
  { categoria: 'DevOps', cantidad: 2, promedio: '70%' },
  { categoria: 'Soft Skills', cantidad: 4, promedio: '90%' },
])

const brechas = ref([
  {
    id: 1,
    skill: 'Kubernetes',
    descripcion: 'Orquestación de contenedores',
    nivel: 35,
    estado: 'Crítica',
  },
  {
    id: 2,
    skill: 'Machine Learning',
    descripcion: 'Algoritmos y modelos predictivos',
    nivel: 50,
    estado: 'Alta',
  },
  {
    id: 3,
    skill: 'Liderazgo',
    descripcion: 'Gestión de equipos',
    nivel: 60,
    estado: 'Media',
  },
])

const aplicacionesHistorial = ref([
  {
    id: 1,
    puesto: 'Senior Backend Developer',
    empresa: 'Tech Company',
    fecha: '2025-01-15',
    estado: 'Rechazado',
  },
  {
    id: 2,
    puesto: 'DevOps Engineer',
    empresa: 'Cloud Services',
    fecha: '2025-01-10',
    estado: 'Pendiente',
  },
  {
    id: 3,
    puesto: 'Full Stack Developer',
    empresa: 'Startup XYZ',
    fecha: '2025-01-05',
    estado: 'Entrevista',
  },
])

const topActividades = ref([
  { nombre: 'Perfil completado', puntos: 50, icono: 'person', color: 'primary' },
  { nombre: 'Skill agregada', puntos: 20, icono: 'star', color: 'warning' },
  { nombre: 'Aplicación enviada', puntos: 10, icono: 'work', color: 'info' },
  { nombre: 'Certificación validada', puntos: 100, icono: 'verified', color: 'positive' },
])

const puntosTotales = computed(() => 1250)

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await cargarReportes()
  }
})

const cargarReportes = async () => {
  try {
    loading.value = true
    const colaboradorId = authStore.user?.id
    if (!colaboradorId) return

    // Cargar datos del backend cuando esté disponible
    // const data = await reporteService.getInventario(colaboradorId)
  } catch (error) {
    console.error('Error cargando reportes:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al cargar los reportes',
    })
  } finally {
    loading.value = false
  }
}

const descargarReporte = () => {
  $q.notify({
    type: 'positive',
    message: 'Descargando reporte en PDF...',
  })
  // Aquí iría la lógica para descargar el reporte
}

const verCursosRecomendados = (skill) => {
  $q.notify({
    type: 'info',
    message: `Cursos recomendados para: ${skill}`,
  })
}

const getColorEstado = (estado) => {
  const colorMap = {
    Rechazado: 'negative',
    Pendiente: 'warning',
    Entrevista: 'info',
    Aceptado: 'positive',
  }
  return colorMap[estado] || 'grey'
}
</script>

