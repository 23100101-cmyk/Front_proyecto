<template>
  <q-page class="q-pa-xl">
    <div class="row q-col-gutter-xl">

      <div class="col-xs-12 col-md-7">

        <div class="row q-col-gutter-lg items-center q-mb-xl">
          <div class="col-auto">
            <q-avatar size="100px"><img src="https://cdn.quasar.dev/img/avatar.png"></q-avatar>
          </div>
          <div class="col-grow">
            <div class="text-h5 text-weight-bold">Fátima Rivasplata Núñez</div>
            <div class="text-caption text-green-7">+ PERÚ</div>
            <div class="row q-gutter-xl q-mt-sm">
              <div class="text-center">
                <div class="text-subtitle1 text-weight-bold">5</div>
                <div class="text-caption text-grey-7">Meses</div>
              </div>
              <div class="text-center">
                <div class="text-subtitle1 text-weight-bold">2</div>
                <div class="text-caption text-grey-7">Conexiones</div>
              </div>
              <div class="text-center">
                <div class="text-subtitle1 text-weight-bold">30</div>
                <div class="text-caption text-grey-7">Seguidores</div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-h6 text-weight-bold q-mb-md">Estadísticas</div>
        <div class="row q-col-gutter-lg q-mb-xl">
          <div v-for="stat in stats" :key="stat.label" class="col-xs-12 col-sm-4">
            <q-card flat class="bg-white text-center q-pa-md shadow-2">
              <q-icon :name="stat.icon" size="lg" color="primary" class="q-mb-sm" />
              <div class="text-h6 text-weight-bold">{{ stat.value }}</div>
              <div class="text-caption text-grey-7">{{ stat.label }}</div>
            </q-card>
          </div>
        </div>

        <div class="text-h6 text-weight-bold q-mb-md">Logros</div>
        <div class="q-mb-md">
            <q-card flat class="bg-white q-pa-md shadow-2">
                <div class="row items-center q-gutter-md">
                    <q-icon name="star" size="lg" color="blue" />
                    <div class="col-grow">
                        <div class="text-subtitle1 text-weight-bold">Dominio de la habilidad</div>
                        <div class="text-caption text-grey-7">Completa todas las certificaciones (3/5)</div>
                        <q-linear-progress :value="3/5" color="green-7" track-color="grey-3" class="q-mt-xs" style="height: 8px;" />
                    </div>
                    <div class="text-subtitle2 text-grey-7">3/5</div>
                </div>
            </q-card>
        </div>
        <div>
             <q-card flat class="bg-white q-pa-md shadow-2">
                <div class="row items-center q-gutter-md">
                    <q-icon name="emoji_events" size="lg" color="red-6" />
                    <div class="col-grow">
                        <div class="text-subtitle1 text-weight-bold">Puntos ganados</div>
                        <div class="text-caption text-grey-7">Gana 3500 puntos más (1000/5000)</div>
                        <q-linear-progress :value="1000/5000" color="red-6" track-color="grey-3" class="q-mt-xs" style="height: 8px;" />
                    </div>
                    <div class="text-subtitle2 text-grey-7">1000/5000</div>
                </div>
            </q-card>
        </div>
      </div>

      <div class="col-xs-12 col-md-5">

        <div class="text-h6 text-weight-bold q-mb-md">Sugerencias de habilidades</div>
        <q-card flat class="bg-white q-pa-md q-mb-xl shadow-2">
          <q-list separator>
            <q-item v-for="suggestion in suggestions" :key="suggestion.name">
              <q-item-section avatar><q-avatar size="md"><img :src="suggestion.avatar"></q-avatar></q-item-section>
              <q-item-section>{{ suggestion.name }}</q-item-section>
              <q-item-section side>
                <q-btn flat :icon="suggestion.status === 'plus' ? 'add' : 'check'" :color="suggestion.status === 'plus' ? 'primary' : 'green-6'" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn flat label="Ver todas las sugerencias" color="primary" class="q-mt-md full-width" />
        </q-card>

        <div class="text-h6 text-weight-bold q-mb-md">Conexiones</div>
        <q-card flat class="bg-white q-pa-md q-mb-xl shadow-2">
          <q-list separator>
            <q-item v-for="connection in connections" :key="connection.name">
              <q-item-section avatar><q-avatar size="md"><img :src="connection.avatar"></q-avatar></q-item-section>
              <q-item-section>{{ connection.name }}</q-item-section>
              <q-item-section side><q-btn unelevated label="Ver Perfil" color="primary" size="sm" /></q-item-section>
            </q-item>
          </q-list>
          <q-btn flat label="Ver todas las conexiones" color="primary" class="q-mt-md full-width" />
        </q-card>

        <div class="row q-col-gutter-md">
            <div class="col-6"><q-btn unelevated label="Encontrar oportunidades" color="primary" class="full-width" /></div>
            <div class="col-6"><q-btn unelevated label="Invitar Amigos" color="primary" class="full-width" /></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UserProfileDashboard',
  setup () {
    const stats = ref([
      { label: 'Habilidades Técnicas', value: 3, icon: 'code' },
      { label: 'Horarios Disponibles', value: 40, icon: 'schedule' },
      { label: 'Total de Habilidades', value: 7, icon: 'star' },
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
