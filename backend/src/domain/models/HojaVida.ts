export interface HvPerfil {
  id?: number;
  usuario_id: number;
  cargo_actual: string;
  descripcion: string;
  habilidad_1: string;
  habilidad_2: string;
  habilidad_3: string;
}

export interface HvDatosPersonales {
  id?: number;
  usuario_id: number;
  sexo: string;
  rh: string;
  lugar_nacimiento: string;
  fecha_nacimiento: string;
  nacionalidad: string;
  fecha_expedicion: string;
  lugar_expedicion: string;
}

export interface HvContacto {
  id?: number;
  usuario_id: number;
  direccion: string;
  departamento: string;
  ciudad: string;
  casa_propia: string;
  celular: string;
  celular_2: string;
}

export interface HvFamiliar {
  id?: number;
  usuario_id: number;
  nombre: string;
  parentesco: string;
  sexo: string;
  fecha_nacimiento: string;
  nivel_educativo: string;
  contacto: string;
}

export interface HvFormacion {
  id?: number;
  usuario_id: number;
  institucion: string;
  titulo: string;
  nivel: string;
  graduado: boolean;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface HvExperiencia {
  id?: number;
  usuario_id: number;
  empresa: string;
  cargo: string;
  fecha_inicio: string;
  fecha_fin: string;
  trabajo_actual: boolean;
  descripcion: string;
}

export interface HvAfiliaciones {
  id?: number;
  usuario_id: number;
  eps: string;
  fondo_pension: string;
  arl: string;
  caja_compensacion: string;
}

export interface HvDocumentos {
  id?: number;
  usuario_id: number;
  cedula_url?: string;
  hoja_vida_url?: string;
  diploma_url?: string;
  policia_url?: string;
  procuraduria_url?: string;
  contrato_url?: string;
  referencia_url?: string;
}
