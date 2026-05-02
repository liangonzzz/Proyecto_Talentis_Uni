import './candidato.css';

const API_URL = '/api/candidatos';

interface CandidatoAPI {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  numero_documento: string;
  tipo_documento: string;
  rol: string;
  created_at: string;
  celular: string | null;
  cargo_actual: string | null;
}

type EstadoModulo = 'completo' | 'parcial' | 'vacio';

interface ModulosHV {
  informacion_perfil:  EstadoModulo;
  datos_personales:    EstadoModulo;
  datos_contacto:      EstadoModulo;
  formacion_academica: EstadoModulo;
  experiencia_laboral: EstadoModulo;
  afiliaciones:        EstadoModulo;
  documentos:          EstadoModulo;
}

interface CandidatoUI {
  id: number;
  nombre: string;
  correo: string;
  celular: string;
  cargo: string;
  modulos: ModulosHV;
  estadoHV: 'completa' | 'incompleta';
}

let candidatos: CandidatoUI[] = [];
let candidatoActivo: CandidatoUI | null = null;

// ── Utilidades ────────────────────────────────────────────────────

function obtenerIniciales(nombre: string): string {
  return nombre.split(' ').filter(p => p.length > 0).slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function getToken(): string {
  return localStorage.getItem('token') ?? '';
}

// ── API ───────────────────────────────────────────────────────────

async function cargarCandidatos(): Promise<void> {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error('Error al cargar candidatos');

    const data: CandidatoAPI[] = await res.json();
    const modulosDefault: ModulosHV = {
      informacion_perfil:  'vacio',
      datos_personales:    'vacio',
      datos_contacto:      'vacio',
      formacion_academica: 'vacio',
      experiencia_laboral: 'vacio',
      afiliaciones:        'vacio',
      documentos:          'vacio',
    };

    candidatos = await Promise.all(data.map(async c => {
      let modulos = { ...modulosDefault };
      try {
        const res = await fetch(`/api/hoja-vida/candidatos/${c.id}/modulos`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (res.ok) modulos = await res.json();
      } catch (_) {}

      return {
        id: c.id,
        nombre: `${c.nombre} ${c.apellidos}`,
        correo: c.correo,
        celular: c.celular ?? '---',
        cargo: c.cargo_actual ?? '---',
        modulos,
        estadoHV: c.celular && c.cargo_actual ? 'completa' : 'incompleta',
      };
    }));

    filtrar();
  } catch (err) {
    console.error(err);
    mostrarError('No se pudieron cargar los candidatos.');
  }
}

async function crearCandidato(dto: {
  nombre: string;
  apellidos: string;
  tipo_documento: string;
  numero_documento: string;
  correo: string;
}): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.mensaje ?? 'Error al crear candidato');
  }
}

const MODULOS_LABELS: { key: keyof ModulosHV; label: string }[] = [
  { key: 'informacion_perfil',  label: 'Información de perfil'  },
  { key: 'datos_personales',    label: 'Datos personales'        },
  { key: 'datos_contacto',      label: 'Datos de contacto'       },
  { key: 'formacion_academica', label: 'Formación académica'     },
  { key: 'experiencia_laboral', label: 'Experiencia laboral'     },
  { key: 'afiliaciones',        label: 'Afiliaciones'            },
  { key: 'documentos',          label: 'Documentos'              },
];

