import { AuthApiService } from '../../../api/AuthApiService';
import { VerificarTokenUseCase } from '../../../../application/usecases/VerificarTokenUseCase';
import { ConfirmarRestablecimientoUseCase } from '../../../../application/usecases/ConfirmarRestablecimientoUseCase';

const authService = new AuthApiService();
const verificarUseCase = new VerificarTokenUseCase(authService);
const confirmarUseCase = new ConfirmarRestablecimientoUseCase(authService);

const token = new URLSearchParams(window.location.search).get('token') || '';

async function verificarToken(): Promise<void> {
  if (!token) {
    window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
    return;
  }
  try {
    await verificarUseCase.execute(token);
  } catch {
    window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
  }
}

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

function togglePass(inputId: string, iconId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const icon = document.getElementById(iconId)!;
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-low-vision');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-low-vision', 'fa-eye');
  }
}

function validarRequisitos(): void {
  const val = (document.getElementById('newPassword') as HTMLInputElement).value;
  toggleReq('req-min', val.length >= 8);
  toggleReq('req-may', /[A-Z]/.test(val));
  toggleReq('req-min-l', /[a-z]/.test(val));
  toggleReq('req-num', /[0-9]/.test(val));
}

function toggleReq(id: string, ok: boolean): void {
  const el = document.getElementById(id)!;
  ok ? el.classList.add('ok') : el.classList.remove('ok');
}

async function confirmar(): Promise<void> {
  ocultarError();
  const nueva = (document.getElementById('newPassword') as HTMLInputElement).value;
  const confirma = (document.getElementById('confirmPassword') as HTMLInputElement).value;

  if (!nueva) return mostrarError('Por favor ingrese su nueva contraseña.');
  if (nueva.length < 8) return mostrarError('La contraseña debe tener mínimo 8 caracteres.');
  if (!/[A-Z]/.test(nueva)) return mostrarError('Debe contener al menos una letra mayúscula.');
  if (!/[a-z]/.test(nueva)) return mostrarError('Debe contener al menos una letra minúscula.');
  if (!/[0-9]/.test(nueva)) return mostrarError('Debe contener al menos un número.');
  if (!confirma) return mostrarError('Por favor confirme su nueva contraseña.');
  if (nueva !== confirma) return mostrarError('Las contraseñas no coinciden.');
  if (!token) return mostrarError('El enlace es inválido. Solicite uno nuevo.');

  try {
    await confirmarUseCase.execute(token, nueva);
    document.getElementById('step1')!.classList.remove('active');
    document.getElementById('step2')!.classList.add('active');
  } catch (err: any) {
    mostrarError(err.message || 'No se pudo conectar con el servidor.');
  }
}

verificarToken();

(window as any).confirmar = confirmar;
(window as any).togglePass = togglePass;
(window as any).validarRequisitos = validarRequisitos;

export {};