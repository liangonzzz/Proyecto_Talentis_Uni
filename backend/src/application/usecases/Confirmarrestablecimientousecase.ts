import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository';
import { IPasswordResetRepository } from '../../domain/ports/IPasswordResetRepository';
import { BcryptUtil } from '../../infrastructure/util/bcrypt.util';

export class ConfirmarRestablecimientoUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
    private passwordResetRepository: IPasswordResetRepository
  ) {}

  async execute(token: string, nuevaPassword: string): Promise<void> {
    const resetToken = await this.passwordResetRepository.findByToken(token);

    if (!resetToken) throw new Error('El enlace es inválido o ha expirado');
    if (resetToken.used) throw new Error('El enlace ya fue utilizado');
    if (new Date() > resetToken.expires_at) throw new Error('El enlace es inválido o ha expirado');

    const hashedPassword = await BcryptUtil.hash(nuevaPassword);

    await this.usuarioRepository.updatePassword(resetToken.usuario_id, hashedPassword);
    await this.passwordResetRepository.invalidateByUsuarioId(resetToken.usuario_id);
  }
}