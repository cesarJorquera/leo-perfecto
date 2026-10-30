<template>
  <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <!-- Proyector en pantalla grande para la sala (oculta la navbar común) -->
    <LeoIdeasProyector
      v-if="currentScreen === 'leoIdeasProyector' && esDocente"
      :docente-id="usuario ? usuario.id : ''"
      @salir="currentScreen = 'leoAula'"
    />

    <!-- Alumno en modo sala (oculta la navbar común) -->
    <LeoIdeasAlumno
      v-else-if="currentScreen === 'leoIdeasAlumno'"
      :codigo-sala-inicial="codigoSalaUrl"
      @volver-inicio="volverAlInicioDesdeSala"
    />

    <template v-else>
      <AppNavbar 
      :show-progress-button="sesionIniciada && !showProgreso && currentScreen !== 'cargando'" 
      :sesion-iniciada="sesionIniciada"
      :mostrar-panel-docente="esDocente"
      @go-progreso="goToProgreso" 
      @go-panel-docente="irAlPanelDocente"
      @cerrar-sesion="salir"
    />
    <div v-if="errorProgreso" class="max-w-4xl mx-auto px-4 pt-4">
      <p class="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800" role="alert">
        No se pudo cargar tu progreso desde la nube. Tus datos no se han reemplazado.
        Revisa tu conexión e intenta iniciar sesión nuevamente.
      </p>
    </div>
    <div v-if="showProgreso">
      <MiProgreso 
        ref="miProgresoComponent"
        :player-name="playerName"
        :user-progress="userProgress || []"
        :is-returning-user="isReturningUser"
        @start-game1="handleStartGame1"
        @start-game2="handleStartGame2"
        @start-game3="handleStartGame3"
        @start-game4="handleStartGame4"
        @abrir-ruta="irARuta"
      />
    </div>
    <div v-else class="container mx-auto px-4 py-6 max-w-4xl" style="margin-top: 150px;">
      <!-- Mientras se revisa si hay una sesión guardada (evita mostrar el login un instante) -->
      <div v-if="currentScreen === 'cargando'" class="text-center text-gray-500 py-20 animate-pulse">
        Cargando…
      </div>

      <!-- CU-02: login con Google (reemplaza la pantalla "escribe tu nombre") -->
      <pant_login
        v-if="currentScreen === 'login'"
        :configurado="supabaseConfigurado"
        :cargando="cargandoLogin"
        :error="errorLogin"
        @entrar-google="entrar"
        @unirse-sala="handleUnirseSala"
      />

      <!-- CU-04 / JU-08: Espacio docente (reemplaza el "Próximamente" de CU-04) -->
      <ElegirEspacio
        v-if="currentScreen === 'elegirEspacio' && esDocente"
        :nombre-docente="playerName"
        @elegir-aula="currentScreen = 'leoAula'"
        @elegir-dash="currentScreen = 'leoDash'"
        @volver="goToProgreso"
      />

      <LeoAula
        v-if="currentScreen === 'leoAula' && esDocente"
        @abrir-leo-ideas="abrirLeoIdeasProyector"
        @volver="currentScreen = 'elegirEspacio'"
      />

      <LeoDash
        v-if="currentScreen === 'leoDash' && esDocente"
        @abrir-control-leo-ideas="abrirLeoIdeasControl"
        @volver="currentScreen = 'elegirEspacio'"
      />


      <LeoIdeasControl
        v-if="currentScreen === 'leoIdeasControl' && esDocente"
        :docente-id="usuario ? usuario.id : ''"
        @volver="currentScreen = 'leoDash'"
      />

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
        :text-id="currentGame2TextId"
        @continue="goToDragDrop"
      />

      <pant_game_2
        v-if="currentScreen === 'dragdrop'"
        :key="currentGame2TextId"
        :current-screen="currentScreen"
        :player-name="playerName"
        :text-id="currentGame2TextId"
        @continue="goToProgreso"
        @restart-game2="goToDragDropRules"
        @try-next-text="handleTryNextGame2Text"
      />

      <pant_game_3
        v-if="currentScreen === 'game3'"
        :key="currentGame3TextId"
        :player-name="playerName"
        @volver-menu="goToProgreso"
      />

      <!-- Juego 4: Trivia -->
      <pant_reglas_game4
        v-if="currentScreen === 'instructions_game4'"
        @start-game="currentScreen = 'game4'"
        @volver-menu="goToProgreso"
      />

      <pant_game_4
        v-if="currentScreen === 'game4'"
        :player-name="playerName"
        @volver-menu="goToProgreso"
        @reintentar="currentScreen = 'instructions_game4'"
      />

      <!-- RUTA (3/5): ruta de aprendizaje (feature/ruta-unidad1) -->
      <RutaAprendizaje
        v-if="currentScreen === 'ruta'"
        @salir="goToProgreso"
      />

      <mascota 
        v-if="currentScreen === 'questions'"
        :current-screen="currentScreen"
      />
    </div>
    </template>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'
