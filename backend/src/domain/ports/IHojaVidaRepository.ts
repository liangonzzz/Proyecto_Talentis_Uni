import {
  HvPerfil,
  HvDatosPersonales,
  HvContacto,
  HvFamiliar,
  HvFormacion,
  HvExperiencia,
  HvAfiliaciones,
  HvDocumentos,
} from '../models/HojaVida';

export interface IHojaVidaRepository {
  // Perfil
  getPerfil(usuario_id: number): Promise<HvPerfil | null>;
  upsertPerfil(data: HvPerfil): Promise<void>;

  // Datos personales
  getDatosPersonales(usuario_id: number): Promise<HvDatosPersonales | null>;
  upsertDatosPersonales(data: HvDatosPersonales): Promise<void>;

  // Contacto
  getContacto(usuario_id: number): Promise<HvContacto | null>;
  upsertContacto(data: HvContacto): Promise<void>;

  // Familiares
  getFamiliares(usuario_id: number): Promise<HvFamiliar[]>;
  createFamiliar(data: HvFamiliar): Promise<HvFamiliar>;
  updateFamiliar(id: number, data: HvFamiliar): Promise<void>;
  deleteFamiliar(id: number): Promise<void>;

  // Formación
  getFormacion(usuario_id: number): Promise<HvFormacion[]>;
  createFormacion(data: HvFormacion): Promise<HvFormacion>;
  updateFormacion(id: number, data: HvFormacion): Promise<void>;
  deleteFormacion(id: number): Promise<void>;

  // Experiencia
  getExperiencia(usuario_id: number): Promise<HvExperiencia[]>;
  createExperiencia(data: HvExperiencia): Promise<HvExperiencia>;
  updateExperiencia(id: number, data: HvExperiencia): Promise<void>;
  deleteExperiencia(id: number): Promise<void>;

  // Afiliaciones
  getAfiliaciones(usuario_id: number): Promise<HvAfiliaciones | null>;
  upsertAfiliaciones(data: HvAfiliaciones): Promise<void>;

  // Documentos
  getDocumentos(usuario_id: number): Promise<HvDocumentos | null>;
  upsertDocumentos(data: HvDocumentos): Promise<void>;

  //Borrar documentos
  deleteDocumento(usuario_id: number, campo: string): Promise<void>;
  
  // Estado de módulos
  getEstadoModulos(usuario_id: number): Promise<{
  informacion_perfil: string;
  datos_personales: string;
  datos_contacto: string;
  formacion_academica: string;
  experiencia_laboral: string;
  afiliaciones: string;
  documentos: string;
  }>;

}