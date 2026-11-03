<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-purple-200">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-lg opacity-50"></div>
              <img src="@/assets/icons/libro-sin-fondo-feliz.png" alt="Leo" class="w-20 h-20 relative z-10 drop-shadow-lg" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-purple-700">
                <span v-if="!isReturningUser">¡Bienvenido, {{playerName}}!</span>
                <span v-else>¡Hola de nuevo, {{playerName}}!</span>
              </h1>
              <p class="text-base text-gray-600 font-medium">
                <span v-if="!isReturningUser" class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                  <span>Comienza tu aventura de aprendizaje</span>
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                  </svg>
                  <span>Continúa mejorando tus habilidades</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <!-- Unidades de Aprendizaje - Diseño Restructurado -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-indigo-200">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Unidades de Aprendizaje
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Unidad 1 - Ruta de aprendizaje "Las palabras" (feature/ruta-unidad1) -->
          <div class="group bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 border-2 border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex flex-col items-center text-center h-full">
              <!-- Icono Grande -->
              <div class="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-5 mb-4 shadow-xl">
                <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                </svg>
              </div>

              <!-- Badge Unidad -->
              <div class="bg-blue-600 text-white text-xs px-4 py-1 rounded-full font-bold mb-3 shadow-md">
                UNIDAD 1
              </div>

              <!-- Título -->
              <h3 class="text-2xl font-extrabold text-blue-900 mb-4 leading-tight">
                Las palabras
              </h3>

              <!-- Qué aprende -->
              <div class="mb-4 px-2">
                <p class="text-sm text-gray-800 font-semibold mb-2">• Sustantivos, verbos y adjetivos</p>
                <p class="text-sm text-gray-800 font-semibold mb-2">• Conectores: y, pero, porque</p>
                <p class="text-sm text-gray-800 font-semibold mb-2">• Un desafío final con un texto</p>
              </div>

              <!-- Formato de la ruta (la barra de progreso vuelve cuando la ruta guarde en Supabase) -->
              <p class="text-xs text-gray-600 mb-5">8 lecciones cortas de 3 a 5 minutos, con Leo como guía.</p>

              <!-- Botón -->
              <button
                @click="entrarRuta"
                @mouseenter="playSound('hover')"
                class="mt-auto w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                <span>Entrar</span>
              </button>
            </div>
          </div>

          <!-- Unidad 2 - Comprensión Inferencial y Analítica -->
          <div class="group bg-green-100 rounded-2xl p-6 border-2 border-green-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex flex-col items-center text-center h-full">
              <!-- Icono Grande -->
              <div class="bg-green-500 text-white rounded-2xl p-5 mb-4 shadow-xl">
                <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
              </div>

              <!-- Badge Unidad -->
              <div class="bg-green-600 text-white text-xs px-4 py-1 rounded-full font-bold mb-3 shadow-md">
                UNIDAD 2
              </div>

              <!-- Título -->
              <h3 class="text-2xl font-extrabold text-green-900 mb-4 leading-tight">
                Comprensión Lectora
              </h3>

              <!-- Habilidades Actuales -->
              <div class="mb-4 px-2">
                <p class="text-sm text-gray-800 font-semibold mb-2">• Identificar Idea Principal</p>
                <p class="text-sm text-gray-800 font-semibold mb-2">• Identificar Causa-Efecto</p>
                <p class="text-sm text-gray-800 font-semibold mb-2">• Hacer Inferencias</p>
                <p class="text-sm text-gray-800 font-semibold mb-2">• Identificar Detalles Específicos</p>
                <p class="text-sm text-gray-800 font-semibold mb-2">• Identificar Propósito/Intención</p>
              </div>

              <!-- Próximamente -->
              <div class="mb-4 px-2">
                <p class="text-xs text-gray-500 italic mb-1.5">🕒 Próximamente:</p>
                <p class="text-xs text-gray-600">• Comparación y contraste de ideas</p>
                <p class="text-xs text-gray-600">• Interpretación de metáforas</p>
                <p class="text-xs text-gray-600">• Análisis de estructura textual</p>
              </div>

              <!-- Barra de Progreso -->
              <div class="w-full mb-5">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-semibold text-green-700">Progreso</span>
                  <span class="text-xs font-bold text-green-600">{{ getUnidadProgress(2) }}%</span>
                </div>
                <div class="w-full bg-green-200 rounded-full h-3 shadow-inner">
                  <div 
                    class="bg-green-500 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                    :style="{ width: getUnidadProgress(2) + '%' }"
                  >
                    <span v-if="getUnidadProgress(2) > 10" class="text-xs font-bold text-white">{{ getUnidadProgress(2) }}%</span>
                  </div>
                </div>
              </div>

              <!-- Botón -->
              <button 
                @click="iniciarUnidad(2)"
                @mouseenter="playSound('hover')"
                class="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:scale-105 transform flex items-center justify-center gap-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                </svg>
                <span>Jugar</span>
              </button>
            </div>
          </div>
          <!-- Unidad 3 - Aplicación y Metacognición -->
          <div class="group bg-red-100 rounded-2xl p-6 border-2 border-red-300 shadow-lg opacity-90">
            <div class="flex flex-col items-center text-center h-full">
              <!-- Icono Grande -->
              <div class="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-5 mb-4 shadow-xl">
                <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clip-rule="evenodd" />
                </svg>
              </div>

              <!-- Badge Unidad -->
              <div class="bg-red-600 text-white text-xs px-4 py-1 rounded-full font-bold mb-3 shadow-md">
                UNIDAD 3
              </div>

              <!-- Título -->
              <h3 class="text-2xl font-extrabold text-red-900 mb-4 leading-tight">
                Aplicación y Metacognición
              </h3>

              <!-- Próximamente -->
              <div class="mb-4 px-2">
                <p class="text-xs text-gray-500 italic mb-1.5">🕒 Próximamente:</p>
                <p class="text-xs text-gray-600">• Lectura de textos extensos y complejos</p>
                <p class="text-xs text-gray-600">• Síntesis y resumen de información</p>
                <p class="text-xs text-gray-600">• Análisis crítico y formación de opiniones</p>
                <p class="text-xs text-gray-600">• Estrategias de concentración y retención</p>
              </div>

              <!-- Badge Estado -->
              <div class="bg-yellow-200 border-2 border-yellow-400 text-yellow-800 text-sm px-5 py-2 rounded-full font-extrabold shadow-md mb-5 flex items-center justify-center gap-2">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
                <span>Próximamente</span>
              </div>

              <!-- Botón -->
              <button 
                disabled
                class="mt-auto w-full bg-gray-300 text-gray-600 py-3 px-6 rounded-xl font-bold text-lg cursor-not-allowed opacity-70 shadow-md flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
                <span>Bloqueado</span>
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- UI-04: los bloques "Tu Progreso" y "Ranking Global" pasaron a la sección Progreso
           (PantallaProgreso.vue / RankingGlobal.vue) y el asistente a LeoIA (PantallaLeoIA.vue). -->

    </div>
  </div>
