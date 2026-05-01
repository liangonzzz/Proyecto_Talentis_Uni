import { Request, Response } from 'express';
import { HojaVidaRepository } from '../adapter/HojaVidaRepository';
import {
  GetPerfilUseCase, UpsertPerfilUseCase,
  GetDatosPersonalesUseCase, UpsertDatosPersonalesUseCase,
  GetContactoUseCase, UpsertContactoUseCase,
  GetFamiliaresUseCase, CreateFamiliarUseCase, UpdateFamiliarUseCase, DeleteFamiliarUseCase,
  GetFormacionUseCase, CreateFormacionUseCase, UpdateFormacionUseCase, DeleteFormacionUseCase,
  GetExperienciaUseCase, CreateExperienciaUseCase, UpdateExperienciaUseCase, DeleteExperienciaUseCase,
  GetAfiliacionesUseCase, UpsertAfiliacionesUseCase,
  GetDocumentosUseCase, UpsertDocumentosUseCase,
  DeleteDocumentoUseCase, 
} from '../../application/usecases/HojaVidaUseCases';

const repo = new HojaVidaRepository();

// ── PERFIL ────────────────────────────────────────────────

export const getPerfil = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetPerfilUseCase(repo).execute(usuario_id);
    res.json(data ?? {});
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

export const upsertPerfil = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    await new UpsertPerfilUseCase(repo).execute({ ...req.body, usuario_id });
    res.json({ message: 'Perfil guardado' });
  } catch (e) {
    res.status(500).json({ message: 'Error al guardar perfil' });
  }
};

// ── DATOS PERSONALES ──────────────────────────────────────

export const getDatosPersonales = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetDatosPersonalesUseCase(repo).execute(usuario_id);
    res.json(data ?? {});
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener datos personales' });
  }
};

export const upsertDatosPersonales = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const body = req.body;

    // Convertir fechas vacías a null
    const datos = {
      ...body,
      usuario_id,
      fecha_nacimiento: body.fecha_nacimiento || null,
      fecha_expedicion: body.fecha_expedicion || null,
    };

    await new UpsertDatosPersonalesUseCase(repo).execute(datos);
    res.json({ message: 'Datos personales guardados' });
  } catch (e) {
    console.error('Error upsertDatosPersonales:', e);
    res.status(500).json({ message: 'Error al guardar datos personales' });
  }
};

// ── CONTACTO ──────────────────────────────────────────────

export const getContacto = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetContactoUseCase(repo).execute(usuario_id);
    res.json(data ?? {});
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener contacto' });
  }
};

export const upsertContacto = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    await new UpsertContactoUseCase(repo).execute({ ...req.body, usuario_id });
    res.json({ message: 'Contacto guardado' });
  } catch (e) {
    res.status(500).json({ message: 'Error al guardar contacto' });
  }
};

// ── FAMILIARES ────────────────────────────────────────────

export const getFamiliares = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetFamiliaresUseCase(repo).execute(usuario_id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener familiares' });
  }
};

export const createFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new CreateFamiliarUseCase(repo).execute({ ...req.body, usuario_id });
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error al crear familiar' });
  }
};

export const updateFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    await new UpdateFamiliarUseCase(repo).execute(Number(req.params.id), { ...req.body, usuario_id });
    res.json({ message: 'Familiar actualizado' });
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar familiar' });
  }
};

export const deleteFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    await new DeleteFamiliarUseCase(repo).execute(Number(req.params.id));
    res.json({ message: 'Familiar eliminado' });
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar familiar' });
  }
};

// ── FORMACIÓN ─────────────────────────────────────────────

export const getFormacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetFormacionUseCase(repo).execute(usuario_id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener formación' });
  }
};

export const createFormacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new CreateFormacionUseCase(repo).execute({ ...req.body, usuario_id });
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error al crear formación' });
  }
};

export const updateFormacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    await new UpdateFormacionUseCase(repo).execute(Number(req.params.id), { ...req.body, usuario_id });
    res.json({ message: 'Formación actualizada' });
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar formación' });
  }
};

export const deleteFormacion = async (req: Request, res: Response): Promise<void> => {
  try {
    await new DeleteFormacionUseCase(repo).execute(Number(req.params.id));
    res.json({ message: 'Formación eliminada' });
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar formación' });
  }
};

// ── EXPERIENCIA ───────────────────────────────────────────

export const getExperiencia = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetExperienciaUseCase(repo).execute(usuario_id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener experiencia' });
  }
};

export const createExperiencia = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new CreateExperienciaUseCase(repo).execute({ ...req.body, usuario_id });
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error al crear experiencia' });
  }
};

export const updateExperiencia = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    await new UpdateExperienciaUseCase(repo).execute(Number(req.params.id), { ...req.body, usuario_id });
    res.json({ message: 'Experiencia actualizada' });
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar experiencia' });
  }
};

export const deleteExperiencia = async (req: Request, res: Response): Promise<void> => {
  try {
    await new DeleteExperienciaUseCase(repo).execute(Number(req.params.id));
    res.json({ message: 'Experiencia eliminada' });
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar experiencia' });
  }
};

// ── AFILIACIONES ──────────────────────────────────────────

export const getAfiliaciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetAfiliacionesUseCase(repo).execute(usuario_id);
    res.json(data ?? {});
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener afiliaciones' });
  }
};

export const upsertAfiliaciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    await new UpsertAfiliacionesUseCase(repo).execute({ ...req.body, usuario_id });
    res.json({ message: 'Afiliaciones guardadas' });
  } catch (e) {
    res.status(500).json({ message: 'Error al guardar afiliaciones' });
  }
};

// ── DOCUMENTOS ────────────────────────────────────────────

export const getDocumentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const data = await new GetDocumentosUseCase(repo).execute(usuario_id);
    res.json(data ?? {});
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener documentos' });
  }
};

export const upsertDocumentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

    const data: any = { usuario_id };
    if (files?.cedula?.[0])       data.cedula_url       = `${baseUrl}/${files.cedula[0].filename}`;
    if (files?.diploma?.[0])      data.diploma_url      = `${baseUrl}/${files.diploma[0].filename}`;
    if (files?.policia?.[0])      data.policia_url      = `${baseUrl}/${files.policia[0].filename}`;
    if (files?.procuraduria?.[0]) data.procuraduria_url = `${baseUrl}/${files.procuraduria[0].filename}`;
    if (files?.contrato?.[0])     data.contrato_url     = `${baseUrl}/${files.contrato[0].filename}`;
    if (files?.referencia?.[0])   data.referencia_url   = `${baseUrl}/${files.referencia[0].filename}`;

    await new UpsertDocumentosUseCase(repo).execute(data);
    res.json({ message: 'Documentos guardados', data });
  } catch (e) {
    res.status(500).json({ message: 'Error al guardar documentos' });
  }

  
};

//Borrar documentos
export const deleteDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario_id = (req as any).usuario.id;
    const campo = req.params.campo as string;
    await new DeleteDocumentoUseCase(repo).execute(usuario_id, campo);
    res.json({ message: 'Documento eliminado' });
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar documento' });
  }
};