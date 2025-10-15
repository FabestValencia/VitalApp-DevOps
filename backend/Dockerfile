
# Backend Dockerfile - Desarrollo

# Base image ligera de Node 18
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Crear carpeta para logs
RUN mkdir -p /app/logs

# Exponer puerto
EXPOSE 5000

# Comando por defecto (se puede sobreescribir en docker-compose)
CMD ["npm", "run", "dev"]
