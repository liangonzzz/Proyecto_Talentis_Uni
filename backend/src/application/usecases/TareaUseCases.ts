import { ITareaRepository } from '../../domain/ports/ITareaRepository';
import { Tarea } from '../../domain/models/Tarea';

// ── Obtener tareas del usuario ──
export class ObtenerTareasUseCase {
  constructor(private repo: ITareaRepository) {}

  async execute(usuario_id: number): Promise<Tarea[]> {
    return this.repo.findByUsuario(usuario_id);
  }
}

// ── Crear tarea ──
export class CrearTareaUseCase {
  constructor(private repo: ITareaRepository) {}

  async execute(data: Omit<Tarea, 'id' | 'created_at'>): Promise<Tarea> {
    return this.repo.create(data);
  }
}

// ── Registrar horas ──
export class RegistrarHorasUseCase {
  constructor(private repo: ITareaRepository) {}

  async execute(id: number, horas: number, usuario_id: number): Promise<Tarea> {
    const tarea = await this.repo.findById(id);
    if (!tarea) throw new Error('Tarea no encontrada');
    if (tarea.usuario_id !== usuario_id) throw new Error('No autorizado');
    if (tarea.finalizada) throw new Error('La tarea ya está finalizada');
    return this.repo.registrarHoras(id, horas);
  }
}

// ── Finalizar tarea ──
export class FinalizarTareaUseCase {
  constructor(private repo: ITareaRepository) {}

  async execute(id: number, usuario_id: number): Promise<Tarea> {
    const tarea = await this.repo.findById(id);
    if (!tarea) throw new Error('Tarea no encontrada');
    if (tarea.usuario_id !== usuario_id) throw new Error('No autorizado');
    if (tarea.finalizada) throw new Error('La tarea ya está finalizada');
    return this.repo.finalizar(id);
  }

  
}

export class ObtenerTareasCompletadasUseCase {
  constructor(private repo: ITareaRepository) {}

  async execute(usuario_id: number): Promise<Tarea[]> {
    return this.repo.findCompletadas(usuario_id);
  }
  
}

// ── Eliminar tarea ──
export class EliminarTareaUseCase {
  constructor(private repo: ITareaRepository) {}

  async execute(id: number, usuario_id: number): Promise<void> {
    const tarea = await this.repo.findById(id);
    if (!tarea) throw new Error('Tarea no encontrada');
    if (tarea.usuario_id !== usuario_id) throw new Error('No autorizado');
    return this.repo.eliminar(id);
  }
}