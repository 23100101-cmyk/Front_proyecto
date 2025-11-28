## Mapeo de Datos Frontend ↔ Backend

Este documento describe cómo se relacionan los datos del frontend con los endpoints del backend.

---

### 📋 Resumen de Conexiones

| Página    | Componente          | Datos Mostrados                        | Endpoint Backend                              | Servicio                       |
| --------- | ------------------- | -------------------------------------- | --------------------------------------------- | ------------------------------ |
| Login     | `Login.vue`         | Validación de credenciales             | `POST /auth/login`                            | `authService.login()`          |
| Dashboard | `IndexPage.vue`     | Usuario, trabajos, cursos recomendados | `GET /users`, `GET /courses?recommended=true` | `userService`, `courseService` |
| Catálogo  | `CourseCatalog.vue` | Lista de cursos filtrados              | `GET /courses`                                | `courseService.getAll()`       |
| Perfil    | `ProfilePage.vue`   | Datos del usuario y estadísticas       | `GET /users/{id}/profile`                     | `userService.getProfile()`     |

---

### 🔌 Detalle de Endpoints y Mapeo

#### 1. **Login.vue** → Autenticación

```
Flujo:
1. Usuario ingresa email/DNI y contraseña
2. onSubmit() llama a authService.login(email, password)
3. Backend valida credenciales → retorna token + user
4. Se guardan en localStorage:
   - authToken (para autorización futura)
   - user (nombre, id, avatar, etc.)
5. Se redirige a /mi-perfil-dashboard

Datos esperados en response.data:
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "Fátima Rivasplata",
    "email": "fatima@empresa.com",
    "avatar": "https://...",
    "country": "+ PERÚ"
  }
}
```

---

#### 2. **IndexPage.vue** → Dashboard Principal

```
Flujo:
1. Al montar el componente, se llama onMounted()
2. Se hace Promise.all() con dos llamadas paralelas:
   - userService.getAll({ limit: 3 })
   - courseService.getAll({ limit: 3, recommended: true })
3. Se actualizan currentUser, internalJobs, recommendedCourses

Datos mostrados en template:
- currentUser.name → Encabezado
- currentUser.avatar → Avatar en encabezado
- internalJobs[] → Lista de oportunidades de movilidad
  * title (puesto)
  * department (departamento)
  * matchScore (% de compatibilidad)
  * missingSkills (cantidad de skills faltantes)
- recommendedCourses[] → Plan personalizado
  * title
  * icon
  * reason (por qué se recomienda)

Datos esperados en response.data:
{
  "internalJobs": [
    {
      "id": 1,
      "title": "Arquitecto de Soluciones",
      "department": "Innovación",
      "matchScore": 78,
      "missingSkills": 4
    }
  ],
  "recommendedCourses": [
    {
      "id": 1,
      "title": "Liderazgo Situacional",
      "icon": "cast_for_education",
      "reason": "Cierre de Brecha: Liderazgo (Soft Skill) - Urgente"
    }
  ]
}
```

---

#### 3. **CourseCatalog.vue** → Explorar Cursos

```
Flujo:
1. Al montar, onMounted() llama courseService.getAll()
2. Se cargan todos los cursos en allCourses ref
3. El template aplica filtrado en cliente:
   - searchText → busca en title y description
   - selectedCategory → filtra por category
   - selectedType → filtra por type
4. enrollCourse(courseId) → POST /courses/{id}/enroll

Datos mostrados:
- course.title
- course.description
- course.category (Liderazgo, Ventas, Técnico, Habilidades Blandas)
- course.type (Certificación, Curso Corto, Clase en Vivo)
- course.time (40 horas)
- course.rating (4.8)
- course.reviews (150)
- course.img (URL de imagen)

Datos esperados en response.data:
[
  {
    "id": 1,
    "title": "Gestión de Proyectos Ágil",
    "description": "Metodología Scrum y Kanban.",
    "category": "Técnico",
    "type": "Certificación",
    "time": "40 horas",
    "rating": 4.8,
    "reviews": 150,
    "img": "https://..."
  }
]
```

---

#### 4. **ProfilePage.vue** → Perfil del Usuario