function renderBloques(modulos: ModulosHV): string {
  const colores: Record<EstadoModulo, string> = {
    completo: '#22c55e',
    parcial:  '#eab308',
    vacio:    '#d1d5db',
  };

  // Calcular porcentaje
  const puntos = MODULOS_LABELS.reduce((acc, m) => {
    const estado = modulos[m.key];
    return acc + (estado === 'completo' ? 1 : estado === 'parcial' ? 0.5 : 0);
  }, 0);
  const porcentaje = Math.round((puntos / MODULOS_LABELS.length) * 100);

  const bloques = MODULOS_LABELS.map(m => {
    const color = colores[modulos[m.key]];
    return `<div title="${m.label}" style="
      width:18px;height:10px;border-radius:3px;
      background:${color};display:inline-block;margin-right:2px;
    "></div>`;
  }).join('');

  return `<div>
    <span style="font-size:12px;font-weight:600;color:#374151;margin-bottom:4px;display:block">${porcentaje}%</span>
    <div style="display:flex;align-items:center;gap:2px">${bloques}</div>
  </div>`;
}

// ── Render tabla ──────────────────────────────────────────────────

function renderTabla(lista: CandidatoUI[]): void {
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
      <td>${renderBloques(c.modulos)}</td>
      <td>
        <div class="acciones-wrap">
          <button class="btn-accion ver"        title="Ver hoja de vida" data-id="${c.id}" data-action="hv">
            <i class="fa-solid fa-file-lines"></i>
          </button>
          <button class="btn-accion clasificar" title="Clasificar"       data-id="${c.id}" data-action="clasificar">
            <i class="fa-solid fa-user-check"></i>
          </button>
          <button class="btn-accion mensaje"    title="Enviar mensaje"   data-id="${c.id}" data-action="mensaje">
            <i class="fa-solid fa-comments"></i>
          </button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function mostrarError(msg: string): void {
  const tbody = document.getElementById('candidatos-tbody')!;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:32px;color:#dc2626">${msg}</td></tr>`;
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

function abrirModal(id: string): void  { document.getElementById(id)?.classList.add('active'); }
function cerrarModal(id: string): void { document.getElementById(id)?.classList.remove('active'); }

// ── Modal Crear ───────────────────────────────────────────────────

function abrirModalCrear(): void {
  (document.getElementById('c-nombres')   as HTMLInputElement).value  = '';
  (document.getElementById('c-apellidos') as HTMLInputElement).value  = '';
  (document.getElementById('c-documento') as HTMLInputElement).value  = '';
  (document.getElementById('c-correo')    as HTMLInputElement).value  = '';
  (document.getElementById('c-tipo-doc')  as HTMLSelectElement).value = 'CC';
  document.getElementById('crear-error')!.textContent             = '';
  document.getElementById('crear-form-content')!.style.display    = '';
  document.getElementById('crear-success-content')!.style.display = 'none';
  abrirModal('modal-crear');
}

async function guardarCandidato(): Promise<void> {
  const nombres    = (document.getElementById('c-nombres')   as HTMLInputElement).value.trim();
  const apellidos  = (document.getElementById('c-apellidos') as HTMLInputElement).value.trim();
  const tipoDoc    = (document.getElementById('c-tipo-doc')  as HTMLSelectElement).value;
  const documento  = (document.getElementById('c-documento') as HTMLInputElement).value.trim();
  const correo     = (document.getElementById('c-correo')    as HTMLInputElement).value.trim();
  const errorEl    = document.getElementById('crear-error')!;
  const btnGuardar = document.getElementById('guardar-candidato') as HTMLButtonElement;

  if (!nombres || !apellidos || !tipoDoc || !documento || !correo) {
    errorEl.textContent = 'Por favor completa todos los campos.'; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errorEl.textContent = 'Ingresa un correo válido.'; return;
  }

  errorEl.textContent    = '';
  btnGuardar.disabled    = true;
  btnGuardar.textContent = 'Guardando...';

  try {
    await crearCandidato({ nombre: nombres, apellidos, tipo_documento: tipoDoc, numero_documento: documento, correo });
    await cargarCandidatos();
    document.getElementById('crear-form-content')!.style.display    = 'none';
    document.getElementById('crear-success-content')!.style.display = '';
  } catch (err: any) {
    errorEl.textContent = err.message ?? 'Error al crear el candidato.';
  } finally {
    btnGuardar.disabled    = false;
    btnGuardar.textContent = 'Guardar';
  }
}

// ── Modal Ver HV ──────────────────────────────────────────────────

const SECCIONES_HV = [
  'Información de perfil',
  'Datos personales',
  'Formación académica',
  'Experiencia laboral',
  'Afiliaciones',
  'Documentos',
];

function abrirModalHV(id: number): void {
  const container = document.getElementById('content-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="main-wrapper">
      <div class="page-header-wrap">
        <div class="page-header">
          <div style="display:flex;align-items:center;gap:16px">
            <button id="btn-volver" style="background:none;border:none;cursor:pointer;color:#5b9bd5;font-size:13px;display:flex;align-items:center;gap:6px">
              <i class="fa-solid fa-arrow-left"></i> Volver a Candidatos
            </button>
            <h1 class="page-title">Hoja de Vida</h1>
          </div>
          <div class="progress-wrap">
            <div class="progress-track"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
            <div class="progress-badge" id="progress-badge">0%</div>
          </div>
        </div>
      </div>
      <div class="content-area">
        <div class="profile-panel">
          <div class="profile-top-card">
            <div class="avatar-ring-wrap">
              <div class="avatar-ring">
                <div id="panel-avatar" style="font-family:'Sora',sans-serif;font-weight:700;color:#5b9bd5;font-size:28px;width:84px;height:84px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#c7ddf8,#a8e6df)"></div>
              </div>
            </div>
            <div class="profile-name" id="panel-nombre"></div>
            <div class="profile-role" id="panel-role"></div>
            <div class="profile-email" id="panel-email"></div>
          </div>
          <div class="steps">
            <div class="step"><div class="step-dot" id="step-perfil"><svg viewBox="0 0 10 10" fill="none" stroke="#c8d8ea" stroke-width="2.2" width="9" height="9"><polyline points="2,5 4.5,7.5 8,2.5"/></svg></div><span class="step-lbl">Información de perfil</span></div>
            <div class="step"><div class="step-dot" id="step-personal"><svg viewBox="0 0 10 10" fill="none" stroke="#c8d8ea" stroke-width="2.2" width="9" height="9"><polyline points="2,5 4.5,7.5 8,2.5"/></svg></div><span class="step-lbl">Datos personales</span></div>
            <div class="step"><div class="step-dot" id="step-formacion"><svg viewBox="0 0 10 10" fill="none" stroke="#c8d8ea" stroke-width="2.2" width="9" height="9"><polyline points="2,5 4.5,7.5 8,2.5"/></svg></div><span class="step-lbl">Formación académica</span></div>
            <div class="step"><div class="step-dot" id="step-experiencia"><svg viewBox="0 0 10 10" fill="none" stroke="#c8d8ea" stroke-width="2.2" width="9" height="9"><polyline points="2,5 4.5,7.5 8,2.5"/></svg></div><span class="step-lbl">Experiencia laboral</span></div>
            <div class="step"><div class="step-dot" id="step-afiliaciones"><svg viewBox="0 0 10 10" fill="none" stroke="#c8d8ea" stroke-width="2.2" width="9" height="9"><polyline points="2,5 4.5,7.5 8,2.5"/></svg></div><span class="step-lbl">Afiliaciones</span></div>
            <div class="step"><div class="step-dot" id="step-documentos"><svg viewBox="0 0 10 10" fill="none" stroke="#c8d8ea" stroke-width="2.2" width="9" height="9"><polyline points="2,5 4.5,7.5 8,2.5"/></svg></div><span class="step-lbl">Documentos</span></div>
          </div>
        </div>
        <div class="sections-wrapper">
          <div class="sections-panel" id="secciones-container"></div>
        </div>
      </div>
    </div>`;

  requestAnimationFrame(async () => {
    const { initHojaVidaReadonly } = await import('./hoja-vida-readonly');
    initHojaVidaReadonly(id);
  });
}

// ── Modal Clasificar ──────────────────────────────────────────────

function abrirModalClasificar(id: number): void {
  const c = candidatos.find(x => x.id === id);
  if (!c) return;
  candidatoActivo = c;

  document.getElementById('clasificar-nombre-sub')!.textContent = c.nombre;
  document.getElementById('clasificar-opciones')!.style.display = '';
  document.getElementById('clasificar-motivo')!.style.display   = 'none';
  document.getElementById('clasificar-success')!.style.display  = 'none';
  (document.getElementById('motivo-textarea') as HTMLTextAreaElement).value = '';
  abrirModal('modal-clasificar');
}

// ── Modal Mensaje ─────────────────────────────────────────────────

let chatPolling: number | null = null;

function formatHora(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

function renderMensajesAdmin(mensajes: any[]): void {
  const container = document.getElementById('chat-mensajes-admin')!;
  if (mensajes.length === 0) {
    container.innerHTML = `<div class="chat-empty">No hay mensajes aún. ¡Escribe el primero!</div>`;
    return;
  }
  const candidatoId = candidatoActivo?.id;
  container.innerHTML = mensajes.map(m => {
    const esMio = m.autor_id !== candidatoId;
    return `
      <div class="chat-burbuja-wrap ${esMio ? 'derecha' : 'izquierda'}">
        <div class="chat-burbuja">${m.mensaje}</div>
        <span class="chat-hora">${formatHora(m.created_at)}</span>
      </div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

async function cargarMensajesAdmin(): Promise<void> {
  if (!candidatoActivo) return;
  try {
    const res = await fetch(`/api/mensajes/${candidatoActivo.id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return;
    const mensajes = await res.json();
    renderMensajesAdmin(mensajes);
  } catch {}
}

async function enviarMensajeAdmin(): Promise<void> {
  if (!candidatoActivo) return;
  const input = document.getElementById('chat-input-admin') as HTMLTextAreaElement;
  const texto = input.value.trim();
  if (!texto) return;
  input.value = '';
  input.style.height = 'auto';
  try {
    await fetch(`/api/mensajes/${candidatoActivo.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ mensaje: texto }),
    });
    await cargarMensajesAdmin();
  } catch {
    alert('Error al enviar el mensaje.');
  }
}

function abrirModalMensaje(id: number): void {
  const c = candidatos.find(x => x.id === id);
  if (!c) return;
  candidatoActivo = c;

  document.getElementById('chat-avatar-admin')!.textContent = obtenerIniciales(c.nombre);
  document.getElementById('chat-nombre-admin')!.textContent = c.nombre;
  document.getElementById('chat-mensajes-admin')!.innerHTML = '<div class="chat-loading">Cargando mensajes...</div>';

  abrirModal('modal-mensaje');
  cargarMensajesAdmin();

  if (chatPolling) clearInterval(chatPolling);
  chatPolling = window.setInterval(cargarMensajesAdmin, 5000);
}

// ── Init ──────────────────────────────────────────────────────────

export function initCandidatos(): void {
  cargarCandidatos();

  document.getElementById('buscar-input') ?.addEventListener('input',  filtrar);
  document.getElementById('filtro-estado')?.addEventListener('change', filtrar);
  document.getElementById('btn-agregar')  ?.addEventListener('click',  abrirModalCrear);

  // Modal Crear
  document.getElementById('close-crear')        ?.addEventListener('click', () => cerrarModal('modal-crear'));
  document.getElementById('cancel-crear')        ?.addEventListener('click', () => cerrarModal('modal-crear'));
  document.getElementById('guardar-candidato')   ?.addEventListener('click', guardarCandidato);
  document.getElementById('close-crear-success') ?.addEventListener('click', () => cerrarModal('modal-crear'));
  document.getElementById('modal-crear')         ?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-crear')) cerrarModal('modal-crear');
  });

  // Modal HV
  document.getElementById('close-hv')?.addEventListener('click', () => cerrarModal('modal-hv'));
  document.getElementById('modal-hv')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-hv')) cerrarModal('modal-hv');
  });

 // Modal Clasificar
