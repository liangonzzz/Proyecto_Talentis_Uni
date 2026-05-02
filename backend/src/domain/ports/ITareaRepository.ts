import { Tarea } from '../models/Tarea';

export interface ITareaRepository {
  findByUsuario(usuario_id: number): Promise<Tarea[]>;
  findById(id: number): Promise<Tarea | null>;
  create(tarea: Omit<Tarea, 'id' | 'created_at'>): Promise<Tarea>;
  registrarHoras(id: number, horas: number): Promise<Tarea>;
  finalizar(id: number): Promise<Tarea>;
  findCompletadas(usuario_id: number): Promise<Tarea[]>;
  eliminar(id: number): Promise<void>;
}