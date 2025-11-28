## Guía de Integración Backend - Quasar (VITE)

### Puerto de Desarrollo
- **Frontend (Quasar):** `http://localhost:9000`
- **Backend:** `https://localhost:5001` (configurable en `.env.local`)

### Archivos Principales Creados/Modificados

#### 1. `src/boot/axios.js`
- Configura axios con `VITE_API_URL` como `baseURL`
- Incluye interceptores para:
  - **Errores globales:** manejo de 401, 403, 500
  - **Autenticación:** adjunta token Bearer (comentado, descomentar si lo necesitas)
  - **Logging:** muestra errores en consola

**Cómo habilitar token de autenticación:**
```javascript
// En src/boot/axios.js, descomentar:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
```

#### 2. `.env.local`
```env
VITE_API_URL=https://localhost:5001
```
- Usa este archivo para desarrollo local
- Reinicia `npm run dev` después de cambiar variables de entorno

#### 3. `.env`
```env
VITE_API_URL=https://api.example.com
```
- URL de fallback para producción o si `.env.local` no existe

#### 4. `src/services/api.js`
Servicios centralizados organizados por recurso:

**authService:**
- `login(username, password)` → POST `/auth/login`
- `logout()` → POST `/auth/logout`
- `register(userData)` → POST `/auth/register`
- `getCurrentUser()` → GET `/auth/me`

**userService:**
- `getAll(params)` → GET `/users`
- `getById(id)` → GET `/users/{id}`
- `create(userData)` → POST `/users`
- `update(id, userData)` → PUT `/users/{id}`
- `delete(id)` → DELETE `/users/{id}`
- `getProfile(id)` → GET `/users/{id}/profile`
- `updateProfile(id, profileData)` → PUT `/users/{id}/profile`

**courseService:**
- `getAll(params)` → GET `/courses`
- `getById(id)` → GET `/courses/{id}`
- `create(courseData)` → POST `/courses`
- `enroll(courseId)` → POST `/courses/{courseId}/enroll`
- `getProgress(courseId)` → GET `/courses/{courseId}/progress`

**skillService:**
- `getAll(params)` → GET `/skills`
- `getUserSkills(userId)` → GET `/users/{userId}/skills`
- `updateUserSkill(userId, skillId, level)` → PUT `/users/{userId}/skills/{skillId}`
- `matchSkills(skillIds)` → POST `/skills/match`

**healthService:**
- `check()` → GET `/health` (verifica que el backend está en línea)

**apiService:** Métodos genéricos
- `get(endpoint, config)` → GET
- `post(endpoint, data, config)` → POST
- `put(endpoint, data, config)` → PUT
- `patch(endpoint, data, config)` → PATCH
- `delete(endpoint, config)` → DELETE
- `postForm(endpoint, formData)` → POST multipart (para uploads)

---

### Cómo Usar en Componentes

#### **Opción 1: Composition API (Recomendado)**
```vue
<template>
  <div>
    <button @click="fetchUsers">Cargar Usuarios</button>
    <div v-if="loading">Cargando...</div>
    <div v-if="error" class="text-red">{{ error }}</div>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userService } from 'src/services/api'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await userService.getAll()
    users.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
```

#### **Opción 2: Options API (antiguo pero válido)**
```vue
<script>
export default {
  data() {
    return { users: [], loading: false }
  },
  methods: {
    fetchUsers() {
      this.$api.get('/users')
        .then(res => this.users = res.data)
        .catch(err => console.error(err))
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>
```

#### **Opción 3: Importar servicio directamente**
```javascript
import { userService } from 'src/services/api'

async function loadUsers() {
  try {
    const response = await userService.getAll()
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

### Manejo de Autenticación (con Pinia)

#### **Crear store de autenticación:**
```javascript
// stores/auth.js
import { defineStore } from 'pinia'
import { authService } from 'src/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken'),
    isLoggedIn: !!localStorage.getItem('authToken'),
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await authService.login(username, password)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('authToken', this.token)
        this.isLoggedIn = true
        return response.data
      } catch (error) {
        this.isLoggedIn = false
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      localStorage.removeItem('authToken')
    },
  },
})
```

#### **Usar en componente:**
```vue
<script setup>
import { useAuthStore } from 'stores/auth'

const auth = useAuthStore()

const handleLogin = async () => {
  try {
    await auth.login('usuario@ejemplo.com', 'password')
    console.log('Sesión iniciada')
  } catch (error) {
    console.error('Error de login:', error)
  }
}
</script>
```

---

### Problemas Comunes

#### **Error: "Failed to connect to localhost:5001"**
- El backend no está ejecutándose. Asegúrate de:
  1. Tener el backend en ejecución en `https://localhost:5001`
  2. Que el certificado HTTPS sea válido o aceptar excepciones en el navegador
  3. Habilitar CORS en el backend para `http://localhost:9000`

#### **Error: "Certificate verification failed"**
- Para desarrollo local con certificado autofirmado:
  - En el navegador: ir a `https://localhost:5001` y aceptar la advertencia
  - O configurar axios para ignorar el certificado (solo desarrollo):
    ```javascript
    import https from 'https'
    const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    })
    ```

#### **Error: "CORS policy"**
- El backend debe tener CORS habilitado. Ejemplo en ASP.NET Core:
  ```csharp
  services.AddCors(options => {
    options.AddPolicy("AllowFrontend", builder => {
      builder.WithOrigins("http://localhost:9000")
             .AllowAnyMethod()
             .AllowAnyHeader();
    });
  });
  ```

---

### Próximos Pasos

1. **Verificar conexión:** Ejecuta `npm run dev` y abre el navegador en `http://localhost:9000`
2. **Prueba de salud:** En DevTools → Console, ejecuta:
   ```javascript
   import { healthService } from 'src/services/api'
   healthService.check().then(r => console.log(r.data))
   ```
3. **Implementar login:** Usa `authService.login()` en tu página de login
4. **Adaptar endpoints:** Modifica `src/services/api.js` según tus rutas reales del backend

---

### Comandos Útiles

```powershell
# Instalar dependencias
npm install

# Ejecutar dev server
npm run dev

# Build para producción
npm build

# Verificar puerto 9000 abierto
netstat -ano | Select-String ":9000"

# Verificar puerto 5001 (backend)
netstat -ano | Select-String ":5001"

# Probar backend
curl.exe -k -I https://localhost:5001/health
```