document.getElementById('close-clasificar')?.addEventListener('click', () => cerrarModal('modal-clasificar'));

document.getElementById('btn-clasificado')?.addEventListener('click', async () => {
  if (!candidatoActivo) return;
  try {
    const res = await fetch(`/api/candidatos/${candidatoActivo.id}/clasificar`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error();
    document.getElementById('clasificar-opciones')!.style.display = 'none';
    document.getElementById('clasificar-success')!.style.display  = '';
    candidatos = candidatos.filter(c => c.id !== candidatoActivo!.id);
    filtrar();
  } catch {
    alert('Error al clasificar el candidato.');
  }
});

document.getElementById('btn-no-clasificado')?.addEventListener('click', () => {
  document.getElementById('clasificar-opciones')!.style.display = 'none';
  document.getElementById('clasificar-motivo')!.style.display   = '';
  (document.getElementById('motivo-textarea') as HTMLTextAreaElement).style.borderColor = '';
});

document.getElementById('close-clasificar-success')?.addEventListener('click', () => cerrarModal('modal-clasificar'));

document.getElementById('cancel-motivo')?.addEventListener('click', () => {
  document.getElementById('clasificar-motivo')!.style.display   = 'none';
  document.getElementById('clasificar-opciones')!.style.display = '';
});

document.getElementById('enviar-motivo')?.addEventListener('click', async () => {
  if (!candidatoActivo) return;
  const textarea  = document.getElementById('motivo-textarea') as HTMLTextAreaElement;
  const motivo    = textarea.value.trim();
  if (!motivo) { textarea.style.borderColor = '#dc2626'; return; }
  textarea.style.borderColor = '';

  const btnEnviar = document.getElementById('enviar-motivo') as HTMLButtonElement;
  btnEnviar.disabled    = true;
  btnEnviar.textContent = 'Enviando...';

  try {
    const res = await fetch(`/api/candidatos/${candidatoActivo.id}/bloquear`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ motivo }),
    });
    if (!res.ok) throw new Error();
    candidatos = candidatos.filter(c => c.id !== candidatoActivo!.id);
    filtrar();
    cerrarModal('modal-clasificar');
  } catch {
    alert('Error al enviar el motivo. Intenta de nuevo.');
  } finally {
    btnEnviar.disabled    = false;
    btnEnviar.textContent = 'Enviar';
  }
});

