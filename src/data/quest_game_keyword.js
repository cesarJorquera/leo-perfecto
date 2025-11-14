/**
 * Preguntas para el Juego 1 - Identificación de Palabras Clave
 * 
 * Cada pregunta está agrupada por textId (debe coincidir con IDs en game1_texts.js)
 * 
 * Estructura de cada pregunta:
 * - question: texto de la pregunta
 * - word: palabra clave sobre la que se pregunta
 * - options: array de 4 opciones
 * - correct: respuesta correcta (debe estar en options)
 * - explanation: explicación de por qué es correcta
 * 
 * Para agregar preguntas a un nuevo texto:
 * 1. Agrega una nueva clave con el textId (ej: 'text3')
 * 2. Crea un array con al menos 3-5 preguntas
 * 3. Asegúrate de que las palabras coincidan con las del texto
 */

export const questionsByText = {
  text1: [
    {
      question: 'En el texto, ¿qué tipo de palabra clave representa "Harry Potter"?',
      word: 'Harry Potter',
      options: ['Un conector', 'Un sustantivo', 'Un verbo', 'Un adjetivo'],
      correct: 'Un sustantivo',
      explanation: 'Los sustantivos son nombres de personas, lugares o cosas. "Harry Potter" es el nombre de una persona.'
    },
    {
      question: 'En el texto, ¿qué representa la palabra en negrita "aunque"?',
      word: 'aunque',
      options: ['Un conector', 'Un sustantivo', 'Un verbo', 'Un adjetivo'],
      correct: 'Un conector',
      explanation: 'Los conectores unen ideas o frases. "Aunque" conecta dos partes de la oración.'
    },
    {
      question: 'En el texto, ¿qué representa la palabra en negrita "sabían"?',
      word: 'sabían',
      options: ['Un conector', 'Un sustantivo', 'Un verbo', 'Un adjetivo'],
      correct: 'Un verbo',
      explanation: 'Los verbos indican acciones o estados. "sabían" expresa la convicción que tenían para completar la misión.'
    },
    {
      question: 'En el texto, ¿qué representa la palabra "pero"?',
      word: 'pero',
      options: ['Un conector', 'Un sustantivo', 'Un verbo', 'Un adjetivo'],
      correct: 'Un conector',
      explanation: 'Los conectores unen ideas. "Pero" conecta dos ideas contrastantes.'
    },
    {
      question: 'En el texto, ¿qué representa "difícil"?',
      word: 'difícil',
      options: ['Un conector', 'Un sustantivo', 'Un verbo', 'Un adjetivo'],
      correct: 'Un adjetivo',
      explanation: 'Un adjetivo es una palabra que describe o califica a un sustantivo. En este caso, "difícil" describe la tarea.'
    }
  ],
  text2: [
    {
      question: 'En el texto, ¿qué tipo de palabra representa "Sam"?',
      word: 'Sam',
      options: ['Un verbo', 'Un sustantivo', 'Un adjetivo', 'Un conector'],
      correct: 'Un sustantivo',
      explanation: 'Los sustantivos son nombres de personas, lugares o cosas. "Sam" es el nombre de un personaje, por lo tanto es un sustantivo.'
    },
    {
      question: '¿Qué tipo de palabra es "Anillo"?',
      word: 'Anillo',
      options: ['Un conector', 'Un verbo', 'Un sustantivo', 'Un adjetivo'],
      correct: 'Un sustantivo',
      explanation: 'Los sustantivos nombran objetos, seres o conceptos. "Anillo" es un objeto mágico en la historia.'
    },
    {
      question: '¿Qué representa "sintiendo" en el texto?',
      word: 'sintiendo',
      options: ['Un sustantivo', 'Un adjetivo', 'Un conector', 'Un verbo'],
      correct: 'Un verbo',
      explanation: 'Los verbos indican acciones, estados o procesos. "Sintiendo" expresa la acción de percibir o experimentar algo.'
    },
    {
      question: '¿Qué tipo de palabra es "oscuros"?',
      word: 'oscuros',
      options: ['Un verbo', 'Un sustantivo', 'Un adjetivo', 'Un conector'],
      correct: 'Un adjetivo',
      explanation: 'Los adjetivos describen o califican a los sustantivos. "Oscuros" describe cómo son los caminos de Mordor.'
    },
    {
      question: '¿Qué conecta la palabra "pero" en el texto?',
      word: 'pero',
      options: ['2 sustantivos', '2 verbos', '2 adjetivos', '2 ideas'],
      correct: '2 adjetivos',
      explanation: 'Los conectores unen elementos de la oración. "Pero" conecta dos adjetivos: "agotado" y "firme", que describen el estado de Sam. Es un conector de contraste.'
    }
  ]
}

/**
 * Obtener preguntas por textId
 * @param {string} textId - ID del texto
 * @returns {array} - Array de preguntas o array vacío si no existe
 */
export function getQuestionsByTextId(textId) {
  return questionsByText[textId] || []
}

/**
 * LEGACY: Export para mantener compatibilidad (text1 por defecto)
 * @deprecated Usa getQuestionsByTextId() en su lugar
 */
export const questions = questionsByText.text1