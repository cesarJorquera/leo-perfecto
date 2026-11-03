<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">

      <!-- Tu Progreso - Diseño Mejorado y Motivador -->
      <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-6 md:p-10 mb-8 border-4 border-blue-300">
        <!-- Header con Nivel del Jugador -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-all">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tu Progreso
              </h2>
              <p class="text-lg font-semibold text-gray-600 mt-1">{{ nivelJugador }}</p>
            </div>
          </div>
          
          <!-- Badge de Nivel -->
          <div class="bg-gradient-to-br from-orange-300 to-amber-400 rounded-2xl px-6 py-3 shadow-xl transform hover:rotate-3 transition-all border-2 border-orange-400">
            <p class="text-sm text-orange-900 font-bold uppercase tracking-wide">Nivel</p>
            <p class="text-5xl font-extrabold text-orange-800 drop-shadow-md">{{ nivel }}</p>
          </div>
        </div>

        <!-- Mensaje Motivacional -->
        <div class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6 border-2 border-purple-300 shadow-lg">
          <div class="flex items-center justify-center gap-4">
            <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md">
              <span class="text-3xl">{{ emojiMotivacional }}</span>
            </div>
            <p class="text-center text-base font-semibold text-gray-800 leading-relaxed">
              {{ mensajeMotivacional }}
            </p>
          </div>
        </div>

        <!-- Barra de Progreso General -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm font-bold text-gray-700">Progreso Total del Curso</span>
            <span class="text-sm font-bold text-purple-600">{{ progresoTotal }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-6 shadow-inner overflow-hidden">
            <div 
              class="h-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out flex items-center justify-end px-2"
              :style="{ width: progresoTotal + '%' }"
            >
              <span v-if="progresoTotal > 10" class="text-xs font-bold text-white">{{ progresoTotal }}%</span>
            </div>
          </div>
        </div>

        <!-- Estadísticas Principales -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Juegos Completados -->
          <div class="bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div class="flex flex-col items-center text-center">
              <div class="bg-white bg-opacity-30 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg">
                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-5xl font-extrabold text-white mb-2">{{ juegosCompletados }}</p>
              <p class="text-sm text-white font-bold uppercase tracking-wide">Juegos Completados</p>
            </div>
          </div>

          <!-- Efectividad -->
          <div class="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div class="flex flex-col items-center text-center">
              <div class="bg-white bg-opacity-30 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg">
                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-5xl font-extrabold text-white mb-2">{{ efectividadSegura }}%</p>
              <p class="text-sm text-white font-bold uppercase tracking-wide">Efectividad</p>
            </div>
          </div>

          <!-- Racha Actual -->
          <div class="bg-gradient-to-br from-indigo-300 via-blue-400 to-blue-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div class="flex flex-col items-center text-center">
              <div class="bg-white bg-opacity-30 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg">
                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-5xl font-extrabold text-white mb-2">{{ rachaActual }}</p>
              <p class="text-sm text-white font-bold uppercase tracking-wide">Racha de Días</p>
            </div>
          </div>
        </div>

        <!-- Sistema de Logros/Insignias MEJORADO -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 mb-6">
          <div class="flex items-center gap-3 mb-5">
            <div class="bg-yellow-500 rounded-xl p-3 shadow-md">
              <span class="text-4xl">🏆</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">
              Logros Desbloqueados
            </h3>
          </div>
          
          <!-- Carousel de Logros -->
          <div class="relative">
            <!-- Contenedor con scroll horizontal -->
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-100" style="scroll-behavior: smooth;">
            <!-- Logro: Primer Paso -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              juegosCompletados >= 1 
                ? 'bg-gradient-to-b from-emerald-400 to-emerald-200 shadow-lg border-emerald-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ juegosCompletados >= 1 ? '🎯' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', juegosCompletados >= 1 ? 'text-gray-800' : 'text-gray-700']">
                Primer Paso
              </p>
              <p :class="['text-xs font-semibold', juegosCompletados >= 1 ? 'text-gray-700' : 'text-gray-600']">
                Completa 1 juego
              </p>
            </div>

            <!-- Logro: En Camino -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              juegosCompletados >= 3 
                ? 'bg-gradient-to-b from-blue-400 to-blue-200 shadow-lg border-blue-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ juegosCompletados >= 3 ? '🚀' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', juegosCompletados >= 3 ? 'text-gray-800' : 'text-gray-700']">
                En Camino
              </p>
              <p :class="['text-xs font-semibold', juegosCompletados >= 3 ? 'text-gray-700' : 'text-gray-600']">
                Completa 3 juegos
              </p>
            </div>

            <!-- Logro: Persistente -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              juegosCompletados >= 5 
                ? 'bg-gradient-to-b from-purple-400 to-purple-200 shadow-lg border-purple-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ juegosCompletados >= 5 ? '💪' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', juegosCompletados >= 5 ? 'text-gray-800' : 'text-gray-700']">
                Persistente
              </p>
              <p :class="['text-xs font-semibold', juegosCompletados >= 5 ? 'text-gray-700' : 'text-gray-600']">
                Completa 5 juegos
              </p>
            </div>

            <!-- Logro: Maestro -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              juegosCompletados >= 10 
                ? 'bg-gradient-to-b from-orange-400 to-orange-200 shadow-lg border-orange-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ juegosCompletados >= 10 ? '🎖️' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', juegosCompletados >= 10 ? 'text-gray-800' : 'text-gray-700']">
                Maestro
              </p>
              <p :class="['text-xs font-semibold', juegosCompletados >= 10 ? 'text-gray-700' : 'text-gray-600']">
                Completa 10 juegos
              </p>
            </div>

            <!-- Logro: Experto -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              efectividadSegura >= 80 
                ? 'bg-gradient-to-b from-cyan-400 to-cyan-200 shadow-lg border-cyan-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ efectividadSegura >= 80 ? '⭐' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', efectividadSegura >= 80 ? 'text-gray-800' : 'text-gray-700']">
                Experto
              </p>
              <p :class="['text-xs font-semibold', efectividadSegura >= 80 ? 'text-gray-700' : 'text-gray-600']">
                80% efectividad
              </p>
            </div>

            <!-- Logro: Perfección -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              efectividadSegura >= 95 
                ? 'bg-gradient-to-b from-amber-400 to-amber-200 shadow-lg border-amber-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ efectividadSegura >= 95 ? '👑' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', efectividadSegura >= 95 ? 'text-gray-800' : 'text-gray-700']">
                Perfección
              </p>
              <p :class="['text-xs font-semibold', efectividadSegura >= 95 ? 'text-gray-700' : 'text-gray-600']">
                95% efectividad
              </p>
            </div>

            <!-- Logro: Racha de Fuego -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              rachaActual >= 3 
                ? 'bg-gradient-to-b from-red-400 to-red-200 shadow-lg border-red-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ rachaActual >= 3 ? '🔥' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', rachaActual >= 3 ? 'text-gray-800' : 'text-gray-700']">
                Racha de Fuego
              </p>
              <p :class="['text-xs font-semibold', rachaActual >= 3 ? 'text-gray-700' : 'text-gray-600']">
                3 días seguidos
              </p>
            </div>

            <!-- Logro: Velocista -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              tiempoPromedioRapido 
                ? 'bg-gradient-to-b from-lime-400 to-lime-200 shadow-lg border-lime-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ tiempoPromedioRapido ? '⚡' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', tiempoPromedioRapido ? 'text-gray-800' : 'text-gray-700']">
                Velocista
              </p>
              <p :class="['text-xs font-semibold', tiempoPromedioRapido ? 'text-gray-700' : 'text-gray-600']">
                Respuestas rápidas
              </p>
            </div>

            <!-- Logro: Sin Errores -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              juegosPerfectos >= 1 
                ? 'bg-gradient-to-b from-pink-400 to-pink-200 shadow-lg border-pink-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ juegosPerfectos >= 1 ? '💎' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', juegosPerfectos >= 1 ? 'text-gray-800' : 'text-gray-700']">
                Sin Errores
              </p>
              <p :class="['text-xs font-semibold', juegosPerfectos >= 1 ? 'text-gray-700' : 'text-gray-600']">
                100% en un juego
              </p>
            </div>

            <!-- Logro: Dedicado -->
            <div :class="[
              'rounded-xl p-5 text-center transition-all transform hover:scale-105 cursor-pointer border-2 flex-shrink-0 w-40 snap-center',
              rachaActual >= 7 
                ? 'bg-gradient-to-b from-indigo-400 to-indigo-200 shadow-lg border-indigo-300' 
                : 'bg-white border-gray-300 shadow-md'
            ]">
              <div class="text-5xl mb-2">{{ rachaActual >= 7 ? '🌟' : '🔒' }}</div>
              <p :class="['text-sm font-extrabold mb-1', rachaActual >= 7 ? 'text-gray-800' : 'text-gray-700']">
                Dedicado
              </p>
              <p :class="['text-xs font-semibold', rachaActual >= 7 ? 'text-gray-700' : 'text-gray-600']">
                7 días de racha
              </p>
            </div>
          </div>
          </div>
        </div>

        <!-- Fortalezas y Áreas de Mejora REDISEÑADAS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Fortalezas -->
          <div class="bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-2xl p-6 border-3 border-emerald-400 shadow-xl">
            <div class="flex items-center gap-3 mb-5">
              <div class="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-3 shadow-lg">
                <svg class="w-7 h-7 text-yellow-300 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-xl font-extrabold text-emerald-800 flex items-center gap-2">
                <svg class="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Tus Fortalezas</span>
              </h3>
            </div>
            <div v-if="fortalezas.length > 0" class="space-y-3">
              <div v-for="(fortaleza, index) in fortalezas" :key="index" 
                class="bg-white rounded-xl p-4 border-2 border-emerald-300 shadow-md hover:shadow-lg transition-all transform hover:scale-102">
                <div class="flex items-start gap-3">
                  <span class="text-2xl">{{ fortaleza.emoji }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-bold text-green-800 mb-1">{{ fortaleza.titulo }}</p>
                    <p class="text-xs text-gray-700 leading-relaxed">{{ fortaleza.descripcion }}</p>
                    <div class="mt-2 flex items-center gap-2">
                      <div class="bg-green-100 rounded-full px-3 py-1">
                        <p class="text-xs font-bold text-green-700">{{ fortaleza.porcentaje }}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="bg-white rounded-xl p-8 border-2 border-green-200 text-center shadow-md">
              <div class="flex justify-center mb-3">
                <svg class="w-20 h-20 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                </svg>
              </div>
              <p class="text-sm font-semibold text-gray-700 mb-2">¡Empieza a descubrir tus fortalezas!</p>
              <p class="text-xs text-gray-500">Completa ejercicios para ver en qué destacas</p>
            </div>
          </div>

          <!-- Áreas de Mejora -->
          <div class="bg-gradient-to-br from-red-100 via-rose-50 to-pink-100 rounded-2xl p-6 border-3 border-red-200 shadow-xl">
            <div class="flex items-center gap-3 mb-5">
              <div class="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-3 shadow-lg">
                <svg class="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-xl font-extrabold text-red-800 flex items-center gap-2">
                <svg class="w-7 h-7 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                </svg>
                <span>Áreas de Mejora</span>
              </h3>
            </div>
            <div v-if="debilidades.length > 0" class="space-y-3">
              <div v-for="(debilidad, index) in debilidades" :key="index" 
                class="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md hover:shadow-lg transition-all transform hover:scale-102">
                <div class="flex items-start gap-3">
                  <span class="text-2xl">{{ debilidad.emoji }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-bold text-red-800 mb-1">{{ debilidad.titulo }}</p>
                    <p class="text-xs text-gray-700 leading-relaxed">{{ debilidad.descripcion }}</p>
                    <div class="mt-2 flex items-center gap-2">
                      <div class="bg-red-100 rounded-full px-3 py-1">
                        <p class="text-xs font-bold text-red-700">{{ debilidad.porcentaje }}%</p>
                      </div>
                      <div class="bg-blue-100 rounded-full px-3 py-1 flex items-center gap-1">
                        <svg class="w-3 h-3 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        <p class="text-xs font-semibold text-blue-700">{{ debilidad.consejo }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="bg-white rounded-xl p-8 border-2 border-rose-200 text-center shadow-md">
              <div class="flex justify-center mb-3">
                <svg class="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                </svg>
              </div>
              <p class="text-sm font-semibold text-gray-700 mb-2">¡Todo marcha bien!</p>
              <p class="text-xs text-gray-500">Completa más ejercicios para recibir retroalimentación personalizada</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Ranking Global (trabajo de otro compañero: solo se reubicó aquí) -->
      <RankingGlobal />

    </div>
  </div>
</template>

<script>
// UI-04: sección "Progreso". Aquí viven el bloque "Tu Progreso" y el Ranking Global, que antes estaban
// al final de MiProgreso.vue (hoy solo Inicio). La lógica de estadísticas se movió tal cual desde allí.
import { createGameManager } from '../utils/gameManager'
import RankingGlobal from './RankingGlobal.vue'

export default {
  name: 'PantallaProgreso',

  components: { RankingGlobal },

  props: {
    playerName: {
      type: String,
      default: 'Jugador'
    },
    userProgress: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      // Estadísticas del jugador
      juegosCompletados: 0,
      efectividad: 0,
      rachaActual: 0,
      fortalezas: [],
      debilidades: [],
      juegosPerfectos: 0,
      tiempoPromedioRapido: false,

      // Gestor de juegos
      gameManager: null
    }
  },
  computed: {
    // Calcular nivel del jugador basado en juegos completados y efectividad
    nivel() {
      const puntosTotales = (this.juegosCompletados * 10) + (this.efectividadSegura / 10);
      if (puntosTotales >= 50) return 5;
      if (puntosTotales >= 35) return 4;
      if (puntosTotales >= 20) return 3;
      if (puntosTotales >= 10) return 2;
      return 1;
    },
    
    // Título del nivel
    nivelJugador() {
      const niveles = {
        1: '🌱 Aprendiz',
        2: '📘 Estudiante',
        3: '📚 Lector Avanzado',
        4: '🎓 Experto',
        5: '👑 Maestro de la Lectura'
      };
      return niveles[this.nivel] || '🌱 Aprendiz';
    },
    
    // Calcular progreso total del curso (32 juegos en total: 12 texto + 10 drag + 10 comprensión)
    progresoTotal() {
      const TOTAL_JUEGOS_CURSO = 32 // 12 textos + 10 drag & drop + 10 comprensión
      const porcentaje = Math.min(
        Math.round((this.juegosCompletados / TOTAL_JUEGOS_CURSO) * 100), 
        100
      )
      return porcentaje
    },
    
    // Emoji motivacional según rendimiento REAL (efectividad + ejercicios)
    emojiMotivacional() {
      if (this.efectividadSegura >= 95 && this.juegosCompletados >= 15) return '🏆'
      if (this.efectividadSegura >= 90 && this.juegosCompletados >= 10) return '🌟'
      if (this.efectividadSegura >= 85 && this.juegosCompletados >= 8) return '⭐'
      if (this.efectividadSegura >= 75 && this.juegosCompletados >= 5) return '💪'
      if (this.efectividadSegura >= 60 && this.juegosCompletados >= 3) return '👍'
      if (this.juegosCompletados >= 3) return '📚'
      if (this.juegosCompletados >= 1) return '🌱'
      return '📖'
    },
    
    // Efectividad segura (nunca muestra Infinity o NaN)
    efectividadSegura() {
      if (!Number.isFinite(this.efectividad)) return 0
      if (this.efectividad < 0) return 0
      if (this.efectividad > 100) return 100
      return Math.round(this.efectividad)
    },
    
    // Mensaje motivacional dinámico según el progreso REAL
    mensajeMotivacional() {
      // Mensajes basados en efectividad Y cantidad de juegos
      if (this.efectividad >= 95 && this.juegosCompletados >= 15) {
        return '¡Excelente dominio! Tu comprensión lectora es sobresaliente.';
      } else if (this.efectividad >= 90 && this.juegosCompletados >= 10) {
        return 'Muy buen nivel. Mantienes consistencia en tu desempeño.';
      } else if (this.efectividad >= 80 && this.juegosCompletados >= 8) {
        return 'Buen progreso. Estás desarrollando habilidades sólidas.';
      } else if (this.efectividad >= 70 && this.juegosCompletados >= 5) {
        return 'Vas por buen camino. Sigue practicando regularmente.';
      } else if (this.efectividad >= 60 && this.juegosCompletados >= 3) {
        return 'Progreso visible. La constancia te ayudará a mejorar.';
      } else if (this.juegosCompletados >= 5) {
        return 'Has practicado varios ejercicios. Revisa tus errores para mejorar.';
      } else if (this.juegosCompletados >= 2) {
        return 'Primeros pasos completados. Continúa practicando para avanzar.';
      } else if (this.juegosCompletados === 1) {
        return 'Primer ejercicio completado. Sigue practicando para mejorar.';
      } else {
        return 'Comienza tu práctica y desarrolla tus habilidades de lectura.';
      }
    }
  },

  mounted() {
    try {
      this.gameManager = createGameManager(this.playerName)
      this.loadPlayerData()
    } catch (error) {
      console.error('❌ Error al inicializar la sección Progreso:', error)
    }
  },

  methods: {
    /**
     * Carga todos los datos del jugador desde localStorage
     * OPTIMIZADO: Usa el mejor puntaje de cada juego, no el promedio de intentos
     */
    loadPlayerData() {
      try {
        if (!this.gameManager) {
          console.warn('⚠️ GameManager no inicializado')
          this.resetearEstadisticas()
          return
        }

        // Obtener estadísticas mejoradas del GameManager
        const stats = this.gameManager.getEstadisticas()
        
        // Validar y actualizar estado con valores seguros
        this.juegosCompletados = Number.isFinite(stats.juegosCompletados) ? stats.juegosCompletados : 0
        this.efectividad = Number.isFinite(stats.efectividad) ? stats.efectividad : 0
        this.juegosPerfectos = Number.isFinite(stats.juegosPerfectos) ? stats.juegosPerfectos : 0
        
        // Calcular racha (días únicos con actividad)
        const progreso = this.gameManager.loadProgress()
        this.rachaActual = this.calcularRachaDias(progreso)

        // Calcular fortalezas y debilidades con análisis mejorado
        this.calcularFortalezasYDebilidades(progreso)
        
        console.log('✅ Datos del jugador cargados (optimizados):', {
          juegosCompletados: this.juegosCompletados,
          efectividad: this.efectividad,
          juegosPerfectos: this.juegosPerfectos,
          nivel: this.nivel,
          racha: this.rachaActual
        })
      } catch (error) {
        console.error('❌ Error al cargar datos del jugador:', error)
        this.resetearEstadisticas()
      }
    },

    /**
     * Resetea todas las estadísticas a valores por defecto
     */
    resetearEstadisticas() {
      this.juegosCompletados = 0
      this.efectividad = 0
      this.rachaActual = 0
      this.juegosPerfectos = 0
      this.fortalezas = []
      this.debilidades = []
    },

    /**
     * Calcula la racha de días consecutivos
     * @param {Array} progressArray - Array de progreso
     * @returns {number} - Días de racha actual
     */
    calcularRachaDias(progressArray) {
      if (progressArray.length === 0) return 0

      // Obtener fechas únicas (sin hora) y ordenarlas
      const fechasUnicas = [...new Set(progressArray.map(p => {
        const fecha = new Date(p.date)
        return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
      }))].sort().reverse()

      // Calcular racha consecutiva desde hoy
      let racha = 0
      const hoy = new Date()
      const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
      
      // Si jugó hoy, empieza racha
      if (fechasUnicas[0] === hoyStr) {
        racha = 1
        
        // Contar días consecutivos hacia atrás
        for (let i = 1; i < fechasUnicas.length; i++) {
          const fechaActual = new Date(fechasUnicas[i - 1])
          const fechaSiguiente = new Date(fechasUnicas[i])
          const diferenciaDias = Math.floor((fechaActual - fechaSiguiente) / (1000 * 60 * 60 * 24))
          
          if (diferenciaDias === 1) {
            racha++
          } else {
            break // Racha rota
          }
        }
      }
      
      return racha
    },

    calcularFortalezasYDebilidades(progressArray) {
      this.fortalezas = [];
      this.debilidades = [];

      if (progressArray.length === 0) {
        return; // Sin datos, no hay análisis
      }

      // Analizar por tipo de pregunta o categoría
      const categorias = {
        sustantivos: [],
        verbos: [],
        adjetivos: [],
        conectores: []
      };

      // Agrupar puntajes por categoría (si tienes esa info guardada)
      progressArray.forEach(p => {
        if (p.categoria) {
          if (!categorias[p.categoria]) categorias[p.categoria] = [];
          categorias[p.categoria].push(p.score);
        }
      });

      // Analizar rendimiento general
      const puntajes = progressArray.map(p => p.score || 0);
      const promedioGeneral = puntajes.reduce((a, b) => a + b, 0) / puntajes.length;
      
      // FORTALEZAS
      if (promedioGeneral >= 90) {
        this.fortalezas.push({
          emoji: '🌟',
          titulo: 'Excelencia en Comprensión',
          descripcion: 'Mantienes un rendimiento excepcional en todos los ejercicios',
          porcentaje: Math.round(promedioGeneral)
        });
      }

      if (this.juegosPerfectos >= 2) {
        this.fortalezas.push({
          emoji: '💎',
          titulo: 'Perfeccionista',
          descripcion: `Has logrado ${this.juegosPerfectos} juegos con puntuación perfecta`,
          porcentaje: 100
        });
      }

      if (this.rachaActual >= 5) {
        this.fortalezas.push({
          emoji: '�',
          titulo: 'Constancia Ejemplar',
          descripcion: `Racha de ${this.rachaActual} días practicando. ¡Increíble dedicación!`,
          porcentaje: Math.min(this.rachaActual * 10, 100)
        });
      }

      // Analizar mejora a lo largo del tiempo
      if (progressArray.length >= 3) {
        const primerosTres = progressArray.slice(0, 3).map(p => p.score).reduce((a,b) => a+b) / 3;
        const ultimosTres = progressArray.slice(-3).map(p => p.score).reduce((a,b) => a+b) / 3;
        
        if (ultimosTres > primerosTres + 10) {
          this.fortalezas.push({
            emoji: '�',
            titulo: 'Progreso Acelerado',
            descripcion: 'Has mejorado significativamente con la práctica',
            porcentaje: Math.round(ultimosTres)
          });
        }
      }

      if (promedioGeneral >= 80 && this.juegosCompletados >= 5) {
        this.fortalezas.push({
          emoji: '🎯',
          titulo: 'Dominio Consistente',
          descripcion: 'Mantienes un alto rendimiento en múltiples ejercicios',
          porcentaje: Math.round(promedioGeneral)
        });
      }

      // DEBILIDADES / ÁREAS DE MEJORA
      if (promedioGeneral < 70 && progressArray.length >= 2) {
        this.debilidades.push({
          emoji: '📚',
          titulo: 'Comprensión en Desarrollo',
          descripcion: 'Continúa practicando para fortalecer tu comprensión lectora',
          porcentaje: Math.round(promedioGeneral),
          consejo: 'Lee cada texto 2 veces'
        });
      }

      // Detectar inconsistencia en resultados
      if (progressArray.length >= 3) {
        const desviacion = Math.sqrt(
          puntajes.map(x => Math.pow(x - promedioGeneral, 2)).reduce((a,b) => a+b) / puntajes.length
        );
        
        if (desviacion > 25) {
          this.debilidades.push({
            emoji: '⚡',
            titulo: 'Resultados Variables',
            descripcion: 'Tu rendimiento varía entre ejercicios',
            porcentaje: Math.round(promedioGeneral),
            consejo: 'Mantén concentración constante'
          });
        }
      }

      if (this.rachaActual < 2 && this.juegosCompletados >= 2) {
        this.debilidades.push({
          emoji: '📅',
          titulo: 'Práctica Espaciada',
          descripcion: 'La práctica regular mejora la retención',
          porcentaje: this.rachaActual * 50,
          consejo: 'Practica un poco cada día'
        });
      }

      // Si hay puntajes bajos recientes
      const ultimosPuntajes = progressArray.slice(-3).map(p => p.score);
      const promedioReciente = ultimosPuntajes.reduce((a,b) => a+b, 0) / ultimosPuntajes.length;
      
      if (promedioReciente < 60 && progressArray.length >= 3) {
        this.debilidades.push({
          emoji: '🎲',
          titulo: 'Desafíos Recientes',
          descripcion: 'Tus últimos ejercicios presentaron dificultad',
          porcentaje: Math.round(promedioReciente),
          consejo: 'Revisa las reglas antes de empezar'
        });
      }

      // Si no hay debilidades detectadas pero hay margen de mejora
      if (this.debilidades.length === 0 && promedioGeneral < 95 && progressArray.length >= 2) {
        this.debilidades.push({
          emoji: '🚀',
          titulo: 'Camino a la Excelencia',
          descripcion: 'Vas muy bien, sigue practicando para alcanzar el 100%',
          porcentaje: Math.round(promedioGeneral),
          consejo: 'Lee con atención los detalles'
        });
      }

      // Limitar a máximo 3 fortalezas y 3 debilidades
      this.fortalezas = this.fortalezas.slice(0, 3);
      this.debilidades = this.debilidades.slice(0, 3);
    },
  }
}
</script>

<style scoped>
/* Estilos para el carousel de logros (se movieron junto con el bloque) */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #a78bfa;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #8b5cf6;
}
</style>
