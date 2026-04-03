import { IAuthService } from '../../domain/ports/IAuthService';

export class VerificarTokenUseCase {
  constructor(private authService: IAuthService) {}

  async execute(token: string): Promise<void> {
    await this.authService.verificarTokenReset(token);
  }
}