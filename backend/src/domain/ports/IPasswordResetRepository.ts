import { PasswordResetToken } from '../models/PasswordResetToken';

export interface IPasswordResetRepository {
  save(usuario_id: number, token: string, expires_at: Date): Promise<void>;
  findByToken(token: string): Promise<PasswordResetToken | null>;
  invalidateByUsuarioId(usuario_id: number): Promise<void>;
}