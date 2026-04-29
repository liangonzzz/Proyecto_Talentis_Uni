import './hoja-vida.css';

const API = 'http://localhost:3000/api/hoja-vida';

function token(): string {
  return localStorage.getItem('token') ?? '';
}

function headers(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token()}`,
  };
}

function obtenerIniciales(nombre: string): string {
  return nombre.split(' ').filter(p => p.length > 0).slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function val(id: string): string {
  return (document.getElementById(id) as HTMLInputElement)?.value?.trim() ?? '';
}

function setVal(id: string, value: string): void {
  const el = document.getElementById(id) as HTMLInputElement;
  if (el) el.value = value ?? '';
}

// ── TOGGLE / TABS ───────────────────────────────────────────

function toggleSec(card: HTMLElement): void {
  card.classList.toggle('open');
}

function switchTab(btn: HTMLElement, panelId: string): void {
  const secBody = btn.closest('.sec-body')!;
  secBody.querySelectorAll<HTMLElement>('.dp-tab').forEach(t => t.classList.remove('active'));
  secBody.querySelectorAll<HTMLElement>('.dp-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  secBody.querySelector<HTMLElement>(`#${panelId}`)!.classList.add('active');
}

// ── PANEL IZQUIERDO ─────────────────────────────────────────

function cargarPanel(): void {
  const nombre = localStorage.getItem('nombre') ?? 'Usuario';
  const rol    = localStorage.getItem('rol')    ?? '';
  const correo = localStorage.getItem('correo') ?? '';

  document.getElementById('panel-avatar')!.textContent = obtenerIniciales(nombre);
  document.getElementById('panel-nombre')!.textContent = nombre;
  document.getElementById('panel-role')!.textContent   = rol;
  document.getElementById('panel-email')!.textContent  = correo;
}

// ── PROGRESO ────────────────────────────────────────────────

const STEPS = ['step-perfil', 'step-personal', 'step-formacion', 'step-experiencia', 'step-afiliaciones', 'step-documentos'];
const completados = new Set<string>();

function marcarStep(stepId: string): void {
  completados.add(stepId);
  document.getElementById(stepId)?.classList.add('on');
  actualizarProgreso();
}

function actualizarProgreso(): void {
  const pct   = Math.round((completados.size / STEPS.length) * 100);
  const fill  = document.querySelector<HTMLElement>('.progress-fill')!;
  const badge = document.querySelector<HTMLElement>('.progress-badge')!;
  fill.style.width  = `${pct}%`;
  badge.textContent = `${pct}%`;
}

// ── PERFIL ──────────────────────────────────────────────────

async function cargarPerfil(): Promise<void> {
  // Nombre completo fijo desde localStorage
  const nombre = localStorage.getItem('nombre') ?? '';
  setVal('perfil-nombre', nombre);

  const res  = await fetch(`${API}/perfil`, { headers: headers() });
  const data = await res.json();
  setVal('perfil-cargo',       data.cargo_actual ?? '');
  setVal('perfil-descripcion', data.descripcion  ?? '');
  setVal('perfil-habilidad1',  data.habilidad_1  ?? '');
  setVal('perfil-habilidad2',  data.habilidad_2  ?? '');
  setVal('perfil-habilidad3',  data.habilidad_3  ?? '');
  if (data.cargo_actual) marcarStep('step-perfil');
}

async function guardarPerfil(): Promise<void> {
  await fetch(`${API}/perfil`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      cargo_actual: val('perfil-cargo'),
      descripcion:  val('perfil-descripcion'),
      habilidad_1:  val('perfil-habilidad1'),
      habilidad_2:  val('perfil-habilidad2'),
      habilidad_3:  val('perfil-habilidad3'),
    }),
  });
  marcarStep('step-perfil');
}

// ── DATOS PERSONALES ────────────────────────────────────────

async function cargarDatosPersonales(): Promise<void> {
  // Campos fijos desde localStorage
  const nombre   = localStorage.getItem('nombre') ?? '';
  const partes   = nombre.split(' ');
  const nombres  = partes.slice(0, Math.ceil(partes.length / 2)).join(' ');
  const apellidos = partes.slice(Math.ceil(partes.length / 2)).join(' ');
  setVal('dp-nombres',   nombres);
  setVal('dp-apellidos', apellidos);

  // Tipo y número de documento también fijos — los traemos del backend
  const res  = await fetch(`${API}/datos-personales`, { headers: headers() });
  const data = await res.json();
  setVal('dp-sexo',             data.sexo             ?? '');
  setVal('dp-rh',               data.rh               ?? '');
  setVal('dp-lugar-nacimiento', data.lugar_nacimiento ?? '');
  setVal('dp-fecha-nacimiento', data.fecha_nacimiento ?? '');
  setVal('dp-nacionalidad',     data.nacionalidad     ?? '');
  setVal('dp-fecha-expedicion', data.fecha_expedicion ?? '');
  setVal('dp-lugar-expedicion', data.lugar_expedicion ?? '');

  // Tipo y número de documento fijos desde usuarios — por ahora desde localStorage
  const tipoDoc = localStorage.getItem('tipo_documento') ?? '';
  const numDoc  = localStorage.getItem('numero_documento') ?? '';
  setVal('dp-tipo-documento',   tipoDoc);
  setVal('dp-numero-documento', numDoc);

  if (data.sexo) marcarStep('step-personal');
}

