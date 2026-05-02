import { Usuario } from '../models/Usuario';

export interface ICandidatoRepository {
  crear(candidato: Omit<Usuario, 'id' | 'created_at'>): Promise<Usuario>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarPorDocumento(tipo_documento: string, numero_documento: string): Promise<Usuario | null>;
  listarCandidatos(): Promise<Usuario[]>;
  clasificarComoFuncionario(id: number): Promise<void>;
}