document.getElementById('modal-clasificar')?.addEventListener('click', e => {
  if (e.target === document.getElementById('modal-clasificar')) cerrarModal('modal-clasificar');
});

  
 // Modal Mensaje (chat)
  document.getElementById('close-mensaje')?.addEventListener('click', () => {
    cerrarModal('modal-mensaje');
    if (chatPolling) { clearInterval(chatPolling); chatPolling = null; }
  });
  document.getElementById('modal-mensaje')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-mensaje')) {
      cerrarModal('modal-mensaje');
      if (chatPolling) { clearInterval(chatPolling); chatPolling = null; }
    }
  });
  document.getElementById('chat-send-admin')?.addEventListener('click', enviarMensajeAdmin);
  document.getElementById('chat-input-admin')?.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMensajeAdmin(); }
  });
  document.getElementById('chat-input-admin')?.addEventListener('input', function(this: HTMLTextAreaElement) {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });

  // Delegación de eventos tabla
  document.getElementById('candidatos-tbody')?.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
    if (!btn) return;
    const id     = parseInt(btn.dataset.id ?? '0');
    const action = btn.dataset.action;
    if (action === 'hv')         abrirModalHV(id);
    if (action === 'clasificar') abrirModalClasificar(id);
    if (action === 'mensaje')    abrirModalMensaje(id);
  });
}