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
    await new UpsertDatosPersonalesUseCase(repo).execute({ ...req.body, usuario_id });
    res.json({ message: 'Datos personales guardados' });
  } catch (e) {
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
    await new UpsertDocumentosUseCase(repo).execute({ ...req.body, usuario_id });
    res.json({ message: 'Documentos guardados' });
  } catch (e) {
    res.status(500).json({ message: 'Error al guardar documentos' });
  }
};