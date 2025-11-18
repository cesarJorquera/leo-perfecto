# 📚 Leo Perfecto - Aplicación Educativa de Comprensión Lectora

<div align="center">

**Aplicación educativa interactiva para mejorar la comprensión lectora mediante juegos gamificados**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-brightgreen.svg)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-2.2.17-blue.svg)](https://tailwindcss.com/)

</div>

---

## 🎯 ¿Qué es Leo Perfecto?

Leo Perfecto es una aplicación educativa que enseña a identificar y clasificar **palabras clave** en textos (sustantivos, verbos, adjetivos, conectores) mediante **dos juegos interactivos**:

- **Juego 1:** Preguntas de opción múltiple sobre identificación de palabras clave
- **Juego 2:** Drag & drop para completar textos con palabras categorizadas

La aplicación incluye:
- 🎮 Sistema de progreso con localStorage
- 🤖 Mascota interactiva con feedback educativo
- 📊 Dashboard de progreso con métricas y logros
- 🎨 Diseño responsive y profesional con Tailwind CSS

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js >= 14.x
- npm >= 6.x

### Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/leo-perfecto.git
cd leo-perfecto

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run serve
```

La aplicación estará disponible en `http://localhost:8080`

### Build de Producción

```bash
npm run build
```

Genera carpeta `dist/` lista para desplegar.

---

## 📁 Estructura del Proyecto

```
leo-perfecto/
├── docs/                       # 📚 Documentación
│   ├── PROJECT_OVERVIEW.md     # Arquitectura completa
│   ├── BEST_PRACTICES.md       # Evaluación y mejoras
│   ├── AGREGAR_TEXTOS.md       # Cómo agregar contenido
│   └── GUIA_DISENO_PROFESIONAL.md  # Guía de diseño
│
├── public/                     # Archivos estáticos
├── src/
│   ├── assets/                # Imágenes, estilos, animaciones
│   ├── components/            # Componentes Vue
│   │   ├── MiProgreso.vue    # Dashboard de progreso
│   │   ├── mascota.vue       # Asistente virtual
│   │   ├── pant_game_1.vue   # Juego 1: Preguntas
│   │   └── pant_game_2.vue   # Juego 2: Drag & Drop
│   ├── data/                 # Datos estáticos
│   │   ├── game1_texts.js    # Textos literarios
│   │   └── quest_game_keyword.js  # Preguntas
│   ├── utils/                # Utilidades
│   │   └── eventBus.js       # Event bus (mitt)
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada
│
├── netlify.toml              # Configuración de deploy
├── package.json
└── README.md
```

---

## 🎮 Características Actuales

### ✅ Implementado

- **Juego 1 (Preguntas):** Sistema de preguntas con feedback inmediato y explicaciones educativas
- **Juego 2 (Drag & Drop):** Clasificación de palabras con sistema de vidas y validación exacta
- **Sistema de Progreso:** Persistencia en localStorage con métricas y estadísticas
- **Dashboard Completo:** Niveles, barra de progreso, logros, racha y análisis de fortalezas/debilidades
- **Mascota Interactiva:** Asistente con ayuda progresiva y feedback contextual
- **Sistema de Sonidos:** Web Audio API para feedback auditivo
- **Diseño Responsive:** Funciona en móvil, tablet y desktop
- **Navegación Inteligente:** Auto-refresh del dashboard después de juegos

### � Pendiente (Próximas Semanas)

- **Integración IA:** Recomendaciones personalizadas con OpenAI/Gemini
- **Juego 3:** Sistema de comprensión global y análisis crítico
- **Backend:** API REST con autenticación y base de datos
- **Vue Router:** Sistema de rutas profesional
- **Pinia:** Store centralizado para gestión de estado
- **Testing:** Tests unitarios y E2E

---

## 📊 Estado del Proyecto

**Versión Actual:** 0.9.0 (MVP - casi completo)

| Componente | Estado | Prioridad |
|------------|--------|-----------|
| Juego 1 (Preguntas) | ✅ Completo | - |
| Juego 2 (Drag & Drop) | ✅ Completo | - |
| Sistema de Progreso | ✅ Completo | - |
| Dashboard Avanzado | ✅ Completo | - |
| Mascota con Feedback | ✅ Completo | - |
| UI Responsive | ✅ Completo | - |
| **Integración IA** | ⏳ Pendiente | 🔴 Alta |
| **Juego 3** | ⏳ Pendiente | 🔴 Alta |
| Vue Router | ❌ Futuro | 🟡 Media |
| Backend + DB | ❌ Futuro | 🟡 Media |
| Testing | ❌ Futuro | 🟢 Baja |

**Plazo MVP:** Fin de mes (noviembre 2025)

---

## �️ Stack Tecnológico

- **Framework:** Vue.js 3.2.13 (Options API)
- **Estilos:** Tailwind CSS 2.2.17
- **Build:** Vue CLI 5.0
- **Event Bus:** Mitt 3.0.1
- **Audio:** Web Audio API (sin dependencias externas)
- **Persistencia:** localStorage (preparado para migración a backend)

---

## 📚 Documentación

| Documento | Propósito | Audiencia |
|-----------|-----------|-----------|
| [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | Arquitectura y estructura completa | Todos los desarrolladores |
| [BEST_PRACTICES.md](./docs/BEST_PRACTICES.md) | Evaluación de código y mejoras | Desarrolladores senior |
| [AGREGAR_TEXTOS.md](./docs/AGREGAR_TEXTOS.md) | Cómo agregar contenido nuevo | Creadores de contenido |
| [GUIA_DISENO_PROFESIONAL.md](./docs/GUIA_DISENO_PROFESIONAL.md) | Paleta de colores y UI/UX | Diseñadores |

---

## 🚀 Deploy a Netlify

El proyecto incluye `netlify.toml` configurado para deploy automático.

### Opción 1: Netlify UI (Drag & Drop)

```bash
npm run build
# Arrastra carpeta dist/ a https://app.netlify.com/drop
```

### Opción 2: Desde GitHub (Recomendado)

1. Sube el proyecto a GitHub
2. Conecta el repositorio en Netlify
3. Configuración automática desde `netlify.toml`
4. Deploy automático en cada push

### Opción 3: Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

---

## 🤝 Contribución

### Para Agregar Contenido

1. Lee [AGREGAR_TEXTOS.md](./docs/AGREGAR_TEXTOS.md)
2. Agrega texto en `src/data/game1_texts.js`
3. Agrega preguntas en `src/data/quest_game_keyword.js`
4. Prueba localmente con `npm run serve`

### Para Desarrolladores

1. Lee [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)
2. Revisa [BEST_PRACTICES.md](./docs/BEST_PRACTICES.md)
3. Sigue convenciones de código existentes
4. Crea PR con descripción clara

---

## � Contacto

- **Desarrollador:** Cesar
- **Proyecto:** Aplicación educativa Leo Perfecto
- **Fecha límite MVP:** Fin de noviembre 2025

---

## � Próximos Pasos Inmediatos

1. ✅ Subir proyecto a GitHub
2. ✅ Deploy a Netlify
3. ⏳ Integrar IA (OpenAI/Gemini)
4. ⏳ Desarrollar Juego 3
5. ⏳ Testing con usuarios reales

---

<div align="center">

**Hecho con ❤️ para mejorar la comprensión lectora**

</div>
