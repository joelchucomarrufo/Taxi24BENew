# Taxi24 Backend Challenge

Este es un proyecto backend desarrollado en **NestJS** con base de datos **PostgreSQL**, diseñado para el challenge de Taxi24. Todo el entorno se levanta localmente usando **Docker** y **docker-compose**.

---

## 📦 Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo.
- Node.js (opcional si deseas ejecutar fuera de Docker)

---

## 🚀 Instrucciones para levantar el proyecto

### 1. Clona el repositorio
```bash
git clone https://github.com/joelchucomarrufo/Taxi24BENew.git
cd Taxi24BENew
```

### 2. Crea los siguientes archivos en la raíz del proyecto:

#### 📄 `.env`
```env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=taxi24

NODE_ENV=development
```

> 📝 Cambia `NODE_ENV` a `production` si estás desplegando y no deseas que Swagger esté disponible.

#### 🐳 `Dockerfile`
```Dockerfile
# Etapa 1: build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: runtime
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

CMD ["node", "dist/main"]
```

#### 🐳 `docker-compose.yml`
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: taxi24_postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: taxi24
    volumes:
      - taxi24_pg_data:/var/lib/postgresql/data
    networks:
      - taxi24_net

  api:
    build: .
    container_name: taxi24_api
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: postgres
      DB_PASSWORD: postgres
      DB_NAME: taxi24
      NODE_ENV: development
    networks:
      - taxi24_net
    command: npm run start:prod

volumes:
  taxi24_pg_data:

networks:
  taxi24_net:
```

---

### 3. Levantar el entorno completo (API + PostgreSQL)
```bash
docker compose up --build
```

### 4. Verificar
- API en: http://localhost:3000
- Documentación Swagger (solo si `NODE_ENV=development`) en: http://localhost:3000/api

Puedes probar con Postman:
- `POST /drivers`
- `GET /drivers`

---

## 📚 Estructura base implementada

- Módulo `Driver`: ya implementado con entidad, DTO, servicio, y controlador
- Conexión TypeORM usando `.env`
- Clean Architecture modularizada
- Swagger disponible solo en entorno `development`

---

## ✅ Pendiente por implementar

- Módulo `Passenger`
- Módulo `Trip`
- Tests unitarios (Jest)
- Validaciones y manejo de errores

---

## 🧠 Créditos y referencias
- NestJS: https://docs.nestjs.com
- PostgreSQL Docker: https://hub.docker.com/_/postgres
- TypeORM: https://typeorm.io
- Swagger en NestJS: https://docs.nestjs.com/openapi/introduction
