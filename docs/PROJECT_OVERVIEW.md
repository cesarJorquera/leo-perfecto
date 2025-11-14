# Leo Perfecto - Documentación del Proyecto

## 📋 Información General

**Nombre del Proyecto:** Leo Perfecto  
**Versión:** 0.9.0 (MVP - casi completo)  
**Framework:** Vue.js 3.2.13  
**Propósito:** Aplicación educativa para mejorar la comprensión lectora mediante juegos interactivos de identificación de palabras clave.  
**Estado:** En desarrollo activo - MVP para fin de mes (noviembre 2025)

---

## 🎯 Objetivos del Proyecto

### Objetivo Principal
Desarrollar una aplicación educativa que ayude a estudiantes a mejorar sus habilidades de comprensión lectora mediante la identificación y clasificación de palabras clave en textos.

### Objetivos Específicos
1. Enseñar a identificar sustantivos, verbos, adjetivos y conectores
2. Desarrollar comprensión lectora mediante juegos interactivos
3. Proporcionar feedback educativo inmediato
4. Gamificar el proceso de aprendizaje con mascota interactiva
5. Permitir seguimiento de progreso del estudiante con métricas detalladas
6. Integrar IA para recomendaciones personalizadas (pendiente)
7. Crear un tercer juego de comprensión global (pendiente)

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

```
Frontend:
├── Vue.js 3 (Composition API compatible)
├── Tailwind CSS (Diseño responsive)
├── Mitt (Event Bus para comunicación entre componentes)
└── Webpack (Vue CLI)

Configuración:
├── Babel (Transpilación)
├── ESLint (Linting)
├── PostCSS + Autoprefixer
└── Tailwind CSS PostCSS 7 compatible
```

### Estructura de Directorios

```
leo-perfecto/
├── public/                     # Archivos estáticos
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── assets/                 # Recursos (imágenes, estilos)
│   │   ├── animations.css      # Animaciones personalizadas
│   │   ├── main.css           # Estilos Tailwind
│   │   ├── icons/             # Iconos de la mascota
│   │   └── img/               # Imágenes del contenido
│   │
│   ├── components/            # Componentes Vue
│   │   ├── Navbar.vue         # Barra de navegación
│   │   ├── MiProgreso.vue     # Vista de progreso (mockup)
│   │   ├── mascota.vue        # Mascota interactiva con feedback
│   │   ├── pant_bienvenida.vue      # Pantalla de bienvenida
│   │   ├── pant_reglas_game1.vue    # Reglas del juego 1
│   │   ├── pant_texto_game1.vue     # Texto de referencia juego 1
│   │   ├── pant_game_1.vue          # Juego 1: Preguntas sobre palabras clave
│   │   ├── pant_reglas_game2.vue    # Reglas del juego 2
│   │   └── pant_game_2.vue          # Juego 2: Drag & Drop clasificación
│   │
│   ├── data/                  # Datos estáticos
│   │   └── quest_game_keyword.js    # Preguntas del juego 1
│   │
│   ├── utils/                 # Utilidades
│   │   └── eventBus.js        # Event Bus con Mitt
│   │
│   ├── App.vue                # Componente raíz
│   └── main.js                # Punto de entrada
│
├── docs/                      # Documentación
├── package.json               # Dependencias y scripts
├── babel.config.js            # Configuración Babel
├── tailwind.config.js         # Configuración Tailwind
├── vue.config.js              # Configuración Vue CLI
└── README.md                  # Información básica
```

---

## 🎮 Flujo de la Aplicación

### Diagrama de Flujo

```
┌─────────────────┐
│  Pantalla Intro │
│  (Ingreso nombre)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Bienvenida     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Reglas Game 1  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Texto Game 1   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Juego 1        │◄─────┐
│  (Preguntas)    │      │
└────────┬────────┘      │
         │               │
         ▼               │
┌─────────────────┐      │
│  Resultados     │──────┘
│  Game 1         │  Reintentar
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Reglas Game 2  │◄─────┐
└────────┬────────┘      │
         │               │
         ▼               │
┌─────────────────┐      │
│  Juego 2        │      │
│  (Drag & Drop)  │──────┘
└────────┬────────┘  Sin vidas
         │
         ▼
┌─────────────────┐
│  Fin / Restart  │
└─────────────────┘
```

### Navegación Adicional

```
Navbar (Disponible en todas las pantallas)
├── Mi Progreso (Modal con estadísticas mockup)
└── Mi Perfil (Placeholder)
```

---

## 🎯 Componentes Principales

### 1. **App.vue** (Componente Raíz)
- **Responsabilidad:** Gestión del estado global y enrutamiento
- **Estado:**
  - `currentScreen`: Pantalla actual
  - `playerName`: Nombre del jugador
  - `questions`: Preguntas del juego 1
  - `showProgreso`: Mostrar/ocultar modal de progreso
