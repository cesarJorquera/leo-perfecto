// src/data/ruta/unidad1.js
// Unidad 1 de la ruta "Lector Experto": Las palabras.
// Solo datos (sin imports ni funciones). Los ids NO se cambian una vez que haya progreso guardado en Supabase.

export default {
  id: 'u1',
  titulo: 'Las palabras',
  descripcion: 'Descubre qué hace cada palabra en una frase.',

  // El orden del array es el orden del camino.
  // Bloquean al siguiente: aprende, practica y desafio. El opcional no bloquea.
  nodos: [
    { id: 'u1-n1', tipo: 'aprende', titulo: '¿Quién es? Los sustantivos', tareaId: 'u1-sustantivos' },
    { id: 'u1-n2', tipo: 'aprende', titulo: '¿Qué hace? Los verbos', tareaId: 'u1-verbos' },
    { id: 'u1-n3', tipo: 'practica', titulo: '¿Quién y qué hace?', tareaId: 'u1-practica1', pronto: true },
    { id: 'u1-n4', tipo: 'aprende', titulo: '¿Cómo es? Los adjetivos', tareaId: 'u1-adjetivos', pronto: true },
    { id: 'u1-n5', tipo: 'opcional', titulo: 'Detective de palabras', tareaId: 'u1-detective', pronto: true },
    { id: 'u1-n6', tipo: 'aprende', titulo: 'Palabras que unen: y, pero, porque', tareaId: 'u1-conectores', pronto: true },
    { id: 'u1-n7', tipo: 'practica', titulo: '¿Qué palabra falta?', tareaId: 'u1-practica2', pronto: true },
    { id: 'u1-n8', tipo: 'desafio', titulo: 'Desafío: Las palabras', tareaId: 'u1-desafio', pronto: true },
  ],

  tareas: {
    // ===================== SUSTANTIVOS =====================
    'u1-sustantivos': {
      id: 'u1-sustantivos',
      titulo: '¿Quién es? Los sustantivos',
      minutos: 4,
      pasos: [
        {
          id: 'u1-sustantivos-p1',
          tipo: 'explica',
          ejercicio: {
            texto: 'Un sustantivo es una palabra que sirve para nombrar: personas, animales, cosas y lugares. Por ejemplo: profesora, perro, celular, estadio. Los nombres propios, como Javiera o Melipilla, también son sustantivos.',
          },
        },
        {
          id: 'u1-sustantivos-p2',
          tipo: 'explica',
          ejercicio: {
            texto: 'En esta oración hay tres sustantivos: una persona, una cosa y un lugar.',
            palabras: ['Mi', 'amiga', 'dejó', 'la', 'mochila', 'en', 'el', 'casino', '.'],
            evidencia: [1, 4, 7], // 'amiga', 'mochila', 'casino'
          },
        },
        {
          id: 'u1-sustantivos-p3',
          tipo: 'tocar',
          conAyuda: true,
          ejercicio: {
            enunciado: 'Toca los 2 sustantivos.',
            palabras: ['Javiera', 'compró', 'audífonos', 'nuevos', '.'],
            correctas: [0, 2], // 'Javiera', 'audífonos'
            pista: 'Pregúntate: ¿quién compró? ¿Qué compró?',
          },
        },
        {
          id: 'u1-sustantivos-p4',
          tipo: 'elegir',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuál es el sustantivo en esta oración?',
            palabras: ['Hoy', 'llueve', 'mucho', 'en', 'Melipilla', '.'],
            opciones: ['llueve', 'mucho', 'Melipilla', 'Hoy'],
            correcta: 2, // 'Melipilla' (índice en opciones)
            evidencia: [4], // 'Melipilla' (índice en palabras)
            pista: 'Busca la palabra que nombra un lugar.',
          },
        },
        {
          id: 'u1-sustantivos-p5',
          tipo: 'vf',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Verdadero o falso?',
            afirmacion: '"Corre" es un sustantivo.',
            correcta: false,
            pista: '¿"Corre" nombra a alguien o algo, o dice lo que alguien hace?',
          },
        },
        {
          id: 'u1-sustantivos-p6',
          tipo: 'clasificar',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuáles de estas palabras son sustantivos?',
            cajas: [
              { id: 'sustantivo', titulo: 'Es sustantivo' },
              { id: 'otro', titulo: 'No es sustantivo' },
            ],
            fichas: [
              { texto: 'profesor', caja: 'sustantivo' },
              { texto: 'escribe', caja: 'otro' },
              { texto: 'computador', caja: 'sustantivo' },
              { texto: 'feliz', caja: 'otro' },
              { texto: 'Valparaíso', caja: 'sustantivo' },
              { texto: 'nunca', caja: 'otro' },
            ],
            pista: 'Por cada palabra pregúntate: ¿nombra una persona, un animal, una cosa o un lugar?',
          },
        },
        {
          id: 'u1-sustantivos-p7',
          tipo: 'escribir',
          conAyuda: false,
          ejercicio: {
            enunciado: 'Escribe el sustantivo que nombra un LUGAR.',
            palabras: ['Mañana', 'vamos', 'al', 'estadio', 'con', 'mi', 'primo', '.'],
            correcta: 3, // 'estadio'
            evidencia: [3],
          },
        },
        {
          id: 'u1-sustantivos-p8',
          tipo: 'resumen',
          ejercicio: {
            puntos: [
              'Los sustantivos nombran personas, animales, cosas y lugares.',
              'Para encontrarlos, pregunta: ¿quién? o ¿qué?',
              'Los nombres propios (Javiera, Melipilla) también son sustantivos y van con mayúscula.',
            ],
          },
        },
      ],
    },

    // ======================= VERBOS =======================
    'u1-verbos': {
      id: 'u1-verbos',
      titulo: '¿Qué hace? Los verbos',
      minutos: 4,
      pasos: [
        {
          id: 'u1-verbos-recordemos',
          tipo: 'vf',
          recordemos: true,
          conAyuda: true,
          ejercicio: {
            enunciado: 'Antes de empezar, repasemos los sustantivos.',
            afirmacion: '"Celular" es un sustantivo.',
            correcta: true,
            pista: 'Un sustantivo nombra una persona, un animal, una cosa o un lugar. ¿El celular es una cosa?',
          },
        },
        {
          id: 'u1-verbos-p1',
          tipo: 'explica',
          ejercicio: {
            texto: 'Un verbo es una palabra que dice lo que alguien HACE o lo que PASA. Por ejemplo: estudiar, comer, llegar, llover.',
          },
        },
        {
          id: 'u1-verbos-p2',
          tipo: 'explica',
          ejercicio: {
            texto: 'Mira esta oración. La palabra resaltada dice lo que hace mi hermana.',
            palabras: ['Mi', 'hermana', 'escucha', 'música', '.'],
            evidencia: [2], // 'escucha'
          },
        },
        {
          id: 'u1-verbos-p3',
          tipo: 'tocar',
          conAyuda: true,
          ejercicio: {
            enunciado: 'Toca el verbo.',
            palabras: ['El', 'bus', 'llega', 'a', 'las', 'ocho', '.'],
            correctas: [2], // 'llega'
            pista: '¿Qué hace el bus?',
          },
        },
        {
          id: 'u1-verbos-p4',
          tipo: 'elegir',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuál es el verbo en esta oración?',
            palabras: ['Diego', 'juega', 'fútbol', 'los', 'sábados', '.'],
            opciones: ['Diego', 'juega', 'fútbol', 'sábados'],
            correcta: 1, // 'juega' (índice en opciones)
            evidencia: [1], // 'juega' (índice en palabras)
            pista: 'El verbo es lo que Diego HACE.',
          },
        },
        {
          id: 'u1-verbos-p5',
          tipo: 'elegir',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuál es el verbo en esta oración?',
            palabras: ['Camila', 'estudia', 'en', 'la', 'biblioteca', '.'],
            opciones: ['Camila', 'biblioteca', 'estudia', 'en'],
            correcta: 2, // 'estudia' (índice en opciones)
            evidencia: [1], // 'estudia' (índice en palabras)
            pista: 'Pregúntate: ¿qué hace Camila?',
          },
        },
        {
          id: 'u1-verbos-clasificar',
          tipo: 'clasificar',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuáles de estas palabras son verbos?',
            cajas: [
              { id: 'verbo', titulo: 'Es verbo' },
              { id: 'otro', titulo: 'No es verbo' },
            ],
            fichas: [
              { texto: 'estudia', caja: 'verbo' },
              { texto: 'micro', caja: 'otro' },
              { texto: 'escucha', caja: 'verbo' },
              { texto: 'rápido', caja: 'otro' },
              { texto: 'trabaja', caja: 'verbo' },
              { texto: 'celular', caja: 'otro' },
            ],
            pista: 'Pregúntate por cada palabra: ¿es algo que alguien hace?',
          },
        },
        {
          id: 'u1-verbos-p6',
          tipo: 'escribir',
          conAyuda: false,
          ejercicio: {
            enunciado: 'Escribe el verbo de esta oración.',
            palabras: ['Mi', 'hermano', 'trabaja', 'en', 'un', 'taller', '.'],
            correcta: 2, // 'trabaja'
            evidencia: [2],
          },
        },
        {
          id: 'u1-verbos-p7',
          tipo: 'resumen',
          ejercicio: {
            puntos: [
              'Los verbos dicen lo que alguien hace o lo que pasa.',
              'Para encontrarlo, pregunta: ¿qué hace?',
            ],
          },
        },
      ],
    },
  },
}