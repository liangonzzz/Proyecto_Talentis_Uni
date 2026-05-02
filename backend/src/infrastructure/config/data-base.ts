import { DataSource } from 'typeorm';
import { envs } from './environment-vars';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { PasswordResetTokenEntity } from '../entities/PasswordResetTokenEntity';
import { TareaEntity } from '../entities/TareaEntity';
import { MensajeEntity } from '../entities/MensajeEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  database: envs.DB_NAME,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  synchronize: true,
  ssl: false,
  entities: [UsuarioEntity, PasswordResetTokenEntity, TareaEntity, MensajeEntity],
});