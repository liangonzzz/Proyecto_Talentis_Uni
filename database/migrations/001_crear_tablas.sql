/* creacion de la base de datos principal*/
/* primer registro de base datos para verificar conexion y login*/

CREATE DATABASE talentis_db;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  tipo_documento VARCHAR(20) NOT NULL,
  numero_documento VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'jefe', 'empleado', 'candidato')),
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO usuarios (nombre, apellidos, tipo_documento, numero_documento, correo, password, rol)
VALUES ('Admin', 'Talentis', 'CC', '123456789', 'admin@talentis.com', '$2b$10$XGl2Ll4EmTkT/VSg9RKB4uZe/JTnfoF0.x55oRxO5PbC0yKZ/lBoy', 'admin');
/* La contraseña del hash es admin1234 */