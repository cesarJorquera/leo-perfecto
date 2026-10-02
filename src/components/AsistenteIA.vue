<template>
  <div class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 border-4 border-indigo-200 mb-8">
    
    <!-- Título -->
    <div class="flex items-center gap-4 mb-6">
      <div class="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-4 shadow-xl">
        <img src="@/assets/icons/libro-sin-fondo-feliz.png" alt="Leo IA" class="w-14 h-14" />
      </div>
      <div>
        <h2 class="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          🤖 Leo IA - Asistente Inteligente
        </h2>
        <p class="text-sm text-gray-600 font-medium mt-1">Potenciado por Google Gemini</p>
      </div>
    </div>

    <!-- Verificar API Key -->
    <div v-if="!apiKeyValida" class="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
      <div class="flex items-start gap-3">
        <svg class="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="font-bold text-yellow-800 mb-1">⚠️ API Key no configurada</p>
          <p class="text-sm text-yellow-700 mb-2">
            Para usar Leo IA, configura tu API Key de Gemini en el archivo <code class="bg-yellow-100 px-2 py-1 rounded font-mono">.env.local</code>
          </p>
          <a href="https://makersuite.google.com/app/apikey" target="_blank" 
             class="text-sm text-indigo-600 hover:text-indigo-800 font-bold inline-block">
            🔗 Obtener API Key gratis →
          </a>
        </div>
      </div>
    </div>

    <!-- Botones principales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Test Diagnóstico -->
      <button @click="generarTest" 
              :disabled="cargandoIA"
              class="group bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
        <div class="flex flex-col items-center text-center gap-3">
          <div class="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg v-if="!cargandoIA" class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-10 h-10 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>
            <p class="font-bold text-lg mb-1">🎯 Test Diagnóstico</p>
            <p class="text-sm text-white/90">Evalúa tu nivel actual</p>
          </div>
        </div>
      </button>

      <!-- Ejercicio Aleatorio -->
      <button @click="generarEjercicio" 
              :disabled="!apiKeyValida || cargandoIA"
              class="group bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
        <div class="flex flex-col items-center text-center gap-3">
          <div class="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg v-if="!cargandoIA" class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z" />
              <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-10 h-10 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>
            <p class="font-bold text-lg mb-1">🎲 Ejercicio Aleatorio</p>
            <p class="text-sm text-white/90">Práctica generada por IA</p>
          </div>
        </div>
      </button>

      <!-- Chat con IA -->
      <button @click="toggleChat" 
              :disabled="!apiKeyValida"
              class="group bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
        <div class="flex flex-col items-center text-center gap-3">
          <div class="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-lg mb-1">💬 Chat con Leo</p>
            <p class="text-sm text-white/90">Pregunta lo que quieras</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Panel de Chat (flotante) -->
    <transition name="slide-up">
      <div v-if="chatAbierto" class="bg-white rounded-2xl shadow-2xl border-2 border-indigo-300 overflow-hidden">
        <!-- Header del chat -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-white rounded-full p-2">
              <img src="@/assets/icons/libro-sin-fondo-feliz.png" alt="Leo" class="w-8 h-8" />
            </div>
            <div>
              <p class="font-bold text-white text-lg">Leo IA</p>
              <p class="text-sm text-green-100">En línea</p>
            </div>
          </div>
          <button @click="chatAbierto = false" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Mensajes del chat -->
        <div class="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50" ref="chatContainer">
          <div v-for="(mensaje, index) in historialChat" :key="index" 
               :class="mensaje.rol === 'usuario' ? 'flex justify-end' : 'flex justify-start'">
            <div :class="mensaje.rol === 'usuario' 
                 ? 'bg-green-500 text-white rounded-2xl rounded-br-none px-4 py-3 max-w-md shadow-md' 
                 : 'bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 max-w-md shadow-md border-2 border-gray-200'">
              <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ mensaje.texto }}</p>
              <p :class="mensaje.rol === 'usuario' ? 'text-green-100' : 'text-gray-500'" 
                 class="text-xs mt-2">{{ mensaje.hora }}</p>
            </div>
          </div>
          
          <!-- Indicador de escritura -->
          <div v-if="cargandoChat" class="flex justify-start">
            <div class="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md border-2 border-gray-200">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Input del chat -->
        <div class="border-t-2 border-gray-200 p-4 bg-white">
          <form @submit.prevent="enviarMensaje" class="flex gap-3">
            <input v-model="mensajeChat" 
                   :disabled="cargandoChat"
                   type="text" 
                   placeholder="Escribe tu pregunta..."
                   class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 disabled:bg-gray-100">
            <button type="submit" 
                    :disabled="!mensajeChat.trim() || cargandoChat"
                    class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:cursor-not-allowed">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Modal Test Diagnóstico -->
    <transition name="fade">
      <div v-if="modalTestVisible" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="cerrarModalTest">
        <div class="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-6 flex items-center justify-between flex-shrink-0">
            <div class="flex items-center gap-4">
              <div class="bg-white rounded-full p-3">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Test Diagnóstico</h2>
                <p class="text-sm text-blue-100">5 preguntas para evaluar tu nivel</p>
              </div>
            </div>
            <button @click="cerrarModalTest" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Contenido del test con scroll -->
          <div class="flex-1 overflow-y-auto p-8">
            <div v-if="testDiagnostico" class="space-y-6">
              <!-- Preguntas -->
              <div v-for="(pregunta, index) in testDiagnostico.preguntas" :key="index" 
                   class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <div class="flex items-start gap-3 mb-4">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-bold text-blue-600 uppercase mb-2">{{ pregunta.habilidad.replace('_', ' ') }}</p>
                    <p class="text-sm text-gray-700 leading-relaxed bg-white rounded-xl p-4 mb-4 border border-blue-200">
                      {{ pregunta.texto }}
                    </p>
                    <p class="font-bold text-gray-800 mb-3">{{ pregunta.pregunta }}</p>
                    
                    <!-- Alternativas -->
                    <div class="space-y-2">
                      <button v-for="(alternativa, altIndex) in pregunta.alternativas" 
                              :key="altIndex"
                              @click="seleccionarRespuestaTest(index, altIndex)"
                              :class="[
                                'w-full text-left px-4 py-3 rounded-xl border-2 transition-all',
                                respuestasTest[index] === altIndex 
                                  ? 'bg-blue-500 text-white border-blue-600 shadow-lg' 
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                              ]">
                        <span class="font-bold mr-2">{{ String.fromCharCode(65 + altIndex) }})</span>
                        {{ alternativa }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Botón enviar -->
              <div class="flex justify-center pt-4">
                <button @click="evaluarTest" 
                        :disabled="Object.keys(respuestasTest).length !== testDiagnostico.preguntas.length"
                        class="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
                  🤖 Generar Diagnóstico con IA ({{ Object.keys(respuestasTest).length }}/{{ testDiagnostico.preguntas.length }})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Diagnóstico Personalizado -->
    <transition name="fade">
      <div v-if="modalDiagnosticoVisible" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="cerrarModalDiagnostico">
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 flex items-center justify-between flex-shrink-0">
            <div class="flex items-center gap-4">
              <div class="bg-white rounded-full p-3">
                <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Tu Diagnóstico Personalizado</h2>
                <p class="text-sm text-indigo-100">Generado por Leo IA</p>
              </div>
            </div>
            <button @click="cerrarModalDiagnostico" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Contenido del diagnóstico con scroll -->
          <div class="flex-1 overflow-y-auto p-8">
            <!-- Loading -->
            <div v-if="cargandoDiagnostico" class="flex flex-col items-center justify-center py-12">
              <svg class="w-16 h-16 animate-spin text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600 font-medium">Analizando tus resultados...</p>
            </div>
            
            <!-- Diagnóstico -->
            <div v-else-if="diagnosticoIA" class="space-y-6">
              <!-- Nivel -->
              <div class="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div class="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-3 uppercase">
                  {{ diagnosticoIA.nivel }}
                </div>
                <p class="text-gray-700 text-lg font-medium">{{ diagnosticoIA.mensaje_motivacional }}</p>
              </div>
              
              <!-- Fortalezas -->
              <div class="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <div class="flex items-center gap-3 mb-4">
                  <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <h3 class="text-xl font-bold text-green-800">💪 Tus Fortalezas</h3>
                </div>
                <ul class="space-y-2">
                  <li v-for="(fortaleza, index) in diagnosticoIA.fortalezas" :key="index" 
                      class="flex items-start gap-2 text-green-700">
                    <span class="text-green-500 font-bold">✓</span>
                    <span>{{ fortaleza }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Áreas a mejorar -->
              <div class="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                <div class="flex items-center gap-3 mb-4">
                  <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <h3 class="text-xl font-bold text-orange-800">🎯 Áreas a Mejorar</h3>
                </div>
                <ul class="space-y-2">
                  <li v-for="(area, index) in diagnosticoIA.areas_mejorar" :key="index" 
                      class="flex items-start gap-2 text-orange-700">
                    <span class="text-orange-500 font-bold">→</span>
                    <span>{{ area }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Recomendación -->
              <div class="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <div class="flex items-center gap-3 mb-4">
                  <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <h3 class="text-xl font-bold text-blue-800">🚀 Por Dónde Empezar</h3>
                </div>
                <p class="text-blue-700 font-medium mb-3">{{ diagnosticoIA.recomendacion_inicio }}</p>
                <div class="bg-white rounded-xl p-4 border border-blue-200">
                  <p class="text-sm text-gray-700"><strong>Consejo:</strong> {{ diagnosticoIA.consejo_principal }}</p>
                </div>
              </div>
              
              <!-- Botón cerrar -->
              <div class="flex justify-center pt-4">
                <button @click="cerrarModalDiagnostico" 
                        class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  ¡Entendido! 🎉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Ejercicio Aleatorio -->
    <transition name="fade">
      <div v-if="modalEjercicioVisible" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="cerrarModalEjercicio">
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-6 flex items-center justify-between flex-shrink-0">
            <div class="flex items-center gap-4">
              <div class="bg-white rounded-full p-3">
                <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Ejercicio de Práctica</h2>
                <p class="text-sm text-purple-100">Generado por IA</p>
              </div>
            </div>
            <button @click="cerrarModalEjercicio" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Contenido del ejercicio con scroll -->
          <div class="flex-1 overflow-y-auto p-8">
            <div v-if="ejercicioAleatorio" class="space-y-6">
              <!-- Habilidad -->
              <div class="bg-purple-100 border-2 border-purple-300 rounded-xl px-4 py-2 inline-block">
                <p class="text-sm font-bold text-purple-700 uppercase">
                  🎯 {{ ejercicioAleatorio.habilidad.replace('_', ' ') }}
                </p>
              </div>
              
              <!-- Texto -->
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <p class="text-sm text-gray-700 leading-relaxed">{{ ejercicioAleatorio.texto }}</p>
              </div>
              
              <!-- Pregunta -->
              <div class="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <p class="font-bold text-gray-800 mb-4 text-lg">{{ ejercicioAleatorio.pregunta }}</p>
                
                <!-- Alternativas -->
                <div class="space-y-3">
                  <button v-for="(alternativa, index) in ejercicioAleatorio.alternativas" 
                          :key="index"
                          @click="seleccionarRespuestaEjercicio(index)"
                          :class="[
                            'w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-base',
                            respuestaEjercicio === index 
                              ? 'bg-purple-500 text-white border-purple-600 shadow-lg font-bold' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                          ]">
                    <span class="font-bold mr-2">{{ String.fromCharCode(65 + index) }})</span>
                    {{ alternativa }}
                  </button>
                </div>
              </div>
              
              <!-- Botón verificar -->
              <div class="flex justify-center pt-4">
                <button @click="verificarRespuestaEjercicio" 
                        :disabled="respuestaEjercicio === null"
                        class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
                  ✓ Verificar Respuesta
                </button>
              </div>
              
              <!-- Retroalimentación -->
              <div v-if="feedbackEjercicio" 
                   :class="[
                     'rounded-2xl p-6 border-2',
                     feedbackEjercicio.correcto 
                       ? 'bg-green-50 border-green-300' 
                       : 'bg-red-50 border-red-300'
                   ]">
                <div class="flex items-start gap-3">
                  <div :class="[
                    'rounded-full p-2',
                    feedbackEjercicio.correcto ? 'bg-green-500' : 'bg-red-500'
                  ]">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path v-if="feedbackEjercicio.correcto" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      <path v-else fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p :class="[
                      'font-bold text-lg mb-2',
                      feedbackEjercicio.correcto ? 'text-green-700' : 'text-red-700'
                    ]">
                      {{ feedbackEjercicio.correcto ? '¡Correcto! 🎉' : 'Incorrecto 😞' }}
                    </p>
                    <p :class="feedbackEjercicio.correcto ? 'text-green-600' : 'text-red-600'" class="text-sm">
                      {{ feedbackEjercicio.mensaje }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { esAPIKeyValida, generarDiagnosticoPersonalizado, generarEjercicioAleatorio, chatConversacional } from '../utils/geminiClient'
import { testDiagnostico } from '../data/test_diagnostico'

export default {
  name: 'AsistenteIA',
  data() {
    return {
      apiKeyValida: false,
      cargandoIA: false,
      
      // Chat
      chatAbierto: false,
      mensajeChat: '',
      historialChat: [],
      cargandoChat: false,
      
      // Test Diagnóstico
      modalTestVisible: false,
      testDiagnostico: null,
      respuestasTest: {},
      diagnosticoIA: null,
      modalDiagnosticoVisible: false,
      cargandoDiagnostico: false,
      
      // Ejercicio Aleatorio
      modalEjercicioVisible: false,
      ejercicioAleatorio: null,
      respuestaEjercicio: null,
      feedbackEjercicio: null
    }
  },
  mounted() {
    this.verificarAPIKey()
  },
  methods: {
    verificarAPIKey() {
      this.apiKeyValida = esAPIKeyValida()
      console.log('🔑 API Key válida:', this.apiKeyValida)
      console.log('🔑 API Key value:', process.env.VUE_APP_GEMINI_API_KEY ? 'Configurada' : 'NO configurada')
    },
    
    // ========== CHAT ==========
    toggleChat() {
      this.chatAbierto = !this.chatAbierto
      if (this.chatAbierto && this.historialChat.length === 0) {
        this.historialChat.push({
          rol: 'asistente',
          texto: '¡Hola! Soy Leo, tu asistente de comprensión lectora. ¿En qué puedo ayudarte hoy?',
          hora: this.obtenerHora()
        })
      }
    },
    
    async enviarMensaje() {
      if (!this.mensajeChat.trim()) return
      
      const mensajeUsuario = this.mensajeChat
      this.mensajeChat = ''
      
      this.historialChat.push({
        rol: 'usuario',
        texto: mensajeUsuario,
        hora: this.obtenerHora()
      })
      
      this.cargandoChat = true
      this.scrollToBottom()
      
      try {
        console.log('💬 Enviando mensaje a Gemini...')
        const respuesta = await chatConversacional(mensajeUsuario, this.historialChat.map(msg => ({ rol: msg.rol, mensaje: msg.texto })))
        
        this.historialChat.push({
          rol: 'asistente',
          texto: respuesta,
          hora: this.obtenerHora()
        })
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        this.historialChat.push({
          rol: 'asistente',
          texto: '❌ Lo siento, hubo un error al procesar tu mensaje. ¿Puedes intentarlo de nuevo?',
          hora: this.obtenerHora()
        })
      } finally {
        this.cargandoChat = false
        this.scrollToBottom()
      }
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    
    obtenerHora() {
      const ahora = new Date()
      return ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
    },
    
    // ========== TEST DIAGNÓSTICO ==========
    generarTest() {
      console.log('🎯 Cargando test diagnóstico pre-diseñado...');
      this.testDiagnostico = testDiagnostico;
      this.respuestasTest = {};
      this.diagnosticoIA = null;
      this.modalTestVisible = true;
      console.log('✅ Test cargado:', this.testDiagnostico);
    },
    
    seleccionarRespuestaTest(preguntaIndex, alternativaIndex) {
      this.respuestasTest = {
        ...this.respuestasTest,
        [preguntaIndex]: alternativaIndex
      }
    },
    
    async evaluarTest() {
      if (!this.apiKeyValida) {
        alert('⚠️ Configura tu API Key de Gemini para obtener un diagnóstico personalizado');
        return;
      }
      
      // Calcular resultados
      let correctas = 0;
      const habilidadesEvaluadas = [];
      
      this.testDiagnostico.preguntas.forEach((pregunta, index) => {
        const esCorrecta = this.respuestasTest[index] === pregunta.respuesta_correcta;
        if (esCorrecta) correctas++;
        
        habilidadesEvaluadas.push({
          nombre: pregunta.habilidad.replace('_', ' '),
          correcta: esCorrecta
        });
      });
      
      const incorrectas = this.testDiagnostico.preguntas.length - correctas;
      
      // Cerrar modal del test
      this.modalTestVisible = false;
      
      // Generar diagnóstico con IA
      this.cargandoDiagnostico = true;
      this.modalDiagnosticoVisible = true;
      
      try {
        console.log('🤖 Generando diagnóstico personalizado con IA...');
        this.diagnosticoIA = await generarDiagnosticoPersonalizado({
          correctas,
          incorrectas,
          habilidadesEvaluadas
        });
        console.log('✅ Diagnóstico generado:', this.diagnosticoIA);
      } catch (error) {
        console.error('❌ Error al generar diagnóstico:', error);
        alert(`❌ Error al generar el diagnóstico: ${error.message}`);
        this.modalDiagnosticoVisible = false;
      } finally {
        this.cargandoDiagnostico = false;
      }
    },
    
    cerrarModalTest() {
      this.modalTestVisible = false
      this.testDiagnostico = null
      this.respuestasTest = {}
    },
    
    cerrarModalDiagnostico() {
      this.modalDiagnosticoVisible = false;
      this.diagnosticoIA = null;
    },
    
    // ========== EJERCICIO ALEATORIO ==========
    async generarEjercicio() {
      if (!this.apiKeyValida) {
        alert('⚠️ Configura tu API Key de Gemini primero')
        return
      }
      
      this.cargandoIA = true
      try {
        const habilidades = ['idea_principal', 'inferencia', 'causa_efecto', 'secuencia', 'detalle_especifico']
        const habilidadAleatoria = habilidades[Math.floor(Math.random() * habilidades.length)]
        
        console.log('🎲 Generando ejercicio con Gemini de:', habilidadAleatoria)
        this.ejercicioAleatorio = await generarEjercicioAleatorio(habilidadAleatoria)
        console.log('✅ Ejercicio generado:', this.ejercicioAleatorio)
        this.respuestaEjercicio = null
        this.feedbackEjercicio = null
        this.modalEjercicioVisible = true
      } catch (error) {
        console.error('❌ Error al generar ejercicio:', error)
        alert(`❌ Error: ${error.message}\n\nVerifica:\n1. API Key válida\n2. Acceso a Gemini habilitado`)
      } finally {
        this.cargandoIA = false
      }
    },
    
    seleccionarRespuestaEjercicio(index) {
      if (!this.feedbackEjercicio) {
        this.respuestaEjercicio = index
      }
    },
    
    verificarRespuestaEjercicio() {
      const esCorrecta = this.respuestaEjercicio === this.ejercicioAleatorio.respuesta_correcta
      this.feedbackEjercicio = {
        correcto: esCorrecta,
        mensaje: esCorrecta 
          ? '¡Excelente! Has identificado correctamente la respuesta.' 
          : `La respuesta correcta es: ${this.ejercicioAleatorio.alternativas[this.ejercicioAleatorio.respuesta_correcta]}`
      }
    },
    
    cerrarModalEjercicio() {
      this.modalEjercicioVisible = false
      this.ejercicioAleatorio = null
      this.respuestaEjercicio = null
      this.feedbackEjercicio = null
    }
  }
}
</script>

<style scoped>
/* Animaciones */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
