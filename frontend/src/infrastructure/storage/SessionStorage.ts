export class SessionStorageService {
  static guardarSesion(token: string, rol: string, nombre: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('nombre', nombre);
  }

  static obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  static obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  static obtenerNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  static cerrarSesion(): void {
    localStorage.clear();
  }
}