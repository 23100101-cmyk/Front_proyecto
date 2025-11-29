<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Gestión de Skills</h1>
        <p class="text-caption text-grey-7">Administra el catálogo de competencias</p>
      </div>
      <q-btn unelevated label="Nuevo Skill" color="positive" icon="add" @click="abrirFormNueva" />
    </div>

    <!-- Mensajes de estado -->
    <q-banner v-if="crud.hasSuccess" class="bg-positive text-white q-mb-lg">
      {{ crud.success }}
      <template v-slot:action>
        <q-btn flat dense icon="close" @click="crud.clearMessages" />
      </template>
    </q-banner>

    <q-banner v-if="crud.hasError" class="bg-negative text-white q-mb-lg">
      {{ crud.error }}
      <template v-slot:action>
        <q-btn flat dense icon="close" @click="crud.clearMessages" />
      </template>
    </q-banner>

    <!-- Tabla de Skills -->
    <div v-if="!crud.isEditing">
      <q-card>
        <q-card-section>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-md-8">
              <q-input
                v-model="busqueda"
                outlined
                dense
                placeholder="Buscar skill..."
                icon="search"
              />
            </div>
            <div class="col-xs-12 col-md-4">
              <q-select
                v-model="categoriaFiltro"
                outlined
                dense
                label="Categoría"
                :options="categorias"
                clearable
              />
            </div>
          </div>

          <q-table
            :rows="skillsFiltrados"
            :columns="columns"
            row-key="id"
            flat
            bordered
            :loading="crud.loading"
          >
            <template v-slot:body-cell-criticidad="props">
              <q-td :props="props">
                <q-badge
                  :label="props.row.criticidad"
                  :color="getColorCriticidad(props.row.criticidad)"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-acciones="props">
              <q-td :props="props" auto-width>
                <q-btn
                  flat
                  dense
                  round
                  icon="edit"
                  size="sm"
                  color="primary"
                  @click="crud.selectForEdit(props.row)"
                />
                <q-btn
                  flat
                  dense
                  round
                  icon="delete"
                  size="sm"
                  color="negative"
                  @click="confirmarEliminar(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>

    <!-- Formulario de Edición/Creación -->
    <div v-else class="q-mt-lg">
      <q-card>
        <q-card-section>
          <h3 class="text-h6 q-mt-none">
            {{ crud.selectedItem.id ? 'Editar Skill' : 'Nuevo Skill' }}
          </h3>

          <q-form @submit="guardarSkill" class="q-gutter-md q-mt-md">
            <q-input
              v-model="crud.selectedItem.nombre"
              outlined
              label="Nombre del Skill"
              :rules="[crud.validations.required]"
            />

            <q-input
              v-model="crud.selectedItem.descripcion"
              outlined
              label="Descripción"
              type="textarea"
              rows="3"
              :rules="[(val) => crud.validations.minLength(val, 10, 'Descripción')]"
            />

            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-select
                  v-model="crud.selectedItem.categoria"
                  outlined
                  label="Categoría"
                  :options="categorias"
                  :rules="[crud.validations.required]"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-select
                  v-model="crud.selectedItem.criticidad"
                  outlined
                  label="Criticidad"
                  :options="['Crítica', 'Alta', 'Media', 'Baja']"
                  :rules="[crud.validations.required]"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="crud.selectedItem.profesionalesConSkill"
                  outlined
                  label="Profesionales con Skill"
                  type="number"
                  :rules="[crud.validations.number]"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="crud.selectedItem.demandaMercado"
                  outlined
                  label="Demanda en el Mercado (%)"
                  type="number"
                  :rules="[crud.validations.number]"
                />
              </div>
            </div>

            <q-checkbox
              v-model="crud.selectedItem.esSkillCritico"
              label="Es un skill crítico para la organización"
            />

            <div class="row q-gutter-md">
              <q-btn label="Guardar" type="submit" color="positive" :loading="crud.loading" />
              <q-btn label="Cancelar" color="grey-7" @click="crud.cancelEdit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useCRUD } from 'src/composables/useCRUD'
import { skillService } from 'src/services/backend'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()

// Usar composable CRUD
const crud = useCRUD('Skill', skillService)

const busqueda = ref('')
const categoriaFiltro = ref(null)

const categorias = [
  'Backend',
  'Frontend',
  'DevOps',
  'Data Science',
  'Cloud',
  'Seguridad',
  'Soft Skills',
  'Otro',
]

const columns = [
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left' },
  { name: 'criticidad', label: 'Criticidad', field: 'criticidad', align: 'center' },
  {
    name: 'profesionalesConSkill',
    label: 'Profesionales',
    field: 'profesionalesConSkill',
    align: 'center',
  },
  { name: 'demandaMercado', label: 'Demanda (%)', field: 'demandaMercado', align: 'center' },
  { name: 'acciones', label: 'Acciones', field: 'acciones', align: 'center' },
]

const skillsFiltrados = computed(() => {
  return crud.items.filter((skill) => {
    const search = busqueda.value.toLowerCase()
    const matchSearch =
      skill.nombre.toLowerCase().includes(search) ||
      skill.descripcion.toLowerCase().includes(search)
    const matchCategoria = !categoriaFiltro.value || skill.categoria === categoriaFiltro.value
    return matchSearch && matchCategoria
  })
})

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await cargarSkills()
  }
})

const cargarSkills = async () => {
  await crud.read()
}

const abrirFormNueva = () => {
  crud.selectedItem.value = {
    id: null,
    nombre: '',
    descripcion: '',
    categoria: '',
    criticidad: 'Media',
    profesionalesConSkill: 0,
    demandaMercado: 0,
    esSkillCritico: false,
  }
  crud.isEditing.value = true
}

const guardarSkill = async () => {
  const validationRules = {
    nombre: crud.validations.required,
    categoria: crud.validations.required,
    criticidad: crud.validations.required,
  }

  if (crud.selectedItem.id) {
    // Actualizar
    const result = await crud.update(crud.selectedItem.id, crud.selectedItem, validationRules)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Skill actualizado correctamente',
        position: 'top',
      })
    }
  } else {
    // Crear
    const result = await crud.create(crud.selectedItem, validationRules)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Skill creado correctamente',
        position: 'top',
      })
    }
  }
}

const confirmarEliminar = (id) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que deseas eliminar este skill?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const result = await crud.delete_(id)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Skill eliminado correctamente',
        position: 'top',
      })
    }
  })
}

const getColorCriticidad = (criticidad) => {
  const colorMap = {
    Crítica: 'negative',
    Alta: 'warning',
    Media: 'info',
    Baja: 'positive',
  }
  return colorMap[criticidad] || 'grey'
}
</script>
