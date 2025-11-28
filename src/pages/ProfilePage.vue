<template>
  <q-layout view="hHh Lpr lff">
    <q-drawer show-if-above :width="80" :breakpoint="500" side="left" class="bg-grey-2">
      <q-list class="q-pt-md text-grey-7">
        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar>
            <q-icon name="close" size="sm" class="cursor-pointer" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Inicio</q-tooltip>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Buscar</q-tooltip>
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar>
            <q-icon name="workspace_premium" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
            >Certificados</q-tooltip
          >
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1">
          <q-item-section avatar>
            <q-icon name="bookmark" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
            >Guardados</q-tooltip
          >
        </q-item>

        <q-item clickable v-ripple exact active-class="text-primary bg-blue-1" class="q-mt-xl">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
            >Mi perfil</q-tooltip
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-md-8">
            <q-card flat bordered class="q-mb-md">
              <q-card-section class="row items-center q-pb-none">
                <q-avatar size="100px">
                  <img :src="currentUser?.avatar || 'https://cdn.quasar.dev/img/avatar.png'" />
                </q-avatar>
                <div class="q-ml-lg">
                  <div class="text-h6 text-weight-bold">{{ currentUser?.name || 'Usuario' }}</div>
                  <div class="text-caption text-grey-6">{{ currentUser?.country || '+ PERÚ' }}</div>
                  <div class="row q-gutter-x-lg q-mt-sm text-center">
                    <div>
                      <div class="text-subtitle1 text-weight-bold">
                        {{ currentUser?.coursesCompleted || 0 }}
                      </div>
                      <div class="text-caption text-grey-7">Cursos</div>
                    </div>
                    <div>
                      <div class="text-subtitle1 text-weight-bold">
                        {{ currentUser?.connections || 0 }}
                      </div>
                      <div class="text-caption text-grey-7">Conexiones</div>
                    </div>
                    <div>
                      <div class="text-subtitle1 text-weight-bold">
                        {{ currentUser?.followers || 0 }}
                      </div>
                      <div class="text-caption text-grey-7">Seguidores</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <div class="text-h6 q-my-md">Estadísticas</div>
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-4">
                <q-card flat bordered class="text-center q-pa-md">
                  <q-icon name="insights" size="xl" color="grey-5" />
                  <div class="text-h6 text-weight-bold q-mt-sm">3</div>
                  <div class="text-caption text-grey-7">Habilidades técnicas</div>
                </q-card>
              </div>
              <div class="col-4">
                <q-card flat bordered class="text-center q-pa-md">
                  <q-icon name="schedule" size="xl" color="grey-5" />
                  <div class="text-h6 text-weight-bold q-mt-sm">40</div>
                  <div class="text-caption text-grey-7">Horarios disponibles</div>
                </q-card>
              </div>
              <div class="col-4">
                <q-card flat bordered class="text-center q-pa-md">
                  <q-icon name="military_tech" size="xl" color="grey-5" />
                  <div class="text-h6 text-weight-bold q-mt-sm">7</div>
                  <div class="text-caption text-grey-7">Habilidades</div>
                </q-card>
              </div>
            </div>

            <div class="text-h6 q-my-md">Logros</div>
            <q-card flat bordered class="q-pa-md">
              <div class="row items-center q-mb-md">
                <q-icon name="star" size="md" color="blue-8" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1">Dominio de la habilidad</div>
                  <div class="text-caption text-grey-7">Completar todas las certificaciones</div>
                </div>
              </div>
              <div class="row items-center q-gutter-x-md">
                <div class="text-weight-bold text-caption">3/5</div>
                <q-linear-progress :value="0.6" color="green" size="10px" class="col-grow" />
              </div>

              <q-separator spaced="lg" />

              <div class="row items-center q-mb-md">
                <q-icon name="emoji_events" size="md" color="red-5" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1">Puntos ganados</div>
                  <div class="text-caption text-grey-7">Gana 3500 puntos más</div>
                </div>
              </div>
              <div class="row items-center q-gutter-x-md">
                <div class="text-weight-bold text-caption">1500/5000</div>
                <q-linear-progress :value="0.3" color="red" size="10px" class="col-grow" />
              </div>
            </q-card>
          </div>

          <div class="col-xs-12 col-md-4">
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Sugerencias de habilidades</div>
                <q-list class="q-mt-sm">
                  <q-item dense>
                    <q-item-section avatar>
                      <q-avatar size="md">
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Rebeca Martínez</q-item-section>
                    <q-item-section side>
                      <q-btn flat dense icon="add" color="blue-grey-6" size="sm" />
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section avatar>
                      <q-avatar size="md">
                        <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Nicolás Álvaro</q-item-section>
                    <q-item-section side>
                      <q-btn flat dense icon="check" color="primary" size="sm" />
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-btn flat dense label="Ver todo" color="primary" class="q-mt-sm" />
              </q-card-section>
            </q-card>

            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Conexiones</div>
                <q-list class="q-mt-sm">
                  <q-item dense>
                    <q-item-section avatar>
                      <q-avatar size="md">
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Braulio</q-item-section>
                    <q-item-section side>
                      <q-btn unelevated dense label="Perfil" color="primary" size="sm" />
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section avatar>
                      <q-avatar size="md">
                        <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Eleazar Rivera</q-item-section>
                    <q-item-section side>
                      <q-btn unelevated dense label="Perfil" color="primary" size="sm" />
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-btn flat dense label="Ver todo" color="primary" class="q-mt-sm" />
              </q-card-section>
            </q-card>

            <div class="row q-gutter-sm">
              <q-btn unelevated class="col" label="Encuentra oportunidades" color="blue-grey-6" />
              <q-btn unelevated class="col" label="Invitar Amigos" color="primary" />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { userService } from 'src/services/api'

export default {
  name: 'ProfilePage',
  setup() {
    const $q = useQuasar()
    const currentUser = ref(null)
    const loading = ref(true)

    onMounted(async () => {
      try {
        // Obtener perfil del usuario actual
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          // Opcional: traer datos actualizados del backend
          const response = await userService.getProfile(user.id)
          currentUser.value = response.data
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error)
        $q.notify({
          type: 'negative',
          message: 'Error al cargar el perfil.',
        })
      } finally {
        loading.value = false
      }
    })

    return {
      currentUser,
      loading,
    }
  },
}
</script>

<style scoped>
/* Estilos opcionales si fueran necesarios */
</style>
