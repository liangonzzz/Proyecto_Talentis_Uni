export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  tipo_documento: string;
  numero_documento: string;
  correo: string;
  password: string;
  rol: 'admin' | 'jefe' | 'empleado' | 'candidato';
  created_at: Date;
}