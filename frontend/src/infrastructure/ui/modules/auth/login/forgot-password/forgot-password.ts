const API_URL = 'http://localhost:3000/api/auth';

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

async function mostrarPaso2(): Promise<void> {
  ocultarError();

  const valor = (document.getElementById('correo') as HTMLInputElement).value.trim();

  if (!valor) return mostrarError('Por favor ingrese su número de identificación o correo electrónico.');

  try {
    const response = await fetch(`${API_URL}/solicitar-restablecimiento`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: valor }),
    });

    const data = await response.json();

    if (!response.ok) {
      return mostrarError(data.message || 'Error al enviar el correo.');
    }

    document.getElementById('step1')!.classList.remove('active');
    document.getElementById('step2')!.classList.add('active');

  } catch {
    mostrarError('No se pudo conectar con el servidor. Intente más tarde.');
  }
}

(window as any).mostrarPaso2 = mostrarPaso2;
(window as any).mostrarError = mostrarError;
(window as any).ocultarError = ocultarError;

export {}; 