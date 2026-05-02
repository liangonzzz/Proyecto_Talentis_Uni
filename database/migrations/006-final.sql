-- ══════════════════════════════════════════════════════════
--  talentis_db — Script de instalación segura
--  Usa IF NOT EXISTS para no romper tablas existentes
-- ══════════════════════════════════════════════════════════

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- ── usuarios ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.usuarios (
    id          SERIAL PRIMARY KEY,
    nombre      character varying NOT NULL,
    apellidos   character varying NOT NULL,
    tipo_documento character varying NOT NULL,
    numero_documento character varying NOT NULL,
    correo      character varying NOT NULL,
    password    character varying NOT NULL,
    rol         character varying NOT NULL,
    created_at  timestamp without time zone DEFAULT now() NOT NULL,
    bloqueado   boolean DEFAULT false NOT NULL,
    motivo_bloqueo text,
    bloqueado_at timestamp without time zone,
    estado      character varying(50) DEFAULT 'Activo' NOT NULL
);

-- ── password_reset_tokens ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
    id          SERIAL PRIMARY KEY,
    usuario_id  integer NOT NULL REFERENCES public.usuarios(id),
    token       character varying NOT NULL,
    expires_at  timestamp without time zone NOT NULL,
    used        boolean DEFAULT false NOT NULL,
    created_at  timestamp without time zone DEFAULT now() NOT NULL
);

-- ── tareas ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tareas (
    id               SERIAL PRIMARY KEY,
    usuario_id       integer NOT NULL REFERENCES public.usuarios(id),
    nombre           character varying NOT NULL,
    descripcion      text NOT NULL,
    actividad        character varying NOT NULL,
    fecha_inicio     date NOT NULL,
    fecha_fin        date NOT NULL,
    horas_planeadas  integer DEFAULT 0 NOT NULL,
    horas_ejecutadas integer DEFAULT 0 NOT NULL,
    finalizada       boolean DEFAULT false NOT NULL,
    created_at       timestamp without time zone DEFAULT now() NOT NULL
);

-- ── mensajes ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mensajes (
    id           SERIAL PRIMARY KEY,
    candidato_id integer NOT NULL,
    autor_id     integer NOT NULL,
    autor_rol    character varying(20) NOT NULL,
    mensaje      text NOT NULL,
    leido        boolean DEFAULT false NOT NULL,
    created_at   timestamp without time zone DEFAULT now() NOT NULL
);

-- ── hv_perfil ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_perfil (
    id           SERIAL PRIMARY KEY,
    usuario_id   integer NOT NULL UNIQUE REFERENCES public.usuarios(id) ON DELETE CASCADE,
    cargo_actual character varying(100),
    descripcion  text,
    habilidad_1  character varying(80),
    habilidad_2  character varying(80),
    habilidad_3  character varying(80),
    updated_at   timestamp without time zone DEFAULT now()
);

-- ── hv_datos_personales ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_datos_personales (
    id               SERIAL PRIMARY KEY,
    usuario_id       integer NOT NULL UNIQUE REFERENCES public.usuarios(id) ON DELETE CASCADE,
    sexo             character varying(20),
    rh               character varying(5),
    lugar_nacimiento character varying(100),
    fecha_nacimiento date,
    nacionalidad     character varying(50),
    fecha_expedicion date,
    lugar_expedicion character varying(100),
    updated_at       timestamp without time zone DEFAULT now()
);

-- ── hv_contacto ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_contacto (
    id           SERIAL PRIMARY KEY,
    usuario_id   integer NOT NULL UNIQUE REFERENCES public.usuarios(id) ON DELETE CASCADE,
    direccion    character varying(200),
    departamento character varying(100),
    ciudad       character varying(100),
    casa_propia  character varying(20),
    celular      character varying(20),
    celular_2    character varying(20),
    updated_at   timestamp without time zone DEFAULT now()
);

-- ── hv_familiares ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_familiares (
    id               SERIAL PRIMARY KEY,
    usuario_id       integer NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nombre           character varying(100) NOT NULL,
    parentesco       character varying(50),
    sexo             character varying(20),
    fecha_nacimiento date,
    nivel_educativo  character varying(50),
    contacto         character varying(20),
    created_at       timestamp without time zone DEFAULT now()
);

-- ── hv_formacion ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_formacion (
    id           SERIAL PRIMARY KEY,
    usuario_id   integer NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    institucion  character varying(150),
    titulo       character varying(150),
    nivel        character varying(50),
    graduado     boolean DEFAULT false,
    fecha_inicio date,
    fecha_fin    date,
    created_at   timestamp without time zone DEFAULT now()
);

-- ── hv_experiencia ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_experiencia (
    id             SERIAL PRIMARY KEY,
    usuario_id     integer NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    empresa        character varying(150),
    cargo          character varying(100),
    fecha_inicio   date,
    fecha_fin      date,
    trabajo_actual boolean DEFAULT false,
    descripcion    text,
    created_at     timestamp without time zone DEFAULT now()
);

-- ── hv_afiliaciones ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_afiliaciones (
    id                SERIAL PRIMARY KEY,
    usuario_id        integer NOT NULL UNIQUE REFERENCES public.usuarios(id) ON DELETE CASCADE,
    eps               character varying(100),
    fondo_pension     character varying(100),
    arl               character varying(100),
    caja_compensacion character varying(100),
    updated_at        timestamp without time zone DEFAULT now()
);

-- ── hv_documentos ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.hv_documentos (
    id               SERIAL PRIMARY KEY,
    usuario_id       integer NOT NULL UNIQUE REFERENCES public.usuarios(id) ON DELETE CASCADE,
    cedula_url       character varying(300),
    hoja_vida_url    character varying(300),
    diploma_url      character varying(300),
    policia_url      character varying(300),
    procuraduria_url character varying(300),
    contrato_url     character varying(300),
    referencia_url   character varying(300),
    updated_at       timestamp without time zone DEFAULT now()
);

-- ══════════════════════════════════════════════════════════
--  FIN DEL SCRIPT
-- ══════════════════════════════════════════════════════════