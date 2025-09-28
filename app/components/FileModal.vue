<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fileName: string
  type: 'video' | 'doc' | 'lock' | 'empty' | 'img'
  unlocked: boolean
}>()

const isOpen = defineModel<boolean>({
  default: false,
})

const title = computed(() => `[PLIK] ${props.fileName}`)
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :ui="{
      wrapper: 'font-[VT323] text-[#00f8f8]',
      header: 'border-b border-cyan-700',
      body: 'p-4',
      footer: 'border-t border-cyan-700',
    }"
    :close="{
      color: 'primary',
    }"
    class="glow"
  >
    <template #body>
      <div class="min-h-[300px] flex items-center justify-center">
        <template v-if="props.type === 'video'">
          <video controls class="max-h-[400px] max-w-full border border-cyan-700">
            <source :src="`/api/archive/${props.fileName}`" type="video/mp4">
            Twój browser nie obsługuje video.
          </video>
        </template>

        <template v-else-if="props.type === 'img'">
          <img :src="`/api/archive/${props.fileName}`">
        </template>

        <template v-else-if="props.type === 'doc'">
          <iframe
            :src="`/files/${props.fileName}`"
            class="w-full h-[400px] border border-cyan-700 bg-black"
          />
        </template>

        <template v-else-if="props.type === 'lock' && !props.unlocked">
          <p class="text-red-500 text-xl">
            [PLIK ZASZYFROWANY]
          </p>
        </template>

        <template v-else>
          <p class="text-cyan-500">
            Brak zawartości.
          </p>
        </template>
      </div>
    </template>
  </UModal>
</template>

<style>
.glow {
  filter: drop-shadow(0 0 1px #00f8f8);
}
</style>
