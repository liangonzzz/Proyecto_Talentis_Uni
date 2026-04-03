import { AuthApiService } from '../../../../../../infrastructure/api/AuthApiService';
import { LoginUseCase } from '../../../../../../application/usecases/LoginUseCase';

const loginUseCase = new LoginUseCase(new AuthApiService());

function mostrarError(msg: string): void {
  const box = document.getElementById('error-box')!;
  document.getElementById('error-msg')!.textContent = msg;
  box.classList.add('visible');
  clearTimeout((window as any)._errorTimer);
  (window as any)._errorTimer = setTimeout(() => ocultarError(), 2000);
}

function ocultarError(): void {
  document.getElementById('error-box')!.classList.remove('visible');
}

function togglePass(): void {
  const input = document.getElementById('password') as HTMLInputElement;
  const icon = document.getElementById('eye-icon')!;
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-low-vision');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-low-vision', 'fa-eye');
  }
}

function abrirModal(id: string): void {
  document.getElementById(id)!.classList.add('open');
}

function cerrarModal(id: string): void {
  document.getElementById(id)!.classList.remove('open');
}

function aceptarPolitica(checkId: string, modalId: string): void {
  (document.getElementById(checkId) as HTMLInputElement).checked = true;
  cerrarModal(modalId);
}

async function iniciarSesion(): Promise<void> {
  ocultarError();
  const tipo = (document.getElementById('tipoDoc') as HTMLSelectElement).value;
  const num = (document.getElementById('numId') as HTMLInputElement).value.trim();
  const pass = (document.getElementById('password') as HTMLInputElement).value;
  const pol1 = (document.getElementById('pol1') as HTMLInputElement).checked;
  const pol2 = (document.getElementById('pol2') as HTMLInputElement).checked;

  if (!tipo) return mostrarError('Por favor seleccione el tipo de documento.');
  if (!num) return mostrarError('Por favor ingrese su número de identificación.');
  if (!pass) return mostrarError('Por favor ingrese su contraseña.');
  if (!pol1 || !pol2) return mostrarError('Debe aceptar las políticas para continuar.');

  try {
    const rol = await loginUseCase.execute(tipo, num, pass);
    const rutas: Record<string, string> = {
      admin:     '/src/infrastructure/ui/modules/auth/login/provicional/provicional.html',
      jefe:      '/src/infrastructure/ui/modules/auth/login/provicional/provicional.html',
      empleado:  '/src/infrastructure/ui/modules/auth/login/provicional/provicional.html',
      candidato: '/src/infrastructure/ui/modules/auth/login/provicional/provicional.html',
    };
    window.location.href = rutas[rol] || '/';
  } catch (err: any) {
    mostrarError(err.message || 'No se pudo conectar con el servidor.');
  }
}

(window as any).iniciarSesion = iniciarSesion;
(window as any).togglePass = togglePass;
(window as any).abrirModal = abrirModal;
(window as any).cerrarModal = cerrarModal;
(window as any).aceptarPolitica = aceptarPolitica;

export {};