import { IAuthService } from '../../domain/ports/IAuthService';
import { SessionStorageService } from '../../infrastructure/storage/SessionStorage';

export class LoginUseCase {
  constructor(private authService: IAuthService) {}

  async execute(tipo_documento: string, numero_documento: string, password: string): Promise<string> {
    const data = await this.authService.login(tipo_documento, numero_documento, password);
    SessionStorageService.guardarSesion(data.token, data.rol, data.nombre);
    return data.rol;
  }
}