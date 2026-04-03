export interface Usuario {
  id: number;
  nombre: string;
  rol: 'admin' | 'jefe' | 'empleado' | 'candidato';
  token: string;
}