- **Métodos:** Navegación entre pantallas

### 2. **mascota.vue** (Mascota Interactiva)
- **Responsabilidad:** Proveer feedback educativo y ayuda
- **Características:**
  - Sistema de ayuda multi-mensaje (click para ciclar)
  - Feedback visual con animaciones
  - Mensajes contextuales según respuestas
  - Deshabilitado en Game 2 (solo feedback automático)
- **Event Bus:** Escucha eventos `answer-selected`

### 3. **pant_game_1.vue** (Juego de Preguntas)
- **Responsabilidad:** Quiz sobre identificación de palabras clave
- **Características:**
  - Barra de progreso
  - Sistema de puntuación
  - Feedback inmediato con explicaciones
  - Pantalla de resultados con estadísticas
- **Comunicación:** Emite eventos a través de Event Bus

### 4. **pant_game_2.vue** (Drag & Drop)
- **Responsabilidad:** Clasificar palabras arrastrándolas al texto
- **Características:**
  - Sistema de vidas (máximo 2 errores)
  - Barra de progreso
  - Contador de aciertos/errores
  - Sistema de pistas
  - Validación exacta (palabra específica por espacio)
  - Feedback visual inmediato
- **Estados:** Tracking de palabras colocadas y validación

### 5. **Navbar.vue** (Navegación)
- **Responsabilidad:** Barra de navegación superior
- **Acciones:**
  - Acceso a "Mi Progreso"
  - Placeholder "Mi Perfil"

### 6. **MiProgreso.vue** (Progreso)
- **Responsabilidad:** Mostrar estadísticas del jugador (MOCKUP)
- **Características:**
  - Resumen de juegos
  - Consejo IA (simulado)
  - Ranking de jugadores (datos estáticos)

---

## 📊 Gestión de Estado

### Estado Local vs Global

#### Estado Local (por componente)
- **pant_game_1.vue:** Índice pregunta actual, respuestas, puntaje
- **pant_game_2.vue:** Palabras disponibles, espacios, vidas, errores
- **mascota.vue:** Estado de animación, mensajes, tipo de mensaje activo

#### Estado Global (App.vue)
- `currentScreen`: Control de navegación
- `playerName`: Nombre del jugador
- `questions`: Array de preguntas (importado desde data)
- `showProgreso`: Visibilidad del modal

### Comunicación entre Componentes

#### Event Bus (mitt)
```javascript
// Ubicación: src/utils/eventBus.js
import mitt from 'mitt';
export const emitter = mitt();

// Uso en pant_game_1.vue
emitter.emit('answer-selected', {
  correct: true/false,
  explanation: 'texto',
  gameCompleted: true/false,
  allCorrect: true/false
});

// Escucha en mascota.vue
emitter.on('answer-selected', (payload) => {
  // Mostrar feedback
});
```

#### Props y Eventos (Parent-Child)
```javascript
// Parent → Child (Props)
<pant_game_1 
  :player-name="playerName"
  :questions="questions"
/>

// Child → Parent (Emits)
this.$emit('continue')
this.$emit('restart')
this.$emit('restart-game2')
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores (Tailwind)

```css
/* Principales */
- Azul: blue-400, blue-500, blue-600, blue-700
- Verde: green-300, green-400, green-500, green-600
- Púrpura: purple-400, purple-500, purple-600
- Rojo: red-300, red-400, red-500

/* Secundarios */
- Gris: gray-100 a gray-900
- Amarillo: yellow-300, yellow-400

/* Fondos */
- Gradientes: from-X-Y to-Z-W
- Fondo app: gradient-to-br from-blue-50 to-purple-50
```

### Animaciones Personalizadas

Ubicación: `src/assets/animations.css`

```css
- bounce-gentle: Animación suave de rebote (mascota feliz)
- wiggle: Movimiento de lado a lado (interacción)
- sad-shake: Temblor (mascota triste)
- pulse: Pulsación sutil
- celebrate-spin: Rotación celebratoria
```

### Componentes Reutilizables

```html
<!-- Botón primario -->
<button class="bg-gradient-to-r from-blue-500 to-green-600 
               text-white px-8 py-3 rounded-xl font-semibold 
               text-lg transition-all hover:shadow-lg hover:scale-105">
  Texto
</button>

<!-- Tarjeta -->
<div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
  Contenido
</div>

<!-- Barra de progreso -->
<div class="w-full bg-gray-200 rounded-full h-3">
  <div class="bg-gradient-to-r from-green-400 to-blue-500 
              h-3 rounded-full transition-all" 
       :style="{width: progreso + '%'}">
  </div>
