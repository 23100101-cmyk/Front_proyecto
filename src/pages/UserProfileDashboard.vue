<template>
  <q-layout view="lHh LpR fff" class="bg-dark text-white">

    <q-drawer
      show-if-above
      :width="80"
      :breakpoint="500"
      side="left"
      class="bg-grey-10 text-white"
    >
      <q-list class="q-pt-md text-center">
        <q-item clickable class="q-pb-lg"><q-icon name="close" size="sm" class="q-ml-sm" /></q-item>
        <q-item clickable class="q-pb-lg"><q-icon name="settings" size="sm" class="q-ml-sm" /></q-item>

        <q-separator color="grey-9" spaced="md" />

        <q-item clickable v-ripple exact active-class="text-primary bg-grey-9" class="q-mb-md">
          <q-item-section><q-icon name="home" /></q-item-section>
          <q-item-section caption>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-grey-9" class="q-mb-md">
          <q-item-section><q-icon name="search" /></q-item-section>
          <q-item-section caption>Buscar</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-grey-9" class="q-mb-md">
          <q-item-section><q-icon name="badge" /></q-item-section>
          <q-item-section caption>Certificados</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-grey-9" class="q-mb-md">
          <q-item-section><q-icon name="bookmark" /></q-item-section>
          <q-item-section caption>Guardados</q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-grey-9" class="q-mb-md">
          <q-item-section><q-icon name="person" /></q-item-section>
          <q-item-section caption>Mi perfil</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-header class="bg-grey-10 text-white">
      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="arrow_back" class="q-mr-md" />
        <q-btn flat dense icon="crop_square" class="q-mr-md" />
        <q-avatar size="sm" class="q-mr-sm bg-blue-grey-2 text-black text-weight-bold">JA</q-avatar>
        <q-btn flat dense icon="close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-xl">
        <div class="row q-col-gutter-xl">

          <div class="col-xs-12 col-md-7">

            <div class="row q-col-gutter-lg items-center q-mb-xl">
              <div class="col-auto">
                <q-avatar size="100px">
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
              </div>
              <div class="col-grow">
                <div class="text-h5 text-weight-bold">Fátima Rivasplata Núñez</div>
                <div class="text-caption text-green-5">+ PERU</div>
                <div class="row q-gutter-xl q-mt-sm">
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">5</div>
                    <div class="text-caption text-grey-5">Mts</div>
                  </div>
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">2</div>
                    <div class="text-caption text-grey-5">Conexiones</div>
                  </div>
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">30</div>
                    <div class="text-caption text-grey-5">Seguidores</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-h6 text-weight-bold q-mb-md">Estadísticas</div>
            <div class="row q-col-gutter-lg q-mb-xl">
              <div v-for="stat in stats" :key="stat.label" class="col-xs-12 col-sm-4">
                <q-card dark class="bg-grey-9 text-center q-pa-md">
                  <q-icon :name="stat.icon" size="lg" color="primary" class="q-mb-sm" />
                  <div class="text-h6 text-weight-bold">{{ stat.value }}</div>
                  <div class="text-caption text-grey-5">{{ stat.label }}</div>
                </q-card>
              </div>
            </div>

            <div class="text-h6 text-weight-bold q-mb-md">Logros</div>
            <div class="q-mb-md">
                <q-card dark flat class="bg-grey-9 q-pa-md">
                    <div class="row items-center q-gutter-md">
                        <q-icon name="star" size="lg" color="blue" />
                        <div class="col-grow">
                            <div class="text-subtitle1 text-weight-bold">Dominio de la habilidad</div>
                            <div class="text-caption text-grey-5">Completar todas las certificaciones</div>
                            <q-linear-progress :value="3/5" color="green-6" track-color="grey-7" class="q-mt-xs" style="height: 8px;" />
                        </div>
                        <div class="text-subtitle2 text-grey-5">3/5</div>
                    </div>
                </q-card>
            </div>
            <div>
                 <q-card dark flat class="bg-grey-9 q-pa-md">
                    <div class="row items-center q-gutter-md">
                        <q-icon name="emoji_events" size="lg" color="primary" />
                        <div class="col-grow">
                            <div class="text-subtitle1 text-weight-bold">Puntos ganados</div>
                            <div class="text-caption text-grey-5">Gana 3500 puntos más</div>
                            <q-linear-progress :value="1000/5000" color="red-6" track-color="grey-7" class="q-mt-xs" style="height: 8px;" />
                        </div>
                        <div class="text-subtitle2 text-grey-5">1000/5000</div>
                    </div>
                </q-card>
            </div>
          </div>

          <div class="col-xs-12 col-md-5">

            <div class="text-h6 text-weight-bold q-mb-md">Sugerencias de habilidades</div>
            <q-card dark flat class="bg-grey-9 q-pa-md q-mb-xl">
              <q-list separator>
                <q-item v-for="suggestion in suggestions" :key="suggestion.name">
                  <q-item-section avatar>
                    <q-avatar size="md"><img :src="suggestion.avatar"></q-avatar>
                  </q-item-section>
                  <q-item-section>{{ suggestion.name }}</q-item-section>
                  <q-item-section side>
                    <q-btn flat :icon="suggestion.status === 'plus' ? 'add' : 'check'" :color="suggestion.status === 'plus' ? 'primary' : 'green-6'" />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-btn flat label="Ver todo" color="primary" class="q-mt-md full-width" />
            </q-card>

            <div class="text-h6 text-weight-bold q-mb-md">Conexiones</div>
            <q-card dark flat class="bg-grey-9 q-pa-md q-mb-xl">
              <q-list separator>
                <q-item v-for="connection in connections" :key="connection.name">
                  <q-item-section avatar>
                    <q-avatar size="md"><img :src="connection.avatar"></q-avatar>
                  </q-item-section>
                  <q-item-section>{{ connection.name }}</q-item-section>
                  <q-item-section side>
                    <q-btn unelevated label="Perfil" color="primary" size="sm" />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-btn flat label="Ver todo" color="primary" class="q-mt-md full-width" />
            </q-card>

            <div class="row q-col-gutter-md">
                <div class="col-6">
                    <q-btn unelevated label="Encuentra oportunidades" color="primary" class="full-width" />
                </div>
                 <div class="col-6">
                    <q-btn unelevated label="Invitar Amigos" color="primary" class="full-width" />
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
  name: 'UserProfileDashboard',
  setup () {
    const stats = ref([
      { label: 'Habilidades técnicas', value: 3, icon: 'code' },
      { label: 'Horarios disponibles', value: 40, icon: 'schedule' },
      { label: 'Habilidades', value: 7, icon: 'star' },
    ])

    const suggestions = ref([
      { name: 'Rebeca Martínez', avatar: 'https://cdn.quasar.dev/img/avatar.png', status: 'plus' },
      { name: 'Nicolás Álvaro', avatar: 'https://cdn.quasar.dev/img/avatar.png', status: 'check' },
    ])

    const connections = ref([
      { name: 'Braulio', avatar: 'https://cdn.quasar.dev/img/avatar.png', },
      { name: 'Eleazar Rivera', avatar: 'https://cdn.quasar.dev/img/avatar.png', },
    ])

    return {
      stats,
      suggestions,
      connections
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
