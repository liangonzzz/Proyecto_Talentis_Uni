import { initSidebar } from '../shared/sidebar/sidebar';
import { initTopnav } from '../shared/topnav/topnav';

async function loadComponent(id: string, path: string): Promise<void> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Error cargando componente: ${path}`);
  const html = await res.text();
  const container = document.getElementById(id);
  if (container) container.innerHTML = html;
}

(async () => {
  await loadComponent('sidebar-container', '../shared/sidebar/sidebar.html');
  await loadComponent('topnav-container', '../shared/topnav/topnav.html');

  await initSidebar();
  await initTopnav();
})();