# 📚 Guía para Agregar Más Textos a Leo Perfecto

Esta guía te enseñará cómo agregar nuevos textos a **ambos juegos** de forma rápida y sencilla.

---

## 🗂️ Estructura de Archivos

```
src/
├── data/
│   ├── game1_texts.js         # Textos para Juego 1 (Palabras Clave)
│   ├── quest_game_keyword.js  # Preguntas para Juego 1
│   └── game2_texts.js         # Textos para Juego 2 (Drag & Drop)
└── components/
    ├── pant_game_1.vue        # Componente del Juego 1
    └── pant_game_2.vue        # Componente del Juego 2
```

---

## 🎯 Juego 1: Identificación de Palabras Clave

### Paso 1: Agregar el Texto en `game1_texts.js`

```javascript
export const game1Texts = {
  // ... textos existentes ...
  
  text3: {  // ⚠️ Usa un ID único (text3, text4, etc.)
    id: 'text3',
    title: 'Tu Título Aquí',
    content: `
      Tu texto aquí con <strong>palabras</strong> clave <strong>resaltadas</strong> en negrita.
      Usa <strong> y </strong> para resaltar las palabras importantes.
    `
  }
}
```

### Paso 2: Agregar Preguntas en `quest_game_keyword.js`

```javascript
export const questionsByText = {
  // ... preguntas existentes ...
  
  text3: [  // ⚠️ Usa el mismo ID que el texto
    {
      question: '¿Qué tipo de palabra es "ejemplo"?',
      word: 'ejemplo',  // La palabra sobre la que preguntas
      options: ['Un conector', 'Un sustantivo', 'Un verbo', 'Un adjetivo'],
      correct: 'Un sustantivo',  // ⚠️ Debe estar en options
      explanation: 'Los sustantivos son nombres de cosas, personas o lugares.'
    },
    // Agrega al menos 3-5 preguntas por texto
  ]
}
```

### ✅ Tipos de Palabras para Juego 1:
- **Un sustantivo**: Personas, lugares, objetos (Harry, casa, libro)
- **Un verbo**: Acciones o estados (correr, saltar, ser)
- **Un adjetivo**: Descripciones (grande, rápido, difícil)
- **Un conector**: Une ideas (pero, aunque, sin embargo)

---

## 🎮 Juego 2: Clasificar Palabras (Drag & Drop)

### Paso 1: Agregar el Texto con Palabras en `game2_texts.js`

```javascript
export const game2Texts = {
  // ... textos existentes ...
  
  drag3: {  // ⚠️ Usa un ID único (drag3, drag4, etc.)
    id: 'drag3',
    title: 'Tu Título Aquí',
    palabrasPorTipo: {
      verbos: [
        { id: 30, texto: "correr", tipo: "verbo", colocada: false },
        { id: 31, texto: "saltar", tipo: "verbo", colocada: false }
        // ⚠️ Usa IDs únicos para cada palabra (30, 31, 32...)
      ],
      sustantivos: [
        { id: 32, texto: "casa", tipo: "sustantivo", colocada: false },
        { id: 33, texto: "libro", tipo: "sustantivo", colocada: false }
      ],
      conectores: [
        { id: 34, texto: "pero", tipo: "conector", colocada: false }
      ],
      adjetivos: [
        { id: 35, texto: "grande", tipo: "adjetivo", colocada: false }
      ]
    },
    espaciosTexto: [
      { tipo: 'texto', texto: 'El ' },
      { tipo: 'espacio', tipoRequerido: 'sustantivo', palabraColocada: null, palabraCorrectaId: 32 },
      { tipo: 'texto', texto: ' es ' },
      { tipo: 'espacio', tipoRequerido: 'adjetivo', palabraColocada: null, palabraCorrectaId: 35 },
      { tipo: 'texto', texto: '.' }
      // ⚠️ palabraCorrectaId debe coincidir con el id de la palabra
    ]
  }
}
```

### ⚠️ IMPORTANTE para Juego 2:

1. **IDs únicos**: Cada palabra debe tener un ID único en todo el archivo
2. **palabraCorrectaId**: Debe coincidir exactamente con el ID de la palabra
3. **Balance de palabras**: Intenta tener al menos 2-3 palabras de cada tipo
4. **Tipos válidos**: verbo, sustantivo, conector, adjetivo

### 🔍 Ejemplo de cómo contar IDs:

