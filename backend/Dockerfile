# Backend Dockerfile - Producción

# Base image ligera de Node 18
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de manera reproducible
RUN npm ci --only=production

# Copiar resto de la aplicación
COPY . .

# Crear carpeta para logs
RUN mkdir -p /app/logs

# Exponer puerto (el que tu app use en producción)
EXPOSE 443

# Ejecutar la app y redirigir stdout/stderr a un archivo de log
# Esto mantiene logs persistentes dentro del contenedor
CMD ["sh", "-c", "npm run start > logs/app.log 2>&1"]
