import { Request, Response } from 'express';
import { SolicitarRestablecimientoUseCase } from '../../application/usecases/Solicitarrestablecimientousecase';
import { ConfirmarRestablecimientoUseCase } from '../../application/usecases/Confirmarrestablecimientousecase';
import { UsuarioRepository } from '../adapter/UsuarioRepository';
import { PasswordResetRepository } from '../adapter/PasswordResetRepository';
import { EmailService } from '../adapter/EmailService';

export class PasswordResetController {
  async solicitar(req: Request, res: Response) {
    try {
      const { correo } = req.body;

      if (!correo) {
        return res.status(400).json({ message: 'El correo es obligatorio' });
      }

      const usuarioRepository = new UsuarioRepository();
      const passwordResetRepository = new PasswordResetRepository();
      const emailService = new EmailService();

      const useCase = new SolicitarRestablecimientoUseCase(usuarioRepository, passwordResetRepository);

      const token = await useCase.execute(correo);

      if (token) {
        await emailService.enviarCorreoRestablecimiento(correo, token);
      }

      return res.status(200).json({ message: 'Si el correo existe, recibirás las instrucciones' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async confirmar(req: Request, res: Response) {
    try {
      const { token, nuevaPassword } = req.body;

      if (!token || !nuevaPassword) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const usuarioRepository = new UsuarioRepository();
      const passwordResetRepository = new PasswordResetRepository();
      const useCase = new ConfirmarRestablecimientoUseCase(usuarioRepository, passwordResetRepository);

      await useCase.execute(token, nuevaPassword);

      return res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}