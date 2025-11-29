<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <h1 class="text-h4 text-weight-bold">Gestión de Skills</h1>
      <q-btn label="Nuevo Skill" color="positive" icon="add" @click="showForm = !showForm" />
    </div>

    <q-card v-if="showForm" class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Nuevo Skill</div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-md-6">
            <q-input v-model="newSkill.nombre" label="Nombre" outlined dense />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input v-model="newSkill.categoria" label="Categoría" outlined dense />
          </div>
          <div class="col-xs-12">
            <q-input v-model="newSkill.descripcion" label="Descripción" outlined dense type="textarea" />
          </div>
          <div class="col-xs-12">
            <q-btn label="Guardar" color="positive" @click="agregarSkill" />
            <q-btn label="Cancelar" flat color="secondary" class="q-ml-md" @click="showForm = false" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Skills Disponibles</div>
        <q-table :rows="skills" :columns="columns" row-key="id" flat bordered />
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
  { name: "nombre", label: "Nombre", field: "nombre", align: "left" },
  { name: "categoria", label: "Categoría", field: "categoria", align: "left" },
  { name: "descripcion", label: "Descripción", field: "descripcion", align: "left" },
]

const skills = ref([
  { id: 1, nombre: "Vue.js", categoria: "Frontend", descripcion: "Framework JavaScript progresivo" },
  { id: 2, nombre: "Python", categoria: "Backend", descripcion: "Lenguaje de programación" },
])

const newSkill = reactive({
  nombre: "",
  categoria: "",
  descripcion: "",
})

const agregarSkill = () => {
  if (!newSkill.nombre || !newSkill.categoria) {
    $q.notify({ type: "negative", message: "Completa los campos requeridos" })
    return
  }

  skills.value.push({
    id: Date.now(),
    ...newSkill,
  })

  newSkill.nombre = ""
  newSkill.categoria = ""
  newSkill.descripcion = ""
  showForm.value = false

  $q.notify({ type: "positive", message: "Skill agregado" })
}
</script>

<style scoped></style>
