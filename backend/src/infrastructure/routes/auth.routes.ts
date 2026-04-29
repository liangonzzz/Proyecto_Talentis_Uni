import { Router, Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { PasswordResetController } from '../controller/Passwordresetcontroller';
import { PasswordResetRepository } from '../adapter/PasswordResetRepository';
import { JwtUtil } from '../util/jwt.util';

const router = Router();
const authController = new AuthController();
const passwordResetController = new PasswordResetController();
const passwordResetRepository = new PasswordResetRepository();

router.post('/login', async (req: Request, res: Response) => {
  await authController.login(req, res);
});

router.post('/solicitar-restablecimiento', async (req: Request, res: Response) => {
  await passwordResetController.solicitar(req, res);
});

router.post('/confirmar-restablecimiento', async (req: Request, res: Response) => {
  await passwordResetController.confirmar(req, res);
});

router.get('/verificar', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Sin token' });
  }

  try {
    JwtUtil.verify(token);
    return res.status(200).json({ valid: true });
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
});

router.get('/verificar-token-reset', async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Token requerido' });
  }

  try {
    const registro = await passwordResetRepository.findByToken(token as string);

    if (!registro || registro.used || new Date() > new Date(registro.expires_at)) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    return res.status(200).json({ valid: true });
  } catch {
    return res.status(500).json({ message: 'Error al verificar token' });
  }
});

export default router;