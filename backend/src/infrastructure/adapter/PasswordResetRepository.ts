import { AppDataSource } from '../config/data-base';
import { PasswordResetTokenEntity } from '../entities/PasswordResetTokenEntity';
import { IPasswordResetRepository } from '../../domain/ports/IPasswordResetRepository';
import { PasswordResetToken } from '../../domain/models/PasswordResetToken';

export class PasswordResetRepository implements IPasswordResetRepository {
  private repo = AppDataSource.getRepository(PasswordResetTokenEntity);

  async save(usuario_id: number, token: string, expires_at: Date): Promise<void> {
    await this.repo.save({ usuario_id, token, expires_at, used: false });
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    const entity = await this.repo.findOne({ where: { token } });
    return entity ?? null;
  }

  async invalidateByUsuarioId(usuario_id: number): Promise<void> {
    await this.repo.update({ usuario_id, used: false }, { used: true });
  }
}