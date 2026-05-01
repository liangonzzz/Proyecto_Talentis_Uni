import './candidato.css';

interface Candidato {
  id: number;
  nombre: string;
  correo: string;
  celular: string;
  cargo: string;
  progreso: number;
  estadoHV: 'completa' | 'incompleta';
}

let candidatos: Candidato[] = [
  { id: 1, nombre: 'José Antonio Bonilla López',      correo: 'joseantonio@outlook.com',    celular: '3002568722', cargo: 'Desarrollador Full Stack', progreso: 92, estadoHV: 'completa'   },
  { id: 2, nombre: 'Sandra Viviana Mateus Cifuentes',  correo: 'sandramate@outlook.com',     celular: '3150428835', cargo: 'Diseñador UX/UI',           progreso: 10, estadoHV: 'incompleta' },
  { id: 3, nombre: 'Liliana Murillo Sotelo',           correo: 'lilianamurillo@outlook.com', celular: '3129316633', cargo: 'Desarrollador Full Stack',   progreso: 53, estadoHV: 'incompleta' },
  { id: 4, nombre: 'Luis Alejandro Valderrama',        correo: 'luisvalderrama@outlook.com', celular: '3027468613', cargo: 'Producto Manager',           progreso: 48, estadoHV: 'incompleta' },
  { id: 5, nombre: 'Gerónimo Vélez Ruiz',              correo: 'geronimovelez@outlook.com',  celular: '3106783254', cargo: 'QA Engineer',                progreso: 10, estadoHV: 'incompleta' },
];

let candidatoActivo: Candidato | null = null;

// ── Utilidades ────────────────────────────────────────────────────

function obtenerIniciales(nombre: string): string {
  return nombre
    .split(' ')
    .filter(p => p.length > 0)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');
}

// ── Render tabla ──────────────────────────────────────────────────

function renderTabla(lista: Candidato[]): void {
  const tbody = document.getElementById('candidatos-tbody')!;
  tbody.innerHTML = '';

  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-soft)">No se encontraron candidatos.</td></tr>`;
    return;
  }

  lista.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="cand-avatar-wrap">
          <div class="cand-avatar">${obtenerIniciales(c.nombre)}</div>
          <span class="cand-nombre">${c.nombre}</span>
        </div>
      </td>
      <td>${c.correo}</td>
      <td>${c.celular}</td>
      <td>${c.cargo}</td>
      <td>
        <div class="progreso-wrap">
          <span class="progreso-pct">${c.progreso}%</span>
          <div class="progreso-track">
            <div class="progreso-fill" style="width:${c.progreso}%"></div>
          </div>
        </div>
      </td>
      <td>
        <div class="acciones-wrap">
          <button class="btn-accion ver"        title="Ver hoja de vida"  onclick="abrirModalHV(${c.id})">
            <i class="fa-solid fa-file-lines"></i>
          </button>
          <button class="btn-accion clasificar" title="Clasificar"        onclick="abrirModalClasificar(${c.id})">
            <i class="fa-solid fa-user-check"></i>
          </button>
          <button class="btn-accion mensaje"    title="Enviar mensaje"    onclick="abrirModalMensaje(${c.id})">
            <i class="fa-solid fa-envelope"></i>
          </button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

// ── Filtrar ───────────────────────────────────────────────────────

function filtrar(): void {
  const busqueda = (document.getElementById('buscar-input') as HTMLInputElement).value.toLowerCase();
  const estado   = (document.getElementById('filtro-estado') as HTMLSelectElement).value;

  const lista = candidatos.filter(c => {
    const coincideTexto  = c.nombre.toLowerCase().includes(busqueda) || c.correo.toLowerCase().includes(busqueda);
    const coincideEstado = !estado || c.estadoHV === estado;
    return coincideTexto && coincideEstado;
  });

  renderTabla(lista);
}

// ── Modales helpers ───────────────────────────────────────────────

function abrirModal(id: string): void {
  const overlay = document.getElementById(id)!;
  overlay.classList.add('active');
}

