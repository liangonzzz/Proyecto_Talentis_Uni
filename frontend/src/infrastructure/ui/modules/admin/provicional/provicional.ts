function toggleSec(card: HTMLElement): void {
  card.classList.toggle('open');
}

async function verificarToken(): Promise<void> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/verificar', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      localStorage.clear();
      window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
    }
  } catch {
    localStorage.clear();
    window.location.href = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
  }
}

verificarToken();

export {};