async function guardarDatosPersonales(): Promise<void> {
  await fetch(`${API}/datos-personales`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      sexo:             val('dp-sexo'),
      rh:               val('dp-rh'),
      lugar_nacimiento: val('dp-lugar-nacimiento'),
      fecha_nacimiento: val('dp-fecha-nacimiento'),
      nacionalidad:     val('dp-nacionalidad'),
      fecha_expedicion: val('dp-fecha-expedicion'),
      lugar_expedicion: val('dp-lugar-expedicion'),
    }),
  });
  marcarStep('step-personal');
}

// ── CONTACTO ────────────────────────────────────────────────

async function cargarContacto(): Promise<void> {
  const res  = await fetch(`${API}/contacto`, { headers: headers() });
  const data = await res.json();
  setVal('ct-direccion',    data.direccion    ?? '');
  setVal('ct-departamento', data.departamento ?? '');
  setVal('ct-ciudad',       data.ciudad       ?? '');
  setVal('ct-casa-propia',  data.casa_propia  ?? '');
  setVal('ct-celular',      data.celular      ?? '');
  setVal('ct-celular2',     data.celular_2    ?? '');
}

async function guardarContacto(): Promise<void> {
  await fetch(`${API}/contacto`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      direccion:    val('ct-direccion'),
      departamento: val('ct-departamento'),
      ciudad:       val('ct-ciudad'),
      casa_propia:  val('ct-casa-propia'),
      celular:      val('ct-celular'),
      celular_2:    val('ct-celular2'),
    }),
  });
}

// ── FAMILIARES ──────────────────────────────────────────────

let familiares: any[] = [];

async function cargarFamiliares(): Promise<void> {
  const res = await fetch(`${API}/familiares`, { headers: headers() });
  familiares = await res.json();
  renderFamiliares();
}

