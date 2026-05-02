import { Request, Response } from 'express';
import { TareaRepository } from '../adapter/TareaRepository';
import {
  ObtenerTareasUseCase,
  CrearTareaUseCase,
  RegistrarHorasUseCase,
  FinalizarTareaUseCase,
  ObtenerTareasCompletadasUseCase,
  EliminarTareaUseCase,
} from '../../application/usecases/TareaUseCases';
import { RequestConUsuario } from '../adapter/auth.middleware';

const repo = new TareaRepository();
const obtenerTareas  = new ObtenerTareasUseCase(repo);
const crearTarea     = new CrearTareaUseCase(repo);
const registrarHoras = new RegistrarHorasUseCase(repo);
const finalizarTarea = new FinalizarTareaUseCase(repo);
const obtenerCompletadas = new ObtenerTareasCompletadasUseCase(repo);
const eliminarTarea = new EliminarTareaUseCase(repo);

export class TareaController {

  async getMisTareas(req: RequestConUsuario, res: Response): Promise<void> {
    try {
      const usuario_id = req.usuario!.id;
      const tareas = await obtenerTareas.execute(usuario_id);
      res.json(tareas);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  async crearTarea(req: RequestConUsuario, res: Response): Promise<void> {
    try {
      const usuario_id = req.usuario!.id;
      const { nombre, descripcion, actividad, fecha_inicio, fecha_fin, horas_planeadas } = req.body;

      if (!nombre || !fecha_inicio || !fecha_fin) {
        res.status(400).json({ message: 'Faltan campos requeridos' });
        return;
      }

      const tarea = await crearTarea.execute({
        usuario_id,
        nombre,
        descripcion:      descripcion  ?? '',
        actividad:        actividad    ?? '',
        fecha_inicio:     new Date(fecha_inicio),
        fecha_fin:        new Date(fecha_fin),
        horas_planeadas:  horas_planeadas ?? 0,
        horas_ejecutadas: 0,
        finalizada:       false,
      });

      res.status(201).json(tarea);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  async registrarHoras(req: RequestConUsuario, res: Response): Promise<void> {
    try {
      const usuario_id = req.usuario!.id;
      const id         = parseInt(req.params.id as string);
      const { horas }  = req.body;

      if (!horas || horas <= 0) {
        res.status(400).json({ message: 'Horas inválidas' });
        return;
      }

      const tarea = await registrarHoras.execute(id, horas, usuario_id);
      res.json(tarea);
    } catch (e: any) {
      const status = e.message === 'No autorizado' ? 403 : 400;
      res.status(status).json({ message: e.message });
    }
  }

  async finalizarTarea(req: RequestConUsuario, res: Response): Promise<void> {
    try {
      const usuario_id = req.usuario!.id;
      const id         = parseInt(req.params.id as string);

      const tarea = await finalizarTarea.execute(id, usuario_id);
      res.json(tarea);
    } catch (e: any) {
      const status = e.message === 'No autorizado' ? 403 : 400;
      res.status(status).json({ message: e.message });
    }
  }

  async getTareasCompletadas(req: RequestConUsuario, res: Response): Promise<void> {
  try {
    const usuario_id = req.usuario!.id;
    const tareas = await obtenerCompletadas.execute(usuario_id);
    res.json(tareas);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
  }

  async eliminarTarea(req: RequestConUsuario, res: Response): Promise<void> {
  try {
    const usuario_id = req.usuario!.id;
    const id = parseInt(req.params.id as string);
    await eliminarTarea.execute(id, usuario_id);
    res.json({ message: 'Tarea eliminada' });
  } catch (e: any) {
    const status = e.message === 'No autorizado' ? 403 : 400;
    res.status(status).json({ message: e.message });
  }
  }
}

