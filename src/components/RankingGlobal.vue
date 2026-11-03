<template>
  <!-- Ranking Global (se movió aquí desde MiProgreso.vue en UI-04, sin cambios de contenido) -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-amber-200">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-amber-100 text-amber-700 rounded-xl p-3 shadow-lg">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-amber-700">
            Ranking Global
          </h2>
        </div>
        
        <div class="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-xl p-8 border-2 border-amber-300 shadow-md">
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="bg-yellow-200 rounded-full p-4 shadow-lg">
              <svg class="w-12 h-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-amber-800 mb-2">Próximamente</p>
              <p class="text-sm text-gray-600">Función en desarrollo</p>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default { name: 'RankingGlobal' }
</script>
