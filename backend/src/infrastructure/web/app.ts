import express from 'express';
import cors from 'cors';
import { envs } from '../config/environment-vars';
import authRoutes from '../routes/auth.routes';
import hojaVidaRoutes from '../routes/hojavida.routes';  

const app = express();

app.use(cors({
  origin: envs.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/auth',       authRoutes);
app.use('/api/hoja-vida',  hojaVidaRoutes); 

app.get('/', (_, res) => {
  res.json({ message: 'Talentis API funcionando' });
});

export default app;