CREATE TABLE tareas (
  id               SERIAL PRIMARY KEY,
  usuario_id       INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre           VARCHAR(255) NOT NULL,
  descripcion      TEXT,
  actividad        VARCHAR(100),
  fecha_inicio     DATE NOT NULL,
  fecha_fin        DATE NOT NULL,
  horas_planeadas  INTEGER DEFAULT 0,
  horas_ejecutadas INTEGER DEFAULT 0,
  finalizada       BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMP DEFAULT NOW()
);