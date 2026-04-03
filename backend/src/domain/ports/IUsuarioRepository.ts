import { Usuario } from '../models/Usuario';

export interface IUsuarioRepository {
  findByDocumento(tipo_documento: string, numero_documento: string): Promise<Usuario | null>;
  findByCorreo(correo: string): Promise<Usuario | null>;
  updatePassword(id: number, hashedPassword: string): Promise<void>;
}