# Guía para Desarrolladores: Agregar Nuevos Textos al Juego 1

## 📖 Descripción General

El **Juego 1** (Identificación de Palabras Clave) ahora es completamente modular y escalable. Los textos y preguntas están separados en archivos de datos, lo que permite agregar fácilmente nuevo contenido sin tocar el código de los componentes.

## 🗂️ Estructura de Archivos

```
src/
├── data/
│   ├── game1_texts.js         # Textos con contenido HTML
│   └── quest_game_keyword.js  # Preguntas agrupadas por texto
└── components/
    └── pant_game_1.vue        # Componente del juego (no editar)
```

---

## ➕ Cómo Agregar un Nuevo Texto

### Paso 1: Agregar el Texto en `game1_texts.js`

Abre `src/data/game1_texts.js` y agrega un nuevo objeto al array `game1Texts`:

```javascript
export const game1Texts = [
  // ...textos existentes...
  {
    id: 'text3',  // ID único (debe ser único, ej: text3, text4, etc.)
    title: 'El Sistema Solar',  // Título descriptivo
    difficulty: 'medio',  // 'facil', 'medio' o 'dificil'
    content: `
      El <strong>sistema solar</strong> está formado por el <strong>Sol</strong> y todos los <strong>cuerpos celestes</strong> que <strong>orbitan</strong> a su alrededor.
      Los <strong>planetas</strong> más cercanos son <strong>Mercurio</strong> y <strong>Venus</strong>, <strong>mientras</strong> que los más lejanos son <strong>Neptuno</strong> y <strong>Urano</strong>.
    `,
    keywords: ['sistema solar', 'Sol', 'cuerpos celestes', 'orbitan', 'planetas', 'Mercurio', 'Venus', 'mientras', 'Neptuno', 'Urano']
  }
]
```

**⚠️ Importante:**
- Usa `<strong>` para marcar las palabras clave en el contenido
- El `id` debe ser único y seguir el patrón `textN` (text3, text4, etc.)
- Las palabras en `keywords` son solo para referencia, no afectan el funcionamiento

---

### Paso 2: Agregar Preguntas en `quest_game_keyword.js`

Abre `src/data/quest_game_keyword.js` y agrega las preguntas correspondientes:

```javascript
export const questionsByText = {
  // ...textos existentes...
  text3: [  // Mismo ID del texto
    {
      question: '¿Qué tipo de palabra es "sistema solar"?',
      word: 'sistema solar',
      options: ['Un verbo', 'Un sustantivo', 'Un conector', 'Un adjetivo'],
      correct: 'Un sustantivo',
      explanation: 'Los sustantivos son nombres de cosas, lugares o conceptos. "Sistema solar" es un concepto científico.'
    },
    {
      question: '¿Qué representa "orbitan" en el texto?',
      word: 'orbitan',
      options: ['Un sustantivo', 'Un verbo', 'Un adjetivo', 'Un conector'],
      correct: 'Un verbo',
      explanation: 'Los verbos indican acciones o estados. "Orbitan" es la acción que realizan los cuerpos celestes.'
    },
    // Agrega al menos 3-5 preguntas por texto
  ]
}
```

**⚠️ Importante:**
- Cada pregunta debe tener exactamente 4 opciones
- La respuesta `correct` debe estar incluida en el array `options`
- Agrega al menos 3-5 preguntas para que el juego sea interesante

---

## ✅ Tipos de Palabras Clave

Las preguntas deben identificar uno de estos cuatro tipos:

| Tipo | Definición | Ejemplos |
|------|------------|----------|
| **Sustantivo** | Nombre de persona, lugar, cosa o idea | Harry Potter, agua, libro, libertad |
| **Verbo** | Acción, estado o proceso | correr, sabían, evapora, orbitan |
| **Adjetivo** | Describe o califica un sustantivo | difícil, grande, natural, rápido |
| **Conector** | Une ideas o frases | pero, aunque, cuando, finalmente |

---

