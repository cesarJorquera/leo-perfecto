<template>
  <div class="leo-dash mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
    <header class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-sm font-extrabold uppercase tracking-[0.14em] text-leo-azul-osc">Espacio docente</p>
        <h1 class="mt-1 text-3xl font-black text-leo-tinta">Leo Dash</h1>
        <p class="mt-1 text-leo-texto">Una mirada clara al avance de lectura de tu curso.</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-extrabold text-amber-950">
          Prototipo · datos de ejemplo
        </span>
        <button
          type="button"
          class="leo-dash__button-secondary rounded-xl px-4 py-2.5 font-bold"
          @click="$emit('volver')"
        >
          ← Volver
        </button>
      </div>
    </header>

    <nav class="mb-5 flex gap-2 overflow-x-auto border-b border-leo-linea" aria-label="Secciones de Leo Dash">
      <button
        type="button"
        class="leo-dash__tab whitespace-nowrap px-4 py-3 text-sm font-extrabold"
        :class="vistaActiva === 'rendimiento' ? 'leo-dash__tab--activa' : ''"
        :aria-current="vistaActiva === 'rendimiento' ? 'page' : null"
        @click="vistaActiva = 'rendimiento'"
      >Rendimiento lector</button>
      <button
        type="button"
        class="leo-dash__tab whitespace-nowrap px-4 py-3 text-sm font-bold"
        :class="vistaActiva === 'aula' ? 'leo-dash__tab--activa' : ''"
        :aria-current="vistaActiva === 'aula' ? 'page' : null"
        @click="vistaActiva = 'aula'"
      >Leo Ideas · Aula</button>
    </nav>

    <section v-if="vistaActiva === 'rendimiento'" aria-labelledby="rendimiento-titulo">
      <div class="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="rendimiento-titulo" class="text-xl font-black text-leo-tinta">Avance de lectura</h2>
          <p class="mt-1 text-sm text-leo-texto">Actividad, precisión y habilidades trabajadas.</p>
        </div>
        <div class="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-3">
          <label class="text-xs font-bold text-leo-texto">
            Periodo
            <select v-model.number="periodo" class="leo-dash__select mt-1 block w-full">
              <option :value="7">Últimos 7 días</option>
              <option :value="30">Últimos 30 días</option>
            </select>
          </label>
          <label class="text-xs font-bold text-leo-texto">
            Unidad
            <select v-model="unidadFiltro" class="leo-dash__select mt-1 block w-full">
              <option value="todas">Todas</option>
              <option value="1">Unidad 1</option>
              <option value="2">Unidad 2</option>
            </select>
          </label>
          <label class="col-span-2 text-xs font-bold text-leo-texto sm:col-span-1">
            Estudiante
            <select v-model="estudianteFiltro" class="leo-dash__select mt-1 block w-full">
              <option value="todos">Todo el curso</option>
              <option v-for="nombre in estudiantes" :key="nombre" :value="nombre">{{ nombre }}</option>
            </select>
          </label>
        </div>
      </div>

      <p class="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-relaxed text-amber-950">
        Esta vista usa información ficticia para mostrar una propuesta. Aún no está conectada a Supabase ni muestra datos reales de estudiantes.
      </p>

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article class="leo-dash__metric rounded-2xl border border-leo-linea bg-white p-4 shadow-sm">
          <p class="text-sm font-bold text-leo-texto">Estudiantes activos</p>
          <p class="mt-2 text-3xl font-black text-leo-tinta">{{ estudiantesActivos }}</p>
          <p class="mt-1 text-xs text-leo-suave">con actividad en el periodo</p>
        </article>
        <article class="leo-dash__metric rounded-2xl border border-leo-linea bg-white p-4 shadow-sm">
          <p class="text-sm font-bold text-leo-texto">Actividades realizadas</p>
          <p class="mt-2 text-3xl font-black text-leo-tinta">{{ actividades.length }}</p>
          <p class="mt-1 text-xs text-leo-suave">sesiones iniciadas</p>
        </article>
        <article class="leo-dash__metric rounded-2xl border border-leo-linea bg-white p-4 shadow-sm">
          <p class="text-sm font-bold text-leo-texto">Precisión promedio</p>
          <p class="mt-2 text-3xl font-black text-leo-azul-osc">{{ precisionPromedio }}%</p>
          <p class="mt-1 text-xs text-leo-suave">respuestas correctas / respondidas</p>
        </article>
        <article class="leo-dash__metric rounded-2xl border border-leo-linea bg-white p-4 shadow-sm">
          <p class="text-sm font-bold text-leo-texto">Sesiones completadas</p>
          <p class="mt-2 text-3xl font-black text-emerald-800">{{ porcentajeCompletadas }}%</p>
          <p class="mt-1 text-xs text-leo-suave">{{ completadas }} de {{ actividades.length }} sesiones</p>
        </article>
      </div>

      <div class="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="rounded-3xl border border-leo-linea bg-white p-5 shadow-sm sm:p-6" aria-labelledby="habilidades-titulo">
          <div class="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 id="habilidades-titulo" class="text-lg font-black text-leo-tinta">Habilidades lectoras</h3>
              <p class="mt-1 text-sm text-leo-texto">Precisión por habilidad en las respuestas del periodo.</p>
            </div>
            <span class="rounded-full bg-leo-cielo px-3 py-1 text-xs font-extrabold text-leo-azul-osc">{{ nombreUnidadFiltro }}</span>
          </div>
          <div v-if="habilidades.length" class="space-y-4">
            <div v-for="habilidad in habilidades" :key="habilidad.nombre">
              <div class="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span class="font-bold text-leo-tinta">{{ habilidad.nombre }}</span>
                <span class="font-extrabold text-leo-azul-osc">{{ habilidad.precision }}%</span>
              </div>
              <div class="h-2.5 overflow-hidden rounded-full bg-blue-50" role="progressbar" :aria-valuenow="habilidad.precision" aria-valuemin="0" aria-valuemax="100" :aria-label="habilidad.nombre + ': ' + habilidad.precision + '%'">
                <div class="h-full rounded-full bg-gradient-to-r from-blue-800 to-sky-400 transition-all" :style="{ width: habilidad.precision + '%' }"></div>
              </div>
              <p class="mt-1 text-xs text-leo-suave">{{ habilidad.respuestas }} respuestas registradas</p>
            </div>
          </div>
          <p v-else class="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">No hay respuestas para los filtros seleccionados.</p>
        </section>

        <section class="rounded-3xl border border-leo-linea bg-white p-5 shadow-sm sm:p-6" aria-labelledby="actividad-titulo">
          <div class="mb-4">
            <h3 id="actividad-titulo" class="text-lg font-black text-leo-tinta">Actividad reciente</h3>
            <p class="mt-1 text-sm text-leo-texto">Un resumen de las últimas sesiones.</p>
          </div>
          <ul v-if="actividades.length" class="divide-y divide-leo-linea">
            <li v-for="actividad in actividadesRecientes" :key="actividad.id" class="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-black" :class="actividad.unidad === 2 ? 'bg-sky-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'">
                U{{ actividad.unidad }}
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-extrabold text-leo-tinta">{{ actividad.estudiante }}</span>
                <span class="block truncate text-xs text-leo-suave">{{ actividad.habilidad }}</span>
              </span>
              <span class="text-right">
                <span class="block text-sm font-black" :class="actividad.estado === 'Completada' ? 'text-emerald-800' : 'text-amber-800'">{{ actividad.precision }}%</span>
                <span class="block text-xs text-leo-suave">{{ actividad.fecha }}</span>
              </span>
            </li>
          </ul>
          <p v-else class="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">No hay actividad para los filtros seleccionados.</p>
        </section>
      </div>

      <section class="mt-4 rounded-3xl border border-leo-linea bg-white p-5 shadow-sm sm:p-6" aria-labelledby="lectura-datos-titulo">
        <h3 id="lectura-datos-titulo" class="text-lg font-black text-leo-tinta">¿Qué permitirían medir los datos actuales?</h3>
        <div class="mt-3 grid gap-3 text-sm leading-relaxed text-leo-texto sm:grid-cols-3">
          <p class="rounded-2xl bg-blue-50 p-4"><strong class="text-leo-tinta">Uso:</strong> sesiones por juego, frecuencia, actividad por día y finalización.</p>
          <p class="rounded-2xl bg-emerald-50 p-4"><strong class="text-leo-tinta">Aprendizaje:</strong> precisión y errores por habilidad/código evaluativo, con reintentos cuando existan.</p>
          <p class="rounded-2xl bg-amber-50 p-4"><strong class="text-leo-tinta">Pendiente para el curso:</strong> permisos docentes, cursos y vínculo estudiante-curso antes de mostrar resultados individuales.</p>
        </div>
      </section>
    </section>

    <section v-else class="space-y-4" aria-labelledby="aula-titulo">
      <article class="flex flex-col justify-between gap-4 rounded-3xl border border-leo-linea bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div class="flex items-start gap-4">
          <span class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl text-amber-900" aria-hidden="true">✦</span>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h2 id="aula-titulo" class="text-xl font-black text-leo-tinta">Leo Ideas</h2>
              <span class="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-950">Control de aula</span>
            </div>
            <p class="mt-1 max-w-2xl text-sm leading-relaxed text-leo-texto">
              Controla una sesión en vivo desde tu celular: abre el lobby, lanza la pregunta y muestra las respuestas.
            </p>
          </div>
        </div>
        <button
          type="button"
          class="leo-dash__button-primary rounded-xl px-6 py-3 font-extrabold"
          data-test="btn-control-leo-ideas"
          @click="$emit('abrir-control-leo-ideas')"
        >Abrir control</button>
      </article>
      <p class="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        Abre Leo Aula en la pantalla conectada al proyector y usa este control para manejar las etapas de la actividad.
      </p>
    </section>
  </div>
