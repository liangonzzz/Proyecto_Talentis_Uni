import { AppDataSource } from '../config/data-base';
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

export class HojaVidaRepository implements IHojaVidaRepository {

  // ── PERFIL ────────────────────────────────────────────────

  async getPerfil(usuario_id: number): Promise<HvPerfil | null> {
    const result = await AppDataSource.query(
      'SELECT * FROM hv_perfil WHERE usuario_id = $1',
      [usuario_id]
    );
    return result[0] ?? null;
  }

  async upsertPerfil(data: HvPerfil): Promise<void> {
    await AppDataSource.query(
      `INSERT INTO hv_perfil (usuario_id, cargo_actual, descripcion, habilidad_1, habilidad_2, habilidad_3)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (usuario_id) DO UPDATE SET
         cargo_actual = EXCLUDED.cargo_actual,
         descripcion  = EXCLUDED.descripcion,
         habilidad_1  = EXCLUDED.habilidad_1,
         habilidad_2  = EXCLUDED.habilidad_2,
         habilidad_3  = EXCLUDED.habilidad_3,
         updated_at   = NOW()`,
      [data.usuario_id, data.cargo_actual, data.descripcion,
       data.habilidad_1, data.habilidad_2, data.habilidad_3]
    );
  }

  // ── DATOS PERSONALES ──────────────────────────────────────

  async getDatosPersonales(usuario_id: number): Promise<HvDatosPersonales | null> {
    const result = await AppDataSource.query(
      'SELECT * FROM hv_datos_personales WHERE usuario_id = $1',
      [usuario_id]
    );
    return result[0] ?? null;
  }

  async upsertDatosPersonales(data: HvDatosPersonales): Promise<void> {
    await AppDataSource.query(
      `INSERT INTO hv_datos_personales
         (usuario_id, sexo, rh, lugar_nacimiento, fecha_nacimiento, nacionalidad, fecha_expedicion, lugar_expedicion)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (usuario_id) DO UPDATE SET
         sexo             = EXCLUDED.sexo,
         rh               = EXCLUDED.rh,
         lugar_nacimiento = EXCLUDED.lugar_nacimiento,
         fecha_nacimiento = EXCLUDED.fecha_nacimiento,
         nacionalidad     = EXCLUDED.nacionalidad,
         fecha_expedicion = EXCLUDED.fecha_expedicion,
         lugar_expedicion = EXCLUDED.lugar_expedicion,
         updated_at       = NOW()`,
      [data.usuario_id, data.sexo, data.rh, data.lugar_nacimiento,
       data.fecha_nacimiento, data.nacionalidad, data.fecha_expedicion, data.lugar_expedicion]
    );
  }

  // ── CONTACTO ──────────────────────────────────────────────

  async getContacto(usuario_id: number): Promise<HvContacto | null> {
    const result = await AppDataSource.query(
      'SELECT * FROM hv_contacto WHERE usuario_id = $1',
      [usuario_id]
    );
    return result[0] ?? null;
  }

  async upsertContacto(data: HvContacto): Promise<void> {
    await AppDataSource.query(
      `INSERT INTO hv_contacto
         (usuario_id, direccion, departamento, ciudad, casa_propia, celular, celular_2)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (usuario_id) DO UPDATE SET
         direccion    = EXCLUDED.direccion,
         departamento = EXCLUDED.departamento,
         ciudad       = EXCLUDED.ciudad,
         casa_propia  = EXCLUDED.casa_propia,
         celular      = EXCLUDED.celular,
         celular_2    = EXCLUDED.celular_2,
         updated_at   = NOW()`,
      [data.usuario_id, data.direccion, data.departamento, data.ciudad,
       data.casa_propia, data.celular, data.celular_2]
    );
  }

  // ── FAMILIARES ────────────────────────────────────────────

  async getFamiliares(usuario_id: number): Promise<HvFamiliar[]> {
    return await AppDataSource.query(
      'SELECT * FROM hv_familiares WHERE usuario_id = $1 ORDER BY created_at ASC',
      [usuario_id]
    );
  }

