import { IAuthService } from '../../domain/ports/IAuthService';

export class SolicitarRestablecimientoUseCase {
  constructor(private authService: IAuthService) {}

  async execute(correo: string): Promise<void> {
    await this.authService.solicitarRestablecimiento(correo);
  }
}