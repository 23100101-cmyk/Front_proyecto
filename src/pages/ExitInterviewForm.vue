<template>
  <q-layout view="lHh LpR fff" class="bg-dark text-white">

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-grey-10 text-white"
    >
      <div class="q-pa-md text-h6 text-weight-bold">
        <q-icon name="apartment" size="sm" color="green-6" class="q-mr-sm" />
        HUB de Capacitación
      </div>

      <q-list class="q-pt-md">
        <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-6 bg-grey-9">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Mis Cursos</q-item-section>
        </q-item>

        <q-separator spaced="md" />

        <q-item clickable v-ripple exact active-class="text-green-6 bg-green-9">
          <q-item-section avatar><q-icon name="poll" /></q-item-section>
          <q-item-section>Encuesta Salida</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-6 bg-green-9">
          <q-item-section avatar><q-icon name="face" /></q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact active-class="text-green-6 bg-green-9">
          <q-item-section avatar><q-icon name="poll" /></q-item-section>
          <q-item-section>Encuesta Salida</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-header class="bg-grey-10 text-white">
      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="arrow_back" class="q-mr-md" />
        <q-btn flat dense icon="edit" class="q-mr-md" />
        <q-btn flat dense icon="person" class="q-mr-md" />
        <q-btn flat dense icon="close" />
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="text-h4 text-weight-bold">Encuesta de Salida (Exit Interview)</div>
        <div class="text-subtitle1 text-grey-5 q-mb-xl">Ayúanos a entender tu decisión</div>

        <div class="text-h6 text-weight-bold q-mb-md">Información General</div>
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-xs-12 col-md-3">
            <q-input dark outlined label="Nombre (Opcional)" />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input dark outlined label="Departamento" />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input dark outlined label="Departamento" />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input dark outlined label="Último Día de Trabajo" />
          </div>
        </div>

        <div class="text-h6 text-weight-bold q-mb-md">Motivo de la Salida</div>
        <div class="row q-col-gutter-lg q-mb-lg">
          <div class="col-xs-12 col-md-4">
            <q-radio dark v-model="exitReason" val="crecimiento" label="Oportunidad de Crecimiento" />
            <q-radio dark v-model="exitReason" val="cultura" label="Cultura/Ambiente" />
            <q-radio dark v-model="exitReason" val="otros" label="Otros (Compenpasados de (temp.lavolab))" />
          </div>
          <div class="col-xs-12 col-md-8">
            <q-input dark outlined type="textarea" rows="2" label="Cultura/Ambiente" />
          </div>
        </div>

        <div class="text-h6 text-weight-bold q-mb-md">Comentarios Adicionales</div>
        <div class="row q-col-gutter-lg q-mb-lg">
          <div class="col-xs-12 col-md-4">
            <q-radio dark v-model="additionalComments" val="oportunidad" label="Oportunidad de" />
            <q-radio dark v-model="additionalComments" val="cultura_ambiente" label="Cultura/Ambiente" />
          </div>
          <div class="col-xs-12 col-md-8">
            <q-input dark outlined type="textarea" rows="2" />
          </div>
        </div>

        <div class="text-h6 text-weight-bold q-mb-md">Experiencia en la Empresa</div>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-item tag="label" dense>
              <q-item-section>Satisfacción General</q-item-section>
              <q-item-section side>
                <q-rating v-model="satisfaction" max="5" size="lg" color="yellow-8" />
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-checkbox dark v-model="recommend" label="Recomendaría Empresa" />
          </div>
        </div>

        <q-btn unelevated label="Enviar Formulario" color="primary" size="lg" class="q-mt-xl" @click="showSuccessModal = true" />

      </q-page>
    </q-page-container>

    <q-dialog v-model="showSuccessModal">
      <q-card class="q-pa-md text-center bg-dark text-white" style="width: 400px">
        <q-card-section>
          <q-icon name="check_circle" color="green-6" size="xl" />
          <div class="text-h6 q-mt-md text-weight-bold">¡Formoulamo Enviado con Éxcto!</div>
          <p class="q-mt-sm text-grey-4">Agrademos tu tiempo y tus comentatos. Te desiamos much exeto en uu futuro.</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn unelevated label="Cerrar" color="primary" @click="showSuccessModal = false" class="full-width" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ExitInterviewForm',
  setup () {
    // Definición de variables reactivas para el formulario
    const exitReason = ref('crecimiento')
    const additionalComments = ref('oportunidad')
    const satisfaction = ref(4) // Rating de 4 estrellas por defecto
    const recommend = ref(true) // Checkbox marcado por defecto
    const showSuccessModal = ref(false)

    return {
      exitReason,
      additionalComments,
      satisfaction,
      recommend,
      showSuccessModal
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
