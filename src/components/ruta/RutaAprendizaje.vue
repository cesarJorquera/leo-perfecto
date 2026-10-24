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

    <section v-else class="max-w-xl mx-auto p-4 space-y-6">
      <h1 class="text-3xl font-extrabold text-indigo-900">{{ unidad.titulo }}</h1>
      <p class="text-lg text-gray-700">{{ unidad.descripcion }}</p>

      <p v-if="ultimoResultado" class="p-3 rounded-xl bg-green-100 text-green-800">
        Última tarea: {{ ultimoResultado.aciertos }} de {{ ultimoResultado.total }} correctas.
      </p>

      <button
        type="button"
        class="w-full py-3 rounded-xl bg-indigo-600 text-white text-lg font-bold"
        @click="abrirTarea('u1-verbos')"
      >Empezar: ¿Qué hace? Los verbos</button>

      <button
        type="button"
        class="w-full py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold"
        @click="$emit('salir')"
      >Volver</button>
    </section>
  </div>
</template>

<script>
import TareaRunner from './TareaRunner.vue'
import unidad1 from '../../data/ruta/unidad1'

// Fila de la ruta en la tabla games (migración 004, coordinar con César).
// Mientras sea null, la ruta funciona pero NO guarda en Supabase.
const RUTA_GAME_ID = null

export default {
  name: 'RutaAprendizaje',
  components: { TareaRunner },
  emits: ['salir'],
  data() {
    return {
      unidad: unidad1,
      tareaActual: null,
      gameId: RUTA_GAME_ID,
      ultimoResultado: null
    }
  },
  methods: {
    abrirTarea(tareaId) {
      const tarea = this.unidad.tareas[tareaId]
      if (!tarea) {
        console.error('La tarea no existe en los datos de la unidad:', tareaId)
        return
      }
      this.tareaActual = tarea
    },
    alTerminar(resultado) {
      this.ultimoResultado = resultado
      this.tareaActual = null
    }
  }
}
</script>