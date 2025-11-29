<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold">Gestión de Vacantes</h1>
        <p class="text-caption text-grey-7">Administra todas las vacantes abiertas</p>
      </div>
      <q-btn unelevated label="Nueva Vacante" color="positive" icon="add" @click="abrirFormNueva" />
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

    <!-- Tabla de Vacantes -->
    <div v-if="!crud.isEditing">
      <q-card>
        <q-card-section>
          <q-input
            v-model="busqueda"
            outlined
            dense
            placeholder="Buscar vacante..."
            icon="search"
            class="q-mb-md"
          />

          <q-table
            :rows="vacantesFiltradas"
            :columns="columns"
            row-key="id"
            flat
            bordered
            :loading="crud.loading"
            pagination.sync="pagination"
            @request="onRequest"
          >
            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
                <q-badge :label="props.row.estado" :color="getColorEstado(props.row.estado)" />
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
            {{ crud.selectedItem.id ? 'Editar Vacante' : 'Nueva Vacante' }}
          </h3>

          <q-form @submit="guardarVacante" class="q-gutter-md q-mt-md">
            <q-input
              v-model="crud.selectedItem.titulo"
              outlined
              label="Título de la Posición"
              :rules="[crud.validations.required]"
            />

            <q-input
              v-model="crud.selectedItem.descripcion"
              outlined
              label="Descripción"
              type="textarea"
              rows="4"
              :rules="[(val) => crud.validations.minLength(val, 10, 'Descripción')]"
            />

            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model="crud.selectedItem.area"
                  outlined
                  label="Área"
                  :rules="[crud.validations.required]"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model="crud.selectedItem.nivel"
                  outlined
                  label="Nivel"
                  :rules="[crud.validations.required]"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="crud.selectedItem.salarioMin"
                  outlined
                  label="Salario Mínimo"
                  type="number"
                  :rules="[crud.validations.number]"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="crud.selectedItem.salarioMax"
                  outlined
                  label="Salario Máximo"
                  type="number"
                  :rules="[crud.validations.number]"
                />
              </div>
            </div>

            <q-select
              v-model="crud.selectedItem.estado"
              outlined
              label="Estado"
              :options="['Abierta', 'En Proceso', 'Cerrada']"
              :rules="[crud.validations.required]"
            />

            <q-input
              v-model="crud.selectedItem.requisitos"
              outlined
              label="Requisitos (separados por coma)"
              type="textarea"
              rows="3"
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
import { vacanteService } from 'src/services/backend'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()

// Usar composable CRUD
const crud = useCRUD('Vacante', vacanteService)

const busqueda = ref('')
const pagination = ref({
  sortBy: 'titulo',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

const columns = [
  { name: 'titulo', label: 'Título', field: 'titulo', align: 'left' },
  { name: 'area', label: 'Área', field: 'area', align: 'left' },
  { name: 'nivel', label: 'Nivel', field: 'nivel', align: 'center' },
  { name: 'estado', label: 'Estado', field: 'estado', align: 'center' },
  { name: 'salarioMin', label: 'Salario Mín', field: 'salarioMin', align: 'center' },
  { name: 'acciones', label: 'Acciones', field: 'acciones', align: 'center' },
]

const vacantesFiltradas = computed(() => {
  return crud.items.filter((vacante) => {
    const search = busqueda.value.toLowerCase()
    return (
      vacante.titulo.toLowerCase().includes(search) || vacante.area.toLowerCase().includes(search)
    )
  })
})

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await cargarVacantes()
  }
})

const cargarVacantes = async () => {
  const result = await crud.read()
  if (result.success) {
    pagination.value.rowsNumber = crud.itemCount
  }
}

const abrirFormNueva = () => {
  crud.selectedItem.value = {
    id: null,
    titulo: '',
    descripcion: '',
    area: '',
    nivel: '',
    estado: 'Abierta',
    salarioMin: 0,
    salarioMax: 0,
    requisitos: '',
  }
  crud.isEditing.value = true
}

const guardarVacante = async () => {
  const validationRules = {
    titulo: crud.validations.required,
    area: crud.validations.required,
    nivel: crud.validations.required,
  }

  if (crud.selectedItem.id) {
    // Actualizar
    const result = await crud.update(crud.selectedItem.id, crud.selectedItem, validationRules)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Vacante actualizada correctamente',
        position: 'top',
      })
    }
  } else {
    // Crear
    const result = await crud.create(crud.selectedItem, validationRules)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Vacante creada correctamente',
        position: 'top',
      })
    }
  }
}

const confirmarEliminar = (id) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que deseas eliminar esta vacante?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const result = await crud.delete_(id)
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Vacante eliminada correctamente',
        position: 'top',
      })
    }
  })
}

const onRequest = async (props) => {
  // Aquí iría la paginación desde el backend
  pagination.value = props.pagination
}

const getColorEstado = (estado) => {
  const colorMap = {
    Abierta: 'positive',
    'En Proceso': 'warning',
    Cerrada: 'negative',
  }
  return colorMap[estado] || 'grey'
}
</script>
