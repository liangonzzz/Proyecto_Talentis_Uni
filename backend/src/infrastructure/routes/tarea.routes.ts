import { Router } from 'express';
import { TareaController } from '../controller/TareaController';
import { verificarToken } from '../adapter/auth.middleware';

    const router = Router();
    const ctrl = new TareaController();

    router.get('/',                    verificarToken, (req, res) => ctrl.getMisTareas(req, res));
    router.post('/',                   verificarToken, (req, res) => ctrl.crearTarea(req, res));
    router.patch('/:id/horas',         verificarToken, (req, res) => ctrl.registrarHoras(req, res));
    router.patch('/:id/finalizar',     verificarToken, (req, res) => ctrl.finalizarTarea(req, res));
    router.get('/completadas',         verificarToken, (req, res) => ctrl.getTareasCompletadas(req, res));
    router.delete('/:id',              verificarToken, (req, res) => ctrl.eliminarTarea(req, res));

export default router;