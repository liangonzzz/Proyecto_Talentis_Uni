import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository';
import { IPasswordResetRepository } from '../../domain/ports/IPasswordResetRepository';
import crypto from 'crypto';

export class SolicitarRestablecimientoUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
    private passwordResetRepository: IPasswordResetRepository
  ) {}

  async execute(correo: string): Promise<string | null> {
    const usuario = await this.usuarioRepository.findByCorreo(correo);

    if (!usuario) {
      // No revelar si el correo existe o no
      return null;
    }

    await this.passwordResetRepository.invalidateByUsuarioId(usuario.id);

    const token = crypto.randomBytes(32).toString('hex');

    const expires_at = new Date();
    expires_at.setMinutes(expires_at.getMinutes() + 60);

    await this.passwordResetRepository.save(usuario.id, token, expires_at);

    return token;
  }
}