--
-- PostgreSQL database dump
--

\restrict zFGi2O2BENPZ0lbpq1PSL5ZSWYHcsGSstf9JeBNvLBxcTrnYAXovmcZAQ9hT6ja

-- Dumped from database version 17.9
-- Dumped by pg_dump version 17.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hv_afiliaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_afiliaciones (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    eps character varying(100),
    fondo_pension character varying(100),
    arl character varying(100),
    caja_compensacion character varying(100),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_afiliaciones OWNER TO postgres;

--
-- Name: hv_afiliaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_afiliaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_afiliaciones_id_seq OWNER TO postgres;

--
-- Name: hv_afiliaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_afiliaciones_id_seq OWNED BY public.hv_afiliaciones.id;


--
-- Name: hv_contacto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_contacto (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    direccion character varying(200),
    departamento character varying(100),
    ciudad character varying(100),
    casa_propia character varying(20),
    celular character varying(20),
    celular_2 character varying(20),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_contacto OWNER TO postgres;

--
-- Name: hv_contacto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_contacto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_contacto_id_seq OWNER TO postgres;

--
-- Name: hv_contacto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_contacto_id_seq OWNED BY public.hv_contacto.id;


--
-- Name: hv_datos_personales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_datos_personales (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    sexo character varying(20),
    rh character varying(5),
    lugar_nacimiento character varying(100),
    fecha_nacimiento date,
    nacionalidad character varying(50),
    fecha_expedicion date,
    lugar_expedicion character varying(100),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_datos_personales OWNER TO postgres;

--
-- Name: hv_datos_personales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_datos_personales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_datos_personales_id_seq OWNER TO postgres;

--
-- Name: hv_datos_personales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_datos_personales_id_seq OWNED BY public.hv_datos_personales.id;


--
-- Name: hv_documentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_documentos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    cedula_url character varying(300),
    hoja_vida_url character varying(300),
    diploma_url character varying(300),
    updated_at timestamp without time zone DEFAULT now(),
    policia_url character varying(300),
    procuraduria_url character varying(300),
    contrato_url character varying(300),
    referencia_url character varying(300)
);


ALTER TABLE public.hv_documentos OWNER TO postgres;

--
-- Name: hv_documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_documentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_documentos_id_seq OWNER TO postgres;

--
-- Name: hv_documentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_documentos_id_seq OWNED BY public.hv_documentos.id;


--
-- Name: hv_experiencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_experiencia (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    empresa character varying(150),
    cargo character varying(100),
    fecha_inicio date,
    fecha_fin date,
    trabajo_actual boolean DEFAULT false,
    descripcion text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_experiencia OWNER TO postgres;

--
-- Name: hv_experiencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_experiencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_experiencia_id_seq OWNER TO postgres;

--
-- Name: hv_experiencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_experiencia_id_seq OWNED BY public.hv_experiencia.id;


--
-- Name: hv_familiares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_familiares (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    parentesco character varying(50),
    sexo character varying(20),
    fecha_nacimiento date,
    nivel_educativo character varying(50),
    contacto character varying(20),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_familiares OWNER TO postgres;

--
-- Name: hv_familiares_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_familiares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_familiares_id_seq OWNER TO postgres;

--
-- Name: hv_familiares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_familiares_id_seq OWNED BY public.hv_familiares.id;


--
-- Name: hv_formacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_formacion (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    institucion character varying(150),
    titulo character varying(150),
    nivel character varying(50),
    graduado boolean DEFAULT false,
    fecha_inicio date,
    fecha_fin date,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_formacion OWNER TO postgres;

--
-- Name: hv_formacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_formacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_formacion_id_seq OWNER TO postgres;

--
-- Name: hv_formacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_formacion_id_seq OWNED BY public.hv_formacion.id;


--
-- Name: hv_perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hv_perfil (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    cargo_actual character varying(100),
    descripcion text,
    habilidad_1 character varying(80),
    habilidad_2 character varying(80),
    habilidad_3 character varying(80),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hv_perfil OWNER TO postgres;

--
-- Name: hv_perfil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hv_perfil_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hv_perfil_id_seq OWNER TO postgres;

--
-- Name: hv_perfil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hv_perfil_id_seq OWNED BY public.hv_perfil.id;


--
-- Name: mensajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajes (
    id integer NOT NULL,
    candidato_id integer NOT NULL,
    autor_id integer NOT NULL,
    autor_rol character varying(20) NOT NULL,
    mensaje text NOT NULL,
    leido boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.mensajes OWNER TO postgres;

--
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_id_seq OWNER TO postgres;

--
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    token character varying NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.password_reset_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.password_reset_tokens_id_seq OWNER TO postgres;

--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.password_reset_tokens_id_seq OWNED BY public.password_reset_tokens.id;


--
-- Name: tareas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tareas (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion text NOT NULL,
    actividad character varying NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    horas_planeadas integer DEFAULT 0 NOT NULL,
    horas_ejecutadas integer DEFAULT 0 NOT NULL,
    finalizada boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tareas OWNER TO postgres;

--
-- Name: tareas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tareas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tareas_id_seq OWNER TO postgres;

--
-- Name: tareas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tareas_id_seq OWNED BY public.tareas.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    apellidos character varying NOT NULL,
    tipo_documento character varying NOT NULL,
    numero_documento character varying NOT NULL,
    correo character varying NOT NULL,
    password character varying NOT NULL,
    rol character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    bloqueado boolean DEFAULT false NOT NULL,
    motivo_bloqueo text,
    bloqueado_at timestamp without time zone,
    estado character varying(50) DEFAULT 'Activo'::character varying NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: hv_afiliaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_afiliaciones ALTER COLUMN id SET DEFAULT nextval('public.hv_afiliaciones_id_seq'::regclass);


--
-- Name: hv_contacto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_contacto ALTER COLUMN id SET DEFAULT nextval('public.hv_contacto_id_seq'::regclass);


--
-- Name: hv_datos_personales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_datos_personales ALTER COLUMN id SET DEFAULT nextval('public.hv_datos_personales_id_seq'::regclass);


--
-- Name: hv_documentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_documentos ALTER COLUMN id SET DEFAULT nextval('public.hv_documentos_id_seq'::regclass);


--
-- Name: hv_experiencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_experiencia ALTER COLUMN id SET DEFAULT nextval('public.hv_experiencia_id_seq'::regclass);


--
-- Name: hv_familiares id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_familiares ALTER COLUMN id SET DEFAULT nextval('public.hv_familiares_id_seq'::regclass);


--
-- Name: hv_formacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_formacion ALTER COLUMN id SET DEFAULT nextval('public.hv_formacion_id_seq'::regclass);


--
-- Name: hv_perfil id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_perfil ALTER COLUMN id SET DEFAULT nextval('public.hv_perfil_id_seq'::regclass);


--
-- Name: mensajes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN id SET DEFAULT nextval('public.mensajes_id_seq'::regclass);


--
-- Name: password_reset_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens ALTER COLUMN id SET DEFAULT nextval('public.password_reset_tokens_id_seq'::regclass);


--
-- Name: tareas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas ALTER COLUMN id SET DEFAULT nextval('public.tareas_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Name: mensajes PK_20c919d08249bb93d84ce01beb4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT "PK_20c919d08249bb93d84ce01beb4" PRIMARY KEY (id);


--
-- Name: tareas PK_9370ac1b0569cacf8cda6815c97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT "PK_9370ac1b0569cacf8cda6815c97" PRIMARY KEY (id);


--
-- Name: password_reset_tokens PK_d16bebd73e844c48bca50ff8d3d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "PK_d16bebd73e844c48bca50ff8d3d" PRIMARY KEY (id);


--
-- Name: usuarios PK_d7281c63c176e152e4c531594a8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id);


--
-- Name: hv_afiliaciones hv_afiliaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_afiliaciones
    ADD CONSTRAINT hv_afiliaciones_pkey PRIMARY KEY (id);


--
-- Name: hv_afiliaciones hv_afiliaciones_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_afiliaciones
    ADD CONSTRAINT hv_afiliaciones_usuario_id_key UNIQUE (usuario_id);


--
-- Name: hv_contacto hv_contacto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_contacto
    ADD CONSTRAINT hv_contacto_pkey PRIMARY KEY (id);


--
-- Name: hv_contacto hv_contacto_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_contacto
    ADD CONSTRAINT hv_contacto_usuario_id_key UNIQUE (usuario_id);


--
-- Name: hv_datos_personales hv_datos_personales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_datos_personales
    ADD CONSTRAINT hv_datos_personales_pkey PRIMARY KEY (id);


--
-- Name: hv_datos_personales hv_datos_personales_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_datos_personales
    ADD CONSTRAINT hv_datos_personales_usuario_id_key UNIQUE (usuario_id);


--
-- Name: hv_documentos hv_documentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_documentos
    ADD CONSTRAINT hv_documentos_pkey PRIMARY KEY (id);


--
-- Name: hv_documentos hv_documentos_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_documentos
    ADD CONSTRAINT hv_documentos_usuario_id_key UNIQUE (usuario_id);


--
-- Name: hv_experiencia hv_experiencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_experiencia
    ADD CONSTRAINT hv_experiencia_pkey PRIMARY KEY (id);


--
-- Name: hv_familiares hv_familiares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_familiares
    ADD CONSTRAINT hv_familiares_pkey PRIMARY KEY (id);


--
-- Name: hv_formacion hv_formacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_formacion
    ADD CONSTRAINT hv_formacion_pkey PRIMARY KEY (id);


--
-- Name: hv_perfil hv_perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_perfil
    ADD CONSTRAINT hv_perfil_pkey PRIMARY KEY (id);


--
-- Name: hv_perfil hv_perfil_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_perfil
    ADD CONSTRAINT hv_perfil_usuario_id_key UNIQUE (usuario_id);


--
-- Name: tareas FK_29799ff2d68fa2a97751981cf31; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT "FK_29799ff2d68fa2a97751981cf31" FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: hv_afiliaciones hv_afiliaciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_afiliaciones
    ADD CONSTRAINT hv_afiliaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_contacto hv_contacto_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_contacto
    ADD CONSTRAINT hv_contacto_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_datos_personales hv_datos_personales_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_datos_personales
    ADD CONSTRAINT hv_datos_personales_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_documentos hv_documentos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_documentos
    ADD CONSTRAINT hv_documentos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_experiencia hv_experiencia_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_experiencia
    ADD CONSTRAINT hv_experiencia_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_familiares hv_familiares_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_familiares
    ADD CONSTRAINT hv_familiares_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_formacion hv_formacion_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_formacion
    ADD CONSTRAINT hv_formacion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: hv_perfil hv_perfil_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hv_perfil
    ADD CONSTRAINT hv_perfil_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zFGi2O2BENPZ0lbpq1PSL5ZSWYHcsGSstf9JeBNvLBxcTrnYAXovmcZAQ9hT6ja

