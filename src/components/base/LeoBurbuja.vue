<template>
  <!-- UI-05: Leo con una burbuja de texto corta.
       Al tocar a Leo hace un pequeño saludo (solo al tocar, nunca en bucle);
       se apaga con la preferencia de animaciones y con "reducir movimiento". -->
  <div class="leo-burbuja" :class="`leo-burbuja--${disposicion}`">
    <p class="leo-burbuja__texto" aria-live="polite">{{ mensaje }}</p>
    <button
      type="button"
      class="leo-burbuja__leo"
      :class="{ 'leo-burbuja__leo--saluda': saludando }"
      :style="{ width: tamano + 'px', height: tamano + 'px' }"
      aria-label="Leo, tu guía"
      @click="saludar"
    >
      <img
        src="@/assets/icons/libro-sin-fondo-feliz.png"
        alt=""
        class="leo-burbuja__img"
        draggable="false"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: 'LeoBurbuja',
  props: {
    mensaje: { type: String, required: true },
    /** 'arriba' = burbuja sobre Leo (escritorio) | 'lado' = burbuja a la izquierda (celular) */
    disposicion: {
      type: String,
      default: 'arriba',
      validator: v => ['arriba', 'lado'].includes(v)
    },
    tamano: { type: Number, default: 140 }
  },
  emits: ['tocar'],
  data() {
    return { saludando: false, temporizador: null }
  },
  beforeUnmount() {
    clearTimeout(this.temporizador)
  },
  methods: {
    saludar() {
      this.$emit('tocar')
      this.saludando = false
      clearTimeout(this.temporizador)
      // Reiniciar la clase permite repetir el saludo con toques seguidos
      this.$nextTick(() => {
        this.saludando = true
        this.temporizador = setTimeout(() => { this.saludando = false }, 900)
      })
    }
  }
}
</script>

<style scoped>
.leo-burbuja {
  display: flex;
}
.leo-burbuja--arriba {
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}
.leo-burbuja--lado {
  flex-direction: row;
  align-items: flex-end;
  gap: 0.25rem;
}

.leo-burbuja__texto {
  position: relative;
  margin: 0;
  max-width: 16rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d9e4f1;
  border-radius: 1rem;
  background: #f3f8fd;
  color: #14233b;
  font-size: 1rem;
  line-height: 1.4;
  text-align: left;
}
/* Colita de la burbuja, apuntando a Leo */
.leo-burbuja__texto::after {
  content: '';
  position: absolute;
  width: 0.875rem;
  height: 0.875rem;
  background: #f3f8fd;
  transform: rotate(45deg);
}
.leo-burbuja--arriba .leo-burbuja__texto::after {
  right: 3.5rem;
  bottom: -0.5rem;
  border-right: 1px solid #d9e4f1;
  border-bottom: 1px solid #d9e4f1;
}
.leo-burbuja--lado .leo-burbuja__texto {
  flex: 1;
  min-width: 0;
  margin-bottom: 1.25rem;
  font-size: 0.9375rem;
}
.leo-burbuja--lado .leo-burbuja__texto::after {
  right: -0.45rem;
  bottom: 0.875rem;
  border-top: 1px solid #d9e4f1;
  border-right: 1px solid #d9e4f1;
}

.leo-burbuja__leo {
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 1rem;
  background: transparent;
  cursor: pointer;
}
.leo-burbuja__leo:focus-visible { outline: 3px solid #14233b; outline-offset: 3px; }
.leo-burbuja__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.leo-burbuja__leo--saluda .leo-burbuja__img {
  transform-origin: 50% 90%;
  animation: leo-saludo 0.9s ease-in-out;
}
@keyframes leo-saludo {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  20% { transform: rotate(-7deg) translateY(-4px); }
  45% { transform: rotate(6deg) translateY(-6px); }
  70% { transform: rotate(-3deg) translateY(-2px); }
}
@media (prefers-reduced-motion: reduce) {
  .leo-burbuja__leo--saluda .leo-burbuja__img { animation: none; }
}
html[data-animaciones="off"] .leo-burbuja__leo--saluda .leo-burbuja__img { animation: none; }
</style>
