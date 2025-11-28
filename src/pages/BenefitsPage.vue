<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <q-banner v-if="benStore.error" class="bg-negative text-white q-mb-lg" dense closable @close="benStore.clearError()">
      {{ benStore.error }}
    </q-banner>

    <!-- Tabs -->
    <q-tabs v-model="activeTab" dense class="text-grey-7 q-mb-lg" indicator-color="primary">
      <q-tab name="benefits" icon="card_giftcard" label="Beneficios" />
      <q-tab name="exit-survey" icon="assignment" label="Encuesta de Salida" />
    </q-tabs>

    <!-- Tab Panels -->
    <q-tab-panels v-model="activeTab" animated>
      <!-- Benefits Tab -->
      <q-tab-panel name="benefits">
        <div class="row q-col-gutter-lg">
          <!-- Salary Card -->
          <q-card class="col-xs-12 col-sm-6 col-md-4">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">Salario</div>
              <div class="text-h4 text-primary">{{ formatCurrency(benStore.benefits.salary) }}</div>
              <p class="text-caption text-grey-6 q-mt-md">Compensación base anual</p>
            </q-card-section>
          </q-card>

          <!-- Health Insurance Card -->
          <q-card class="col-xs-12 col-sm-6 col-md-4">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">Seguro de Salud</div>
              <div class="text-body1 text-primary">{{ benStore.benefits.healthInsurance }}</div>
              <p class="text-caption text-grey-6 q-mt-md">Plan de salud integral</p>
            </q-card-section>
          </q-card>

          <!-- Vacation Days Card -->
          <q-card class="col-xs-12 col-sm-6 col-md-4">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">Días de Vacaciones</div>
              <div class="text-h4 text-primary">{{ benStore.benefits.vacationDays }}</div>
              <p class="text-caption text-grey-6 q-mt-md">días hábiles por año</p>
            </q-card-section>
          </q-card>

          <!-- Pension Plan Card -->
          <q-card class="col-xs-12 col-sm-6 col-md-4">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">Plan de Pensiones</div>
              <div class="text-body1 text-primary">{{ benStore.benefits.pensionPlan }}</div>
              <p class="text-caption text-grey-6 q-mt-md">seguridad en el retiro</p>
            </q-card-section>
          </q-card>

          <!-- Bonus Structure Card -->
          <q-card class="col-xs-12 col-sm-6 col-md-4">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">Estructura de Bonificación</div>
              <div class="text-body1 text-primary">{{ benStore.benefits.bonusStructure }}</div>
              <p class="text-caption text-grey-6 q-mt-md">incentivos por desempeño</p>
            </q-card-section>
          </q-card>
        </div>

        <!-- Additional Benefits -->
        <q-card flat class="q-mt-lg">
          <q-card-section>
            <div class="text-h6 q-mb-md">Beneficios Adicionales</div>
            <div class="q-gutter-md">
              <div v-for="benefit in benStore.benefits.additionalBenefits" :key="benefit" class="row items-center">
                <q-icon name="check_circle" color="positive" size="md" class="q-mr-md" />
                <span>{{ benefit }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Exit Survey Tab -->
      <q-tab-panel name="exit-survey">
        <q-card flat class="q-mb-lg bg-warning text-white">
          <q-card-section>
            <div class="text-h6">Encuesta de Salida</div>
            <p class="q-mt-md">
              Te agradecemos por tu tiempo con nosotros. Tu retroalimentación es valiosa para mejorar.
            </p>
          </q-card-section>
        </q-card>

        <q-card flat>
          <q-card-section>
            <div class="q-gutter-lg">
              <!-- Reason for leaving -->
              <div>
                <label class="text-subtitle1 text-weight-bold">¿Cuál es tu motivo de salida?</label>
                <q-select
                  v-model="surveyData.reason"
                  :options="exitReasons"
                  filled
                  class="q-mt-md"
                />
              </div>

              <!-- General Feedback -->
              <div>
                <label class="text-subtitle1 text-weight-bold">Retroalimentación General</label>
                <q-input
                  v-model="surveyData.feedback"
                  type="textarea"
                  rows="5"
                  filled
                  label="Cuéntanos tu experiencia en la empresa"
                  class="q-mt-md"
                />
              </div>

              <!-- Would Recommend -->
              <div>
                <label class="text-subtitle1 text-weight-bold">¿Recomendarías trabajar en nuestra empresa?</label>
                <div class="q-mt-md row q-gutter-md">
                  <q-option-group
                    v-model="surveyData.wouldRecommend"
                    :options="recommendOptions"
                    color="primary"
                    inline
                  />
                </div>
              </div>

              <!-- Suggestions -->
              <div>
                <label class="text-subtitle1 text-weight-bold">Sugerencias de Mejora</label>
                <q-input
                  v-model="surveyData.suggestions"
                  type="textarea"
                  rows="5"
                  filled
                  label="¿Qué podríamos mejorar?"
                  class="q-mt-md"
                />
              </div>

              <!-- Submit Button -->
              <q-btn
                color="primary"
                label="Enviar Encuesta"
                size="lg"
                @click="submitSurvey"
                :loading="benStore.loading"
                class="full-width"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useBenefitsStore } from 'src/stores/benefits'

const $q = useQuasar()
const benStore = useBenefitsStore()

// Data
const activeTab = ref('benefits')
const exitReasons = ref([
  'Nueva oportunidad laboral',
  'Mejora salarial',
  'Cambio de carrera',
  'Razones personales',
  'Reubicación',
  'Otro',
])

const recommendOptions = ref([
  { label: 'Sí, definitivamente', value: true },
  { label: 'Probablemente', value: 'maybe' },
  { label: 'No', value: false },
])

const surveyData = ref({
  reason: '',
  feedback: '',
  wouldRecommend: null,
  suggestions: '',
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount || 0)
}

const submitSurvey = async () => {
  if (!surveyData.value.reason) {
    $q.notify({
      type: 'warning',
      message: 'Por favor selecciona un motivo de salida',
    })
    return
  }

  const result = await benStore.submitExitSurvey(surveyData.value)
  if (result.success) {
    $q.notify({
      type: 'positive',
      message: 'Encuesta enviada correctamente',
    })
    surveyData.value = {
      reason: '',
      feedback: '',
      wouldRecommend: null,
      suggestions: '',
    }
  } else {
    $q.notify({
      type: 'negative',
      message: result.error,
    })
  }
}

// Lifecycle
onMounted(async () => {
  await benStore.fetchBenefits()
})
</script>
