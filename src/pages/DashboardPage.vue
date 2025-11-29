<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Dashboard de Desarrollo</h1>
        <p class="text-caption text-grey-7">Resumen de tu progreso profesional</p>
      </div>
      <q-btn
        flat
        icon="refresh"
        label="Actualizar"
        color="primary"
        @click="refrescarDatos"
        :loading="loading"
      />
    </div>

    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-xs-12 col-md-3">
        <q-card class="bg-primary text-white">
          <q-card-section>
            <div class="text-h2 text-weight-bold">{{ puntosTotales }}</div>
            <div class="text-subtitle2">Puntos Acumulados</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-3">
        <q-card class="bg-positive text-white">
          <q-card-section>
            <div class="text-h2 text-weight-bold">{{ skillsCount }}</div>
            <div class="text-subtitle2">Skills</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-3">
        <q-card class="bg-info text-white">
          <q-card-section>
            <div class="text-h2 text-weight-bold">{{ cursosActivos }}</div>
            <div class="text-subtitle2">Cursos en Progreso</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-3">
        <q-card class="bg-warning text-white">
          <q-card-section>
            <div class="text-h2 text-weight-bold">{{ aplicacionesCount }}</div>
            <div class="text-subtitle2">Aplicaciones</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-md-6">
        <q-card>
          <q-card-section>
            <h3 class="text-h6 q-mt-none">Perfil Completado</h3>
            <q-linear-progress :value="profileCompletion / 100" color="primary" size="12px" />
            <p class="text-caption text-grey-7 q-mt-sm">{{ profileCompletion }}% completado</p>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6">
        <q-card>
          <q-card-section>
            <h3 class="text-h6 q-mt-none">Próximas Acciones</h3>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="school" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Completar curso de Cloud</q-item-label>
                  <q-item-label caption>En progreso</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="work" color="positive" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Aplicar a vacantes destacadas</q-item-label>
                  <q-item-label caption>5 vacantes disponibles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card class="q-mt-lg">
      <q-card-section>
        <h3 class="text-h6">Historial Reciente</h3>
        <q-list separator>
          <q-item v-for="(item, idx) in historialReciente" :key="idx">
            <q-item-section avatar>
              <q-icon :name="item.icono" :color="item.color" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.titulo }}</q-item-label>
              <q-item-label caption>{{ item.descripcion }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>{{ item.fecha }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useColaboradorStore } from 'src/stores/colaborador'
import { useAuthStore } from 'src/stores/auth'

const colaboradorStore = useColaboradorStore()
const authStore = useAuthStore()

const loading = ref(false)
const skillsCount = ref(0)
const cursosActivos = ref(0)
const aplicacionesCount = ref(0)

const puntosTotales = computed(() => colaboradorStore.puntos?.total || 0)
const profileCompletion = computed(() => colaboradorStore.profileCompleteness || 0)

const historialReciente = ref([
  {
    icono: 'star',
    color: 'warning',
    titulo: 'Skill agregada',
    descripcion: 'Agregaste Python a tu perfil',
    fecha: 'Hoy',
  },
  {
    icono: 'school',
    color: 'info',
    titulo: 'Curso iniciado',
    descripcion: 'Iniciaste Cloud Computing con AWS',
    fecha: 'Ayer',
  },
  {
    icono: 'favorite',
    color: 'negative',
    titulo: 'Match encontrado',
    descripcion: 'Match con 92% para puesto de Backend',
    fecha: 'Hace 2 días',
  },
])

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await cargarDatos()
  }
})

const cargarDatos = async () => {
  try {
    loading.value = true
    await colaboradorStore.fetchColaborador()
    await colaboradorStore.fetchSkills()
    await colaboradorStore.fetchPuntos()

    // Simulación de datos adicionales - estos vendrian del backend
    skillsCount.value = colaboradorStore.skills.length || 0
    cursosActivos.value = 2
    aplicacionesCount.value = 3
  } catch (error) {
    console.error('Error cargando datos:', error)
  } finally {
    loading.value = false
  }
}

const refrescarDatos = async () => {
  await cargarDatos()
}
</script>
