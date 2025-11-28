<template>
  <q-page class="q-pa-lg">
    <!-- Points Header -->
    <q-card flat class="bg-gradient q-mb-lg text-white">
      <q-card-section>
        <div class="row items-center justify-between">
          <div>
            <div class="text-subtitle2">Mis Puntos Totales</div>
            <div class="text-h3 text-weight-bold">{{ gamStore.totalPoints }}</div>
          </div>
          <q-icon name="star" size="80px" color="yellow" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Tabs -->
    <q-tabs v-model="activeTab" dense class="text-grey-7 q-mb-lg" indicator-color="primary">
      <q-tab name="breakdown" icon="bar_chart" label="Desglose de Puntos" />
      <q-tab name="history" icon="history" label="Historial" />
      <q-tab name="achievements" icon="emoji_events" label="Logros" />
    </q-tabs>

    <!-- Tab Panels -->
    <q-tab-panels v-model="activeTab" animated>
      <!-- Breakdown Tab -->
      <q-tab-panel name="breakdown">
        <div class="row q-col-gutter-md">
          <q-card
            v-for="(points, action) in gamStore.pointsBreakdown"
            :key="action"
            class="col-xs-12 col-sm-6 col-md-4"
          >
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold">{{ formatAction(action) }}</div>
              <div class="text-h5 text-primary q-mt-md">+{{ points }}</div>
              <p class="text-caption text-grey-6 q-mt-md">puntos acumulados</p>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>

      <!-- History Tab -->
      <q-tab-panel name="history">
        <q-spinner v-if="gamStore.loading" color="primary" size="50px" class="q-my-lg" />

        <div v-else-if="gamStore.pointsHistory.length === 0" class="text-center q-py-lg">
          <p class="text-h6 text-grey-6">No hay historial de puntos aún</p>
        </div>

        <q-timeline v-else layout="dense">
          <q-timeline-entry
            v-for="entry in gamStore.pointsHistory"
            :key="entry.id"
            :title="formatAction(entry.action)"
            :subtitle="formatDate(entry.date)"
            icon="star"
            color="primary"
          >
            <div>
              <div class="text-h6 text-weight-bold text-positive">+{{ entry.points }} puntos</div>
              <p class="text-body2 q-mt-xs">{{ entry.description }}</p>
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-tab-panel>

      <!-- Achievements Tab -->
      <q-tab-panel name="achievements">
        <q-spinner v-if="gamStore.loading" color="primary" size="50px" class="q-my-lg" />

        <div v-else-if="gamStore.achievements.length === 0" class="text-center q-py-lg">
          <p class="text-h6 text-grey-6">Completa acciones para desbloquear logros</p>
        </div>

        <div v-else class="row q-col-gutter-md">
          <q-card
            v-for="achievement in gamStore.achievements"
            :key="achievement.id"
            class="col-xs-12 col-sm-6 col-md-4"
            :class="{ 'bg-grey-2': !achievement.unlocked }"
          >
            <q-card-section class="text-center">
              <div class="text-h2 q-mb-md">{{ achievement.icon }}</div>
              <div class="text-subtitle1 text-weight-bold">{{ achievement.name }}</div>
              <p class="text-caption text-grey-6 q-mt-xs">{{ achievement.description }}</p>
              <q-badge
                v-if="achievement.unlocked"
                label="Desbloqueado"
                color="positive"
                class="q-mt-md"
              />
              <q-badge v-else label="Bloqueado" color="grey" class="q-mt-md" />
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGamificationStore } from 'src/stores/gamification'

const gamStore = useGamificationStore()
const activeTab = ref('breakdown')

// Methods
const formatAction = (action) => {
  const actions = {
    'complete-profile': 'Perfil Completado',
    'add-certification': 'Certificación Agregada',
    'complete-course': 'Curso Completado',
    'apply-opportunity': 'Candidatura Realizada',
    'skill-verified': 'Competencia Verificada',
  }
  return actions[action] || action
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Lifecycle
onMounted(async () => {
  await gamStore.fetchPoints()
  await gamStore.fetchAchievements()
})
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
