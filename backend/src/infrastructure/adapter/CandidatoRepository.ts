import { AppDataSource } from '../config/data-base';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { ICandidatoRepository } from '../../domain/ports/ICandidatoRepository';
import { Usuario } from '../../domain/models/Usuario';

export interface CandidatoConHV extends Usuario {
  celular: string | null;
  cargo_actual: string | null;
}

export class CandidatoRepository implements ICandidatoRepository {
  private repo = AppDataSource.getRepository(UsuarioEntity);

  private toModel(entity: UsuarioEntity): Usuario {
    return {
      id: entity.id,
      nombre: entity.nombre,
      apellidos: entity.apellidos,
      tipo_documento: entity.tipo_documento,
      numero_documento: entity.numero_documento,
      correo: entity.correo,
      password: entity.password,
      rol: entity.rol,
      created_at: entity.created_at,
    };
  }

  async crear(data: Omit<Usuario, 'id' | 'created_at'>): Promise<Usuario> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const entity = await this.repo.findOne({ where: { correo } });
    return entity ? this.toModel(entity) : null;
  }

  async buscarPorDocumento(tipo_documento: string, numero_documento: string): Promise<Usuario | null> {
    const entity = await this.repo.findOne({ where: { tipo_documento, numero_documento } });
    return entity ? this.toModel(entity) : null;
  }

  async listarCandidatos(): Promise<CandidatoConHV[]> {
    const rows = await AppDataSource.query(`
      SELECT
        u.id,
        u.nombre,
        u.apellidos,
        u.tipo_documento,
        u.numero_documento,
        u.correo,
        u.password,
        u.rol,
        u.created_at,
        c.celular,
        p.cargo_actual
      FROM usuarios u
      LEFT JOIN hv_contacto c ON c.usuario_id = u.id
      LEFT JOIN hv_perfil   p ON p.usuario_id = u.id
      WHERE u.rol = 'candidato' AND (u.bloqueado = false OR u.bloqueado IS NULL)
      ORDER BY u.created_at DESC
    `);

    return rows.map((r: any) => ({
      id: r.id,
      nombre: r.nombre,
      apellidos: r.apellidos,
      tipo_documento: r.tipo_documento,
      numero_documento: r.numero_documento,
      correo: r.correo,
      password: r.password,
      rol: r.rol,
      created_at: r.created_at,
      celular: r.celular ?? null,
      cargo_actual: r.cargo_actual ?? null,
    }));
  }

  async clasificarComoFuncionario(id: number): Promise<void> {
    await AppDataSource.query(
      `UPDATE usuarios SET rol = 'empleado' WHERE id = $1`,
      [id]
    );
  }

  
}


