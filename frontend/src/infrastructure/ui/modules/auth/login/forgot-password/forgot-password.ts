import { AuthApiService } from '../../../../../../infrastructure/api/AuthApiService';
import { SolicitarRestablecimientoUseCase } from '../../../../../../application/usecases/SolicitarRestablecimientoUseCase';

const solicitarUseCase = new SolicitarRestablecimientoUseCase(new AuthApiService());

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
  if (!valor) return mostrarError('Por favor ingrese su correo electrónico.');

  try {
    await solicitarUseCase.execute(valor);
    document.getElementById('step1')!.classList.remove('active');
    document.getElementById('step2')!.classList.add('active');
  } catch (err: any) {
    mostrarError(err.message || 'No se pudo conectar con el servidor.');
  }
}

(window as any).mostrarPaso2 = mostrarPaso2;

export {};