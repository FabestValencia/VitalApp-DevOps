# VitalApp - Guía de Inicio Rápido

## 🚀 Inicio Rápido (5 minutos)

### Opción 1: Con Docker (Más Fácil)

```bash
# 1. Clonar el repositorio
git clone https://github.com/FabestValencia/VitalApp-DevOps.git
cd VitalApp-DevOps

# 2. Iniciar todos los servicios
docker-compose up

# 3. Abrir en el navegador
# Frontend: http://localhost:3000
# Backend: http://localhost:443
```

### Opción 2: Sin Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/FabestValencia/VitalApp-DevOps.git
cd VitalApp-DevOps

# 2. Ejecutar el script de configuración
./setup.sh

# 3. Crear la base de datos
psql -U postgres -c "CREATE DATABASE vitalapp;"

# 4. Iniciar el backend (en una terminal)
cd backend
npm run dev

# 5. Iniciar el frontend (en otra terminal)
cd frontend
npm start

# 6. Abrir en el navegador
# Frontend: http://localhost:3000
```

## 📱 Primeros Pasos en la Aplicación

### 1. Ver Citas Médicas
- La aplicación abre en la sección de "Citas Médicas"
- Verás citas de ejemplo pre-cargadas

### 2. Crear una Nueva Cita
- Haz clic en el botón "+ Nueva Cita"
- Completa el formulario:
  - Nombre del Paciente
  - Nombre del Doctor
  - Fecha
  - Hora
  - Motivo (opcional)
- Haz clic en "Guardar Cita"

### 3. Ver Resultados Médicos
- Haz clic en la pestaña "📊 Resultados"
- Verás resultados de exámenes médicos

### 4. Ver Notificaciones
- Haz clic en la pestaña "🔔 Notificaciones"
- Verás notificaciones, recordatorios y alertas
- Puedes marcar notificaciones como leídas o eliminarlas

## 🎯 Características Principales

✅ **Gestión de Citas**: Crear, ver y eliminar citas médicas
✅ **Resultados Médicos**: Visualizar resultados de exámenes
✅ **Notificaciones**: Alertas, recordatorios e información importante
✅ **Diseño Responsivo**: Funciona en móvil, tablet y desktop
✅ **Datos de Ejemplo**: Incluye datos pre-cargados para probar

## 🛠️ Tecnologías Utilizadas

**Frontend:**
- React 18
- TailwindCSS
- Axios

**Backend:**
- Node.js
- Express
- PostgreSQL (pg)

## 📚 Documentación Completa

- [README.md](README.md) - Documentación completa
- [TESTING.md](TESTING.md) - Guía de pruebas

## 💡 Consejos

1. **Primera vez**: Los datos de ejemplo se cargan automáticamente
2. **Desarrollo**: Usa `npm run dev` para recarga automática
3. **Producción**: Usa `npm run build` en el frontend
4. **Docker**: Es la forma más fácil de ejecutar todo

## ❓ ¿Problemas?

### El backend no inicia
- Verifica que PostgreSQL esté ejecutándose
- Revisa `backend/.env` con tus credenciales

### El frontend no se conecta
- Asegúrate de que el backend esté en puerto 443
- Verifica la configuración en `frontend/.env`

### Sin datos en la aplicación
- El backend crea las tablas y datos automáticamente
- Si no funciona, ejecuta: `psql -U postgres -d vitalapp -f database_setup.sql`

## 🤝 Contribuir

Este proyecto es parte del curso Software 3 DevOps.

## 📄 Licencia

ISC