import MiProgreso from './components/MiProgreso.vue'
import pant_bienvenida from './components/pant_bienvenida.vue'
import pant_reglas_game1 from './components/pant_reglas_game1.vue'
import pant_game_1 from './components/pant_game_1.vue'
import pant_game_2 from './components/pant_game_2.vue'
import pant_game_3 from './components/pant_game_3.vue'
import pant_reglas_game2 from './components/pant_reglas_game2.vue'
import pant_reglas_game4 from './components/pant_reglas_game4.vue'
import pant_game_4 from './components/pant_game_4.vue'
import mascota from './components/mascota.vue'
import pant_login from './components/pant_login.vue'
import ElegirEspacio from './components/docente/ElegirEspacio.vue'
import LeoAula from './components/docente/LeoAula.vue'
import LeoDash from './components/docente/LeoDash.vue'
import LeoIdeasProyector from './components/leo_ideas/LeoIdeasProyector.vue'
import LeoIdeasControl from './components/leo_ideas/LeoIdeasControl.vue'
import LeoIdeasAlumno from './components/leo_ideas/LeoIdeasAlumno.vue'
// RUTA (1/5): componente de la ruta de aprendizaje
import RutaAprendizaje from './components/ruta/RutaAprendizaje.vue'
import { supabaseConfigurado } from './utils/supabaseClient'
import {
  entrarConGoogle,
  cerrarSesion,
  obtenerSesion,
  escucharCambiosDeSesion,
  cargarPerfil,
  nombreVisible,
  esDocente
} from './utils/authService'
import { getAllTextIds, getNextText } from './data/game1_texts'
import { createGameManager } from './utils/gameManager'
import { cargarProgresoNube } from './utils/supabaseProgress'

