import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-base';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { RequestConUsuario } from '../adapter/auth.middleware';

export class DashboardController {

  async getResumen(req: RequestConUsuario, res: Response): Promise<void> {
    try {
      const usuarioRepo = AppDataSource.getRepository(UsuarioEntity);
      const usuarioId = req.usuario!.id;

      // ── Conteos principales ──────────────────────────────────────
      const totalCandidatos = await usuarioRepo.count({
        where: { rol: 'candidato', bloqueado: false },
      });

      const totalFuncionarios = await usuarioRepo.count({
        where: { rol: 'empleado', bloqueado: false },
      });

      // ── Hojas pendientes ─────────────────────────────────────────
// ── Hojas pendientes ─────────────────────────────────────────
      const resultHojas = await AppDataSource.query(`
        SELECT COALESCE(SUM(horas_planeadas), 0)::int as count
        FROM tareas
        WHERE usuario_id = $1
          AND finalizada = false
      `, [usuarioId]);
      const hojasPendientes = resultHojas[0].count;

      // ── Tareas ────────────────────────────────────────────────────
      const resultTareasHoy = await AppDataSource.query(`
        SELECT COUNT(*)::int as count
        FROM tareas
        WHERE finalizada = false
          AND usuario_id = $1
      `, [usuarioId]);
      const tareasHoy = resultTareasHoy[0].count;

      const resultTareasComp = await AppDataSource.query(`
        SELECT COUNT(*)::int as count
        FROM tareas
        WHERE finalizada = true
          AND usuario_id = $1
      `, [usuarioId]);
      const tareasCompletadasHoy = resultTareasComp[0].count;

      // ── Estado candidatos ─────────────────────────────────────────
      const estadoCandidatos = await AppDataSource.query(`
        SELECT
          COUNT(*) FILTER (WHERE completados = 0)             AS postulados,
          COUNT(*) FILTER (WHERE completados BETWEEN 1 AND 2) AS en_revision,
          COUNT(*) FILTER (WHERE completados >= 3)            AS contratados
        FROM (
          SELECT u.id,
            (
              (CASE WHEN EXISTS (SELECT 1 FROM hv_perfil           WHERE usuario_id = u.id) THEN 1 ELSE 0 END) +
              (CASE WHEN EXISTS (SELECT 1 FROM hv_datos_personales WHERE usuario_id = u.id) THEN 1 ELSE 0 END) +
              (CASE WHEN EXISTS (SELECT 1 FROM hv_formacion        WHERE usuario_id = u.id) THEN 1 ELSE 0 END) +
              (CASE WHEN EXISTS (SELECT 1 FROM hv_experiencia      WHERE usuario_id = u.id) THEN 1 ELSE 0 END) +
              (CASE WHEN EXISTS (SELECT 1 FROM hv_afiliaciones     WHERE usuario_id = u.id) THEN 1 ELSE 0 END) +
              (CASE WHEN EXISTS (SELECT 1 FROM hv_documentos       WHERE usuario_id = u.id) THEN 1 ELSE 0 END)
            ) AS completados
          FROM usuarios u
          WHERE u.rol = 'candidato' AND u.bloqueado = false
        ) sub
      `);

      // ── Actividad reciente ────────────────────────────────────────
      const actividadReciente = await AppDataSource.query(`
        SELECT tipo, descripcion, created_at
        FROM (
          SELECT
            'nuevo_candidato' AS tipo,
            CONCAT(nombre, ' ', apellidos, ' se registró como candidato') AS descripcion,
            created_at
          FROM usuarios
          WHERE rol = 'candidato' AND bloqueado = false

          UNION ALL

          SELECT
            'tarea_completada' AS tipo,
            CONCAT('Se completó la tarea "', nombre, '"') AS descripcion,
            created_at
          FROM tareas
          WHERE finalizada = true

          UNION ALL

          SELECT
            'nuevo_funcionario' AS tipo,
            CONCAT(nombre, ' ', apellidos, ' fue clasificado como funcionario') AS descripcion,
            created_at
          FROM usuarios
          WHERE rol = 'empleado'
        ) actividad
        ORDER BY created_at DESC
        LIMIT 5
      `);

      res.json({
        resumen: {
          totalCandidatos:      Number(totalCandidatos),
          totalFuncionarios:    Number(totalFuncionarios),
          hojasPendientes:      hojasPendientes,
          tareasHoy:            tareasHoy,
          tareasCompletadasHoy: tareasCompletadasHoy,
        },
        estadoCandidatos: {
          postulados:  Number(estadoCandidatos[0].postulados),
          en_revision: Number(estadoCandidatos[0].en_revision),
          contratados: Number(estadoCandidatos[0].contratados),
        },
        actividadReciente,
      });

    } catch (e: any) {
      console.error('Error dashboard:', e);
      res.status(500).json({ message: e.message ?? 'Error interno' });
    }
  }
}