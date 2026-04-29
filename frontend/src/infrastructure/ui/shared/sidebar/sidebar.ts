const LOGIN_URL = '/src/infrastructure/ui/modules/auth/login/login-principal/login.html';
const ACTIVE_KEY = 'sidebar-active';

const MODULOS: Record<string, string> = {
  'Mi hoja de vida': '../modules/admin/hoja-vida/hoja-vida.html',
  // los demás los vas agregando aquí cuando los tengas
};

async function cargarModulo(nombre: string): Promise<void> {
  const path = MODULOS[nombre];
  const container = document.getElementById('content-container');
  if (!container) return;

  if (!path) {
    container.innerHTML = '';
    return;
  }

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error();
    container.innerHTML = await res.text();

    if (nombre === 'Mi hoja de vida') {
      const { initHojaDeVida } = await import('../../modules/admin/hoja-vida/hoja-vida');
      initHojaDeVida();
    }
  } catch {
    container.innerHTML = '';
  }
}

function aplicarRoles(): void {
  const rol = localStorage.getItem('rol');
  if (!rol) {
    window.location.href = LOGIN_URL;
    return;
  }
  document.querySelectorAll<HTMLElement>('.nav-item[data-roles]').forEach(item => {
    const roles = item.dataset.roles!.split(',');
    if (!roles.includes(rol)) item.style.display = 'none';
  });
}

function aplicarActive(): void {
  const items = document.querySelectorAll<HTMLElement>('.nav-item');
  const savedIndex = localStorage.getItem(ACTIVE_KEY);

  if (savedIndex !== null) {
    const saved = items[parseInt(savedIndex)];
    if (saved) {
      saved.classList.add('active');
      const nombre = saved.querySelector('.nav-label')?.textContent?.trim() ?? '';
      cargarModulo(nombre);
    }
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      localStorage.setItem(ACTIVE_KEY, String(index));
      const nombre = item.querySelector('.nav-label')?.textContent?.trim() ?? '';
      cargarModulo(nombre);
    });
  });
}

function toggleSidebar(): void {
  document.body.classList.toggle('collapsed');
}

async function verificarSesion(): Promise<void> {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');
  if (!token || !rol) {
    window.location.href = LOGIN_URL;
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/api/auth/verificar', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      localStorage.clear();
      window.location.href = LOGIN_URL;
    }
  } catch {
    localStorage.clear();
    window.location.href = LOGIN_URL;
  }
}

export async function initSidebar(): Promise<void> {
  await verificarSesion();
  aplicarRoles();
  aplicarActive();
  (window as any).toggleSidebar = toggleSidebar;
}