  async createFamiliar(data: HvFamiliar): Promise<HvFamiliar> {
    const result = await AppDataSource.query(
      `INSERT INTO hv_familiares
         (usuario_id, nombre, parentesco, sexo, fecha_nacimiento, nivel_educativo, contacto)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [data.usuario_id, data.nombre, data.parentesco, data.sexo,
       data.fecha_nacimiento, data.nivel_educativo, data.contacto]
    );
    return result[0];
  }

  async updateFamiliar(id: number, data: HvFamiliar): Promise<void> {
    await AppDataSource.query(
      `UPDATE hv_familiares SET
         nombre           = $1,
         parentesco       = $2,
         sexo             = $3,
         fecha_nacimiento = $4,
         nivel_educativo  = $5,
         contacto         = $6
       WHERE id = $7`,
      [data.nombre, data.parentesco, data.sexo,
       data.fecha_nacimiento, data.nivel_educativo, data.contacto, id]
    );
  }

  async deleteFamiliar(id: number): Promise<void> {
    await AppDataSource.query('DELETE FROM hv_familiares WHERE id = $1', [id]);
  }

  // ── FORMACIÓN ─────────────────────────────────────────────

  async getFormacion(usuario_id: number): Promise<HvFormacion[]> {
    return await AppDataSource.query(
      'SELECT * FROM hv_formacion WHERE usuario_id = $1 ORDER BY created_at ASC',
      [usuario_id]
    );
  }

  async createFormacion(data: HvFormacion): Promise<HvFormacion> {
    const result = await AppDataSource.query(
      `INSERT INTO hv_formacion
         (usuario_id, institucion, titulo, nivel, graduado, fecha_inicio, fecha_fin)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [data.usuario_id, data.institucion, data.titulo, data.nivel,
       data.graduado, data.fecha_inicio, data.fecha_fin]
    );
    return result[0];
  }

  async updateFormacion(id: number, data: HvFormacion): Promise<void> {
    await AppDataSource.query(
      `UPDATE hv_formacion SET
         institucion  = $1,
         titulo       = $2,
         nivel        = $3,
         graduado     = $4,
         fecha_inicio = $5,
         fecha_fin    = $6
       WHERE id = $7`,
      [data.institucion, data.titulo, data.nivel,
       data.graduado, data.fecha_inicio, data.fecha_fin, id]
    );
  }

  async deleteFormacion(id: number): Promise<void> {
    await AppDataSource.query('DELETE FROM hv_formacion WHERE id = $1', [id]);
  }

  // ── EXPERIENCIA ───────────────────────────────────────────

  async getExperiencia(usuario_id: number): Promise<HvExperiencia[]> {
    return await AppDataSource.query(
      'SELECT * FROM hv_experiencia WHERE usuario_id = $1 ORDER BY created_at ASC',
      [usuario_id]
    );
  }