</template>

<script>
const ACTIVIDADES_DEMO = [
  { id: 1, estudiante: 'Camila R.', unidad: 2, habilidad: 'Hacer inferencias', precision: 100, correctas: 4, total: 4, estado: 'Completada', diasAtras: 0, fecha: 'Hoy' },
  { id: 2, estudiante: 'Diego M.', unidad: 2, habilidad: 'Conectar causas y efectos', precision: 75, correctas: 3, total: 4, estado: 'Completada', diasAtras: 0, fecha: 'Hoy' },
  { id: 3, estudiante: 'Martina S.', unidad: 1, habilidad: 'Verbos', precision: 80, correctas: 4, total: 5, estado: 'Completada', diasAtras: 1, fecha: 'Ayer' },
  { id: 4, estudiante: 'Camila R.', unidad: 2, habilidad: 'Idea principal', precision: 67, correctas: 2, total: 3, estado: 'Completada', diasAtras: 2, fecha: 'Hace 2 días' },
  { id: 5, estudiante: 'Benjamín P.', unidad: 2, habilidad: 'Comparar fuentes', precision: 50, correctas: 2, total: 4, estado: 'Abandonada', diasAtras: 3, fecha: 'Hace 3 días' },
  { id: 6, estudiante: 'Diego M.', unidad: 1, habilidad: 'Sustantivos', precision: 100, correctas: 5, total: 5, estado: 'Completada', diasAtras: 5, fecha: 'Hace 5 días' },
  { id: 7, estudiante: 'Antonia L.', unidad: 2, habilidad: 'Causa y efecto', precision: 75, correctas: 3, total: 4, estado: 'Completada', diasAtras: 8, fecha: 'Hace 8 días' },
  { id: 8, estudiante: 'Martina S.', unidad: 2, habilidad: 'Reconocer el tono', precision: 50, correctas: 2, total: 4, estado: 'Abandonada', diasAtras: 12, fecha: 'Hace 12 días' },
  { id: 9, estudiante: 'Antonia L.', unidad: 1, habilidad: 'Adjetivos', precision: 80, correctas: 4, total: 5, estado: 'Completada', diasAtras: 18, fecha: 'Hace 18 días' }
]

