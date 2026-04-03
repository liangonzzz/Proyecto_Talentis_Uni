import { pool } from './connection';
import { PasswordResetToken } from '../../domain/models/PasswordResetToken';
import { IPasswordResetRepository } from '../../domain/ports/IPasswordResetRepository';

export class PasswordResetRepository implements IPasswordResetRepository {
  async save(usuario_id: number, token: string, expires_at: Date): Promise<void> {
    await pool.query(
      'INSERT INTO password_reset_tokens (usuario_id, token, expires_at) VALUES ($1, $2, $3)',
      [usuario_id, token, expires_at]
    );
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    const result = await pool.query(
      'SELECT * FROM password_reset_tokens WHERE token = $1',
      [token]
    );
    return result.rows[0] || null;
  }

  async invalidateByUsuarioId(usuario_id: number): Promise<void> {
    await pool.query(
      'UPDATE password_reset_tokens SET used = true WHERE usuario_id = $1 AND used = false',
      [usuario_id]
    );
  }
}