  async createExperiencia(data: HvExperiencia): Promise<HvExperiencia> {
    const result = await AppDataSource.query(
      `INSERT INTO hv_experiencia
         (usuario_id, empresa, cargo, fecha_inicio, fecha_fin, trabajo_actual, descripcion)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [data.usuario_id, data.empresa, data.cargo, data.fecha_inicio,
       data.fecha_fin, data.trabajo_actual, data.descripcion]
    );
    return result[0];
  }

  async updateExperiencia(id: number, data: HvExperiencia): Promise<void> {
    await AppDataSource.query(
      `UPDATE hv_experiencia SET
         empresa        = $1,
         cargo          = $2,
         fecha_inicio   = $3,
         fecha_fin      = $4,
         trabajo_actual = $5,
         descripcion    = $6
       WHERE id = $7`,
      [data.empresa, data.cargo, data.fecha_inicio,
       data.fecha_fin, data.trabajo_actual, data.descripcion, id]
    );
  }

  async deleteExperiencia(id: number): Promise<void> {
    await AppDataSource.query('DELETE FROM hv_experiencia WHERE id = $1', [id]);
  }

  // ── AFILIACIONES ──────────────────────────────────────────

  async getAfiliaciones(usuario_id: number): Promise<HvAfiliaciones | null> {
    const result = await AppDataSource.query(
      'SELECT * FROM hv_afiliaciones WHERE usuario_id = $1',
      [usuario_id]
    );
    return result[0] ?? null;
  }

  async upsertAfiliaciones(data: HvAfiliaciones): Promise<void> {
    await AppDataSource.query(
      `INSERT INTO hv_afiliaciones
         (usuario_id, eps, fondo_pension, arl, caja_compensacion)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (usuario_id) DO UPDATE SET
         eps               = EXCLUDED.eps,
         fondo_pension     = EXCLUDED.fondo_pension,
         arl               = EXCLUDED.arl,
         caja_compensacion = EXCLUDED.caja_compensacion,
         updated_at        = NOW()`,
      [data.usuario_id, data.eps, data.fondo_pension, data.arl, data.caja_compensacion]
    );
  }

  // ── DOCUMENTOS ────────────────────────────────────────────

  async getDocumentos(usuario_id: number): Promise<HvDocumentos | null> {
    const result = await AppDataSource.query(
      'SELECT * FROM hv_documentos WHERE usuario_id = $1',
      [usuario_id]
    );
    return result[0] ?? null;
  }

  async upsertDocumentos(data: HvDocumentos): Promise<void> {
    await AppDataSource.query(
      `INSERT INTO hv_documentos
        (usuario_id, cedula_url, hoja_vida_url, diploma_url, policia_url, procuraduria_url, contrato_url, referencia_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (usuario_id) DO UPDATE SET
        cedula_url        = COALESCE(EXCLUDED.cedula_url,        hv_documentos.cedula_url),
        hoja_vida_url     = COALESCE(EXCLUDED.hoja_vida_url,     hv_documentos.hoja_vida_url),
        diploma_url       = COALESCE(EXCLUDED.diploma_url,       hv_documentos.diploma_url),
        policia_url       = COALESCE(EXCLUDED.policia_url,       hv_documentos.policia_url),
        procuraduria_url  = COALESCE(EXCLUDED.procuraduria_url,  hv_documentos.procuraduria_url),
        contrato_url      = COALESCE(EXCLUDED.contrato_url,      hv_documentos.contrato_url),
        referencia_url    = COALESCE(EXCLUDED.referencia_url,    hv_documentos.referencia_url),
        updated_at        = NOW()`,
      [data.usuario_id, data.cedula_url, data.hoja_vida_url, data.diploma_url,
      data.policia_url, data.procuraduria_url, data.contrato_url, data.referencia_url]
    );
  }

  async deleteDocumento(usuario_id: number, campo: string): Promise<void> {
  const camposPermitidos = ['cedula_url', 'hoja_vida_url', 'diploma_url', 'policia_url', 'procuraduria_url', 'contrato_url', 'referencia_url'];
  if (!camposPermitidos.includes(campo)) throw new Error('Campo no permitido');
  await AppDataSource.query(
    `UPDATE hv_documentos SET ${campo} = NULL, updated_at = NOW() WHERE usuario_id = $1`,
    [usuario_id]
  );
  }
  
  async getEstadoModulos(usuario_id: number): Promise<{
  informacion_perfil: string;
  datos_personales: string;
  datos_contacto: string;
  formacion_academica: string;
  experiencia_laboral: string;
  afiliaciones: string;
  documentos: string;
}> {
  const [perfil, datosPersonales, contacto, formacion, experiencia, afiliaciones, documentos] =
    await Promise.all([
      this.getPerfil(usuario_id),
      this.getDatosPersonales(usuario_id),
      this.getContacto(usuario_id),
      this.getFormacion(usuario_id),
      this.getExperiencia(usuario_id),
      this.getAfiliaciones(usuario_id),
      this.getDocumentos(usuario_id),
    ]);

  // Documentos: contar cuántos de los 4 no son null
  const camposDoc = ['cedula_url', 'hoja_vida_url', 'diploma_url', 'policia_url'];
  const docsCount = documentos
    ? camposDoc.filter(c => (documentos as any)[c]).length
    : 0;

  return {
    informacion_perfil:  perfil          ? 'completo' : 'vacio',
    datos_personales:    datosPersonales
      ? ((datosPersonales as any).cedula_url ? 'completo' : 'parcial')
      : 'vacio',
    datos_contacto:      contacto        ? 'completo' : 'vacio',
    formacion_academica: formacion.length > 0 ? 'completo' : 'vacio',
    experiencia_laboral: experiencia.length > 0 ? 'completo' : 'vacio',
    afiliaciones:        afiliaciones    ? 'completo' : 'vacio',
    documentos:          docsCount === 4 ? 'completo' : docsCount > 0 ? 'parcial' : 'vacio',
  };
}

// Método adicional para obtener toda la hoja de vida de un candidato
async getHojaVidaCompleta(usuario_id: number) {
  const [perfil, datosPersonales, contacto, formacion, experiencia, afiliaciones, documentos] =
    await Promise.all([
      this.getPerfil(usuario_id),
      this.getDatosPersonales(usuario_id),
      this.getContacto(usuario_id),
      this.getFormacion(usuario_id),
      this.getExperiencia(usuario_id),
      this.getAfiliaciones(usuario_id),
      this.getDocumentos(usuario_id),
    ]);
  return { perfil, datosPersonales, contacto, formacion, experiencia, afiliaciones, documentos };
}

}

