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
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="bg-blue-1 text-primary text-weight-bold">
          <q-item-section avatar><q-icon name="search" /></q-item-section>
          <q-item-section>Buscar Colaborador</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Generales</q-item-section>
        </q-item>

        <q-separator spaced="sm" />

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="code" /></q-item-section>
          <q-item-section>Habilidades técnicas</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="handshake" /></q-item-section>
          <q-item-section>Habilidades Blandos</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="military_tech" /></q-item-section>
          <q-item-section>Certificados</q-item-section>
        </q-item>

        <q-separator spaced="xl" />

         <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="absolute-bottom q-mb-xl">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Configuraciones</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="absolute-bottom q-mb-md">
          <q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section>Sesión</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-xl">

        <div class="text-h4 text-weight-bold q-mb-lg">Perfil del Colaborador</div>

        <div class="row q-col-gutter-lg">

          <div class="col-xs-12 col-md-4">
            <q-card flat bordered class="q-pa-md bg-white">

              <div class="row items-center q-mb-lg">
                <q-avatar size="60px" class="q-mr-md">
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
                <div>
                  <div class="text-h6">@Juan Perez</div>
                  <div class="text-caption text-primary cursor-pointer">Actualizar foto</div>
                </div>
              </div>

              <q-form>
                <q-input outlined dense label="Nombre completo" value="Juan Pérez" class="q-mb-sm" />
                <q-input outlined dense label="Correo electrónico" value="juan.perez@empresa.com" class="q-mb-sm" />
                <q-input outlined dense label="Teléfono" value="+34 600 123 456" class="q-mb-md" />

                <div class="row q-col-gutter-sm q-mb-sm">
                  <div class="col-6">
                    <q-input outlined dense label="Fecha de nacimiento" value="01/01/1990" />
                  </div>
                  <div class="col-6">
                    <q-input outlined dense label="Nacionalidad" value="Mexicana" />
                  </div>
                </div>

                <q-input outlined dense label="Idiomas hablados" value="Español, Inglés" class="q-mb-md" />
                <q-input outlined dense label="Dirección" value="Calle Ejemplo 10, Ciudad, México" class="q-mb-md" />
                <q-input outlined dense label="Contacto familiar" value="+94 611 234 567" class="q-mb-md" />

                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-input outlined dense label="Alergias" value="Ninguno" />
                  </div>
                  <div class="col-6">
                    <q-input outlined dense label="Diversidad funcional" />
                  </div>
                </div>
              </q-form>
            </q-card>
          </div>

          <div class="col-xs-12 col-md-8">
            <div class="row q-col-gutter-lg">

              <div class="col-12">
                <div class="text-h6 text-weight-bold q-mb-md">Habilidades</div>
                <q-card flat class="bg-blue-grey-1">
                  <q-list separator>
                    <q-item v-for="skill in skills" :key="skill.name">
                      <q-item-section avatar>
                        <q-icon :name="skill.icon" color="black" />
                      </q-item-section>
                      <q-item-section class="text-weight-medium">{{ skill.name }}</q-item-section>
                      <q-item-section side>
                        <q-btn flat dense label="Editor" color="primary" icon="edit" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>

              <div class="col-12">
                <div class="text-h6 text-weight-bold q-mb-md">Certificados</div>
                <q-card flat class="bg-blue-grey-1">
                  <q-list separator>
                    <q-item v-for="cert in certificates" :key="cert.name">
                      <q-item-section avatar>
                        <q-icon :name="cert.icon" color="primary" />
                      </q-item-section>
                      <q-item-section class="text-weight-medium">{{ cert.name }}</q-item-section>
                      <q-item-section side>
                        <q-btn flat dense label="Editor" color="primary" icon="edit" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar><q-icon name="add_circle" color="green-7" /></q-item-section>
                      <q-item-section class="text-green-7 text-weight-bold cursor-pointer">
                        Registrar Nuevo Certificado
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <div class="q-pt-sm q-px-md text-caption text-grey-7">
                        *Individuos descentralizados gozabo
                    </div>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CollaboratorProfileManager',
  setup () {
    const skills = ref([
      { name: 'Gestión de Proyectos', icon: 'star' },
      { name: 'Comunicación Efectiva', icon: 'star' },
      { name: 'Trabajo en equipo', icon: 'star' },
      { name: 'Resolución de problemas', icon: 'star' },
    ]);

    const certificates = ref([
      { name: 'Certificado PMP', icon: 'fiber_manual_record' },
      { name: 'Certificado en Agile', icon: 'fiber_manual_record' },
      { name: 'Certificado en Scrum', icon: 'fiber_manual_record' },
    ]);

    return {
      skills,
      certificates
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
