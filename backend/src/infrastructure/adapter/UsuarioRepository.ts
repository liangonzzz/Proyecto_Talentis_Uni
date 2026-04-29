import { AppDataSource } from '../config/data-base';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository';
import { Usuario } from '../../domain/models/Usuario';

export class UsuarioRepository implements IUsuarioRepository {
  private repo = AppDataSource.getRepository(UsuarioEntity);

  private toModel(entity: UsuarioEntity): Usuario {
    return {
      id: entity.id,
      tipo_documento: entity.tipo_documento,
      numero_documento: entity.numero_documento,
      correo: entity.correo,
      password: entity.password,
      nombre: entity.nombre,
      apellidos: entity.apellidos,
      rol: entity.rol,
      created_at: entity.created_at,
    };
  }

  async findByDocumento(tipo_documento: string, numero_documento: string): Promise<Usuario | null> {
    const entity = await this.repo.findOne({ where: { tipo_documento, numero_documento } });
    return entity ? this.toModel(entity) : null;
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    const entity = await this.repo.findOne({ where: { correo } });
    return entity ? this.toModel(entity) : null;
  }

  async updatePassword(id: number, hashedPassword: string): Promise<void> {
    await this.repo.update(id, { password: hashedPassword });
  }
}