## 🎯 Buenas Prácticas

### ✅ Hacer:
- Usar textos cortos y claros (2-4 oraciones)
- Marcar entre 8-15 palabras clave con `<strong>`
- Incluir variedad de tipos de palabras (sustantivos, verbos, conectores, adjetivos)
- Escribir explicaciones claras y educativas
- Probar el texto completo antes de agregarlo

### ❌ Evitar:
- Textos muy largos o complejos
- Usar el mismo `id` dos veces
- Olvidar agregar las preguntas correspondientes
- Preguntas con respuestas ambiguas
- Menos de 3 preguntas por texto

---

## 🧪 Cómo Probar tu Nuevo Texto

1. Guarda los cambios en `game1_texts.js` y `quest_game_keyword.js`
2. Ejecuta la app con `npm run serve`
3. Completa el primer texto (text1 o text2)
4. El sistema automáticamente preguntará si quieres continuar con el siguiente texto
5. Verifica que:
   - El título se muestra correctamente
   - Las palabras en `<strong>` aparecen resaltadas
   - Todas las preguntas funcionan
   - Las explicaciones son claras

---

## 🔄 Flujo del Juego

```
Usuario completa Text1
    ↓
Sistema pregunta: "¿Quieres practicar con otro texto?"
    ↓
Sí → Carga Text2 → Usuario completa → Pregunta de nuevo
    ↓
No → Avanza al Juego 2
```

---

## 📝 Ejemplo Completo

### Archivo: `game1_texts.js`
```javascript
{
  id: 'text4',
  title: 'Los Dinosaurios',
  difficulty: 'facil',
  content: `
    Los <strong>dinosaurios</strong> <strong>vivieron</strong> hace millones de <strong>años</strong>. 
    <strong>Aunque</strong> ya no <strong>existen</strong>, los <strong>científicos</strong> <strong>estudian</strong> sus <strong>fósiles</strong> para <strong>aprender</strong> más sobre ellos.
  `,
  keywords: ['dinosaurios', 'vivieron', 'años', 'Aunque', 'existen', 'científicos', 'estudian', 'fósiles', 'aprender']
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
    explanation: 'Los sustantivos nombran seres vivos, objetos o conceptos. "Dinosaurios" son seres vivos del pasado.'
  },
  {
    question: '¿Qué representa "vivieron"?',
    word: 'vivieron',
    options: ['Un sustantivo', 'Un verbo', 'Un adjetivo', 'Un conector'],
    correct: 'Un verbo',
    explanation: 'Los verbos indican acciones o estados. "Vivieron" es la acción de estar vivo en el pasado.'
  },
  {
    question: '¿Qué tipo de palabra es "aunque"?',
    word: 'aunque',
    options: ['Un verbo', 'Un sustantivo', 'Un conector', 'Un adjetivo'],
    correct: 'Un conector',
    explanation: 'Los conectores unen ideas. "Aunque" une dos ideas contrastantes.'
  }
]
```

---

## 🆘 Solución de Problemas

### Problema: El texto no aparece
- Verifica que el `id` en `game1_texts.js` coincide con la clave en `quest_game_keyword.js`
- Asegúrate de que no hay errores de sintaxis (comas, comillas, etc.)

### Problema: Las preguntas no se cargan
- Revisa que la clave en `questionsByText` es exactamente igual al `id` del texto
- Verifica que todas las preguntas tienen la estructura correcta

### Problema: Las palabras no aparecen en negrita
- Asegúrate de usar `<strong>` y no `<b>` o markdown (`**`)
- Verifica que cerraste correctamente las etiquetas: `<strong>palabra</strong>`

---

## 🚀 Próximos Pasos

Con esta estructura modular, puedes:
- Agregar textos de cualquier temática (historia, ciencia, literatura, etc.)
- Crear niveles de dificultad progresivos
- Traducir textos a otros idiomas
- Integrar con un CMS o base de datos en el futuro

¡Feliz desarrollo! 🎉
