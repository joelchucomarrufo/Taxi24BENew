# 🚖 Taxi24 Backend Challenge

Este es un proyecto backend desarrollado en **NestJS** con base de datos **PostgreSQL**, diseñado para el challenge de Taxi24. Toda la arquitectura sigue un enfoque modular con TypeORM, Swagger y despliegue vía Docker.

---

## 📦 Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo.
- Git

---

## 🚀 Instrucciones para levantar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/joelchucomarrufo/Taxi24BENew.git
cd Taxi24BENew
```

### 2. Crea los siguientes archivos en la raíz:

#### 📄 `.env`

```env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=taxi24
NODE_ENV=development
```

### 3. Levantar todo el entorno (API + PostgreSQL)

```bash
docker compose up --build
```

> La primera vez tomará unos minutos por la instalación y ejecución de los scripts de base de datos.

---

## 🌐 Accesos útiles

- API: [http://localhost:3000](http://localhost:3000)
- Swagger: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧱 Módulos implementados

### ✅ `Drivers`

- `POST /drivers`: Crear conductor
- `GET /drivers`: Listar todos los conductores
- `GET /drivers/available`: Lista de conductores disponibles
- `GET /drivers/nearby?lat=..&lng=..`: 3 conductores más cercanos
- `GET /drivers/:id`: Buscar conductor por ID
- `PATCH /drivers/:id/location-status`: Actualizar ubicación y estado

### ✅ `Passengers`

- `POST /passengers`: Crear pasajero
- `GET /passengers`: Listar pasajeros
- `GET /passengers/:id`: Obtener pasajero por ID
- `PATCH /passengers/:id/location-status`: Actualizar ubicación y estado

### ✅ `Trips`

- `POST /trips`: Crear viaje
- `GET /trips/actives`: Listar viajes activos
- `PATCH /trips/:id/complete`: Completar viaje y generar factura

### ✅ `Billing`

- `GET /billing`: Lista de todas las facturas
- `GET /billing/by-trip/:tripId`: Obtener factura por ID de viaje

---

## 🧾 Swagger

Swagger está habilitado en desarrollo (`NODE_ENV=development`) y disponible en:

📍 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧪 Datos de prueba

Se incluye un script SQL (`src/scripts/init.sql`) que genera datos de prueba:

- 10 conductores
- 15 pasajeros
- 5 viajes activos
- Facturas generadas al completar viajes

---

## 📌 Consideraciones técnicas

- Arquitectura modular por dominio (`drivers`, `passengers`, `trips`, `billing`)
- Uso de UUID como identificadores únicos
- Relaciones entre entidades definidas con TypeORM
- Columnas de auditoría (`createdAt`, `updatedAt`)
- Documentación con Swagger
- Manejo de errores centralizado
- Lógica de negocio en servicios (ej. cálculo de distancia/factura)

---

## 🧠 Créditos y referencias

- [NestJS](https://docs.nestjs.com)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [TypeORM](https://typeorm.io)
- [Swagger en NestJS](https://docs.nestjs.com/openapi/introduction)

---

## 🧱 Estructura del Proyecto y Modularización

Este proyecto está desarrollado usando **NestJS** bajo una estructura modular, basada en principios de **Clean Architecture**, lo que permite una alta escalabilidad, mantenibilidad y separación de responsabilidades.

Cada módulo (como `drivers`, `passengers`, `trips`, `billing`) tiene su propio conjunto de carpetas organizadas de la siguiente manera:

```
src/
├── modules/
│   ├── driver/
│   │   ├── controller/       # Define los endpoints HTTP
│   │   ├── dto/              # Define los DTOs de entrada y salida
│   │   ├── domain/           # Contiene la entidad y enums
│   │   ├── service/          # Contiene la lógica de negocio
│   │   └── driver.module.ts  # Declara e importa las dependencias del módulo
│   ├── passenger/
│   ├── trip/
│   └── billing/
```

### 🧩 ¿Qué hace cada tipo de archivo?

- `controller/`: Aquí se define el controlador del módulo, con sus rutas REST (GET, POST, PATCH, etc.).
- `dto/`: Define los objetos de transferencia de datos (Data Transfer Objects) usados para validación y tipado de entrada/salida.
- `domain/`: Define las entidades del dominio (ej: `Driver`, `Trip`) y enums relacionados.
- `service/`: Contiene la lógica de negocio y las interacciones con la base de datos.
- `*.module.ts`: Es el módulo raíz del feature. Importa las dependencias, declara el controlador y el servicio.

### 🧱 ¿Por qué esta estructura?

- **Escalabilidad**: Puedes agregar fácilmente nuevos módulos sin romper la estructura existente.
- **Mantenibilidad**: Separar lógica, controladores y entidades permite depurar, testear y extender de forma aislada.
- **Modularidad**: Cada módulo es independiente, y solo expone lo necesario.
- **Testing**: Cada parte puede ser testeada unitariamente.

---

