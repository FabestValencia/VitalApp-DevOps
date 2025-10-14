# VitalApp - Arquitectura del Sistema

## 📐 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO / NAVEGADOR                      │
│                      http://localhost:3000                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ HTTP/HTTPS
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    FRONTEND (React)                              │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Appointments │  │   Results    │  │ Notifications│         │
│  │  Component   │  │  Component   │  │  Component   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                  │
│                            │                                     │
│                    ┌───────▼────────┐                           │
│                    │   API Service  │                           │
│                    │    (axios)     │                           │
│                    └───────┬────────┘                           │
│                            │                                     │
│  Tecnologías: React 18, TailwindCSS, Axios                     │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             │ REST API
                             │ JSON
┌────────────────────────────▼───────────────────────────────────┐
│               BACKEND (Node.js + Express)                       │
│                http://localhost:443                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────┐          │
│  │              REST API Endpoints                  │          │
│  │                                                   │          │
│  │  GET    /appointments          (Listar citas)    │          │
│  │  POST   /appointments          (Crear cita)      │          │
│  │  DELETE /appointments/:id      (Borrar cita)     │          │
│  │                                                   │          │
│  │  GET    /results               (Listar resultados)│         │
│  │  POST   /results               (Crear resultado) │         │
│  │                                                   │          │
│  │  GET    /notifications         (Listar notif.)   │          │
│  │  POST   /notifications         (Crear notif.)    │          │
│  │  PATCH  /notifications/:id     (Marcar leída)    │          │
│  │  DELETE /notifications/:id     (Borrar notif.)   │          │
│  │                                                   │          │
│  │  GET    /                      (Health check)    │          │
│  └─────────────────┬───────────────────────────────┘          │
│                    │                                            │
│            ┌───────▼────────┐                                  │
│            │   db.js        │                                  │
│            │  (Pool pg)     │                                  │
│            └───────┬────────┘                                  │
│                    │                                            │
│  Tecnologías: Node.js, Express, pg, CORS, dotenv              │
└────────────────────┴───────────────────────────────────────────┘
                     │
                     │ SQL
                     │ PostgreSQL Protocol
┌────────────────────▼───────────────────────────────────────────┐
│              BASE DE DATOS (PostgreSQL)                         │
│                  localhost:5432                                 │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐│
│  │   appointments   │  │     results      │  │notifications ││
│  ├──────────────────┤  ├──────────────────┤  ├──────────────┤│
│  │ id (PK)          │  │ id (PK)          │  │ id (PK)      ││
│  │ patient_name     │  │ patient_name     │  │ title        ││
│  │ doctor_name      │  │ test_type        │  │ message      ││
│  │ date             │  │ result_date      │  │ type         ││
│  │ time             │  │ result_value     │  │ read         ││
│  │ reason           │  │ notes            │  │ created_at   ││
│  │ created_at       │  │ created_at       │  │              ││
│  └──────────────────┘  └──────────────────┘  └──────────────┘│
│                                                                 │
│  Base de datos: vitalapp                                       │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos

### 1. Crear una Cita

```
Usuario (Frontend)
    │
    │ 1. Llena formulario y hace clic en "Guardar Cita"
    ▼
Appointments.js
    │
    │ 2. Llama a createAppointment(data)
    ▼
api.js (axios)
    │
    │ 3. POST http://localhost:443/appointments
    │    Body: { patient_name, doctor_name, date, time, reason }
    ▼
server.js (Express)
    │
    │ 4. Valida datos requeridos
    ▼
db.js (PostgreSQL)
    │
    │ 5. INSERT INTO appointments ...
    │ 6. RETURNING *
    ▼
server.js
    │
    │ 7. Responde con { success: true, data: {...} }
    ▼
api.js
    │
    │ 8. Devuelve respuesta
    ▼
Appointments.js
    │
    │ 9. Actualiza estado y muestra nueva cita
    ▼
Usuario ve la cita creada
```

