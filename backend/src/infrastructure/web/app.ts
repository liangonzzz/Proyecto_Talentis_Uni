import express from 'express';
import cors from 'cors';
import { envs } from '../config/environment-vars';
import authRoutes from '../routes/auth.routes';
import hojaVidaRoutes from '../routes/hojavida.routes';  
import path from 'path';
import tareaRoutes from '../routes/tarea.routes';
import candidatoRoutes from '../routes/candidato.routes';
import mensajesRoutes from '../routes/mensajes.routes';
import dashboardRoutes from '../routes/dashboard.routes';
import funcionarioRoutes from '../routes/funcionario.routes';

const app = express();

app.use(cors({
  origin: envs.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/auth',             authRoutes);
app.use('/api/hoja-vida',        hojaVidaRoutes); 
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'static', 'uploads')));
app.use('/api/tareas',           tareaRoutes);
app.use('/api/candidatos',       candidatoRoutes);
app.use('/api/mensajes',         mensajesRoutes);
app.use('/api/admin/dashboard',  dashboardRoutes);
app.use('/api/funcionarios',     funcionarioRoutes);

app.get('/', (_, res) => {
  res.json({ message: 'Talentis API funcionando' });
});

export default app;