<template>
  <!-- UI-04: sección LeoIA. El asistente (AsistenteIA.vue) antes iba en medio de Inicio; ahora tiene su pantalla. -->
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <AsistenteIA />
    </div>
  </div>
</template>

<script>
import AsistenteIA from './AsistenteIA.vue'

export default {
  name: 'PantallaLeoIA',
  components: { AsistenteIA }
}
</script>
