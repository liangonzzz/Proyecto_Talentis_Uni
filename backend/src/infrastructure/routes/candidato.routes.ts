import { Router } from 'express';
import { CandidatoController } from '../controller/CandidatoController';
import { CandidatoRepository } from '../adapter/CandidatoRepository';
import { PasswordResetRepository } from '../adapter/PasswordResetRepository';
import { EmailService } from '../adapter/EmailService';
import { RegistrarCandidatoUseCase } from '../../application/usecases/RegistrarCandidatoUseCase';
import { ListarCandidatosUseCase } from '../../application/usecases/ListarCandidatosUseCase';
import { AceptarCandidatoUseCase } from '../../application/usecases/AceptarCandidatoUseCase';
import { verificarToken, RequestConUsuario } from '../adapter/auth.middleware';
import { AppDataSource } from '../config/data-base';

const router = Router();

const candidatoRepo     = new CandidatoRepository();
const passwordResetRepo = new PasswordResetRepository();
const emailService      = new EmailService();

const registrarUseCase = new RegistrarCandidatoUseCase(candidatoRepo, passwordResetRepo, emailService);
const listarUseCase    = new ListarCandidatosUseCase(candidatoRepo);
const aceptarUseCase   = new AceptarCandidatoUseCase(candidatoRepo);
const controller       = new CandidatoController(registrarUseCase, listarUseCase, aceptarUseCase);

function soloAdmin(req: RequestConUsuario, res: any, next: any) {
  if (req.usuario?.rol !== 'admin') {
    res.status(403).json({ mensaje: 'Solo admin' });
    return;
  }
  next();
}

// POST /api/candidatos
router.post('/', verificarToken, soloAdmin, (req, res) => controller.crear(req, res));

// GET /api/candidatos
router.get('/', verificarToken, soloAdmin, (req, res) => controller.listar(req, res));

// PUT /api/candidatos/:id/clasificar — cambia rol a 'empleado'
router.put('/:id/clasificar', verificarToken, soloAdmin, (req, res) => controller.clasificar(req, res));

// PUT /api/candidatos/:id/bloquear — marca bloqueado + guarda motivo
router.put('/:id/bloquear', verificarToken, soloAdmin, async (req: RequestConUsuario, res) => {
  try {
    const id     = Number(req.params.id);
    const { motivo } = req.body;

    if (!motivo || !motivo.trim()) {
      res.status(400).json({ mensaje: 'El motivo es obligatorio' });
      return;
    }

    await AppDataSource.query(
      `UPDATE usuarios
       SET bloqueado = true, motivo_bloqueo = $1, bloqueado_at = NOW()
       WHERE id = $2`,
      [motivo.trim(), id]
    );

    res.json({ mensaje: 'Candidato bloqueado correctamente' });
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

export default router;