### 2. Ver Resultados Médicos

```
Usuario hace clic en "Resultados"
    │
    ▼
Results.js (useEffect)
    │
    │ 1. loadResults()
    ▼
api.js
    │
    │ 2. GET http://localhost:443/results
    ▼
server.js
    │
    │ 3. SELECT * FROM results ORDER BY result_date DESC
    ▼
db.js
    │
    │ 4. Ejecuta query y devuelve filas
    ▼
server.js
    │
    │ 5. Responde con { success: true, data: [...] }
    ▼
Results.js
    │
    │ 6. setResults(response.data)
    ▼
Usuario ve todos los resultados
```

### 3. Eliminar Cita

```
Usuario hace clic en "X" de una cita
    │
    │ 1. Confirma eliminación
    ▼
Appointments.js
    │
    │ 2. handleDelete(id)
    ▼
api.js
    │
    │ 3. DELETE http://localhost:443/appointments/:id
    ▼
server.js
    │
    │ 4. DELETE FROM appointments WHERE id = $1
    ▼
db.js
    │
    │ 5. Ejecuta DELETE
    ▼
server.js
    │
    │ 6. Responde con { success: true }
    ▼
Appointments.js
    │
    │ 7. Recarga lista de citas
    ▼
Cita eliminada de la vista
```

## 🎨 Capas de la Aplicación

### Capa de Presentación (Frontend)
- **Framework**: React 18
- **Estilos**: TailwindCSS
- **HTTP Client**: Axios
- **Responsabilidades**:
  - Renderizar interfaz de usuario
  - Manejar interacciones del usuario
  - Gestionar estado local
  - Hacer peticiones HTTP

### Capa de Aplicación (Backend)
- **Runtime**: Node.js
- **Framework**: Express
- **Responsabilidades**:
  - Manejar rutas y endpoints
  - Validar datos de entrada
  - Procesar lógica de negocio
  - Comunicarse con la base de datos
  - Devolver respuestas JSON

### Capa de Datos (Database)
- **DBMS**: PostgreSQL
- **Driver**: pg (node-postgres)
- **Responsabilidades**:
  - Almacenar datos persistentes
  - Ejecutar queries SQL
  - Mantener integridad de datos
  - Gestionar transacciones

## 🔐 Seguridad y Buenas Prácticas

### Backend
- ✅ Variables de entorno para credenciales
- ✅ CORS configurado para peticiones cross-origin
- ✅ Validación de datos de entrada
- ✅ Manejo de errores con try-catch
- ✅ Connection pooling para PostgreSQL
- ✅ Queries parametrizadas (prevenir SQL injection)

### Frontend
- ✅ Validación HTML5 en formularios
- ✅ Manejo de estados de carga
- ✅ Mensajes de error amigables
- ✅ Confirmaciones para acciones destructivas

### Base de Datos
- ✅ Primary keys auto-incrementales
- ✅ Constraints NOT NULL en campos requeridos
- ✅ Timestamps para auditoría
- ✅ Índices en columnas frecuentemente consultadas

## 📦 Despliegue

### Desarrollo Local
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm start
```

### Docker
```bash
docker-compose up
```

### Producción
```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run build
```

## 🔄 Estado del Sistema

- **Backend**: Puerto 443
- **Frontend**: Puerto 3000
- **Database**: Puerto 5432
- **Inicialización**: Automática con datos de ejemplo
- **Hot Reload**: Activado en modo desarrollo

## 📊 Métricas

- **Total Endpoints**: 10
- **Total Componentes**: 3 principales
- **Total Tablas**: 3
- **Líneas de Código JavaScript**: ~1,300 (backend y frontend)
- **Tiempo de Inicio**: < 30 segundos
- **Dependencias Backend**: 4 producción + 1 desarrollo
- **Dependencias Frontend**: 4 producción + 3 desarrollo
