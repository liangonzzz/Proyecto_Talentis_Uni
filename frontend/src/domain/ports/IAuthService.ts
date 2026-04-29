export interface LoginResponse {
  token: string;
  rol: string;
  nombre: string;
  correo: string;
  tipo_documento: string;
  numero_documento: string;
}

export interface IAuthService {
  login(tipo_documento: string, numero_documento: string, password: string): Promise<LoginResponse>;
  solicitarRestablecimiento(correo: string): Promise<void>;
  verificarTokenReset(token: string): Promise<void>;
  confirmarRestablecimiento(token: string, nuevaPassword: string): Promise<void>;
}