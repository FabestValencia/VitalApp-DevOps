# VitalApp - Sistema de Gestión de Citas Médicas

VitalApp es una aplicación web completa para la gestión de citas médicas, resultados de laboratorio y notificaciones. Construida con React en el frontend y Node.js + Express + PostgreSQL en el backend.

## 🚀 Características

- **Gestión de Citas**: Ver, crear y eliminar citas médicas
- **Resultados Médicos**: Visualizar resultados de exámenes y pruebas médicas
- **Notificaciones**: Sistema de notificaciones con alertas, recordatorios e información
- **Interfaz Moderna**: Diseño responsivo con TailwindCSS
- **API REST**: Backend con endpoints RESTful bien estructurados

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- PostgreSQL (versión 12 o superior)
- npm o yarn

## 🛠️ Instalación

### 1. Configurar la Base de Datos PostgreSQL

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE vitalapp;

# Salir de PostgreSQL
\q
```

### 2. Configurar el Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Copiar el archivo de configuración de ejemplo
cp .env.example .env

# Editar .env con tus credenciales de PostgreSQL
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=vitalapp
# DB_USER=postgres
# DB_PASSWORD=tu_contraseña
```

### 3. Configurar el Frontend

```bash
# Navegar al directorio frontend
cd ../frontend

# Instalar dependencias
npm install

# Copiar el archivo de configuración de ejemplo (opcional)
cp .env.example .env
```

## 🚀 Ejecución

### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor backend estará disponible en `http://localhost:5000`

### Iniciar el Frontend

```bash
cd frontend
npm start
```

La aplicación frontend estará disponible en `http://localhost:3000`

## 📡 Endpoints de la API

### Citas (Appointments)

- `GET /appointments` - Obtener todas las citas
- `POST /appointments` - Crear una nueva cita
- `DELETE /appointments/:id` - Eliminar una cita

### Resultados (Results)

- `GET /results` - Obtener todos los resultados médicos
- `POST /results` - Crear un nuevo resultado

### Notificaciones (Notifications)

- `GET /notifications` - Obtener todas las notificaciones
- `POST /notifications` - Crear una nueva notificación
- `PATCH /notifications/:id` - Marcar notificación como leída
- `DELETE /notifications/:id` - Eliminar una notificación

## 🗄️ Estructura de la Base de Datos

### Tabla: appointments
- `id` - ID único (serial)
- `patient_name` - Nombre del paciente
- `doctor_name` - Nombre del doctor
- `date` - Fecha de la cita
- `time` - Hora de la cita
- `reason` - Motivo de la consulta
- `created_at` - Fecha de creación

### Tabla: results
- `id` - ID único (serial)
- `patient_name` - Nombre del paciente
- `test_type` - Tipo de examen
- `result_date` - Fecha del resultado
- `result_value` - Valor del resultado
- `notes` - Observaciones
- `created_at` - Fecha de creación

### Tabla: notifications
- `id` - ID único (serial)
- `title` - Título de la notificación
- `message` - Mensaje
- `type` - Tipo (info, reminder, alert)
- `read` - Estado de lectura
- `created_at` - Fecha de creación

## 📁 Estructura del Proyecto

```
VitalApp-DevOps/
├── backend/
│   ├── server.js          # Servidor Express principal
│   ├── db.js              # Configuración de PostgreSQL
│   ├── initDB.js          # Inicialización de la base de datos
│   ├── package.json       # Dependencias del backend
│   ├── .env.example       # Variables de entorno de ejemplo
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Appointments.js    # Componente de citas
│   │   │   ├── Results.js         # Componente de resultados
│   │   │   └── Notifications.js   # Componente de notificaciones
│   │   ├── App.js                 # Componente principal
│   │   ├── index.js               # Punto de entrada
│   │   ├── index.css              # Estilos con TailwindCSS
│   │   └── api.js                 # Servicio de API
│   ├── package.json               # Dependencias del frontend
│   ├── tailwind.config.js         # Configuración de Tailwind
│   ├── postcss.config.js
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## 🛡️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **PostgreSQL (pg)** - Base de datos
- **CORS** - Middleware para peticiones cross-origin
- **dotenv** - Gestión de variables de entorno

### Frontend
- **React** - Librería UI
- **Axios** - Cliente HTTP
- **TailwindCSS** - Framework CSS
- **React Hooks** - Gestión de estado

## 💡 Características Técnicas

- ✅ Código claro y comentado
- ✅ Arquitectura REST
- ✅ Separación frontend/backend
- ✅ Inicialización automática de base de datos
- ✅ Datos de ejemplo pre-cargados
- ✅ Diseño responsivo
- ✅ Manejo de errores
- ✅ Validación de formularios

## 🧪 Comandos Disponibles

### Backend
```bash
npm start     # Iniciar servidor en modo producción
npm run dev   # Iniciar servidor en modo desarrollo con nodemon
```

### Frontend
```bash
npm start     # Iniciar aplicación en modo desarrollo
npm run build # Construir aplicación para producción
npm test      # Ejecutar tests
```

## 📝 Notas

- La base de datos se inicializa automáticamente al iniciar el backend por primera vez
- Se incluyen datos de ejemplo para facilitar las pruebas
- El backend usa nodemon en modo desarrollo para recarga automática
- El frontend usa react-scripts para desarrollo y construcción

## 🤝 Contribuciones

Este proyecto es parte del curso de Software 3 DevOps.

## 📄 Licencia

ISC
