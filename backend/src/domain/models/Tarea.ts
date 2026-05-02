export interface Tarea {
  id: number;
  usuario_id: number;
  nombre: string;
  descripcion: string;
  actividad: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  horas_planeadas: number;
  horas_ejecutadas: number;
  finalizada: boolean;
  created_at: Date;
}