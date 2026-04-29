export class SessionStorageService {
  static guardarSesion(token: string, rol: string, nombre: string, correo: string, tipo_documento: string, numero_documento: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('correo', correo);
    localStorage.setItem('tipo_documento', tipo_documento);
    localStorage.setItem('numero_documento', numero_documento);
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

  static obtenerCorreo(): string | null {
    return localStorage.getItem('correo');
  }

  static obtenerTipoDocumento(): string | null { 
    return localStorage.getItem('tipo_documento'); 
  }

  static obtenerNumeroDocumento(): string | null { 
    return localStorage.getItem('numero_documento'); 
  }

  static cerrarSesion(): void {
    localStorage.clear();
  }
}