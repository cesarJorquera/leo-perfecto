<template>
  <div class="text-left">
    <TareaRunner
      v-if="tareaActual"
      :key="tareaActual.id"
      :tarea="tareaActual"
      :game-id="gameId"
      @terminar="alTerminar"
      @salir="tareaActual = null"
    />

    <template v-else>
      <p
        v-if="ultimoResultado"
        class="max-w-xl mx-auto mx-4 mt-4 p-3 rounded-xl bg-green-100 text-green-800"
      >
        ¡Bien! Respondiste {{ ultimoResultado.aciertos }} de {{ ultimoResultado.total }} preguntas.
      </p>

      <RutaUnidad
        :unidad="unidad"
        :nodos="nodosConEstado"
        @abrir="abrirTarea"
      />

      <div class="max-w-xl mx-auto px-4 pb-8">
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
import { estadoDeNodos } from './progresoRuta'
import unidad1 from '../../data/ruta/unidad1'

// Fila de la ruta en la tabla games (migración 004, coordinar con César).
// Mientras sea null, la ruta funciona pero NO guarda en Supabase.
const RUTA_GAME_ID = null

export default {
  name: 'RutaAprendizaje',
  components: { TareaRunner, RutaUnidad },
  emits: ['salir'],
  data() {
    return {
      unidad: unidad1,
      tareaActual: null,
      gameId: RUTA_GAME_ID,
      ultimoResultado: null,
      // ids de las tareas completadas.
      // Por ahora en memoria; en el bloque 5 se cargará desde Supabase.
      completadas: []
    }
  },
  computed: {
    nodosConEstado() {
      return estadoDeNodos(this.unidad.nodos, this.completadas)
    }
  },
  methods: {
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
    }
  }
}
</script>