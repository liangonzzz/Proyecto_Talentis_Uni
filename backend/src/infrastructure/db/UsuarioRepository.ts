import { pool } from './connection';
import { Usuario } from '../../domain/models/Usuario';
import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository.ts';

export class UsuarioRepository implements IUsuarioRepository {
  async findByDocumento(tipo_documento: string, numero_documento: string): Promise<Usuario | null> {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE LOWER(tipo_documento) = LOWER($1) AND numero_documento = $2',
      [tipo_documento, numero_documento]
    );
    return result.rows[0] || null;
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [correo]
    );
    return result.rows[0] || null;
  }

  async updatePassword(id: number, hashedPassword: string): Promise<void> {
    await pool.query(
      'UPDATE usuarios SET password = $1 WHERE id = $2',
      [hashedPassword, id]
    );
  }
}