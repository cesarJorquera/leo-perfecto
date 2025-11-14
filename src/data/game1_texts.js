/**
 * Textos para el Juego 1 - Identificación de Palabras Clave
 * 
 * Cada texto tiene:
 * - id: identificador único
 * - title: título descriptivo
 * - content: contenido HTML con palabras clave en <strong>
 * - difficulty: 'facil', 'medio', 'dificil'
 * - keywords: array de palabras destacadas (para referencia)
 * 
 * Para agregar un nuevo texto:
 * 1. Copia la estructura de un texto existente
 * 2. Asigna un nuevo id único (ej: 'text3', 'text4')
 * 3. Escribe el contenido con palabras clave en <strong>
 * 4. Agrega las preguntas correspondientes en game1_questions.js
 */

export const game1Texts = [
  {
    id: 'text1',
    title: 'Harry Potter y la Misión',
    difficulty: 'facil',
    content: `
      <strong>Harry Potter</strong> caminaba por el pasillo de <strong>Hogwarts</strong>, mirando con asombro los retratos que hablaban. 
      <strong>Hermione y Ron</strong> lo seguían, y <strong>aunque</strong> tenían miedo de lo que pudieran encontrar, <strong>sabían</strong> que no podían <strong>dejar</strong>
      la <strong>misión</strong> a medio hacer. El <strong>director</strong> les había dado una tarea muy <strong>difícil</strong>, <strong>pero</strong> estaban decididos a <strong>cumplirla</strong>.
    `,
    keywords: ['Harry Potter', 'Hogwarts', 'Hermione y Ron', 'aunque', 'sabían', 'dejar', 'misión', 'director', 'difícil', 'pero', 'cumplirla']
  },
  {
    id: 'text2',
    title: 'Frodo y el Anillo',
    difficulty: 'medio',
    content: `
      Frodo avanzaba con paso incierto por los <strong>oscuros</strong> caminos de Mordor, <strong>sintiendo</strong> el peso del <strong>Anillo</strong> colgando de su cuello. 
      A su lado, <strong>Sam</strong> lo seguía, agotado <strong>pero</strong> firme, decidido a no abandonar a su amigo. 
      A lo lejos, el Monte del Destino brillaba con un fuego que parecía devorar el cielo. 
      Sabían que el final estaba cerca, y aunque el miedo los acompañaba, también lo hacía la esperanza de liberar a la Tierra Media del mal.
    `,
    keywords: ['oscuros', 'Anillo', 'Sam', 'pero', 'sintiendo']
  }
]

/**
 * Obtener texto por ID
 * @param {string} textId - ID del texto
 * @returns {object|null} - Objeto del texto o null si no existe
 */
export function getTextById(textId) {
  return game1Texts.find(t => t.id === textId) || null
}

/**
 * Obtener todos los IDs de textos disponibles
 * @returns {string[]} - Array de IDs
 */
export function getAllTextIds() {
  return game1Texts.map(t => t.id)
}

/**
 * Obtener el siguiente texto después del ID dado
 * @param {string} currentTextId - ID del texto actual
 * @returns {object|null} - Siguiente texto o null si es el último
 */
export function getNextText(currentTextId) {
  const currentIndex = game1Texts.findIndex(t => t.id === currentTextId)
  if (currentIndex === -1 || currentIndex === game1Texts.length - 1) {
    return null
  }
  return game1Texts[currentIndex + 1]
}
