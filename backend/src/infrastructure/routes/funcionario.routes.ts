import { Router, Response } from 'express';
import { verificarToken, RequestConUsuario } from '../adapter/auth.middleware';
import { AppDataSource } from '../config/data-base';

const router = Router();

// ── GET /api/funcionarios ─────────────────────────────────────────
// Lista todos los usuarios con rol 'empleado'
router.get('/', verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const rol = req.usuario?.rol;
    if (rol !== 'admin' && rol !== 'jefe') {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }

    const rows = await AppDataSource.query(
      `SELECT id, nombre, apellidos, correo, tipo_documento, numero_documento,
              COALESCE(estado, 'Activo') AS estado
       FROM usuarios
       WHERE rol = 'empleado'
       ORDER BY nombre ASC`
    );

    return res.status(200).json(rows);
  } catch (error: any) {
    return res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

// ── PATCH /api/funcionarios/:id/estado ───────────────────────────
// Cambia el estado de un funcionario
router.patch('/:id/estado', verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const rol = req.usuario?.rol;
    if (rol !== 'admin') {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }

    const id = Number(req.params.id);
    const { estado } = req.body;

    const estadosValidos = ['Activo', 'Inactivo', 'Incapacidad', 'Vacaciones'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado no válido' });
    }

    const result = await AppDataSource.query(
      `UPDATE usuarios SET estado = $1 WHERE id = $2 AND rol = 'empleado' RETURNING id`,
      [estado, id]
    );

    if (!result[1]) {
      return res.status(404).json({ mensaje: 'Funcionario no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error: any) {
    return res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

// ── DELETE /api/funcionarios/:id ──────────────────────────────────
// Elimina un funcionario
router.delete('/:id', verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const rol = req.usuario?.rol;
    if (rol !== 'admin') {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }

    const id = Number(req.params.id);

    await AppDataSource.query(
      `DELETE FROM usuarios WHERE id = $1 AND rol = 'empleado'`,
      [id]
    );

    return res.status(200).json({ mensaje: 'Funcionario eliminado correctamente' });
  } catch (error: any) {
    return res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

export default router;