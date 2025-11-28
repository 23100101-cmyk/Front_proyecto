<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Oportunidades</h1>
        <p class="text-caption text-grey-7">Encuentra y postúlate a vacantes internas</p>
      </div>
      <q-badge :label="`${vacanteStore.aplicaciones.length} aplicaciones`" color="primary" />
    </div>

    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-md-6">
            <q-input v-model="busqueda" label="Buscar..." outlined dense icon="search" />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-select v-model="filtroArea" label="Área" outlined dense :options="areasUnicas" clearable />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-select v-model="filtroNivel" label="Nivel" outlined dense :options="['Junior', 'Mid', 'Senior']" clearable />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div v-if="vacanteStore.loading" class="text-center q-my-lg">
      <q-spinner size="50px" color="primary" />
    </div>

    <q-banner v-if="vacanteStore.error" class="bg-negative text-white q-mb-lg">
      {{ vacanteStore.error }}
      <template v-slot:action>
        <q-btn flat dense icon="close" @click="vacanteStore.error = null" />
      </template>
    </q-banner>

    <div v-if="!vacanteStore.loading && vacantesFiltradas.length > 0">
      <div class="row q-col-gutter-lg">
        <div v-for="vacante in vacantesFiltradas" :key="vacante.id" class="col-xs-12 col-md-6">
          <q-card class="cursor-pointer" @click="verDetalles(vacante)">
            <q-card-section>
              <div class="text-h6 text-weight-bold">{{ vacante.titulo }}</div>
              <div class="text-subtitle2 text-grey-7">{{ vacante.area }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="text-caption text-grey-7">
              {{ vacante.descripcion }}
            </q-card-section>
            <q-card-actions>
              <q-btn
                v-if="!yaAplicado(vacante.id)"
                label="Aplicar"
                color="positive"
                @click.stop="aplicarVacante(vacante.id)"
              />
              <q-badge v-else label="Ya aplicaste" color="info" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-card v-else-if="!loading" flat class="text-center q-pa-lg">
      <q-icon name="search_off" size="60px" color="grey-5" />
      <p class="text-grey-7 q-mt-md">No se encontraron vacantes</p>
    </q-card>

    <q-dialog v-model="showDetails" maximized>
      <q-card v-if="vacanteActual">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>{{ vacanteActual.titulo }}</q-toolbar-title>
          <q-btn flat dense icon="close" @click="showDetails = false" />
        </q-toolbar>
        <q-card-section class="q-pa-lg">
          <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-md-8">
              <div class="text-h6 q-mb-md">Descripción</div>
              <p>{{ vacanteActual.descripcion }}</p>
              <div class="text-h6 q-mb-md q-mt-lg">Requisitos</div>
              <ul>
                <li v-for="(req, i) in (vacanteActual.requisitos || [])" :key="i">{{ req }}</li>
              </ul>
            </div>
            <div class="col-xs-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6 q-mb-md">Información</div>
                  <div class="q-mb-md">
                    <div class="text-weight-bold">Área</div>
                    <p class="q-my-xs">{{ vacanteActual.area }}</p>
                  </div>
                  <div class="q-mb-md">
                    <div class="text-weight-bold">Nivel</div>
                    <p class="q-my-xs">{{ vacanteActual.nivel }}</p>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-actions>
                  <q-btn
                    v-if="!yaAplicado(vacanteActual.id)"
                    label="Aplicar Ahora"
                    color="positive"
                    class="full-width"
                    @click="aplicarVacante(vacanteActual.id)"
                  />
                  <q-btn v-else label="Ya has aplicado" color="info" class="full-width" disable />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useVacanteStore } from 'src/stores/vacante'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const vacanteStore = useVacanteStore()
const authStore = useAuthStore()

const busqueda = ref('')
const filtroArea = ref('')
const filtroNivel = ref('')
const showDetails = ref(false)
const vacanteActual = ref(null)

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await vacanteStore.fetchVacantes()
  }
})

const areasUnicas = computed(() => {
  const areas = new Set(vacanteStore.vacantes.map((v) => v.area))
  return Array.from(areas).filter(Boolean)
})

const vacantesFiltradas = computed(() => {
  return vacanteStore.vacantes.filter((v) => {
    const matchBusqueda = v.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      v.descripcion.toLowerCase().includes(busqueda.value.toLowerCase())
    const matchArea = !filtroArea.value || v.area === filtroArea.value
    const matchNivel = !filtroNivel.value || v.nivel === filtroNivel.value
    return matchBusqueda && matchArea && matchNivel
  })
})

const verDetalles = (vacante) => {
  vacanteActual.value = vacante
  showDetails.value = true
}

const aplicarVacante = (vacanteId) => {
  $q.dialog({
    title: 'Confirmar Postulación',
    message: '¿Deseas postularte a esta vacante?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      const colaboradorId = authStore.user?.id
      if (!colaboradorId) {
        $q.notify({
          type: 'negative',
          message: 'Usuario no identificado',
        })
        return
      }
      await vacanteStore.aplicar(vacanteId, colaboradorId)
      showDetails.value = false
      $q.notify({
        type: 'positive',
        message: 'Postulación enviada correctamente',
      })
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Error al enviar la postulación',
      })
    }
  })
}

const yaAplicado = (vacanteId) => {
  return vacanteStore.aplicaciones.some((a) => a.vacanteId === vacanteId)
}
</script>
