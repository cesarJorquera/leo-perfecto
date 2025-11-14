/**
 * ============================================
 * GAME MANAGER - Sistema Inteligente de Juegos
 * ============================================
 * 
 * Este módulo gestiona la lógica de selección de juegos,
 * actualización de métricas y progreso del jugador.
 */

import { getTextById } from '../data/game1_texts'

/**
 * Configuración de juegos disponibles por unidad
 */
export const UNIDADES_CONFIG = {
  1: {
    nombre: 'Fundamentos Básicos',
    juegos: [
      { 
        gameId: 1, 
        textId: 'text1', 
        nombre: 'Palabras Clave - Harry Potter',
        tipo: 'keywords'
      },
      { 
        gameId: 1, 
        textId: 'text2', 
        nombre: 'Palabras Clave - Frodo',
        tipo: 'keywords'
      },
      { 
        gameId: 2, 
        textId: 'drag1', 
        nombre: 'Clasificar Palabras',
        tipo: 'dragdrop'
      }
    ]
  },
  2: {
    nombre: 'Comprensión Intermedia',
    juegos: [
      // Agregar juegos futuros aquí
    ]
  },
  3: {
    nombre: 'Análisis Avanzado',
    juegos: [
      // Agregar juegos futuros aquí
    ]
  }
}

/**
 * ============================================
 * CLASE: GameManager
 * ============================================
 * Gestiona todo el sistema de juegos y progreso
 */
export class GameManager {
  constructor(playerName) {
    this.playerName = playerName || 'anonimo'
    this.progressKey = `leo-perfecto-progress-${this.playerName}`
  }

  /**
   * Carga el progreso del jugador desde localStorage
   * @returns {Array} Array de progreso o array vacío
   */
  loadProgress() {
    try {
      const saved = localStorage.getItem(this.progressKey)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('❌ Error al cargar progreso:', error)
      return []
    }
  }

  /**
   * Guarda el progreso del jugador
   * @param {Array} progressArray - Array de progreso
   */
  saveProgress(progressArray) {
    try {
      localStorage.setItem(this.progressKey, JSON.stringify(progressArray))
      return true
    } catch (error) {
      console.error('❌ Error al guardar progreso:', error)
      return false
    }
  }

  /**
   * Obtiene todos los juegos de una unidad
   * @param {number} unidadId - ID de la unidad
   * @returns {Array} Array de juegos
   */
  getJuegosUnidad(unidadId) {
    try {
      const unidad = UNIDADES_CONFIG[unidadId]
      return unidad ? [...unidad.juegos] : []
    } catch (error) {
      console.error('❌ Error al obtener juegos de unidad:', error)
      return []
    }
  }

  /**
   * Obtiene juegos NO completados de una unidad
   * @param {number} unidadId - ID de la unidad
   * @returns {Array} Array de juegos no completados
   */
  getJuegosNoCompletados(unidadId) {
    try {
      const todosJuegos = this.getJuegosUnidad(unidadId)
      const progreso = this.loadProgress()

      return todosJuegos.filter(juego => {
        // Verificar si este juego está completado
        const completado = progreso.some(p => 
          p.textId === juego.textId && p.completed
        )
        return !completado
      })
    } catch (error) {
      console.error('❌ Error al filtrar juegos no completados:', error)
      return []
    }
  }

  /**
   * Obtiene juegos completados de una unidad
   * @param {number} unidadId - ID de la unidad
   * @returns {Array} Array de juegos completados con su mejor puntaje
   */
  getJuegosCompletados(unidadId) {
    try {
      const todosJuegos = this.getJuegosUnidad(unidadId)
      const progreso = this.loadProgress()

      return todosJuegos
        .map(juego => {
          // Buscar el mejor puntaje para este juego
          const intentos = progreso.filter(p => p.textId === juego.textId)
          if (intentos.length === 0) return null

          const mejorIntento = intentos.reduce((mejor, actual) => 
            (actual.score > mejor.score) ? actual : mejor
          )

          return {
            ...juego,
            mejorPuntaje: mejorIntento.score,
            intentos: intentos.length,
            ultimoIntento: mejorIntento.date
          }
        })
        .filter(j => j !== null)
    } catch (error) {
      console.error('❌ Error al obtener juegos completados:', error)
      return []
    }
  }

  /**
   * Selecciona el mejor juego para mostrar al jugador
   * Prioridad: 1) Juegos no completados, 2) Juegos completados para mejorar
   * @param {number} unidadId - ID de la unidad
   * @returns {Object|null} Juego seleccionado o null
   */
  seleccionarJuegoInteligente(unidadId) {
    try {
      // 1. Verificar si hay juegos no completados
      const noCompletados = this.getJuegosNoCompletados(unidadId)
      
      if (noCompletados.length > 0) {
        // Seleccionar aleatoriamente entre los no completados
        const indice = Math.floor(Math.random() * noCompletados.length)
        return {
          ...noCompletados[indice],
          esRepeticion: false,
          mensaje: '🎮 ¡Nuevo desafío! Completa este juego.'
        }
      }

      // 2. Si todos están completados, permitir repetir
      const completados = this.getJuegosCompletados(unidadId)
      
      if (completados.length > 0) {
        // Seleccionar aleatoriamente para repetir
        const indice = Math.floor(Math.random() * completados.length)
        return {
          ...completados[indice],
          esRepeticion: true,
          mensaje: `🔄 ¡Repite este juego! Tu mejor puntaje: ${completados[indice].mejorPuntaje}%`
        }
      }

      // 3. No hay juegos disponibles
      return null
    } catch (error) {
      console.error('❌ Error al seleccionar juego:', error)
      return null
    }
  }

