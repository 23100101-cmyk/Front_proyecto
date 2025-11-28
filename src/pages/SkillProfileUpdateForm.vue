<template>
  <q-layout view="lHh LpR fff" class="bg-grey-1 text-dark">

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      class="bg-white text-dark shadow-1"
    >
      <div class="q-pa-md text-subtitle1 text-weight-bold">Gestión de</div>

      <q-list class="q-pt-md">
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Panel</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="bg-blue-1 text-primary text-weight-bold">
          <q-item-section avatar><q-icon name="edit" /></q-item-section>
          <q-item-section>Evaluar habilidades</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="fact_check" /></q-item-section>
          <q-item-section>Evaluación de</q-item-section>
        </q-item>

        <q-separator spaced="sm" />

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="person_pin_circle" /></q-item-section>
          <q-item-section>Roles y niveles</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="inventory" /></q-item-section>
          <q-item-section>Inventario de</q-item-section>
        </q-item>

        <q-separator spaced="xl" />

         <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="absolute-bottom q-mb-xl">
          <q-item-section avatar><q-icon name="tune" /></q-item-section>
          <q-item-section>Ajustes</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="absolute-bottom q-mb-md">
          <q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section>Finalizar la sesión</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="row items-center justify-between q-mb-lg">
          <div class="text-h4 text-weight-bold">Actualizar</div>

          <div class="row q-gutter-md items-center">
            <q-btn flat dense icon="edit" label="Editar" color="primary" />
            <q-btn flat dense icon="settings" label="Configuración de seguridad" color="primary" />
            <q-icon name="notifications" size="sm" color="grey-6" />
            <q-btn flat dense icon="check_circle" label="Seleccionar" color="primary" />
            <q-avatar size="md">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Fátima</div>
          </div>
        </div>

        <q-separator class="q-mb-xl" />

        <div class="row q-col-gutter-lg">

          <div class="col-xs-12 col-md-7">

            <div class="text-h6 text-weight-medium q-mb-md">Skills del Colaborador</div>

            <q-card flat bordered class="q-pa-md q-mb-md bg-blue-1" v-for="(skill, index) in skills" :key="index">
              <div class="row q-col-gutter-md">
                <div class="col-xs-12 col-sm-6">
                  <q-input outlined :label="`Nombre de la habilidad ${index + 1}`" :value="skill.name" />
                </div>
                <div class="col-xs-12 col-sm-6">
                  <q-select outlined :label="`Nivel de dominio ${index + 1}`" :options="levelOptions" :value="skill.level" />
                </div>
              </div>
            </q-card>

            <q-btn flat icon="add" label="Agregar nueva skill" color="primary" class="q-mb-xl" @click="addSkill" />

            <div class="text-h6 text-weight-medium q-mb-md">Información de Contacto</div>

             <div class="row q-col-gutter-md q-mb-md">
                <div class="col-xs-12 col-sm-6">
                    <q-input outlined label="Correo electrónico" value="colaborador@ejemplo.com" />
                </div>
                 <div class="col-xs-12 col-sm-6">
                    <q-input outlined label="Número de teléfono" value="+XX XXX XXX XXX" />
                </div>
             </div>
             <q-input outlined label="Ubicación de la oficina" class="q-mb-md" value="Sede Central - Piso 5" />
          </div>

          <div class="col-xs-12 col-md-5">
            <div class="text-h6 text-weight-medium q-mb-md">Datos de Dirección</div>

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-xs-12 col-sm-6">
                <q-input outlined label="Código postal" value="15000" />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input outlined label="Ciudad" value="Lima" />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-xs-12 col-sm-6">
                <q-input outlined label="Estado" value="Lima Metropolitana" />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input outlined label="País" value="Perú" />
              </div>
            </div>
          </div>

        </div>

        <div class="q-mt-xl">
          <q-btn unelevated label="Guardar cambios" color="primary" size="lg" style="min-width: 250px;" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SkillProfileUpdateForm',
  setup () {
    const skills = ref([
      { name: 'JavaScript', level: 'Avanzado' },
      { name: 'Vue.js', level: 'Intermedio' },
    ]);

    const levelOptions = ref(['Básico', 'Intermedio', 'Avanzado', 'Experto']);

    // Función para simular el agregado de una nueva skill (Criterio de Aceptación)
    const addSkill = () => {
      skills.value.push({ name: '', level: '' });
    };

    return {
      skills,
      levelOptions,
      addSkill
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
