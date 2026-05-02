import { Router, Response } from 'express';
import { verificarToken, RequestConUsuario } from '../adapter/auth.middleware';
import { AppDataSource } from '../config/data-base';

const router = Router();

// GET /api/mensajes/:candidatoId — lista mensajes de la conversación
router.get('/:candidatoId', verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const candidatoId = Number(req.params.candidatoId);
    const usuarioId   = req.usuario!.id;
    const rol         = req.usuario!.rol;

    // Solo admin o el propio candidato pueden ver los mensajes
    if (rol !== 'admin' && usuarioId !== candidatoId) {
      res.status(403).json({ mensaje: 'No autorizado' });
      return;
    }

    const mensajes = await AppDataSource.query(
      `SELECT m.id, m.candidato_id, m.autor_id, m.autor_rol, m.mensaje, m.leido, m.created_at,
              u.nombre, u.apellidos
       FROM mensajes m
       JOIN usuarios u ON u.id = m.autor_id
       WHERE m.candidato_id = $1
       ORDER BY m.created_at ASC`,
      [candidatoId]
    );

    // Marcar como leídos los mensajes del otro lado
    if (rol === 'admin') {
      await AppDataSource.query(
        `UPDATE mensajes SET leido = true WHERE candidato_id = $1 AND autor_rol = 'candidato' AND leido = false`,
        [candidatoId]
      );
    } else {
      await AppDataSource.query(
        `UPDATE mensajes SET leido = true WHERE candidato_id = $1 AND autor_rol = 'admin' AND leido = false`,
        [candidatoId]
      );
    }

    res.json(mensajes);
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

// POST /api/mensajes/:candidatoId — enviar mensaje
router.post('/:candidatoId', verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const candidatoId = Number(req.params.candidatoId);
    const autorId     = req.usuario!.id;
    const autorRol    = req.usuario!.rol as 'admin' | 'candidato';
    const { mensaje } = req.body;

    if (!mensaje?.trim()) {
      res.status(400).json({ mensaje: 'El mensaje no puede estar vacío' });
      return;
    }

    // Solo admin o el propio candidato pueden enviar
    if (autorRol !== 'admin' && autorId !== candidatoId) {
      res.status(403).json({ mensaje: 'No autorizado' });
      return;
    }

    const result = await AppDataSource.query(
      `INSERT INTO mensajes (candidato_id, autor_id, autor_rol, mensaje)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [candidatoId, autorId, autorRol, mensaje.trim()]
    );

    res.status(201).json(result[0]);
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

// GET /api/mensajes/:candidatoId/no-leidos — conteo de mensajes sin leer
router.get('/:candidatoId/no-leidos', verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const candidatoId = Number(req.params.candidatoId);
    const rol         = req.usuario!.rol;
    const rolOtro     = rol === 'admin' ? 'candidato' : 'admin';

    const result = await AppDataSource.query(
      `SELECT COUNT(*)::int as count FROM mensajes
       WHERE candidato_id = $1 AND autor_rol = $2 AND leido = false`,
      [candidatoId, rolOtro]
    );

    res.json({ count: result[0].count });
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message ?? 'Error interno' });
  }
});

export default router;