function renderFamiliares(): void {
  const tbody = document.getElementById('familiares-tbody')!;
  const empty = document.getElementById('familiares-empty')!;
  tbody.innerHTML = '';
  if (familiares.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  familiares.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.nombre}</td>
      <td>${f.parentesco}</td>
      <td>${f.contacto ?? ''}</td>
      <td><button onclick="eliminarFamiliar(${f.id})"><i class="fa-solid fa-trash"></i></button></td>`;
    tbody.appendChild(tr);
  });
}

function abrirModalFamiliar(): void {
  document.getElementById('modalFamiliar')!.classList.add('active');
}

function cerrarModalFamiliar(): void {
  document.getElementById('modalFamiliar')!.classList.remove('active');
}

async function guardarFamiliar(): Promise<void> {
  const nombre     = (document.getElementById('fam-nombre')     as HTMLInputElement).value.trim();
  const parentesco = (document.getElementById('fam-parentesco') as HTMLSelectElement).value;
  const contacto   = (document.getElementById('fam-contacto')   as HTMLInputElement).value.trim();
  if (!nombre || !parentesco) return;
  await fetch(`${API}/familiares`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ nombre, parentesco, contacto }),
  });
  cerrarModalFamiliar();
  await cargarFamiliares();
}

async function eliminarFamiliar(id: number): Promise<void> {
  await fetch(`${API}/familiares/${id}`, { method: 'DELETE', headers: headers() });
  await cargarFamiliares();
}

// ── FORMACIÓN ───────────────────────────────────────────────

let formaciones: any[] = [];

async function cargarFormacion(): Promise<void> {
  const res = await fetch(`${API}/formacion`, { headers: headers() });
  formaciones = await res.json();
  renderFormacion();
  if (formaciones.length > 0) marcarStep('step-formacion');
}

function renderFormacion(): void {
  const lista = document.getElementById('lista-formacion')!;
  if (formaciones.length === 0) { lista.innerHTML = ''; return; }
  lista.innerHTML = `
    <div class="registro-lista">
      ${formaciones.map(f => `
        <div class="registro-item">
          <div class="registro-info">
            <span class="registro-titulo">${f.institucion}</span>
            <span class="registro-sub">${f.titulo} · ${f.nivel}</span>
          </div>
          <button class="btn-eliminar-registro" onclick="eliminarFormacion(${f.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`).join('')}
    </div>`;
}

async function guardarFormacion(): Promise<void> {
  await fetch(`${API}/formacion`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      institucion:  val('form-institucion'),
      titulo:       val('form-titulo'),
      nivel:        val('form-nivel'),
      graduado:     val('form-graduado') === 'si',
      fecha_inicio: val('form-fecha-inicio'),
      fecha_fin:    val('form-fecha-fin'),
    }),
  });
  // Limpiar formulario
  ['form-institucion','form-titulo','form-nivel','form-graduado','form-fecha-inicio','form-fecha-fin']
    .forEach(id => setVal(id, ''));
  await cargarFormacion();
  marcarStep('step-formacion');
}

async function eliminarFormacion(id: number): Promise<void> {
  await fetch(`${API}/formacion/${id}`, { method: 'DELETE', headers: headers() });
  await cargarFormacion();
  if (formaciones.length === 0) completados.delete('step-formacion');
  actualizarProgreso();
}

// ── EXPERIENCIA ─────────────────────────────────────────────

let experiencias: any[] = [];

async function cargarExperiencia(): Promise<void> {
  const res = await fetch(`${API}/experiencia`, { headers: headers() });
  experiencias = await res.json();
  renderExperiencia();
  if (experiencias.length > 0) marcarStep('step-experiencia');
}

function renderExperiencia(): void {
  const lista = document.getElementById('lista-experiencia')!;
  if (experiencias.length === 0) { lista.innerHTML = ''; return; }
  lista.innerHTML = `
    <div class="registro-lista">
      ${experiencias.map(e => `
        <div class="registro-item">
          <div class="registro-info">
            <span class="registro-titulo">${e.empresa}</span>
            <span class="registro-sub">${e.cargo} · ${e.trabajo_actual ? 'Actual' : (e.fecha_fin ?? '')}</span>
          </div>
          <button class="btn-eliminar-registro" onclick="eliminarExperiencia(${e.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`).join('')}
    </div>`;
}

async function guardarExperiencia(): Promise<void> {
  await fetch(`${API}/experiencia`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      empresa:        val('exp-empresa'),
      cargo:          val('exp-cargo'),
      fecha_inicio:   val('exp-fecha-inicio'),
      fecha_fin:      val('exp-fecha-fin'),
      trabajo_actual: val('exp-trabajo-actual') === 'si',
      descripcion:    val('exp-descripcion'),
    }),
  });
  ['exp-empresa','exp-cargo','exp-fecha-inicio','exp-fecha-fin','exp-trabajo-actual','exp-descripcion']
    .forEach(id => setVal(id, ''));
  await cargarExperiencia();
  marcarStep('step-experiencia');
}

async function eliminarExperiencia(id: number): Promise<void> {
  await fetch(`${API}/experiencia/${id}`, { method: 'DELETE', headers: headers() });
  await cargarExperiencia();
  if (experiencias.length === 0) completados.delete('step-experiencia');
  actualizarProgreso();
}

// ── AFILIACIONES ────────────────────────────────────────────

async function cargarAfiliaciones(): Promise<void> {
  const res  = await fetch(`${API}/afiliaciones`, { headers: headers() });
  const data = await res.json();
  setVal('af-eps',     data.eps               ?? '');
  setVal('af-pension', data.fondo_pension      ?? '');
  setVal('af-arl',     data.arl               ?? '');
  setVal('af-caja',    data.caja_compensacion  ?? '');
  if (data.eps) marcarStep('step-afiliaciones');
}

async function guardarAfiliaciones(): Promise<void> {
  await fetch(`${API}/afiliaciones`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      eps:               val('af-eps'),
      fondo_pension:     val('af-pension'),
      arl:               val('af-arl'),
      caja_compensacion: val('af-caja'),
    }),
  });
  marcarStep('step-afiliaciones');
}

// ── BIND BOTONES ────────────────────────────────────────────

function bindBotones(): void {
  document.getElementById('btn-guardar-perfil')      ?.addEventListener('click', guardarPerfil);
  document.getElementById('btn-guardar-personal')    ?.addEventListener('click', guardarDatosPersonales);
  document.getElementById('btn-guardar-contacto')    ?.addEventListener('click', guardarContacto);
  document.getElementById('btn-guardar-formacion')   ?.addEventListener('click', guardarFormacion);
  document.getElementById('btn-guardar-experiencia') ?.addEventListener('click', guardarExperiencia);
  document.getElementById('btn-guardar-afiliaciones')?.addEventListener('click', guardarAfiliaciones);
}

// ── INIT ────────────────────────────────────────────────────

export async function initHojaDeVida(): Promise<void> {
  cargarPanel();
  bindBotones();

  await Promise.all([
    cargarPerfil(),
    cargarDatosPersonales(),
    cargarContacto(),
    cargarFamiliares(),
    cargarFormacion(),
    cargarExperiencia(),
    cargarAfiliaciones(),
  ]);

  (window as any).toggleSec           = toggleSec;
  (window as any).switchTab           = switchTab;
  (window as any).abrirModalFamiliar  = abrirModalFamiliar;
  (window as any).cerrarModalFamiliar = cerrarModalFamiliar;
  (window as any).guardarFamiliar     = guardarFamiliar;
  (window as any).eliminarFamiliar    = eliminarFamiliar;
  (window as any).eliminarFormacion   = eliminarFormacion;
  (window as any).eliminarExperiencia = eliminarExperiencia;
}