<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Encabezado -->
    <q-header elevated class="bg-green-7 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          <q-icon name="apartment" size="sm" class="q-mr-sm" />
          HUB de Capacitación
        </q-toolbar-title>

        <!-- Espaciador -->
        <q-space />

        <!-- Notificaciones -->
        <q-btn flat dense icon="notifications" to="/app/notificaciones" class="q-mr-md">
          <q-badge color="red" floating rounded size="sm" label="3" />
          <q-tooltip>Notificaciones</q-tooltip>
        </q-btn>

        <!-- Menu de usuario -->
        <q-btn flat dense :icon="`account_circle`" @click="showUserMenu = !showUserMenu">
          <q-tooltip>{{ auth.userDisplayName }}</q-tooltip>
        </q-btn>

        <!-- Menu desplegable de usuario -->
        <q-menu v-model="showUserMenu" anchor="bottom right" self="top right" :offset="[0, 10]">
          <q-card style="width: 300px">
            <!-- Encabezado con usuario -->
            <q-card-section class="bg-green-7 text-white">
              <div class="text-h6 text-weight-bold">{{ auth.userDisplayName }}</div>
              <div class="text-caption">{{ auth.userRole }}</div>
              <div class="text-caption">{{ auth.userEmail }}</div>
            </q-card-section>

            <q-separator />

            <!-- Opciones -->
            <q-card-section>
              <q-item clickable v-ripple to="/mi-perfil-dashboard">
                <q-item-section avatar>
                  <q-icon name="person" color="green-7" />
                </q-item-section>
                <q-item-section>Ver Perfil</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/actualizar-perfil-skills">
                <q-item-section avatar>
                  <q-icon name="edit" color="green-7" />
                </q-item-section>
                <q-item-section>Actualizar Skills</q-item-section>
              </q-item>

              <q-separator class="q-my-sm" />

              <q-item clickable v-ripple @click="handleLogout">
                <q-item-section avatar>
                  <q-icon name="logout" color="negative" />
                </q-item-section>
                <q-item-section class="text-negative">Cerrar Sesión</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-toolbar>
    </q-header>

    <!-- Drawer Lateral -->
    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-white text-dark shadow-1"
    >
      <div class="q-pa-md text-h6 text-weight-bold text-green-7">
        <q-icon name="apartment" size="sm" class="q-mr-sm" />
        MENÚ
      </div>

      <q-list class="q-pt-md">
        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/"
        >
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/mi-perfil-dashboard"
        >
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Mi Dashboard</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/mi-perfil"
        >
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/oportunidades"
        >
          <q-item-section avatar><q-icon name="work" /></q-item-section>
          <q-item-section>Oportunidades</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/catalogo-cursos"
        >
          <q-item-section avatar><q-icon name="menu_book" /></q-item-section>
          <q-item-section>Catálogo Cursos</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/progreso-cursos"
        >
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Mi Progreso</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/gamificacion"
        >
          <q-item-section avatar><q-icon name="star" /></q-item-section>
          <q-item-section>Puntos & Logros</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/skill-matcher"
        >
          <q-item-section avatar><q-icon name="match_case" /></q-item-section>
          <q-item-section>Skill Matcher</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header>ADMINISTRACIÓN</q-item-label>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/analytics"
        >
          <q-item-section avatar><q-icon name="analytics" /></q-item-section>
          <q-item-section>Analytics & KPIs</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/vacantes-management"
        >
          <q-item-section avatar><q-icon name="business" /></q-item-section>
          <q-item-section>Gestión Vacantes</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/skills-management"
        >
          <q-item-section avatar><q-icon name="auto_awesome" /></q-item-section>
          <q-item-section>Gestión Skills</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/reportes"
        >
          <q-item-section avatar><q-icon name="assessment" /></q-item-section>
          <q-item-section>Reportes</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/gestionar-perfil-colaborador"
        >
          <q-item-section avatar><q-icon name="edit" /></q-item-section>
          <q-item-section>Gestión RR.HH.</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/beneficios"
        >
          <q-item-section avatar><q-icon name="card_giftcard" /></q-item-section>
          <q-item-section>Beneficios</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          exact
          active-class="text-green-7 bg-grey-3"
          class="q-pb-lg"
          to="/encuesta-salida"
        >
          <q-item-section avatar><q-icon name="poll" /></q-item-section>
          <q-item-section>Encuesta Salida</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Contenedor de páginas -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const router = useRouter()
const auth = useAuthStore()

const showUserMenu = ref(false)

const handleLogout = () => {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: `¿Estás seguro de que deseas cerrar sesión, ${auth.userDisplayName}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    auth.logout()
    showUserMenu.value = false
    $q.notify({
      type: 'positive',
      message: 'Sesión cerrada correctamente',
      position: 'top',
    })
    // Redirigir al login después de un breve delay
    setTimeout(() => {
      router.push('/login')
    }, 500)
  })
}
</script>

<style scoped></style>
