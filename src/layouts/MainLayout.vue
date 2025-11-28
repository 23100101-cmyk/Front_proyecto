<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> HUB de Capacitación </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-white text-dark shadow-1"
    >
      <div class="q-pa-md text-h6 text-weight-bold">
        <q-icon name="apartment" size="sm" color="green-7" class="q-mr-sm" />
        HUB de Capacitación
      </div>

      <q-list class="q-pt-md">
        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/mi-perfil">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/oportunidades">
          <q-item-section avatar><q-icon name="work" /></q-item-section>
          <q-item-section>Oportunidades</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/catalogo-cursos">
          <q-item-section avatar><q-icon name="menu_book" /></q-item-section>
          <q-item-section>Catálogo Cursos</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/progreso-cursos">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Mi Progreso</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/gamificacion">
          <q-item-section avatar><q-icon name="star" /></q-item-section>
          <q-item-section>Puntos & Logros</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/beneficios">
          <q-item-section avatar><q-icon name="card_giftcard" /></q-item-section>
          <q-item-section>Beneficios</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/encuesta-salida">
          <q-item-section avatar><q-icon name="poll" /></q-item-section>
          <q-item-section>Encuesta Salida</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="q-pb-lg" to="/gestionar-perfil-colaborador">
          <q-item-section avatar><q-icon name="edit" /></q-item-section>
          <q-item-section>Gestión RR.HH.</q-item-section>
        </q-item>

      </q-list>

       <q-item clickable v-ripple exact active-class="text-green-7 bg-grey-3" class="absolute-bottom q-mb-md">
          <q-item-section avatar><q-icon name="tune" /></q-item-section>
          <q-item-section>Ajustes</q-item-section>
        </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// No se necesita lógica aquí
</script>
