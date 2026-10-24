<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="flex items-center gap-3 p-4">
      <button
        type="button"
        class="text-2xl text-gray-500"
        aria-label="Salir de la tarea"
        @click="salir"
      >✕</button>
      <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-indigo-600 transition-all duration-300"
          :style="{ width: progreso + '%' }"
        ></div>
      </div>
    </header>

    <main
      class="flex-1 w-full max-w-xl mx-auto p-4"
      :class="fase === 'feedback' ? 'pointer-events-none opacity-75' : ''"
    >
      <!-- Resumen final -->
      <section v-if="paso.tipo === 'resumen'" class="space-y-6">
        <h2 class="text-2xl font-extrabold text-indigo-900">¡Terminaste la tarea!</h2>
        <p class="text-lg text-gray-800">
          Respondiste bien {{ aciertos }} de {{ evaluables.length }} preguntas.
        </p>
        <ul class="space-y-2">
          <li
            v-for="(punto, i) in paso.ejercicio.puntos"
            :key="i"
            class="p-3 rounded-xl bg-white shadow text-gray-800"
          >{{ punto }}</li>
        </ul>
        <button
          type="button"
          class="w-full py-3 rounded-xl bg-indigo-600 text-white text-lg font-bold"
          @click="terminar"
        >Terminar</button>
      </section>

      <!-- Minijuego del paso actual -->
      <template v-else>
        <p
          v-if="paso.recordemos"
          class="mb-4 inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold"
        >🔁 Recordemos</p>

        <component
          :is="componente"
          v-if="componente"
          :key="claveMinijuego"
          :ejercicio="paso.ejercicio"
          @responder="onResponder"
        />
        <div v-else class="space-y-4 text-gray-800">
          <p>Este tipo de ejercicio todavía no está disponible.</p>
          <button type="button" class="underline" @click="avanzar">Saltar</button>
        </div>
      </template>
    </main>

    <!-- Respuesta inmediata -->
    <footer
      v-if="fase === 'feedback'"
      class="sticky bottom-0 p-4"
      :class="ultimo.correcta ? 'bg-green-100' : 'bg-yellow-100'"
    >
      <div class="max-w-xl mx-auto space-y-3">
        <p
          class="text-2xl font-extrabold"
          :class="ultimo.correcta ? 'text-green-700' : 'text-yellow-800'"
        >{{ ultimo.correcta ? '¡Fenomenal!' : '¡Ya casi!' }}</p>

        <p v-if="mostrarPista" class="text-gray-800">{{ paso.ejercicio.pista }}</p>
        <p v-if="mostrarSolucion" class="text-gray-800">
          La respuesta era: <strong>{{ solucion }}</strong>
        </p>
        <p v-if="ultimo.correcta && ultimo.ortografia" class="text-gray-800">
          Ojo con la tilde: se escribe <strong>{{ solucion }}</strong>.
        </p>

        <template v-if="puedeVerTexto">
          <button type="button" class="underline text-gray-800" @click="verTexto = !verTexto">
            Ver en el texto
          </button>
          <RutaOracion
            v-if="verTexto"
            :palabras="paso.ejercicio.palabras"
            :resaltadas="paso.ejercicio.evidencia"
          />
        </template>

        <div v-if="puedeReintentar" class="flex gap-3">
          <button
            type="button"
            class="flex-1 py-3 rounded-xl border-2 border-yellow-700 text-yellow-800 font-bold"
            @click="avanzar"
          >Saltar</button>
          <button
            type="button"
            class="flex-1 py-3 rounded-xl bg-yellow-600 text-white font-bold"
            @click="reintentar"
          >Reintentar</button>
        </div>
        <button
          v-else
          type="button"
          class="w-full py-3 rounded-xl text-white font-bold"
          :class="ultimo.correcta ? 'bg-green-700' : 'bg-yellow-600'"
          @click="avanzar"
        >Continuar</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { createGameProgressTracker } from '../../utils/supabaseProgress'
import RutaOracion from './RutaOracion.vue'
import MjExplica from './minijuegos/MjExplica.vue'
import MjTocar from './minijuegos/MjTocar.vue'
import MjElegir from './minijuegos/MjElegir.vue'
import MjVf from './minijuegos/MjVf.vue'
import MjEscribir from './minijuegos/MjEscribir.vue'

// Tipo de paso → componente.
// Agregar un minijuego = importarlo, registrarlo en components y sumar una línea aquí.
const MINIJUEGOS = {
  explica: 'MjExplica',
  tocar: 'MjTocar',
  elegir: 'MjElegir',
  vf: 'MjVf',
  escribir: 'MjEscribir'
}