Si el último ID usado es 26, empieza desde 27:
```javascript
{ id: 27, texto: "palabra1", tipo: "verbo", colocada: false },
{ id: 28, texto: "palabra2", tipo: "sustantivo", colocada: false },
// etc...
```

---

## 🧪 Verificar que Todo Funciona

1. **Guarda todos los archivos**
2. **La aplicación se recargará automáticamente**
3. **Ve a "Mi Progreso"** y busca tu nuevo texto
4. **Juega** y verifica que todo funciona correctamente

---

## 🐛 Solución de Problemas

### ❌ "Texto no encontrado"
- Verifica que el ID del texto sea único
- Asegúrate de usar el mismo ID en ambos archivos (texto y preguntas para Juego 1)

### ❌ "Palabra no se coloca en el espacio" (Juego 2)
- Verifica que `palabraCorrectaId` coincida con el `id` de la palabra
- Revisa que no haya IDs duplicados

### ❌ "No aparece el nuevo texto"
- Refresca el navegador (Ctrl + F5)
- Verifica que guardaste todos los archivos
- Revisa la consola del navegador para ver errores

---

## 📋 Checklist al Agregar un Texto

### Para Juego 1:
- [ ] Texto agregado en `game1_texts.js` con ID único
- [ ] Palabras clave resaltadas con `<strong>`
- [ ] Al menos 3-5 preguntas en `quest_game_keyword.js`
- [ ] Cada pregunta tiene 4 opciones
- [ ] La respuesta correcta está en las opciones
- [ ] Probado en el juego

### Para Juego 2:
- [ ] Texto agregado en `game2_texts.js` con ID único
- [ ] Todas las palabras tienen IDs únicos
- [ ] Palabras clasificadas por tipo correctamente
- [ ] espaciosTexto tiene palabraCorrectaId válidos
- [ ] Balance de tipos de palabras (2-4 de cada tipo)
- [ ] Probado en el juego

---

## 💡 Consejos

1. **Empieza simple**: Crea un texto corto para probar
2. **Copia y modifica**: Usa textos existentes como plantilla
3. **Prueba frecuentemente**: Verifica cada cambio
4. **Mantén balance**: Similar cantidad de cada tipo de palabra
5. **Usa historias conocidas**: Los estudiantes aprenden mejor con contenido familiar

---

## 🎓 Ejemplos de Buenos Textos

### Textos apropiados:
- Fragmentos de libros conocidos (Harry Potter, El Señor de los Anillos)
- Historias infantiles (Caperucita, Los Tres Cerditos)
- Hechos históricos importantes
- Textos educativos sobre ciencias

### Evitar:
- Textos muy largos (máximo 100-150 palabras)
- Demasiadas palabras técnicas
- Oraciones muy complejas para el nivel educativo

---

## 📝 Ejemplo Completo para Juego 1

### Archivo: `game1_texts.js`
```javascript
text4: {
  id: 'text4',
  title: 'Los Dinosaurios',
  content: `
    Los <strong>dinosaurios</strong> <strong>vivieron</strong> hace millones de <strong>años</strong>. 
    <strong>Aunque</strong> ya no <strong>existen</strong>, los <strong>científicos</strong> <strong>estudian</strong> 
    sus <strong>fósiles</strong> para <strong>aprender</strong> más sobre ellos.
  `
}
```

### Archivo: `quest_game_keyword.js`
```javascript
text4: [
  {
    question: '¿Qué tipo de palabra es "dinosaurios"?',
    word: 'dinosaurios',
    options: ['Un verbo', 'Un sustantivo', 'Un adjetivo', 'Un conector'],
    correct: 'Un sustantivo',
    explanation: 'Los sustantivos nombran seres vivos, objetos o conceptos.'
  },
  {
    question: '¿Qué representa "vivieron"?',
    word: 'vivieron',
    options: ['Un sustantivo', 'Un verbo', 'Un adjetivo', 'Un conector'],
    correct: 'Un verbo',
    explanation: 'Los verbos indican acciones o estados.'
  },
  {
    question: '¿Qué tipo de palabra es "aunque"?',
    word: 'aunque',
    options: ['Un verbo', 'Un sustantivo', 'Un conector', 'Un adjetivo'],
    correct: 'Un conector',
    explanation: 'Los conectores unen ideas contrastantes.'
  }
]
```

---

¿Necesitas ayuda? Revisa los ejemplos en los archivos de datos o pide asistencia. 🚀
