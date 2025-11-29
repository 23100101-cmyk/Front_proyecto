<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <h1 class="text-h4 text-weight-bold">Gestión de Vacantes</h1>
      <q-btn label="Nueva Vacante" color="positive" icon="add" @click="showForm = !showForm" />
    </div>

    <q-card v-if="showForm" class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Nueva Vacante</div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-md-6">
            <q-input v-model="newVacante.titulo" label="Título" outlined dense />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input v-model="newVacante.area" label="Área" outlined dense />
          </div>
          <div class="col-xs-12">
            <q-input v-model="newVacante.descripcion" label="Descripción" outlined dense type="textarea" />
          </div>
          <div class="col-xs-12">
            <q-btn label="Guardar" color="positive" @click="agregarVacante" />
            <q-btn label="Cancelar" flat color="secondary" class="q-ml-md" @click="showForm = false" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Vacantes Disponibles</div>
        <q-table :rows="vacantes" :columns="columns" row-key="id" flat bordered />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()
const showForm = ref(false)

const columns = [
  { name: "titulo", label: "Título", field: "titulo", align: "left" },
  { name: "area", label: "Área", field: "area", align: "left" },
  { name: "descripcion", label: "Descripción", field: "descripcion", align: "left" },
]

const vacantes = ref([
  { id: 1, titulo: "Desarrollador Frontend", area: "Tecnología", descripcion: "Se busca desarrollador Vue.js" },
  { id: 2, titulo: "Analista de Datos", area: "Analytics", descripcion: "Experto en análisis de datos" },
])

const newVacante = reactive({
  titulo: "",
  area: "",
  descripcion: "",
})

const agregarVacante = () => {
  if (!newVacante.titulo || !newVacante.area) {
    $q.notify({ type: "negative", message: "Completa los campos requeridos" })
    return
  }

  vacantes.value.push({
    id: Date.now(),
    ...newVacante,
  })

  newVacante.titulo = ""
  newVacante.area = ""
  newVacante.descripcion = ""
  showForm.value = false

  $q.notify({ type: "positive", message: "Vacante agregada" })
}
</script>

<style scoped></style>
