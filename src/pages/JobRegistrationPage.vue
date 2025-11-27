<template>
  <q-layout view="lHh Lpr lff">

    <q-drawer
      show-if-above
      :width="250"
      :breakpoint="500"
      side="left"
      class="bg-blue-grey-1"
    >
      <div class="text-h5 q-pa-md text-weight-bold">Registro de</div>
      <q-list class="q-pt-md">
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2" class="text-weight-bold">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Panel de control</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2" class="text-weight-bold">
          <q-item-section avatar>
            <q-icon name="arrow_back" />
          </q-item-section>
          <q-item-section>Registrador Vacante</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2">
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>
          <q-item-section>Requisitos</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Detalles del Proyecto</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2" class="bg-white text-primary text-weight-bold">
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>Habilidades</q-item-section>
        </q-item>

        <q-separator spaced="lg" />

        <q-item-label header>Nivel Requerido</q-item-label>
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2">
          <q-item-section avatar>
            <q-icon name="trending_up" />
          </q-item-section>
          <q-item-section>Nivel Requerido</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-2">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Fecha de inicio</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title class="text-h5 text-weight-bold">
          Detalles de la Vacante
        </q-toolbar-title>
        <q-space />

        <q-btn flat dense icon="edit" label="Descripción del" color="blue-grey-8" class="q-mr-sm" />
        <q-btn flat dense icon="warning" label="Urgencia" color="blue-grey-8" class="q-mr-sm" />
        <q-btn flat dense icon="notifications" label="No" color="blue-grey-8" class="q-mr-sm" />
        <q-btn flat dense icon="save" label="Guardar" color="blue-grey-8" />

        <q-space />

        <q-icon name="notifications" size="sm" class="q-mr-sm" />
        <q-avatar size="md" class="q-mr-sm">
           <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <span class="q-mr-sm">Fátima Rivasplata</span>
        <q-icon name="arrow_drop_down" size="sm" />
      </q-toolbar>
      <q-separator />
    </q-header>


    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="row q-col-gutter-lg items-center q-mb-md">
          <div class="col-12 col-sm-6">
            <q-avatar size="70px" class="q-mr-md">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </div>
        </div>

        <div class="row q-col-gutter-lg q-mt-lg">
            <div class="col-12 col-md-6">
                <q-input outlined label="Título del puesto" value="Desarrollador de Software" />
            </div>
            <div class="col-12 col-md-6">
                <q-input outlined label="Cuenta/Proyecto" value="Proyecto Alpha" />
            </div>

            <div class="col-12">
                <q-input outlined label="Habilidades" value="Java, SQL, ComunicacÃ³n" />
            </div>

            <div class="col-12 col-md-6">
                <q-input outlined label="Nivel Deseado" value="Intermedio" />
            </div>
            <div class="col-12 col-md-6">
                </div>

            <div class="col-12 col-md-6">
                <q-input outlined label="Fecha de Inicio" value="01/01/2024" mask="##/##/####" />
            </div>
            <div class="col-12 col-md-6">
                </div>

            <div class="col-12 col-md-6">
                <q-input outlined label="Urgencia" value="Alta" />
            </div>

            <div class="col-12 col-md-6">
                <q-input outlined label="Ubicación" value="Remoto" />
            </div>

            <div class="col-12 col-md-6">
                <q-input outlined label="Tipo de Contrato" value="Tiempo Completo" />
            </div>

            <div class="col-12 col-md-6">
                <q-input outlined label="Industria" value="Tecnología" />
            </div>

            <div class="col-12">
                <q-btn unelevated label="Registrador" color="primary" size="lg" class="full-width" />
            </div>
        </div>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'JobRegistrationPage'
}
</script>

<style scoped>
/* Puedes añadir estilos específicos aquí si son necesarios */
</style>
