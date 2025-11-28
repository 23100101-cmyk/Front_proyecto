<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <q-banner v-if="oppStore.error" class="bg-negative text-white q-mb-lg" dense closable @close="oppStore.clearError()">
      {{ oppStore.error }}
    </q-banner>

    <!-- Header -->
    <h1 class="text-h4 q-mb-lg">Oportunidades Laborales</h1>

    <!-- Search and Filters -->
    <q-card flat class="q-mb-lg">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-input
            v-model="oppStore.searchQuery"
            placeholder="Buscar por título o descripción..."
            filled
            dense
            class="col-xs-12 col-sm-6"
            @update:model-value="oppStore.setSearchQuery"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-select
            v-model="oppStore.filterDepartment"
            :options="departments"
            label="Filtrar por Departamento"
            filled
            dense
            clearable
            class="col-xs-12 col-sm-6"
            @update:model-value="oppStore.setFilterDepartment"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- Opportunities Grid -->
    <q-spinner v-if="oppStore.loading" color="primary" size="50px" class="q-my-lg" />

    <div v-else-if="oppStore.filteredOpportunities.length === 0" class="text-center q-py-lg">
      <p class="text-h6 text-grey-6">No se encontraron oportunidades</p>
    </div>

    <div v-else class="row q-col-gutter-md">
      <q-card v-for="opportunity in oppStore.filteredOpportunities" :key="opportunity.id" class="col-xs-12 col-sm-6 col-md-4">
        <q-card-section>
          <div class="text-h6">{{ opportunity.title }}</div>
          <div class="text-subtitle2 text-grey-6">{{ opportunity.department }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="text-body2 ellipsis-2-lines">{{ opportunity.description }}</p>
          <div class="q-mt-md">
            <q-badge label="Skills Requeridos" class="q-mr-md" />
            <div class="q-mt-xs">
              <q-chip
                v-for="skill in opportunity.requiredSkills?.slice(0, 3)"
                :key="skill"
                size="sm"
                color="primary"
                text-color="white"
              >
                {{ skill }}
              </q-chip>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            v-if="oppStore.hasApplied(opportunity.id)"
            color="negative"
            label="Retirar Aplicación"
            flat
            @click="withdrawApplication(opportunity.id)"
            :loading="oppStore.loading"
          />
          <q-btn
            v-else
            color="positive"
            label="Aplicar"
            flat
            @click="applyToOpportunity(opportunity.id)"
            :loading="oppStore.loading"
          />
          <q-space />
          <q-btn color="primary" flat dense icon="info" @click="showOpportunityDetails(opportunity)" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Opportunity Details Dialog -->
    <q-dialog v-model="showDetailsDialog" maximized>
      <q-card v-if="selectedOpp">
        <q-bar class="bg-primary text-white">
          <div class="text-h6">{{ selectedOpp.title }}</div>
          <q-space />
          <q-btn icon="close" flat dense v-close-popup />
        </q-bar>

        <q-card-section class="q-pa-lg">
          <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-md-8">
              <div class="q-mb-lg">
                <h2 class="text-h5 q-mb-md">Descripción del Puesto</h2>
                <p class="text-body1">{{ selectedOpp.description }}</p>
              </div>

              <div class="q-mb-lg">
                <h3 class="text-h6 q-mb-md">Skills Requeridos</h3>
                <div class="row q-gutter-md">
                  <q-chip
                    v-for="skill in selectedOpp.requiredSkills"
                    :key="skill"
                    color="primary"
                    text-color="white"
                  >
                    {{ skill }}
                  </q-chip>
                </div>
              </div>

              <div>
                <h3 class="text-h6 q-mb-md">Responsabilidades</h3>
                <ul class="q-pl-md">
                  <li v-for="(responsibility, idx) in selectedOpp.responsibilities" :key="idx">
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xs-12 col-md-4">
              <q-card flat class="bg-grey-2">
                <q-card-section>
                  <div class="text-subtitle1 text-weight-bold q-mb-md">Información de la Posición</div>
                  <div class="q-gutter-md">
                    <div>
                      <p class="text-caption text-grey-6">Departamento</p>
                      <p class="text-body1">{{ selectedOpp.department }}</p>
                    </div>
                    <div>
                      <p class="text-caption text-grey-6">Ubicación</p>
                      <p class="text-body1">{{ selectedOpp.location }}</p>
                    </div>
                    <div>
                      <p class="text-caption text-grey-6">Tipo de Contrato</p>
                      <p class="text-body1">{{ selectedOpp.contractType }}</p>
                    </div>
                    <q-separator class="q-my-md" />
                    <q-btn
                      v-if="oppStore.hasApplied(selectedOpp.id)"
                      color="negative"
                      label="Retirar Aplicación"
                      size="lg"
                      @click="withdrawApplication(selectedOpp.id)"
                      class="full-width"
                    />
                    <q-btn
                      v-else
                      color="positive"
                      label="Aplicar Ahora"
                      size="lg"
                      @click="applyToOpportunity(selectedOpp.id)"
                      class="full-width"
                    />
                  </div>
                </q-card-section>
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
import { useOpportunitiesStore } from 'src/stores/opportunities'

const $q = useQuasar()
const oppStore = useOpportunitiesStore()

// Data
const showDetailsDialog = ref(false)
const selectedOpp = ref(null)

const departments = computed(() => {
  const depts = new Set(oppStore.opportunities.map((o) => o.department))
  return Array.from(depts)
})

// Methods
const applyToOpportunity = async (opportunityId) => {
  const result = await oppStore.applyToOpportunity(opportunityId)
  if (result.success) {
    $q.notify({
      type: 'positive',
      message: 'Aplicación enviada correctamente',
    })
  } else {
    $q.notify({
      type: 'negative',
      message: result.error,
    })
  }
}

const withdrawApplication = async (opportunityId) => {
  $q.dialog({
    title: 'Retirar Aplicación',
    message: '¿Estás seguro de que deseas retirar tu aplicación?',
    cancel: true,
  }).onOk(async () => {
    const app = oppStore.myApplications.find((a) => a.opportunityId === opportunityId)
    if (app) {
      const result = await oppStore.withdrawApplication(app.id)
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Aplicación retirada',
        })
        showDetailsDialog.value = false
      }
    }
  })
}

const showOpportunityDetails = (opportunity) => {
  selectedOpp.value = opportunity
  showDetailsDialog.value = true
}

// Lifecycle
onMounted(async () => {
  await oppStore.fetchOpportunities()
  await oppStore.fetchMyApplications()
})
</script>
