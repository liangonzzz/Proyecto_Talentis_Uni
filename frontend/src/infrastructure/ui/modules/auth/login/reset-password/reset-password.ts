const API_URL = 'http://localhost:3000/api/auth';

async function verificarTokenReset(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/verificar-token-reset?token=${token}`);
    if (!response.ok) {
      window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
    }
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
  toggleReq('req-min',   val.length >= 8);
  toggleReq('req-may',   /[A-Z]/.test(val));
  toggleReq('req-min-l', /[a-z]/.test(val));
  toggleReq('req-num',   /[0-9]/.test(val));
}

function toggleReq(id: string, ok: boolean): void {
  const el = document.getElementById(id)!;
  ok ? el.classList.add('ok') : el.classList.remove('ok');
}

function obtenerToken(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

async function confirmar(): Promise<void> {
  ocultarError();

  const nueva    = (document.getElementById('newPassword')    as HTMLInputElement).value;
  const confirma = (document.getElementById('confirmPassword') as HTMLInputElement).value;
  const token    = obtenerToken();

  if (!nueva)             return mostrarError('Por favor ingrese su nueva contraseña.');
  if (nueva.length < 8)   return mostrarError('La contraseña debe tener mínimo 8 caracteres.');
  if (!/[A-Z]/.test(nueva)) return mostrarError('La contraseña debe contener al menos una letra mayúscula.');
  if (!/[a-z]/.test(nueva)) return mostrarError('La contraseña debe contener al menos una letra minúscula.');
  if (!/[0-9]/.test(nueva)) return mostrarError('La contraseña debe contener al menos un número.');
  if (!confirma)          return mostrarError('Por favor confirme su nueva contraseña.');
  if (nueva !== confirma) return mostrarError('Las contraseñas no coinciden. Por favor verifique.');
  if (!token)             return mostrarError('El enlace es inválido. Solicite uno nuevo.');

  try {
    const response = await fetch(`${API_URL}/confirmar-restablecimiento`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, nuevaPassword: nueva }),
    });

    const data = await response.json();

    if (!response.ok) {
      return mostrarError(data.message || 'Error al restablecer la contraseña.');
    }

    document.getElementById('step1')!.classList.remove('active');
    document.getElementById('step2')!.classList.add('active');

  } catch {
    mostrarError('No se pudo conectar con el servidor. Intente más tarde.');
  }
}

verificarTokenReset();

(window as any).confirmar         = confirmar;
(window as any).togglePass        = togglePass;
(window as any).validarRequisitos = validarRequisitos;
(window as any).mostrarError      = mostrarError;
(window as any).ocultarError      = ocultarError;

export {};