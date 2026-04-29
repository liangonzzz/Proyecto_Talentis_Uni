import { Router } from 'express';
import { verificarToken } from '../adapter/auth.middleware';
import {
  getPerfil, upsertPerfil,
  getDatosPersonales, upsertDatosPersonales,
  getContacto, upsertContacto,
  getFamiliares, createFamiliar, updateFamiliar, deleteFamiliar,
  getFormacion, createFormacion, updateFormacion, deleteFormacion,
  getExperiencia, createExperiencia, updateExperiencia, deleteExperiencia,
  getAfiliaciones, upsertAfiliaciones,
  getDocumentos, upsertDocumentos,
} from '../controller/HojaVidaController';

const router = Router();

router.use(verificarToken);

// Perfil
router.get ('/perfil',           getPerfil);
router.post('/perfil',           upsertPerfil);

// Datos personales
router.get ('/datos-personales', getDatosPersonales);
router.post('/datos-personales', upsertDatosPersonales);

// Contacto
router.get ('/contacto',         getContacto);
router.post('/contacto',         upsertContacto);

// Familiares
router.get   ('/familiares',      getFamiliares);
router.post  ('/familiares',      createFamiliar);
router.put   ('/familiares/:id',  updateFamiliar);
router.delete('/familiares/:id',  deleteFamiliar);

// Formación
router.get   ('/formacion',       getFormacion);
router.post  ('/formacion',       createFormacion);
router.put   ('/formacion/:id',   updateFormacion);
router.delete('/formacion/:id',   deleteFormacion);

// Experiencia
router.get   ('/experiencia',     getExperiencia);
router.post  ('/experiencia',     createExperiencia);
router.put   ('/experiencia/:id', updateExperiencia);
router.delete('/experiencia/:id', deleteExperiencia);

// Afiliaciones
router.get ('/afiliaciones',     getAfiliaciones);
router.post('/afiliaciones',     upsertAfiliaciones);

// Documentos
router.get ('/documentos',       getDocumentos);
router.post('/documentos',       upsertDocumentos);

export default router;