<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Notificaciones</h1>
        <p class="text-caption text-grey-7">Mantente actualizado con las nuevas oportunidades</p>
      </div>
      <q-btn
        flat
        icon="delete_sweep"
        label="Marcar todo como leído"
        color="negative"
        @click="marcarTodoLeido"
        v-if="notificacionesNoLeidas.length > 0"
      />
    </div>

    <div v-if="loading" class="text-center q-my-lg">
      <q-spinner size="50px" color="primary" />
    </div>

    <q-banner v-if="error" class="bg-negative text-white q-mb-lg">
      {{ error }}
      <template v-slot:action>
        <q-btn flat dense icon="close" @click="error = null" />
      </template>
    </q-banner>

    <div v-if="!loading && notificaciones.length > 0">
      <q-list separator>
        <q-item
          v-for="notif in notificaciones"
          :key="notif.id"
          clickable
          :active="!notif.leida"
          active-class="bg-blue-1"
          @click="toggleLeido(notif.id)"
        >
          <q-item-section avatar>
            <q-icon :name="getIcon(notif.tipo)" :color="notif.leida ? 'grey-5' : 'primary'" />
          </q-item-section>

          <q-item-section>
            <q-item-label :class="!notif.leida ? 'text-weight-bold' : ''">
              {{ notif.titulo }}
            </q-item-label>
            <q-item-label caption lines="2">
              {{ notif.mensaje }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="text-grey-8 q-gutter-xs">
              <div class="text-caption">{{ formatDate(notif.fechaCreacion) }}</div>
              <q-btn
                size="sm"
                flat
                dense
                round
                icon="close"
                @click.stop="eliminarNotificacion(notif.id)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-card v-else-if="!loading" flat class="text-center q-pa-lg">
      <q-icon name="notifications_off" size="60px" color="grey-5" />
      <p class="text-grey-7 q-mt-md">No tienes notificaciones</p>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useNotificacionStore } from 'src/stores/notificacion'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const notificacionStore = useNotificacionStore()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref(null)

const notificacionesNoLeidas = computed(() => notificacionStore.cantidadNoLeidas)

const notificaciones = computed(() => notificacionStore.notificaciones || [])

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await cargarNotificaciones()
  }
})

const cargarNotificaciones = async () => {
  try {
    loading.value = true
    error.value = null
    await notificacionStore.fetchNotificaciones()
  } catch (err) {
    error.value = 'Error al cargar las notificaciones'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleLeido = async (notifId) => {
  try {
    await notificacionStore.marcarLeida(notifId)
    $q.notify({
      type: 'positive',
      message: 'Notificación marcada',
      position: 'top',
      timeout: 1000,
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Error al actualizar notificación',
    })
  }
}

const eliminarNotificacion = async (notifId) => {
  try {
    await notificacionStore.eliminarNotificacion(notifId)
    $q.notify({
      type: 'positive',
      message: 'Notificación eliminada',
      position: 'top',
      timeout: 1000,
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Error al eliminar notificación',
    })
  }
}

const marcarTodoLeido = async () => {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Marcar todas las notificaciones como leídas?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      for (const notif of notificaciones.value.filter((n) => !n.leida)) {
        await notificacionStore.marcarLeida(notif.id)
      }
      $q.notify({
        type: 'positive',
        message: 'Todas las notificaciones marcadas como leídas',
      })
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Error al actualizar notificaciones',
      })
    }
  })
}

const getIcon = (tipo) => {
  const iconMap = {
    match: 'favorite',
    aplicacion: 'work',
    curso: 'school',
    puntos: 'star',
    certificacion: 'verified',
    default: 'notifications',
  }
  return iconMap[tipo] || iconMap['default']
}

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diffTime = Math.abs(now - d)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Hoy'
  } else if (diffDays === 1) {
    return 'Ayer'
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`
  } else {
    return d.toLocaleDateString('es-ES')
  }
}
</script>

