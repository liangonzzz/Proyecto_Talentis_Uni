import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

console.log('Registrando rutas...');

app.post('/api/auth/login', (req, res) => {
  console.log('Login hit!');
  res.json({ message: 'login funcionando' });
});

console.log('Rutas registradas');

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});