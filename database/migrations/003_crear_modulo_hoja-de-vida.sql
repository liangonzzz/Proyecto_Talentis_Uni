-- ─────────────────────────────────────────────────────────────
-- NOTA: ya existe en la BD
-- CREATE TABLE usuarios (
--   id SERIAL PRIMARY KEY,
--   nombre VARCHAR(100) NOT NULL,
--   apellidos VARCHAR(100) NOT NULL,
--   tipo_documento VARCHAR(20) NOT NULL,
--   numero_documento VARCHAR(20) NOT NULL UNIQUE,
--   correo VARCHAR(100) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin','jefe','empleado','candidato')),
--   created_at TIMESTAMP DEFAULT NOW()
-- );
-- ─────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────
-- PERFIL
-- nombre y correo vienen de usuarios
-- ─────────────────────────────────────────────
CREATE TABLE hv_perfil (
  id            SERIAL PRIMARY KEY,
  usuario_id    INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  cargo_actual  VARCHAR(100),
  descripcion   TEXT,
  habilidad_1   VARCHAR(80),
  habilidad_2   VARCHAR(80),
  habilidad_3   VARCHAR(80),
  updated_at    TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- DATOS PERSONALES
-- nombre, apellidos, tipo_documento, numero_documento vienen de usuarios
-- ─────────────────────────────────────────────
CREATE TABLE hv_datos_personales (
  id                SERIAL PRIMARY KEY,
  usuario_id        INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  sexo              VARCHAR(20),
  rh                VARCHAR(5),
  lugar_nacimiento  VARCHAR(100),
  fecha_nacimiento  DATE,
  nacionalidad      VARCHAR(50),
  fecha_expedicion  DATE,
  lugar_expedicion  VARCHAR(100),
  updated_at        TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- DATOS DE CONTACTO
-- correo viene de usuarios
-- ─────────────────────────────────────────────
CREATE TABLE hv_contacto (
  id           SERIAL PRIMARY KEY,
  usuario_id   INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  direccion    VARCHAR(200),
  departamento VARCHAR(100),
  ciudad       VARCHAR(100),
  casa_propia  VARCHAR(20),
  celular      VARCHAR(20),
  celular_2    VARCHAR(20),
  updated_at   TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- FAMILIARES  (varios por usuario)
-- ─────────────────────────────────────────────
CREATE TABLE hv_familiares (
  id               SERIAL PRIMARY KEY,
  usuario_id       INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre           VARCHAR(100) NOT NULL,
  parentesco       VARCHAR(50),
  sexo             VARCHAR(20),
  fecha_nacimiento DATE,
  nivel_educativo  VARCHAR(50),
  contacto         VARCHAR(20),
  created_at       TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- FORMACIÓN ACADÉMICA  (varios por usuario)
-- ─────────────────────────────────────────────
CREATE TABLE hv_formacion (
  id           SERIAL PRIMARY KEY,
  usuario_id   INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  institucion  VARCHAR(150),
  titulo       VARCHAR(150),
  nivel        VARCHAR(50),
  graduado     BOOLEAN DEFAULT FALSE,
  fecha_inicio DATE,
  fecha_fin    DATE,
  created_at   TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- EXPERIENCIA LABORAL  (varios por usuario)
-- ─────────────────────────────────────────────
CREATE TABLE hv_experiencia (
  id             SERIAL PRIMARY KEY,
  usuario_id     INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  empresa        VARCHAR(150),
  cargo          VARCHAR(100),
  fecha_inicio   DATE,
  fecha_fin      DATE,
  trabajo_actual BOOLEAN DEFAULT FALSE,
  descripcion    TEXT,
  created_at     TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- AFILIACIONES  (uno por usuario)
-- ─────────────────────────────────────────────
CREATE TABLE hv_afiliaciones (
  id                SERIAL PRIMARY KEY,
  usuario_id        INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  eps               VARCHAR(100),
  fondo_pension     VARCHAR(100),
  arl               VARCHAR(100),
  caja_compensacion VARCHAR(100),
  updated_at        TIMESTAMP DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- DOCUMENTOS  (uno por usuario)
-- ─────────────────────────────────────────────
CREATE TABLE hv_documentos (
  id            SERIAL PRIMARY KEY,
  usuario_id    INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  cedula_url    VARCHAR(300),
  hoja_vida_url VARCHAR(300),
  diploma_url   VARCHAR(300),
  updated_at    TIMESTAMP DEFAULT NOW()
);