export default {
  name: 'LeoDash',
  emits: ['abrir-control-leo-ideas', 'volver'],
  data() {
    return {
      vistaActiva: 'rendimiento',
      periodo: 7,
      unidadFiltro: 'todas',
      estudianteFiltro: 'todos',
      actividadesDemo: ACTIVIDADES_DEMO
    }
  },
  computed: {
    estudiantes() {
      return [...new Set(this.actividadesDemo.map(item => item.estudiante))].sort()
    },
    actividades() {
      return this.actividadesDemo.filter(item =>
        item.diasAtras < this.periodo &&
        (this.unidadFiltro === 'todas' || String(item.unidad) === this.unidadFiltro) &&
        (this.estudianteFiltro === 'todos' || item.estudiante === this.estudianteFiltro)
      )
    },
    actividadesRecientes() {
      return this.actividades.slice(0, 5)
    },
    estudiantesActivos() {
      return new Set(this.actividades.map(item => item.estudiante)).size
    },
    respuestasTotales() {
      return this.actividades.reduce((total, item) => total + item.total, 0)
    },
    precisionPromedio() {
      if (!this.respuestasTotales) return 0
      const correctas = this.actividades.reduce((total, item) => total + item.correctas, 0)
      return Math.round((correctas / this.respuestasTotales) * 100)
    },
    completadas() {
      return this.actividades.filter(item => item.estado === 'Completada').length
    },
    porcentajeCompletadas() {
      return this.actividades.length ? Math.round((this.completadas / this.actividades.length) * 100) : 0
    },
    nombreUnidadFiltro() {
      return this.unidadFiltro === 'todas' ? 'Todas las unidades' : 'Unidad ' + this.unidadFiltro
    },
    habilidades() {
      const agrupadas = new Map()
      this.actividades.forEach(item => {
        const previa = agrupadas.get(item.habilidad) || { nombre: item.habilidad, correctas: 0, respuestas: 0 }
        previa.correctas += item.correctas
        previa.respuestas += item.total
        agrupadas.set(item.habilidad, previa)
      })
      return [...agrupadas.values()]
        .map(item => ({ ...item, precision: Math.round((item.correctas / item.respuestas) * 100) }))
        .sort((a, b) => b.respuestas - a.respuestas)
        .slice(0, 6)
    }
  }
}
</script>