function cerrarModal(id: string): void {
  const overlay = document.getElementById(id)!;
  overlay.classList.remove('active');
}

// ── Modal Crear ───────────────────────────────────────────────────

function abrirModalCrear(): void {
  (document.getElementById('c-nombre')    as HTMLInputElement).value = '';
  (document.getElementById('c-apellido')  as HTMLInputElement).value = '';
  (document.getElementById('c-documento') as HTMLInputElement).value = '';
  (document.getElementById('c-correo')    as HTMLInputElement).value = '';
  (document.getElementById('c-tipo-doc')  as HTMLSelectElement).value = '';
  document.getElementById('crear-form-section')!.style.display    = '';
  document.getElementById('crear-success-section')!.style.display = 'none';
  abrirModal('overlay-crear');
}

function cerrarModalCrear(): void {
  cerrarModal('overlay-crear');
}

function guardarCandidato(): void {
  const nombre    = (document.getElementById('c-nombre')    as HTMLInputElement).value.trim();
  const apellido  = (document.getElementById('c-apellido')  as HTMLInputElement).value.trim();
  const tipoDoc   = (document.getElementById('c-tipo-doc')  as HTMLSelectElement).value;
  const documento = (document.getElementById('c-documento') as HTMLInputElement).value.trim();
  const correo    = (document.getElementById('c-correo')    as HTMLInputElement).value.trim();

  if (!nombre || !apellido || !tipoDoc || !documento || !correo) {
    alert('Por favor completa todos los campos.');
    return;
  }

  candidatos.push({
    id: candidatos.length + 1,
    nombre: `${nombre} ${apellido}`,
    correo,
    celular: '---',
    cargo: '---',
    progreso: 0,
    estadoHV: 'incompleta',
  });

  filtrar();
  document.getElementById('crear-form-section')!.style.display    = 'none';
  document.getElementById('crear-success-section')!.style.display = '';
}

// ── Modal Ver HV ──────────────────────────────────────────────────

const SECCIONES_HV = [
  'Información de perfil',
  'Datos personales',
  'Formación académica',
  'Experiencia laboral',
  'Documentos',
];

function abrirModalHV(id: number): void {
  const c = candidatos.find(x => x.id === id);
  if (!c) return;
  candidatoActivo = c;

  document.getElementById('hv-nombre')!.textContent    = c.nombre;
  (document.getElementById('hv-barra') as HTMLElement).style.width = `${c.progreso}%`;
  document.getElementById('hv-pct-label')!.textContent = `${c.progreso}%`;

  const secsOk    = Math.round((c.progreso / 100) * SECCIONES_HV.length);
  const container = document.getElementById('hv-secciones')!;
  container.innerHTML = '';

  SECCIONES_HV.forEach((sec, i) => {
    const ok  = i < secsOk;
    const div = document.createElement('div');
    div.className = 'hv-seccion';
    div.innerHTML = `
      <div class="hv-sec-icon ${ok ? 'ok' : 'pend'}">
        <i class="fa-solid ${ok ? 'fa-check' : 'fa-circle'}"></i>
      </div>
      <span>${sec}</span>`;
    container.appendChild(div);
  });

  abrirModal('overlay-hv');
}

// ── Modal Clasificar ──────────────────────────────────────────────

function abrirModalClasificar(id: number): void {
  const c = candidatos.find(x => x.id === id);
  if (!c) return;
  candidatoActivo = c;

  document.getElementById('clas-nombre-sub')!.textContent = c.nombre;
  document.getElementById('clas-no-nombre')!.textContent  = c.nombre;
  document.getElementById('clas-main-section')!.style.display    = '';
  document.getElementById('clas-success-section')!.style.display = 'none';
  document.getElementById('clas-no-section')!.style.display      = 'none';
  (document.getElementById('clas-motivo') as HTMLTextAreaElement).value = '';

  abrirModal('overlay-clasificar');
}

// ── Modal Mensaje ─────────────────────────────────────────────────