```
Flujo:
1. Al montar, onMounted() obtiene el usuario de localStorage
2. Opcional: llama userService.getProfile(userId) para datos actualizados
3. Se muestra información y estadísticas del usuario

Datos mostrados:
- currentUser.name → Nombre completo
- currentUser.avatar → Foto de perfil
- currentUser.country → País
- currentUser.coursesCompleted → Número de cursos completados
- currentUser.connections → Conexiones
- currentUser.followers → Seguidores

Datos esperados en response.data (getProfile):
{
  "id": 1,
  "name": "Fátima Rivasplata Núñez",
  "avatar": "https://...",
  "country": "+ PERÚ",
  "coursesCompleted": 5,
  "connections": 2,
  "followers": 30,
  "email": "fatima@empresa.com",
  "technicalSkills": 3,
  "availableHours": 40
}
```

---

### 🔐 Autenticación y Tokens

#### Flujo de Token (con interceptor)

1. **Login exitoso** → `localStorage.setItem('authToken', token)`

2. **En cada petición** → Interceptor de axios adjunta el token:

```javascript
// src/boot/axios.js (descomentar para activar)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

3. **Si token expira (401)** → Interceptor detecta y puede:
   - Refrescar el token
   - Limpiar sesión
   - Redirigir a login

---

### 📝 Estructura de Datos en LocalStorage

Después del login, se guardan:

```javascript
// Token de autenticación (usado en Authorization header)
localStorage.getItem('authToken')
// Resultado: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Datos del usuario actual
localStorage.getItem('user')
// Resultado: { "id": 1, "name": "Fátima", "email": "...", "avatar": "..." }
```

---

### 🔄 Flujo de Actualización (Refresh Data)

En **IndexPage.vue**, hay un botón "Actualizar Data" que:

1. Llama `refreshData()`
2. Hace nuevas peticiones al backend
3. Actualiza `internalJobs` y `recommendedCourses`
4. Muestra notificación de éxito/error

```javascript
const refreshData = async () => {
  loading.value = true
  try {
    const [jobsRes, coursesRes] = await Promise.all([
      userService.getAll({ limit: 3 }),
      courseService.getAll({ limit: 3, recommended: true }),
    ])
    internalJobs.value = jobsRes.data
    recommendedCourses.value = coursesRes.data
    $q.notify({ type: 'positive', message: 'Datos actualizados.' })
  } catch (error) {
    // Manejar error
  } finally {
    loading.value = false
  }
}
```

---

### ⚠️ Errores Comunes y Solución

| Error                                 | Causa                         | Solución                                                 |
| ------------------------------------- | ----------------------------- | -------------------------------------------------------- |
| "Cannot read property 'name' of null" | currentUser es null           | Verificar que localStorage.getItem('user') retorna datos |
| "404 Not Found" en /users             | Endpoint no existe en backend | Ajustar ruta en src/services/api.js                      |
| "401 Unauthorized"                    | Token expirado o no enviado   | Verificar que el token se guarda y se adjunta en header  |
| "No se cargan cursos"                 | courseService.getAll() falla  | Revisar respuesta en DevTools Network tab                |

---

### 📱 Cambios Realizados

**Archivos modificados:**

1. **`src/pages/Login.vue`**
   - Ahora llama `authService.login()` contra el backend
   - Guarda token y usuario en localStorage
   - Maneja errores con notificaciones

2. **`src/pages/CourseCatalog.vue`**
   - Carga cursos con `courseService.getAll()` en onMounted
   - Botón "Inscribirme" ejecuta `enrollCourse(courseId)`
   - Muestra loading mientras se cargan cursos

3. **`src/pages/IndexPage.vue`**
   - Carga datos del usuario y recomendaciones en paralelo
   - Botón "Actualizar Data" ejecuta `refreshData()`
   - Muestra nombre del usuario actual

4. **`src/pages/ProfilePage.vue`**
   - Carga perfil con `userService.getProfile()`
   - Muestra datos dinámicos del usuario

---

### 🎯 Próximos Pasos

1. **Verificar endpoints en backend:**
   - `POST /auth/login`
   - `GET /courses`
   - `POST /courses/{id}/enroll`
   - `GET /users`
   - `GET /users/{id}/profile`

2. **Ajustar estructura de respuesta** si es diferente a la esperada en el mapeo

3. **Habilitar interceptor de tokens** en `src/boot/axios.js` si es necesario autenticación

4. **Pruebas:**
   - Iniciar sesión
   - Verificar que se cargan cursos
   - Intentar inscribirse a un curso
   - Ver perfil
