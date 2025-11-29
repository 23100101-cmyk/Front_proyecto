<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Gamificación</h1>
        <p class="text-caption text-grey-7">Tu progreso en el sistema</p>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-md-6">
        <q-card class="bg-gradient">
          <q-card-section>
            <div class="text-white">
              <div class="text-h6">Puntos Totales</div>
              <div class="text-h2 text-weight-bold q-mt-md">{{ puntosTotales }}</div>
              <div class="text-caption q-mt-md">+{{ puntosMesActual }} este mes</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">Logros</div>
            <div class="row q-col-gutter-md">
              <div v-for="logro in logros" :key="logro.id" class="col-auto">
                <div class="text-center">
                  <q-icon :name="logro.icono" size="40px" :color="logro.color" />
                  <div class="text-caption q-mt-xs">{{ logro.nombre }}</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card class="q-mt-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Historial de Puntos</div>
        <q-table
          :rows="colaboradorStore.puntosHistorial"
          :columns="columnasHistorial"
          flat
          bordered
          row-key="id"
        />
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

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await colaboradorStore.fetchPuntos()
  }
})

const logros = ref([
  { id: 1, nombre: 'Primer Paso', icono: 'done', color: 'positive' },
  { id: 2, nombre: 'Conectado', icono: 'people', color: 'info' },
  { id: 3, nombre: 'Experto', icono: 'star', color: 'warning' },
])

const columnasHistorial = [
  { name: 'evento', label: 'Evento', field: 'evento', align: 'left' },
  { name: 'puntos', label: 'Puntos', field: 'puntos', align: 'center' },
  { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'right' },
]

const puntosMesActual = computed(() => {
  const ahora = new Date()
  const mesActual = ahora.getMonth()
  return (colaboradorStore.puntosHistorial || [])
    .filter((h) => {
      const fecha = new Date(h.fecha)
      return fecha.getMonth() === mesActual
    })
    .reduce((sum, h) => sum + (h.puntos || 0), 0)
})

const puntosTotales = computed(() => colaboradorStore.puntos?.total || 0)
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