// Pasos que cuentan como pregunta (se guardan y suman al puntaje).
const TIPOS_EVALUABLES = ['tocar', 'elegir', 'vf', 'escribir', 'clasificar']

export default {
  name: 'TareaRunner',
  components: { RutaOracion, MjExplica, MjTocar, MjElegir, MjVf, MjEscribir },
  props: {
    tarea: { type: Object, required: true },
    // id de la ruta en la tabla games. Si es null, se juega sin guardar.
    gameId: { type: [String, Number], default: null }
  },
  emits: ['terminar', 'salir'],
  data() {
    return {
      indice: 0,
      fase: 'jugando', // 'jugando' | 'feedback'
      ultimo: null, // { correcta, respuesta, ortografia? } de la última respuesta
      intentos: 1,
      claveMinijuego: 0, // al cambiarla, Vue recrea el minijuego vacío
      verTexto: false,
      aciertos: 0,
      tracker: null,
      cerrado: false
    }
  },
  computed: {
    paso() {
      return this.tarea.pasos[this.indice]
    },
    componente() {
      return MINIJUEGOS[this.paso.tipo] || null
    },
    evaluables() {
      return this.tarea.pasos.filter(p => TIPOS_EVALUABLES.includes(p.tipo))
    },
    progreso() {
      const ultimo = this.tarea.pasos.length - 1
      return ultimo > 0 ? Math.round((this.indice / ultimo) * 100) : 100
    },
    puedeReintentar() {
      return !this.ultimo.correcta && this.paso.conAyuda
    },
    mostrarPista() {
      return !this.ultimo.correcta && this.paso.conAyuda && this.paso.ejercicio.pista
    },
    mostrarSolucion() {
      return !this.ultimo.correcta && !this.paso.conAyuda
    },
    puedeVerTexto() {
      // Solo cuando ya no hay reintento, para no regalar la respuesta.
      const e = this.paso.ejercicio
      return (this.ultimo.correcta || !this.paso.conAyuda) && e.evidencia && e.palabras
    },
    solucion() {
      const e = this.paso.ejercicio
      if (this.paso.tipo === 'elegir') return e.opciones[e.correcta]
      if (this.paso.tipo === 'tocar') return e.correctas.map(i => e.palabras[i]).join(', ')
      if (this.paso.tipo === 'vf') return e.correcta ? 'Verdadero' : 'Falso'
      if (this.paso.tipo === 'escribir') return e.palabras[e.correcta]
      return ''
    }
  },
  created() {
    if (this.gameId !== null) {
      this.tracker = createGameProgressTracker({
        gameId: this.gameId,
        contentId: this.tarea.id,
        totalQuestions: this.evaluables.length,
        mode: 'ruta'
      })
    }
  },
  beforeUnmount() {
    // Si sale a mitad de la tarea, la sesión queda como abandonada.
    this.cerrarSesion('abandon')
  },
  methods: {
    onResponder(resultado) {
      if (this.fase !== 'jugando') return
      if (this.paso.tipo === 'explica') {
        this.avanzar()
        return
      }
      this.ultimo = resultado
      if (resultado.correcta) this.aciertos++
      this.guardar(resultado)
      this.fase = 'feedback'
    },
    guardar(resultado) {
      if (!this.tracker) return
      this.tracker.record({
        itemId: this.paso.id,
        isCorrect: resultado.correcta,
        attemptNumber: this.intentos,
        assessmentType: 'basic_concept',
        assessmentCode: this.paso.tipo,
        answer: { respuesta: resultado.respuesta, ortografia: resultado.ortografia || null }
      }).catch(error => {
        // El guardado nunca debe interrumpir al estudiante.
        console.error('No se pudo guardar la respuesta de la ruta:', error)
      })
    },
    reintentar() {
      this.intentos++
      this.reiniciarPaso()
    },
    avanzar() {
      this.indice++
      this.intentos = 1
      this.ultimo = null
      this.reiniciarPaso()
    },
    reiniciarPaso() {
      this.fase = 'jugando'
      this.verTexto = false
      this.claveMinijuego++
    },
    terminar() {
      this.cerrarSesion('complete')
      this.$emit('terminar', {
        tareaId: this.tarea.id,
        aciertos: this.aciertos,
        total: this.evaluables.length
      })
    },
    salir() {
      this.cerrarSesion('abandon')
      this.$emit('salir')
    },
    cerrarSesion(tipo) {
      if (!this.tracker || this.cerrado) return
      this.cerrado = true
      const promesa = tipo === 'complete' ? this.tracker.complete() : this.tracker.abandon()
      promesa.catch(error => {
        console.error('No se pudo cerrar la sesión de la ruta:', error)
      })
    }
  }
}
</script>