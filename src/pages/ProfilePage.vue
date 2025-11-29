<template>
  <q-page>
    <!-- Este archivo redirige a MyProfilePage que es la versión actualizada -->
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/mi-perfil')
})
</script>

<style scoped></style>
