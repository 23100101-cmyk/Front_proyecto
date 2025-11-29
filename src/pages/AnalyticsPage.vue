<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Analytics & KPIs</h1>
        <p class="text-caption text-grey-7">Métricas clave para la toma de decisiones</p>
      </div>
      <div class="row q-gutter-md">
        <q-select
          v-model="periodoSeleccionado"
          :options="['Últimos 30 días', 'Últimos 90 días', 'Este año']"
          outlined
          dense
          style="width: 200px"
        />
        <q-btn
          flat
          icon="refresh"
          label="Actualizar"
          color="primary"
          @click="cargarAnalytics"
          :loading="loading"
        />
      </div>
    </div>

    <!-- KPIs Principales -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-xs-12 col-md-3">
        <q-card class="bg-gradient-primary text-white">
          <q-card-section>
            <div class="text-h3 text-weight-bold">{{ kpis.vacantesCubiertas }}%</div>
            <div class="text-subtitle2">Vacantes Cubiertas Internamente</div>
            <q-linear-progress
              :value="kpis.vacantesCubiertas / 100"
              color="white"
              class="q-mt-md"
              style="height: 6px"
            />
            <p class="text-caption q-mt-sm">Meta: 80%</p>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-3">
        <q-card class="bg-gradient-positive text-white">
          <q-card-section>
            <div class="text-h3 text-weight-bold">{{ kpis.skillsCriticoCubiertos }}%</div>
            <div class="text-subtitle2">Skills Críticos Cubiertos</div>
            <q-linear-progress
              :value="kpis.skillsCriticoCubiertos / 100"
              color="white"
              class="q-mt-md"
              style="height: 6px"
            />
            <p class="text-caption q-mt-sm">Meta: 90%</p>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-3">
        <q-card class="bg-gradient-warning text-white">
          <q-card-section>
            <div class="text-h3 text-weight-bold">{{ kpis.brechasIdentificadas }}</div>
            <div class="text-subtitle2">Brechas Identificadas</div>
            <q-linear-progress
              :value="(kpis.brechasIdentificadas / 20) * 100"
              color="white"
              class="q-mt-md"
              style="height: 6px"
            />
            <p class="text-caption q-mt-sm">Total: 20</p>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-3">
        <q-card class="bg-gradient-info text-white">
          <q-card-section>
            <div class="text-h3 text-weight-bold">{{ kpis.participacionCapacitacion }}%</div>
            <div class="text-subtitle2">Participación Capacitación</div>
            <q-linear-progress
              :value="kpis.participacionCapacitacion / 100"
              color="white"
              class="q-mt-md"
              style="height: 6px"
            />
            <p class="text-caption q-mt-sm">Meta: 85%</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Tabs de Análisis Detallado -->
    <q-tabs v-model="tabActual" dense class="q-mb-lg" indicator-color="primary">
      <q-tab name="vacantes" label="Análisis de Vacantes" icon="work" />
      <q-tab name="skills" label="Inventario de Skills" icon="trending_up" />
      <q-tab name="brechas" label="Brechas por Área" icon="warning" />
      <q-tab name="capacitacion" label="Capacitación" icon="school" />
    </q-tabs>

    <q-tab-panels v-model="tabActual" animated>
      <!-- Análisis de Vacantes -->
      <q-tab-panel name="vacantes">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <h3 class="text-h6 q-mt-none">Vacantes por Estado</h3>
                <q-list separator>
                  <q-item v-for="v in vacantesPorEstado" :key="v.estado">
                    <q-item-section>
                      <q-item-label>{{ v.estado }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-weight-bold">{{ v.cantidad }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <h3 class="text-h6 q-mt-none">Cobertura Interna vs Externa</h3>
                <div class="row q-col-gutter-md q-mt-md">
                  <div class="col">
                    <div class="text-center">
                      <div class="text-h4 text-positive">{{ kpis.vacantesCubiertas }}%</div>
                      <p class="text-caption">
                        Internas ({{ kpis.vacantesCubiertasNum }}/{{ kpis.vacantesTotales }})
                      </p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="text-center">
                      <div class="text-h4 text-negative">{{ 100 - kpis.vacantesCubiertas }}%</div>
                      <p class="text-caption">Externas</p>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Inventario de Skills -->
      <q-tab-panel name="skills">
        <q-card>
          <q-card-section>
            <h3 class="text-h6 q-mt-none">Top 10 Skills Más Comunes</h3>
            <q-table
              :rows="skillsTop10"
              :columns="columnasSkills"
              flat
              bordered
              row-key="nombre"
              class="q-mt-md"
            >
              <template v-slot:body-cell-cobertura="props">
                <q-td :props="props">
                  <q-linear-progress
                    :value="props.row.cobertura / 100"
                    :color="props.row.cobertura >= 70 ? 'positive' : 'warning'"
                    size="8px"
                  />
                  <span class="q-ml-sm text-caption">{{ props.row.cobertura }}%</span>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Brechas por Área -->
      <q-tab-panel name="brechas">
        <div class="row q-col-gutter-lg">
          <div v-for="area in brechasPorArea" :key="area.nombre" class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <h3 class="text-h6">{{ area.nombre }}</h3>
                <q-list separator dense class="q-mt-md">
                  <q-item v-for="brecha in area.brechas" :key="brecha.skill">
                    <q-item-section>
                      <q-item-label>{{ brecha.skill }}</q-item-label>
                      <q-item-label caption>Severidad: {{ brecha.severidad }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-badge
                        :label="`${brecha.porcentajeFalta}% falta`"
                        :color="brecha.porcentajeFalta >= 50 ? 'negative' : 'warning'"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Capacitación -->
      <q-tab-panel name="capacitacion">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <h3 class="text-h6 q-mt-none">Cursos Más Solicitados</h3>
                <q-list separator class="q-mt-md">
                  <q-item v-for="(curso, idx) in cursosSolicitados" :key="idx">
                    <q-item-section avatar>
                      <q-badge :label="idx + 1" color="primary" floating />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ curso.nombre }}</q-item-label>
                      <q-item-label caption>{{ curso.inscritos }} inscritos</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-weight-bold">{{ curso.completados }}%</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <h3 class="text-h6 q-mt-none">Progreso de Capacitación por Área</h3>
                <q-list separator class="q-mt-md">
                  <q-item v-for="area in capacitacionPorArea" :key="area.area">
                    <q-item-section>
                      <q-item-label>{{ area.area }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-linear-progress :value="area.porcentaje / 100" color="primary" />
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-weight-bold">{{ area.porcentaje }}%</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Botón de Exportar Reporte -->
    <div class="q-mt-lg text-center">
      <q-btn
        flat
        label="Descargar Reporte Ejecutivo (PDF)"
        color="primary"
        icon="download"
        size="lg"
        @click="descargarReporteCompleto"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()

const loading = ref(false)
const tabActual = ref('vacantes')
const periodoSeleccionado = ref('Últimos 30 días')

// KPIs Principales
const kpis = ref({
  vacantesCubiertas: 75,
  vacantesCubiertasNum: 15,
  vacantesTotales: 20,
  skillsCriticoCubiertos: 85,
  brechasIdentificadas: 12,
  participacionCapacitacion: 78,
})

// Datos de Vacantes
const vacantesPorEstado = ref([
  { estado: 'Abiertas', cantidad: 5 },
  { estado: 'En Proceso', cantidad: 8 },
  { estado: 'Cubiertas', cantidad: 15 },
  { estado: 'Cerradas', cantidad: 2 },
])

// Columnas de tabla de skills
const columnasSkills = [
  { name: 'nombre', label: 'Skill', field: 'nombre', align: 'left' },
  { name: 'cantidad', label: 'Profesionales', field: 'cantidad', align: 'center' },
  { name: 'cobertura', label: 'Cobertura', field: 'cobertura', align: 'center' },
]

// Top 10 Skills
const skillsTop10 = ref([
  { nombre: 'Java', cantidad: 45, cobertura: 95 },
  { nombre: 'Python', cantidad: 38, cobertura: 92 },
  { nombre: 'JavaScript', cantidad: 42, cobertura: 90 },
  { nombre: 'SQL', cantidad: 50, cobertura: 98 },
  { nombre: 'Cloud AWS', cantidad: 28, cobertura: 65 },
  { nombre: 'Docker', cantidad: 25, cobertura: 60 },
  { nombre: 'Kubernetes', cantidad: 12, cobertura: 35 },
  { nombre: 'Machine Learning', cantidad: 8, cobertura: 25 },
  { nombre: 'React', cantidad: 35, cobertura: 88 },
  { nombre: 'Angular', cantidad: 20, cobertura: 55 },
])

// Brechas por Área
const brechasPorArea = ref([
  {
    nombre: 'Tecnología',
    brechas: [
      { skill: 'Kubernetes', severidad: 'Crítica', porcentajeFalta: 65 },
      { skill: 'ML/IA', severidad: 'Alta', porcentajeFalta: 75 },
      { skill: 'Blockchain', severidad: 'Media', porcentajeFalta: 85 },
    ],
  },
  {
    nombre: 'Operaciones',
    brechas: [
      { skill: 'Analytics', severidad: 'Alta', porcentajeFalta: 60 },
      { skill: 'Power BI', severidad: 'Media', porcentajeFalta: 70 },
      { skill: 'SAP', severidad: 'Alta', porcentajeFalta: 80 },
    ],
  },
])

// Cursos Más Solicitados
const cursosSolicitados = ref([
  { nombre: 'Cloud Computing AWS', inscritos: 85, completados: 72 },
  { nombre: 'Kubernetes & Containers', inscritos: 62, completados: 45 },
  { nombre: 'Machine Learning Básico', inscritos: 48, completados: 38 },
  { nombre: 'Python Avanzado', inscritos: 95, completados: 78 },
  { nombre: 'Liderazgo Técnico', inscritos: 56, completados: 52 },
])

// Capacitación por Área
const capacitacionPorArea = ref([
  { area: 'Tecnología', porcentaje: 82 },
  { area: 'Operaciones', porcentaje: 65 },
  { area: 'Finanzas', porcentaje: 71 },
  { area: 'Recursos Humanos', porcentaje: 88 },
  { area: 'Ventas', porcentaje: 58 },
])

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await cargarAnalytics()
  }
})

const cargarAnalytics = async () => {
  try {
    loading.value = true
    // Aquí iría la carga desde el backend
    // const data = await analyticsService.getKPIs(periodoSeleccionado.value)
    $q.notify({
      type: 'positive',
      message: 'Analytics actualizados',
      position: 'top',
      timeout: 1500,
    })
  } catch (error) {
    console.error('Error cargando analytics:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al cargar los analytics',
    })
  } finally {
    loading.value = false
  }
}

const descargarReporteCompleto = () => {
  $q.notify({
    type: 'positive',
    message: 'Descargando reporte ejecutivo...',
  })
  // Aquí iría la lógica para descargar el reporte PDF
}
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-positive {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.bg-gradient-warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bg-gradient-info {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
</style>
