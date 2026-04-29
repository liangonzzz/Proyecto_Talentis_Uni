export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  rol: 'admin' | 'jefe' | 'empleado' | 'candidato';
  token: string;
}