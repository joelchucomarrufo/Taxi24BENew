-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Crear tipo ENUM para estado del conductor
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'driver_status') THEN
    CREATE TYPE driver_status AS ENUM ('Disponible', 'Ocupado', 'Inactivo');
  END IF;
END$$;

-- Crear tabla drivers
CREATE TABLE IF NOT EXISTS drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    license VARCHAR(50) UNIQUE NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    status driver_status DEFAULT 'Disponible',
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insertar 10 conductores con distintos estados
INSERT INTO drivers (id, first_name, last_name, license, latitude, longitude, status) VALUES
(gen_random_uuid(), 'Luis', 'Ramírez', 'LIC001', -12.178500, -77.016000, 'Disponible'),
(gen_random_uuid(), 'Andrea', 'Cruz', 'LIC002', -12.180100, -77.018700, 'Disponible'),
(gen_random_uuid(), 'Carlos', 'Soto', 'LIC003', -12.181900, -77.015300, 'Ocupado'),
(gen_random_uuid(), 'María', 'López', 'LIC004', -12.177000, -77.019100, 'Inactivo'),
(gen_random_uuid(), 'Juan', 'Torres', 'LIC005', -12.100000, -77.050000, 'Disponible'),
(gen_random_uuid(), 'Rosa', 'Villanueva', 'LIC006', -12.050000, -77.040000, 'Ocupado'),
(gen_random_uuid(), 'Pedro', 'Hidalgo', 'LIC007', -12.200000, -77.080000, 'Disponible'),
(gen_random_uuid(), 'Lucía', 'Mendoza', 'LIC008', -12.300000, -77.000000, 'Inactivo'),
(gen_random_uuid(), 'Miguel', 'Vera', 'LIC009', -12.250000, -77.120000, 'Disponible'),
(gen_random_uuid(), 'Ana', 'Flores', 'LIC010', -12.280000, -77.090000, 'Disponible');

-- Crear tipo ENUM para estado del pasajero
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'passenger_status') THEN
    CREATE TYPE passenger_status AS ENUM ('Activo', 'Inactivo');
  END IF;
END$$;

-- Crear tabla passengers con campos de auditoría
CREATE TABLE IF NOT EXISTS passengers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    document_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status passenger_status DEFAULT 'Activo',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insertar 15 pasajeros con fechas automáticas
INSERT INTO passengers (id, first_name, last_name, document_number, email, phone, status, latitude, longitude)
VALUES
(gen_random_uuid(), 'Carlos', 'Montoya', 'DNI1001', 'carlos@example.com', '999111222', 'Activo', -12.179100, -77.017500),
(gen_random_uuid(), 'Lucía', 'Ramirez', 'DNI1002', 'lucia@example.com', '999222333', 'Activo', -12.180200, -77.018100),
(gen_random_uuid(), 'Diego', 'Soto', 'DNI1003', 'diego@example.com', '999333444', 'Inactivo', -12.181800, -77.016300),
(gen_random_uuid(), 'Isabel', 'Torres', 'DNI1004', 'isabel@example.com', '999444555', 'Activo', -12.177500, -77.019000),
(gen_random_uuid(), 'Andrea', 'Gomez', 'DNI1005', 'andrea@example.com', '999555666', 'Activo', -12.100000, -77.050000),
(gen_random_uuid(), 'José', 'Vargas', 'DNI1006', 'jose@example.com', '999666777', 'Activo', -12.050000, -77.040000),
(gen_random_uuid(), 'Paula', 'Salinas', 'DNI1007', 'paula@example.com', '999777888', 'Inactivo', -12.200000, -77.080000),
(gen_random_uuid(), 'Marco', 'Flores', 'DNI1008', 'marco@example.com', '999888999', 'Activo', -12.300000, -77.000000),
(gen_random_uuid(), 'Karen', 'Vera', 'DNI1009', 'karen@example.com', '999999000', 'Activo', -12.250000, -77.120000),
(gen_random_uuid(), 'Alonso', 'Reyes', 'DNI1010', 'alonso@example.com', '988000111', 'Activo', -12.280000, -77.090000),
(gen_random_uuid(), 'Natalia', 'Lopez', 'DNI1011', 'natalia@example.com', '987000222', 'Inactivo', -12.190000, -77.021000),
(gen_random_uuid(), 'Ricardo', 'Cano', 'DNI1012', 'ricardo@example.com', '986000333', 'Activo', -12.179289, -77.0173189),
(gen_random_uuid(), 'Sandra', 'Castro', 'DNI1013', 'sandra@example.com', '985000444', 'Activo', -12.178700, -77.017800),
(gen_random_uuid(), 'Miguel', 'Peralta', 'DNI1014', 'miguel@example.com', '984000555', 'Activo', -12.179800, -77.016600),
(gen_random_uuid(), 'Carmen', 'Rojas', 'DNI1015', 'carmen@example.com', '983000666', 'Inactivo', -12.180500, -77.017100);

-- Crear tipo ENUM para estado del viaje
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'trip_status') THEN
    CREATE TYPE trip_status AS ENUM ('Activo', 'Completado');
  END IF;
END$$;

-- Crear tabla trips
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driverId UUID NOT NULL,
    passengerId UUID NOT NULL,
    originLat DOUBLE PRECISION NOT NULL,
    originLng DOUBLE PRECISION NOT NULL,
    destinationLat DOUBLE PRECISION,
    destinationLng DOUBLE PRECISION,
    status trip_status DEFAULT 'Activo',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla billings
CREATE TABLE IF NOT EXISTS billing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tripId UUID NOT NULL REFERENCES trips(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Tarjeta',
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);