import { IHojaVidaRepository } from '../../domain/ports/IHojaVidaRepository';
import {
  HvPerfil,
  HvDatosPersonales,
  HvContacto,
  HvFamiliar,
  HvFormacion,
  HvExperiencia,
  HvAfiliaciones,
  HvDocumentos,
} from '../../domain/models/HojaVida';

// ── PERFIL ──────────────────────────────────────────────────

export class GetPerfilUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getPerfil(usuario_id); }
}

export class UpsertPerfilUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvPerfil) { return this.repo.upsertPerfil(data); }
}

// ── DATOS PERSONALES ────────────────────────────────────────

export class GetDatosPersonalesUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getDatosPersonales(usuario_id); }
}

export class UpsertDatosPersonalesUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvDatosPersonales) { return this.repo.upsertDatosPersonales(data); }
}

// ── CONTACTO ────────────────────────────────────────────────

export class GetContactoUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getContacto(usuario_id); }
}

export class UpsertContactoUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvContacto) { return this.repo.upsertContacto(data); }
}

// ── FAMILIARES ──────────────────────────────────────────────

export class GetFamiliaresUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getFamiliares(usuario_id); }
}

export class CreateFamiliarUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvFamiliar) { return this.repo.createFamiliar(data); }
}

export class UpdateFamiliarUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(id: number, data: HvFamiliar) { return this.repo.updateFamiliar(id, data); }
}

export class DeleteFamiliarUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(id: number) { return this.repo.deleteFamiliar(id); }
}

// ── FORMACIÓN ───────────────────────────────────────────────

export class GetFormacionUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getFormacion(usuario_id); }
}

export class CreateFormacionUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvFormacion) { return this.repo.createFormacion(data); }
}

export class UpdateFormacionUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(id: number, data: HvFormacion) { return this.repo.updateFormacion(id, data); }
}

export class DeleteFormacionUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(id: number) { return this.repo.deleteFormacion(id); }
}

// ── EXPERIENCIA ─────────────────────────────────────────────

export class GetExperienciaUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getExperiencia(usuario_id); }
}

export class CreateExperienciaUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvExperiencia) { return this.repo.createExperiencia(data); }
}

export class UpdateExperienciaUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(id: number, data: HvExperiencia) { return this.repo.updateExperiencia(id, data); }
}

export class DeleteExperienciaUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(id: number) { return this.repo.deleteExperiencia(id); }
}

// ── AFILIACIONES ────────────────────────────────────────────

export class GetAfiliacionesUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getAfiliaciones(usuario_id); }
}

export class UpsertAfiliacionesUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvAfiliaciones) { return this.repo.upsertAfiliaciones(data); }
}

// ── DOCUMENTOS ──────────────────────────────────────────────

export class GetDocumentosUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(usuario_id: number) { return this.repo.getDocumentos(usuario_id); }
}

export class UpsertDocumentosUseCase {
  constructor(private repo: IHojaVidaRepository) {}
  execute(data: HvDocumentos) { return this.repo.upsertDocumentos(data); }
}