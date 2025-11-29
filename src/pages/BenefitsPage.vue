<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Beneficios</h1>
        <p class="text-caption text-grey-7">Tu paquete de compensación</p>
      </div>
    </div>

    <q-tabs v-model="tabActual" dense class="q-mb-lg" indicator-color="primary">
      <q-tab name="beneficios" label="Mis Beneficios" icon="card_giftcard" />
      <q-tab name="compensacion" label="Compensación" icon="attach_money" />
      <q-tab name="encuesta" label="Encuesta de Salida" icon="logout" />
    </q-tabs>

    <q-tab-panels v-model="tabActual" animated>
      <q-tab-panel name="beneficios">
        <div class="row q-col-gutter-lg">
          <div v-for="beneficio in beneficios" :key="beneficio.id" class="col-xs-12 col-md-6">
            <q-card>
              <q-card-section>
                <div class="flex items-center q-mb-md">
                  <q-icon :name="beneficio.icono" size="32px" color="primary" />
                  <div class="q-ml-md">
                    <div class="text-h6">{{ beneficio.nombre }}</div>
                    <div class="text-caption text-grey-7">{{ beneficio.descripcion }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="compensacion">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-lg">Estructura de Compensación</div>
            <q-list separator>
              <q-item v-for="item in compensacion" :key="item.id">
                <q-item-section>
                  <q-item-label>{{ item.concepto }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label class="text-weight-bold">{{ item.monto }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">Total Anual</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label class="text-h6 text-weight-bold text-positive">{{
                    totalAnual
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="encuesta">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">Encuesta de Salida</div>
            <p class="text-grey-7 q-mb-lg">
              Tu retroalimentación es importante. Por favor completa esta encuesta antes de irte.
            </p>
            <q-form @submit="enviarEncuesta" class="q-gutter-md">
              <q-select
                v-model="encuesta.razonSalida"
                label="Razón de salida"
                outlined
                :options="[
                  'Mejor oportunidad laboral',
                  'Salario',
                  'Crecimiento profesional',
                  'Ambiente laboral',
                  'Relocalización',
                  'Otro',
                ]"
              />
              <q-select
                v-model="encuesta.experiencia"
                label="¿Cómo fue tu experiencia?"
                outlined
                :options="['Excelente', 'Buena', 'Regular', 'Mala']"
              />
              <q-input
                v-model="encuesta.comentarios"
                label="Comentarios y sugerencias"
                outlined
                type="textarea"
                rows="5"
              />
              <div class="row q-gutter-md">
                <q-btn label="Enviar" type="submit" color="positive" />
                <q-btn label="Cancelar" color="grey-7" @click="tabActual = 'beneficios'" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useColaboradorStore } from 'src/stores/colaborador'
import { useAuthStore } from 'src/stores/auth'
import { encuestaService } from 'src/services/backend'

const $q = useQuasar()
const colaboradorStore = useColaboradorStore()
const authStore = useAuthStore()

const tabActual = ref('beneficios')
const loading = ref(false)

const beneficios = ref([
  {
    id: 1,
    nombre: 'Seguro de Salud',
    descripcion: 'Cobertura médica para ti y tu familia',
    icono: 'health_and_safety',
  },
  {
    id: 2,
    nombre: 'AFP',
    descripcion: 'Plan de pensiones aportado',
    icono: 'trending_up',
  },
  {
    id: 3,
    nombre: 'Bonificación Anual',
    descripcion: 'Bono de desempeño anual',
    icono: 'card_giftcard',
  },
  {
    id: 4,
    nombre: 'Capacitación',
    descripcion: 'Acceso a cursos y certificaciones',
    icono: 'school',
  },
])

const encuesta = ref({
  razonSalida: '',
  experiencia: '',
  comentarios: '',
})

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await colaboradorStore.fetchBeneficios()
  }
})

const enviarEncuesta = () => {
  $q.dialog({
    title: 'Confirmar envío',
    message: '¿Deseas enviar la encuesta de salida?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      loading.value = true
      const colaboradorId = authStore.user?.id
      if (!colaboradorId) {
        $q.notify({
          type: 'negative',
          message: 'Usuario no identificado',
        })
        return
      }
      await encuestaService.crearEncuesta(colaboradorId, encuesta.value)
      $q.notify({
        type: 'positive',
        message: 'Encuesta enviada correctamente',
      })
      encuesta.value = {
        razonSalida: '',
        experiencia: '',
        comentarios: '',
      }
      tabActual.value = 'beneficios'
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Error al enviar la encuesta',
      })
    } finally {
      loading.value = false
    }
  })
}
</script>

