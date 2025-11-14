<template>
  <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <AppNavbar 
      :show-progress-button="currentScreen !== 'intro' && !showProgreso" 
      @go-progreso="goToProgreso" 
    />
    <div v-if="showProgreso">
      <MiProgreso 
        ref="miProgresoComponent"
        :player-name="playerName"
        :user-progress="userProgress || []"
        :is-returning-user="isReturningUser"
        @start-game1="handleStartGame1"
        @start-game2="handleStartGame2"
      />
    </div>
    <div v-else class="container mx-auto px-4 py-6 max-w-4xl" style="margin-top: 150px;">
      <!-- Pantalla 1: Introducción -->
      <div v-if="currentScreen === 'intro'" class="text-center space-y-6">
        <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <img src="@/assets/icons/libro-sin-fondo-feliz.png" alt="Libro feliz" class="h-32 mx-auto mb-2" />
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Leo Perfecto App
          </h1>
          
          <div class="space-y-6">
            <div class="text-lg text-gray-600 mb-8">
              ¡Hola! Para comenzar, escribe tu nombre:
            </div>
            
            <div class="flex justify-center items-center space-x-3">
              <input 
                v-model="playerName" 
                type="text" 
                placeholder="Escribe tu nombre aquí..."
                class="flex-1 max-w-md px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
                @keyup.enter="goToWelcome"
                @input="checkPlayerStatus"
              >
              
              <button 
                @click="goToWelcome"
                :disabled="!playerName.trim()"
                class="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                Comenzar
              </button>
            </div>
            
            <!-- Mensaje de búsqueda -->
            <div v-if="searchingPlayer" class="text-sm text-gray-500 animate-pulse">
              🔍 Buscando nombre de jugador...
            </div>
            
            <!-- Mensaje si el jugador fue encontrado -->
            <div v-if="playerFound && !searchingPlayer" class="space-y-2">
              <p class="text-green-600 font-semibold">✅ Jugador encontrado: {{ playerName }}</p>
              <p class="text-sm text-gray-500">💡 Tu progreso anterior será cargado automáticamente</p>
            </div>
          </div>
        </div>
      </div>

      <pant_bienvenida 
        v-if="currentScreen === 'welcome'"
        :player-name="playerName"
        :user-progress="userProgress || []"
        :is-returning-user="isReturningUser"
        :completed-texts="completedTexts"
        :next-text-id="currentTextId"
        @continue="goToInstructions"
      />

      <pant_reglas_game1 
        v-if="currentScreen === 'instructions'"
        @start="startGame"
      />

      <pant_game_1 
        v-if="currentScreen === 'questions'"
        :key="currentTextId"
        :player-name="playerName"
        :text-id="currentTextId"
        @continue="handleGame1Continue"
        @restart="goToInstructions"
        @try-next-text="handleTryNextText"
        @go-to-progreso="goToProgreso"
      />

      <pant_reglas_game2
        v-if="currentScreen === 'dragdropRules'"
        @continue="goToDragDrop"
      />

      <pant_game_2
        v-if="currentScreen === 'dragdrop'"
        :current-screen="currentScreen"
        :player-name="playerName"
        @continue="goToProgreso"
        @restart-game2="goToDragDropRules"
      />

      <mascota 
        v-if="currentScreen === 'questions'"
        :current-screen="currentScreen"
      />
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'
import MiProgreso from './components/MiProgreso.vue'
import pant_bienvenida from './components/pant_bienvenida.vue'
import pant_reglas_game1 from './components/pant_reglas_game1.vue'
import pant_game_1 from './components/pant_game_1.vue'
import pant_game_2 from './components/pant_game_2.vue'
import pant_reglas_game2 from './components/pant_reglas_game2.vue'
import mascota from './components/mascota.vue'
import { getAllTextIds, getNextText } from './data/game1_texts'