</template>

<script>
// ============================================
// IMPORTACIONES
// ============================================
import { createGameManager } from '../utils/gameManager'
// UI-04: AsistenteIA se movió a la sección LeoIA (PantallaLeoIA.vue)
// import AsistenteIA from './AsistenteIA.vue'

export default {
  name: 'MiProgreso',
  
  // components: { AsistenteIA }, // UI-04: ya no se usa aquí (ver PantallaLeoIA.vue)
  
  // ============================================
  // PROPS
  // ============================================
  props: {
    playerName: {
      type: String,
      default: 'Jugador'
    },
    userProgress: {
      type: Array,
      default: () => []
    },
    isReturningUser: {
      type: Boolean,
      default: false
    }
  },
  
  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  data() {
    return {
      // Sistema de audio
      audioContext: null,
      
      // Gestor de juegos
      gameManager: null
    };
  },
  
  // ============================================
  // CICLO DE VIDA: MOUNTED
  // ============================================
  mounted() {
    try {
      // Inicializar GameManager
      this.gameManager = createGameManager(this.playerName)
      
      // (UI-04) Los datos de progreso se cargan ahora en PantallaProgreso.vue
      
      // Inicializar audio
      this.initAudio()
      
      // Sonido de bienvenida
      this.playSound('welcome')
    } catch (error) {
      console.error('❌ Error al inicializar MiProgreso:', error)
    }
  },
  
  // ============================================
  // MÉTODOS DEL COMPONENTE
  // ============================================
  methods: {
    // UI-04: loadPlayerData, resetearEstadisticas, calcularRachaDias y calcularFortalezasYDebilidades
    // (y los computed de nivel, progreso, emoji y mensaje) se movieron TAL CUAL a PantallaProgreso.vue,
    // porque solo los usa el bloque "Tu Progreso", que ahora vive en la sección Progreso.

    // MÉTODOS PARA GESTIÓN DE UNIDADES Y JUEGOS ALEATORIOS

    /**
     * Obtiene el progreso de una unidad específica
     * @param {number} unidadId - ID de la unidad (1, 2, 3)
     * @returns {number} - Porcentaje de progreso (0-100)
     */
    getUnidadProgress(unidadId) {
      try {
        if (!this.gameManager) return 0
        return this.gameManager.calcularProgresoUnidad(unidadId)
      } catch (error) {
        console.error(`❌ Error al calcular progreso de unidad ${unidadId}:`, error)
        return 0
      }
    },

    /**
    * Abre la ruta de aprendizaje (Unidad 1). App.vue decide qué pantalla mostrar.
     */
    entrarRuta() {
      this.playSound('click')
      this.$emit('abrir-ruta')
    },
    /**
     * Inicia una unidad seleccionando inteligentemente un juego
     * @param {number} unidadId - ID de la unidad a iniciar
     */
    iniciarUnidad(unidadId) {
      try {
        this.playSound('click')

        // Verificar GameManager
        if (!this.gameManager) {
          console.error('❌ GameManager no disponible')
          alert('❌ Error al iniciar juego')
          return
        }

        // Seleccionar juego inteligente
        const juegoSeleccionado = this.gameManager.seleccionarJuegoInteligente(unidadId)

        if (!juegoSeleccionado) {
          alert('❌ No hay juegos disponibles en esta unidad')
          return
        }

        // Mostrar mensaje al jugador
        console.log('🎮 Juego seleccionado:', juegoSeleccionado)
        
        if (juegoSeleccionado.esRepeticion) {
          alert(juegoSeleccionado.mensaje)
        } else {
          console.log(juegoSeleccionado.mensaje)
        }

        // Emitir evento según el tipo de juego
        this.$nextTick(() => {
          if (juegoSeleccionado.gameId === 1) {
            // Juego 1 - Identificación de palabras clave
            this.$emit('start-game1', { 
              textId: juegoSeleccionado.textId,
              esRepeticion: juegoSeleccionado.esRepeticion
            })
          } else if (juegoSeleccionado.gameId === 2) {
            // Juego 2 - Clasificar palabras
            this.$emit('start-game2', {
              esRepeticion: juegoSeleccionado.esRepeticion
            })
          } else if (juegoSeleccionado.gameId === 3) {
            // Juego 3 - Comprensión lectora
            this.$emit('start-game3', {
              textId: juegoSeleccionado.textId,
              esRepeticion: juegoSeleccionado.esRepeticion
            })
          }
        })

        console.log(`✅ Iniciando: ${juegoSeleccionado.nombre}`)
      } catch (error) {
        console.error('❌ Error al iniciar unidad:', error)
        alert('❌ Error inesperado al iniciar juego')
      }
    },

    // UI-04 — SIN USO, se deja comentado (no se borra): respondía a eventos del asistente IA, pero
    // AsistenteIA no emite ninguno y ya no está en esta pantalla.
    // handleIAAction(action) {
    //   this.playSound('click');
    //   // Aquí puedes emitir eventos o mostrar alertas según la acción
    //   switch(action) {
    //     case 'consejo':
    //       alert('💡 Consejo: Lee cada texto dos veces. La primera para entender la idea general, la segunda para los detalles importantes.');
    //       break;
    //     case 'explicacion':
    //       alert('📚 Explicación: Los juegos están diseñados para mejorar tu comprensión lectora paso a paso. Cada ejercicio te ayuda a desarrollar diferentes habilidades.');
    //       break;
    //     case 'pregunta':
    //       alert('❓ ¿Necesitas ayuda? Los módulos están ordenados por dificultad. Empieza por el Módulo 1 si es tu primera vez.');
    //       break;
    //   }
    // },

    initAudio() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },

    playSound(type) {
      if (!this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      const now = this.audioContext.currentTime;
      
      switch(type) {
        case 'hover':
          oscillator.frequency.setValueAtTime(400, now);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          oscillator.start(now);
          oscillator.stop(now + 0.1);
          break;
        case 'click':
          oscillator.frequency.setValueAtTime(600, now);
          gainNode.gain.setValueAtTime(0.2, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          oscillator.start(now);
          oscillator.stop(now + 0.15);
          break;
        case 'welcome':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(523, now);
          oscillator.frequency.setValueAtTime(659, now + 0.1);
          oscillator.frequency.setValueAtTime(784, now + 0.2);
          gainNode.gain.setValueAtTime(0.15, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el carousel de logros */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #a78bfa;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #8b5cf6;
}
</style>
