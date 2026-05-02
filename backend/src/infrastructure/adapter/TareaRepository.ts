import { AppDataSource } from '../config/data-base';
import { TareaEntity } from '../entities/TareaEntity';
import { ITareaRepository } from '../../domain/ports/ITareaRepository';
import { Tarea } from '../../domain/models/Tarea';

export class TareaRepository implements ITareaRepository {
  private repo = AppDataSource.getRepository(TareaEntity);

  private toModel(entity: TareaEntity): Tarea {
    return {
      id: entity.id,
      usuario_id: entity.usuario_id,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      actividad: entity.actividad,
      fecha_inicio: entity.fecha_inicio,
      fecha_fin: entity.fecha_fin,
      horas_planeadas: entity.horas_planeadas,
      horas_ejecutadas: entity.horas_ejecutadas,
      finalizada: entity.finalizada,
      created_at: entity.created_at,
    };
  }

  async findByUsuario(usuario_id: number): Promise<Tarea[]> {
    const entities = await this.repo.find({
      where: { usuario_id, finalizada: false },
      order: { created_at: 'DESC' },
    });
    return entities.map(e => this.toModel(e));
  }

  async findById(id: number): Promise<Tarea | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? this.toModel(entity) : null;
  }

  async create(data: Omit<Tarea, 'id' | 'created_at'>): Promise<Tarea> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async registrarHoras(id: number, horas: number): Promise<Tarea> {
    const entity = await this.repo.findOneOrFail({ where: { id } });
    entity.horas_ejecutadas += horas;
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async finalizar(id: number): Promise<Tarea> {
    const entity = await this.repo.findOneOrFail({ where: { id } });
    entity.finalizada = true;
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async findCompletadas(usuario_id: number): Promise<Tarea[]> {
  const entities = await this.repo.find({
    where: { usuario_id, finalizada: true },
    order: { created_at: 'DESC' },
    take: 4,
  });
  return entities.map(e => this.toModel(e));
  }

  async eliminar(id: number): Promise<void> {
  await this.repo.delete({ id });
  }
}