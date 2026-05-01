import './tareas.css';

interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  proyecto: string;
  actividad: string;
  fechaInicio: string;
  fechaFin: string;
  horasPlaneadas: number;
  horasEjecutadas: number;
  avance: number;
}

let tareas: Tarea[] = [
  {
    id: 1,
    nombre: 'Hacer la maquetación',
    descripcion: 'Crear los componentes y hacer el código HTML y SCSS de acuerdo a los mockups aprobados.',
    proyecto: 'Soluciones',
    actividad: 'Desarrollo Frontend',
    fechaInicio: '09/04/2026',
    fechaFin: '20/04/2026',
    horasPlaneadas: 45,
    horasEjecutadas: 0,
    avance: 0,
  },
  {
    id: 2,
    nombre: 'Implementar la lógica',
    descripcion: 'Crear el código funcional en javascript, incluyendo las interacciones, validaciones y las integraciones con el backend.',
    proyecto: 'Soluciones',
    actividad: 'Desarrollo Frontend',
    fechaInicio: '21/04/2026',
    fechaFin: '30/04/2026',
    horasPlaneadas: 45,
    horasEjecutadas: 0,
    avance: 0,
  },
];

let tareaActivaId: number | null = null;

function renderLista(lista: Tarea[]): void {
  const empty   = document.getElementById('tareas-empty')!;
  const layout  = document.getElementById('tareas-layout')!;
  const listaCont = document.getElementById('tareas-lista')!;

  if (lista.length === 0) {
    empty.style.display  = 'flex';
    layout.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  layout.style.display = 'flex';
  listaCont.innerHTML  = '';

  lista.forEach(t => {
    const div = document.createElement('div');
    div.className = `tarea-item${t.id === tareaActivaId ? ' active' : ''}`;
    div.dataset.id = String(t.id);
    div.innerHTML = `
      <div class="tarea-item-header">
        <span class="tarea-nombre">${t.nombre}</span>
      </div>
      <div class="tarea-meta">Proyecto: <strong>${t.proyecto}</strong> &nbsp;|&nbsp; Actividad: <strong>${t.actividad}</strong></div>
      <div class="tarea-desc">${t.descripcion}</div>
    `;
    div.addEventListener('click', () => seleccionarTarea(t.id));
    listaCont.appendChild(div);
  });

  if (tareaActivaId !== null) {
    const activa = lista.find(t => t.id === tareaActivaId);
    if (activa) renderDetalle(activa);
  } else if (lista.length > 0) {
    seleccionarTarea(lista[0].id);
  }
}

function seleccionarTarea(id: number): void {
  tareaActivaId = id;
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;

  document.querySelectorAll('.tarea-item').forEach(el => {
    el.classList.toggle('active', (el as HTMLElement).dataset.id === String(id));
  });

  renderDetalle(tarea);
}

function renderDetalle(t: Tarea): void {
  const horasPend = t.horasPlaneadas - t.horasEjecutadas;
  const avancePct = t.horasPlaneadas > 0
    ? Math.round((t.horasEjecutadas / t.horasPlaneadas) * 100)
    : 0;

  (document.getElementById('detalle-fecha-inicio') as HTMLElement).textContent = t.fechaInicio;
  (document.getElementById('detalle-fecha-fin')    as HTMLElement).textContent = t.fechaFin;
  (document.getElementById('detalle-horas-plan')   as HTMLElement).textContent = String(t.horasPlaneadas);
  (document.getElementById('detalle-horas-exec')   as HTMLElement).textContent = String(t.horasEjecutadas);
  (document.getElementById('detalle-horas-pend')   as HTMLElement).textContent = String(horasPend);
  (document.getElementById('detalle-avance-fill')  as HTMLElement).style.width = `${avancePct}%`;
}

function filtrar(): void {
  const busqueda  = (document.getElementById('buscar-tarea')      as HTMLInputElement).value.toLowerCase();
  const proyecto  = (document.getElementById('filtro-proyecto')   as HTMLSelectElement).value;
  const actividad = (document.getElementById('filtro-actividad')  as HTMLSelectElement).value;

  const lista = tareas.filter(t => {
    const coincideB = t.nombre.toLowerCase().includes(busqueda) || t.descripcion.toLowerCase().includes(busqueda);
    const coincideP = !proyecto  || t.proyecto  === proyecto;
    const coincideA = !actividad || t.actividad === actividad;
    return coincideB && coincideP && coincideA;
  });

  renderLista(lista);
}

function abrirModal(): void {
  document.getElementById('modal-crear-tarea')!.classList.add('active');
}

function cerrarModal(): void {
  document.getElementById('modal-crear-tarea')!.classList.remove('active');
}

function guardarTarea(): void {
  const nombre    = (document.getElementById('nueva-nombre')    as HTMLInputElement).value.trim();
  const desc      = (document.getElementById('nueva-desc')      as HTMLTextAreaElement).value.trim();
  const proyecto  = (document.getElementById('nueva-proyecto')  as HTMLSelectElement).value;
  const actividad = (document.getElementById('nueva-actividad') as HTMLSelectElement).value;
  const inicio    = (document.getElementById('nueva-inicio')    as HTMLInputElement).value;
  const fin       = (document.getElementById('nueva-fin')       as HTMLInputElement).value;
  const horas     = parseInt((document.getElementById('nueva-horas') as HTMLInputElement).value) || 0;

  if (!nombre) return;

  const nueva: Tarea = {
    id: Date.now(),
    nombre,
    descripcion: desc,
    proyecto,
    actividad,
    fechaInicio: inicio,
    fechaFin: fin,
    horasPlaneadas: horas,
    horasEjecutadas: 0,
    avance: 0,
  };

  tareas.push(nueva);
  tareaActivaId = nueva.id;
  cerrarModal();
  filtrar();
}

function registrarHoras(): void {
  if (tareaActivaId === null) return;
  const horas = parseInt((document.getElementById('reg-horas') as HTMLInputElement).value) || 0;
  const tarea = tareas.find(t => t.id === tareaActivaId);
  if (!tarea) return;
  tarea.horasEjecutadas += horas;
  (document.getElementById('reg-horas') as HTMLInputElement).value = '';
  renderDetalle(tarea);
}

function finalizarTarea(): void {
  if (tareaActivaId === null) return;
  if (!confirm('¿Confirmas que esta tarea está finalizada?')) return;
  tareas = tareas.filter(t => t.id !== tareaActivaId);
  tareaActivaId = null;
  filtrar();
}

export function initTareas(): void {
  renderLista(tareas);

  document.getElementById('buscar-tarea')     ?.addEventListener('input',  filtrar);
  document.getElementById('filtro-proyecto')  ?.addEventListener('change', filtrar);
  document.getElementById('filtro-actividad') ?.addEventListener('change', filtrar);

  document.getElementById('btn-crear-empty')  ?.addEventListener('click', abrirModal);
  document.getElementById('btn-crear-lista')  ?.addEventListener('click', abrirModal);
  document.getElementById('close-crear-tarea')?.addEventListener('click', cerrarModal);
  document.getElementById('cancel-crear-tarea')?.addEventListener('click', cerrarModal);
  document.getElementById('guardar-tarea')    ?.addEventListener('click', guardarTarea);
  document.getElementById('btn-registrar')    ?.addEventListener('click', registrarHoras);
  document.getElementById('btn-finalizar')    ?.addEventListener('click', finalizarTarea);

  document.getElementById('modal-crear-tarea')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-crear-tarea')) cerrarModal();
  });
}