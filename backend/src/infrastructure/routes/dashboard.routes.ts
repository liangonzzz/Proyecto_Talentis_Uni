import { Router } from 'express';
import { DashboardController } from '../controller/DashboardController';
import { verificarToken, RequestConUsuario } from '../adapter/auth.middleware';

const router = Router();
const ctrl = new DashboardController();

function soloAdmin(req: RequestConUsuario, res: any, next: any) {
  if (req.usuario?.rol !== 'admin') {
    res.status(403).json({ mensaje: 'Solo admin' });
    return;
  }
  next();
}

// GET /api/admin/dashboard
router.get('/', verificarToken, soloAdmin, (req, res) => ctrl.getResumen(req as RequestConUsuario, res));

export default router;