import { Request, Response } from 'express';
import { RegistrarCandidatoUseCase } from '../../application/usecases/RegistrarCandidatoUseCase';
import { ListarCandidatosUseCase } from '../../application/usecases/ListarCandidatosUseCase';
import { AceptarCandidatoUseCase } from '../../application/usecases/AceptarCandidatoUseCase';

export class CandidatoController {
  constructor(
    private registrarUseCase: RegistrarCandidatoUseCase,
    private listarUseCase: ListarCandidatosUseCase,
    private aceptarUseCase: AceptarCandidatoUseCase
  ) {}

  // POST /api/candidatos
  async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, apellidos, tipo_documento, numero_documento, correo } = req.body;

      if (!nombre || !apellidos || !tipo_documento || !numero_documento || !correo) {
        res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        return;
      }

      const candidato = await this.registrarUseCase.ejecutar({
        nombre,
        apellidos,
        tipo_documento,
        numero_documento,
        correo,
      });

      res.status(201).json({
        mensaje: 'Candidato creado. Se envió correo de bienvenida.',
        candidato: {
          id: candidato.id,
          nombre: candidato.nombre,
          apellidos: candidato.apellidos,
          correo: candidato.correo,
        },
      });
    } catch (error: any) {
      const esConflicto = error.message?.includes('Ya existe');
      res.status(esConflicto ? 409 : 500).json({ mensaje: error.message ?? 'Error interno' });
    }
  }

  // GET /api/candidatos
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const candidatos = await this.listarUseCase.ejecutar();
      res.status(200).json(candidatos);
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message ?? 'Error interno' });
    }
  }

  // PUT /api/candidatos/:id/clasificar
  async clasificar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.aceptarUseCase.ejecutar(id);
      res.json({ mensaje: 'Candidato clasificado como funcionario' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message ?? 'Error interno' });
    }
  }
}