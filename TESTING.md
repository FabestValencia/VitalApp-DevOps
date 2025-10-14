# Guía de Pruebas - VitalApp

Esta guía te ayudará a probar todas las funcionalidades de VitalApp.

## Requisitos Previos

Asegúrate de que tanto el backend como el frontend estén ejecutándose:

1. **Backend**: `cd backend && npm run dev` (puerto 443)
2. **Frontend**: `cd frontend && npm start` (puerto 3000)
3. **PostgreSQL**: Base de datos ejecutándose y conectada

## Pruebas del Backend (API REST)

### 1. Probar Conexión a la API

```bash
# Verificar que el servidor está activo
curl http://localhost:443/

# Respuesta esperada:
# {"message":"VitalApp API is running","version":"1.0.0", ...}
```

### 2. Probar Endpoints de Citas

#### Obtener todas las citas
```bash
curl http://localhost:443/appointments
```

#### Crear una nueva cita
```bash
curl -X POST http://localhost:443/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient_name": "Test Patient",
    "doctor_name": "Dr. Test",
    "date": "2024-02-01",
    "time": "15:00",
    "reason": "Test appointment"
  }'
```

#### Eliminar una cita
```bash
curl -X DELETE http://localhost:443/appointments/1
```

### 3. Probar Endpoints de Resultados

#### Obtener todos los resultados
```bash
curl http://localhost:443/results
```

#### Crear un nuevo resultado
```bash
curl -X POST http://localhost:443/results \
  -H "Content-Type: application/json" \
  -d '{
    "patient_name": "Test Patient",
    "test_type": "Blood Test",
    "result_date": "2024-01-20",
    "result_value": "Normal",
    "notes": "All values within range"
  }'
```

### 4. Probar Endpoints de Notificaciones

#### Obtener todas las notificaciones
```bash
curl http://localhost:443/notifications
```

#### Crear una nueva notificación
```bash
curl -X POST http://localhost:443/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "message": "This is a test notification",
    "type": "info"
  }'
```

#### Marcar notificación como leída
```bash
curl -X PATCH http://localhost:443/notifications/1
```

#### Eliminar una notificación
```bash
curl -X DELETE http://localhost:443/notifications/1
```

## Pruebas del Frontend

### 1. Pruebas de la Sección de Citas

1. Abre http://localhost:3000 en tu navegador
2. Deberías ver la pestaña "Citas Médicas" activa
3. Haz clic en el botón "+ Nueva Cita"
4. Completa el formulario con:
   - Nombre del Paciente: "María González"
   - Nombre del Doctor: "Dr. Roberto Fernández"
   - Fecha: Selecciona una fecha futura
   - Hora: "16:30"
   - Motivo: "Revisión anual"
5. Haz clic en "Guardar Cita"
6. Verifica que la nueva cita aparezca en la lista
7. Haz clic en la "X" de una cita para eliminarla
8. Confirma la eliminación

### 2. Pruebas de la Sección de Resultados

1. Haz clic en la pestaña "📊 Resultados"
2. Deberías ver una lista de resultados médicos
3. Verifica que se muestren:
   - Tipo de examen
   - Nombre del paciente
   - Fecha del resultado
   - Valor del resultado
   - Observaciones (si las hay)
4. Haz clic en "🔄 Actualizar" para recargar los resultados

### 3. Pruebas de la Sección de Notificaciones

1. Haz clic en la pestaña "🔔 Notificaciones"
2. Deberías ver una lista de notificaciones
3. Verifica los diferentes tipos de notificaciones:
   - ⏰ Recordatorios (fondo amarillo)
   - ℹ️ Información (fondo azul)
   - ⚠️ Alertas (fondo rojo)
4. Para notificaciones no leídas:
   - Haz clic en "Marcar como leída"
   - Verifica que la notificación se vuelve semi-transparente
5. Haz clic en "Eliminar" para eliminar una notificación
6. Confirma la eliminación

## Pruebas de Responsividad

Prueba el diseño en diferentes tamaños de pantalla:

1. **Desktop** (> 1024px): Tres columnas de citas
2. **Tablet** (768px - 1024px): Dos columnas de citas
3. **Mobile** (< 768px): Una columna de citas

Para probar:
- Redimensiona la ventana del navegador
- Usa las herramientas de desarrollo (F12) > Device Toolbar
- Prueba en diferentes dispositivos

## Pruebas de Manejo de Errores

### 1. Probar sin el Backend

1. Detén el servidor backend
2. Recarga la aplicación frontend
3. Deberías ver mensajes de error en rojo:
   - "Error al cargar las citas..."
   - "Error al cargar los resultados..."
   - "Error al cargar las notificaciones..."

### 2. Probar Validaciones de Formulario

1. En la sección de Citas, haz clic en "+ Nueva Cita"
2. Intenta guardar sin completar los campos requeridos
3. El navegador debería mostrar mensajes de validación
4. Completa solo algunos campos y verifica las validaciones

## Pruebas de Base de Datos

### Verificar Datos en PostgreSQL

```bash
# Conectarse a la base de datos
psql -U postgres -d vitalapp

# Consultar las citas
SELECT * FROM appointments;

# Consultar los resultados
SELECT * FROM results;

# Consultar las notificaciones
SELECT * FROM notifications;

# Salir
\q
```

## Checklist de Pruebas Completo

- [ ] Backend responde en puerto 443
- [ ] Frontend carga en puerto 3000
- [ ] GET /appointments funciona
- [ ] POST /appointments crea una cita
- [ ] DELETE /appointments elimina una cita
- [ ] GET /results funciona
- [ ] POST /results crea un resultado
- [ ] GET /notifications funciona
- [ ] POST /notifications crea una notificación
- [ ] PATCH /notifications marca como leída
- [ ] DELETE /notifications elimina una notificación
- [ ] Interfaz muestra las tres secciones
- [ ] Navegación entre pestañas funciona
- [ ] Formulario de nueva cita funciona
- [ ] Eliminación de citas funciona
- [ ] Sección de resultados muestra datos
- [ ] Sección de notificaciones muestra datos
- [ ] Botón "Marcar como leída" funciona
- [ ] Diseño es responsivo
- [ ] Mensajes de error se muestran correctamente
- [ ] TailwindCSS está aplicado correctamente

## Problemas Comunes

### El Backend no se conecta a PostgreSQL

1. Verifica que PostgreSQL esté ejecutándose
2. Revisa las credenciales en `backend/.env`
3. Asegúrate de que la base de datos `vitalapp` exista

### El Frontend no puede comunicarse con el Backend

1. Verifica que el backend esté ejecutándose en puerto 443
2. Revisa `frontend/.env` o la configuración en `src/api.js`
3. Verifica la consola del navegador para errores CORS

### Los estilos de TailwindCSS no se aplican

1. Asegúrate de que `npm install` se haya ejecutado en frontend
2. Verifica que `tailwind.config.js` y `postcss.config.js` existan
3. Reinicia el servidor de desarrollo del frontend

## Reporte de Pruebas

Una vez completadas las pruebas, documenta:

1. ✅ Funcionalidades que funcionan correctamente
2. ⚠️ Funcionalidades con problemas menores
3. ❌ Funcionalidades que no funcionan
4. 💡 Sugerencias de mejora
