import { pool } from './connection';
import { Usuario } from '../../domain/models/Usuario';
import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository.ts';

export class UsuarioRepository implements IUsuarioRepository {
  async findByDocumento(tipo_documento: string, numero_documento: string): Promise<Usuario | null> {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE tipo_documento = $1 AND numero_documento = $2',
      [tipo_documento, numero_documento]
    );
    return result.rows[0] || null;
  }
}