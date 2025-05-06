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
    id UUID PRIMARY KEY,
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