export default {
  name: 'App',
  components: {
    AppNavbar,
    MiProgreso,
    pant_bienvenida,
    pant_reglas_game1,
    pant_game_1,
    pant_game_2,
    pant_game_3,
    pant_reglas_game2,
    pant_reglas_game4,
    pant_game_4,
    mascota,
    pant_login,
    ElegirEspacio,
    LeoAula,
    LeoDash,
    LeoIdeasProyector,
    LeoIdeasControl,
    LeoIdeasAlumno,
    RutaAprendizaje // RUTA (2/5)
  },
  data() {
    return {
      codigoSalaUrl: (/^\d{6}$/.test((new URLSearchParams(window.location.search).get('sala') || '').trim()))
        ? (new URLSearchParams(window.location.search).get('sala') || '').trim()
        : '',
      currentScreen: (/^\d{6}$/.test((new URLSearchParams(window.location.search).get('sala') || '').trim()))
        ? 'leoIdeasAlumno'
        : 'cargando',
      playerName: '', // Ahora viene del perfil de Google, ya no se escribe a mano
      currentTextId: 'text1', // ID del texto actual en juego 1
      currentGame2TextId: 'drag1', // ID del texto actual en juego 2
      currentGame3TextId: 'comp1', // ID del texto actual en juego 3
      completedTexts: [], // IDs de textos completados
      showProgreso: false,
      userProgress: null, // Progreso cargado desde Supabase
      isReturningUser: false, // Flag para usuarios que regresan
      errorProgreso: false,
      // --- Cuentas y acceso (CU-01 a CU-04) ---
      supabaseConfigurado,
      usuario: null, // usuario de Supabase Auth (null = sin sesión)
      perfil: null, // fila de la tabla profiles (incluye rol)
      cargandoLogin: false,
      errorLogin: '',
      dejarDeEscucharSesion: null
    }
  },
  computed: {
    sesionIniciada() {
      return this.usuario !== null
    },
    esDocente() {
      return esDocente(this.perfil)
    },
    availableTextIds() {
      return getAllTextIds()
    },
    hasMoreTexts() {
      return getNextText(this.currentTextId) !== null
    }
  },
  mounted() {
    this.iniciarAutenticacion()
  },
  beforeUnmount() {
    if (this.dejarDeEscucharSesion) this.dejarDeEscucharSesion()
  },
  methods: {
    // ============================================
    // CUENTAS Y ACCESO (CU-02, CU-03, CU-04)
    // ============================================
    async iniciarAutenticacion() {
      if (!this.supabaseConfigurado) {
        if (!this.codigoSalaUrl) this.currentScreen = 'login' // la pantalla de login explica qué falta
        return
      }
      // 1) Escuchar entradas y salidas (login con Google, logout, otra pestaña)
      this.dejarDeEscucharSesion = escucharCambiosDeSesion({
        alEntrar: (sesion) => this.entrarConSesion(sesion),
        alSalir: () => this.volverAlLogin()
      })
      // 2) CU-03: si ya había sesión guardada, entrar directo sin login
      try {
        const sesion = await obtenerSesion()
        if (sesion) await this.entrarConSesion(sesion)
        else if (!this.usuario && !this.codigoSalaUrl) this.currentScreen = 'login'
      } catch (error) {
        console.error('No se pudo revisar la sesión:', error)
        if (!this.codigoSalaUrl) this.currentScreen = 'login'
      }
    },
    async entrar() {
      this.errorLogin = ''
      this.cargandoLogin = true
      try {
        await entrarConGoogle() // el navegador se va a Google y vuelve
      } catch (error) {
        console.error('Error al entrar con Google:', error)
        this.errorLogin = 'No se pudo abrir el inicio de sesión con Google. Intenta de nuevo.'
        this.cargandoLogin = false
      }
    },
    async entrarConSesion(sesion) {
      // Supabase puede avisar SIGNED_IN más de una vez (al volver a la pestaña,
      // o junto con la sesión guardada): si ya entró este usuario, no hacer nada.
      // Sin esto, un alumno a mitad de juego volvería al menú.
      if (this.usuario && this.usuario.id === sesion.user.id) return
      this.usuario = sesion.user
      this.perfil = await cargarPerfil(sesion.user.id)
      // El nombre ya no se escribe: sale del perfil / cuenta de Google.
      // Se usa para mostrar el nombre; el progreso se identifica por el UUID de Auth.
      this.playerName = nombreVisible(this.perfil, sesion.user)
      try {
        localStorage.setItem('leo-perfecto-player', this.playerName) // los juegos lo leen como respaldo
      } catch (error) {
        console.warn('No se pudo guardar el nombre en localStorage:', error)
      }
      this.cargandoLogin = false
      if (this.codigoSalaUrl) {
        return
      }
      if (this.esDocente) {
        this.showProgreso = false
        this.currentScreen = 'elegirEspacio'
        return
      }
      this.currentScreen = 'welcome'
      await this.goToWelcome() // carga el progreso asociado a la cuenta y abre el menú
    },
    async salir() {
      try {
        await cerrarSesion()
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
      this.volverAlLogin() // no esperar al aviso de Supabase para cambiar de pantalla
    },
    volverAlLogin() {
      this.usuario = null
      this.perfil = null
      this.playerName = ''
      this.userProgress = null
      this.errorProgreso = false
      this.completedTexts = []
      this.isReturningUser = false
      this.showProgreso = false
      this.cargandoLogin = false
      if (this.codigoSalaUrl) {
        return
      }
      this.currentScreen = 'login'
    },
    irAlPanelDocente() {
      if (!this.esDocente) return
      this.showProgreso = false
      this.currentScreen = 'elegirEspacio'
    },
    // RUTA (5/5): abre la ruta de aprendizaje (desde la tarjeta Unidad 1 de MiProgreso)
    irARuta() {
      this.showProgreso = false
      this.currentScreen = 'ruta'
    },
    abrirLeoIdeasProyector() {
      this.showProgreso = false
      this.currentScreen = 'leoIdeasProyector'
    },
    abrirLeoIdeasControl() {
      this.showProgreso = false
      this.currentScreen = 'leoIdeasControl'
    },
    handleUnirseSala(codigo) {
      const limpio = String(codigo || '').trim()
      if (!/^\d{6}$/.test(limpio)) return
      this.codigoSalaUrl = limpio
      this.currentScreen = 'leoIdeasAlumno'
    },
    volverAlInicioDesdeSala() {
      if (window.location.search.includes('sala')) {
        const url = new URL(window.location.href)
        url.searchParams.delete('sala')
        const nuevaUrl = url.pathname + (url.search ? url.search : '')
        window.history.replaceState({}, document.title, nuevaUrl)
      }
      this.codigoSalaUrl = ''
      if (this.usuario) {
        if (this.esDocente) {
          this.currentScreen = 'elegirEspacio'
        } else {
          this.goToWelcome()
        }
      } else {
        this.currentScreen = 'login'
      }
    },
    async loadUserProgress(playerName) {
      const progress = await cargarProgresoNube()
      const gameManager = createGameManager(playerName)
      const completedProgress = progress.filter(item => item.status === 'completed')
      if (!gameManager.saveProgress(completedProgress)) {
        throw new Error('No se pudo actualizar la copia local del progreso descargado.')
      }

      this.userProgress = progress
      this.completedTexts = completedProgress
        .filter(item => item.gameId === 1)
        .map(item => item.textId)
      this.isReturningUser = completedProgress.length > 0

      const nextTextId = this.getNextAvailableText()
      if (nextTextId) this.currentTextId = nextTextId

      return this.isReturningUser
    },
    getNextAvailableText() {
      // Buscar el primer texto no completado
      const allTexts = this.availableTextIds
      const nextText = allTexts.find(textId => !this.completedTexts.includes(textId))
      return nextText || 'text1' // Si todos están completados, volver al primero
    },
    async goToWelcome() {
      if (this.playerName.trim()) {
        this.errorProgreso = false
        try {
          await this.loadUserProgress(this.playerName.trim())
        } catch (error) {
          console.error('No se pudo cargar el progreso desde Supabase:', error)
          this.errorProgreso = true
          this.userProgress = []
          this.completedTexts = []
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
      this.currentScreen = 'login'
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
    handleStartGame2(gameInfo) {
      // Cerrar el progreso y ir al juego 2
      this.showProgreso = false;
      
      // Si se especifica un textId, usarlo; si no, obtener el siguiente no completado
      if (gameInfo && gameInfo.textId) {
        this.currentGame2TextId = gameInfo.textId;
      } else {
        // Obtener el primer texto no completado del juego 2
        this.currentGame2TextId = this.getNextGame2Text();
      }
      
      this.currentScreen = 'dragdropRules'; // Ir a las reglas del juego 2
    },
    getNextGame2Text() {
      // Obtener progreso del jugador para juego 2
      const playerName = this.playerName || localStorage.getItem('leo-perfecto-player') || 'anonimo';
      const progressKey = `leo-perfecto-progress-${playerName}`;
      const savedProgress = localStorage.getItem(progressKey);
      
      // IDs disponibles del juego 2
      const availableGame2Texts = ['drag1', 'drag2', 'drag3'];
      
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          // Filtrar solo progreso del juego 2
          const game2Progress = progress.filter(p => p.gameId === 2);
          const completedTexts = game2Progress.map(p => p.textId);
          
          // Buscar el primer texto no completado
          const nextText = availableGame2Texts.find(textId => !completedTexts.includes(textId));
          return nextText || 'drag1'; // Si todos están completados, volver al primero
        } catch (error) {
          console.error('Error al obtener progreso:', error);
        }
      }
      
      return 'drag1'; // Por defecto, el primer texto
    },
    handleTryNextGame2Text(nextTextId) {
      // Cambiar al siguiente texto y volver a las reglas
      this.currentGame2TextId = nextTextId;
      this.goToDragDropRules();
    },
    handleStartGame3(gameInfo) {
      // Cerrar el progreso y ir al juego 3
      this.showProgreso = false;
      
      // El juego 3 maneja su propia selección de textos internamente
      // pero podemos establecer un textId inicial si se proporciona
      if (gameInfo && gameInfo.textId) {
        this.currentGame3TextId = gameInfo.textId;
      }
      
      this.currentScreen = 'game3'; // Ir directamente al juego 3 (sin pantalla de reglas)
    },
    
    // eslint-disable-next-line no-unused-vars
    handleStartGame4(gameInfo) {
      // Cerrar el progreso y ir al juego 4 (Trivia)
      this.showProgreso = false;
      this.currentScreen = 'instructions_game4'; // Ir a las reglas del juego 4
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