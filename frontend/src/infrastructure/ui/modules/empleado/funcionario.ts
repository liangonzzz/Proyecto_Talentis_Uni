import './funcionario.css';

interface Funcionario {
  id: number;
  nombre: string;
  correo: string;
  tipo: string;
  documento: string;
  progreso: number;
  estado: 'Activo' | 'Inactivo' | 'Incapacidad' | 'Vacaciones';
}

let funcionarios: Funcionario[] = [
  { id: 1, nombre: 'José Antonio Correa',        correo: 'jose.currea@mail.com',      tipo: 'CC', documento: '1234567890', progreso: 75, estado: 'Activo' },
  { id: 2, nombre: 'María González',             correo: 'maria.gonzalez@mail.com',   tipo: 'CE', documento: '9876543210', progreso: 50, estado: 'Inactivo' },
  { id: 3, nombre: 'Carlos Rodríguez',           correo: 'carlos.rodriguez@mail.com', tipo: 'CC', documento: '5555555555', progreso: 50, estado: 'Activo' },
  { id: 4, nombre: 'Ana Martínez Silva',         correo: 'ana.martinez@mail.com',     tipo: 'CC', documento: '5555555555', progreso: 25, estado: 'Activo' },
  { id: 5, nombre: 'Gerónimo Vélez Ruiz',        correo: 'geronimo.velez@mail.com',   tipo: 'CC', documento: '5555555555', progreso: 25, estado: 'Activo' },
  { id: 6, nombre: 'María Camila Jiménez',       correo: 'maria.jimenez@mail.com',    tipo: 'CE', documento: '3158243792', progreso: 50, estado: 'Inactivo' },
];

let dropdownFuncionarioId: number | null = null;

function obtenerIniciales(nombre: string): string {
  return nombre.split(' ').filter(p => p.length > 0).slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function claseEstado(estado: string): string {
  const mapa: Record<string, string> = {
    Activo: 'activo', Inactivo: 'inactivo',
    Incapacidad: 'incapacidad', Vacaciones: 'vacaciones',
  };
  return mapa[estado] ?? 'activo';
}

function renderTabla(lista: Funcionario[]): void {
  const tbody = document.getElementById('funcionarios-tbody')!;
  tbody.innerHTML = '';

  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-soft)">No se encontraron funcionarios.</td></tr>`;
    return;
  }

  lista.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="func-avatar-wrap">
          <div class="func-avatar">${obtenerIniciales(f.nombre)}</div>
          <span class="func-nombre">${f.nombre}</span>
        </div>
      </td>
      <td class="func-correo">${f.correo}</td>
      <td>${f.tipo}</td>
      <td>${f.documento}</td>
      <td>
        <div class="progreso-wrap">
          <div class="progreso-track">
            <div class="progreso-fill" style="width:${f.progreso}%"></div>
          </div>
          <span class="progreso-label">${f.progreso}%</span>
        </div>
      </td>
      <td>
        <div class="estado-badge">
          <span class="estado-punto ${claseEstado(f.estado)}"></span>
          ${f.estado}
        </div>
      </td>
      <td>
        <div class="acciones-wrap">
          <button class="btn-accion descargar" title="Descargar hoja de vida" onclick="descargar(${f.id})">
            <i class="fa-solid fa-download"></i>
          </button>
          <button class="btn-accion ver" title="Ver hoja de vida" onclick="verHojaDeVida(${f.id})">
            <i class="fa-solid fa-file-lines"></i>
          </button>
          <button class="btn-accion cambiar" title="Cambiar estado" onclick="abrirDropdownEstado(event, ${f.id})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-accion eliminar" title="Eliminar" onclick="eliminar(${f.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function filtrar(): void {
  const busqueda = (document.getElementById('buscar-input') as HTMLInputElement).value.toLowerCase();
  const estado   = (document.getElementById('filtro-estado') as HTMLSelectElement).value;
  const tipo     = (document.getElementById('filtro-tipo') as HTMLSelectElement).value;

  const lista = funcionarios.filter(f => {
    const coincideBusqueda = f.nombre.toLowerCase().includes(busqueda) || f.correo.toLowerCase().includes(busqueda);
    const coincideEstado   = !estado || f.estado === estado;
    const coincideTipo     = !tipo   || f.tipo   === tipo;
    return coincideBusqueda && coincideEstado && coincideTipo;
  });

  renderTabla(lista);
}

function abrirDropdownEstado(e: MouseEvent, id: number): void {
  e.stopPropagation();
  const dropdown = document.getElementById('estado-dropdown')!;
  const btn = e.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();

  dropdownFuncionarioId = id;
  dropdown.style.display = 'block';
  dropdown.style.top  = `${rect.bottom + 6}px`;
  dropdown.style.left = `${rect.left}px`;
}

function cerrarDropdown(): void {
  document.getElementById('estado-dropdown')!.style.display = 'none';
  dropdownFuncionarioId = null;
}

function cambiarEstado(nuevoEstado: string): void {
  if (dropdownFuncionarioId === null) return;
  const f = funcionarios.find(x => x.id === dropdownFuncionarioId);
  if (f) f.estado = nuevoEstado as Funcionario['estado'];
  cerrarDropdown();
  filtrar();
}

function eliminar(id: number): void {
  if (!confirm('¿Estás seguro de que deseas eliminar este funcionario?')) return;
  funcionarios = funcionarios.filter(f => f.id !== id);
  filtrar();
}

function descargar(id: number): void {
  const f = funcionarios.find(x => x.id === id);
  alert(`Descargando hoja de vida de ${f?.nombre ?? 'funcionario'}...`);
}

function verHojaDeVida(id: number): void {
  const f = funcionarios.find(x => x.id === id);
  alert(`Ver hoja de vida de ${f?.nombre ?? 'funcionario'}...`);
}

export function initFuncionarios(): void {
  renderTabla(funcionarios);

  document.getElementById('buscar-input')  ?.addEventListener('input', filtrar);
  document.getElementById('filtro-estado') ?.addEventListener('change', filtrar);
  document.getElementById('filtro-tipo')   ?.addEventListener('change', filtrar);

  document.querySelectorAll('.estado-option').forEach(opt => {
    opt.addEventListener('click', () => {
      cambiarEstado((opt as HTMLElement).dataset.estado ?? '');
    });
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('estado-dropdown');
    if (dropdown && !dropdown.contains(e.target as Node)) {
      cerrarDropdown();
    }
  });

  (window as any).descargar          = descargar;
  (window as any).verHojaDeVida      = verHojaDeVida;
  (window as any).eliminar           = eliminar;
  (window as any).abrirDropdownEstado = abrirDropdownEstado;
}