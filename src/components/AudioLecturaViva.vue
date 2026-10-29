<template>
  <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-xl font-bold text-gray-800">Lectura Viva</h3>
        <p class="text-sm text-gray-500">Escucha el texto narrado</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          :disabled="!disponible"
          :aria-label="reproduciendo ? 'Pausar' : 'Escuchar el texto'"
          :aria-pressed="reproduciendo ? 'true' : 'false'"
          class="lv-boton flex items-center gap-2 px-5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
          :class="disponible ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'"
          @click="alternar"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M2.5 6.2c2.3-1 4.6-.9 6.7.4v11.2c-2.1-1.3-4.4-1.4-6.7-.4z"/>
            <path d="M9.2 6.6c2.1-1.3 4.4-1.4 6.7-.4v11.2c-2.3-1-4.6-.9-6.7.4z"/>
            <path class="onda-1" d="M18.3 9.6a3.6 3.6 0 010 4.8"/>
            <path class="onda-2" d="M20.6 7.4a6.6 6.6 0 010 9.2"/>
          </svg>
          <span>Audio</span>
        </button>

        <p
          v-if="!disponible"
          class="bg-yellow-50 border-2 border-yellow-300 rounded-xl px-3 py-2 text-sm text-yellow-800"
          role="status"
        >
          Audio no disponible aún
        </p>
      </div>
    </div>

    <audio
      v-if="src"
      ref="audio"
      :src="src"
      preload="metadata"
      @play="reproduciendo = true"
      @pause="reproduciendo = false"
      @ended="reproduciendo = false"
      @error="alError"
    ></audio>
  </div>
</template>

<script>
// ============================================
// CONSTANTES
// ============================================
// Los audios son WAV pregenerados que se colocan a mano en public/audio/lectura-viva/
const CARPETA_AUDIO = 'audio/lectura-viva/'
const EXTENSION_AUDIO = '.wav'
const VELOCIDADES = [0.75, 1, 1.25]

// ============================================
// COMPONENTE: Lectura Viva - audio narrado del texto del Juego 1
// ============================================
// El archivo se deriva del id del texto: "text7" -> "audio7.wav".
// Un archivo faltante NO da 404 (netlify.toml y el servidor de desarrollo
// devuelven index.html con 200), por eso se detecta con el evento "error" del <audio>.
export default {
  name: 'AudioLecturaViva',

  props: {
    textId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      reproduciendo: false,
      error: false,
      velocidad: VELOCIDADES[1]
    }
  },

  computed: {
    // "text7" -> "7"; si el id no sigue el patrón textN, no hay audio
    numeroTexto() {
      const coincidencia = /^text(\d+)$/.exec(this.textId)
      return coincidencia ? coincidencia[1] : null
    },

    src() {
      if (!this.numeroTexto) return null
      return process.env.BASE_URL + CARPETA_AUDIO + 'audio' + this.numeroTexto + EXTENSION_AUDIO
    },

    disponible() {
      return Boolean(this.src) && !this.error
    }
  },

  methods: {
    // Reproduce o pausa; nunca hay autoplay
    alternar() {
      const audio = this.$refs.audio
      if (!this.disponible || !audio) return

      if (audio.paused) {
        audio.playbackRate = this.velocidad
        audio.play().catch(() => {
          this.reproduciendo = false
        })
      } else {
        audio.pause()
      }
    },

    alError() {
      this.error = true
      this.reproduciendo = false
    }
  }
}
</script>

<style scoped>
.lv-boton {
  min-height: 44px;
  min-width: 44px;
}

.lv-boton:focus-visible {
  outline: 3px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
