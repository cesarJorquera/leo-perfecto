# 📚 Leo Perfecto - Plataforma Educativa de Comprensión Lectora

<div align="center">

**Aplicación educativa interactiva para mejorar la comprensión lectora mediante juegos gamificados**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-brightgreen.svg)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-2.2.17-blue.svg)](https://tailwindcss.com/)
[![Netlify Status](https://img.shields.io/badge/Deployed%20on-Netlify-00c7b7.svg)](https://netlify.com/)
[![License](https://img.shields.io/badge/License-Academic-blue.svg)](LICENSE)

[Demo en Vivo](https://leo-perfecto.netlify.app) | [Documentación](./docs/README.md) | [Reportar Bug](https://github.com/cesarJorquera/leo-perfecto/issues)

</div>

---

## 🎯 ¿Qué es Leo Perfecto?

Leo Perfecto es una **plataforma educativa moderna** diseñada para mejorar la **comprensión lectora** de estudiantes mediante *** juegos interactivos progresivos** con sistema de progreso inteligente:

### 🎮 Los 3 Juegos Progresivos

#### 1️⃣ Juego 1 - Identificación de Palabras Clave
- Preguntas de opción múltiple sobre sustantivos, verbos, adjetivos y conectores
- Feedback inmediato con explicaciones educativas detalladas
- **12 textos literarios** de dificultad progresiva

#### 2️⃣ Juego 2 - Clasificación y Contexto
- Drag & drop para completar textos con palabras categorizadas
- Sistema de vidas (2 errores máximo) y sistema de pistas
- **10 ejercicios** con validación exacta y feedback visual

#### 3️⃣ Juego 3 - Comprensión Lectora Integral ✨ **NUEVO**
- **30 textos** con preguntas de comprensión profunda
- **5 habilidades cognitivas:** Idea Principal, Causa-Efecto, Inferencias, Detalles Específicos, Propósito del Autor
- **2 modos de juego:**
  - 🎓 **Práctica:** Sin límite de tiempo, ideal para aprender
  - ⚡ **Desafío:** 1:30 min por pregunta con timer visual
- Pantalla de instrucciones interactiva con Leo
- Explicaciones detalladas por cada respuesta

### ✨ Características Principales

- 🧠 **Sistema de progreso inteligente** - Selección automática de juegos según rendimiento
- 🤖 **Mascota interactiva "Leo"** - Feedback contextual y sistema de ayuda progresiva
- 📊 **Dashboard avanzado** - Métricas en tiempo real, 10 logros desbloqueables
- 📈 **Análisis personalizado** - Fortalezas, debilidades y consejos específicos
- 🎯 **Sistema de niveles** - De Aprendiz a Maestro de la Lectura
- 🔥 **Rachas de práctica** - Motivación mediante streaks diarios
- 🎨 **Diseño profesional** - UI minimalista y moderna con Tailwind CSS
- 🔊 **Feedback auditivo** - Sonidos con Web Audio API (sin librerías)
- 📱 **100% Responsive** - Optimizado para móvil, tablet y desktop
- 💾 **Persistencia local** - localStorage (preparado para migración a backend)

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js >= 14.x
- npm >= 6.x

### Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/cesarJorquera/leo-perfecto.git
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

Genera carpeta `dist/` lista para desplegar en Netlify.

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
│   │   ├── icons/            # Iconos de la mascota (feliz/triste)
│   │   ├── img/              # Imágenes de contenido
│   │   ├── animations.css    # Animaciones personalizadas
│   │   └── main.css          # Estilos globales
│   ├── components/            # Componentes Vue
│   │   ├── MiProgreso.vue    # Dashboard de progreso y métricas
│   │   ├── mascota.vue       # Asistente virtual Leo
│   │   ├── pant_bienvenida.vue    # Pantalla inicial
│   │   ├── pant_game_1.vue   # Juego 1: Identificación
│   │   ├── pant_game_2.vue   # Juego 2: Clasificación
│   │   ├── pant_game_3.vue   # Juego 3: Comprensión ✨
│   │   ├── pant_instrucciones_game3.vue  # Instrucciones J3 ✨
│   │   ├── pant_reglas_game1.vue   # Reglas del juego 1
│   │   ├── pant_reglas_game2.vue   # Reglas del juego 2
│   │   └── pant_texto_game1.vue    # Visor de textos J1
│   ├── data/                 # Datos estáticos (JSON)
│   │   ├── game1_texts.js    # 12 textos literarios
│   │   ├── game2_texts.js    # 10 ejercicios clasificación ✨
│   │   ├── game3_texts.js    # 30 textos comprensión ✨
│   │   └── quest_game_keyword.js  # Preguntas J1
│   ├── utils/                # Utilidades
│   │   ├── eventBus.js       # Event bus (mitt)
│   │   └── gameManager.js    # Gestión inteligente de progreso ✨
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada
│
├── netlify.toml              # Configuración de deploy
├── package.json
└── README.md
```

---

## 🎮 Características Actuales

### ✅ Implementado (v1.2 - Noviembre 2024)

#### 🎯 Sistema de Juegos Completo
- **Juego 1:** 12 textos literarios con preguntas de identificación y feedback educativo
- **Juego 2:** 10 ejercicios drag & drop con validación exacta y sistema de vidas
- **Juego 3:** 30 textos de comprensión lectora con 5 habilidades cognitivas
  - Modos: Práctica (sin límite) y Desafío (1:30 min con timer visual)
  - Pantalla de instrucciones interactiva con Leo
  - Explicaciones detalladas por cada respuesta

#### 📊 Sistema de Progreso Inteligente
- **GameManager:** Selección inteligente de juegos (prioriza no completados)
- **Persistencia:** localStorage con análisis por juego individual
- **Dashboard Completo:**
  - Niveles dinámicos (Aprendiz → Maestro de la Lectura)
  - Barra de progreso total del curso (32 juegos)
  - Métricas: Juegos completados, efectividad, racha de días
  - 10 logros desbloqueables (Primer Paso, Experto, Perfección, etc.)
  - Análisis de fortalezas y debilidades con consejos personalizados

#### 🤖 Mascota Interactiva "Leo"
- Feedback contextual según rendimiento
- Sistema de ayuda progresiva (3 niveles)
- Animaciones de estado (feliz/triste/neutro)
- Asistente de IA con 3 funciones: Consejo, Explicación, Pregunta Práctica

#### 🎨 Diseño y UX
- Colores suaves y minimalistas (escala 300-400)
- Interfaz 100% responsive (móvil, tablet, desktop)
- Animaciones CSS personalizadas (scale, float, pulse)
- Sistema de sonidos con Web Audio API (hover, click, acierto/error)
- Iconos SVG profesionales (sin emojis en producción)

#### 🏗️ Arquitectura
- **3 Unidades de Aprendizaje:** Fundamentos Básicos, Comprensión Lectora, Aplicación (próximamente)
- **Sistema modular:** Componentes reutilizables y separación de responsabilidades
- **Event Bus (mitt):** Comunicación entre componentes sin props drilling
- **Código limpio:** Comentarios técnicos, estructura clara, manejo de errores

### 🚧 En Desarrollo (v2.0 - Próximamente)

- **Backend REST:** Node.js + Express + PostgreSQL
  - Autenticación JWT
  - Sistema multi-usuario
  - Rankings globales
- **Vue Router:** Navegación SPA profesional con rutas protegidas
- **Pinia Store:** Gestión centralizada de estado
- **Testing:** 
- **Unidad 3:** Textos extensos, síntesis, análisis crítico y metacognición

---

## 🛠️ Stack Tecnológico

- **Framework:** Vue.js 3.2.13 (Options API)
- **Estilos:** Tailwind CSS 2.2.17 + PostCSS
- **Build Tool:** Vue CLI 5.0.0
- **Event Bus:** Mitt 3.0.1 (comunicación entre componentes)
- **Audio:** Web Audio API nativa (sin librerías externas)
- **Persistencia:** localStorage (preparado para migración a backend)
- **Deploy:** Netlify (CI/CD automático desde GitHub)

---

## 📚 Documentación Completa

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | Arquitectura completa del proyecto | Todos los desarrolladores |
| [BEST_PRACTICES.md](./docs/BEST_PRACTICES.md) | Evaluación de código y mejoras recomendadas | Desarrolladores senior |
| [AGREGAR_TEXTOS.md](./docs/AGREGAR_TEXTOS.md) | Guía para agregar contenido educativo | Creadores de contenido |
| [GUIA_DISENO_PROFESIONAL.md](./docs/GUIA_DISENO_PROFESIONAL.md) | Guía de diseño y estilos | Diseñadores/Frontend |

---

## 🤝 Cómo Contribuir

### 📝 Para Agregar Contenido Educativo

1. Lee la [Guía de Agregar Textos](./docs/AGREGAR_TEXTOS.md)
2. Agrega textos en:
   - `src/data/game1_texts.js` (Juego 1: Identificación)
   - `src/data/game2_texts.js` (Juego 2: Clasificación)
   - `src/data/game3_texts.js` (Juego 3: Comprensión)
3. Agrega preguntas en `src/data/quest_game_keyword.js`
4. Prueba localmente: `npm run serve`
5. Verifica que no haya errores en consola

### 💻 Para Desarrolladores

1. **Fork** el repositorio
2. Lee [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) para entender la arquitectura
3. Revisa [BEST_PRACTICES.md](./docs/BEST_PRACTICES.md) para seguir estándares
4. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
5. Commit siguiendo convenciones: `git commit -m "feat: descripción"`
6. Push: `git push origin feature/nueva-funcionalidad`
7. Abre un **Pull Request** con descripción detallada

### 🎨 Convenciones de Commit

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de estilo (formato, CSS)
- `refactor:` Refactorización sin cambio funcional
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento
---

## 📞 Contacto y Soporte

- **Email:** ces.jorquera@duocuc.cl
- **Repositorio:** [github.com/cesarJorquera/leo-perfecto](https://github.com/cesarJorquera/leo-perfecto)
- **Demo en vivo:** [Netlify Deploy](https://leo-perfecto.netlify.app) *(actualizar URL)*

### 🐛 Reportar Bugs

Si encuentras un error:
1. Verifica que no esté ya reportado en [Issues](https://github.com/cesarJorquera/leo-perfecto/issues)
2. Crea un nuevo Issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Capturas de pantalla (si aplica)
   - Información del navegador/dispositivo

---

## 📜 Licencia

Este proyecto es parte de un trabajo académico de **DuocUC**.  
Todos los derechos reservados © 2024-2025

---

<div align="center">

**🎓 Desarrollado con ❤️ para mejorar la comprensión lectora en estudiantes**

[![Made with Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-42b883.svg)](https://vuejs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-38bdf8.svg)](https://tailwindcss.com/)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00c7b7.svg)](https://netlify.com/)

</div>