export default {
  name: 'App',
  components: {
    AppNavbar,
    MiProgreso,
    pant_bienvenida,
    pant_reglas_game1,
    pant_game_1,
    pant_game_2,
    pant_reglas_game2,
    mascota
  },
  data() {
    return {
      currentScreen: 'intro',
      playerName: '',
      currentTextId: 'text1', // ID del texto actual en juego 1
      completedTexts: [], // IDs de textos completados
      showProgreso: false,
      userProgress: null, // Progreso cargado desde localStorage
      isReturningUser: false, // Flag para usuarios que regresan
      searchingPlayer: false, // Flag para mostrar mensaje de búsqueda
      playerFound: false, // Flag para mostrar si el jugador fue encontrado
      searchTimeout: null // Timeout para la búsqueda
    }
  },
  computed: {
    availableTextIds() {
      return getAllTextIds()
    },
    hasMoreTexts() {
      return getNextText(this.currentTextId) !== null
    }
  },
  mounted() {
    // Cargar último jugador conocido al iniciar la app
    this.loadLastKnownPlayer()
  },
  beforeUnmount() {
    // Limpiar timeout si existe
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
  methods: {
    loadLastKnownPlayer() {
      // Intentar cargar el último jugador registrado
      const lastPlayer = localStorage.getItem('leo-perfecto-player')
      if (lastPlayer) {
        this.playerName = lastPlayer
        // Verificar inmediatamente si el jugador existe
        this.checkPlayerStatus()
      }
    },
    checkPlayerStatus() {
      // Limpiar timeout anterior si existe
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Resetear estados
      this.searchingPlayer = false
      this.playerFound = false
      
      // Si no hay nombre, no buscar
      if (!this.playerName.trim()) {
        return
      }
      
      // Mostrar mensaje de búsqueda
      this.searchingPlayer = true
      
      // Simular búsqueda con un pequeño delay para mejor UX
      this.searchTimeout = setTimeout(() => {
        this.searchingPlayer = false
        this.playerFound = this.isUserKnown(this.playerName.trim())
      }, 500)
    },
    isUserKnown(playerName) {
      // Verificar si el usuario tiene progreso guardado
      const progressKey = `leo-perfecto-progress-${playerName}`
      return localStorage.getItem(progressKey) !== null
    },
    loadUserProgress(playerName) {
      // Cargar progreso del usuario desde localStorage
      const progressKey = `leo-perfecto-progress-${playerName}`
      const savedProgress = localStorage.getItem(progressKey)
      
      if (savedProgress) {
        try {
          this.userProgress = JSON.parse(savedProgress)
          this.completedTexts = this.userProgress.map(p => p.textId)
          this.isReturningUser = true
          
          // Determinar el siguiente texto disponible
          const nextTextId = this.getNextAvailableText()
          if (nextTextId) {
            this.currentTextId = nextTextId
          }
          
          return true // Usuario con progreso encontrado
        } catch (error) {
          console.error('Error loading user progress:', error)
          this.userProgress = null
          this.completedTexts = []
          this.isReturningUser = false
        }
      }
      
      return false // Usuario nuevo o sin progreso
    },
    getNextAvailableText() {
      // Buscar el primer texto no completado
      const allTexts = this.availableTextIds
      const nextText = allTexts.find(textId => !this.completedTexts.includes(textId))
      return nextText || 'text1' // Si todos están completados, volver al primero
    },
    goToWelcome() {
      if (this.playerName.trim()) {
        // Cargar progreso del usuario
        const hasProgress = this.loadUserProgress(this.playerName.trim())
        
        if (hasProgress && this.userProgress.length > 0) {
          this.isReturningUser = true
        } else {
          this.isReturningUser = false
        }
        
        // Ir directamente a MiProgreso en lugar de pant_bienvenida
        this.goToProgreso()
      }
    },
    showReturningUserWelcome() {
      // Cambiar a pantalla de bienvenida con información del progreso
      this.currentScreen = 'welcome'
    },
    goToInstructions() {
      this.currentScreen = 'instructions'
      // No resetear currentTextId aquí - ya está configurado correctamente por loadUserProgress
    },
    startGame() {
      this.currentScreen = 'questions'
    },
    goToQuestions() {
      this.currentScreen = 'questions'
    },
    handleGame1Continue() {
      // Marcar texto como completado
      if (!this.completedTexts.includes(this.currentTextId)) {
        this.completedTexts.push(this.currentTextId)
      }

      // Regresar a MiProgreso después de completar un texto
      this.goToProgreso()
    },
    goToDragDropRules() {
      this.currentScreen = 'dragdropRules'
    },
    goToDragDrop() {
      this.currentScreen = 'dragdrop'
    },
    handleTryNextText(nextTextId) {
      // Cambiar al siguiente texto disponible
      this.currentTextId = nextTextId
      this.goToInstructions()
    },
    restartGame() {
      this.currentScreen = 'intro'
      this.playerName = ''
      this.currentTextId = 'text1'
      this.completedTexts = []
    },
    goToProgreso() {
      this.showProgreso = true;
      // Refrescar los datos del progreso después de que el componente se muestre
      this.$nextTick(() => {
        if (this.$refs.miProgresoComponent) {
          this.$refs.miProgresoComponent.loadPlayerData();
        }
      });
    },
    closeProgreso() {
      this.showProgreso = false;
    },
    handleStartGame1(gameInfo) {
      // Cerrar el progreso y establecer el texto
      this.showProgreso = false;
      this.currentTextId = gameInfo.textId;
      this.currentScreen = 'instructions'; // Ir a las reglas del juego 1
    },
    handleStartGame2() {
      // Cerrar el progreso y ir al juego 2
      this.showProgreso = false;
      this.currentScreen = 'dragdropRules'; // Ir a las reglas del juego 2
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
