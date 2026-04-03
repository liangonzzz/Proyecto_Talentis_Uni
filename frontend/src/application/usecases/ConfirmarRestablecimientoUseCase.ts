import { IAuthService } from '../../domain/ports/IAuthService';

export class ConfirmarRestablecimientoUseCase {
  constructor(private authService: IAuthService) {}

  async execute(token: string, nuevaPassword: string): Promise<void> {
    await this.authService.confirmarRestablecimiento(token, nuevaPassword);
  }
}