function abrirModalMensaje(id: number): void {
  const c = candidatos.find(x => x.id === id);
  if (!c) return;
  candidatoActivo = c;

  document.getElementById('msg-titulo')!.textContent = `Enviar mensaje a ${c.nombre}`;
  (document.getElementById('msg-texto') as HTMLTextAreaElement).value = '';

  abrirModal('overlay-mensaje');
}

function enviarMensaje(): void {
  const texto = (document.getElementById('msg-texto') as HTMLTextAreaElement).value.trim();
  if (!texto) { alert('Escribe un mensaje antes de enviar.'); return; }
  cerrarModal('overlay-mensaje');
  alert(`Mensaje enviado a ${candidatoActivo?.nombre ?? 'candidato'}.`);
}

// ── Init (exportado igual que initFuncionarios) ───────────────────

export function initCandidatos(): void {
  renderTabla(candidatos);

  document.getElementById('buscar-input')  ?.addEventListener('input',  filtrar);
  document.getElementById('filtro-estado') ?.addEventListener('change', filtrar);

  // Botón agregar
  document.getElementById('btn-agregar')?.addEventListener('click', abrirModalCrear);

  // Modal Crear
  document.getElementById('btn-close-crear')    ?.addEventListener('click', cerrarModalCrear);
  document.getElementById('btn-cancelar-crear')  ?.addEventListener('click', cerrarModalCrear);
  document.getElementById('btn-guardar-crear')   ?.addEventListener('click', guardarCandidato);
  document.getElementById('btn-ok-crear')        ?.addEventListener('click', cerrarModalCrear);
  document.getElementById('overlay-crear')       ?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlay-crear')) cerrarModalCrear();
  });

  // Modal HV
  document.getElementById('btn-close-hv')  ?.addEventListener('click', () => cerrarModal('overlay-hv'));
  document.getElementById('btn-close-hv2') ?.addEventListener('click', () => cerrarModal('overlay-hv'));
  document.getElementById('overlay-hv')    ?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlay-hv')) cerrarModal('overlay-hv');
  });

  // Modal Clasificar
  document.getElementById('btn-close-clas')    ?.addEventListener('click', () => cerrarModal('overlay-clasificar'));
  document.getElementById('overlay-clasificar') ?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlay-clasificar')) cerrarModal('overlay-clasificar');
  });
  document.getElementById('btn-clasificado')    ?.addEventListener('click', () => {
    document.getElementById('clas-main-section')!.style.display    = 'none';
    document.getElementById('clas-success-section')!.style.display = '';
  });
  document.getElementById('btn-no-clasificado') ?.addEventListener('click', () => {
    document.getElementById('clas-main-section')!.style.display = 'none';
    document.getElementById('clas-no-section')!.style.display   = '';
  });
  document.getElementById('btn-ok-clas')      ?.addEventListener('click', () => cerrarModal('overlay-clasificar'));
  document.getElementById('btn-cancelar-clas') ?.addEventListener('click', () => cerrarModal('overlay-clasificar'));
  document.getElementById('btn-enviar-clas')   ?.addEventListener('click', () => {
    const motivo = (document.getElementById('clas-motivo') as HTMLTextAreaElement).value.trim();
    if (!motivo) { alert('Escribe el motivo antes de enviar.'); return; }
    cerrarModal('overlay-clasificar');
    alert('Motivo enviado correctamente.');
  });

  // Modal Mensaje
  document.getElementById('btn-close-msg')    ?.addEventListener('click', () => cerrarModal('overlay-mensaje'));
  document.getElementById('btn-cancelar-msg')  ?.addEventListener('click', () => cerrarModal('overlay-mensaje'));
  document.getElementById('btn-enviar-msg')    ?.addEventListener('click', enviarMensaje);
  document.getElementById('overlay-mensaje')   ?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlay-mensaje')) cerrarModal('overlay-mensaje');
  });

  // Exponer al window los onclick del HTML (igual que funcionario.ts)
  (window as any).abrirModalHV         = abrirModalHV;
  (window as any).abrirModalClasificar = abrirModalClasificar;
  (window as any).abrirModalMensaje    = abrirModalMensaje;
}