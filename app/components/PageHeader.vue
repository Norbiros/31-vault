<script setup lang="ts">
defineProps<{
  isAllUnlocked: boolean
}>()
</script>

<template>
  <header class="relative border-2 border-cyan-400 border-glow p-4 mb-6 text-center overflow-hidden">
    <!-- Scan line tylko w headerze -->
    <div class="scan-line" />

    <h1 class="text-3xl md:text-5xl font-bold text-glow tracking-widest">
      ARCHIWUM 31
    </h1>
    <p class="text-lg text-cyan-200">
      WYBORY 25/26 :: KAMPANIA JAKUB STARZYK :: STATUS:
      <span :class="[isAllUnlocked ? 'text-green-400' : 'text-red-500 animate-pulse']">
        {{ isAllUnlocked ? 'ODBLOKOWANY' : 'ZABLOKOWANY' }}
      </span>
    </p>
    <p class="text-lg text-cyan-200">
      LOGIN: JAKUB.STARZYK | HASŁO: ********
    </p>
  </header>
</template>

<style scoped>
/* linia skanu */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to bottom, transparent, #00f8f8, transparent);
  animation: scan 3s linear infinite;
  z-index: 0;
}

@keyframes scan {
  0% {
    top: -10%;
  }
  50% {
    top: 110%;
  }
  100% {
    top: 110%;
  }
}

/* opcjonalnie podkręcić neonowy efekt dla tekstu */
.text-glow {
  text-shadow:
    0 0 5px #00f8f8,
    0 0 10px #00f8f8,
    0 0 20px #00f8f8;
}
</style>
