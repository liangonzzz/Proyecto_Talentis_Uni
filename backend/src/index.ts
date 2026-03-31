import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', async (req, res) => {
  try {
    const { tipo_documento, numero_documento, password } = req.body;

    if (!tipo_documento || !numero_documento || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'SELECT * FROM usuarios WHERE tipo_documento = $1 AND numero_documento = $2',
      [tipo_documento, numero_documento]
    );

    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    return res.status(200).json({ token, rol: usuario.rol, nombre: usuario.nombre });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Talentis API funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});