</div>
```

---

## 📝 Convenciones de Código

### Nomenclatura

#### Componentes Vue
- **Formato:** PascalCase para archivos y nombres de componentes
- **Prefijos:**
  - `pant_`: Componentes de pantalla completa
  - Ninguno: Componentes reutilizables (Navbar, mascota)

#### Variables y Métodos
- **Formato:** camelCase
- **Ejemplos:**
  - Variables: `currentScreen`, `playerName`, `questionAnswered`
  - Métodos: `goToWelcome()`, `selectAnswer()`, `verificarFinJuego()`

#### Props y Emits
- **Props:** camelCase en JavaScript, kebab-case en template
```vue
<!-- Definición -->
props: {
  playerName: String,
  currentScreen: String
}

<!-- Uso -->
<component :player-name="playerName" />
```

- **Emits:** kebab-case
```javascript
this.$emit('restart-game2')
```

### Estructura de Componentes Vue

```vue
<template>
  <!-- HTML del componente -->
</template>

<script>
// Imports
import ComponenteX from './ComponenteX.vue'

export default {
  name: 'NombreComponente',
  components: { ComponenteX },
  props: { /* ... */ },
  data() {
    return { /* Estado local */ }
  },
  computed: { /* Propiedades computadas */ },
  methods: { /* Métodos */ },
  mounted() { /* Lifecycle hook */ },
  beforeUnmount() { /* Limpieza */ }
}
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
```

---

## 🔧 Scripts de Desarrollo

```json
{
  "serve": "vue-cli-service serve",      // Desarrollo (hot-reload)
  "build": "vue-cli-service build",      // Producción
  "lint": "vue-cli-service lint"         // Linting
}
```

### Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run serve
# → http://localhost:8080

# Producción
npm run build
# → Genera carpeta /dist

# Linting
npm run lint
```

---

## 📦 Dependencias

### Producción
```json
{
  "core-js": "^3.8.3",      // Polyfills ES6+
  "mitt": "^3.0.1",         // Event Bus ligero
  "vue": "^3.2.13"          // Framework Vue 3
}
```

### Desarrollo
```json
{
  "@babel/core": "^7.12.16",
  "@babel/eslint-parser": "^7.12.16",
  "@tailwindcss/postcss7-compat": "^2.2.17",
  "@vue/cli-plugin-babel": "~5.0.0",
  "@vue/cli-plugin-eslint": "~5.0.0",
  "@vue/cli-service": "~5.0.0",
  "autoprefixer": "^9.8.8",
  "eslint": "^7.32.0",
  "eslint-plugin-vue": "^8.0.3",
  "postcss": "^7.0.39",
  "tailwindcss": "npm:@tailwindcss/postcss7-compat@^2.2.17"
}
```

---

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

Genera:
- Carpeta `/dist` con archivos optimizados
- HTML minificado
- CSS y JS con hash para cache busting
- Assets optimizados

### Configuración de Hosting

#### Opciones Recomendadas
1. **Netlify / Vercel** (Recomendado para SPA)
2. **GitHub Pages**
3. **Firebase Hosting**
4. **Servidor tradicional (Apache/Nginx)**

#### Configuración SPA

Para que las rutas funcionen correctamente en producción, configurar fallback a `index.html`:

**Netlify:** Crear `public/_redirects`
```
/*    /index.html   200
```

**Vercel:** Crear `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📚 Próximos Pasos Recomendados

### Fase 1: Preparación para Escalabilidad
1. ✅ Documentar código existente (Este archivo)
2. 📝 Crear documentación de buenas prácticas
3. 🔍 Auditoría de seguridad y vulnerabilidades
4. 📋 Plan de migración a arquitectura escalable

### Fase 2: Refactorización (Ver REFACTORING_PLAN.md)
1. Implementar Vue Router para navegación
2. Implementar Pinia/Vuex para gestión de estado
3. Modularizar datos (textos, preguntas)
4. Crear servicios API (preparación para backend)

### Fase 3: Backend y Persistencia
1. Diseño de base de datos
2. API REST (Node.js + Express o similar)
3. Autenticación de usuarios
4. Sistema de progreso persistente

### Fase 4: Juego 3 y Expansión
1. Diseño del tercer juego
2. Sistema de múltiples textos por juego
3. Sistema de puntos y ranking real
4. Dashboard de administración

---

## 📞 Contacto y Mantenimiento

**Última actualización:** Octubre 2025  
**Versión de documentación:** 1.0.0  
**Mantenedor:** [Tu nombre/equipo]

---

**Ver también:**
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Buenas prácticas y evaluación
- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) - Auditoría de seguridad
- [REFACTORING_PLAN.md](./REFACTORING_PLAN.md) - Plan de refactorización
- [API_DESIGN.md](./API_DESIGN.md) - Diseño de API backend
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Esquema de base de datos