<style scoped>
.leo-dash {
  color: #3a4960;
  font-family: 'Atkinson Hyperlegible', system-ui, sans-serif;
}

.leo-dash h1,
.leo-dash h2,
.leo-dash h3,
.leo-dash button {
  font-family: 'Lexend', system-ui, sans-serif;
}

.leo-dash__button-primary,
.leo-dash__button-secondary {
  min-height: 3rem;
  transition: transform 120ms ease, filter 150ms ease, background-color 150ms ease;
}

.leo-dash__button-primary {
  border: 0;
  border-bottom: 4px solid #1b4f9e;
  background: #2568c4;
  color: #fff;
}

.leo-dash__button-primary:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.leo-dash__button-secondary {
  border: 2px solid #2568c4;
  border-bottom-width: 4px;
  background: #fff;
  color: #1b4f9e;
}

.leo-dash__button-secondary:hover {
  background: #f3f8fd;
}

.leo-dash__button-primary:active,
.leo-dash__button-secondary:active {
  border-bottom-width: 1px;
  transform: translateY(3px);
}

.leo-dash__button-primary:focus-visible,
.leo-dash__button-secondary:focus-visible,
.leo-dash__tab:focus-visible,
.leo-dash__select:focus-visible {
  outline: 3px solid #14233b;
  outline-offset: 3px;
}

.leo-dash__tab {
  border-bottom: 3px solid transparent;
  color: #52627a;
}

.leo-dash__tab:hover {
  color: #1b4f9e;
}

.leo-dash__tab--activa {
  border-bottom-color: #2568c4;
  color: #1b4f9e;
}

.leo-dash__select {
  min-height: 2.75rem;
  border: 1px solid #bfd0e2;
  border-radius: 0.75rem;
  background: #fff;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  color: #14233b;
  font-size: 0.875rem;
}

.leo-dash__metric {
  box-shadow: 0 4px 14px rgba(27, 79, 158, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .leo-dash__button-primary,
  .leo-dash__button-secondary {
    transition: none;
  }
}

html[data-animaciones="off"] .leo-dash__button-primary,
html[data-animaciones="off"] .leo-dash__button-secondary {
  transition: none;
}
</style>
