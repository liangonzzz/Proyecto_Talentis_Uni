import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/usecases/LoginUseCase';
import { UsuarioRepository } from '../../db/UsuarioRepository';

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { tipo_documento, numero_documento, password } = req.body;

      if (!tipo_documento || !numero_documento || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const usuarioRepository = new UsuarioRepository();
      const loginUseCase = new LoginUseCase(usuarioRepository);
      const resultado = await loginUseCase.execute(tipo_documento, numero_documento, password);

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}