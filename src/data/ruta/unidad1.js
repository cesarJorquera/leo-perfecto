// src/data/ruta/unidad1.js
// Unidad 1 de la ruta "Lector Experto": Las palabras.
// Solo datos (sin imports ni funciones). Los ids NO se cambian una vez que haya progreso guardado en Supabase.

export default {
  id: 'u1',
  titulo: 'Las palabras',
  descripcion: 'Descubre qué hace cada palabra en una frase.',

  // El orden del array es el orden del camino.
  nodos: [
    { id: 'u1-n1', tipo: 'aprende', titulo: '¿Quién es? Los sustantivos', tareaId: 'u1-sustantivos', pronto: true },
    { id: 'u1-n2', tipo: 'aprende', titulo: '¿Qué hace? Los verbos', tareaId: 'u1-verbos' },
    { id: 'u1-n3', tipo: 'practica', titulo: 'Practica lo aprendido', tareaId: 'u1-practica1', pronto: true },
    { id: 'u1-n4', tipo: 'opcional', titulo: 'Refuerzo de verbos', tareaId: 'u1-refuerzo1', pronto: true },
    { id: 'u1-n5', tipo: 'desafio', titulo: 'Desafío: Las palabras', tareaId: 'u1-desafio', pronto: true },
  ],

  tareas: {
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
            texto: 'Un verbo es una palabra que dice lo que alguien HACE. Por ejemplo: correr, comer, saltar.',
          },
        },
        {
          id: 'u1-verbos-p2',
          tipo: 'explica',
          ejercicio: {
            texto: 'Mira esta oración. La palabra resaltada dice lo que hace el gato.',
            palabras: ['El', 'gato', 'come', 'pescado', '.'],
            evidencia: [2], // 'come'
          },
        },
        {
          id: 'u1-verbos-p3',
          tipo: 'tocar',
          conAyuda: true,
          ejercicio: {
            enunciado: 'Toca el verbo.',
            palabras: ['El', 'perro', 'corre', 'en', 'el', 'parque', '.'],
            correctas: [2], // 'corre'
            pista: '¿Qué está haciendo el perro?',
          },
        },
        {
          id: 'u1-verbos-p4',
          tipo: 'elegir',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuál es el verbo en esta oración?',
            palabras: ['La', 'niña', 'salta', 'la', 'cuerda', '.'],
            opciones: ['niña', 'salta', 'cuerda', 'la'],
            correcta: 1, // 'salta' (índice en opciones)
            evidencia: [2], // 'salta' (índice en palabras)
            pista: 'El verbo es lo que la niña HACE.',
          },
        },
        {
          id: 'u1-verbos-p5',
          tipo: 'elegir',
          conAyuda: true,
          ejercicio: {
            enunciado: '¿Cuál es el verbo en esta oración?',
            palabras: ['Mi', 'abuela', 'lee', 'un', 'libro', '.'],
            opciones: ['abuela', 'libro', 'lee', 'un'],
            correcta: 2, // 'lee'
            evidencia: [2],
            pista: 'Pregúntate: ¿qué hace mi abuela?',
          },
        },
        {
          id: 'u1-verbos-p6',
          tipo: 'escribir',
          conAyuda: false,
          ejercicio: {
            enunciado: 'Escribe el verbo de esta oración.',
            palabras: ['Mi', 'hermano', 'trabaja', 'en', 'un', 'taller', '.'],
            correcta: 2, // 'trabaja' (índice en palabras)
            evidencia: [2],
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
          id: 'u1-verbos-p7',
          tipo: 'resumen',
          ejercicio: {
            puntos: [
              'Los verbos dicen lo que alguien hace.',
              'Para encontrarlo, pregunta: ¿qué hace?',
            ],
          },
        },
      ],
    },
  },
}