  /**
   * Registra un intento de juego y actualiza métricas
   * @param {Object} intentoData - Datos del intento
   * @returns {Object} Resultado con métricas actualizadas
   */
  registrarIntento(intentoData) {
    try {
      const {
        textId,
        gameId,
        correctAnswers,
        totalQuestions,
        score,
        timeSpent = null
      } = intentoData

      const progreso = this.loadProgress()
      
      // Crear objeto de intento
      const nuevoIntento = {
        player: this.playerName,
        textId,
        gameId,
        textTitle: this.getGameTitle(textId),
        correctAnswers,
        totalQuestions,
        score,
        timeSpent,
        completed: true,
        date: new Date().toISOString()
      }

      // Buscar intentos previos
      const intentosPrevios = progreso.filter(p => p.textId === textId)
      const mejorPrevio = intentosPrevios.length > 0 
        ? Math.max(...intentosPrevios.map(p => p.score))
        : 0

      // Determinar si mejoró
      const mejoro = score > mejorPrevio
      const empeoro = intentosPrevios.length > 0 && score < mejorPrevio

      // Agregar nuevo intento
      progreso.push(nuevoIntento)

      // Guardar
      this.saveProgress(progreso)

      // Retornar resultado
      return {
        success: true,
        mejoro,
        empeoro,
        mejorPrevio,
        nuevoScore: score,
        diferencia: score - mejorPrevio,
        mensaje: this.generarMensajeResultado(score, mejoro, empeoro, mejorPrevio)
      }
    } catch (error) {
      console.error('❌ Error al registrar intento:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Genera mensaje motivacional según resultado
   */
  generarMensajeResultado(score, mejoro, empeoro, mejorPrevio) {
    if (score === 100) {
      return '🎉 ¡PERFECTO! ¡Dominaste completamente este juego!'
    }
    
    if (mejoro) {
      const diferencia = score - mejorPrevio
      return `🚀 ¡MEJORASTE! +${diferencia}% de tu mejor puntaje anterior (${mejorPrevio}%)`
    }
    
    if (empeoro) {
      return `📚 Puedes mejorar. Tu mejor puntaje sigue siendo ${mejorPrevio}%. ¡Sigue practicando!`
    }
    
    if (score >= 80) {
      return '😊 ¡Muy bien! Excelente desempeño.'
    }
    
    if (score >= 60) {
      return '👍 Buen trabajo. Con práctica mejorarás aún más.'
    }
    
    return '💪 ¡Sigue intentando! La práctica hace al maestro.'
  }

  /**
   * Obtiene el título de un juego por textId
   */
  getGameTitle(textId) {
    try {
      // Intentar obtener de game1_texts
      const texto = getTextById(textId)
      if (texto) return texto.title

      // Si es drag and drop
      if (textId === 'drag1') return 'Clasificar Palabras'

      return 'Juego sin título'
    } catch (error) {
      return 'Juego sin título'
    }
  }

  /**
   * Calcula el progreso de una unidad en porcentaje
   * @param {number} unidadId - ID de la unidad
   * @returns {number} Porcentaje de progreso (0-100)
   */
  calcularProgresoUnidad(unidadId) {
    try {
      const todosJuegos = this.getJuegosUnidad(unidadId)
      if (todosJuegos.length === 0) return 0

      const completados = this.getJuegosCompletados(unidadId)
      return Math.round((completados.length / todosJuegos.length) * 100)
    } catch (error) {
      console.error('❌ Error al calcular progreso:', error)
      return 0
    }
  }

  /**
   * Obtiene estadísticas generales del jugador
   * @returns {Object} Estadísticas completas
   */
  getEstadisticas() {
    try {
      const progreso = this.loadProgress()
      
      if (progreso.length === 0) {
        return {
          totalJuegos: 0,
          juegosCompletados: 0,
          promedioGeneral: 0,
          mejorPuntaje: 0,
          totalIntentos: 0
        }
      }

      // Obtener juegos únicos completados
      const juegosUnicos = [...new Set(progreso.map(p => p.textId))]
      
      // Calcular promedio general
      const promedioGeneral = progreso.reduce((sum, p) => sum + p.score, 0) / progreso.length

      // Mejor puntaje
      const mejorPuntaje = Math.max(...progreso.map(p => p.score))

      return {
        totalJuegos: juegosUnicos.length,
        juegosCompletados: juegosUnicos.length,
        promedioGeneral: Math.round(promedioGeneral),
        mejorPuntaje,
        totalIntentos: progreso.length
      }
    } catch (error) {
      console.error('❌ Error al calcular estadísticas:', error)
      return {
        totalJuegos: 0,
        juegosCompletados: 0,
        promedioGeneral: 0,
        mejorPuntaje: 0,
        totalIntentos: 0
      }
    }
  }
}

/**
 * ============================================
 * FUNCIONES DE UTILIDAD
 * ============================================
 */

/**
 * Crea una instancia de GameManager para un jugador
 * @param {string} playerName - Nombre del jugador
 * @returns {GameManager} Instancia del gestor
 */
export function createGameManager(playerName) {
  return new GameManager(playerName)
}

/**
 * Valida que los datos del juego sean correctos
 * @param {Object} gameData - Datos del juego
 * @returns {boolean} true si es válido
 */
export function validateGameData(gameData) {
  try {
    const required = ['textId', 'gameId', 'correctAnswers', 'totalQuestions', 'score']
    return required.every(field => Object.prototype.hasOwnProperty.call(gameData, field))
  } catch (error) {
    return false
  }
}
