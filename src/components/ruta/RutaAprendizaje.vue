<template>
  <div class="text-left">
    <TareaRunner
      v-if="tareaActual"
      :key="tareaActual.id"
      :tarea="tareaActual"
      :game-id="unidad.gameId"
      :modo-demo="modoDemo"
      @terminar="alTerminar"
      @salir="tareaActual = null"
    />

    <template v-else>
      <div class="max-w-xl mx-auto px-4 pt-4">
        <LeoMascota
          :estado="estadoLeo"
          :mensaje="mensajeLeo"
        />
      </div>

      <p
        v-if="errorCarga"
        class="max-w-xl mx-auto mx-4 mt-4 p-3 rounded-xl bg-yellow-100 text-yellow-800 text-sm"
        role="alert"
      >
        No pudimos cargar tu avance guardado. Puedes seguir practicando; revisa tu conexión y vuelve a entrar más tarde.
      </p>

      <RutaUnidad
        v-if="!cargando"
        :unidad="unidad"
        :nodos="nodosConEstado"
        @abrir="abrirTarea"
      />

      <div class="max-w-xl mx-auto px-4 pb-8 space-y-4">
        <!-- Herramientas de demo: solo existen con npm run serve, nunca en producción -->
        <div
          v-if="modoDemo && !cargando"
          class="p-3 rounded-xl border-2 border-dashed border-gray-300 space-y-2"
        >
          <p class="text-xs font-bold uppercase tracking-wide text-gray-500">Modo demo (solo en desarrollo)</p>
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2 rounded-lg bg-gray-800 text-white text-sm font-bold"
              @click="desbloquearTodo"
            >Desbloquear todo</button>
            <button
              type="button"
              class="flex-1 py-2 rounded-lg border-2 border-gray-800 text-gray-800 text-sm font-bold"
              @click="reiniciar"
            >Reiniciar</button>
          </div>
        </div>

        <button
          type="button"
          class="w-full py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold"
          @click="$emit('salir')"
        >Volver</button>
      </div>
    </template>
  </div>
</template>

<script>
import TareaRunner from './TareaRunner.vue'
import RutaUnidad from './RutaUnidad.vue'
import LeoMascota from './LeoMascota.vue'
import { estadoDeNodos } from './progresoRuta'
import { cargarProgresoNube } from '../../utils/supabaseProgress'
import unidad1 from '../../data/ruta/unidad1'

export default {
  name: 'RutaAprendizaje',
  components: { TareaRunner, RutaUnidad, LeoMascota },
  emits: ['salir'],
  data() {
    return {
      unidad: unidad1,
      tareaActual: null,
      ultimoResultado: null,
      completadas: [], // ids de las tareas completadas (se cargan desde Supabase)
      cargando: true,
      errorCarga: false,
      // true solo con `npm run serve`. En el build de producción es false.
      modoDemo: process.env.NODE_ENV === 'development'
    }
  },
  computed: {
    nodosConEstado() {
      return estadoDeNodos(this.unidad.nodos, this.completadas)
    },
    estadoLeo() {
      if (this.cargando) return 'pensando'
      return this.ultimoResultado ? 'feliz' : 'saludando'
    },
    mensajeLeo() {
      if (this.cargando) return 'Buscando dónde quedaste…'
      if (this.ultimoResultado) {
        const { aciertos, total } = this.ultimoResultado
        return '¡Bien hecho! Respondiste ' + aciertos + ' de ' + total + '. Sigue con el próximo paso cuando quieras.'
      }
      if (this.completadas.length) return '¡Qué bueno verte de nuevo! Sigue desde donde quedaste.'
      return '¡Hola! Avanza en tu ruta un paso a la vez.'
    }
  },
  created() {
    this.cargarCompletadas()
  },
  methods: {
    async cargarCompletadas() {
      this.cargando = true
      this.errorCarga = false
      try {
        const sesiones = await cargarProgresoNube()
        const ids = sesiones
          .filter(s => s.gameId === this.unidad.gameId && s.status === 'completed')
          .map(s => s.textId)
        // Sin repetidos: una tarea completada dos veces cuenta una sola vez.
        this.completadas = [...new Set(ids)]
      } catch (error) {
        console.error('No se pudo cargar el progreso de la ruta:', error)
        this.errorCarga = true
      } finally {
        this.cargando = false
      }
    },
    abrirTarea(tareaId) {
      const tarea = this.unidad.tareas[tareaId]
      if (!tarea) {
        console.error('La tarea no existe en los datos de la unidad:', tareaId)
        return
      }
      this.ultimoResultado = null
      this.tareaActual = tarea
    },
    alTerminar(resultado) {
      if (!this.completadas.includes(resultado.tareaId)) {
        this.completadas.push(resultado.tareaId)
      }
      this.ultimoResultado = resultado
      this.tareaActual = null
    },
    desbloquearTodo() {
      this.completadas = this.unidad.nodos
        .filter(nodo => !nodo.pronto)
        .map(nodo => nodo.tareaId)
    },
    reiniciar() {
      this.completadas = []
      this.ultimoResultado = null
    }
  }
}
</script>