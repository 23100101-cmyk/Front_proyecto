<template>
  <q-page class="q-pa-xl">
    <div class="row justify-center">
        <div class="col-xs-12 col-md-8 col-lg-6">
            <q-card flat class="bg-white shadow-2 q-pa-lg">
                <div class="text-h4 text-weight-bold q-mb-md text-center text-red-7">Encuesta de Entrevista de Salida</div>
                <div class="text-subtitle1 text-grey-7 q-mb-lg text-center">Tus comentarios son valiosos para nosotros. Por favor, sé honesto/a.</div>

                <q-form @submit="onSubmit" class="q-gutter-md">

                    <q-card-section>
                        <div class="text-h6 q-mb-sm">1. ¿Cuál fue la principal razón de tu salida?</div>
                        <q-select
                            outlined
                            v-model="formData.reason"
                            :options="reasonOptions"
                            label="Selecciona una razón"
                            hint="Selección requerida"
                            :rules="[val => !!val || 'Campo Requerido']"
                        />
                    </q-card-section>

                    <q-card-section>
                        <div class="text-h6 q-mb-sm">2. Evalúa tu satisfacción general con la empresa:</div>
                        <q-rating
                            v-model="formData.satisfaction"
                            size="2em"
                            color="red-5"
                            icon="sentiment_satisfied_alt"
                            icon-selected="sentiment_very_satisfied"
                        />
                    </q-card-section>

                    <q-card-section>
                        <div class="text-h6 q-mb-sm">3. ¿Recomendarías esta empresa a un amigo?</div>
                        <q-option-group
                            v-model="formData.recommend"
                            :options="recommendOptions"
                            color="red-5"
                            type="radio"
                        />
                    </q-card-section>

                    <q-card-section>
                        <div class="text-h6 q-mb-sm">4. ¿Qué áreas crees que la empresa podría mejorar?</div>
                        <q-input
                            outlined
                            v-model="formData.improvementAreas"
                            type="textarea"
                            rows="3"
                            placeholder="Escribe tus sugerencias aquí..."
                        />
                    </q-card-section>

                    <q-card-actions align="center" class="q-pt-lg">
                        <q-btn label="Enviar Encuesta" type="submit" color="red-7" size="lg" icon="send" class="q-px-xl"/>
                    </q-card-actions>
                </q-form>
            </q-card>
        </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'ExitInterviewForm',
  setup () {
    const $q = useQuasar()

    const formData = ref({
      reason: null,
      satisfaction: 3,
      recommend: 'maybe',
      improvementAreas: ''
    })

    const reasonOptions = [
      'Mejor oportunidad salarial',
      'Falta de oportunidades de crecimiento',
      'Cambio de carrera/rol',
      'Ambiente laboral',
      'Otros'
    ]

    const recommendOptions = [
        { label: 'Sí, definitivamente', value: 'yes' },
        { label: 'Tal vez', value: 'maybe' },
        { label: 'No', value: 'no' }
    ]

    const onSubmit = () => {
      // Aquí se enviaría la data a un backend
      $q.notify({
        color: 'red-7',
        textColor: 'white',
        icon: 'check_circle',
        message: '¡Encuesta de salida enviada con éxito!',
        position: 'top'
      })
      // Opcional: limpiar formulario después de enviar
      // formData.value = { reason: null, satisfaction: 3, recommend: 'maybe', improvementAreas: '' }
    }

    return {
      formData,
      reasonOptions,
      recommendOptions,
      onSubmit
    }
  }
}
</script>
